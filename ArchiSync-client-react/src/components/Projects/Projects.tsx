
import { useEffect, useState, useMemo } from "react"
import { Plus, Filter, Grid3X3, List, Search} from "lucide-react"
import Button from "../Additional/Button"
import ProjectCard from "./ProjectCard"
import "./Projects.css"
import "../Dashboard/Dashboard.css"
import { useNavigate } from "react-router"
import { AppDispatch, RootState } from "../../store/reduxStore"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { GetProjectsArchitect } from "../../store/Project"

type SortOption = 'title' | 'startDate' | 'updatedAt' | 'status' | 'location'
type SortDirection = 'asc' | 'desc'
type ViewMode = 'grid' | 'list'


const Projects = () => {
  const projects = useSelector((state: RootState) => state.projects.projects) 
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<SortOption>('updatedAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filterVisible, setFilterVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!projects || projects.length === 0) {
      setIsLoading(true)
      dispatch(GetProjectsArchitect())
      .finally(() => setIsLoading(false))
    }
  }, [projects, dispatch])

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = !searchTerm || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.clientUserName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = typeFilter === "all" || 
        project.type.toLowerCase() === typeFilter.toLowerCase()

      const matchesStatus = statusFilter === "all" || 
        project.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesType && matchesStatus
    })

    filtered.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'startDate':
          aValue = new Date(a.startDate).getTime()
          bValue = new Date(b.startDate).getTime()
          break
        case 'updatedAt':
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        case 'location':
          aValue = a.location.toLowerCase()
          bValue = b.location.toLowerCase()
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [projects, searchTerm, typeFilter, statusFilter, sortBy, sortDirection])

  const handleProjectClick = (projectId: number) => {
    navigate(`/MyProjects/${projectId}`)
  }

 

  const resetFilters = () => {
    setSearchTerm("")
    setTypeFilter("all")
    setStatusFilter("all")
    setSortBy('updatedAt')
    setSortDirection('desc')
  }

  const getStatusCounts = () => {
    return {
      all: projects.length,
      planning: projects.filter(p => p.status === 'Planning').length,
      inprogress: projects.filter(p => p.status === 'InProgress').length,
      completed: projects.filter(p => p.status === 'Completed').length,
      onhold: projects.filter(p => p.status === 'OnHold').length,
    }
  }

  const getTypeCounts = () => {
    return {
      all: projects.length,
      residential: projects.filter(p => p.type === 'Residential').length,
      commercial: projects.filter(p => p.type === 'Commercial').length,
      mixed: projects.filter(p => p.type === 'Mixed').length,
    }
  }

  const statusCounts = getStatusCounts()
  const typeCounts = getTypeCounts()

  if (isLoading) {
    return (
      <div className="projects-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <div className="header-main">
          <h1>Projects ({projects.length})</h1>
          <p className="header-subtitle">
            Manage and track your architectural projects
          </p>
        </div>
        
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

      <div className="projects-toolbar">
        <div className="toolbar-left">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search projects, clients, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="enhanced-search"
            />
          </div>
        </div>

        <div className="toolbar-right">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid3X3 size={16} />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>

          <div className="sort-container">
            <select
              value={`${sortBy}-${sortDirection}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-')
                setSortBy(field as SortOption)
                setSortDirection(direction as SortDirection)
              }}
              className="sort-select"
            >
              <option value="updatedAt-desc">Recent Updates</option>
              <option value="updatedAt-asc">Oldest Updates</option>
              <option value="title-asc">Name A-Z</option>
              <option value="title-desc">Name Z-A</option>
              <option value="startDate-desc">Newest Projects</option>
              <option value="startDate-asc">Oldest Projects</option>
              <option value="status-asc">Status</option>
              <option value="location-asc">Location</option>
            </select>
          </div>

          <Button
            variant="outline"
            icon={<Filter size={16} />}
            onClick={() => setFilterVisible(prev => !prev)}
            className={filterVisible ? 'active' : ''}
          >
            Filters
          </Button>
        </div>
      </div>

      {filterVisible && (
        <div className="filter-panel">
          <div className="filter-section">
            <h4>Project Type</h4>
            <div className="filter-options-grid">
              {Object.entries(typeCounts).map(([type, count]) => (
                <button
                  key={type}
                  className={`filter-chip ${typeFilter === type ? 'active' : ''}`}
                  onClick={() => setTypeFilter(type)}
                >
                  {type === 'all' ? 'All Types' : 
                   type === 'residential' ? 'Residential' : 
                   type === 'commercial' ? 'Commercial' : 
                   'Mixed Use'} ({count})
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Project Status</h4>
            <div className="filter-options-grid">
              {Object.entries(statusCounts).map(([status, count]) => (
                <button
                  key={status}
                  className={`filter-chip ${statusFilter === status ? 'active' : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status === 'all' ? 'All Status' : 
                   status === 'planning' ? 'Planning' : 
                   status === 'inprogress' ? 'In Progress' : 
                   status === 'completed' ? 'Completed' : 
                   'On Hold'} ({count})
                </button>
              ))}
            </div>
          </div>

          <div className="filter-actions">
            <Button variant="outline" onClick={resetFilters}>
              Reset All
            </Button>
            <Button variant="primary" onClick={() => setFilterVisible(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {(searchTerm || typeFilter !== 'all' || statusFilter !== 'all') && (
        <div className="results-summary">
          <p>
            Showing {filteredAndSortedProjects.length} of {projects.length} projects
            {searchTerm && <span> matching "{searchTerm}"</span>}
          </p>
          {(typeFilter !== 'all' || statusFilter !== 'all' || searchTerm) && (
            <Button variant="ghost" onClick={resetFilters}>
              Clear all filters
            </Button>
          )}
        </div>
      )}

      {filteredAndSortedProjects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <h3>No projects found</h3>
          <p>
            {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
              ? "Try adjusting your filters or search terms"
              : "Create your first project to get started"}
          </p>
          <Button
            variant="primary"
            icon={<Plus size={16} />}
            onClick={() => navigate("/new")}
          >
            Create New Project
          </Button>
        </div>
      ) : (
        <div className={`projects-container ${viewMode}-view`}>
          {filteredAndSortedProjects.map(project => (
            <div key={project.id} className="enhanced-project-card">
              <ProjectCard 
                project={project} 
                viewMode={viewMode}
                handleOpenProject={() => handleProjectClick(project.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects

