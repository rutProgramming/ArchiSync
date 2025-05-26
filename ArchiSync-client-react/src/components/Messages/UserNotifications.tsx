// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../store/reduxStore";
// import { useEffect } from "react";
// import { PartialMessage } from "../types/types";
// import { GetUserMessages, toggleUserMessageReadStatus, UpdateMessageStatus } from "../store/Message";
// import { Card, CardContent, Typography, CircularProgress, Alert, Stack, Box, IconButton } from "@mui/material";
// import { MarkEmailUnread, MarkEmailRead } from "@mui/icons-material";

// const UserNotifications = () => {
//     const dispatch: AppDispatch = useDispatch();
//     const messages = useSelector((state: RootState) => state.messages.messages);
//     const loading = useSelector((state: RootState) => state.messages.loading);
//     const error = useSelector((state: RootState) => state.messages.error);
//     const user = useSelector((state: RootState) => state.connect.user);
//     useEffect(() => {
//         dispatch(GetUserMessages());
//         const interval = setInterval(() => {
//             dispatch(GetUserMessages());
//         }, 60000);

//         return () => clearInterval(interval);
//     }, [dispatch, user]);

//     return (
//         <Box sx={{ width: "100%", maxWidth: "800px", margin: "auto", padding: 2, backgroundColor: "#121212" }}>
//             <Typography variant="h4" gutterBottom sx={{ color: "#FFD700" }}>User Messages</Typography>
//             {loading && <CircularProgress />}
//             {error && <Alert severity="error">{error}</Alert>}

//             <Stack spacing={2}>
//                 <MessageSection title="" messages={messages} />
//             </Stack>
//         </Box>
//     );
// };

// const MessageSection = ({ title, messages }: { title: string; messages: PartialMessage[]; }) => (

//     <Box>
//         <Typography variant="h5" gutterBottom sx={{ color: "#FFD700" }}>{title}</Typography>
//         {messages.length === 0 ? <Typography sx={{ color: "#ffffff" }}>No messages</Typography> : messages.map((message) => (
//             <MessageCard key={message.id} message={message} />
//         ))}
//     </Box>
// );

// const MessageCard = ({ message }: {
//     message: PartialMessage;
// }) => {
//     const dispatch: AppDispatch = useDispatch();
//     const handleToggleReadStatus = (message: PartialMessage) => {
//         const updatedMessage: PartialMessage = { ...message, userIsRead: !message.userIsRead };
//         dispatch(UpdateMessageStatus(updatedMessage));
//         dispatch(toggleUserMessageReadStatus(updatedMessage.id!));
        
//     };



//     return (
//         <Card variant="outlined" sx={{
//             marginBottom: 2,
//             backgroundColor: message.userIsRead ? "#333" : "#222",
//             borderColor: "#FFD700",
//             width: "100%",
//             transition: '0.3s',
//             '&:hover': {
//                 boxShadow: 6,
//             },
//         }}>
//             <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <Box>
//                     <Typography variant="h6" color="white">
//                         {message.approved ? `Project access request #${message.id} has been approved.` :
//                             `A request - ${message.id} for project access has been submitted`}
//                     </Typography>
//                 </Box>
//                 <IconButton onClick={() => handleToggleReadStatus(message)} sx={{ color: "#FFD700" }}>

//                     {!message.userIsRead ? <MarkEmailUnread fontSize="large" /> : <MarkEmailRead fontSize="large" />}
//                 </IconButton>
//             </CardContent>
//         </Card>
//     );
// };


// export default UserNotifications;




"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { formatDistanceToNow } from "date-fns"
import { AppDispatch, RootState } from "../../store/reduxStore"
import { GetUserMessages, UpdateMessageStatus, toggleUserMessageReadStatus } from "../../store/Message"
import { PartialMessage } from "../../types/types"
import { cn } from "../S/utils"
import "../../App.css" // במידה והקלאסים שלך שם

const MessageItem = ({ message, onToggleRead }: { message: PartialMessage, onToggleRead: (id: number) => void }) => {
  return (
    <div
      className={cn("message-item", !message.userIsRead && "unread")}
      onClick={() => onToggleRead(message.id!)}
    >
      <div className="message-avatar">
        <div className="avatar-initials">{message.user?.userName.charAt(0) || "??"}</div>
      </div>
      <div className="message-content">
        <div className="message-header">
          <h4 className="message-sender">{message.user?.userName}</h4>
          <span className="message-time">
            {formatDistanceToNow(new Date(message.createdAt!), { addSuffix: true })}
          </span>
        </div>
        <p className="message-text">
          {message.approved
            ? `Project access request #${message.id} has been approved.`
            : `A request #${message.id} for project access has been submitted.`}
        </p>
      </div>
    </div>
  )
}

const UserMessages = () => {
  const dispatch: AppDispatch = useDispatch()
  const messages = useSelector((state: RootState) => state.messages.messages)
  const loading = useSelector((state: RootState) => state.messages.loading)
  const error = useSelector((state: RootState) => state.messages.error)
  const user = useSelector((state: RootState) => state.connect.user)

  useEffect(() => {
    dispatch(GetUserMessages())
    const interval = setInterval(() => dispatch(GetUserMessages()), 60000)
    return () => clearInterval(interval)
  }, [dispatch, user])

  const toggleReadStatus = (id: number) => {
    const message = messages.find((m) => m.id == id)
    if (!message) return
    const updated = { ...message, userIsRead: !message.userIsRead }
    dispatch(UpdateMessageStatus(updated))
    dispatch(toggleUserMessageReadStatus(id))
  }

  return (
    <div className="messages-page">
      <div className="page-header">
        <h1>Messages</h1>
      </div>

      <div className="messages-list">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages found</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} onToggleRead={toggleReadStatus} />
          ))
        )}
      </div>
    </div>
  )
}

export default UserMessages

