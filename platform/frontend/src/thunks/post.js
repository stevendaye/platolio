import { doGetPosts, doGetSinglePost,  doSetPostError, doAddLike, doRemoveLike,
  doAddPost, doDeletePost, doAddComment, doRemoveComment
} from "../actions/post";
import { getPosts, getSinglePost, addLike, removeLike, addPost, deletePost,
  addComment, removeComment
} from "../apis/post";
import doSetRemoveNoification from "./notifications";

const doGetPostsWithErrorCheck = () => {
  return async function(dispatch) {
    try {
      const posts = await getPosts();
      dispatch(doGetPosts(posts.data));
    } catch (err) {
      dispatch(doSetPostError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doGetSinglePostWithErrorCheck = id => {
  return async function(dispatch) {
    try {
      const post = await getSinglePost(id);
      dispatch(doGetSinglePost(post.data));
    } catch (err) {
      dispatch(doSetPostError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doAddLikeWithErrorCheck = id => {
  return async function(dispatch) {
    try {
      const posts = await addLike(id);
      dispatch(doAddLike({id, likes: posts.data}));
    } catch (err) {
      dispatch(doSetPostError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doRemoveLikeWithErrorCheck = id => {
  return async function(dispatch) {
    try {
      const posts = await removeLike(id);
      dispatch(doRemoveLike({id, likes: posts.data}));
    } catch (err) {
      dispatch(doSetPostError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doAddPostWithErrorCheck = formPostData => {
  return async function(dispatch) {
    try {
      const posts = await addPost(formPostData);
      dispatch(doAddPost(posts.data));
      dispatch(doSetRemoveNoification("Post Added", "success"));
    } catch (err) {
      dispatch(doSetPostError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doDeletePostWithErrorCheck = id => {
  return async function(dispatch) {
    try {
      await deletePost(id);
      dispatch(doDeletePost(id));
      dispatch(doSetRemoveNoification("Post Deleted", "success"));
    } catch (err) {
      dispatch(doSetPostError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doAddCommentWithErrorCheck = (postid, commentFormData) => {
  return async function(dispatch) {
    try {
      const post = await addComment(postid, commentFormData);
      dispatch(doAddComment(post.data));
      dispatch(doSetRemoveNoification("Comment Added", "success"));
    } catch (err) {
      dispatch(doSetPostError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doRemoveCommentWithErrorCheck = (postid, commentid) => {
  return async function(dispatch) {
    try {
      await removeComment(postid, commentid);
      dispatch(doRemoveComment(commentid));
      dispatch(doSetRemoveNoification("Comment Deleted", "success"));
    } catch (err) {
      dispatch(doSetPostError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

export default doGetPostsWithErrorCheck;
export {
  doGetSinglePostWithErrorCheck,
  doAddLikeWithErrorCheck, doRemoveLikeWithErrorCheck,
  doAddPostWithErrorCheck, doDeletePostWithErrorCheck,
  doAddCommentWithErrorCheck, doRemoveCommentWithErrorCheck
};
