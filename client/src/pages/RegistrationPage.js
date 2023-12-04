import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function Registration() {
  const initialValues = {
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(20).required("Please, enter a username"), //required('error msg')
    password: Yup.string().min(4).max(20).required("Please, enter a password"), //Yup.string().max(...).min(...)
    email: Yup.string().email().required("Please, enter your email"),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/register", data);
      navigate("/validation");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Error: Username already taken!");
      } else {
        console.error("An error occurred during registration:", error);
      }
    }
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

        <label>Enter your email</label>
        <ErrorMessage name="email" component="span" />
        <Field
          id="inputEmail"
          name="email"
          placeholder="Your email..."
          autocomplete="off"
        />
        <button type="submit">Register</button>
        <Link to="/validation">Need to validate account? Click here.</Link>
      </Form>
    </Formik>
  );
}

export default Registration;
