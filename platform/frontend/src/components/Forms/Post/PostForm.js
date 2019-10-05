import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { doAddPostWithErrorCheck } from "../../../thunks/post";

const PostForm = ({ onAddPost }) => {
  const [text, onSetText] = useState(" ");

  const onSubmit = e => {
    e.preventDefault();
    onAddPost({ text });
    onSetText("");
  }

  return (
    <Fragment>
      <div className = "post-form">
        <div className = "bg-primary p">
          <h3>Write Something...</h3>
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
          <input type = "submit" className = "btn btn-dark ny-1" value = "Post" />
        </form>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  onAddPost: PropTypes.func.isRequired
};

const mapDispatchToPropsPostFrom = dispatch => ({
  onAddPost: text => dispatch(doAddPostWithErrorCheck(text))
});

const ConnectedPostForm = connect(null, mapDispatchToPropsPostFrom)(PostForm);

export default ConnectedPostForm;
