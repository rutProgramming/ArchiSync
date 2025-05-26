"use client"

import { useState } from "react"
import SearchBar from "../Bar/SearchBar"
import MessageItem, { type Message } from "./MessageItem"

// Sample data
const sampleMessages: Message[] = [
  {
    id: "1",
    sender: {
      id: "user1",
      name: "John Doe",
      initials: "JD",
    },
    content: "What's the status of our residential project?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  },
  {
    id: "2",
    sender: {
      id: "user2",
      name: "Emma R",
      initials: "ER",
    },
    content: "Can you provide the revised floor plans by tomorrow?",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
  },
  {
    id: "3",
    sender: {
      id: "user3",
      name: "Alice Smith",
      initials: "AS",
    },
    content: "Great, thanks!",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: "4",
    sender: {
      id: "user4",
      name: "Robert Johnson",
      initials: "RJ",
    },
    content: "The client approved the design concept. We can move forward with detailed drawings.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
  },
]

const Messages = () => {
  const [messages] = useState<Message[]>(sampleMessages)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMessages = searchQuery
    ? messages.filter(
        (message) =>
          message.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : messages

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="messages-page">
      <div className="page-header">
        <h1>Messages</h1>
        <SearchBar onSearch={handleSearch} placeholder="Search messages..." />
      </div>

      <div className="messages-list">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => <MessageItem key={message.id} message={message} />)
        ) : (
          <div className="no-messages">
            <p>No messages found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
