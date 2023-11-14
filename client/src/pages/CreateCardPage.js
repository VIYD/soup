import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCard() {
  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(), //required('error msg')
    description: Yup.string().required(), //Yup.string().max(...).min(...)
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/cards", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          alert("Log in to create a card.");
        } else {
          navigate(`/card/${response.data.id}`);
        }
      });
  };

  let navigate = useNavigate();

  return (
    <div className="createCardPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formCreateCard">
          <ErrorMessage name="title" component="span" />
          <Field
            className="titleCreation"
            as="textarea"
            id="inputCreateCard"
            name="title"
            placeholder="Your title"
            autoComplete="off"
          />

          <ErrorMessage name="description" component="span" />
          <Field
            className="descriptionCreation"
            as="textarea"
            id="inputCreateCard"
            name="description"
            placeholder="Your description"
            autoComplete="off"
          />
          <button type="submit">Create Card</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateCard;
