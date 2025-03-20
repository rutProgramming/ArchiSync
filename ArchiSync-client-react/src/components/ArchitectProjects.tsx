import { motion } from "framer-motion";
import "../App.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject, GetProgectsArchitect } from "../store/Folder";
import { AppDispatch, RootState } from "../store/reduxStore";
import { Typography } from "@mui/material";
import { PartialFolder } from "../types/types";

const ArchitectProjects = () => {
    const projectNameRef = useRef<HTMLInputElement>(null);
    const projectDescription = useRef<HTMLInputElement>(null);
    const publicRef = useRef<HTMLInputElement>(null);
    const user = useSelector((state: RootState) => state.connect.user);
    const projects = useSelector((state: RootState) => state.projects.projects);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        console.log(user?.userId);
        if (user?.userId) {
            dispatch(GetProgectsArchitect());
        }
    }, [dispatch, user?.userId]);
    const handleAddFolder = async (event: React.FormEvent) => {
        event.preventDefault();
        const project:PartialFolder={
            name: projectNameRef.current?.value || "",
            description: projectDescription.current?.value || "",
            ownerId: user?.userId ?? 0,
            isPublic: publicRef.current?.checked || false

        }
        const resultAction = await dispatch(
            addProject({ project })
          );

        if (addProject.rejected.match(resultAction)) {
            console.error("Failed to add project:", resultAction.error.message);
        }
        else if (addProject.fulfilled.match(resultAction)) {
            projectNameRef.current!.value = "";
            projectDescription.current!.value = "";
            publicRef.current!.checked = false;
            if (user?.userId)
                dispatch(GetProgectsArchitect());
        }
    };

    return (
        <>
            <form onSubmit={handleAddFolder}>
                <motion.input
                    type="text"
                    placeholder="Project Name"
                    size={20}
                    ref={projectNameRef}
                    required
                />
  <motion.input
                    type="text"
                    placeholder="Project description"
                    size={20}
                    ref={projectDescription}
                    required
                />
                <input type="checkbox" id="publicCheckbox" ref={publicRef} />
                <label htmlFor="publicCheckbox" style={{ color: "white" }}>Public</label>

                <motion.button type="submit" className="button button-secondary">
                    Add Project
                </motion.button>
            </form>
           

            <section className="cards-section">
                <Typography variant="h4" className="section-title">Projects</Typography>
                <div className="cards-container">
                 {projects.map((project) => (
                    <div className="cards-card">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </div>
                   ))}
                    
                    
                </div>
            </section>

        </>
    );
};

export default ArchitectProjects;
