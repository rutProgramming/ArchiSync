import { PartialProject } from "../types/types";
import { useNavigate } from "react-router";
import ProjectsDisplay from "./ProjectsDisplay";
import { GetProgectsArchitect } from "../store/Project";

const ArchitectProjects = () => {
    const navigate = useNavigate();
    const handleOpenProject = (project: PartialProject) => {
        navigate(`project/${project.id}`)
    }
    return (
        <>
            <ProjectsDisplay handleOpenProject={handleOpenProject} fetchProjects={GetProgectsArchitect} />
        </>
    );
};

export default ArchitectProjects;


