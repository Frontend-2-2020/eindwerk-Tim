import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { newComment, editComment } from "../../redux/actions/commentsActions";
import NewCommentForm from "./NewCommentForm";
import axios from "axios";

class NewComment extends Component {
  state = {};

  componentDidMount() {
    if (this.props.selectedComment) {
      const { selectedComment } = this.props;
      this.setState({ body: selectedComment.body });
    } else {
      this.getDummyText();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.selectedComment) {
        const { selectedComment } = this.props;
        this.setState({
          title: selectedComment.title,
          body: selectedComment.body,
        });
      } else {
        this.getDummyText();
      }
    }
  }

  getDummyText() {
    // om te disabelen, onderstaande axios call in commentaar zetten
    // axios.get("https://cat-fact.herokuapp.com/facts").then((res) => {
    //   let indexValue = Math.floor(Math.random() * res.data.all.length);
    //   this.setState({ body: res.data.all[indexValue].text });
    //   // setFieldValue("body", res.data.all[0].text);
    // });
  }

  submitHandler = (values) => {
    const { user, selectedComment, postId } = this.props;
    const newCommentResponse = {};
    const handleResult = (values) => {
      // console.log(values);
      this.props.addHandler(values);
    };
    if (this.props.selectedComment) {
      this.props.editComment(
        values,
        user,
        selectedComment,
        postId,
        handleResult
      );
    } else {
      // New comment aanmken + callback om result door te geven naar postdetail
      this.props.newComment(values, user, postId, handleResult);
    }
    // console.log(newCommentResponse);
    this.props.hideHandler();
  };

  validate = (values) => {
    const errors = {};
    const requiredFields = ["body"];
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
        initialValues={{ body: this.state.body }}
        enableReinitialize
      >
        {(props) => (
          <NewCommentForm {...props} {...this.props}></NewCommentForm>
        )}
      </Formik>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newComment: (values, user, postId, handleResult) =>
      dispatch(newComment(values, user, postId, handleResult)),
    editComment: (values, user, selectedComment, postId) =>
      dispatch(editComment(values, user, selectedComment, postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
