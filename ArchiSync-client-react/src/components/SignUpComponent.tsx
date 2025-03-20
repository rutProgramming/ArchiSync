import { FormEvent, useRef } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { buttonStyles, styleForm } from "./style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/reduxStore";
import { Puser } from "../types/types"; 
import { SignUp } from "../store/Connect";

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
            <Box sx={styleForm}>
                <form onSubmit={handleSubmit}>
                    <TextField label='User Name' inputRef={userNameRef} required />
                    <TextField label='Email' inputRef={emailRef} type="email" required />
                    <TextField label='Password' inputRef={passwordRef} type="password" required />
                    <TextField label='Role Name' inputRef={roleNameRef} required />
                    <Button type="submit" sx={buttonStyles}>Sign Up</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default SignUpComponent;
