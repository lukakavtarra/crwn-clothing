import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss'

import Button from "../button/button.component";

import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    // console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
        alert('user created')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("passwords do not match");
            return
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            
            
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            

        }
        catch(error){
            if(error.code === 'auth/email-already-in-use') {
                alert('mail already exists')
            }else {
                console.log('user creation ecnauntered an error', error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})

    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label = 'Display Name'
                inputOptions = {{ 
                type : "text", 
                name : "displayName", 
                id : "name", 
                onChange : handleChange, 
                value : displayName, 
                required : true,
                }} />
 
                <FormInput 
                label='Display Name' 
                inputOptions = {{
                type : "email", 
                name : "email", 
                id : "email", 
                onChange : handleChange, 
                value : email, 
                required:true
            }} />

                <FormInput 
                label='Password' 
                inputOptions = {{
                type : "password", 
                name : "password", 
                id : "password", 
                onChange : handleChange, 
                value : password, 
                required:true
            }} />

                <FormInput 
                label='Confirm Password' 
                inputOptions = {{
                type : "password", 
                name : "confirmPassword", 
                id : "confirmPassword", 
                onChange : handleChange, 
                value : confirmPassword, 
                required:true,
            }} />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;