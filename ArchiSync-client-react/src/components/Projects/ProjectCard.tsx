import "./Projects.css"
import "../S/additional-styles.css"
import "./ProjectCard.css"
import { 
  Building, 
  Home, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Users, 
  EyeOff,
  MoreVertical,
  Star,
  Edit,
  Share2,
  Archive,
  Trash2
} from "lucide-react"
import {ProjectDTO } from "../../types/Project"
import { useEffect, useState } from "react"
import { getDownloadUrl } from "../../Services/uploadService"

interface ProjectCardProps {
  project: ProjectDTO
  handleOpenProject?: (id: number) => void
  viewMode?: 'grid' | 'list'
  onEdit?: (id: number) => void
  onShare?: (id: number) => void
  onArchive?: (id: number) => void
  onDelete?: (id: number) => void
  showActions?: boolean
}


const ProjectCard = ({ 
  project, 
  viewMode = 'grid',
  onEdit,
  onShare,
  onArchive,
  handleOpenProject,
  showActions = true
}: ProjectCardProps) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  //const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true;
    const fetchImageUrl = async () => {
        const url = await getDownloadUrl(`users/${project.title}/Project image`);
         if (isMounted) setImageUrl(url);
     
    };
    fetchImageUrl();
    return () => { isMounted = false; };
  }, [project.projectImage]);

  // const handleClick = (e: React.MouseEvent) => {
  // if ((e.target as HTMLElement).closest('.project-actions')) {
  //   e.stopPropagation()
  //   return
  // }
  // sessionStorage.setItem('projectId', project.id.toString());
  // navigate(`/projects/${project.id}`)



  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation()
    action()
    setShowDropdown(false)
  }

  const getIcon = () => {
    switch (project.type) {
      case "Residential":
        return <Home className="project-type-icon" size={18} />
      case "Commercial":
        return <Building className="project-type-icon" size={18} />
      case "Mixed":
        return <Building2 className="project-type-icon" size={18} />
      default:
        return <Building className="project-type-icon" size={18} />
    }
  }

  const getStatusColor = () => {
    switch (project.status) {
      case "Planning":
        return "#60a5fa"
      case "InProgress":
        return "#f0b54d"
      case "Completed":
        return "#4ade80"
      case "OnHold":
        return "#f87171"
      default:
        return "#6b7280"
    }
  }

  const getStatusProgress = () => {
    switch (project.status) {
      case "Planning":
        return 15
      case "InProgress":
        return 65
      case "Completed":
        return 100
      case "OnHold":
        return 35
      default:
        return 0
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date))
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
    return `${Math.ceil(diffDays / 365)} years ago`
  }

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div 
      className={`enhanced-project-card ${viewMode}-mode ${!project.isPublic ? 'private' : ''}`} 
      onClick={() => handleOpenProject?.(project.id)}
    >
      <div className="project-image-container">
        <div className="image-wrapper">
          <img 
            src={imageUrl} 
            alt={project.title}
            className={`project-image ${isImageLoaded ? 'loaded' : ''}`}
            onLoad={() => setIsImageLoaded(true)}
            loading="lazy"
          />
          
          {!isImageLoaded && (
            <div className="image-skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
        </div>

        {/* Enhanced Overlay */}
        <div className="project-overlay">
          <div className="overlay-top">
            <div className="project-type-badge-overlay">
              {getIcon()}
              <span>{project.type}</span>
            </div>
            
            <div className="project-badges">
              {!project.isPublic && (
                <div className="privacy-badge" title="Private project">
                  <EyeOff size={14} />
                </div>
              )}
              
              <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFavorite(!isFavorite)
                }}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star size={14} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <div className="overlay-bottom">
            <div className="status-info">
              <div className="status-badge" style={{ backgroundColor: getStatusColor() }}>
                {project.status === 'Planning' && 'Planning'}
                {project.status === 'InProgress' && 'In Progress'}
                {project.status === 'Completed' && 'Completed'}
                {project.status === 'OnHold' && 'On Hold'}
              </div>
              
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${getStatusProgress()}%`,
                      backgroundColor: getStatusColor()
                    }}
                  ></div>
                </div>
                <span className="progress-text">{getStatusProgress()}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        {showActions && (
          <div className="project-actions">
            <button
              className="actions-trigger"
              onClick={(e) => {
                e.stopPropagation()
                setShowDropdown(!showDropdown)
              }}
              title="Actions"
            >
              <MoreVertical size={16} />
            </button>

            {showDropdown && (
              <div className="actions-dropdown">
                <button
                  className="action-item"
                  onClick={(e) => handleActionClick(e, () => onEdit?.(project.id))}
                >
                  <Edit size={14} />
                  <span>Edit</span>
                </button>
                <button
                  className="action-item"
                  onClick={(e) => handleActionClick(e, () => onShare?.(project.id))}
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </button>
                <button
                  className="action-item"
                  onClick={(e) => handleActionClick(e, () => onArchive?.(project.id))}
                >
                  <Archive size={14} />
                  <span>Archive</span>
                </button>
                <div className="dropdown-divider"></div>
                <button
                  className="action-item danger"
                  //onClick={(e) => handleActionClick(e, () => onDelete?.(project.id))}
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="project-info">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-meta-badges">
            <span className={`project-type-badge type-${project.type.toLowerCase()}`}>
              {project.type === 'Residential' && 'Residential'}
              {project.type === 'Commercial' && 'Commercial'}
              {project.type === 'Mixed' && 'Mixed Use'}
            </span>
          </div>
        </div>

        <p className="project-description">
          {viewMode === 'list' 
            ? truncateDescription(project.description, 150)
            : truncateDescription(project.description, 80)
          }
        </p>

        <div className="project-metadata">
          <div className="meta-row">
            <div className="meta-item">
              <MapPin size={14} />
              <span>{project.location}</span>
            </div>
            <div className="meta-item">
              <User size={14} />
              <span>{project.clientUserName}</span>
            </div>
          </div>

          <div className="meta-row">
            <div className="meta-item">
              <Calendar size={14} />
              <span>Started: {formatDate(project.startDate)}</span>
            </div>
            {project.architects && project.architects.length > 0 && (
              <div className="meta-item">
                <Users size={14} />
                <span>{project.architects.length} Architects</span>
              </div>
            )}
          </div>
        </div>

        <div className="project-footer">
          <div className="update-info">
            <Clock size={12} />
            <span>Updated {getTimeAgo(project.updatedAt)}</span>
          </div>
          
          {project.endDate && (
            <div className="end-date">
              <span>Ends: {formatDate(project.endDate)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
