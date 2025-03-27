import { PartialProject } from "../types/types";
import { useNavigate } from "react-router";
import ProjectsDisplay from "./ProjectsDisplay";

const ArchitectProjects = () => {

    const navigate = useNavigate();

    const handleOpenProject = (project: PartialProject) => {
        navigate(`project/${project.id}`)
    }
    return (
        <>
            <ProjectsDisplay handleOpenProject={handleOpenProject} />
        </>
    );
};

export default ArchitectProjects;


