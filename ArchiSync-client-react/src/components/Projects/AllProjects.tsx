import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/reduxStore";
import { PartialMessage } from "../../types/types";
import { Typography, Modal, Box } from "@mui/material";
import { createMessage } from "../../store/Message";
import { checkProjectAccess } from "../../store/Premission";
import { useNavigate } from "react-router";
import Button from "../Additional/Button";
import "./Projects.css";
import ProjectCard from "./ProjectCard";
import { ProjectDTO } from "../../types/Project";
import { Project } from "./Projects";
import { useState } from "react";
import { GetProjectById } from "../../store/Project";


const AllProjects = ({ projects, viewMode }: Project) => {
    const user = useSelector((state: RootState) => state.connect.user);
    const dispatch: AppDispatch = useDispatch();
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState<ProjectDTO | null>(null);
   
   
    const handleOpenProject = async (projectId: number): Promise<void> => {
        if (projectId) {
            try {
                let response = null;
                if (user?.userId) {
                    response = await dispatch(checkProjectAccess(projectId)).unwrap();
                }
                if (response?.hasAccess) {
                    navigate(`/projects/${projectId}`);
                    sessionStorage.setItem("projectId", projectId.toString());

                } else {
                    setSelectedProject(projects.find(p => p.id === projectId) || null);
                    setShowRequestModal(true);
                }
            } catch (error) {
                console.error("check access failed:", error);
            }
        }
    };

    const accessRequest = async () => {
        var id = sessionStorage.getItem("projectId");

        dispatch(GetProjectById(id!));
        if (!selectedProject) return;
        try {
            const newMessage: PartialMessage = {
                userIsRead: false,
                architectIsRead: false,
                approved: false,
                userId: user.userId,
                projectId: selectedProject.id,
                architectId: selectedProject.ownerId
            };

            await dispatch(createMessage({ message: newMessage })).unwrap();
            setShowRequestModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Request failed:", error);
            alert("Failed to send request ");
        }
    };

    return (
        <>
            <div className={`projects-container ${viewMode}-view`}>
                {projects.map(project => (
                    <div key={project.id} className="enhanced-project-card">
                        <ProjectCard
                            project={project}
                            viewMode={viewMode}
                            handleOpenProject={() => handleOpenProject(project.id)}
                        />
                    </div>
                ))}
            </div>

            <Modal open={showRequestModal} onClose={() => setShowRequestModal(false)}>
                <div className="form-container">
                    <Typography variant="h6" sx={{ color: "white" }}>Access Required</Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: "white" }}>
                        You do not have access to the project.
                        Would you like to request permission?
                    </Typography>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <Button
                            type="submit"
                            className="button button-primary"
                            onClick={accessRequest}
                        >
                            Request Access
                        </Button>
                        <Button
                            type="submit"
                            className="button button-secondary"
                            onClick={() => setShowRequestModal(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal open={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
                <div className="form-container">
                    <Typography variant="h6" sx={{ color: "#FFD700", textAlign: "center" }}>
                        Request Sent!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: "white", textAlign: "center" }}>
                        Your request has been sent to the project owner. Once approved, you will gain access.
                    </Typography>
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                        <button
                            type="submit"
                            className="button button-primary"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            OK
                        </button>
                    </Box>
                </div>
            </Modal>
        </>
    );
};

export default AllProjects;