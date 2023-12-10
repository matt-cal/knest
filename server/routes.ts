import { ObjectId } from "mongodb";

import { Router, getExpressRouter } from "./framework/router";

import { Area, Post, Review, Upvote, User, WebSession } from "./app";
import { AreaDoc } from "./concepts/area";
import { PostDoc, PostOptions } from "./concepts/post";
import { UserDoc } from "./concepts/user";
import { WebSessionDoc } from "./concepts/websession";
import Responses from "./responses";

class Routes {
  @Router.get("/session")
  async getSessionUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.getUserById(user);
  }

  @Router.get("/users")
  async getUsers() {
    return await User.getUsers();
  }

  @Router.get("/users/:username")
  async getUser(username: string) {
    return await User.getUserByUsername(username);
  }

  @Router.post("/users")
  async createUser(session: WebSessionDoc, username: string, password: string) {
    WebSession.isLoggedOut(session);
    return await User.create(username, password);
  }

  @Router.patch("/users")
  async updateUser(session: WebSessionDoc, update: Partial<UserDoc>) {
    const user = WebSession.getUser(session);
    return await User.update(user, update);
  }

  @Router.delete("/users")
  async deleteUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    WebSession.end(session);
    return await User.delete(user);
  }

  @Router.post("/login")
  async logIn(session: WebSessionDoc, username: string, password: string) {
    const u = await User.authenticate(username, password);
    WebSession.start(session, u._id);
    return { msg: "Logged in!" };
  }

  @Router.post("/logout")
  async logOut(session: WebSessionDoc) {
    WebSession.end(session);
    return { msg: "Logged out!" };
  }

  @Router.get("/posts")
  async getPosts(author?: string) {
    let posts;
    if (author) {
      const id = (await User.getUserByUsername(author))._id;
      posts = await Post.getByAuthor(id);
    } else {
      posts = await Post.getPosts({});
    }
    return Responses.posts(posts);
  }

  @Router.post("/posts")
  async createPost(session: WebSessionDoc, content: string, area: string, options?: PostOptions) {
    const user = WebSession.getUser(session);
    // assert area exists
    await Area.getByTitle(area);
    const created = await Post.create(user, content, area, options);
    return { msg: created.msg, post: await Responses.post(created.post) };
  }

  @Router.patch("/posts/:_id")
  async updatePost(session: WebSessionDoc, _id: ObjectId, update: Partial<PostDoc>) {
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    return await Post.update(_id, update);
  }

  @Router.delete("/posts/:_id")
  async deletePost(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    return Post.delete(_id);
  }

  @Router.get("/areas")
  async getAreas(title?: string, _id?: ObjectId) {
    let areas;
    if (title) {
      areas = [await Area.getByTitle(title)];
    } else if (_id) {
      areas = [await Area.getArea(_id)];
    } else {
      areas = await Area.getAreas({});
    }
    return areas;
  }

  @Router.get("/areas/:_id/subareas")
  async getSubareas(_id: ObjectId) {
    return await Area.getSubareas(_id);
  }

  // get the posts linked to the area with the given title
  @Router.get("/areas/:title/posts")
  async getAreaPosts(title: string) {
    const area = await Area.getByTitle(title);
    const posts = await Post.getPosts({ area: area.title });
    return Responses.posts(posts);
  }

  @Router.post("/areas")
  async createArea(session: WebSessionDoc, title: string, location: string, parentAreaTitle?: string) {
    // assert user is logged in
    WebSession.getUser(session);
    const created = await Area.create(title, location, parentAreaTitle);
    return { msg: created.msg, area: created.area };
  }

  @Router.patch("/areas/:_id")
  async updateArea(session: WebSessionDoc, _id: ObjectId, update: Partial<AreaDoc>) {
    // assert user is logged in
    WebSession.getUser(session);
    return await Area.update(_id, update);
  }

  @Router.delete("/areas/:_id")
  async deleteArea(session: WebSessionDoc, _id: ObjectId) {
    // assert user is logged in
    WebSession.getUser(session);
    return Area.deleteByObjectId(_id);
  }

  @Router.get("/reviews")
  async getReviews(area?: string) {
    let reviews;
    if (area) {
      reviews = await Review.getByArea(area);
    } else {
      reviews = "Area does not exist";
    }
    return reviews;
  }

  // get the reviews linked to the area with the given title
  @Router.get("/areas/:title/reviews")
  async getAreaReviews(title: string) {
    const area = await Area.getByTitle(title);
    const reviews = await Review.getReviews({ area: area.title });
    return Responses.reviews(reviews);
  }

  // get all reviews of all of the subareas of area with given title
  // Given Boston, will return all reviews that are linked to neighborhoods of Boston
  @Router.get("/areas/:title/subareaReviews")
  async getSubareaReviews(title: string) {
    const _id = (await Area.getByTitle(title))._id;
    const subareas = await Area.getSubareas(_id);
    const subareaTitles = subareas.map((a) => a.title);
    const reviews = await Review.getAllReviews(subareaTitles);
    return Responses.reviews(reviews);
  }

  @Router.post("/reviews")
  async createReview(session: WebSessionDoc, content: string, area: string, values: Map<string, number>, options?: PostOptions) {
    const user = WebSession.getUser(session);
    // assert area exists
    await Area.getByTitle(area);
    const created = await Review.create(user, content, area, values, options);
    return { msg: created.msg, review: created.review };
  }

  @Router.patch("/reviews/:_id")
  async updateReview(session: WebSessionDoc, _id: ObjectId, update: Partial<PostDoc>) {
    const user = WebSession.getUser(session);
    await Review.isAuthor(user, _id);
    return await Review.update(_id, update);
  }

  @Router.delete("/reviews/:_id")
  async deleteReview(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Review.isAuthor(user, _id);
    return Review.delete(_id);
  }

  // create upvote on post with given id
  @Router.post("/upvotes/:_id")
  async createUpvote(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    const post = (await Post.getPosts({ _id }))[0]._id;
    const created = await Upvote.create(user, post);
    return { msg: created.msg, upvote: created.upvote };
  }

  // delete like on post with given id
  @Router.delete("/upvotes/:_id")
  async deleteUpvote(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    const post = (await Post.getPosts({ _id }))[0]._id;
    const upvoteId = (await Upvote.getByOwnerPost(post, user))._id;
    await Upvote.isOwner(user, upvoteId);
    return await Upvote.delete(upvoteId);
  }

  @Router.get("/user/:username/upvotes")
  async getUserUpvotes(username: string) {
    const id = (await User.getUserByUsername(username))._id;
    const upvotes = await Upvote.getByOwner(id);
    return upvotes;
  }

  @Router.get("/post/:_id/upvotes")
  async getPostUpvotes(_id: ObjectId) {
    const id = (await Post.getPosts({ _id }))[0]._id;
    const upvotes = await Upvote.getByPost(id);
    return upvotes;
  }

  // see if logged in user has liked given post
  @Router.get("/user/upvoted/:_id")
  async didUserUpvote(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    const postId = (await Post.getPosts({ _id }))[0]._id;
    return await Upvote.didUserUpvote(postId, user);
  }
}

export default getExpressRouter(new Routes());
