import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { doAddCommentWithErrorCheck } from "../../../thunks/post";

const CommentForm = ({postid, onAddComment}) => {
  const [text, onSetText] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    onAddComment(postid, { text });
    onSetText("");
  };

  return (
    <Fragment>
      <div className = "post-form">
        <div className = "bg-primary p">
          <h3>Leave a comment...</h3>
        </div>
        <form className = "form my-1" onSubmit = {e => onSubmit(e)}>
          <textarea
          style = { { marginBottom: "10px" } }
          name = "text"
          cols = "30"
          rows = "5"
          placeholder = "type your text"
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
