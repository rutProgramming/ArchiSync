import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/reduxStore"
import { 
  GetArchitectMessages, 
  GetUserMessages,
  UpdateMessageStatus, 
  toggleArchitectMessageReadStatus,
  toggleUserMessageReadStatus 
} from "../../store/Message"
import { addProjectPremmision } from "../../store/Premission"
import { PartialMessage, PartialProjectPermission } from "../../types/types"
import "../../App.css"
import MessageItem from "./MessageItem"



const Messages = () => {
  const dispatch: AppDispatch = useDispatch()
  const messages = useSelector((state: RootState) => state.messages.messages)
  const loading = useSelector((state: RootState) => state.messages.loading)
  const error = useSelector((state: RootState) => state.messages.error)
  const user = useSelector((state: RootState) => state.connect.user)
  
  const userType: 'architect' | 'user' = user?.RoleName === 'architect' ? 'architect' : 'user'

  useEffect(() => {
    const fetchMessages = () => {
      if (userType === 'architect') {
        dispatch(GetArchitectMessages())
      } else {
        dispatch(GetUserMessages())
      }
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 60000)
    return () => clearInterval(interval)
  }, [dispatch, user, userType])

  const toggleReadStatus = (id: number) => {
    const message = messages.find((m) => m.id === id)
    if (!message) return

    if (userType === 'architect') {
      const updated = { ...message, architectIsRead: !message.architectIsRead }
      const projectPremmision: PartialProjectPermission = {
          userId: message.userId,
          projectId: message.projectId,
      };
      dispatch(addProjectPremmision(projectPremmision));
      dispatch(UpdateMessageStatus(updated))
      dispatch(toggleArchitectMessageReadStatus(id))
    } else {
     
      dispatch(toggleUserMessageReadStatus(id))
    }
  }

  const handleApprove = (message: PartialMessage) => {
    const projectPermission: PartialProjectPermission = {
      userId: message.userId,
      projectId: message.projectId,
    }
    
    dispatch(addProjectPremmision(projectPermission))
    
    const updatedMessage: PartialMessage = { 
      ...message, 
      approved: true 
    }
    dispatch(UpdateMessageStatus(updatedMessage))
  }

  return (
    <div className="messages-page">
      <div className="page-header">
        <h1>Messages</h1>
      </div>

      <div className="messages-list">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        
        {!loading && messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages found</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageItem 
              key={msg.id} 
              message={msg} 
              userType={userType}
              onToggleRead={toggleReadStatus}
              onApprove={userType === 'architect' ? handleApprove : undefined}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Messages