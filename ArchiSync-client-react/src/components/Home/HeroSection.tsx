
import { Link,  } from "react-router"
import {  ArrowRight, Lightbulb, Zap, Layers } from "lucide-react"
import Button from "../S/Button"
import "./home-styles.css"
import "../../App.css"

const HeroSection = () => {
  return (
    <>
      <header className="hero">
        <div className="container">
          <nav className="home-nav">
            <div className="home-logo">
              <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2L26 9V19L14 26L2 19V9L14 2Z" stroke="#d4a19a" strokeWidth="2" fill="none" />
                <path d="M14 8L20 11.5V18.5L14 22L8 18.5V11.5L14 8Z" fill="#d4a19a" />
              </svg>
              <span>ArchiSync</span>
            </div>
            <div className="home-nav-links">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </div>
          </nav>

          <div className="hero-content">
            <div className="hero-text">
              <h1>Transform Your Architectural Vision</h1>
              <p>
                ArchiSync brings together project management, team collaboration, and AI-powered design tools in one
                seamless platform for architects and designers.
              </p>
              <div className="hero-buttons">
                <Link to="/register">
                  <Button variant="primary" size="lg" icon={<ArrowRight size={16} />} iconPosition="right">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img src="/placeholder.jpg?height=500&width=600" alt="ArchiSync Dashboard" className="main-image" />
              <div className="floating-card card-1">
                <div className="card-icon">
                  <Lightbulb size={20} />
                </div>
                <div className="card-text">
                  <span>AI-Powered Design</span>
                </div>
              </div>
              <div className="floating-card card-2">
                <div className="card-icon">
                  <Layers size={20} />
                </div>
                <div className="card-text">
                  <span>Project Management</span>
                </div>
              </div>
              <div className="floating-card card-3">
                <div className="card-icon">
                  <Zap size={20} />
                </div>
                <div className="card-text">
                  <span>Real-time Collaboration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bg"></div>
      </header>
      </>)
}
export default HeroSection