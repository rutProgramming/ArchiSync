"use client"

import { formatDistanceToNow } from "date-fns"
import { cn } from "../S/utils"

export interface Message {
  id: string
  sender: {
    id: string
    name: string
    initials: string
    avatarUrl?: string
  }
  content: string
  timestamp: Date
  read: boolean
}

interface MessageItemProps {
  message: Message
  onClick?: (id: string) => void
}

const MessageItem = ({ message, onClick }: MessageItemProps) => {
  const handleClick = () => {
    if (onClick) onClick(message.id)
  }

  return (
    <div className={cn("message-item", !message.read && "unread")} onClick={handleClick}>
      <div className="message-avatar">
        {message.sender.avatarUrl ? (
          <img src={message.sender.avatarUrl || "/placeholder.svg"} alt={message.sender.name} />
        ) : (
          <div className="avatar-initials">{message.sender.initials}</div>
        )}
      </div>
      <div className="message-content">
        <div className="message-header">
          <h4 className="message-sender">{message.sender.name}</h4>
          <span className="message-time">{formatDistanceToNow(message.timestamp, { addSuffix: true })}</span>
        </div>
        <p className="message-text">{message.content}</p>
      </div>
    </div>
  )
}

export default MessageItem
