
import { Building, Users, FileText, Lightbulb } from "lucide-react"
import "./home-styles.css"
import "../../App.css"

const FeaturesSection = () => {
    return(<>
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Designed for Modern Architecture Teams</h2>
            <p>
              ArchiSync combines powerful tools with an intuitive interface to streamline your architectural workflow
              from concept to completion.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Building size={32} />
              </div>
              <h3>Project Management</h3>
              <p>
                Organize and track all your architectural projects in one place. Monitor progress, set milestones, and
                never miss a deadline.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Team Collaboration</h3>
              <p>
                Work seamlessly with your team members. Share files, assign tasks, and communicate effectively within
                the platform.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Lightbulb size={32} />
              </div>
              <h3>AI Design Tools</h3>
              <p>
                Transform sketches and concepts with our AI-powered design tools. Generate variations and visualize
                ideas in seconds.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FileText size={32} />
              </div>
              <h3>Document Management</h3>
              <p>
                Store and organize all project documents securely. Access blueprints, contracts, and specifications
                whenever you need them.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>)
}
export default FeaturesSection