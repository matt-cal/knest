import { Filter, ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface AreaDoc extends BaseDoc {
  title: string;
  location: string; // TODO probably need to change this to something to display areas on map
  parentArea: ObjectId;
}

export default class AreaConcept {
  public readonly areas = new DocCollection<AreaDoc>("areas");

  async create(title: string, location: string, parentArea: ObjectId) {
    const _id = await this.areas.createOne({ title, location, parentArea });
    return { msg: "Area successfully created!", area: await this.areas.readOne({ _id }) };
  }

  /**
   * query areas
   */
  async getAreas(query: Filter<AreaDoc>) {
    const areas = await this.areas.readMany(query, {
      sort: { dateUpdated: -1 },
    });
    return areas;
  }

  /**
   * Return area with given id if it exists, null otherwise
   */
  async getArea(_id: ObjectId) {
    return await this.areas.readOne({ _id });
  }

  /**
   * get all areas that have area with given id as a parent area
   */
  async getSubareas(_id: ObjectId) {
    if (!this.areaExists(_id)) {
      throw new NotFoundError(`Area ${_id} does not exist!`);
    }
    const areas = await this.getAreas({ parentArea: _id });
    return areas;
  }

  /**
   * return true if area with given _id exists, false otherwise
   */
  async areaExists(_id: ObjectId) {
    const post = await this.areas.readOne({ _id });
    return post !== null;
  }

  async update(_id: ObjectId, update: Partial<AreaDoc>) {
    this.sanitizeUpdate(update);
    await this.areas.updateOne({ _id }, update);
    return { msg: "Area successfully updated!" };
  }

  async deleteByObjectId(_id: ObjectId) {
    await this.areas.deleteOne({ _id });
    return { msg: "Area deleted successfully!" };
  }

  async deleteByLocation(location: string) {
    await this.areas.deleteMany({ location });
    return { msg: "Area(s) deleted successfully!"};
  }

  async deleteChildren(parentArea: ObjectId) {
    await this.areas.deleteMany({ parentArea });
    return { msg: "Child Area(s) deleted successfully!"};
  }

  private sanitizeUpdate(update: Partial<AreaDoc>) {
    const allowedUpdates = ["title", "location"];
    for (const key in update) {
      if (!allowedUpdates.includes(key)) {
        throw new NotAllowedError(`Cannot update '${key}' field!`);
      }
    }
  }
}
