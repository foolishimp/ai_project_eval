import React, { useState, useEffect } from 'react'
import apiService from '../services/api'
import './ProjectBuilder.css'

const ProjectBuilder = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    submitter: '',
    department: '',
    description: ''
  })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const response = await apiService.getProjects()
      setProjects(response.projects || [])
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProjectSelect = (project) => {
    setSelectedProject(project)
    setFormData({
      name: project.name || '',
      submitter: project.submitter || '',
      department: project.department || '',
      description: project.description || ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Project data:', formData)
    // TODO: Save project
  }

  const handleCreateNew = () => {
    setSelectedProject(null)
    setFormData({
      name: '',
      submitter: '',
      department: '',
      description: ''
    })
  }

  return (
    <div className="project-builder">
      <div className="project-builder-container">
        <div className="project-sidebar">
          <div className="sidebar-header">
            <h3>Projects</h3>
            <button className="btn-new" onClick={handleCreateNew}>
              + New Project
            </button>
          </div>
          
          {loading ? (
            <div className="loading">Loading projects...</div>
          ) : (
            <div className="project-list">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`project-item ${selectedProject?.id === project.id ? 'selected' : ''}`}
                  onClick={() => handleProjectSelect(project)}
                >
                  <div className="project-name">{project.name}</div>
                  <div className="project-meta">
                    {project.department} • Score: {project.finalScore || 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="project-form-container">
          <div className="form-header">
            <h2>{selectedProject ? 'Edit Project' : 'Create New Project'}</h2>
          </div>

          <form onSubmit={handleSubmit} className="project-form">
            <div className="form-group">
              <label htmlFor="name">Project Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter project name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="submitter">Submitter</label>
                <input
                  type="text"
                  id="submitter"
                  name="submitter"
                  value={formData.submitter}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select department</option>
                  <option value="technology">Technology</option>
                  <option value="marketing">Marketing</option>
                  <option value="operations">Operations</option>
                  <option value="risk_management">Risk Management</option>
                  <option value="finance">Finance</option>
                  <option value="hr">Human Resources</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Project Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the AI project, its goals, and expected outcomes..."
                rows={8}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handleCreateNew}>
                Clear Form
              </button>
              <button type="submit" className="btn-primary">
                {selectedProject ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProjectBuilder