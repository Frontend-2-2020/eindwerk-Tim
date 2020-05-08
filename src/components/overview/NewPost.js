import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { newPost, editPost } from "../../redux/actions/postsActions";
import NewPostForm from "./NewPostForm";
import axios from "axios";

class NewPost extends Component {
  state = {};

  componentDidMount() {
    if (this.props.selectedPost) {
      const { selectedPost } = this.props;
      this.setState({ title: selectedPost.title, body: selectedPost.body });
    } else {
      this.getDummyText();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.selectedPost) {
        const { selectedPost } = this.props;
        this.setState({ title: selectedPost.title, body: selectedPost.body });
      } else {
        this.getDummyText();
      }
    }
  }

  getDummyText() {
    axios.get("https://cat-fact.herokuapp.com/facts").then((res) => {
      let indexValue = Math.floor(Math.random() * res.data.all.length);
      this.setState({ title: "Cat Fact", body: res.data.all[indexValue].text });
      // setFieldValue("body", res.data.all[0].text);
    });
  }

  submitHandler = (values) => {
    const { user, selectedPost } = this.props;
    if (this.props.selectedPost) {
      this.props.editPost(values, user, selectedPost);
    } else {
      this.props.newPost(values, user);
    }
    this.props.hideHandler();
  };

  validate = (values) => {
    const errors = {};
    const requiredFields = ["title", "body"];
    requiredFields.forEach((requiredField) => {
      if (!values[requiredField]) {
        errors[requiredField] = "required";
      }
    });
    return errors;
  };
  render() {
    return (
      <Formik
        onSubmit={this.submitHandler}
        validate={this.validate}
        initialValues={{ title: this.state.title, body: this.state.body }}
        enableReinitialize
      >
        {(props) => <NewPostForm {...props} {...this.props}></NewPostForm>}
      </Formik>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (values, user) => dispatch(newPost(values, user)),
    editPost: (values, user, selectedPost) =>
      dispatch(editPost(values, user, selectedPost)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
