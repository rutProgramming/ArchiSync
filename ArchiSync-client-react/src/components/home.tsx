import { motion } from "framer-motion";
import { Container, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router";
import "../App.css";
import "../Style/home.css"

const HomePage = () => {
    const navigate = useNavigate();
    const scrollToSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (

        <div className="home-container">

            <Container maxWidth="md" className="center" style={{ paddingTop: "15px", paddingBottom: "30px" }}>
                <Grid container direction="column" justifyContent="center" alignItems="center">

                    <motion.div
                        animate={{
                            color: ["#FFD700", "#FFFFFF", "#FFA500", "#FFFFE0", "#FFD700"]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                        }}
                    >
                        <Typography variant="h2" className="hero-title">
                            VISIONARY<span color="white">ARCHITECTURE</span>

                        </Typography>

                    </motion.div>

                    <motion.div
                        animate={{
                            color: ["#FFD700", "#FFFFFF", "#FFA500", "#FFFFE0", "#FFD700"]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                        }}
                    >
                        <Typography variant="h5" className="hero-subtitle">
                            Where innovative design meets timeless elegance.
                            Transforming spaces into extraordinary experiences.
                        </Typography>
                    </motion.div>

                    <div className="button-container">
                        <motion.button
                            className="button button-primary"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px yellow" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/projects")}
                        >
                            OUR PROJECTS
                        </motion.button>

                        <motion.button
                            className="button button-secondary"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px white" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            CONTACT US
                        </motion.button>
                    </div>
                </Grid>
                <motion.div
                    className="ArrowButton"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToSection}
                    style={{position: "absolute",left: "50%"}}
                >
                    <ArrowDownwardIcon fontSize="large" />
                </motion.div>
            </Container>

            <section className="about-section">
                <Typography variant="h4" className="section-title">Who We Are</Typography>
                <div className="about-container">
                    <div className="about-card">
                        <h3> We are pioneers in architecture, blending modern design with innovative technologies to create extraordinary spaces. </h3>
                    </div>
                </div>

            </section>

            <section className="cards-section">
                <Typography variant="h4" className="section-title">Our Services</Typography>
                <div className="cards-container">
                    <div className="cards-card">
                        <h3>Innovative Design</h3>
                        <p>Cutting-edge architecture that redefines spaces.</p>
                    </div>
                    <div className="cards-card">
                        <h3>Sustainable Solutions</h3>
                        <p>Eco-friendly designs that merge with nature.</p>
                    </div>
                    <div className="cards-card">
                        <h3>Smart Technology</h3>
                        <p>Integrating AI and automation into architectural solutions.</p>
                    </div>
                </div>
            </section>

            <section className="cards-section">
                <Typography variant="h4" className="section-title">What Our Clients Say</Typography>
                <div className="cards-container">
                    <div className="cards-card">
                        <p>"Their designs are breathtaking and truly unique!"</p>
                        <h5>- Sarah Johnson</h5>
                    </div>
                    <div className="cards-card">
                        <p>"A revolutionary approach to architecture."</p>
                        <h5>- Michael Adams</h5>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
