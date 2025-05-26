import "./home-styles.css"
import "../../App.css"

const TestimonialsSection = () => {
    return(<>
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Trusted by Architecture Professionals</h2>
            <p>See what our users have to say about ArchiSync</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "ArchiSync has revolutionized how our firm manages projects. The AI design tools save us countless
                  hours in the conceptual phase."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <div className="avatar-placeholder">JS</div>
                </div>
                <div className="author-info">
                  <h4>Jennifer Smith</h4>
                  <p>Principal Architect, Modern Design Studio</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "The collaboration features have made working with remote team members and clients seamless. We've
                  reduced our meeting time by 40%."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <div className="avatar-placeholder">MR</div>
                </div>
                <div className="author-info">
                  <h4>Michael Rodriguez</h4>
                  <p>Project Manager, Urban Architects</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "As a small studio, ArchiSync gives us the tools to compete with larger firms. The AI visualization
                  tools impress our clients every time."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <div className="avatar-placeholder">AK</div>
                </div>
                <div className="author-info">
                  <h4>Alex Kim</h4>
                  <p>Founder, Nexus Architecture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>)
}
export default TestimonialsSection