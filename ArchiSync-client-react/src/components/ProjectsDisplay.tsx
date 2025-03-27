import { motion } from "framer-motion";
import { useEffect } from "react";
import { GetAllProjects, GetPublicProjects } from "../store/Project";
import { AppDispatch, RootState } from "../store/reduxStore";
import { PartialProject } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

const truncateText = (text: string, charLimit: number): string => {
    return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
};

const ProjectsDisplay = ({ handleOpenProject }: { handleOpenProject: (project: PartialProject) => Promise<void> | void }) => {
    const projects = useSelector((state: RootState) => state.projects.projects);
    const user = useSelector((state: RootState) => state.connect.user);
    const dispatch: AppDispatch = useDispatch();


    useEffect(() => {
        if (user?.userName) {
            dispatch(GetAllProjects());
        } else {
            dispatch(GetPublicProjects());
        }
    }, [dispatch, user]);
    return (
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

    )
};

export default ProjectsDisplay