import  { useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import UploadComponent from "./UploadComponent";

const HomePage = () => {
    const navigate = useNavigate();

    const buildingVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i = 5) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
            },
        }),
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const root = document.documentElement;
            const hue = (parseInt(getComputedStyle(root).getPropertyValue('--hue')) + 1) % 360;
            root.style.setProperty('--hue', hue.toString());
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        (
            <Container maxWidth="md">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ minHeight: "100vh", textAlign: "center" }}
                    sx={{
                        color: "#c99a8f",
                    }}
                >
                   
                    <div className="relative w-screen h-screen overflow-hidden bg-gray-900 text-white">
                        {/* Dynamic color CSS variables */}
                        <style >{`
        :root {
          --hue: 220;
          --primary: hsl(var(--hue), 80%, 60%);
          --secondary: hsl(calc(var(--hue) + 60), 80%, 60%);
          --accent: hsl(calc(var(--hue) + 180), 80%, 60%);
        }
      `}</style>

                        {/* Animated background grid - architectural graph paper effect */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={`h-${i}`}
                                        className="absolute h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"
                                        style={{ top: `${i * 5}%` }}
                                    />
                                ))}
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={`v-${i}`}
                                        className="absolute w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"
                                        style={{ left: `${i * 5}%` }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Floating 3D architectural elements */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-full h-full max-w-6xl mx-auto">
                                <motion.div
                                    className="absolute top-1/4 left-1/4 w-32 h-32 rounded-lg"
                                    style={{ background: 'var(--primary)', filter: 'blur(15px)' }}
                                    animate={{
                                        rotate: 360,
                                        x: [0, 20, 0, -20, 0],
                                        y: [0, -20, 0, 20, 0],
                                    }}
                                    transition={{ repeat: Infinity, duration: 10 }}
                                />
                                <motion.div
                                    className="absolute bottom-1/4 right-1/4 w-24 h-24"
                                    style={{ background: 'var(--secondary)', filter: 'blur(10px)' }}
                                    animate={{
                                        rotate: -360,
                                        x: [0, -30, 0, 30, 0],
                                        y: [0, 20, 0, -20, 0],
                                    }}
                                    transition={{ repeat: Infinity, duration: 8 }}
                                />
                                <motion.div
                                    className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full"
                                    style={{ background: 'var(--accent)', filter: 'blur(12px)' }}
                                    animate={{
                                        scale: [1, 1.2, 1, 0.8, 1],
                                        x: [0, 40, 0, -40, 0],
                                        y: [0, -40, 0, 40, 0],
                                    }}
                                    transition={{ repeat: Infinity, duration: 12 }}
                                />
                            </div>
                        </div>

                        {/* Architectural blueprint lines animation */}
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                            <motion.div
                                className="absolute w-full h-full"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                            >
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={`line-${i}`}
                                        className="absolute top-1/2 left-1/2 h-px"
                                        style={{
                                            width: "100%",
                                            transformOrigin: "0 0",
                                            transform: `rotate(${i * 30}deg)`,
                                            background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </div>

                        {/* Centered main content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative z-10 text-center max-w-3xl px-8">
                                {/* Building skyline animation */}
                                <div className="flex justify-center mb-6 h-24">
                                    {[...Array(9)].map((_, i) => (
                                        <motion.div
                                            key={`building-${i}`}
                                            custom={i}
                                            variants={buildingVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="mx-1 w-8 bg-gradient-to-t from-white to-transparent backdrop-blur-sm rounded-t-lg"
                                            style={{
                                                height: `${Math.random() * 60 + 40}%`,
                                                opacity: 0.7
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Main heading with creative typography */}
                                <motion.h1
                                    className="text-6xl font-black tracking-tight"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.5 }}
                                >
                                    <span style={{ color: 'var(--primary)' }}><h1>VISIONARY</h1></span>
                                    <span className="block mt-2 text-white"><h1>ARCHITECTURE</h1></span>
                                </motion.h1>

                                {/* Animated underline */}
                                <motion.div
                                    className="h-1 mx-auto mt-4 mb-6 w-24 rounded-full"
                                    style={{ background: 'var(--secondary)' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: 120 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                />

                                <motion.p
                                    className="text-xl text-gray-300 backdrop-blur-sm py-4 px-6 rounded-xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 0.9, y: 0 }}
                                    transition={{ delay: 0.7, duration: 1 }}
                                >
                                    <Typography variant="h4" fontWeight="bold" gutterBottom>

                                        Where innovative design meets timeless elegance. Transforming spaces into extraordinary experiences.
                                    </Typography>
                                </motion.p>

                                {/* Interactive buttons */}
                                <div className="mt-10 flex flex-wrap justify-center gap-4">
                                    <motion.button
                                        className="px-8 py-3 text-lg font-semibold rounded-lg"
                                        style={{ background: 'var(--primary)' }}
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px var(--primary)" }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1, duration: 0.5 }}
                                        onClick={() => navigate("/projects")}
                                    >
                                        <Button  >

                                            Our Projects
                                        </Button>
                                    </motion.button>
                                    <motion.button
                                        className="px-8 py-3 text-lg font-semibold border-2 rounded-lg"
                                        style={{ borderColor: 'var(--secondary)' }}
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px var(--secondary)" }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2, duration: 0.5 }}
                                    >
                                        <Button >
                                            Contact Us
                                        </Button>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Container>
        ));
};

export default HomePage;