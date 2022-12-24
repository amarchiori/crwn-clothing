import { useState } from "react";
import FormInput from "../form-input/form-input.component";

import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from "../../utilities/firebase.utils";

import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultformFields = {
    email: '', 
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const { email, password, } = formFields;

    const resestFormFields = () => {
        setFormFields(defaultformFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSumbit = async (event) => {
        event.preventDefault();
        
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resestFormFields();

        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value });
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSumbit}>

            <FormInput
                    label='Email'
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}/>

                <FormInput
                    label='Password'
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}/>

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;