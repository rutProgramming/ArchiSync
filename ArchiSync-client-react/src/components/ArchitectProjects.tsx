import "../App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {GetProgectsArchitect } from "../store/Folder";
import { AppDispatch, RootState } from "../store/reduxStore";
import { Typography } from "@mui/material";

const ArchitectProjects = () => {
  
    const user = useSelector((state: RootState) => state.connect.user);
    const projects = useSelector((state: RootState) => state.projects.projects);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        console.log(user?.userId);
        if (user?.userId) {
            dispatch(GetProgectsArchitect());
        }
    }, [dispatch, user?.userId]);
  

    return (
        <>
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
