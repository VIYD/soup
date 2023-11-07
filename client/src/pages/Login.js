import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),            
        password: Yup.string().required()               
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            //navigate('/');
            console.log(response.data);
        });
    };

    let navigate = useNavigate();

    return (
    <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formLogin">
                <label>Username</label>
                <ErrorMessage name='username' component='span' />
                <Field 
                    id='inputUsername' 
                    name='username' 
                    placeholder='Your username' 
                    autocomplete='off' />

                <label>Password</label>
                <ErrorMessage name='password' component='span' />
                <Field 
                    id='inputPassword' 
                    type='password'
                    name='password' 
                    placeholder='Your password' 
                    autocomplete='off' />
                <button type='submit'>Login</button>
            </Form>
        </Formik>
    </div>
    )
}

export default Login