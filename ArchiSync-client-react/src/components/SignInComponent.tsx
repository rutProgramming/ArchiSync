import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { SignIn } from '../store/Connect';
import { AppDispatch } from '../store/reduxStore';
import { Modal, TextField } from '@mui/material';

const SignInComponent = ({ onClose }: { onClose: () => void }) => {
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
            <Modal open={true} onClose={() => onClose()}>
                <form onSubmit={handleSubmit} className="form-container">
                    <TextField
                        label='UserName'
                        type='text'
                        inputRef={userNameRef}
                        required variant="outlined"
                        fullWidth
                        className="custom-input" />
                    <TextField
                        label='Password'
                        inputRef={passwordRef}
                        type="password"
                        required variant="outlined"
                        fullWidth
                        className="custom-input" />
                    <button
                        type="submit" className="button button-primary">
                        Sign in
                    </button>
                </form>
            </Modal>

        </>
    );
};

export default SignInComponent;
