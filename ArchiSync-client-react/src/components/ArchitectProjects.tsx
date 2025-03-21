import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { useEffect, useState } from "react";
import { GetProgectsArchitect } from "../store/Folder";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { PartialFolder } from "../types/types";
import FilesInProject from "./FilesInProject";


const ArchitectProjects = () => {
    const user = useSelector((state: RootState) => state.connect.user);
    const projects = useSelector((state: RootState) => state.projects.projects);
    const dispatch: AppDispatch = useDispatch();
    const [openProject, setOpenProject] = useState<PartialFolder | null>(null);

    useEffect(() => {
        if (user?.userId) {
            dispatch(GetProgectsArchitect());
        }
    }, [dispatch, user?.userId]);


    const truncateText = (text: string, wordLimit: number): string => {
        const words = text.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
    };

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
                    <FilesInProject openProject={openProject} handleBack={() => setOpenProject(null)} />
            )}

        </>
    );
};

export default ArchitectProjects;


