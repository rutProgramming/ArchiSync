
import type React from "react"

import { useState } from "react"
import Button from "../S/Button"
import { Plus } from "lucide-react"
import "../App.css"
interface NewProjectFormProps {
  onSubmit: (data: { title: string; description: string; architect: string }) => void
}

const NewProjectForm = ({ onSubmit }: NewProjectFormProps) => {
  console.log("NewProjectForm")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [architect, setArchitect] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, description, architect })
    // Reset form
    setTitle("")
    setDescription("")
    setArchitect("")
  }

  return (
    <div className="new-project-form">
      <h2 className="form-title">New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="architect">Architect</label>
          <select
            id="architect"
            value={architect}
            onChange={(e) => setArchitect(e.target.value)}
            className="form-select"
          >
            <option value="">Select architect</option>
            <option value="john-doe">John Doe</option>
            <option value="jane-smith">Jane Smith</option>
            <option value="alex-johnson">Alex Johnson</option>
          </select>
        </div>

        <Button type="submit" variant="primary" icon={<Plus size={16} />} className="submit-button">
          Create
        </Button>
      </form>
    </div>
  )
}

export default NewProjectForm
