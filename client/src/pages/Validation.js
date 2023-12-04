import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Validation() {
  const initialValues = {
    username: "",
    code: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(20).required("Please, enter a username"),
    code: Yup.number().required("Please, enter code from your email")
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/validateCode", data);
      alert("Registration completed!")
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Error: Code is invalid!");
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
        <label>Enter created Username</label>
        <ErrorMessage name="username" component="span" />
        <Field
          id="inputUsername"
          name="username"
          placeholder="Your created username..."
          autocomplete="off"
        />

        <label>Enter your code from email for this user</label>
        <ErrorMessage name="code" component="span" />
        <Field
          id="inputCode"
          name="code"
          placeholder="Your code..."
          autocomplete="off"
        />
        <button type="submit">Complete registration</button>
      </Form>
    </Formik>
  );
}

export default Validation;
