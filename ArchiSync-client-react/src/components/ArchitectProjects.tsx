import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { PartialProject } from "../types/types";
import ProjectDashboard from "./ProjectDashboard";
import { GetProgectsArchitect } from "../store/Project";

export const truncateText = (text: string, charLimit: number): string => {
    return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
};
const ArchitectProjects = () => {
    const user = useSelector((state: RootState) => state.connect.user);
    const projects = useSelector((state: RootState) => state.projects.projects);
    const dispatch: AppDispatch = useDispatch();
    const [openProject, setOpenProject] = useState<PartialProject | null>(null);

    useEffect(() => {
        if (user?.userId) {
            dispatch(GetProgectsArchitect());
        }
    }, [dispatch, user?.userId]);

    return (
        <>
            {!openProject &&
                <section className="cards-section">
                    <Typography variant="h4" className="section-title">Projects</Typography>
                    <div className="cards-container">
                        {projects.map((project) => (project && project.name && project.description ?
                            <div className="cards-card" key={project.id}>
                                <h3>{project.name}</h3>
                                <p>{truncateText(project.description, 35)}</p>

                                <motion.button
                                    className="button button-primary"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px yellow" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setOpenProject(project)}

                                >
                                    Open
                                </motion.button>

                            </div>
                            : null
                        ))}
                    </div>
                </section>
            }
            {openProject && (
                <ProjectDashboard openProject={openProject} handleBack={() => setOpenProject(null)} />
            )}

        </>
    );
};

export default ArchitectProjects;


