import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostFrom from "../Forms/Post/PostForm";
import doGetPostsWithErrorCheck from "../../thunks/post";

const Posts = ({ onGetPosts, posts: { posts, isLoading } }) => {
  useEffect(() => {
    onGetPosts();
  }, [onGetPosts])

  return (
    <Fragment>
      { isLoading
        ? <Spinner />
        : ( 
          <div className = "wrap-set-bottom">
            <h1 className = "large text-primary" style = {{marginTop: "15px"}}>Posts</h1>
            <p className = "lead">
              <i className = "fas fa-user">Welcome to the community</i>
            </p>
            <PostFrom />
            <div className = "posts">
              {posts.map(post => (
                <PostItem
                  key = {post._id}
                  post = {post}
                />
              ))}
            </div>
            {}
          </div>
        )
      }
    </Fragment>
  );
};

Posts.propTypes = {
  onGetPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToPropsPosts = state => ({
  posts: state.postState
});

const mapDispatchToPropsPosts = dispatch => ({
  onGetPosts: () => dispatch(doGetPostsWithErrorCheck())
});

const ConnectedPosts = connect(mapStateToPropsPosts, mapDispatchToPropsPosts)(Posts);

export default ConnectedPosts;
