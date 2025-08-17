# AI Project Evaluation

Conduct a comprehensive evaluation of an AI project proposal using the structured evaluation framework.

**Project Proposal**: {proposal_text}

## Instructions:

You are an AI project evaluation expert. Analyze the provided proposal using the standardized evaluation criteria and provide a comprehensive assessment with scoring and recommendations.

### Evaluation Framework

**Evaluation Framework (Based on evaluation_criteria.md):**

First read `/Users/jim/src/apps/ai_project_eval/evaluation_criteria.md` to understand the complete scoring methodology and weightings.

Also read `/Users/jim/src/apps/ai_project_eval/llm_solution_categories.md` to identify which LLM solution category applies and understand category-specific risk/value factors.

**Risk Assessment (Lower scores = Lower risk, Weight = 40%):**
- **Technical Complexity (15%)**: Data quality, integration difficulty, expertise required
- **Resource Requirements (15%)**: Relative timeline, budget, team size requirements  
- **Implementation Risk (10%)**: Compliance, security, adoption, dependencies

**Value Assessment (Higher scores = Higher value, Weight = 60%):**
- **Business Impact (25%)**: Efficiency gains, competitive advantage, operational improvement
- **Scalability Potential (20%)**: Cross-department reach, growth, reusability, platform effects
- **Implementation Timeline (15%)**: Relative time to value, deployment speed, quick wins availability

**Note**: All evaluations use relative scaling (1-5) without specific dollar amounts or timeframes. Organizations can map these scales to their own budget and timeline contexts.

### Required Output Format:

## Executive Summary
[2-3 sentence overview of the proposal and recommendation]

## LLM Solution Classification
**Implementation Strategy**: [Strategy 1: Direct Prompting / Strategy 2: Formalized Assets / Strategy 3: Live Production]
**Solution Category**: [Content Generation/Classification/Search/Data Extraction/Conversational/Code Assistance]
**Strategy Rationale**: [Why this implementation strategy fits]
**Category Rationale**: [Why this category fits the proposed solution]

## Evaluation Scores

| Dimension | Weight | Score (1-5) | Weighted Score | Rationale |
|-----------|--------|-------------|----------------|-----------|
| **Technical Complexity** | 15% | [X] | [X × 0.15] | [Brief justification] |
| **Resource Requirements** | 15% | [X] | [X × 0.15] | [Brief justification] |
| **Implementation Risk** | 10% | [X] | [X × 0.10] | [Brief justification] |
| **Business Impact** | 25% | [X] | [X × 0.25] | [Brief justification] |
| **Scalability Potential** | 20% | [X] | [X × 0.20] | [Brief justification] |
| **Implementation Timeline** | 15% | [X] | [X × 0.15] | [Brief justification] |

**Risk Score**: [Sum of first 3 weighted scores]
**Value Score**: [Sum of last 3 weighted scores]  
**Final Score**: [(Value × 0.6) - (Risk × 0.4)]

## Detailed Risk Assessment
### Technical Complexity: [Score 1-5]
**Rationale**: [Detailed explanation with specific factors]

### Resource Requirements: [Score 1-5]
**Rationale**: [Detailed explanation with specific factors]

### Implementation Risk: [Score 1-5] 
**Rationale**: [Detailed explanation with specific factors]

## Detailed Value Assessment
### Business Impact: [Score 1-5]
**Rationale**: [Detailed explanation with specific factors]

### Scalability Potential: [Score 1-5]
**Rationale**: [Detailed explanation with specific factors]

### Implementation Timeline: [Score 1-5]
**Rationale**: [Detailed explanation with specific factors]

## Priority Classification
**Priority Matrix Position**: [High/Medium/Low Value] + [High/Medium/Low Risk]

**Priority Level**: 
- Priority 1 (High Value + Low Risk): Immediate implementation
- Priority 2 (High Value + Medium/High Risk): Detailed planning required  
- Priority 3 (Medium Value + Low Risk): Quick wins consideration
- Priority 4 (All others): Defer or reject

**Recommendation**: [Specific action recommendation]

## Detailed Analysis
### Key Strengths
- [List 3-5 major advantages and opportunities]

### Primary Concerns  
- [List 3-5 key risks and challenges]

### Critical Success Factors
- [List 3-5 requirements for success]

### Mitigation Strategies
- [Specific recommendations for addressing major risks]

## Next Steps
### Immediate Actions (if Priority 1-2)
1. [Specific next step]
2. [Specific next step]
3. [Specific next step]

### Required Resources
- **Team**: [Roles and skills needed]
- **Timeline**: [Estimated phases and duration]
- **Budget**: [High-level cost estimates]
- **Infrastructure**: [Technical requirements]

### Success Metrics
- **Short-term** (1-3 months): [Measurable outcomes]
- **Medium-term** (3-12 months): [Measurable outcomes]  
- **Long-term** (12+ months): [Measurable outcomes]

## Final Recommendation
[Comprehensive 3-4 sentence recommendation with clear rationale]

---

### Post-Evaluation Process

After completing the evaluation:

1. **Append evaluation to project file**: Automatically append the complete evaluation results to the original project proposal file with a clear "## AI Project Evaluation" section separator.

2. **Update project status**: Add evaluation metadata to the project file header:
   - **Evaluation Date**: [YYYY-MM-DD]
   - **Final Score**: [X.XX]
   - **Priority Level**: [1-4]
   - **Recommendation**: [Approve/Conditional/Defer/Reject]

3. **Create evaluation summary**: Generate a one-page executive summary for stakeholder presentation.

4. **Archive in evaluation history**: Track evaluation decisions for portfolio analysis and learning.

This ensures all evaluation results are permanently attached to the project proposal for future reference and stakeholder review.

---

**Usage**: `/eval "Paste your AI project proposal here"` or `/eval path/to/project.md`

This command provides systematic evaluation following enterprise-grade assessment standards for AI project prioritization and automatically attaches results to the project file.