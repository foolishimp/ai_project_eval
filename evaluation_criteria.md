# AI Project Evaluation Criteria and Weightings

## Evaluation Dimensions Matrix

| Dimension | Weight | Criteria | Score (1-5) | Weighted Score | Notes |
|-----------|--------|----------|-------------|----------------|-------|
| **LLM SOLUTION TYPE** | **-** | **Category**: [Content Generation/Classification/Search/Data Extraction/Conversational/Code Assistance] | | | |
| **RISK ASSESSMENT** | **40%** | | | | |
| Technical Complexity | 15% | Data quality, integration difficulty, expertise required, LLM accuracy needs | | | |
| Resource Requirements | 15% | Time, cost, infrastructure, maintenance burden | | | |
| Implementation Risk | 10% | Compliance, security, adoption, dependencies, human-in-loop requirements | | | |
| **VALUE ASSESSMENT** | **60%** | | | | |
| Business Impact | 25% | Cost reduction, revenue, efficiency, strategic advantage | | | |
| Scalability Potential | 20% | Cross-department reach, growth, reusability, platform effects | | | |
| Implementation Timeline | 15% | Time to value, deployment speed, quick wins availability | | | |

## Scoring Guidelines

### Risk Assessment (Lower scores = Lower risk = Better)

**Technical Complexity (1-5 scale)**
- **1 (Very Low)**: Simple integration, clean data, standard technology
- **2 (Low)**: Minor technical challenges, mostly standard approaches
- **3 (Medium)**: Some complexity, requires specialized skills
- **4 (High)**: Significant technical challenges, cutting-edge technology
- **5 (Very High)**: Experimental technology, major integration challenges

**Resource Requirements (1-5 scale)**
- **1 (Very Low)**: Minimal timeline, minimal budget, small team
- **2 (Low)**: Short timeline, low budget, small team
- **3 (Medium)**: Moderate timeline, moderate budget, medium team
- **4 (High)**: Extended timeline, significant budget, large team
- **5 (Very High)**: Long timeline, major budget, very large team

**Implementation Risk (1-5 scale)**
- **1 (Very Low)**: No compliance issues, high user acceptance expected
- **2 (Low)**: Minor compliance considerations, good user buy-in
- **3 (Medium)**: Some regulatory concerns, moderate change management
- **4 (High)**: Significant compliance/security challenges
- **5 (Very High)**: Major regulatory hurdles, high resistance expected

### Value Assessment (Higher scores = Higher value = Better)

**Business Impact (1-5 scale)**
- **1 (Very Low)**: Minimal efficiency gains, limited business benefit
- **2 (Low)**: Modest improvements, localized benefits
- **3 (Medium)**: Noticeable efficiency gains, meaningful business impact
- **4 (High)**: Significant competitive advantage, major operational improvement
- **5 (Very High)**: Transformational impact, strategic business advantage

**Scalability Potential (1-5 scale)**
- **1 (Very Low)**: Single use case, limited reusability
- **2 (Low)**: Few similar applications, department-specific
- **3 (Medium)**: Multiple department applications, some growth potential
- **4 (High)**: Cross-enterprise applications, significant scaling opportunity
- **5 (Very High)**: Platform potential, ecosystem effects, exponential scaling

**Implementation Timeline (1-5 scale)**
- **1 (Very Low)**: Extended time to value, complex deployment
- **2 (Low)**: Long time to value, gradual rollout
- **3 (Medium)**: Moderate time to value, phased implementation
- **4 (High)**: Relatively quick time to value, some quick wins
- **5 (Very High)**: Rapid time to value, immediate quick wins

## Priority Classification Matrix

| Value Score | Risk Score | Priority | Action |
|-------------|------------|----------|--------|
| 4.0-5.0 | 1.0-2.5 | **Priority 1** | Immediate implementation |
| 4.0-5.0 | 2.6-3.5 | **Priority 2** | Detailed planning required |
| 4.0-5.0 | 3.6-5.0 | **Priority 2** | Risk mitigation planning |
| 3.0-3.9 | 1.0-2.5 | **Priority 3** | Quick wins consideration |
| 3.0-3.9 | 2.6-5.0 | **Priority 4** | Defer pending improvements |
| 1.0-2.9 | Any | **Priority 4** | Reject or major redesign |

## Calculation Method

### Individual Dimension Scores
Each dimension scored 1-5, then weighted:

**Risk Score** = (Technical Complexity × 0.375) + (Resource Requirements × 0.375) + (Implementation Risk × 0.25)

**Value Score** = (Business Impact × 0.417) + (Scalability Potential × 0.333) + (Implementation Timeline × 0.25)

### Overall Project Score
**Final Score** = (Value Score × 0.6) - (Risk Score × 0.4)

*Range: -2.0 (worst) to +3.0 (best)*

## Decision Thresholds

| Final Score | Recommendation |
|-------------|----------------|
| 2.0 - 3.0 | **Immediate Approval** - Fast track implementation |
| 1.0 - 1.9 | **Approved** - Standard implementation process |
| 0.0 - 0.9 | **Conditional** - Address key risks before proceeding |
| -0.5 - -0.1 | **Defer** - Needs significant improvement |
| < -0.5 | **Reject** - Not viable in current form |

## Usage in Project Proposals

Copy this table into each project proposal and fill in scores during evaluation:

```markdown
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
**Priority Classification**: [Priority 1-4]
**Recommendation**: [Action based on score]
```