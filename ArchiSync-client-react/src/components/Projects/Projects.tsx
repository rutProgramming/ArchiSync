
import { Plus} from "lucide-react"
import Button from "../Additional/Button"
import ProjectCard from "./ProjectCard"
import "./Projects.css"
import { useNavigate } from "react-router"
import { ProjectDTO } from "../../types/Project"

type ViewMode = 'grid' | 'list'

export interface Project {
   projects:ProjectDTO[],
   viewMode: ViewMode
}
const Projects = ({projects, viewMode}:Project) => {
  const navigate = useNavigate()

  
  const handleProjectClick = (projectId: number) => {
    navigate(`/MyProjects/${projectId}`)
  }



  return (
    <div className="projects-page">
      <div className="page-header">
        
        <div className="header-actions">
          <Button
            variant="primary"
            icon={<Plus size={16} />}
            onClick={() => navigate("/new")}
          >
            New Project
          </Button>
        </div>
      </div>

        <div className={`projects-container ${viewMode}-view`}>
          {projects.map(project => (
            <div key={project.id} className="enhanced-project-card">
              <ProjectCard 
                project={project} 
                viewMode={viewMode}
                handleOpenProject={() => handleProjectClick(project.id)}
              />
            </div>
          ))}
        </div>
    </div>
  )
}

export default Projects

