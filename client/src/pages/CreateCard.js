import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CreateCard() {
    const initialValues = {
        title: '',
        description: ''
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),             //required('error msg')
        description: Yup.string().required()        //Yup.string().max(...).min(...)
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/cards", data).then((response) => {
            //navigate(`/cards/byID/${id}`) //зробити навігацію на сторінку картки, яку створено
            navigate('/');
        });
    };

    let navigate = useNavigate();


    return <div className="createCardPage"> 
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formCreateCard">
                <label>Title</label>
                <ErrorMessage name='title' component='span' />
                <Field 
                    id='inputCreateCard' 
                    name='title' 
                    placeholder='Your title' 
                    autocomplete='off' />

                <label>Description</label>
                <ErrorMessage name='description' component='span' />
                <Field 
                    id='inputCreateCard' 
                    name='description' 
                    placeholder='Your description' 
                    autocomplete='off' />
                <button type='submit'>Create Card</button>
            </Form>
        </Formik>
    </div>
}

export default CreateCard;