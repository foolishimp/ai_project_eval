import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="unified-header">
      <div className="header-content">
        <div className="header-title">
          <div className="header-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="header-main-title">AI Project Management</h1>
            <p className="header-subtitle">Evaluation & Portfolio Analytics</p>
          </div>
        </div>
        
        <div className="header-status">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>System Ready</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header