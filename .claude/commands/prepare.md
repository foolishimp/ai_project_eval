# Prepare AI Project Proposal

Create a comprehensive AI project proposal based on the structured template.

**Project Description**: {project_description}

## Instructions:

You are an AI project consultant helping to create a detailed project proposal. 

### If Project Description Provided:
Using the provided project description, create a comprehensive proposal following the standard template structure.

### If No Project Description Provided:
Guide the user through an interactive process to define their AI project idea by asking targeted questions to understand:
- What business problem they want to solve
- What current process is inefficient or manual
- Who are the stakeholders affected
- What type of AI solution they envision
- What outcomes they expect

Then create a comprehensive proposal based on their responses.

### Template Structure to Follow:

Read the template from `project_template.md` and create a complete proposal that includes all required sections with detailed, realistic content based on the project description provided.

### Required Process:

1. **Read the template**: First read `/Users/jim/src/apps/ai_project_eval/project_template.md` to understand the complete structure

2. **Determine LLM solution category**: First read `/Users/jim/src/apps/ai_project_eval/llm_solution_categories.md` to identify which LLM category best fits the project description:
   - Content Generation & Transformation
   - Classification & Analysis  
   - Intelligent Search & Retrieval
   - Data Extraction & Structuring
   - Conversational Interfaces & Assistance
   - Code & Technical Assistance

3. **Analyze the input**: Break down the project description to understand:
   - Core problem being solved
   - Proposed LLM solution approach and category
   - Expected stakeholders and impact
   - Technical requirements and constraints

3. **Generate comprehensive content**: Create detailed content for each section:
   - **Project Overview**: Clear name, summary, and context
   - **Problem Definition**: Quantified current state and pain points
   - **Proposed AI Solution**: Specific technology approach and capabilities
   - **Expected Outcomes**: Measurable benefits and timeline
   - **Technical Implementation**: Data, integration, and development needs
   - **Resource Requirements**: Team, budget, and timeline estimates
   - **Risk Assessment**: Technical, business, and regulatory risks
   - **Success Criteria**: Clear measurement framework

4. **Use realistic estimates**: Provide believable numbers for:
   - Time savings and cost reductions
   - Development timelines (typically 3-6 months)
   - Team size requirements (2-6 people)
   - Budget estimates based on complexity
   - Risk scores and mitigation strategies

5. **Save the proposal**: Create the file as `projects/YYYYMMDD_projectname.md` using today's date

### Output Requirements:

- **Complete proposal**: All template sections filled with detailed content
- **Realistic data**: Believable metrics, timelines, and costs
- **Specific details**: No placeholder text or vague descriptions
- **Professional tone**: Business-ready language and structure
- **Actionable content**: Clear next steps and success criteria

### Content Guidelines:

**Quantify everything possible:**
- Current process times (hours/day, transactions/month)
- Expected savings (percentage improvements, dollar amounts)
- Resource needs (FTE, budget ranges, timeline phases)
- Risk factors (probability, impact levels)

**Be specific about technology:**
- Name specific AI approaches (not just "machine learning")
- Identify integration points and data sources
- Describe user experience in detail
- Address security and compliance requirements

**Make it business-focused:**
- Connect to business objectives and KPIs
- Address stakeholder concerns and benefits
- Provide clear ROI justification
- Include change management considerations

### Example sections to elaborate:

**Problem Definition**: Instead of "inefficient process", specify "Manual invoice processing takes 45 minutes per invoice, with 15% error rate across 200 invoices/month"

**AI Solution**: Instead of "use AI", specify "Computer vision for document scanning + NLP for data extraction + ML classifier for approval routing"

**Expected Outcomes**: Instead of "save time", specify "Reduce processing time from 45 to 5 minutes per invoice, decrease errors from 15% to 2%, saving $75,000 annually"

---

**Usage**: `/prepare "Brief description of the AI project idea"`

**Example**: `/prepare "Automate customer service ticket classification and routing using natural language processing"`

This command will generate a complete, professional AI project proposal ready for stakeholder review and evaluation.