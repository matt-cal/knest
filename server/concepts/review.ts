import { Filter, ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface PostOptions {
  backgroundColor?: string;
}

export interface ReviewDoc extends BaseDoc {
  author: ObjectId;
  content: string;
  area: string;
  values: Map<string, number>;
  options?: PostOptions;
}

export default class ReviewConcept {
  public readonly reviews = new DocCollection<ReviewDoc>("reviews");

  async create(author: ObjectId, content: string, area: string, values: Map<string, number>, options?: PostOptions) {
    const _id = await this.reviews.createOne({ author, content, area, values, options });
    return { msg: "Review successfully created!", review: await this.reviews.readOne({ _id }) };
  }

  async getReviews(query: Filter<ReviewDoc>) {
    const reviews = await this.reviews.readMany(query, {
      sort: { dateUpdated: -1 },
    });
    return reviews;
  }

  async getByArea(area: string) {
    return await this.getReviews({ area });
  }

  async update(_id: ObjectId, update: Partial<ReviewDoc>) {
    this.sanitizeUpdate(update);
    await this.reviews.updateOne({ _id }, update);
    return { msg: "Review successfully updated!" };
  }

  async delete(_id: ObjectId) {
    await this.reviews.deleteOne({ _id });
    return { msg: "Review deleted successfully!" };
  }

  async isAuthor(user: ObjectId, _id: ObjectId) {
    const post = await this.reviews.readOne({ _id });
    if (!post) {
      throw new NotFoundError(`Post ${_id} does not exist!`);
    }
    if (post.author.toString() !== user.toString()) {
      throw new ReviewAuthorNotMatchError(user, _id);
    }
  }

  private sanitizeUpdate(update: Partial<ReviewDoc>) {
    // Make sure the update cannot change the author.
    const allowedUpdates = ["content", "options"];
    for (const key in update) {
      if (!allowedUpdates.includes(key)) {
        throw new NotAllowedError(`Cannot update '${key}' field!`);
      }
    }
  }
}

export class ReviewAuthorNotMatchError extends NotAllowedError {
  constructor(
    public readonly author: ObjectId,
    public readonly _id: ObjectId,
  ) {
    super("{0} is not the author of review {1}!", author, _id);
  }
}
