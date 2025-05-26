import "./home-styles.css"
import { Link } from "react-router"
import Button from "../S/Button"
import "../../App.css"

const CTASection = () => {
    return(<>
     <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Architectural Workflow?</h2>
            <p>Join thousands of architects and designers who are already using ArchiSync.</p>
            <div className="cta-buttons">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>)
}
export default CTASection