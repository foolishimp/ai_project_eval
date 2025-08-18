/**
 * AI Project Evaluation System - Domain Model Implementation
 * 
 * This module defines the core domain model with proper validation,
 * relationships, and business logic for projects and evaluations.
 */

// ============================================================================
// CORE DOMAIN ENTITIES
// ============================================================================

class Project {
    constructor(data) {
        this.validateSchema(data);
        
        // Core Identity
        this.id = data.metadata.project.id;
        this.key = data.metadata.project.key;
        this.name = data.metadata.project.name;
        this.status = data.metadata.project.status || 'draft';
        this.version = data.metadata.project.version || '1.0.0';
        
        // Template Management
        this.isTemplate = data.metadata.project.isTemplate || false;
        this.templateType = data.metadata.project.templateType;
        this.protectionLevel = data.metadata.project.protectionLevel;
        this.calibrationData = data.metadata.project.calibrationData;
        
        // Business Context
        this.business = new BusinessContext(data.metadata.business);
        this.classification = new ProjectClassification(data.metadata.classification);
        
        // Evaluations and Scoring
        this.evaluations = this.parseEvaluations(data.metadata.evaluations);
        this.currentScores = this.parseCurrentScores(data.metadata.currentScores);
        
        // Resources and Timeline
        this.resources = new ResourceRequirements(data.metadata.resources);
        this.timeline = new ProjectTimeline(data.metadata.timeline);
        
        // Metadata
        this.createdAt = new Date(data.metadata.project.createdAt);
        this.updatedAt = new Date(data.metadata.project.updatedAt);
        this.tags = data.metadata.tags || [];
        this.auditTrail = data.metadata.auditTrail;
        
        // Document reference
        this.documentPath = data.metadata.project.documentPath;
        this.markdownContent = data.markdownContent;
    }

    validateSchema(data) {
        if (!data.metadata || !data.metadata.project) {
            throw new Error('Invalid project structure: missing metadata.project');
        }
        
        const required = ['id', 'name'];
        for (const field of required) {
            if (!data.metadata.project[field]) {
                throw new Error(`Missing required field: project.${field}`);
            }
        }
        
        // Validate schema version
        const supportedVersions = ['ai-project-v1.0'];
        if (!supportedVersions.includes(data.metadata.schema)) {
            throw new Error(`Unsupported schema version: ${data.metadata.schema}`);
        }
    }

    // Project State Management
    canEdit() {
        if (this.isTemplate && this.protectionLevel === 'read_only') {
            return { allowed: false, reason: 'Template is read-only' };
        }
        return { allowed: true };
    }

    canDelete() {
        if (this.isTemplate) {
            return { allowed: false, reason: 'Templates cannot be deleted' };
        }
        if (this.status === 'in_progress' || this.status === 'approved') {
            return { allowed: false, reason: `Cannot delete project with status: ${this.status}` };
        }
        return { allowed: true };
    }

    // Evaluation Management
    addEvaluation(evaluation) {
        if (!(evaluation instanceof Evaluation)) {
            throw new Error('Invalid evaluation object');
        }
        
        this.evaluations.push(evaluation);
        this.updateCurrentScores(evaluation);
        this.updatedAt = new Date();
        
        return this;
    }

    getCurrentEvaluation() {
        return this.evaluations
            .filter(e => e.status === 'completed')
            .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0];
    }

    getEvaluationHistory() {
        return this.evaluations
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Scoring and Priority
    updateCurrentScores(evaluation) {
        if (evaluation && evaluation.scores) {
            this.currentScores = {
                overall: evaluation.scores.overall,
                trending: this.calculateTrending(evaluation),
                lastUpdated: new Date(),
                basedOnEvaluation: evaluation.id
            };
        }
    }

    calculateTrending(newEvaluation) {
        const previous = this.getCurrentEvaluation();
        if (!previous) {
            return { trend: 'new', scoreChange: 0, priorityChange: 0 };
        }

        const scoreChange = newEvaluation.scores.overall.finalScore - previous.scores.overall.finalScore;
        const priorityChange = newEvaluation.scores.overall.priority - previous.scores.overall.priority;

        return {
            scoreChange: Number(scoreChange.toFixed(2)),
            priorityChange,
            confidenceChange: newEvaluation.scores.overall.confidence - previous.scores.overall.confidence,
            trend: scoreChange > 0.1 ? 'improving' : scoreChange < -0.1 ? 'declining' : 'stable'
        };
    }

    // Template Operations
    createFromTemplate() {
        if (!this.isTemplate) {
            throw new Error('Cannot create from non-template project');
        }

        const newProjectData = {
            ...this.toJSON(),
            metadata: {
                ...this.toJSON().metadata,
                project: {
                    ...this.toJSON().metadata.project,
                    id: this.generateProjectId(),
                    key: null, // Will be assigned by system
                    isTemplate: false,
                    templateType: undefined,
                    protectionLevel: undefined,
                    calibrationData: undefined,
                    status: 'draft',
                    version: '1.0.0',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                evaluations: undefined, // Clear evaluation history
                currentScores: undefined // Clear existing scores
            }
        };

        return new Project(newProjectData);
    }

    generateProjectId() {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const time = new Date().toTimeString().slice(0, 5).replace(':', '');
        const nameSlug = this.name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 30);
        return `${date}_${time}_${nameSlug}`;
    }

    // Serialization
    toJSON() {
        return {
            metadata: {
                schema: 'ai-project-v1.0',
                project: {
                    id: this.id,
                    key: this.key,
                    name: this.name,
                    isTemplate: this.isTemplate,
                    templateType: this.templateType,
                    protectionLevel: this.protectionLevel,
                    calibrationData: this.calibrationData,
                    status: this.status,
                    version: this.version,
                    createdAt: this.createdAt.toISOString(),
                    updatedAt: this.updatedAt.toISOString(),
                    documentPath: this.documentPath
                },
                business: this.business.toJSON(),
                classification: this.classification.toJSON(),
                evaluations: this.serializeEvaluations(),
                currentScores: this.currentScores,
                resources: this.resources.toJSON(),
                timeline: this.timeline.toJSON(),
                tags: this.tags,
                auditTrail: this.auditTrail
            },
            markdownContent: this.markdownContent
        };
    }

    parseEvaluations(evaluationsData) {
        if (!evaluationsData) return [];
        
        const evaluations = [];
        
        // Current evaluation
        if (evaluationsData.current) {
            evaluations.push(new Evaluation(evaluationsData.current));
        }
        
        // Historical evaluations
        if (evaluationsData.history) {
            evaluations.push(...evaluationsData.history.map(e => new Evaluation(e)));
        }
        
        return evaluations;
    }

    parseCurrentScores(scoresData) {
        if (!scoresData) return null;
        return scoresData;
    }

    serializeEvaluations() {
        const current = this.evaluations.find(e => e.status === 'in_progress' || e.status === 'current');
        const history = this.evaluations.filter(e => e.status === 'completed');
        
        return {
            current: current ? current.toJSON() : undefined,
            history: history.map(e => e.toJSON())
        };
    }
}

// ============================================================================
// EVALUATION ENTITY
// ============================================================================

class Evaluation {
    constructor(data) {
        this.id = data.evaluationId;
        this.type = data.type;
        this.status = data.status || 'draft';
        this.startedAt = data.startedAt ? new Date(data.startedAt) : new Date();
        this.completedAt = data.completedAt ? new Date(data.completedAt) : null;
        
        this.evaluator = new Evaluator(data.evaluator);
        this.scores = data.scores ? new ScoreSet(data.scores) : null;
        this.recommendations = data.recommendations || [];
        this.riskAssessment = data.riskAssessment;
        this.additionalNotes = data.additionalNotes;
        this.attachments = data.attachments || [];
    }

    complete(scores, recommendations = []) {
        this.status = 'completed';
        this.completedAt = new Date();
        this.scores = new ScoreSet(scores);
        this.recommendations = recommendations;
        
        return this;
    }

    toJSON() {
        return {
            evaluationId: this.id,
            type: this.type,
            status: this.status,
            startedAt: this.startedAt.toISOString(),
            completedAt: this.completedAt ? this.completedAt.toISOString() : null,
            evaluator: this.evaluator.toJSON(),
            scores: this.scores ? this.scores.toJSON() : null,
            recommendations: this.recommendations,
            riskAssessment: this.riskAssessment,
            additionalNotes: this.additionalNotes,
            attachments: this.attachments
        };
    }
}

// ============================================================================
// VALUE OBJECTS
// ============================================================================

class BusinessContext {
    constructor(data) {
        this.submitter = new Person(data.submitter);
        this.sponsor = data.sponsor ? new Person(data.sponsor) : null;
        this.department = data.department;
        this.stakeholders = (data.stakeholders || []).map(s => new Stakeholder(s));
    }

    toJSON() {
        return {
            submitter: this.submitter.toJSON(),
            sponsor: this.sponsor ? this.sponsor.toJSON() : null,
            department: this.department,
            stakeholders: this.stakeholders.map(s => s.toJSON())
        };
    }
}

class ProjectClassification {
    constructor(data) {
        this.category = data.category;
        this.strategy = data.strategy;
        this.complexity = data.complexity;
        this.domain = data.domain;
        this.subDomain = data.subDomain;
        this.aiTechnologies = data.aiTechnologies || [];
    }

    toJSON() {
        return {
            category: this.category,
            strategy: this.strategy,
            complexity: this.complexity,
            domain: this.domain,
            subDomain: this.subDomain,
            aiTechnologies: this.aiTechnologies
        };
    }
}

class ScoreSet {
    constructor(data) {
        this.overall = {
            finalScore: data.overall.finalScore,
            priority: data.overall.priority,
            confidence: data.overall.confidence
        };
        
        this.dimensions = {};
        if (data.dimensions) {
            Object.keys(data.dimensions).forEach(key => {
                this.dimensions[key] = {
                    score: data.dimensions[key].score,
                    breakdown: data.dimensions[key].breakdown || {},
                    reasoning: data.dimensions[key].reasoning
                };
            });
        }
    }

    getPriorityLabel() {
        const labels = {
            1: 'High Value / Low Risk',
            2: 'High Value / High Risk', 
            3: 'Medium Value / Low Risk',
            4: 'Low Value / High Risk'
        };
        return labels[this.overall.priority] || 'Unknown';
    }

    getPriorityColor() {
        const colors = {
            1: '#4ade80',
            2: '#fbbf24',
            3: '#60a5fa',
            4: '#f87171'
        };
        return colors[this.overall.priority] || '#94a3b8';
    }

    toJSON() {
        return {
            overall: this.overall,
            dimensions: this.dimensions
        };
    }
}

class Person {
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.role = data.role;
    }

    toJSON() {
        return {
            name: this.name,
            email: this.email,
            role: this.role
        };
    }
}

class Stakeholder extends Person {
    constructor(data) {
        super(data);
        this.impact = data.impact; // high, medium, low
        this.stakeholderRole = data.role; // primary_user, reviewer, approver, etc.
    }

    toJSON() {
        return {
            ...super.toJSON(),
            impact: this.impact,
            role: this.stakeholderRole
        };
    }
}

class Evaluator {
    constructor(data) {
        this.name = data.name;
        this.type = data.type; // human, algorithmic, committee
        this.email = data.email;
        this.role = data.role;
        this.version = data.version; // for algorithmic evaluators
        this.members = data.members; // for committee evaluators
    }

    isHuman() {
        return this.type === 'human';
    }

    isAlgorithmic() {
        return this.type === 'algorithmic';
    }

    isCommittee() {
        return this.type === 'committee';
    }

    toJSON() {
        return {
            name: this.name,
            type: this.type,
            email: this.email,
            role: this.role,
            version: this.version,
            members: this.members
        };
    }
}

class ResourceRequirements {
    constructor(data) {
        this.teamSize = data?.teamSize || 0;
        this.budget = data?.budget || {};
        this.skills = data?.skills || [];
        this.requiredApprovals = data?.requiredApprovals || [];
    }

    getTotalBudget() {
        const budget = this.budget;
        return (budget.development || 0) + (budget.infrastructure || 0) + (budget.annual || 0);
    }

    toJSON() {
        return {
            teamSize: this.teamSize,
            budget: this.budget,
            skills: this.skills,
            requiredApprovals: this.requiredApprovals
        };
    }
}

class ProjectTimeline {
    constructor(data) {
        this.phases = (data?.phases || []).map(p => new Phase(p));
        this.milestones = (data?.milestones || []).map(m => new Milestone(m));
        this.expectedROI = data?.expectedROI;
    }

    getCurrentPhase() {
        return this.phases.find(p => p.status === 'in_progress') || 
               this.phases.find(p => p.status === 'planned');
    }

    getProgress() {
        const completedPhases = this.phases.filter(p => p.status === 'completed').length;
        return completedPhases / this.phases.length;
    }

    toJSON() {
        return {
            phases: this.phases.map(p => p.toJSON()),
            milestones: this.milestones.map(m => m.toJSON()),
            expectedROI: this.expectedROI
        };
    }
}

class Phase {
    constructor(data) {
        this.name = data.name;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.status = data.status || 'planned';
        this.progress = data.progress || 0;
    }

    toJSON() {
        return {
            name: this.name,
            startDate: this.startDate,
            endDate: this.endDate,
            status: this.status,
            progress: this.progress
        };
    }
}

class Milestone {
    constructor(data) {
        this.name = data.name;
        this.date = data.date;
        this.status = data.status || 'pending';
        this.description = data.description;
    }

    toJSON() {
        return {
            name: this.name,
            date: this.date,
            status: this.status,
            description: this.description
        };
    }
}

// ============================================================================
// PROJECT REPOSITORY & SERVICES
// ============================================================================

class ProjectRepository {
    constructor() {
        this.projects = new Map();
        this.templates = new Map();
    }

    // Project CRUD
    save(project) {
        if (!(project instanceof Project)) {
            throw new Error('Invalid project instance');
        }
        
        project.updatedAt = new Date();
        
        if (project.isTemplate) {
            this.templates.set(project.id, project);
        } else {
            this.projects.set(project.id, project);
        }
        
        return project;
    }

    findById(id) {
        return this.projects.get(id) || this.templates.get(id);
    }

    findByKey(key) {
        const allProjects = [...this.projects.values(), ...this.templates.values()];
        return allProjects.find(p => p.key === key);
    }

    findAll() {
        return Array.from(this.projects.values());
    }

    findTemplates() {
        return Array.from(this.templates.values());
    }

    findByCategory(category) {
        return this.findAll().filter(p => p.classification.category === category);
    }

    findByPriority(priority) {
        return this.findAll().filter(p => p.currentScores?.overall.priority === priority);
    }

    findByDepartment(department) {
        return this.findAll().filter(p => p.business.department === department);
    }

    delete(id) {
        const project = this.findById(id);
        if (!project) {
            throw new Error('Project not found');
        }

        const canDelete = project.canDelete();
        if (!canDelete.allowed) {
            throw new Error(canDelete.reason);
        }

        return this.projects.delete(id) || this.templates.delete(id);
    }

    // Query methods
    query(filters = {}) {
        let results = this.findAll();

        if (filters.status) {
            results = results.filter(p => p.status === filters.status);
        }

        if (filters.department) {
            results = results.filter(p => p.business.department === filters.department);
        }

        if (filters.category) {
            results = results.filter(p => p.classification.category === filters.category);
        }

        if (filters.priority) {
            results = results.filter(p => p.currentScores?.overall.priority === filters.priority);
        }

        if (filters.minScore !== undefined) {
            results = results.filter(p => p.currentScores?.overall.finalScore >= filters.minScore);
        }

        if (filters.maxScore !== undefined) {
            results = results.filter(p => p.currentScores?.overall.finalScore <= filters.maxScore);
        }

        return results;
    }
}

// ============================================================================
// EVALUATION SERVICES
// ============================================================================

class EvaluationService {
    constructor() {
        this.evaluationTemplates = new Map();
        this.initializeDefaultTemplates();
    }

    initializeDefaultTemplates() {
        // Quick Assessment Template
        this.evaluationTemplates.set('quick_assessment', {
            type: 'quick_assessment',
            criteria: [
                { id: 'revenue_impact', category: 'business_value', weight: 0.33, scoreRange: [1, 5] },
                { id: 'time_to_value', category: 'business_value', weight: 0.33, scoreRange: [1, 5] },
                { id: 'strategic_alignment', category: 'business_value', weight: 0.34, scoreRange: [1, 5] },
                { id: 'technical_complexity', category: 'risk_factor', weight: 0.33, scoreRange: [1, 5], reverseScore: true },
                { id: 'data_availability', category: 'risk_factor', weight: 0.33, scoreRange: [1, 5], reverseScore: true },
                { id: 'resource_requirements', category: 'risk_factor', weight: 0.34, scoreRange: [1, 5], reverseScore: true }
            ],
            priorityRules: [
                { condition: (v, r) => v >= 3.5 && r <= 2.5, priority: 1, label: 'High Value / Low Risk' },
                { condition: (v, r) => v >= 3.5 && r > 2.5, priority: 2, label: 'High Value / High Risk' },
                { condition: (v, r) => v < 3.5 && r <= 2.5, priority: 3, label: 'Medium Value / Low Risk' },
                { condition: (v, r) => v < 3.5 && r > 2.5, priority: 4, label: 'Low Value / High Risk' }
            ]
        });
    }

    createEvaluation(projectId, evaluationType, evaluatorData) {
        const template = this.evaluationTemplates.get(evaluationType);
        if (!template) {
            throw new Error(`Unknown evaluation type: ${evaluationType}`);
        }

        const evaluation = new Evaluation({
            evaluationId: this.generateEvaluationId(),
            type: evaluationType,
            status: 'draft',
            evaluator: evaluatorData
        });

        return evaluation;
    }

    calculateScores(criteriaScores, evaluationType) {
        const template = this.evaluationTemplates.get(evaluationType);
        if (!template) {
            throw new Error(`Unknown evaluation type: ${evaluationType}`);
        }

        // Calculate dimensional scores
        const valueScores = [];
        const riskScores = [];

        template.criteria.forEach(criterion => {
            const score = criteriaScores[criterion.id];
            if (score === undefined) return;

            const adjustedScore = criterion.reverseScore ? (6 - score) : score;
            const weightedScore = adjustedScore * criterion.weight;

            if (criterion.category === 'business_value') {
                valueScores.push(weightedScore);
            } else if (criterion.category === 'risk_factor') {
                riskScores.push(weightedScore);
            }
        });

        const valueScore = valueScores.reduce((a, b) => a + b, 0);
        const riskScore = riskScores.reduce((a, b) => a + b, 0);
        const finalScore = Number((valueScore - riskScore).toFixed(2));

        // Determine priority
        const priority = this.calculatePriority(valueScore, riskScore, template.priorityRules);

        return new ScoreSet({
            overall: {
                finalScore,
                priority: priority.priority,
                confidence: this.calculateConfidence(criteriaScores)
            },
            dimensions: {
                value: {
                    score: Number(valueScore.toFixed(2)),
                    breakdown: this.getValueBreakdown(criteriaScores, template)
                },
                risk: {
                    score: Number(riskScore.toFixed(2)),
                    breakdown: this.getRiskBreakdown(criteriaScores, template)
                }
            }
        });
    }

    calculatePriority(valueScore, riskScore, priorityRules) {
        for (const rule of priorityRules) {
            if (rule.condition(valueScore, riskScore)) {
                return { priority: rule.priority, label: rule.label };
            }
        }
        return { priority: 4, label: 'Unclassified' };
    }

    calculateConfidence(criteriaScores) {
        const scores = Object.values(criteriaScores).filter(s => s !== undefined && s !== null);
        if (scores.length === 0) return 0;

        // Higher confidence for more complete scoring and less extreme values
        const completeness = scores.length / 6; // Assuming 6 criteria for quick assessment
        const extremeness = scores.reduce((sum, score) => sum + Math.abs(score - 3), 0) / scores.length / 2;
        
        return Number(Math.min(completeness * (1 - extremeness * 0.2), 1).toFixed(2));
    }

    getValueBreakdown(criteriaScores, template) {
        const breakdown = {};
        template.criteria
            .filter(c => c.category === 'business_value')
            .forEach(criterion => {
                if (criteriaScores[criterion.id] !== undefined) {
                    breakdown[criterion.id] = criteriaScores[criterion.id];
                }
            });
        return breakdown;
    }

    getRiskBreakdown(criteriaScores, template) {
        const breakdown = {};
        template.criteria
            .filter(c => c.category === 'risk_factor')
            .forEach(criterion => {
                if (criteriaScores[criterion.id] !== undefined) {
                    breakdown[criterion.id] = criteriaScores[criterion.id];
                }
            });
        return breakdown;
    }

    generateEvaluationId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `eval_${timestamp}_${random}`;
    }
}

// ============================================================================
// EXPORTS
// ============================================================================

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Project,
        Evaluation,
        ProjectRepository,
        EvaluationService,
        BusinessContext,
        ProjectClassification,
        ScoreSet,
        Person,
        Stakeholder,
        Evaluator,
        ResourceRequirements,
        ProjectTimeline
    };
}

// For browser environments
if (typeof window !== 'undefined') {
    window.DomainModel = {
        Project,
        Evaluation,
        ProjectRepository,
        EvaluationService,
        BusinessContext,
        ProjectClassification,
        ScoreSet,
        Person,
        Stakeholder,
        Evaluator,
        ResourceRequirements,
        ProjectTimeline
    };
}