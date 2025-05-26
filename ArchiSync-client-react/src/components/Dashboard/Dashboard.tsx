import { useEffect } from "react"
import {  BarChart2, Users, Calendar } from "lucide-react"
import SearchBar from "../Bar/SearchBar"
import ProjectCard from "../Projects/ProjectCard"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/reduxStore"
import { GetProjectsArchitect } from "../../store/Project"


const Dashboard = () => {
  console.log("Dashboard");
  //const [projects] = useState<Project[]>(sampleProjects)
  const projects=useSelector((state: RootState) => state.projects.projects)
  const dispatch:AppDispatch=useDispatch()

  useEffect(() => { 
    dispatch(GetProjectsArchitect())
  },[dispatch])
  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <SearchBar placeholder="Search projects..." />
          {/* <Link to="/projects/new" className="new-project-btn">
            <Plus size={16} />
            <span>New Project</span>
          </Link> */}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart2 size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">12</h3>
            <p className="stat-label">Active Projects</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">8</h3>
            <p className="stat-label">Team Members</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">5</h3>
            <p className="stat-label">Upcoming Deadlines</p>
          </div>
        </div>
      </div>

      <section className="recent-projects">
        <h2>Recent Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
