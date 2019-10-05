import { POSTS_GET, POST_ERROR, UPDATE_LIKE, POST_DELETE, POST_ADD,
  POST_GET, COMMENT_ADD, COMMENT_REMOVE
} from "../constants/types";

const initialState = {
  posts: [],
  post: null,
  isLoading: true,
  error: {}
};

const doApplyGetPosts = (state, payload) => ({
  ...state,
  posts: payload,
  isLoading: false
});

const doApplyGetSinglePost = (state, payload) => ({
  ...state,
  post: payload,
  isLoading: false
});

const doApplyAddPost = (state, payload) => ({
  ...state,
  posts: [payload, ...state.posts],
  isLoading: false
});

const doApplyAddComment = (state, payload) => ({
  ...state,
  post: {...state.post, comments: payload},
  isLoading: false
});

const doApplyRemoveComment = (state, payload) => ({
  ...state,
  post: {
    ...state.post,
    comments: state.post.comments.filter(comment => comment._id !== payload)
  },
  isLoading: false
});

const doApplyPostError = (state, payload) => ({
  ...state,
  isLoading: false,
  error: payload,
});

const doApplyUpdateLike = (state, payload) => ({
  ...state,
  posts: state.posts.map(post =>
    post._id === payload.id
      ? {...post, likes: payload.likes}
      : post
    ),
  isLoading: false
});

const doApplyDeletePost = (state, payload) => ({
  ...state,
  posts: state.posts.filter(post => post._id !== payload),
  isLoading: false
});

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_GET:
      return doApplyGetPosts(state, payload);
    case POST_GET:
      return doApplyGetSinglePost(state, payload);
    case POST_ADD:
      return doApplyAddPost(state, payload);
    case POST_DELETE:
      return doApplyDeletePost(state, payload);
    case COMMENT_ADD:
      return doApplyAddComment(state, payload);
    case COMMENT_REMOVE:
      return doApplyRemoveComment(state, payload);
    case POST_ERROR:
      return doApplyPostError(state, payload);
    case UPDATE_LIKE:
      return doApplyUpdateLike(state, payload);
    default:
      return state;
  }
};

export default postReducer;
