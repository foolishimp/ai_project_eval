# Domain Model Usage Examples

## Loading Projects from Markdown Files

```javascript
// Load project from markdown file with JSON frontmatter
const fs = require('fs');
const { Project, ProjectRepository, EvaluationService } = require('./domain_model');

function loadProjectFromMarkdown(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract JSON metadata and markdown content
    const metadataMatch = content.match(/```json\n([\s\S]*?)\n```/);
    if (!metadataMatch) {
        throw new Error('No JSON metadata found in project file');
    }
    
    const metadata = JSON.parse(metadataMatch[1]);
    const markdownContent = content.replace(/```json[\s\S]*?```\n/, '');
    
    // Create project with both metadata and content
    const projectData = {
        ...metadata,
        markdownContent: markdownContent
    };
    
    return new Project(projectData);
}

// Example usage
const project = loadProjectFromMarkdown('./projects/20250117_exotic_trades_pipeline_v2.md');
console.log(project.name); // "Intelligent Exotic Trades Mapping Pipeline"
console.log(project.key);  // "ETP-2025-001"
console.log(project.currentScores.overall.priority); // 2
```

## Working with Templates

```javascript
const projectRepo = new ProjectRepository();

// Load template
const template = loadProjectFromMarkdown('./projects/template_marketing_copy_generation.md');

// Verify it's a template
console.log(template.isTemplate); // true
console.log(template.templateType); // "calibration_example"

// Create new project from template
const newProject = template.createFromTemplate();
console.log(newProject.isTemplate); // false
console.log(newProject.id); // Generated ID like "20250118_1430_marketing_copy_tool"

// Save both
projectRepo.save(template);
projectRepo.save(newProject);

// Query templates separately
const templates = projectRepo.findTemplates();
const realProjects = projectRepo.findAll();

console.log(`Templates: ${templates.length}, Real Projects: ${realProjects.length}`);
```

## Evaluation Management

```javascript
const evaluationService = new EvaluationService();

// Create new evaluation for a project
const evaluation = evaluationService.createEvaluation(
    project.id,
    'quick_assessment',
    {
        name: 'John Smith',
        email: 'john.smith@company.com',
        type: 'human',
        role: 'data_scientist'
    }
);

// Collect criteria scores
const criteriaScores = {
    revenue_impact: 4,
    time_to_value: 3,
    strategic_alignment: 5,
    technical_complexity: 4,
    data_availability: 3,
    resource_requirements: 3
};

// Calculate scores
const scores = evaluationService.calculateScores(criteriaScores, 'quick_assessment');

console.log(scores.overall.finalScore); // 0.67
console.log(scores.overall.priority);   // 2
console.log(scores.getPriorityLabel()); // "High Value / High Risk"

// Complete the evaluation
evaluation.complete(scores.toJSON(), [
    'Proceed with detailed technical evaluation',
    'Validate data availability assumptions'
]);

// Add to project
project.addEvaluation(evaluation);

// Save updated project
projectRepo.save(project);
```

## Querying Projects

```javascript
// Find projects by various criteria
const highPriorityProjects = projectRepo.findByPriority(1);
const riskManagementProjects = projectRepo.findByDepartment('risk_management');
const contentGenerationProjects = projectRepo.findByCategory('content_generation');

// Complex queries
const candidateProjects = projectRepo.query({
    status: 'evaluated',
    minScore: 0.5,
    priority: [1, 2], // High priority projects
    department: 'technology'
});

// Filter templates for calibration
const calibrationTemplates = projectRepo.findTemplates()
    .filter(t => t.templateType === 'calibration_example')
    .filter(t => t.classification.category === 'data_extraction');

console.log(`Found ${calibrationTemplates.length} calibration examples for data extraction`);
```

## Project Lifecycle Management

```javascript
// Check if project can be edited
const editCheck = project.canEdit();
if (editCheck.allowed) {
    // Update project properties
    project.name = 'Updated Project Name';
    project.status = 'under_evaluation';
    
    // Add stakeholder
    project.business.stakeholders.push(new Stakeholder({
        name: 'New Stakeholder',
        email: 'stakeholder@company.com',
        role: 'reviewer',
        impact: 'medium'
    }));
    
    projectRepo.save(project);
} else {
    console.log(`Cannot edit: ${editCheck.reason}`);
}

// Track evaluation history
const evaluationHistory = project.getEvaluationHistory();
console.log(`Project has ${evaluationHistory.length} evaluations`);

evaluationHistory.forEach(eval => {
    console.log(`${eval.type} by ${eval.evaluator.name} on ${eval.startedAt.toDateString()}`);
    if (eval.scores) {
        console.log(`  Score: ${eval.scores.overall.finalScore} (Priority ${eval.scores.overall.priority})`);
    }
});
```

## Template Validation and Calibration

```javascript
// Validate evaluation against template calibration data
function validateAgainstCalibration(project, evaluation) {
    if (!project.isTemplate || !project.calibrationData) {
        return { valid: true, message: 'No calibration data' };
    }
    
    const calibration = project.calibrationData;
    const actual = evaluation.scores.overall;
    
    const scoreVariance = Math.abs(calibration.targetFinalScore - actual.finalScore);
    const priorityMatch = calibration.targetPriority === actual.priority;
    
    return {
        valid: scoreVariance <= 0.5 && priorityMatch,
        scoreVariance: scoreVariance,
        priorityMatch: priorityMatch,
        message: scoreVariance > 0.5 ? 
            `Score variance ${scoreVariance.toFixed(2)} exceeds threshold` :
            !priorityMatch ?
            `Priority mismatch: expected ${calibration.targetPriority}, got ${actual.priority}` :
            'Evaluation matches calibration data'
    };
}

// Test evaluation against template
const template = projectRepo.findTemplates()
    .find(t => t.templateType === 'calibration_example');

if (template && template.evaluations.length > 0) {
    const templateEvaluation = template.evaluations[0];
    const validation = validateAgainstCalibration(template, templateEvaluation);
    
    console.log(`Calibration validation: ${validation.message}`);
    console.log(`Valid: ${validation.valid}`);
}
```

## Advanced Querying and Analytics

```javascript
// Portfolio analytics
function generatePortfolioAnalytics(projects) {
    const analytics = {
        totalProjects: projects.length,
        byPriority: {},
        byDepartment: {},
        byCategory: {},
        scoreDistribution: {
            high: 0,    // > 1.0
            medium: 0,  // 0.0 to 1.0  
            low: 0,     // < 0.0
            unscored: 0
        },
        averageScore: 0,
        riskProfile: {
            highValue: 0,
            lowRisk: 0,
            balanced: 0
        }
    };
    
    let totalScore = 0;
    let scoredProjects = 0;
    
    projects.forEach(project => {
        // Priority distribution
        if (project.currentScores?.overall.priority) {
            const priority = project.currentScores.overall.priority;
            analytics.byPriority[priority] = (analytics.byPriority[priority] || 0) + 1;
        }
        
        // Department distribution
        const dept = project.business.department;
        analytics.byDepartment[dept] = (analytics.byDepartment[dept] || 0) + 1;
        
        // Category distribution
        const category = project.classification.category;
        analytics.byCategory[category] = (analytics.byCategory[category] || 0) + 1;
        
        // Score distribution
        if (project.currentScores?.overall.finalScore !== undefined) {
            const score = project.currentScores.overall.finalScore;
            totalScore += score;
            scoredProjects++;
            
            if (score > 1.0) {
                analytics.scoreDistribution.high++;
            } else if (score >= 0.0) {
                analytics.scoreDistribution.medium++;
            } else {
                analytics.scoreDistribution.low++;
            }
            
            // Risk profile analysis
            const valueScore = project.currentScores.dimensions?.value?.score || 0;
            const riskScore = project.currentScores.dimensions?.risk?.score || 0;
            
            if (valueScore >= 3.5) analytics.riskProfile.highValue++;
            if (riskScore <= 2.5) analytics.riskProfile.lowRisk++;
            if (valueScore >= 3.0 && riskScore <= 3.0) analytics.riskProfile.balanced++;
            
        } else {
            analytics.scoreDistribution.unscored++;
        }
    });
    
    analytics.averageScore = scoredProjects > 0 ? 
        Number((totalScore / scoredProjects).toFixed(2)) : 0;
    
    return analytics;
}

// Usage
const allProjects = projectRepo.findAll();
const analytics = generatePortfolioAnalytics(allProjects);

console.log('Portfolio Analytics:');
console.log(`Total Projects: ${analytics.totalProjects}`);
console.log(`Average Score: ${analytics.averageScore}`);
console.log('Priority Distribution:', analytics.byPriority);
console.log('Score Distribution:', analytics.scoreDistribution);
```

## Integration with Existing System

```javascript
// Migration helper to convert existing project data
function migrateExistingProject(oldProjectData) {
    const newProjectData = {
        metadata: {
            schema: 'ai-project-v1.0',
            project: {
                id: oldProjectData.id || generateId(),
                key: null, // Will be assigned
                name: oldProjectData.name || 'Untitled Project',
                isTemplate: oldProjectData.name?.startsWith('[Example]') || false,
                status: 'draft',
                version: '1.0.0',
                createdAt: oldProjectData.date || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            business: {
                submitter: {
                    name: oldProjectData.submitter || 'Unknown',
                    role: 'submitter'
                },
                department: oldProjectData.department || 'unknown',
                stakeholders: []
            },
            classification: {
                category: oldProjectData.category || 'unknown',
                strategy: oldProjectData.strategy || 'unknown',
                complexity: 'medium'
            },
            currentScores: oldProjectData.finalScore ? {
                overall: {
                    finalScore: oldProjectData.finalScore,
                    priority: oldProjectData.priority || 3,
                    confidence: 0.7
                }
            } : null,
            resources: {
                teamSize: 0,
                budget: {},
                skills: []
            },
            tags: []
        },
        markdownContent: oldProjectData.description || ''
    };
    
    return new Project(newProjectData);
}

// Batch migration
function migrateAllProjects(oldProjects) {
    const repository = new ProjectRepository();
    
    oldProjects.forEach(oldProject => {
        try {
            const newProject = migrateExistingProject(oldProject);
            repository.save(newProject);
            console.log(`Migrated: ${newProject.name}`);
        } catch (error) {
            console.error(`Failed to migrate project ${oldProject.name}:`, error.message);
        }
    });
    
    return repository;
}
```

This domain model provides:

✅ **Strong Type Safety**: Proper validation and error handling  
✅ **Template Management**: Clear separation and protection of examples  
✅ **Evaluation History**: Complete audit trail of all evaluations  
✅ **Flexible Querying**: Rich query capabilities for analytics  
✅ **Business Logic**: Domain rules embedded in the entities  
✅ **Migration Support**: Easy conversion from existing data structures  
✅ **JSON + Markdown**: Best of both worlds for data and documentation