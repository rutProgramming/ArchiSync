import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { useEffect, useState } from "react";
import { PartialMessage, PartialProject } from "../types/types";
import { Typography, Modal, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { GetAllProjects, GetPublicProjects } from "../store/Project";
import { createMessage } from "../store/Message";
import { checkProjectAccess } from "../store/Premission";
import { getFiles } from "../store/File";

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
       
       if (project.id)
        {
            try {
                let response=null;
                if(user.userId){
                 response = await dispatch(checkProjectAccess(project.id)).unwrap();
                 console.log(response)

                }
                if (response?.hasAccess||project.isPublic) {
                    setOpenProject(project);
                    if(user.userId)
                    dispatch(getFiles({ projectId: project.id, userId: user.userId, isPublic: project.isPublic||false }));
                   else
                   dispatch(getFiles({ projectId: project.id, userId: 0,isPublic: project.isPublic||true }));

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

            <Modal open={showRequestModal} onClose={() => setShowRequestModal(false)}>
                <div className="form-container">
                    <Typography variant="h6" sx={{color:"white"}}>Access Required</Typography>
                    <Typography variant="body1" sx={{ mt: 2 ,color:"white"}}>
                        You do not have access to <b>{selectedProject?.name}</b>.
                        Would you like to request permission?
                    </Typography>

                    <button
                        type="submit" className="button button-primary" onClick={accessRequest}>
                        Request Access
                    </button>
                    <button
                        type="submit" className="button button-primary" onClick={() => setShowRequestModal(false)}>
                        Cancel
                    </button>

                </div>
            </Modal >
            
        </>
    );
};

export default Projects;
