
import { useState, useRef, useEffect } from "react"
import { Send, Plus, Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import "./AIAssistant.css"

const AIAssistant = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Add initial greeting message
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          role: "assistant",
          content: "שלום! אני עוזר ה-AI שלך. איך אני יכול לעזור לך היום?",
          timestamp: new Date().toISOString(),
        },
      ])
    }
  }, [messages.length])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "אני יכול לעזור לך בתכנון הפרויקט. האם תוכל לספק לי יותר פרטים על הדרישות?",
        "בהתבסס על המידע שסיפקת, אני ממליץ לשקול גישה מודולרית לתכנון. זה יאפשר גמישות רבה יותר בעתיד.",
        "הנה כמה רעיונות לתכנון החלל: 1) שימוש בתאורה טבעית מקסימלית, 2) יצירת מרחבים רב-תכליתיים, 3) שילוב אלמנטים ירוקים.",
        "אני יכול לעזור לך לחשב את העלויות המשוערות של הפרויקט. אנא ספק לי את המידות והחומרים המתוכננים.",
        "בהתחשב בדרישות הקיימות, אני ממליץ לשקול שימוש בחומרים ברי-קיימא כמו עץ ממוחזר וזכוכית בעלת בידוד גבוה.",
      ]

      const aiMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="ai-assistant-page">
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-avatar">{message.role === "assistant" ? "AI" : "You"}</div>
              <div className="message-content">
                <p>{message.content}</p>
                <div className="message-footer">
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                  {message.role === "assistant" && (
                    <div className="message-actions">
                      <button className="action-btn" title="Copy">
                        <Copy size={16} />
                      </button>
                      <button className="action-btn" title="Thumbs Up">
                        <ThumbsUp size={16} />
                      </button>
                      <button className="action-btn" title="Thumbs Down">
                        <ThumbsDown size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message assistant">
              <div className="message-avatar">AI</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className="input-container" onSubmit={handleSendMessage}>
          <div className="input-wrapper">
            <button type="button" className="action-btn">
              <Plus size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="שאל את ה-AI..."
              disabled={isLoading}
            />
            <button type="submit" className="send-btn" disabled={!input.trim() || isLoading}>
              <Send size={20} />
            </button>
          </div>
          <div className="input-footer">
            <p>AI Assistant יכול לטעות. שקול לאמת מידע חשוב.</p>
          </div>
        </form>
      </div>

      <div className="assistant-sidebar">
        <div className="sidebar-header">
          <h3>AI Assistant</h3>
        </div>

        <div className="sidebar-content">
          <div className="assistant-info">
            <div className="info-icon">💡</div>
            <p>לעזרה, הנחיה וחיפוש פתרונות יצירתיים</p>
          </div>

          <div className="suggestion-list">
            <h4>מה כדאי לשאול</h4>
            <button className="suggestion-btn">איך לתכנן חלל יעיל?</button>
            <button className="suggestion-btn">הצע חומרים לפרויקט בר-קיימא</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
