import { useEffect, useState } from "react"
import { Calendar, Users, MapPin} from "lucide-react"
import TeamMember from "../Additional/TeamMember"
import { ProjectDTO } from "../../types/Project"
import { File } from "../../types/types"
import { getDownloadUrl } from "../../Services/uploadService"
import { formatDate } from "../Additional/utils"
import "../Additional/additional-styles.css"
import FileCard from "../Files/FileCard"

interface ProjectDetailsViewProps {
  project: ProjectDTO
  files: File[]
  hasAccess:boolean
}

const ProjectDetailsView = ({ project, files, hasAccess }: ProjectDetailsViewProps) => {


  const [activeTab, setActiveTab] = useState<"overview" | "team" | "documents" | "gallery">("overview")
  const [documents, setDocuments] = useState<File[]>()
  const [imageFiles, setImageFiles] = useState<File[]>()
  const [imageUrls, setImageUrls] = useState<string[]>()


  useEffect(() => {
      setDocuments(files.filter(file => !file.fileType?.startsWith("image/")))
      setImageFiles(files.filter(file => file.fileType?.startsWith("image/")))
      const fetchImageUrls = async () => {
        if (imageFiles && imageFiles.length > 0) {
          const urls = await Promise.all(imageFiles.map(image => getDownloadUrl(image.s3Key).then(res => res)))
          setImageUrls(urls)
        } else {
          setImageUrls([])
        }
      }
      fetchImageUrls()

    }, [files])


  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "status-planning"
      case "in-progress":
        return "status-progress"
      case "completed":
        return "status-completed"
      case "on-hold":
        return "status-hold"
      default:
        return ""
    }
  }

  return (
    <div className="project-details">
      <div className="project-details-header">
        <div className="project-details-info">
          <h1 className="project-title">{project.title}</h1>
          <div className="project-meta">
            <span className={`project-status ${getStatusColor(project.status)}`}>
              {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
            <span className="project-type">{project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
          </div>
        </div>
        
      </div>

      <div className="project-tabs">
        <button className={`tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button className={`tab ${activeTab === "team" ? "active" : ""}`} onClick={() => setActiveTab("team")}>
          Team
        </button>
        <button
          className={`tab ${activeTab === "documents" ? "active" : ""}`}
          onClick={() => setActiveTab("documents")}
        >
          Documents
        </button>
        <button className={`tab ${activeTab === "gallery" ? "active" : ""}`} onClick={() => setActiveTab("gallery")}>
          Gallery
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "overview" && (
          <div className="overview-tab">
            <div className="project-description">
              <h3>Description</h3>
              <p>{project.description}</p>
            </div>

            <div className="project-details-grid">
              <div className="detail-item">
                <div className="detail-icon">
                  <Calendar size={20} />
                </div>
                <div className="detail-content">
                  <h4>Timeline</h4>
                  <div>
                    <p>
                      {formatDate(project.startDate.toString())}
                      {project.endDate && ` - ${formatDate(project.endDate.toString())}`}
                    </p>
                  </div>

                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <MapPin size={20} />
                </div>
                <div className="detail-content">
                  <h4>Location</h4>
                  <p>{project.location}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <Users size={20} />
                </div>
                <div className="detail-content">
                  <h4>Client</h4>
                  <p>{project.clientUserName}</p>
                <p className="detail-secondary">{project.client.email}</p>
             
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="team-tab">
            <h3>Project Team</h3>
            <div className="team-grid">
              {project.architects.map((member) => (
                <TeamMember key={member.userId} member={member} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="documents-tab">
            {documents && (<>
              <h3>Project Documents</h3>
              <div className="documents-list">
                {documents.length === 0 ? (
                  <p className="no-documents">No documents available</p>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="document-item">
                       <FileCard file={doc} hasAccess={hasAccess} />
                    </div>
                  ))
                )}
              </div>
            </>)}
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="gallery-tab">
            <h3>Project Gallery</h3>
            {imageUrls && (
              <div className="gallery-grid">
              
                {!imageFiles || imageFiles.length === 0 ? (
                  <p className="no-images">No images available</p>
                ) : (
                  imageFiles.map((image, index) => (
                    <FileCard key={index} file={image} hasAccess={hasAccess} />
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default ProjectDetailsView
