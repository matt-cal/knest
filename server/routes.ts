import { ObjectId } from "mongodb";

import { Router, getExpressRouter } from "./framework/router";

import { Area, Friend, Post, User, WebSession } from "./app";
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

  @Router.get("/friends")
  async getFriends(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.idsToUsernames(await Friend.getFriends(user));
  }

  @Router.delete("/friends/:friend")
  async removeFriend(session: WebSessionDoc, friend: string) {
    const user = WebSession.getUser(session);
    const friendId = (await User.getUserByUsername(friend))._id;
    return await Friend.removeFriend(user, friendId);
  }

  @Router.get("/friend/requests")
  async getRequests(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Responses.friendRequests(await Friend.getRequests(user));
  }

  @Router.post("/friend/requests/:to")
  async sendFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.sendRequest(user, toId);
  }

  @Router.delete("/friend/requests/:to")
  async removeFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.removeRequest(user, toId);
  }

  @Router.put("/friend/accept/:from")
  async acceptFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.acceptRequest(fromId, user);
  }

  @Router.put("/friend/reject/:from")
  async rejectFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.rejectRequest(fromId, user);
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
}

export default getExpressRouter(new Routes());
