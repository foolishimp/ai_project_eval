#!/usr/bin/env node

/**
 * Simple HTTP server to serve AI project files for portfolio dashboard
 * Reads markdown files from projects/ directory and extracts evaluation data
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Port allocation strategy
const DEFAULT_PORT = 8100; // AI project eval base port
const PORT_RANGE_START = 8100;
const PORT_RANGE_END = 8199;
const PROJECTS_DIR = path.join(__dirname, 'projects');

// CORS headers for local development
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
};

/**
 * Parse project markdown file and extract key information
 */
function parseProjectFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        // Extract header information
        const project = {
            id: path.basename(filePath, '.md'),
            fileName: path.basename(filePath),
            filePath: filePath,
            fullContent: content  // Store the full markdown content
        };

        // Parse header metadata
        let inHeader = false;
        let currentSection = '';
        let description = '';
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Extract header fields
            if (line.startsWith('**Project Name**:')) {
                project.name = line.replace('**Project Name**:', '').trim();
            } else if (line.startsWith('**Submitter**:')) {
                project.submitter = line.replace('**Submitter**:', '').trim();
            } else if (line.startsWith('**Date**:')) {
                project.date = line.replace('**Date**:', '').trim();
            } else if (line.startsWith('**Department/Team**:')) {
                project.department = line.replace('**Department/Team**:', '').trim();
            } else if (line.startsWith('**Final Score**:')) {
                project.finalScore = parseFloat(line.replace('**Final Score**:', '').trim());
            } else if (line.startsWith('**Priority Level**:')) {
                const priorityText = line.replace('**Priority Level**:', '').trim();
                const priorityMatch = priorityText.match(/Priority (\d+)/);
                project.priority = priorityMatch ? parseInt(priorityMatch[1]) : null;
            } else if (line.startsWith('**Recommendation**:')) {
                project.recommendation = line.replace('**Recommendation**:', '').trim();
            }
            
            // Extract executive summary as description
            if (line === '### Executive Summary') {
                currentSection = 'summary';
                continue;
            } else if (currentSection === 'summary' && line.startsWith('##')) {
                currentSection = '';
            } else if (currentSection === 'summary' && line && !line.startsWith('#')) {
                description += line + ' ';
            }
            
            // Extract solution type
            if (line.startsWith('### Solution Type')) {
                currentSection = 'solutionType';
                continue;
            } else if (currentSection === 'solutionType' && line && !line.startsWith('#') && !line.startsWith('**')) {
                project.category = line.trim();
                currentSection = '';
            }
            
            // Extract implementation strategy
            if (line.startsWith('**Implementation Strategy**:')) {
                project.strategy = line.replace('**Implementation Strategy**:', '').trim();
            }
            
            // Extract evaluation scores
            if (line.includes('**Risk Score**:')) {
                const riskMatch = line.match(/\*\*Risk Score\*\*:\s*([\d.]+)/);
                project.riskScore = riskMatch ? parseFloat(riskMatch[1]) : null;
            } else if (line.includes('**Value Score**:')) {
                const valueMatch = line.match(/\*\*Value Score\*\*:\s*([\d.]+)/);
                project.valueScore = valueMatch ? parseFloat(valueMatch[1]) : null;
            }
        }
        
        project.description = description.trim();
        
        // Set defaults for missing values
        project.name = project.name || path.basename(filePath, '.md');
        project.submitter = project.submitter || 'Unknown';
        project.department = project.department || 'Unknown';
        project.date = project.date || '2025-01-01';
        project.finalScore = project.finalScore || 0;
        project.priority = project.priority || 4;
        project.riskScore = project.riskScore || 2.5;
        project.valueScore = project.valueScore || 2.5;
        project.category = project.category || 'Unknown';
        project.strategy = project.strategy || 'Unknown';
        project.description = project.description || 'No description available';
        
        return project;
    } catch (error) {
        console.error(`Error parsing project file ${filePath}:`, error.message);
        return null;
    }
}

/**
 * Create a new project markdown file
 */
function createProjectFile(projectData) {
    try {
        // Generate project ID from current date and name
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
        const timeStr = now.toTimeString().slice(0, 5).replace(':', '');
        const nameSlug = projectData.name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 30);
        const projectId = `${dateStr}_${timeStr}_${nameSlug}`;
        
        // Create markdown content
        const markdownContent = `# AI Project Proposal: ${projectData.name}

**Project Name**: ${projectData.name}
**Submitter**: ${projectData.submitter || 'Unknown'}
**Date**: ${now.toISOString().slice(0, 10)}
**Department/Team**: ${projectData.department || 'Unknown'}
**Evaluation Date**: ${now.toISOString().slice(0, 10)}
**Final Score**: ${projectData.finalScore || 0}
**Priority Level**: Priority ${projectData.priority || 3}
**Recommendation**: ${projectData.recommendation || 'Pending evaluation'}

---

## Project Overview

### Executive Summary
${projectData.description || 'No description provided'}

---

## Problem Definition

### Current Process
${projectData.currentProcess || 'To be documented'}

### Specific Pain Points
${projectData.painPoints || 'To be identified'}

---

## Proposed AI Solution

### Solution Type
${projectData.category || 'Unknown'}

### AI Technology Approach
${projectData.technologyApproach || 'To be defined'}

### Core Capabilities
${projectData.capabilities || 'To be defined'}

---

## Expected Outcomes

### Success Metrics
${projectData.successMetrics || 'To be defined'}

### Quantified Benefits
${projectData.benefits || 'To be quantified'}

---

## Technical Implementation

### Data Requirements
${projectData.dataRequirements || 'To be analyzed'}

### Technical Integration
${projectData.technicalIntegration || 'To be planned'}

---

## Resource Requirements

### Team and Skills
${projectData.teamRequirements || 'To be determined'}

### Budget Estimates
${projectData.budgetEstimate || 'To be estimated'}

---

## Risk Assessment

### Technical Risks
${projectData.technicalRisks || 'To be assessed'}

### Business Risks
${projectData.businessRisks || 'To be assessed'}

---

## AI Project Evaluation

**Evaluation Date**: ${now.toISOString().slice(0, 10)}
**Evaluator**: Project Builder Application
**Version**: 1.0

### Executive Summary
${projectData.evaluationSummary || 'Evaluation pending'}

### LLM Solution Classification
**Implementation Strategy**: ${projectData.strategy || 'To be determined'}
**Solution Category**: ${projectData.category || 'Unknown'}

### Evaluation Scores

**Risk Score**: ${projectData.riskScore || 2.5}
**Value Score**: ${projectData.valueScore || 2.5}
**Final Score**: ${projectData.finalScore || 0}

### Priority Classification
**Priority Level**: Priority ${projectData.priority || 3}
**Recommendation**: ${projectData.recommendation || 'Pending detailed evaluation'}
`;

        // Write file to projects directory
        const fileName = `${projectId}.md`;
        const filePath = path.join(PROJECTS_DIR, fileName);
        fs.writeFileSync(filePath, markdownContent, 'utf8');
        
        console.log(`✅ Created new project file: ${fileName}`);
        return true;
    } catch (error) {
        console.error('❌ Error creating project file:', error.message);
        return false;
    }
}

/**
 * Get all projects from the projects directory
 */
function getAllProjects() {
    try {
        const files = fs.readdirSync(PROJECTS_DIR);
        const projects = [];
        
        for (const file of files) {
            if (file.endsWith('.md')) {
                const filePath = path.join(PROJECTS_DIR, file);
                const project = parseProjectFile(filePath);
                if (project) {
                    projects.push(project);
                }
            }
        }
        
        // Sort by date (newest first)
        projects.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return projects;
    } catch (error) {
        console.error('Error reading projects directory:', error.message);
        return [];
    }
}

/**
 * HTTP request handler
 */
function requestHandler(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // Set CORS headers
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
        res.setHeader(key, value);
    });
    
    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
    }
    
    // Handle POST request to create new project
    if (req.method === 'POST' && pathname === '/api/projects') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const projectData = JSON.parse(body);
                const success = createProjectFile(projectData);
                
                if (success) {
                    res.statusCode = 201;
                    res.end(JSON.stringify({
                        success: true,
                        message: 'Project created successfully',
                        projectId: projectData.id
                    }));
                } else {
                    res.statusCode = 500;
                    res.end(JSON.stringify({
                        success: false,
                        error: 'Failed to create project file'
                    }));
                }
            } catch (error) {
                res.statusCode = 400;
                res.end(JSON.stringify({
                    success: false,
                    error: 'Invalid JSON data'
                }));
            }
        });
        return;
    }
    
    // API Routes
    if (pathname === '/api/projects') {
        try {
            const projects = getAllProjects();
            res.statusCode = 200;
            res.end(JSON.stringify({
                success: true,
                count: projects.length,
                projects: projects
            }, null, 2));
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({
                success: false,
                error: error.message
            }));
        }
        return;
    }
    
    // Get specific project
    if (pathname.startsWith('/api/projects/')) {
        const projectId = pathname.replace('/api/projects/', '');
        try {
            const projects = getAllProjects();
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                res.statusCode = 200;
                res.end(JSON.stringify({
                    success: true,
                    project: project
                }, null, 2));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({
                    success: false,
                    error: 'Project not found'
                }));
            }
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({
                success: false,
                error: error.message
            }));
        }
        return;
    }
    
    // Health check
    if (pathname === '/api/health') {
        res.statusCode = 200;
        res.end(JSON.stringify({
            success: true,
            status: 'healthy',
            timestamp: new Date().toISOString(),
            projectsDirectory: PROJECTS_DIR,
            projectCount: getAllProjects().length
        }));
        return;
    }
    
    // Serve static files (for development)
    if (pathname === '/' || pathname === '/dashboard') {
        try {
            const dashboardPath = path.join(__dirname, 'project_portfolio_dashboard.html');
            const content = fs.readFileSync(dashboardPath, 'utf8');
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.end(content);
        } catch (error) {
            res.statusCode = 404;
            res.end('Dashboard not found');
        }
        return;
    }
    
    // 404 for other routes
    res.statusCode = 404;
    res.end(JSON.stringify({
        success: false,
        error: 'Not found',
        availableEndpoints: [
            '/api/health',
            '/api/projects',
            '/api/projects/{id}',
            '/dashboard'
        ]
    }));
}

/**
 * Check if a port is available
 */
function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = http.createServer();
        
        server.listen(port, () => {
            server.close(() => resolve(true));
        });
        
        server.on('error', () => resolve(false));
    });
}

/**
 * Find an available port in the specified range
 */
async function findAvailablePort(startPort = PORT_RANGE_START, endPort = PORT_RANGE_END) {
    // First try the default port
    if (await isPortAvailable(DEFAULT_PORT)) {
        return DEFAULT_PORT;
    }
    
    // Then try ports in range
    for (let port = startPort; port <= endPort; port++) {
        if (await isPortAvailable(port)) {
            return port;
        }
    }
    
    throw new Error(`No available ports found in range ${startPort}-${endPort}`);
}

/**
 * Start the server on an available port
 */
async function startServer() {
    try {
        const port = await findAvailablePort();
        const server = http.createServer(requestHandler);
        
        server.listen(port, () => {
            console.log(`🚀 AI Project Server running on http://localhost:${port}`);
            console.log(`📊 Portfolio Dashboard: http://localhost:${port}/dashboard`);
            console.log(`📋 Projects API: http://localhost:${port}/api/projects`);
            console.log(`❤️  Health Check: http://localhost:${port}/api/health`);
            console.log(`📁 Projects Directory: ${PROJECTS_DIR}`);
            
            if (port !== DEFAULT_PORT) {
                console.log(`ℹ️  Using port ${port} (default ${DEFAULT_PORT} was unavailable)`);
            }
            
            // Show available projects
            const projects = getAllProjects();
            console.log(`\n📈 Found ${projects.length} projects:`);
            projects.forEach(project => {
                console.log(`  • ${project.name} (Priority ${project.priority}, Score: ${project.finalScore})`);
            });
            
            if (projects.length === 0) {
                console.log('\n⚠️  No projects found. Make sure you have .md files in the projects/ directory.');
            }
            
            // Store port info for other processes
            const portInfo = {
                port: port,
                pid: process.pid,
                startTime: new Date().toISOString(),
                urls: {
                    dashboard: `http://localhost:${port}/dashboard`,
                    api: `http://localhost:${port}/api/projects`,
                    health: `http://localhost:${port}/api/health`
                }
            };
            
            fs.writeFileSync(path.join(__dirname, '.port'), JSON.stringify(portInfo, null, 2));
            console.log(`\n📝 Port info saved to .port file`);
        });
        
        server.on('error', (error) => {
            console.error('❌ Server error:', error.message);
            process.exit(1);
        });
        
        // Cleanup port file on exit
        process.on('SIGINT', () => {
            console.log('\n🛑 Stopping server...');
            try {
                fs.unlinkSync(path.join(__dirname, '.port'));
            } catch (e) {
                // Ignore errors
            }
            process.exit(0);
        });
        
        return port;
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        console.log(`💡 Tried port range: ${PORT_RANGE_START}-${PORT_RANGE_END}`);
        console.log('💡 Consider stopping other services or expanding the port range');
        process.exit(1);
    }
}

// Start server if run directly
if (require.main === module) {
    startServer();
}

module.exports = { startServer, getAllProjects, parseProjectFile };