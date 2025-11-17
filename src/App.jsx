import React, { useState } from 'react'
import Header from './components/Header'
import TabNavigation from './components/TabNavigation'
import ProjectBuilder from './components/ProjectBuilder'
import Evaluation from './components/Evaluation'
import PortfolioAnalytics from './components/PortfolioAnalytics'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('builder')

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'builder':
        return <ProjectBuilder />
      case 'evaluation':
        return <Evaluation />
      case 'analytics':
        return <PortfolioAnalytics />
      default:
        return <ProjectBuilder />
    }
  }

  return (
    <div className="app">
      <Header />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderActiveTab()}
      </main>
    </div>
  )
}

export default App