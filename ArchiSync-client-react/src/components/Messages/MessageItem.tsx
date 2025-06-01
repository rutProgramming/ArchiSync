import { PartialMessage } from "../../types/types"
import { cn } from "../Additional/utils"
import { formatDistanceToNow } from "date-fns"

interface MessageItemProps {
  message: PartialMessage
  userType: 'architect' | 'user'
  onToggleRead: (id: number) => void
  onApprove?: (message: PartialMessage) => void
}
const MessageItem = ({ message, userType, onToggleRead, onApprove }: MessageItemProps) => {
  const isRead = userType === 'architect' ? message.architectIsRead : message.userIsRead
  
  const getMessageText = () => {
    if (userType === 'architect') {
      return message.approved
        ? `The access request for project #${message.projectId} has been approved.`
        : `A request for access for user: ${message.userId} to project #${message.projectId} has been submitted. Please review it for approval.`
    } else {
      return message.approved
        ? `Project access request #${message.id} has been approved.`
        : `A request #${message.id} for project access has been submitted.`
    }
  }

  return (
    <div className={cn("message-item", !isRead && "unread")}>
      <div className="message-avatar">
        <div className="avatar-initials">
          {message.user?.userName?.charAt(0) || message.architect?.userName?.charAt(0) || "??"}
        </div>
      </div>
      
      <div className="message-content" onClick={() => onToggleRead(message.id!)}>
        <div className="message-header">
          <h4 className="message-sender">
            {userType === 'architect' ? `User: ${message.userId}` : message.user?.userName}
          </h4>
          <span className="message-time">
            {message.createdAt && formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
          </span>
        </div>
        
        <p className="message-text">{getMessageText()}</p>
        
        {userType === 'architect' && !message.approved && onApprove && (
          <button 
            className="button-primary approve-btn"
            onClick={(e) => {
              e.stopPropagation()
              onApprove(message)
            }}
          >
            Approve Request
          </button>
        )}
      </div>
    </div>
  )
}
export default MessageItem