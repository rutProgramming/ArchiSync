import React, { useState, useRef, useEffect } from "react";
import { Send, Lightbulb } from "lucide-react";
import Button from "../Additional/Button";
import axios from "axios";
const url = import.meta.env.VITE_BASE_URL;

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChatProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const AIChat: React.FC<AIChatProps> = ({ prompt, setPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    try {
      const response = await axios.post(`${url}/api/OpenAI/ask`, {
        message: prompt,
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.response,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "Sorry, there was a problem contacting the AI.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="ai-chat" style={{ flex: 3 }}>
      <div className="chat-header">
        <div className="ai-avatar">
          <Lightbulb size={24} />
        </div>
        <h2>AI Assistant</h2>
      </div>

      <div className="chat-messages" style={{ overflowY: "auto", maxHeight: "400px" }}>
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
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
          className="chat-input-field"
        />
        <Button type="submit" variant="primary" className="send-button" disabled={!prompt.trim()}>
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default AIChat;
