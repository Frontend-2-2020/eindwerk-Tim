import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, Field, ErrorMessage } from "formik";

export default class NewCommentForm extends Component {
  render() {
    const { setFieldValue, values, dummyBody } = this.props;
    return (
      <Form>
        <div className="newComment">
          <div className="form-group">
            <CKEditor
              id="body"
              name="body"
              editor={ClassicEditor}
              data={values.body}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFieldValue("body", data);
              }}
            ></CKEditor>{" "}
            <ErrorMessage
              name="body"
              render={(msg) => (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {msg}
                </div>
              )}
            ></ErrorMessage>
          </div>
          <button
            className="btn my-4 btn-block nes-btn is-success"
            type="submit"
          >
            {this.props.buttonText}
          </button>
        </div>
      </Form>
    );
  }
}
