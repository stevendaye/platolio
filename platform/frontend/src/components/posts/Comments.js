import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { doRemoveCommentWithErrorCheck } from "../../thunks/post";

const Comments = ({ postid, comments, onRemoveComment, auth : {user, isLoading} }) =>
  <Fragment>
    <div className = "comments">
      {comments.map(comment => (
        <div className = "post bg-white p-1 my-1" id = { comment._id }>
          <div>
            <Link to = {`/profile/${comment.userid}`} >
              <img className = "round-img" alt = "" src = {comment.avatar} />
              <h4>{comment.name}</h4>
            </Link>
          </div>
          <div>
            <p className = "my-1">
              {comment.text}
            </p>
            <p className = "post-date">
              Posted <Moment fromNow>{comment.timestamp}</Moment>
            </p>
            {!isLoading && comment.userid === user._id &&
              <button
              className = "btn btn-danger"
              onClick = { () => { onRemoveComment(postid, comment._id) } }
              type = "button"
              >
                <i className = "fas fa-trash-alt"></i>
              </button>
            }
          </div>
        </div>
      ))}
    </div>
  </Fragment>

Comments.propTypes = {
  postid: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  onRemoveComment: PropTypes.func.isRequired
};

const mapStateToPropsComments = state => ({
  auth: state.authState
});

const mapDispatchToPropsCommets = dispatch => ({
  onRemoveComment: (postid, commentid) =>
    dispatch(doRemoveCommentWithErrorCheck(postid, commentid))
});

const ConnectedComments = connect(mapStateToPropsComments, mapDispatchToPropsCommets)(Comments);

export default ConnectedComments;
