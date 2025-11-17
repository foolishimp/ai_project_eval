import React, { useState, useEffect } from 'react'
import apiService from '../services/api'
import './PortfolioAnalytics.css'

const PortfolioAnalytics = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState({ department: 'all', priority: 'all' })

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

  const filteredProjects = projects.filter(project => {
    const departmentMatch = filter.department === 'all' || project.department === filter.department
    const priorityMatch = filter.priority === 'all' || project.priority === parseInt(filter.priority)
    return departmentMatch && priorityMatch
  })

  const getQuadrantPosition = (project) => {
    // Use actual score ranges from the data
    const valueScore = project.valueScore || 0
    const riskScore = project.riskScore || 0
    
    // Map to 0-100 range for positioning
    const x = Math.max(0, Math.min(100, (valueScore / 5) * 100))
    const y = Math.max(0, Math.min(100, 100 - (riskScore / 5) * 100)) // Invert Y axis
    
    return { x, y }
  }

  const getPriorityColor = (priority) => {
    const colors = {
      1: '#4ade80',
      2: '#fbbf24',
      3: '#60a5fa',
      4: '#f87171'
    }
    return colors[priority] || '#94a3b8'
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <div className="portfolio-analytics">
      <div className="analytics-container">
        <div className="analytics-header">
          <h2>Portfolio Analytics</h2>
          <div className="filters">
            <select
              value={filter.department}
              onChange={(e) => setFilter(prev => ({ ...prev, department: e.target.value }))}
              className="filter-select"
            >
              <option value="all">All Departments</option>
              <option value="technology">Technology</option>
              <option value="marketing">Marketing</option>
              <option value="operations">Operations</option>
              <option value="risk_management">Risk Management</option>
            </select>
            
            <select
              value={filter.priority}
              onChange={(e) => setFilter(prev => ({ ...prev, priority: e.target.value }))}
              className="filter-select"
            >
              <option value="all">All Priorities</option>
              <option value="1">Priority 1</option>
              <option value="2">Priority 2</option>
              <option value="3">Priority 3</option>
              <option value="4">Priority 4</option>
            </select>
          </div>
        </div>

        <div className="analytics-content">
          <div className="matrix-container">
            <div className="matrix-wrapper">
              <div className="matrix-labels">
                <div className="y-label">Risk Score</div>
                <div className="y-axis-labels">
                  <span>5</span>
                  <span>4</span>
                  <span>3</span>
                  <span>2</span>
                  <span>1</span>
                </div>
              </div>
              
              <div className="risk-value-matrix">
                {/* Quadrant Labels */}
                <div className="quadrant-label top-left">High Value<br/>High Risk</div>
                <div className="quadrant-label top-right">High Value<br/>Low Risk</div>
                <div className="quadrant-label bottom-left">Low Value<br/>High Risk</div>
                <div className="quadrant-label bottom-right">Low Value<br/>Low Risk</div>
                
                {/* Grid Lines */}
                <div className="grid-line vertical" style={{left: '50%'}}></div>
                <div className="grid-line horizontal" style={{top: '50%'}}></div>
                
                {/* Project Points */}
                {filteredProjects.map((project) => {
                  const position = getQuadrantPosition(project)
                  return (
                    <div
                      key={project.id}
                      className="project-point"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        backgroundColor: getPriorityColor(project.priority)
                      }}
                      onClick={() => handleProjectClick(project)}
                      title={project.name}
                    >
                      <span className="project-point-label">{project.priority}</span>
                    </div>
                  )
                })}
              </div>
              
              <div className="x-axis-labels">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
              <div className="x-label">Value Score</div>
            </div>
          </div>

          <div className="project-stats">
            <div className="stats-header">
              <h3>Portfolio Summary</h3>
            </div>
            
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{filteredProjects.length}</div>
                <div className="stat-label">Total Projects</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-value">
                  {filteredProjects.filter(p => p.priority === 1).length}
                </div>
                <div className="stat-label">Priority 1</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-value">
                  {filteredProjects.filter(p => p.priority === 2).length}
                </div>
                <div className="stat-label">Priority 2</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-value">
                  {(filteredProjects.reduce((sum, p) => sum + (p.finalScore || 0), 0) / filteredProjects.length || 0).toFixed(2)}
                </div>
                <div className="stat-label">Avg Score</div>
              </div>
            </div>

            <div className="project-list">
              <h4>Project List</h4>
              {loading ? (
                <div className="loading">Loading projects...</div>
              ) : (
                filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="project-list-item"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="project-list-info">
                      <div className="project-list-name">{project.name}</div>
                      <div className="project-list-meta">
                        {project.department} • Score: {project.finalScore || 'N/A'}
                      </div>
                    </div>
                    <div 
                      className="project-list-priority"
                      style={{ backgroundColor: getPriorityColor(project.priority) }}
                    >
                      {project.priority}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedProject.name}</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-meta">
                <div><strong>Department:</strong> {selectedProject.department}</div>
                <div><strong>Submitter:</strong> {selectedProject.submitter}</div>
                <div><strong>Priority:</strong> {selectedProject.priority}</div>
                <div><strong>Final Score:</strong> {selectedProject.finalScore}</div>
              </div>
              
              <div className="modal-description">
                <strong>Description:</strong>
                <p>{selectedProject.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PortfolioAnalytics