# Evaluation Questionnaire

## Non-LLM Scoring via Structured Questions

This questionnaire provides deterministic scoring based on specific yes/no and multiple choice responses.

### Technical Complexity Assessment

**Question 1**: What type of technology does this project primarily use?
- A) Existing APIs/standard libraries (Score: 1)
- B) Minor customization of existing tools (Score: 2)  
- C) Custom development with standard frameworks (Score: 3)
- D) Cutting-edge/specialized technology (Score: 4)
- E) Experimental/research-level technology (Score: 5)

**Question 2**: How many system integrations are required?
- A) 0-1 integrations (Score: 1)
- B) 2 integrations (Score: 2)
- C) 3-5 integrations (Score: 3)
- D) 6-10 integrations (Score: 4)
- E) 10+ integrations (Score: 5)

**Question 3**: What percentage of your team has relevant experience?
- A) 80-100% (Score: 1)
- B) 60-79% (Score: 2)
- C) 40-59% (Score: 3)
- D) 20-39% (Score: 4)
- E) 0-19% (Score: 5)

**Technical Complexity Score = Average of Q1, Q2, Q3**

### Resource Requirements Assessment

**Question 4**: How many team members are needed?
- A) 1-2 people (Score: 1)
- B) 3-4 people (Score: 2)
- C) 5-6 people (Score: 3)
- D) 7-10 people (Score: 4)
- E) 10+ people (Score: 5)

**Question 5**: Infrastructure requirements level?
- A) Use existing infrastructure (Score: 1)
- B) Minor additions to existing (Score: 2)
- C) Moderate new infrastructure (Score: 3)
- D) Significant infrastructure changes (Score: 4)
- E) Major infrastructure overhaul (Score: 5)

**Question 6**: Specialized expertise needed?
- A) Use current team skills (Score: 1)
- B) Minor training required (Score: 2)
- C) Some hiring/training needed (Score: 3)
- D) External expertise required (Score: 4)
- E) Multiple external specialists needed (Score: 5)

**Resource Requirements Score = Average of Q4, Q5, Q6**

### Implementation Risk Assessment

**Question 7**: Regulatory compliance requirements?
- A) No regulatory requirements (Score: 1)
- B) Minor compliance considerations (Score: 2)
- C) Some regulatory oversight (Score: 3)
- D) Significant compliance requirements (Score: 4)
- E) Heavy regulatory oversight (Score: 5)

**Question 8**: User adoption challenges?
- A) High acceptance expected (Score: 1)
- B) Good user buy-in anticipated (Score: 2)
- C) Moderate change management needed (Score: 3)
- D) Substantial resistance possible (Score: 4)
- E) High resistance expected (Score: 5)

**Question 9**: External dependencies?
- A) No external dependencies (Score: 1)
- B) Few external dependencies (Score: 2)
- C) Several external dependencies (Score: 3)
- D) Many external dependencies (Score: 4)
- E) Critical external dependencies (Score: 5)

**Implementation Risk Score = Average of Q7, Q8, Q9**

### Business Impact Assessment

**Question 10**: Scale of operational improvement?
- A) Minimal efficiency gains (Score: 1)
- B) Modest productivity improvements (Score: 2)
- C) Noticeable operational improvements (Score: 3)
- D) Significant operational transformation (Score: 4)
- E) Revolutionary business change (Score: 5)

**Question 11**: Scope of impact?
- A) Single team/function (Score: 1)
- B) Department-level (Score: 2)
- C) Multi-department (Score: 3)
- D) Organization-wide (Score: 4)
- E) Industry-level (Score: 5)

**Question 12**: Competitive advantage level?
- A) No competitive differentiation (Score: 1)
- B) Minor competitive advantage (Score: 2)
- C) Meaningful competitive advantage (Score: 3)
- D) Major competitive advantage (Score: 4)
- E) Market leadership potential (Score: 5)

**Business Impact Score = Average of Q10, Q11, Q12**

### Scalability Potential Assessment

**Question 13**: Reusability across use cases?
- A) Single, specific use case only (Score: 1)
- B) Few similar use cases (Score: 2)
- C) Multiple related use cases (Score: 3)
- D) Many cross-functional uses (Score: 4)
- E) Platform/ecosystem potential (Score: 5)

**Question 14**: Extension possibilities?
- A) Difficult to extend (Score: 1)
- B) Minor extension possible (Score: 2)
- C) Moderate extension capabilities (Score: 3)
- D) High extension capabilities (Score: 4)
- E) Exponential scaling opportunities (Score: 5)

**Question 15**: External monetization potential?
- A) No external value (Score: 1)
- B) Limited external interest (Score: 2)
- C) Some external applications (Score: 3)
- D) Good external market potential (Score: 4)
- E) High external monetization potential (Score: 5)

**Scalability Potential Score = Average of Q13, Q14, Q15**

### Implementation Timeline Assessment

**Question 16**: Development cycle expectations?
- A) Immediate implementation possible (Score: 5)
- B) Rapid development cycle (Score: 4)
- C) Standard development cycle (Score: 3)
- D) Long development cycle (Score: 2)
- E) Extended development cycle (Score: 1)

**Question 17**: Deployment complexity?
- A) Instant deployment (Score: 5)
- B) Quick deployment options (Score: 4)
- C) Phased implementation (Score: 3)
- D) Gradual rollout required (Score: 2)
- E) Complex deployment requirements (Score: 1)

**Question 18**: Validation requirements?
- A) No validation barriers (Score: 5)
- B) Minimal validation needed (Score: 4)
- C) Normal validation requirements (Score: 3)
- D) Standard validation needs (Score: 2)
- E) Long validation periods (Score: 1)

**Implementation Timeline Score = Average of Q16, Q17, Q18**

## Final Calculation

1. **Calculate each dimension score** using the averages above
2. **Apply weights** from evaluation_criteria.md:
   - Technical Complexity: 15%
   - Resource Requirements: 15%
   - Implementation Risk: 10%
   - Business Impact: 25%
   - Scalability Potential: 20%
   - Implementation Timeline: 15%

3. **Calculate Risk Score** = (Technical × 0.375) + (Resource × 0.375) + (Implementation Risk × 0.25)
4. **Calculate Value Score** = (Business × 0.417) + (Scalability × 0.333) + (Timeline × 0.25)
5. **Final Score** = (Value × 0.6) - (Risk × 0.4)

This provides completely deterministic scoring without any LLM interpretation.