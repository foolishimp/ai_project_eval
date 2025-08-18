# Project Metadata Schema

## Approach: JSON Frontmatter + Markdown Content

Each project file (`.md`) will have structured JSON metadata in a frontmatter block, followed by human-readable markdown content.

## File Structure Example

```markdown
```json
{
  "metadata": {
    "schema": "ai-project-v1.0",
    "project": {
      "id": "20250117_exotic_trades_pipeline",
      "name": "Intelligent Exotic Trades Mapping Pipeline",
      "status": "under_evaluation",
      "version": "1.0.0",
      "createdAt": "2025-01-17T10:00:00Z",
      "updatedAt": "2025-01-17T15:30:00Z"
    },
    "business": {
      "submitter": {
        "name": "Data Architecture Team",
        "email": "data-arch@company.com",
        "role": "technical_lead"
      },
      "sponsor": {
        "name": "Jane Smith",
        "email": "jane.smith@company.com", 
        "role": "cro"
      },
      "department": "risk_management",
      "stakeholders": [
        {
          "name": "Risk Team",
          "role": "primary_user",
          "impact": "high"
        }
      ]
    },
    "classification": {
      "category": "data_extraction",
      "strategy": "formalized_assets",
      "complexity": "high",
      "domain": "financial_services"
    },
    "evaluation": {
      "currentEvaluationId": "eval_20250117_001",
      "evaluationType": "quick_assessment",
      "lastEvaluatedAt": "2025-01-17T14:00:00Z",
      "evaluator": {
        "name": "System",
        "type": "algorithmic"
      }
    },
    "scores": {
      "overall": {
        "finalScore": 0.92,
        "priority": 2,
        "confidence": 0.85
      },
      "dimensions": {
        "value": {
          "score": 4.2,
          "breakdown": {
            "revenueImpact": 4,
            "timeToValue": 3,
            "strategicAlignment": 5
          }
        },
        "risk": {
          "score": 3.3,
          "breakdown": {
            "technicalComplexity": 4,
            "dataAvailability": 3,
            "resourceRequirements": 3
          }
        },
        "feasibility": {
          "score": 3.8,
          "breakdown": {
            "technicalFeasibility": 4,
            "organizationalReadiness": 3,
            "resourceAvailability": 4
          }
        }
      }
    },
    "timeline": {
      "phases": [
        {
          "name": "discovery",
          "startDate": "2025-02-01",
          "endDate": "2025-03-15",
          "status": "planned"
        },
        {
          "name": "development", 
          "startDate": "2025-03-15",
          "endDate": "2025-05-30",
          "status": "planned"
        }
      ],
      "expectedROI": "2025-08-01"
    },
    "resources": {
      "teamSize": 4,
      "budget": {
        "development": 180000,
        "infrastructure": 24000,
        "annual": 45000,
        "currency": "USD"
      },
      "skills": [
        "nlp_engineering",
        "financial_domain",
        "data_architecture"
      ]
    },
    "risks": {
      "overall": "medium_high",
      "factors": [
        {
          "category": "technical",
          "description": "LLM accuracy on exotic instruments",
          "severity": "high",
          "probability": "medium",
          "mitigation": "Extensive testing with domain experts"
        }
      ]
    },
    "compliance": {
      "requirements": ["basel_iii", "gdpr"],
      "approvals": [],
      "auditTrail": true
    },
    "tags": [
      "risk_management",
      "regulatory_compliance", 
      "data_pipeline",
      "llm",
      "financial_instruments"
    ]
  }
}
```

# AI Project Proposal: Intelligent Exotic Trades Mapping Pipeline

**Project Name**: Intelligent Exotic Trades Mapping Pipeline
**Submitter**: Data Architecture Team
**Date**: 2025-01-17
**Department/Team**: Risk Management & Data Architecture
**Evaluation Date**: 2025-01-17
**Final Score**: 0.92
**Priority Level**: Priority 2
**Recommendation**: Approve with detailed planning required

## Executive Summary

Develop an AI-powered data pipeline that automatically maintains schema mappings between the complex exotic products trading desk bounded context and the simplified liquidity/capital requirements domain model...

[Rest of markdown content continues as normal...]
```

## JSON Schema Definition

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AI Project Metadata Schema",
  "type": "object",
  "properties": {
    "metadata": {
      "type": "object",
      "properties": {
        "schema": {
          "type": "string",
          "description": "Schema version identifier",
          "pattern": "^ai-project-v\\d+\\.\\d+$"
        },
        "project": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Unique project identifier",
              "pattern": "^\\d{8}_[a-z0-9_]+$"
            },
            "name": {
              "type": "string",
              "maxLength": 200
            },
            "status": {
              "type": "string", 
              "enum": ["draft", "submitted", "under_evaluation", "evaluated", "approved", "rejected", "on_hold", "in_progress", "completed", "cancelled"]
            },
            "version": {
              "type": "string",
              "pattern": "^\\d+\\.\\d+\\.\\d+$"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string", 
              "format": "date-time"
            }
          },
          "required": ["id", "name", "status", "version", "createdAt", "updatedAt"]
        },
        "business": {
          "type": "object",
          "properties": {
            "submitter": {
              "$ref": "#/definitions/person"
            },
            "sponsor": {
              "$ref": "#/definitions/person"
            },
            "department": {
              "type": "string",
              "enum": ["risk_management", "technology", "operations", "trading", "compliance", "data_science", "other"]
            },
            "stakeholders": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {"type": "string"},
                  "role": {"type": "string"},
                  "impact": {"enum": ["high", "medium", "low"]}
                }
              }
            }
          },
          "required": ["submitter", "department"]
        },
        "classification": {
          "type": "object",
          "properties": {
            "category": {
              "type": "string",
              "enum": ["content_generation", "classification_analysis", "search_retrieval", "data_extraction", "conversational_ai", "code_technical", "automation_workflow", "decision_support"]
            },
            "strategy": {
              "type": "string", 
              "enum": ["direct_prompting", "formalized_assets", "live_production"]
            },
            "complexity": {
              "type": "string",
              "enum": ["low", "medium", "high", "very_high"]
            },
            "domain": {
              "type": "string",
              "examples": ["financial_services", "healthcare", "retail", "manufacturing", "technology"]
            }
          },
          "required": ["category", "strategy", "complexity"]
        },
        "evaluation": {
          "type": "object",
          "properties": {
            "currentEvaluationId": {"type": "string"},
            "evaluationType": {
              "type": "string",
              "enum": ["quick_assessment", "detailed_evaluation", "peer_review", "executive_review", "technical_review", "compliance_review"]
            },
            "lastEvaluatedAt": {
              "type": "string",
              "format": "date-time"  
            },
            "evaluator": {
              "type": "object",
              "properties": {
                "name": {"type": "string"},
                "type": {"enum": ["human", "algorithmic", "committee"]}
              }
            }
          }
        },
        "scores": {
          "type": "object",
          "properties": {
            "overall": {
              "type": "object",
              "properties": {
                "finalScore": {
                  "type": "number",
                  "minimum": -5,
                  "maximum": 5
                },
                "priority": {
                  "type": "integer",
                  "minimum": 1,
                  "maximum": 4
                },
                "confidence": {
                  "type": "number",
                  "minimum": 0,
                  "maximum": 1
                }
              }
            },
            "dimensions": {
              "type": "object",
              "properties": {
                "value": {"$ref": "#/definitions/dimensionalScore"},
                "risk": {"$ref": "#/definitions/dimensionalScore"},
                "feasibility": {"$ref": "#/definitions/dimensionalScore"}
              }
            }
          }
        },
        "timeline": {
          "type": "object",
          "properties": {
            "phases": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {"type": "string"},
                  "startDate": {"type": "string", "format": "date"},
                  "endDate": {"type": "string", "format": "date"},
                  "status": {"enum": ["planned", "in_progress", "completed", "delayed"]}
                }
              }
            },
            "expectedROI": {"type": "string", "format": "date"}
          }
        },
        "resources": {
          "type": "object", 
          "properties": {
            "teamSize": {"type": "integer", "minimum": 1},
            "budget": {
              "type": "object",
              "properties": {
                "development": {"type": "number"},
                "infrastructure": {"type": "number"}, 
                "annual": {"type": "number"},
                "currency": {"type": "string", "default": "USD"}
              }
            },
            "skills": {
              "type": "array",
              "items": {"type": "string"}
            }
          }
        },
        "risks": {
          "type": "object",
          "properties": {
            "overall": {"enum": ["low", "medium", "medium_high", "high", "very_high"]},
            "factors": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "category": {"enum": ["technical", "business", "organizational", "external"]},
                  "description": {"type": "string"},
                  "severity": {"enum": ["low", "medium", "high", "critical"]},
                  "probability": {"enum": ["low", "medium", "high"]},
                  "mitigation": {"type": "string"}
                }
              }
            }
          }
        },
        "compliance": {
          "type": "object",
          "properties": {
            "requirements": {
              "type": "array",
              "items": {"type": "string"}
            },
            "approvals": {
              "type": "array", 
              "items": {
                "type": "object",
                "properties": {
                  "approver": {"type": "string"},
                  "status": {"enum": ["pending", "approved", "rejected"]},
                  "date": {"type": "string", "format": "date-time"}
                }
              }
            },
            "auditTrail": {"type": "boolean"}
          }
        },
        "tags": {
          "type": "array",
          "items": {"type": "string"}
        }
      },
      "required": ["schema", "project", "business", "classification"]
    }
  },
  "definitions": {
    "person": {
      "type": "object",
      "properties": {
        "name": {"type": "string"},
        "email": {"type": "string", "format": "email"},
        "role": {"type": "string"}
      },
      "required": ["name"]
    },
    "dimensionalScore": {
      "type": "object",
      "properties": {
        "score": {"type": "number", "minimum": 1, "maximum": 5},
        "breakdown": {
          "type": "object",
          "additionalProperties": {"type": "number", "minimum": 1, "maximum": 5}
        }
      }
    }
  }
}
```

## Implementation Benefits

### 1. **Best of Both Worlds**
- **Structured Data**: JSON metadata for programmatic access
- **Human Readable**: Markdown content for documentation
- **Version Control Friendly**: Text-based files work well with git

### 2. **API Integration**
```javascript
// Parse project file
const projectContent = fs.readFileSync('project.md', 'utf8');
const metadataMatch = projectContent.match(/```json\n([\s\S]*?)\n```/);
const metadata = JSON.parse(metadataMatch[1]);
const markdownContent = projectContent.replace(/```json[\s\S]*?```\n/, '');

// Access structured data
console.log(metadata.metadata.scores.overall.priority);
console.log(metadata.metadata.business.submitter.name);
```

### 3. **Schema Evolution**
- **Versioned Schema**: `schema: "ai-project-v1.0"` allows evolution
- **Backward Compatibility**: Can migrate older versions
- **Validation**: JSON Schema ensures data integrity

### 4. **Rich Querying**
```javascript
// Find high-priority projects in risk management
const highPriorityRiskProjects = projects.filter(p => 
  p.metadata.scores.overall.priority <= 2 && 
  p.metadata.business.department === 'risk_management'
);

// Get projects by evaluation confidence
const confidentEvaluations = projects.filter(p =>
  p.metadata.scores.overall.confidence > 0.8
);
```

This approach maintains your preference for markdown documentation while providing the structured data needed for robust project management and analytics.