import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../Forms/Post/CommentForm";
import Comments from "./Comments";
import { doGetSinglePostWithErrorCheck } from "../../thunks/post";

const Post = ({ onGetSinglePost, match, post: { post, isLoading } }) => {
  useEffect(() => {
    onGetSinglePost(match.params.id);
  }, [onGetSinglePost, match.params.id])

  return (
    <Fragment>
      {isLoading || post === null
        ? <Spinner/>
        : (
          <div>
            <Link to = "/posts" className = "btn">Back To Posts</Link>
            <PostItem post = {post} displayActions = {false} />
            <CommentForm postid = {post._id} />
            <Comments postid= {post._id} comments = {post.comments} />
          </div>
        )
      }
    </Fragment>
  );
};

Post.propTypes = {
  onGetSinglePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToPropsPost = state => ({
  post: state.postState
});

const mapDispatchToPropsPost = dispatch => ({
  onGetSinglePost: id => dispatch(doGetSinglePostWithErrorCheck(id))
});

const ConnectedPost = connect(mapStateToPropsPost, mapDispatchToPropsPost)(Post);

export default ConnectedPost;
