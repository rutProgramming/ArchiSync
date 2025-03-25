import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { useEffect } from "react";
import { PartialMessage, PartialProjectPermission } from "../types/types";
import { GetArchitectMessages, GetUserMessages, UpdateMessageStatus } from "../store/Message";
import { Card, CardContent, Typography, CircularProgress, Alert, Stack, Box, IconButton, Button } from "@mui/material";
import { MarkEmailUnread, MarkEmailRead } from "@mui/icons-material";
import { addProjectPremmision } from "../store/Premission";

const UserMessages = () => {
    const dispatch: AppDispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.messages.messages);
    const loading = useSelector((state: RootState) => state.messages.loading);
    const error = useSelector((state: RootState) => state.messages.error);
    const user = useSelector((state: RootState) => state.connect.user);

    useEffect(() => {
        if (user.RoleName === "architect") {
            dispatch(GetArchitectMessages());
        } else if (user.RoleName === "user") {
            dispatch(GetUserMessages());
        }
    }, [dispatch, user]);

    return (
        <Box sx={{ width: "100%", maxWidth: "800px", margin: "auto", padding: 2, backgroundColor: "#121212" }}>
            <Typography variant="h4" gutterBottom sx={{ color: "#FFD700" }}>User Messages</Typography>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}

            <Stack spacing={2}>
                <MessageSection title="" messages={messages}  RoleName={user.RoleName!} />
            </Stack>
        </Box>
    );
};

const MessageSection = ({ title, messages, RoleName }: { title: string; messages: PartialMessage[]; RoleName: string; }) => (

    <Box>
        <Typography variant="h5" gutterBottom sx={{ color: "#FFD700" }}>{title}</Typography>
        {messages.length === 0 ? <Typography sx={{ color: "#ffffff" }}>No messages</Typography> : messages.map((message) => (
            <MessageCard key={message.id} message={message}  RoleName={RoleName} />
        ))}
    </Box>
);

const MessageCard = ({ message, RoleName }: { 
    message: PartialMessage; 
    RoleName: string; 
}) => {
    const dispatch: AppDispatch = useDispatch();
    const handleToggleReadStatus = (message: PartialMessage) => {
        const updatedMessage: PartialMessage = { ...message, isRead: !message.isRead };
        dispatch(UpdateMessageStatus(updatedMessage));
    };
    const handleApprove = (message: PartialMessage) => {
        const projectPremmision: PartialProjectPermission = {
            userId: message.userId,
            projectId: message.projectId,
        };
        dispatch(addProjectPremmision(projectPremmision));
        const updatedMessage: PartialMessage = { ...message, approved: !message.approved };
        dispatch(UpdateMessageStatus(updatedMessage));
    };
    

    return (
        <Card variant="outlined" sx={{
            marginBottom: 2,
            backgroundColor: message.isRead ? "#333" : "#222",
            borderColor: "#FFD700",
            width: "100%",
            transition: '0.3s',
            '&:hover': {
                boxShadow: 6,
            },
        }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    {RoleName === "user" ? (
                        <Typography variant="h6" color="white">
                            {message.approved ? `Project access request #${message.id} has been approved.` :
                            `A request - ${message.id} for project access has been submitted`}
                        </Typography>
                    ) : null}

                    {RoleName === "architect" ? (
                        <Typography variant="h6" color="white">
                            {message.approved
                                ? `The access request for project #${message.id} has been approved.`
                                : `A request for access for user: ${message.userId} to project #${message.id} has been submitted. Please review it for approval.`
                            }
                            {!message.approved && (
                                <Button variant="contained" color="success" onClick={() => handleApprove(message)}>
                                    Approve Request
                                </Button>
                            )}
                        </Typography>
                    ) : null}
                </Box>
                <IconButton onClick={() => handleToggleReadStatus(message)} sx={{ color: "#FFD700" }}>
                    {message.isRead ? <MarkEmailUnread fontSize="large" /> : <MarkEmailRead fontSize="large" />}
                </IconButton>
            </CardContent>
        </Card>
    );
};



export default UserMessages;
