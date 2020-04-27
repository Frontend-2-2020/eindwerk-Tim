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
          <div className="form-group">
            <Field id="title" name="title" {...this.props}>
              {({ field, form, meta }) => (
                <input
                  type="text"
                  {...field}
                  placeholder="titel"
                  className={
                    "form-control " +
                    (meta.touched && meta.error ? "is-invalid" : "")
                  }
                />
              )}
            </Field>
            <ErrorMessage
              name="title"
              render={(msg) => (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {msg}
                </div>
              )}
            ></ErrorMessage>
          </div>
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
          <button className="btn btn-info my-4 btn-block" type="submit">
            Bevestigen
          </button>
        </div>
      </Form>
    );
  }
}
