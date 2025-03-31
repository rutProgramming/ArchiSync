import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { useEffect, useState } from "react";
import { PartialMessage, PartialProject } from "../types/types";
import { Typography, Modal, Box, Button } from "@mui/material";
import { GetAllProjects, GetPublicProjects } from "../store/Project";
import { createMessage } from "../store/Message";
import { checkProjectAccess } from "../store/Premission";
import ProjectsDisplay from "./ProjectsDisplay";
import {  useNavigate } from "react-router";

const UserProjects = () => {
    const user = useSelector((state: RootState) => state.connect.user);
    const dispatch: AppDispatch = useDispatch();
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<PartialProject | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user?.userName) {
            dispatch(GetAllProjects());
        } else {
            dispatch(GetPublicProjects());
        }
    }, [dispatch, user]);
    const handleOpenProject = async (project: PartialProject):Promise<void> => {       
       if (project.id)
        {
            try {
                let response=null;
                if(user.userId){
                 response = await dispatch(checkProjectAccess(project.id)).unwrap();
                }
                if (response?.hasAccess||project.isPublic) {
                    navigate(`project/${project.id}`)
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
                userIsRead : false,
                architectIsRead : false,
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

    return (<>
          <ProjectsDisplay handleOpenProject={handleOpenProject} fetchProjects={null}/>
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

            <Modal open={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
            <div className="form-container">
                    <Typography variant="h6" sx={{ color: "#FFD700", textAlign: "center" }}>
                        Request Sent!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: "white", textAlign: "center" }}>
                        Your request has been sent to the project owner. Once approved, you will gain access.
                    </Typography>
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                        <button type="submit" className="button button-primary" onClick={() => setShowSuccessModal(false)}>
                            OK
                        </button>
                    </Box>
                    </div>
            </Modal>
        </>);
};

export default UserProjects;
