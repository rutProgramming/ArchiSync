"use client"

import { useState, useEffect } from "react"
import { Bell, X, Info, AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "./utils"
import { formatDistanceToNow } from "date-fns"

export type NotificationType = "info" | "warning" | "success"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  timestamp: Date
  read: boolean
}

interface NotificationPanelProps {
  notifications: Notification[]
  onMarkAsRead?: (id: string) => void
  onClearAll?: () => void
}

const NotificationPanel = ({ notifications, onMarkAsRead, onClearAll }: NotificationPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const count = notifications.filter((notification) => !notification.read).length
    setUnreadCount(count)
  }, [notifications])

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }

  const handleMarkAsRead = (id: string) => {
    if (onMarkAsRead) {
      onMarkAsRead(id)
    }
  }

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll()
    }
    setIsOpen(false)
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info size={16} className="notification-icon info" />
      case "warning":
        return <AlertTriangle size={16} className="notification-icon warning" />
      case "success":
        return <CheckCircle size={16} className="notification-icon success" />
      default:
        return <Info size={16} className="notification-icon info" />
    }
  }

  return (
    <div className="notification-container">
      <button className="notification-trigger" onClick={togglePanel}>
        <Bell size={20} />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="notification-actions">
              <button className="clear-all" onClick={handleClearAll}>
                Clear All
              </button>
              <button className="close-panel" onClick={() => setIsOpen(false)}>
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn("notification-item", notification.read ? "read" : "unread")}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  {getNotificationIcon(notification.type)}
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationPanel
