import { POSTS_GET, POST_GET, POST_ERROR, UPDATE_LIKE, POST_ADD,
  POST_DELETE, COMMENT_ADD, COMMENT_REMOVE
} from "../constants/types";

const doGetPosts = payload => ({
  type: POSTS_GET,
  payload
});

const doSetPostError = payload => ({
  type: POST_ERROR,
  payload
});

const doAddLike = payload => ({
  type: UPDATE_LIKE,
  payload
});

const doRemoveLike = payload => ({
  type: UPDATE_LIKE,
  payload
});

const doDeletePost = payload => ({
  type: POST_DELETE,
  payload
});

const doAddPost = payload => ({
  type: POST_ADD,
  payload
});

const doGetSinglePost = payload => ({
  type: POST_GET,
  payload
});

const doAddComment = payload => ({
  type: COMMENT_ADD,
  payload
});

const doRemoveComment = payload => ({
  type: COMMENT_REMOVE,
  payload
});

export {
  doGetPosts, doSetPostError, doAddLike, doRemoveLike, doAddPost,
  doDeletePost, doGetSinglePost, doAddComment, doRemoveComment
};
