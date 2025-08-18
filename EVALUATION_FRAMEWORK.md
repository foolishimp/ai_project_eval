# Evaluation Framework Design

## Template Management System

### Template Flag Implementation

```json
{
  "metadata": {
    "schema": "ai-project-v1.0",
    "project": {
      "id": "template_marketing_copy_generation",
      "key": "TEMPLATE-001",
      "name": "[Example] Marketing Copy Generation Tool",
      "isTemplate": true,
      "templateType": "calibration_example",
      "templateCategory": "content_generation",
      "templatePurpose": "Demonstrates Priority 3 classification with medium value/low risk profile",
      "protectionLevel": "read_only",
      "version": "1.0.0"
    }
  }
}
```

## Evaluation Type System

### 1. Quick Assessment (Algorithmic)
```json
{
  "evaluationType": "quick_assessment",
  "template": {
    "criteria": [
      {
        "id": "revenue_impact",
        "name": "Revenue Impact Potential", 
        "category": "business_value",
        "weight": 0.33,
        "scoreRange": [1, 5],
        "scoringMethod": "discrete_scale"
      },
      {
        "id": "time_to_value",
        "name": "Time to Realize Value",
        "category": "business_value", 
        "weight": 0.33,
        "scoreRange": [1, 5],
        "scoringMethod": "discrete_scale"
      },
      {
        "id": "strategic_alignment",
        "name": "Strategic Alignment",
        "category": "business_value",
        "weight": 0.34,
        "scoreRange": [1, 5], 
        "scoringMethod": "discrete_scale"
      },
      {
        "id": "technical_complexity",
        "name": "Technical Complexity",
        "category": "risk_factor",
        "weight": 0.33,
        "scoreRange": [1, 5],
        "scoringMethod": "discrete_scale",
        "reverseScore": true
      },
      {
        "id": "data_availability",
        "name": "Data Quality & Availability", 
        "category": "risk_factor",
        "weight": 0.33,
        "scoreRange": [1, 5],
        "scoringMethod": "discrete_scale",
        "reverseScore": true
      },
      {
        "id": "resource_requirements",
        "name": "Resource Requirements",
        "category": "risk_factor", 
        "weight": 0.34,
        "scoreRange": [1, 5],
        "scoringMethod": "discrete_scale",
        "reverseScore": true
      }
    ],
    "scoringModel": {
      "valueScore": {
        "calculation": "weighted_average",
        "criteria": ["revenue_impact", "time_to_value", "strategic_alignment"]
      },
      "riskScore": {
        "calculation": "weighted_average", 
        "criteria": ["technical_complexity", "data_availability", "resource_requirements"]
      },
      "finalScore": {
        "calculation": "value_minus_risk",
        "formula": "valueScore - riskScore"
      }
    },
    "priorityRules": [
      {
        "condition": "valueScore >= 3.5 && riskScore <= 2.5",
        "priority": 1,
        "label": "High Value / Low Risk"
      },
      {
        "condition": "valueScore >= 3.5 && riskScore > 2.5", 
        "priority": 2,
        "label": "High Value / High Risk"
      },
      {
        "condition": "valueScore < 3.5 && riskScore <= 2.5",
        "priority": 3,
        "label": "Medium Value / Low Risk"
      },
      {
        "condition": "valueScore < 3.5 && riskScore > 2.5",
        "priority": 4,
        "label": "Low Value / High Risk"
      }
    ]
  }
}
```

### 2. Detailed Evaluation (Human Expert)
```json
{
  "evaluationType": "detailed_evaluation",
  "template": {
    "sections": [
      {
        "id": "business_analysis",
        "name": "Business Value Analysis",
        "criteria": [
          {
            "id": "revenue_potential",
            "name": "Revenue Generation Potential",
            "description": "Assess direct and indirect revenue opportunities",
            "scoreRange": [1, 5],
            "weight": 0.3,
            "evidenceRequired": ["financial_projections", "market_analysis"]
          },
          {
            "id": "cost_reduction",
            "name": "Cost Reduction Potential", 
            "description": "Quantify operational cost savings",
            "scoreRange": [1, 5],
            "weight": 0.25,
            "evidenceRequired": ["current_cost_analysis", "savings_projections"]
          },
          {
            "id": "strategic_value",
            "name": "Strategic Business Value",
            "description": "Alignment with strategic objectives and competitive advantage",
            "scoreRange": [1, 5],
            "weight": 0.25,
            "evidenceRequired": ["strategic_alignment_analysis"]
          },
          {
            "id": "business_criticality",
            "name": "Business Criticality",
            "description": "Importance to core business operations",
            "scoreRange": [1, 5], 
            "weight": 0.2,
            "evidenceRequired": ["business_impact_analysis"]
          }
        ]
      },
      {
        "id": "technical_analysis",
        "name": "Technical Risk Assessment", 
        "criteria": [
          {
            "id": "implementation_complexity",
            "name": "Implementation Complexity",
            "description": "Technical difficulty and development challenges",
            "scoreRange": [1, 5],
            "weight": 0.3,
            "reverseScore": true,
            "evidenceRequired": ["technical_architecture", "complexity_analysis"]
          },
          {
            "id": "data_readiness",
            "name": "Data Quality and Availability",
            "description": "Quality, volume, and accessibility of required data",
            "scoreRange": [1, 5],
            "weight": 0.25, 
            "reverseScore": true,
            "evidenceRequired": ["data_quality_report", "data_availability_analysis"]
          },
          {
            "id": "integration_risk",
            "name": "System Integration Risk",
            "description": "Complexity of integrating with existing systems",
            "scoreRange": [1, 5],
            "weight": 0.25,
            "reverseScore": true,
            "evidenceRequired": ["integration_plan", "system_dependencies"]
          },
          {
            "id": "regulatory_risk",
            "name": "Regulatory and Compliance Risk",
            "description": "Potential regulatory challenges and compliance requirements", 
            "scoreRange": [1, 5],
            "weight": 0.2,
            "reverseScore": true,
            "evidenceRequired": ["regulatory_analysis", "compliance_requirements"]
          }
        ]
      },
      {
        "id": "feasibility_analysis",
        "name": "Implementation Feasibility",
        "criteria": [
          {
            "id": "organizational_readiness", 
            "name": "Organizational Readiness",
            "description": "Organization's capability to execute the project",
            "scoreRange": [1, 5],
            "weight": 0.4,
            "evidenceRequired": ["readiness_assessment", "change_management_plan"]
          },
          {
            "id": "resource_availability",
            "name": "Resource Availability",
            "description": "Availability of required skills, budget, and time",
            "scoreRange": [1, 5],
            "weight": 0.35,
            "evidenceRequired": ["resource_plan", "budget_approval", "skills_assessment"]
          },
          {
            "id": "timeline_realism",
            "name": "Timeline Feasibility", 
            "description": "Realism of proposed implementation timeline",
            "scoreRange": [1, 5],
            "weight": 0.25,
            "evidenceRequired": ["project_timeline", "milestone_analysis", "dependency_mapping"]
          }
        ]
      }
    ],
    "evidenceRequirements": {
      "mandatory": [
        "business_case_document",
        "technical_architecture_overview", 
        "resource_requirements_summary"
      ],
      "recommended": [
        "pilot_study_results",
        "stakeholder_impact_analysis",
        "competitive_analysis"
      ]
    },
    "approvalWorkflow": {
      "steps": [
        {
          "name": "evaluator_assessment",
          "role": "assigned_evaluator",
          "required": true
        },
        {
          "name": "peer_review", 
          "role": "peer_evaluator",
          "required": false,
          "trigger": "high_risk_or_high_value"
        },
        {
          "name": "domain_expert_review",
          "role": "domain_expert",
          "required": true,
          "trigger": "technical_complexity > 3"
        }
      ]
    }
  }
}
```

### 3. Template Project Example Structure
```json
{
  "metadata": {
    "schema": "ai-project-v1.0",
    "project": {
      "id": "template_customer_support_classification", 
      "key": "TEMPLATE-003",
      "name": "[Example] Customer Support Ticket Classification System",
      "isTemplate": true,
      "templateType": "calibration_example",
      "templateCategory": "classification_analysis",
      "templatePurpose": "Demonstrates Priority 2 classification - high value but with elevated risk factors",
      "protectionLevel": "read_only",
      "calibrationData": {
        "targetPriority": 2,
        "targetValueScore": 4.0,
        "targetRiskScore": 3.5,
        "targetFinalScore": 0.5,
        "reasoningExplanation": "High business value due to customer satisfaction impact, but elevated technical and organizational risks"
      },
      "version": "1.0.0"
    },
    "templateManagement": {
      "createdBy": "system_admin",
      "approvedBy": "evaluation_committee", 
      "lastReviewed": "2025-01-15T10:00:00Z",
      "reviewFrequency": "quarterly",
      "usageTracking": {
        "timesUsed": 47,
        "lastUsed": "2025-01-18T14:22:00Z",
        "averageUserRating": 4.2
      },
      "maintenanceNotes": "Scores calibrated based on 50+ real project evaluations in classification category"
    }
  }
}
```

## Benefits of Template Flag System

### 1. **Clear Template Management**
```javascript
// Filter templates vs real projects
const templates = projects.filter(p => p.metadata.project.isTemplate);
const realProjects = projects.filter(p => !p.metadata.project.isTemplate);

// Template-specific operations
function protectTemplate(project) {
  if (project.metadata.project.isTemplate && 
      project.metadata.project.protectionLevel === 'read_only') {
    return { canEdit: false, canDelete: false, canOverwrite: false };
  }
}
```

### 2. **Evaluation Calibration**
```javascript
// Get calibration examples for specific priority level
function getCalibrationExamples(targetPriority) {
  return templates.filter(t => 
    t.metadata.project.calibrationData?.targetPriority === targetPriority
  );
}

// Validate evaluation scoring against calibration data
function validateScoring(evaluation, projectCategory) {
  const calibrationTemplate = templates.find(t => 
    t.metadata.project.templateCategory === projectCategory &&
    t.metadata.project.templateType === 'calibration_example'
  );
  
  if (calibrationTemplate) {
    const expectedScore = calibrationTemplate.metadata.project.calibrationData.targetFinalScore;
    const actualScore = evaluation.scores.overall.finalScore;
    const variance = Math.abs(expectedScore - actualScore);
    
    return {
      isWithinExpectedRange: variance <= 0.5,
      variance: variance,
      calibrationReference: calibrationTemplate.metadata.project.name
    };
  }
}
```

### 3. **Template Usage Analytics**
```javascript
// Track template usage and effectiveness
function trackTemplateUsage(templateId, userId, userRating) {
  const template = findTemplate(templateId);
  template.metadata.templateManagement.usageTracking.timesUsed++;
  template.metadata.templateManagement.usageTracking.lastUsed = new Date().toISOString();
  
  // Update average rating
  const currentAvg = template.metadata.templateManagement.usageTracking.averageUserRating;
  const newAvg = ((currentAvg * (template.metadata.templateManagement.usageTracking.timesUsed - 1)) + userRating) / 
                  template.metadata.templateManagement.usageTracking.timesUsed;
  
  template.metadata.templateManagement.usageTracking.averageUserRating = newAvg;
}
```

### 4. **Different Evaluation Types Based on Project Maturity**
```javascript
function determineRecommendedEvaluationType(project) {
  const projectValue = estimateProjectValue(project);
  const projectRisk = estimateProjectRisk(project);
  const resourcesRequired = project.metadata.resources?.budget?.development || 0;
  
  if (resourcesRequired < 50000 && projectRisk < 3) {
    return 'quick_assessment';
  } else if (resourcesRequired > 200000 || projectRisk > 4 || projectValue > 4) {
    return 'detailed_evaluation';
  } else {
    return 'standard_evaluation';
  }
}
```

This template system provides:
- **Clear separation** between templates and real projects
- **Protection mechanisms** to prevent accidental modification of examples
- **Calibration data** to ensure consistent scoring
- **Usage tracking** to improve template effectiveness
- **Flexible evaluation frameworks** for different project types and risk levels