import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SignIn } from '../store/Connect';
import { AppDispatch } from '../store/reduxStore';
import { Box, Button, Modal, TextField } from '@mui/material';
import { buttonStyles, styleForm } from './style';

const SignInComponent=({ onClose }: { onClose: () => void }) => {
    const dispatch: AppDispatch = useDispatch();
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
   

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const userName = userNameRef.current?.value;
        const password = passwordRef.current?.value;
        const user = { userName, password };

        try {
            const resultAction = await dispatch(SignIn({ user }));
            if (SignIn.fulfilled.match(resultAction)) {
                console.log('Sign-in successful:', resultAction.payload);
                onClose()
            } else {
                console.error('Sign-in failed:', resultAction.error);
            }
        } catch (error) {
            console.error('Error dispatching SignIn:', error);
        }
    };

    return (
        <>
            {/* <Button onClick={() => setModalOpen(true)}>Sign In</Button> */}
            <Modal open={true} onClose={()=>onClose()}>
                <Box sx={styleForm}>
                    <form onSubmit={handleSubmit}>
                        <TextField label='User Name' inputRef={userNameRef} required />
                        <TextField label='Password' inputRef={passwordRef} type="password" required />
                        <Button type="submit" sx={buttonStyles}>Sign in</Button>
                    </form>
                </Box>
            </Modal>
           
        </>
    );
};

export default SignInComponent;
