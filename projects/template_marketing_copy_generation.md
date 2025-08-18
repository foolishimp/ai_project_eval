```json
{
  "metadata": {
    "schema": "ai-project-v1.0",
    "project": {
      "id": "template_marketing_copy_generation",
      "key": "TEMPLATE-002",
      "name": "[Example] Marketing Copy Generation Tool",
      "isTemplate": true,
      "templateType": "calibration_example",
      "templateCategory": "content_generation",
      "templatePurpose": "Demonstrates Priority 3 classification with medium value/low risk profile for content generation projects",
      "protectionLevel": "read_only",
      "calibrationData": {
        "targetPriority": 3,
        "targetValueScore": 3.2,
        "targetRiskScore": 2.1,
        "targetFinalScore": 1.1,
        "confidenceLevel": 0.9,
        "reasoningExplanation": "Moderate business value with straightforward technical implementation. Good learning project with limited downside risk.",
        "calibrationNotes": "Based on analysis of 25+ content generation projects. Typical for marketing automation use cases."
      },
      "status": "template",
      "version": "1.0.0",
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    },
    "templateManagement": {
      "createdBy": {
        "name": "System Administrator",
        "email": "admin@company.com",
        "role": "system_admin"
      },
      "approvedBy": {
        "name": "Evaluation Committee",
        "email": "eval-committee@company.com",
        "role": "evaluation_committee"
      },
      "reviewCycle": {
        "frequency": "quarterly",
        "lastReviewed": "2025-01-15T10:00:00Z",
        "nextReview": "2025-04-15T10:00:00Z",
        "reviewStatus": "current"
      },
      "usageTracking": {
        "timesReferenced": 23,
        "timesCloned": 8,
        "lastUsed": "2025-01-18T11:45:00Z",
        "averageUserRating": 4.1,
        "userFeedback": [
          {
            "date": "2025-01-10",
            "rating": 4,
            "comment": "Good calibration example for content generation projects"
          },
          {
            "date": "2025-01-12",
            "rating": 5,
            "comment": "Helped understand Priority 3 classification criteria"
          }
        ]
      },
      "maintenanceNotes": "Scores calibrated based on 25+ real content generation project evaluations. Represents typical marketing automation use case.",
      "relatedTemplates": [
        "template_document_generation",
        "template_content_transformation"
      ]
    },
    "business": {
      "submitter": {
        "name": "Marketing Operations Team",
        "email": "marketing-ops@company.com",
        "role": "business_user"
      },
      "sponsor": {
        "name": "VP Marketing",
        "email": "vp.marketing@company.com",
        "role": "executive_sponsor"
      },
      "department": "marketing",
      "stakeholders": [
        {
          "name": "Content Marketing Team",
          "role": "primary_user",
          "impact": "medium"
        },
        {
          "name": "Brand Management",
          "role": "reviewer",
          "impact": "low"
        },
        {
          "name": "Legal/Compliance",
          "role": "approver",
          "impact": "low"
        }
      ]
    },
    "classification": {
      "category": "content_generation",
      "strategy": "direct_prompting",
      "complexity": "low",
      "domain": "marketing",
      "subDomain": "content_marketing",
      "aiTechnologies": ["large_language_models", "prompt_engineering"]
    },
    "evaluations": {
      "templateEvaluation": {
        "evaluationId": "TEMPLATE-EVAL-002",
        "type": "calibration_assessment",
        "status": "completed",
        "evaluator": {
          "name": "Evaluation Committee",
          "type": "committee"
        },
        "completedAt": "2025-01-15T10:00:00Z",
        "scores": {
          "overall": {
            "finalScore": 1.1,
            "priority": 3,
            "confidence": 0.9
          },
          "dimensions": {
            "value": {
              "score": 3.2,
              "breakdown": {
                "revenueImpact": 3,
                "timeToValue": 4,
                "strategicAlignment": 3
              },
              "reasoning": "Moderate revenue impact through marketing efficiency gains. Quick time to value with existing content workflows. Moderate strategic alignment with digital transformation goals."
            },
            "risk": {
              "score": 2.1,
              "breakdown": {
                "technicalComplexity": 2,
                "dataAvailability": 2,
                "resourceRequirements": 2
              },
              "reasoning": "Low technical complexity using existing LLM APIs. Good data availability from existing content. Minimal resource requirements for implementation."
            },
            "feasibility": {
              "score": 4.1,
              "breakdown": {
                "technicalFeasibility": 4,
                "organizationalReadiness": 4,
                "resourceAvailability": 4
              },
              "reasoning": "High technical feasibility with proven LLM tools. Good organizational readiness in marketing team. Resources readily available."
            }
          }
        },
        "priorityClassification": {
          "quadrant": "medium_value_low_risk",
          "reasoning": "Solid business value with straightforward implementation. Good candidate for learning and building AI capability.",
          "recommendation": "Approve for implementation. Good project for building organizational AI experience with limited risk exposure."
        }
      }
    },
    "currentScores": {
      "overall": {
        "finalScore": 1.1,
        "priority": 3,
        "confidence": 0.9,
        "lastUpdated": "2025-01-15T10:00:00Z",
        "basedOnEvaluation": "TEMPLATE-EVAL-002"
      }
    },
    "resources": {
      "teamSize": 2,
      "budget": {
        "development": 45000,
        "infrastructure": 6000,
        "annual": 12000,
        "currency": "USD"
      },
      "skills": [
        "prompt_engineering",
        "marketing_domain",
        "content_strategy",
        "llm_integration"
      ]
    },
    "tags": [
      "template",
      "calibration_example",
      "content_generation",
      "marketing",
      "priority_3",
      "low_risk",
      "medium_value"
    ]
  }
}
```

# [Example] AI Project Proposal: Marketing Copy Generation Tool

**Project Key**: TEMPLATE-002  
**Template Type**: Calibration Example  
**Category**: Content Generation  
**Target Classification**: Priority 3 (Medium Value / Low Risk)  
**Purpose**: Reference example for content generation project evaluations

---

## Executive Summary

Develop an AI-powered marketing copy generation tool that creates personalized email campaigns, social media posts, and product descriptions based on brand guidelines and customer segments. The system will integrate with existing marketing automation platforms to streamline content creation workflows and improve campaign consistency.

**Template Note**: This example demonstrates a typical Priority 3 project with moderate business value and low implementation risk, suitable for organizations building AI capabilities.

---

## Problem Definition

### Current Process
Marketing team manually creates content for email campaigns, social media, and product descriptions. Each campaign requires 8-12 hours of copywriting across multiple channels and customer segments. Brand consistency requires multiple review cycles with brand management.

### Specific Pain Points
- **Manual content creation**: 15-20 hours weekly spent on routine copy generation
- **Inconsistent messaging**: Different writers create varying brand voice and tone
- **Slow campaign launches**: Content creation bottleneck delays time-to-market by 2-3 days
- **Limited personalization**: Difficult to create personalized content at scale for different segments

### Quantified Current State
- **Time spent**: 20 hours/week across marketing team for content creation
- **Current costs**: $52,000 annually in copywriting effort
- **Campaign delay**: Average 3-day delay due to content creation bottleneck
- **Personalization coverage**: Only 20% of campaigns include personalized content

---

## Proposed AI Solution

### Solution Type
**Content Generation & Brand Consistency**

### AI Technology Approach
- **Large Language Model**: GPT-based content generation with brand-specific fine-tuning
- **Prompt Engineering**: Template-based prompts for different content types and channels
- **Brand Guidelines Integration**: Custom training on brand voice, tone, and messaging
- **Multi-channel Optimization**: Content adaptation for email, social, web, and print formats

### Core Capabilities
- Generate marketing copy for emails, social posts, and product descriptions
- Maintain consistent brand voice across all generated content
- Personalize content based on customer segment data
- A/B test content variations automatically
- Integration with existing marketing automation tools (HubSpot, Marketo)

---

## Expected Outcomes

### Success Metrics
- **Primary metric**: 70% reduction in manual copywriting time (20 hours to 6 hours weekly)
- **Quality metric**: 90% of generated content approved without major revisions
- **Consistency metric**: Brand voice compliance score >4.5/5 across all content
- **Speed metric**: Campaign launch time reduced by 2 days on average

### Quantified Benefits
- **Cost savings**: $36,400 annually in reduced manual copywriting effort
- **Time savings**: 14 hours/week freed for strategic marketing activities  
- **Efficiency gains**: 300% increase in personalized content production
- **Quality improvements**: Consistent brand voice across all channels
- **Revenue impact**: 15% improvement in email open rates due to personalization

---

## Technical Implementation

### Data Requirements
- **Brand guidelines**: Comprehensive brand voice and messaging documentation
- **Historical content**: 2 years of high-performing marketing content for training
- **Customer segments**: Detailed persona and demographic data
- **Performance data**: Content performance metrics for optimization

### Technical Integration
- **Marketing automation**: API integration with HubSpot/Marketo platforms
- **Content management**: Integration with existing content approval workflows
- **Brand management**: Connection to brand asset management system
- **Analytics**: Integration with campaign performance tracking tools

---

## Resource Requirements

### Team and Skills
- **Project manager**: 0.25 FTE for 6 months
- **Marketing technologist**: 0.5 FTE for implementation and training
- **Content strategist**: 0.5 FTE for brand guidelines and testing
- **Total team size**: 2-3 people part-time

### Budget Estimates
- **Development costs**: $45,000 (platform setup, integration, training)
- **Infrastructure costs**: $6,000 annually (LLM API costs, hosting)
- **Training costs**: $8,000 (user training and change management)
- **Maintenance costs**: $12,000 annually (updates, monitoring, optimization)
- **Total first-year cost**: $71,000

---

## Risk Assessment

### Technical Risks
- **Content quality**: Generated content may require significant editing (Mitigation: Extensive testing and human oversight)
- **Brand consistency**: AI may drift from brand guidelines (Mitigation: Regular model retraining and quality checks)
- **Integration complexity**: Marketing platform APIs may have limitations (Mitigation: Proof of concept with key integrations)

### Business Risks
- **User adoption**: Marketing team resistance to AI-generated content (Mitigation: Gradual rollout with extensive training)
- **Legal concerns**: Generated content may have compliance issues (Mitigation: Legal review workflows and approval gates)
- **ROI uncertainty**: Benefits may be lower than projected (Mitigation: Pilot program with measurable metrics)

---

## Template Usage Notes

### Calibration Purpose
This template demonstrates:
- **Priority 3 Classification**: Medium value proposition with manageable risk profile
- **Content Generation Category**: Typical characteristics of LLM-based content creation projects  
- **Resource Scaling**: Appropriate team size and budget for moderate complexity projects
- **Risk Profile**: Low technical risk with standard business change management challenges

### When to Reference This Template
- Content generation and transformation projects
- Marketing automation and personalization initiatives  
- Projects with $50-100K budgets and 6-month timelines
- Organizations building initial AI capabilities with low-risk projects

### Scoring Rationale
- **Value Score 3.2**: Solid business benefits but not transformational
- **Risk Score 2.1**: Low technical and implementation risk
- **Final Score 1.1**: Positive ROI with manageable execution challenges
- **Priority 3**: Good learning project with limited downside exposure

---

**Template Version**: 1.0.0  
**Last Calibration Review**: 2025-01-15  
**Next Review**: 2025-04-15  
**Usage**: Referenced in 23 evaluations, cloned 8 times