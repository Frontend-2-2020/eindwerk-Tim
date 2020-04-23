import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, Field, ErrorMessage } from "formik";
import axios from "axios";

export default class NewPostForm extends Component {
  render() {
    const { setFieldValue, values, dummyBody } = this.props;
    return (
      <Form>
        <div className="newPost">
          <Field
            type="text"
            name="title"
            className="form-control mb-4"
            placeholder="titel"
          ></Field>
          <CKEditor
            name="body"
            editor={ClassicEditor}
            data={values.body}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFieldValue("body", data);
            }}
          ></CKEditor>

          <button className="btn btn-info my-4 btn-block" type="submit">
            Bevestigen
          </button>
        </div>
      </Form>
    );
  }
}
