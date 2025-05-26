import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"
import Button from "../S/Button"
import ProjectDetailsView from "./ProjectDetailsView"
import FileUploader from "../Files/FileUploader"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/reduxStore"
import { useDispatch } from "react-redux"
import { getFiles } from "../../store/File"
import { GetProjectById } from "../../store/Project"
import Workspace from "../Workspace"


const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = (useSelector((state: RootState) => state.projects.selectedProject));
  const user = useSelector((state: RootState) => state.connect.user)
  const files = useSelector((state: RootState) => state.files.files)
  // const [timelineEvents] = useState(sampleTimelineEvents)
  // const [comments] = useState(sampleComments)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(GetProjectById(id!));
    if (user && user.userId) {
      dispatch(getFiles({ projectId: +(id!), userId: user.userId! }))
    }
  }, [dispatch, id, user])

  const handleAddComment = (content: string, parentId?: string) => {
    console.log("Adding comment:", content, parentId)
    // In a real app, this would call an API to add the comment
  }

  const handleLikeComment = (id: string) => {
    console.log("Liking comment:", id)
    // In a real app, this would call an API to like the comment
  }

  const handleFileUpload = (files: File[]) => {
    console.log("Uploading files:", files)
    // In a real app, this would call an API to upload the files
  }
  const [activeTab, setActiveTab] = useState<"Upload Files" | "AI Workspace">("Upload Files")

  return (
    <div className="project-detail-page">
      <div className="page-header">
        <Link to="/projects" className="back-link">
          <Button variant="ghost" icon={<ArrowLeft size={16} />}>
            Back to Projects
          </Button>
        </Link>
      </div>
      {project && (<>
          <div className="project-detail-content">

            <ProjectDetailsView project={project} files={files} />
          </div>
<div className="project-datail-content">
          <div className="project-detail-sections">
            {/* <section className="detail-section">
            <h2 className="section-title">Timeline</h2>
            <ProjectTimeline events={timelineEvents} />
          </section> */}
            <div className="project-tabs">
              <button className={`tab ${activeTab === "Upload Files" ? "active" : ""}`} onClick={() => setActiveTab("Upload Files")}>
                Upload Files
              </button>
              <button className={`tab ${activeTab === "AI Workspace" ? "active" : ""}`} onClick={() => setActiveTab("AI Workspace")}>
                AI Workspace
              </button>
            </div>

            {activeTab === "Upload Files" && (
              <section className="detail-section">
                <h2 className="section-title">Upload Files</h2>
                <FileUploader projectId={+(id!)} projectName={project.title} />
              </section>
            )}

            {activeTab === "AI Workspace" && (
              <Workspace projectId={+(id!)} projectName={project.title} />

            )}


            {/* <CommentSection comments={comments} onAddComment={handleAddComment} onLikeComment={handleLikeComment} /> */}


          </div>
          </div>
        </>
        )    

      }
      </div >
  )
}

export default ProjectDetail
