import { Filter, ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface UpvoteDoc extends BaseDoc {
  owner: ObjectId;
  post: ObjectId;
}

export default class UpvoteConcept {
  public readonly upvotes = new DocCollection<UpvoteDoc>("likes");

  async create(owner: ObjectId, post: ObjectId) {
    const oldUpvotes = await this.getUpvotes({ owner, post });
    if (oldUpvotes.length !== 0) {
      throw new UpvoteExistsError(owner, post);
    }
    const _id = await this.upvotes.createOne({ owner, post });
    return { msg: "Upvoted successfully!", upvote: await this.upvotes.readOne({ _id }) };
  }

  async getUpvotes(query: Filter<UpvoteDoc>) {
    const upvotes = await this.upvotes.readMany(query, {
      sort: { dateUpdated: -1 },
    });
    return upvotes;
  }

  async getByOwner(owner: ObjectId) {
    return await this.getUpvotes({ owner });
  }

  async getByPost(post: ObjectId) {
    return await this.getUpvotes({ post });
  }

  // return single upvote with given owner on given post
  async getByOwnerPost(post: ObjectId, owner: ObjectId) {
    return (await this.getUpvotes({ owner, post }))[0];
  }

  /**
   * Return true if upvote exists on given post with given owner, false otherwise
   */
  async didUserUpvote(post: ObjectId, owner: ObjectId) {
    const upvotes = await this.getUpvotes({ post, owner });
    return upvotes.length > 0;
  }

  async delete(_id: ObjectId) {
    await this.upvotes.deleteOne({ _id });
    return { msg: "Upvote deleted successfully!" };
  }

  // assert like with given id exists and the owner is given user
  async isOwner(user: ObjectId, _id: ObjectId) {
    const upvote = await this.upvotes.readOne({ _id });
    if (!upvote) {
      throw new NotFoundError(`Upvote ${_id} does not exist!`);
    }
    if (upvote.owner.toString() !== user.toString()) {
      throw new UpvoteOwnerNotMatchError(user, _id);
    }
  }
}

export class UpvoteExistsError extends NotAllowedError {
  constructor(
    public readonly owner: ObjectId,
    public readonly post: ObjectId,
  ) {
    super("{0} already upvoted post {1}!", owner, post);
  }
}

export class UpvoteOwnerNotMatchError extends NotAllowedError {
  constructor(
    public readonly owner: ObjectId,
    public readonly _id: ObjectId,
  ) {
    super("{0} is not the owner of upvote {1}!", owner, _id);
  }
}
