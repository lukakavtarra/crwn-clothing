import { useState } from "react";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss'

import Button from "../button/button.component";

import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
        }
        catch(error){
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Password is incorect')
                    break
                case "auth/user-not-found":
                alert('User not Found')
                break
                default:
                    console.error(error)
            }

            console.log(error)

    }
}

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})

    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}


export default SignInForm;