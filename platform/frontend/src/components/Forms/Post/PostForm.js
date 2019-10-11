import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { doAddPostWithErrorCheck } from "../../../thunks/post";

const PostForm = ({ onAddPost }) => {
  useEffect(() =>{
    document.getElementById("post-text").focus();
  }, []);

  const [text, onSetText] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (document.getElementById("post-text") !== " ") {
      onAddPost({ text: text.trim() });
      onSetText("");
    }
  }

  return (
    <Fragment>
      <div className = "post-form">
        <form className = "form my-1" onSubmit = {e => onSubmit(e)}>
          <textarea
          id = "post-text"
          style = { { marginBottom: "10px", fontFamily: "Calibri" } }
          name = "text"
          cols = "30"
          rows = "5"
          placeholder = "Write Something..."
          value = {text}
          onChange = {e => onSetText(e.target.value)}
          required></textarea>
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
