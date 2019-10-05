import axios from "axios";

const GET_POSTS_URL = "/posts";
const GET_POST_URL = "/posts/read";
const LIKE_URL = "/posts/like";
const UNLIKE_URL = "/posts/unlike";
const DELETE_POST_URL = "/posts/destroy";
const POST_ADD_URL = "/posts/add";
const COMMENT_ADD_URL = "/posts/comments/add";
const COMMENT_REMOVE_URL = "/posts/comments/remove";

const getPosts = async () => {
  return await axios.get(GET_POSTS_URL);
};

const getSinglePost = async id => {
  return await axios.get(`${GET_POST_URL}/${id}`);
};

const addPost = async formPostData => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(formPostData);
  return axios.post(POST_ADD_URL, body, config);
};

const addComment = async (postid, formCommentData ) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(formCommentData);
  return axios.post(`${COMMENT_ADD_URL}/${postid}`, body, config);
};

const removeComment = async (postid, commentid) => {
  return axios.delete(`${COMMENT_REMOVE_URL}/${postid}/${commentid}`);
};

const addLike = async id => {
  return await axios.put(`${LIKE_URL}/${id}`);
};

const removeLike = async id => {
  return await axios.put(`${UNLIKE_URL}/${id}`);
};

const deletePost = async id => {
  return await axios.delete(`${DELETE_POST_URL}/${id}`);
};

export {
  getPosts, getSinglePost, addLike, removeLike,
  addPost, deletePost, addComment, removeComment
};
