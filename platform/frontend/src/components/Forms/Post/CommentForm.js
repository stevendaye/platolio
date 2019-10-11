import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { doAddCommentWithErrorCheck } from "../../../thunks/post";

const CommentForm = ({postid, onAddComment}) => {
  useEffect(() =>{
    document.getElementById("comment-text").focus();
  }, []);
  const [text, onSetText] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (document.getElementById("comment-text") !== " ") {
      onAddComment(postid, { text: text.trim() });
      onSetText("");
    }
  };

  return (
    <Fragment>
      <div className = "post-form">
        <form className = "form my-1" onSubmit = {e => onSubmit(e)}>
          <textarea
          id = "comment-text"
          style = { { marginBottom: "10px" } }
          name = "text"
          cols = "30"
          rows = "5"
          placeholder = "Leave a comment..."
          value = {text}
          onChange = {e => onSetText(e.target.value)} required></textarea>
          <input type = "submit" className = "btn btn-dark ny-1" value = "Comment" />
        </form>
      </div>
    </Fragment>
  );
};

CommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  postid: PropTypes.string.isRequired
};

const mapDispatchToPropsCommentForm = dispatch => ({
  onAddComment: (postid, text) => dispatch(doAddCommentWithErrorCheck(postid, text))
});

const ConnectedCommentForm = connect(null, mapDispatchToPropsCommentForm)(CommentForm);

export default ConnectedCommentForm;
