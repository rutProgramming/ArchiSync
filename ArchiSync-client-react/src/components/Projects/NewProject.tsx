
import { useState, useRef } from "react"
import { useNavigate } from "react-router"
import { X, Plus } from "lucide-react"
import Button from "../Additional/Button"
import "./NewProject.css"
import "../../App.css"
import { useDispatch, useSelector } from "react-redux"
import { addProject } from "../../store/Project"
import toast from "react-hot-toast"
import { Project, ProjectDTO, ProjectStatus, ProjectType } from "../../types/Project"
import { RootState, AppDispatch } from "../../store/reduxStore"
import FileUploader from "../Files/FileUploader"

const NewProject = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.connect.user)
  const architectRef = useRef<HTMLInputElement>(null!)
  const [step, setStep] = useState(1)
  // const [projectImage, setProjectImage] = useState<File | null>(null)
  // const [projectImageUrl, setProjectImageUrl] = useState<string>("")
  // const [projectId, setProjectId] = useState<number | null>(null)
  const project = useSelector((state: RootState) => state.projects.selectedProject);

  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    ownerId: user.userId,
    isPublic: false,
    parentId: null,
    type: "Mixed",
    status: "Planning",
    location: "",
    endDate: "",
    clientUserName: "",
    projectImage: "",
    architectUserNames: architectRef.current?.value ? [architectRef.current.value] : [],
  })


  const [loading, setLoading] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddItem = (field: "architectUserNames", ref: React.RefObject<HTMLInputElement>) => {
    const value = ref.current?.value.trim()
    if (!value || formData[field].includes(value)) return

    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value],
    }))
    ref.current!.value = ""
  }

  const handleRemoveItem = (field: "architectUserNames", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }))
  }
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isPublic: e.target.checked }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    dispatch(addProject({ project: formData as ProjectDTO }))
      .unwrap()
      .then(() => {
        setLoading(false)
        toast.success("Project created successfully!")
        setStep(2)
      })
      .catch(() => {
        setLoading(false)
        toast.error("Failed to create project")
      })
  }
 

  return (
    <div className="new-project-page">
      <div className="page-header">
        <h1>Create New Project</h1>
      </div>
        {step === 1 && (<>

      <form className="project-form" onSubmit={handleSubmit}>

          <div className="form-grid">
            <div className="form-section">
              <h2>Project Details</h2>

              <div className="form-group">
                <label>Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the project"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Client</label>
                <input
                  type="text"
                  name="clientUserName"
                  value={formData.clientUserName}
                  onChange={handleChange}
                  placeholder="Client name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Project location"
                  className="form-input"
                />
              </div>

              <div className="form-row">


                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate ? (typeof formData.endDate === "string" ? formData.endDate : formData.endDate instanceof Date ? formData.endDate.toISOString().split("T")[0] : "") : ""}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Additional Information</h2>

              <div className="form-group">
                <label>Architects</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    ref={architectRef}
                    placeholder="Add architect"
                    className="form-input"
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddItem("architectUserNames", architectRef))
                    }
                  />
                  <Button type="button" onClick={() => handleAddItem("architectUserNames", architectRef)}>
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="tags-container">
                  {formData.architectUserNames.map((a, i) => (
                    <div key={i} className="tag">
                      {a}
                      <Button type="button" onClick={() => handleRemoveItem("architectUserNames", a)}>
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                </div>



              </div>

              <div className="form-section">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    className="form-select"
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as ProjectType }))}>
                    <option value="Mixed">Mixed Use</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>

                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as ProjectStatus }))}>
                    <option value="Planning">Planning</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="OnHold">On Hold</option>
                  </select>

                </div>
              </div>
            
            </div>
          </div>
        
        
        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" checked={formData.isPublic} onChange={handleCheckbox} /> Make Public
          </label>
        </div>
        <div className="form-actions">
          <Button type="button" onClick={() => navigate("/projects")}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
              </>)}

      {step === 2 && (
          <div className="form-section">

          <div className="form-group">
              <label>Project Image</label>
              <div className="file-upload">
                <FileUploader projectId={project?.id!} projectName={project?.title!} fileName={"Project image"} />
              </div>
            </div>
             <Button type="button" onClick={() => {navigate("/projects")}}>
               Finish
           </Button>
          </div>
        )}
    </div>
  )
}

export default NewProject
