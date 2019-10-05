import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { doAddLikeWithErrorCheck, doRemoveLikeWithErrorCheck, doDeletePostWithErrorCheck } from "../../thunks/post";

const PostItem = ({ auth, post: {_id, text, name, avatar, userid, likes, comments, timestamp },
  onDeletePost, onAddLike, onRemoveLike, displayActions }) => {
  return (
    <Fragment>
      <div className = "post bg-white p-1 my-1">
        <div>
          <Link to = {`/profile/find/${userid}`}>
            <img className = "round-img" src={avatar} alt=""/>
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className = "my-1">{text}</p>
          <p className = "post-date">
            Posted <Moment fromNow>{timestamp}</Moment>
          </p>
          {displayActions && (
            <div>
              <button onClick = {() => onAddLike(_id) } type = "button" className = "btn btn-light">
                <i className = "fas fa-thumbs-up"></i>{" "}
                <span>
                  {likes.length > 0 && (
                    <span>{likes.length}</span>
                  )}
                </span>
              </button>
              <button onClick = {() => onRemoveLike(_id)} type = "button" className = "btn btn-light">
                <i className = "fas fa-thumbs-down"></i>
              </button>
              <Link to = {`/posts/${_id}`} className = "btn btn-primary">
                Discussion {" "} {comments.length > 0 && (
                  <span className = "comment-count">{comments.length}</span>
                )}
              </Link>
              {!auth.isLoading && userid === auth.user._id &&
                <button onClick = {() => onDeletePost(_id)} type = "button" className = "btn btn-danger">
                  <i className = "fas fa-trash-alt"></i>
                </button>
              }
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

PostItem.defaultProps = {
  displayActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  onAddLike: PropTypes.func.isRequired,
  onRemoveLike: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  displayActions: PropTypes.bool.isRequired
};

const mapSateToPropsPostItem = state => ({
  auth: state.authState,
});

const mapDispatchToPropsPostItem = dispatch => ({
  onAddLike: id => dispatch(doAddLikeWithErrorCheck(id)),
  onRemoveLike: id => dispatch(doRemoveLikeWithErrorCheck(id)),
  onDeletePost: id => dispatch(doDeletePostWithErrorCheck(id))
});

const ConnectedPostItem = connect(mapSateToPropsPostItem, mapDispatchToPropsPostItem)(PostItem);

export default ConnectedPostItem;
