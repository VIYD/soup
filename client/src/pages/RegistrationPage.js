import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(20).required("Please, enter a username"), //required('error msg')
    password: Yup.string().min(4).max(20).required("Please, enter a password"), //Yup.string().max(...).min(...)
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      navigate("/login");
    });
  };

  let navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="formRegistration">
        <label>Create a Username</label>
        <ErrorMessage name="username" component="span" />
        <Field
          id="inputUsername"
          name="username"
          placeholder="Your username..."
          autocomplete="off"
        />

        <label>Create a Password</label>
        <ErrorMessage name="password" component="span" />
        <Field
          id="inputPassword"
          type="password"
          name="password"
          placeholder="Your password..."
          autocomplete="off"
        />
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}

export default Registration;
