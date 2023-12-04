import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  let { setAuthState } = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please, enter a username"),
    password: Yup.string().required("Please, enter a password"),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", data);
      const { token, username, id } = response.data;
  
      localStorage.setItem("accessToken", token);
      setAuthState({ username, id, isLogged: true });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Error: Wrong username or password!");
      } else if (error.response && error.response.status === 404) {
        alert("Error: User does not exist.");
      } else {
        console.error("An error occurred during login:", error);
      }
    }
  };
  

  let navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formLogin">
          <label>Username</label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputUsername"
            name="username"
            placeholder="Your username..."
            autoComplete="off"
          />

          <label>Password</label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputPassword"
            type="password"
            name="password"
            placeholder="Your password..."
            autoComplete="off"
          />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
