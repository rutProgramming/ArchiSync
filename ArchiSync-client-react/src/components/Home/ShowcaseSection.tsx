
import { Link, } from "react-router"
import { ArrowRight} from "lucide-react"
import Button from "../Additional/Button"
import "./home-styles.css"
import "../../App.css"



const ShowcaseSection = () => {
    return (<>
      <section className="showcase-section">
        <div className="container">
          <div className="showcase-content">
            <div className="showcase-text">
              <h2>AI-Powered Design Transformation</h2>
              <p>
                Upload your architectural sketches and let our AI transform them into detailed visualizations.
                Experiment with different styles, materials, and lighting conditions to bring your vision to life.
              </p>
              <ul className="showcase-list">
                <li>
                  <span className="list-icon">✓</span>
                  <span>Transform sketches into detailed renderings</span>
                </li>
                <li>
                  <span className="list-icon">✓</span>
                  <span>Experiment with different architectural styles</span>
                </li>
                <li>
                  <span className="list-icon">✓</span>
                  <span>Visualize materials and lighting variations</span>
                </li>
                <li>
                  <span className="list-icon">✓</span>
                  <span>Generate multiple design options quickly</span>
                </li>
              </ul>
              <Link to="/register">
                <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                  Try It Now
                </Button>
              </Link>
            </div>
            <div className="showcase-image">
              <img src="/images/sketch-to-render.png?height=400&width=500" alt="AI Design Transformation" />
            </div>
          </div>
        </div>
      </section>
    </>)
}
export default ShowcaseSection

