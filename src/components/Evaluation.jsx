import React, { useState } from 'react'
import './Evaluation.css'

const Evaluation = () => {
  const [evaluation, setEvaluation] = useState({
    revenueImpact: 3,
    timeToValue: 3,
    strategicAlignment: 3,
    technicalComplexity: 3,
    dataAvailability: 3,
    resourceRequirements: 3
  })
  
  const [results, setResults] = useState(null)

  const handleSliderChange = (criterion, value) => {
    setEvaluation(prev => ({
      ...prev,
      [criterion]: parseInt(value)
    }))
  }

  const calculateEvaluation = () => {
    const { revenueImpact, timeToValue, strategicAlignment, technicalComplexity, dataAvailability, resourceRequirements } = evaluation
    
    // Calculate scores
    const valueScore = ((revenueImpact + timeToValue + strategicAlignment) / 3).toFixed(2)
    const riskScore = ((technicalComplexity + dataAvailability + resourceRequirements) / 3).toFixed(2)
    const finalScore = (valueScore - riskScore).toFixed(2)
    
    // Determine priority
    let priority, label, color
    if (valueScore >= 3.5 && riskScore <= 2.5) {
      priority = 1
      label = "High Value / Low Risk"
      color = "#4ade80"
    } else if (valueScore >= 3.5 && riskScore > 2.5) {
      priority = 2
      label = "High Value / High Risk"
      color = "#fbbf24"
    } else if (valueScore < 3.5 && riskScore <= 2.5) {
      priority = 3
      label = "Medium Value / Low Risk"
      color = "#60a5fa"
    } else {
      priority = 4
      label = "Low Value / High Risk"
      color = "#f87171"
    }

    setResults({
      valueScore: parseFloat(valueScore),
      riskScore: parseFloat(riskScore),
      finalScore: parseFloat(finalScore),
      priority,
      label,
      color
    })
  }

  const criteria = [
    { id: 'revenueImpact', label: 'Revenue Impact', category: 'value', description: 'Potential to increase revenue' },
    { id: 'timeToValue', label: 'Time to Value', category: 'value', description: 'How quickly benefits are realized' },
    { id: 'strategicAlignment', label: 'Strategic Alignment', category: 'value', description: 'Alignment with business strategy' },
    { id: 'technicalComplexity', label: 'Technical Complexity', category: 'risk', description: 'Implementation difficulty' },
    { id: 'dataAvailability', label: 'Data Availability', category: 'risk', description: 'Quality and accessibility of data' },
    { id: 'resourceRequirements', label: 'Resource Requirements', category: 'risk', description: 'Required time, budget, and skills' }
  ]

  return (
    <div className="evaluation">
      <div className="evaluation-container">
        <div className="evaluation-header">
          <h2>Project Evaluation</h2>
          <p>Rate each criterion on a scale of 1-5 to calculate the project's priority and risk profile.</p>
        </div>

        <div className="evaluation-content">
          <div className="criteria-section">
            <h3>Value Dimensions</h3>
            <div className="criteria-group">
              {criteria.filter(c => c.category === 'value').map(criterion => (
                <div key={criterion.id} className="criterion">
                  <div className="criterion-header">
                    <label>{criterion.label}</label>
                    <span className="criterion-value">{evaluation[criterion.id]}</span>
                  </div>
                  <p className="criterion-description">{criterion.description}</p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={evaluation[criterion.id]}
                    onChange={(e) => handleSliderChange(criterion.id, e.target.value)}
                    className="criterion-slider value-slider"
                  />
                  <div className="slider-labels">
                    <span>1 - Low</span>
                    <span>5 - High</span>
                  </div>
                </div>
              ))}
            </div>

            <h3>Risk Dimensions</h3>
            <div className="criteria-group">
              {criteria.filter(c => c.category === 'risk').map(criterion => (
                <div key={criterion.id} className="criterion">
                  <div className="criterion-header">
                    <label>{criterion.label}</label>
                    <span className="criterion-value">{evaluation[criterion.id]}</span>
                  </div>
                  <p className="criterion-description">{criterion.description}</p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={evaluation[criterion.id]}
                    onChange={(e) => handleSliderChange(criterion.id, e.target.value)}
                    className="criterion-slider risk-slider"
                  />
                  <div className="slider-labels">
                    <span>1 - Low</span>
                    <span>5 - High</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="calculate-btn" onClick={calculateEvaluation}>
              Calculate Evaluation
            </button>
          </div>

          {results && (
            <div className="results-section">
              <h3>Evaluation Results</h3>
              
              <div className="results-summary">
                <div className="result-item">
                  <label>Value Score</label>
                  <div className="result-value value">{results.valueScore}</div>
                </div>
                <div className="result-item">
                  <label>Risk Score</label>
                  <div className="result-value risk">{results.riskScore}</div>
                </div>
                <div className="result-item">
                  <label>Final Score</label>
                  <div className="result-value final">{results.finalScore}</div>
                </div>
              </div>

              <div className="priority-result">
                <div className="priority-badge" style={{ backgroundColor: results.color }}>
                  Priority {results.priority}
                </div>
                <div className="priority-label">{results.label}</div>
              </div>

              <div className="recommendation">
                <h4>Recommendation</h4>
                <p>
                  {results.priority === 1 && "Strong candidate for immediate implementation. Low risk with high value potential."}
                  {results.priority === 2 && "High value project that requires careful risk management. Consider phased approach."}
                  {results.priority === 3 && "Solid project for building capabilities. Good learning opportunity with manageable risk."}
                  {results.priority === 4 && "Consider alternative approaches or defer until risks can be mitigated."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Evaluation