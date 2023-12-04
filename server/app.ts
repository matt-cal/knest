import AreaConcept from "./concepts/area";
import FriendConcept from "./concepts/friend";
import PostConcept from "./concepts/post";
import ReviewConcept from "./concepts/review";
import UserConcept from "./concepts/user";
import WebSessionConcept from "./concepts/websession";

// App Definition using concepts
export const WebSession = new WebSessionConcept();
export const User = new UserConcept();
export const Post = new PostConcept();
export const Friend = new FriendConcept();
export const Area = new AreaConcept();
export const Review = new ReviewConcept();
