import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";

import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultformFields = {
    email: '', 
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultformFields);
    const { email, password, } = formFields;

    const resestFormFields = () => {
        setFormFields(defaultformFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            dispatch(emailSignInStart(email, password));
            resestFormFields();

        } catch (error) {
            switch((error as AuthError).code){
                case AuthErrorCodes.INVALID_PASSWORD:
                    alert('Incorrect password for email');
                    break
                case AuthErrorCodes.USER_MISMATCH:
                    alert('No user associated with this email');
                    break
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value });
    }

    return (
        <SignInContainer>
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

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
                
            </form>
        </SignInContainer>
    )
};

export default SignInForm;