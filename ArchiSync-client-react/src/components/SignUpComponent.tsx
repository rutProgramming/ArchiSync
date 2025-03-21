import { FormEvent, useRef } from "react";
import { Modal, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/reduxStore";
import { Puser } from "../types/types";
import { SignUp } from "../store/Connect";
import "../App.css";

const SignUpComponent = ({ onClose }: { onClose: () => void }) => {
    const userNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roleNameRef = useRef<HTMLInputElement>(null);
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const user: Puser = {
            userName: userNameRef.current?.value || '',
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
            RoleName: roleNameRef.current?.value || '',
        };

        try {
            const resultAction = await dispatch(SignUp({ user }));
            if (SignUp.fulfilled.match(resultAction)) {
                console.log('Sign-up successful:', resultAction.payload);
                onClose();
            } else {
                console.error('Sign-up failed:', resultAction.error);
                alert('Sign-up failed: ' + (resultAction.error.message || 'Unknown error'));
            }
        } catch (error: any) {
            console.error('Error during sign-up:', error);
            alert('An error occurred during sign-up.');
        }
    };

    return (
        <Modal open={true} onClose={() => onClose()}>
                <form onSubmit={handleSubmit} className="form-container">
                    <TextField
                        label='UserName'
                        inputRef={userNameRef}
                        required
                        variant="outlined"
                        fullWidth
                        className="custom-input" />
                    <TextField 
                        label='Email' 
                        inputRef={emailRef} 
                        type="email" 
                        required 
                        variant="outlined"
                        fullWidth
                        className="custom-input" />
                    <TextField 
                        label='Password' 
                        inputRef={passwordRef} 
                        type="password" 
                        required 
                        variant="outlined"
                        fullWidth
                        className="custom-input" />
                    <TextField 
                        label='RoleName' 
                        inputRef={roleNameRef} 
                        required 
                        variant="outlined"
                        fullWidth
                        className="custom-input" />
                    <button
                        type="submit" className="button button-primary">
                        Sign up
                    </button>
                </form>
        </Modal>
    );
};

export default SignUpComponent;
