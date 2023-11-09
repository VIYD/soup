import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Registration() {
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),             //required('error msg')
        password: Yup.string().min(4).max(20).required()               //Yup.string().max(...).min(...)
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            navigate('/');
        });
    };

    let navigate = useNavigate();

    return (
    <div className='registrationPage'> 
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formRegister'>
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
                <button type='submit'>Register</button>
            </Form>
        </Formik>
    </div>)
}

export default Registration