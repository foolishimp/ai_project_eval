import React from 'react'
import './TabNavigation.css'

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'builder', label: 'Project Builder', icon: '📋' },
    { id: 'evaluation', label: 'Evaluation', icon: '⚖️' },
    { id: 'analytics', label: 'Portfolio Analytics', icon: '📊' }
  ]

  return (
    <nav className="tab-navigation">
      <div className="tab-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default TabNavigation