import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { useEffect } from "react";
import { GetPublicProjects, GetAccessProjects } from "../store/ProjectRedux";

const Projects = () => {
    const projects = useSelector((state: RootState) => state.Projects.projects);
    const user = useSelector((state: RootState) => state.connect.user);
    const loading = useSelector((state: RootState) => state.Projects.loading);
    const error = useSelector((state: RootState) => state.Projects.error);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (user?.userName) {
            dispatch(GetAccessProjects());
        } else {
            dispatch(GetPublicProjects());
        }
    }, [dispatch, user?.userName]); 

    return (
        <>
            {loading && <p>Loading projects...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {Array.isArray(projects) && projects.length > 0 ? (
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>{project.name}</li>
                    ))}
                </ul>
            ) : (
                !loading && <p>No projects found.</p>
            )}
        </>
    );
};

export default Projects;
