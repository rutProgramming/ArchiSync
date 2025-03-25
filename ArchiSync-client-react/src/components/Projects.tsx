import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { useEffect, useState } from "react";
import {  PartialMessage, PartialProject } from "../types/types";
import { Typography, Modal, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { GetAllProjects, GetPublicProjects } from "../store/Project";
import { createMessage } from "../store/Message";
import { checkProjectAccess } from "../store/Premission";

const Projects = () => {
    const projects = useSelector((state: RootState) => state.projects.projects);
    const user = useSelector((state: RootState) => state.connect.user);
    const dispatch: AppDispatch = useDispatch();
    const [openProject, setOpenProject] = useState<PartialProject | null>(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<PartialProject | null>(null);

    useEffect(() => {
        if (user?.userName) {
            dispatch(GetAllProjects());
        } else {
            dispatch(GetPublicProjects());
        }
    }, [dispatch, user]);

    const handleOpenProject = async (project: PartialProject) => {
        console.log(project);
        if (project.isPublic) {
            setOpenProject(project);
        } else if (user?.userId && project.id) {
            try {
                const response = await dispatch(checkProjectAccess({ projectId: project.id })).unwrap();                
                if (response.hasAccess) {
                    setOpenProject(project);
                } else {
                    setSelectedProject(project);
                    setShowRequestModal(true);
                }
            } catch (error) {
                console.error("check access failed:", error);
            }
        }
    };

    const accessRequest = async () => {
        if (!selectedProject) return;
        try {
            const newMessage: PartialMessage = {
                isRead: false,
                approved: false,
                userId: user.userId,
                projectId: selectedProject.id,
                architectId: selectedProject.ownerId
            };

            await dispatch(createMessage({ message: newMessage })).unwrap();
            setShowRequestModal(false);
            alert("Your request has been sent! ✅");
        } catch (error) {
            console.error("Request failed:", error);
            alert("Failed to send request ❌");
        }
    };

    return (
        <>
            <section className="cards-section">
                <Typography variant="h4" className="section-title">Projects</Typography>
                <div className="cards-container">
                    {projects.map((project) => (project && project.name && project.description ? (
                        <div className="cards-card" key={project.id}>
                            <h3>{project.name}</h3>
                            <motion.button
                                className="button button-primary"
                                whileHover={{ scale: 1.05, boxShadow: "0 0 20px yellow" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleOpenProject(project)}
                            >
                                Open
                            </motion.button>
                        </div>
                    ) : null))}
                </div>
            </section>

            {/* ✅ מודאל בקשת הרשאה */}
            <Modal open={showRequestModal} onClose={() => setShowRequestModal(false)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "10px",
                    textAlign: "center"
                }}>
                    <Typography variant="h6">Access Required 🚀</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        You do not have access to <b>{selectedProject?.name}</b>.  
                        Would you like to request permission?
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={accessRequest}>
                        Request Access
                    </Button>
                    <Button variant="outlined" sx={{ mt: 1 }} onClick={() => setShowRequestModal(false)}>
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default Projects;
