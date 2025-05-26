"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Lightbulb } from "lucide-react"
import Button from "../S/Button"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm your architecture assistant. I can help with project planning, design ideas, and technical questions. What specific aspect of your project would you like help with?",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className="ai-chat">
      <div className="chat-header">
        <div className="ai-avatar">
          <Lightbulb size={24} />
        </div>
        <h2>AI Assistant</h2>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-bubble">{message.content}</div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input-field"
        />
        <Button type="submit" variant="primary" className="send-button" disabled={!input.trim()}>
          <Send size={18} />
        </Button>
      </form>
    </div>
  )
}

export default AIChat
