# CLAUDE.md

## 📋 Claude Development Process
This project uses the Claude Task Management System with BDD+TDD methodology for AI-assisted development.

### Key Documents
- `claude_tasks/QUICK_REFERENCE.md` - Quick commands and BDD+TDD workflow
- `claude_tasks/BDD_PROCESS.md` - Complete 9-step methodology
- `claude_tasks/PRINCIPLES_QUICK_CARD.md` - Core development principles
- `claude_tasks/active/ACTIVE_TASKS.md` - Current task tracking
- `claude_tasks/behaviors/` - BDD specifications and living documentation

### Development Workflow
SPECIFY → RED → GREEN → REFACTOR → VALIDATE

---


This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Development Process

This project follows the Claude Task Management System for AI-assisted development. The methodology emphasizes:
- Test-Driven Development (TDD)
- Structured task tracking
- Clear development principles
- Pair programming patterns with AI

### Key Documents
- `claude_tasks/QUICK_REFERENCE.md` - Quick commands and TDD workflow
- `claude_tasks/DEVELOPMENT_PROCESS.md` - Complete TDD methodology (7 steps)
- `claude_tasks/PRINCIPLES_QUICK_CARD.md` - The 7 core development principles
- `claude_tasks/PAIR_PROGRAMMING_WITH_CLAUDE.md` - Collaboration patterns
- `claude_tasks/active/ACTIVE_TASKS.md` - Current task tracking

## Core Development Principles

1. **Test Driven Development** - Write tests first, no code without tests
2. **Fail Fast & Root Cause** - Fix problems at their source, no workarounds
3. **Modular & Maintainable** - Single responsibility, decoupled components
4. **Reuse Before Build** - Check existing code and libraries first
5. **Open Source First** - Suggest alternatives before building new
6. **No Legacy Baggage** - Start clean, avoid technical debt
7. **Perfectionist Excellence** - Build best-of-breed solutions only

## Repository Overview

This is a **comprehensive AI Project Evaluation Framework** that provides enterprise-grade methodology for evaluating AI project proposals. The framework combines structured evaluation criteria, interactive web applications, and automated scoring systems to help organizations make informed decisions about AI initiatives.

### **Problem Solved**
Organizations struggle to evaluate AI projects consistently due to:
- Lack of standardized evaluation criteria for AI initiatives
- Subjective assessments leading to inconsistent decisions
- No systematic way to compare AI projects across different domains
- Difficulty in understanding LLM solution categories and implementation strategies
- Need for both technical and business stakeholders to collaborate on AI project assessment

### **Solution Provided**
A complete evaluation ecosystem including:

**🎯 Interactive Web Application** (`project_builder_app.html`)
- 3-tabbed interface: Proposal Builder, Evaluation Engine, Review & Export
- Sidebar project management with expandable evaluation summaries
- Real-time scoring using deterministic algorithms (no LLM required)
- Local storage persistence and export functionality
- Based on test dashboard framework with modern UI/UX

**📊 Evaluation Methodology**
- **6 weighted dimensions**: Technical Complexity (15%), Resource Requirements (15%), Implementation Risk (10%), Business Impact (25%), Scalability Potential (20%), Implementation Timeline (15%)
- **Relative scaling (1-5)** without specific dollar amounts or timeframes
- **Priority classification matrix**: Priority 1-4 based on risk/value analysis
- **Final score calculation**: (Value Score × 0.6) - (Risk Score × 0.4)

**🤖 Multiple Scoring Approaches**
- **LLM-based evaluation** via `/eval` command for comprehensive analysis
- **Rule-based scoring matrix** (`evaluation_rules_matrix.md`) for deterministic results
- **Questionnaire system** (`evaluation_questionnaire.md`) for structured interviews
- **Python calculator** (`scoring_calculator.py`) for programmatic evaluation
- **Web form** (`evaluation_form.html`) for standalone quick evaluation

**📋 LLM Solution Framework**
- **6 solution categories**: Content Generation, Classification & Analysis, Search & Retrieval, Data Extraction, Conversational Interfaces, Code & Technical Assistance
- **3 implementation strategies**: Direct Prompting (low risk), Formalized Assets (medium risk), Live Production (high risk)
- **Strategy-specific risk profiles** and resource requirements

**📝 Project Management Integration**
- **Structured proposal template** (`project_template.md`) covering all business aspects
- **Claude Code command integration** (`/prepare`, `/eval`, `/refresh`)
- **Automatic evaluation attachment** to project files for audit trails
- **TDD methodology** for framework development and testing

### **Key Innovation**
The framework uniquely provides **both LLM-powered and deterministic evaluation methods**, allowing organizations to choose their preferred approach while maintaining consistent scoring methodology. The web application enables collaborative evaluation between technical and business stakeholders without requiring AI expertise.

### **Target Users**
- **Enterprise AI teams** evaluating multiple AI initiatives
- **Business stakeholders** needing to understand AI project viability
- **Consultants** requiring structured AI assessment methodology
- **Organizations** seeking standardized AI project governance

## Project Structure

```
ai_project_eval/
├── project_builder_app.html           # 🎯 MAIN APPLICATION - 3-tabbed web interface
├── evaluation_form.html               # Standalone evaluation form
├── scoring_calculator.py              # Python-based deterministic scoring
├── evaluation_rules_matrix.md         # Rule-based scoring methodology
├── evaluation_questionnaire.md        # Structured interview questions
├── evaluation_criteria.md             # Core scoring weights and methodology
├── llm_solution_categories.md         # AI solution types and implementation strategies
├── project_template.md                # Structured proposal template
├── .claude/commands/                  # Command system integration
│   ├── prepare.md                     # Interactive proposal creation
│   ├── eval.md                        # LLM-powered evaluation
│   └── refresh.md                     # Development context refresh
├── claude_tasks/                      # TDD methodology and task management
│   ├── QUICK_REFERENCE.md            # TDD workflow and commands
│   ├── PRINCIPLES_QUICK_CARD.md      # 7 core development principles
│   ├── DEVELOPMENT_PROCESS.md        # Complete TDD methodology
│   ├── active/ACTIVE_TASKS.md        # Current task tracking
│   └── finished/                     # Completed task documentation
├── projects/                          # Sample projects and evaluations
│   └── 20250117_exotic_trades_mapping_pipeline.md  # Example evaluated project
├── test_dd_dashboard/                 # UI framework foundation
└── CLAUDE.md                         # This file - complete project context
```

### **File Purpose Summary**
- **project_builder_app.html**: Primary interactive application for creating and evaluating AI projects
- **scoring_calculator.py**: Non-LLM deterministic evaluation engine
- **evaluation_criteria.md**: Core methodology with weights and scoring scales
- **llm_solution_categories.md**: Framework for categorizing LLM solutions by type and implementation strategy
- **project_template.md**: Structured template for comprehensive AI project proposals
- **evaluation_rules_matrix.md**: Rule-based scoring without subjective interpretation
- **evaluation_questionnaire.md**: Structured questions for systematic evaluation
- **evaluation_form.html**: Standalone web form for quick project evaluation

## Common Development Commands

### Setup and Installation
```bash
# Clone the repository
git clone https://github.com/foolishimp/ai_project_eval.git
cd ai_project_eval

# No additional setup required - framework is ready to use
# Optional: Start test dashboard for testing
cd test_dd_dashboard && npm install && npm start
```

### Core Commands
```bash
# Interactive project creation (Claude Code command)
/prepare

# LLM-powered project evaluation (Claude Code command)
/eval path/to/project.md

# Refresh development context (Claude Code command)
/refresh

# Run the main web application
open project_builder_app.html

# Run standalone evaluation form
open evaluation_form.html

# Run Python calculator (example)
python scoring_calculator.py

# View active development tasks
cat claude_tasks/active/ACTIVE_TASKS.md
```

### Development Workflow
1. Check active tasks: `cat claude_tasks/active/ACTIVE_TASKS.md`
2. Write failing test (RED)
3. Write minimal code to pass (GREEN)
4. Refactor while keeping tests green (REFACTOR)
5. Document completed task in `claude_tasks/finished/`
6. Commit with descriptive message

## Working with this Codebase

### When Starting a Session
1. Review `claude_tasks/SESSION_STARTER.md`
2. Check current state with `git status`
3. Review active tasks
4. Run tests to ensure clean state

### Task Management
- New tasks go in `claude_tasks/active/ACTIVE_TASKS.md`
- Completed tasks move to `claude_tasks/finished/YYYYMMDD_HHMM_task_name.md`
- Follow the task template in `claude_tasks/TASK_TEMPLATE.md`

### Testing Strategy
- Unit tests for individual functions
- Integration tests for module interactions
- E2E tests for critical user paths
- Maintain >80% code coverage

## Project-Specific Guidelines

### Evaluation Framework Usage
- All evaluations use relative scaling (1-5) without specific dollar amounts or timeframes
- Organizations map scales to their own budget and timeline contexts
- Evaluations are automatically attached to project proposal files
- Priority classification follows the weighted matrix in `evaluation_criteria.md`

### Project Proposal Standards
- Use the template in `project_template.md` for consistency
- Include comprehensive business case with relative impact descriptions
- Address all evaluation dimensions: technical complexity, resource requirements, implementation risk, business impact, scalability, and timeline
- Provide realistic but relative estimates for all metrics

### Application Usage Patterns
- **Web Application**: Use `project_builder_app.html` for collaborative proposal creation and evaluation
- **Command System**: Use `/prepare` and `/eval` commands in Claude Code for LLM-assisted workflow
- **Standalone Tools**: Use `evaluation_form.html` or `scoring_calculator.py` for quick assessments
- **Documentation**: All evaluations automatically attach to project files for audit trails

### Evaluation Methodology Key Points
- **Relative scaling (1-5)**: No specific dollar amounts or timeframes to allow organizational customization
- **Weighted scoring**: Business impact (25%) and scalability (20%) have highest weights
- **Priority matrix**: Final score determines Priority 1-4 classification for decision making
- **Multiple approaches**: Choose between LLM-powered analysis or deterministic rule-based scoring
- **Risk/Value balance**: Final score = (Value × 0.6) - (Risk × 0.4) to emphasize value while penalizing risk

## Quick Start Guide

### **For First-Time Users**
1. **Run the main application**: `open project_builder_app.html`
2. **Create a new project**: Click "+ New" in the sidebar
3. **Fill out proposal**: Use the "Proposal" tab to describe your AI project
4. **Evaluate the project**: Use the "Evaluation" tab to score across 6 dimensions
5. **Review results**: Use the "Review" tab to see final scoring and priority classification
6. **Save and export**: Save project locally or export evaluation results

### **For Developers**
1. **Read methodology**: Review `evaluation_criteria.md` and `llm_solution_categories.md`
2. **Understand scoring**: Examine `scoring_calculator.py` for algorithmic implementation
3. **Follow TDD**: Use the methodology in `claude_tasks/DEVELOPMENT_PROCESS.md`
4. **Use commands**: Leverage `/prepare` and `/eval` commands in Claude Code

### **For Enterprise Usage**
1. **Customize scales**: Map the 1-5 relative scales to your organization's budget and timeline contexts
2. **Adapt categories**: Modify LLM solution categories to match your AI initiative types
3. **Integration**: Use the Python calculator or web form APIs for integration with existing systems
4. **Governance**: Use the priority matrix and evaluation attachment for audit trails

## Project Maturity

- **Status**: Production-ready evaluation framework with sample implementation
- **Testing**: Built using TDD methodology with comprehensive test coverage requirements
- **Documentation**: Complete methodology documentation and usage examples
- **GitHub**: Available at https://github.com/foolishimp/ai_project_eval
- **Example**: Includes fully evaluated "Exotic Trades Mapping Pipeline" project (Priority 2, Score: 0.92)

---

*This project uses the Claude Task Management System with TDD methodology. For detailed development processes, see the `claude_tasks/` directory.*