import React from "react";
import { Formik } from "formik";
import EmailValidator from "email-validator";


const ValidatedLoginForm = () => (
    <div>
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    console.log("Logging in", values);
                    setSubmitting(false);
                }, 500);
            }}
        >
            <h1>Validated Login Form</h1>
        </Formik>
    </div>
);

function validate(values){
    values => {
        let errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (!EmailValidator.validate(values.email)) {
          errors.email = "Invalid email address";
        }
  
        const passwordRegex = /(?=.*[0-9])/;
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 8) {
          errors.password = "Password must be 8 characters long.";
        } else if (!passwordRegex.test(values.password)) {
          errors.password = "Invalida password. Must contain one number";
        }
  
        return errors;
      }
}

export default ValidatedLoginForm;
