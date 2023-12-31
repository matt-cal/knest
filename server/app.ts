import AreaConcept from "./concepts/area";
import PostConcept from "./concepts/post";
import ReviewConcept from "./concepts/review";
import UpvoteConcept from "./concepts/upvote";
import UserConcept from "./concepts/user";
import WebSessionConcept from "./concepts/websession";

// App Definition using concepts
export const WebSession = new WebSessionConcept();
export const User = new UserConcept();
export const Post = new PostConcept();
export const Area = new AreaConcept();
export const Review = new ReviewConcept();
export const Upvote = new UpvoteConcept();
