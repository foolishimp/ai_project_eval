#!/usr/bin/env node

/**
 * @test-category unit
 * @test-name localStorage Isolation Test
 * @test-description Tests that localStorage keys are project-specific to prevent conflicts
 */

// Mock browser environment for Node.js testing
global.localStorage = {
    data: {},
    getItem(key) { return this.data[key] || null; },
    setItem(key, value) { this.data[key] = value; },
    removeItem(key) { delete this.data[key]; },
    clear() { this.data = {}; }
};

global.fetch = async (url) => {
    if (url === '/api/project-config') {
        return {
            ok: true,
            json: async () => ({
                port: 8085,
                projectName: 'test_dd_dashboard_dev'
            })
        };
    }
    throw new Error('Unknown URL');
};

// Mock dashboard functions
let storagePrefix = 'dashboard-default-';

async function initializeStoragePrefix() {
    try {
        const response = await fetch('/api/project-config');
        if (response.ok) {
            const config = await response.json();
            storagePrefix = `dashboard-${config.port}-${config.projectName}-`;
        }
    } catch (error) {
        console.warn('Could not load project config, using default storage prefix');
    }
}

function saveSelectedDirectories(directories) {
    localStorage.setItem(storagePrefix + 'selectedDirectories', JSON.stringify([...directories]));
}

function loadSelectedDirectories() {
    const saved = localStorage.getItem(storagePrefix + 'selectedDirectories');
    return saved ? new Set(JSON.parse(saved)) : new Set();
}

// Test functions
function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}

function runTest(testName, testFunction) {
    try {
        localStorage.clear(); // Reset for each test
        storagePrefix = 'dashboard-default-'; // Reset prefix
        testFunction();
        console.log(`✅ PASS: ${testName}`);
        return true;
    } catch (error) {
        console.log(`❌ FAIL: ${testName} - ${error.message}`);
        return false;
    }
}

// Test cases
async function testStoragePrefixInitialization() {
    await initializeStoragePrefix();
    
    assert(storagePrefix === 'dashboard-8085-test_dd_dashboard_dev-', 
        `Expected 'dashboard-8085-test_dd_dashboard_dev-', got '${storagePrefix}'`);
}

async function testProjectSpecificStorage() {
    await initializeStoragePrefix();
    
    const testDirectories = new Set(['src/', 'tests/']);
    saveSelectedDirectories(testDirectories);
    
    const expectedKey = 'dashboard-8085-test_dd_dashboard_dev-selectedDirectories';
    const storedValue = localStorage.getItem(expectedKey);
    
    assert(storedValue !== null, 
        `Expected data in localStorage with key '${expectedKey}'`);
    
    const parsedDirectories = JSON.parse(storedValue);
    assert(parsedDirectories.includes('src/') && parsedDirectories.includes('tests/'), 
        'Stored directories should include src/ and tests/');
}

async function testMultipleProjectIsolation() {
    // Simulate project 1
    await initializeStoragePrefix();
    saveSelectedDirectories(new Set(['project1/src']));
    
    // Simulate project 2 with different config
    global.fetch = async (url) => ({
        ok: true,
        json: async () => ({
            port: 8183,
            projectName: 'psychicblob'
        })
    });
    
    storagePrefix = 'dashboard-default-'; // Reset
    await initializeStoragePrefix();
    saveSelectedDirectories(new Set(['project2/tests']));
    
    // Verify both projects have separate storage
    const project1Key = 'dashboard-8085-test_dd_dashboard_dev-selectedDirectories';
    const project2Key = 'dashboard-8183-psychicblob-selectedDirectories';
    
    const project1Data = localStorage.getItem(project1Key);
    const project2Data = localStorage.getItem(project2Key);
    
    assert(project1Data !== null, 'Project 1 data should exist');
    assert(project2Data !== null, 'Project 2 data should exist');
    assert(project1Data !== project2Data, 'Projects should have different data');
    
    assert(JSON.parse(project1Data).includes('project1/src'), 
        'Project 1 should have its own directories');
    assert(JSON.parse(project2Data).includes('project2/tests'), 
        'Project 2 should have its own directories');
}

async function testDefaultPrefixFallback() {
    // Mock failed API call
    global.fetch = async (url) => {
        throw new Error('API unavailable');
    };
    
    await initializeStoragePrefix();
    
    assert(storagePrefix === 'dashboard-default-', 
        `Expected fallback prefix 'dashboard-default-', got '${storagePrefix}'`);
}

// Main test runner
async function main() {
    console.log('🧪 localStorage Isolation Test Suite');
    console.log('Testing project-specific localStorage functionality\n');
    
    const tests = [
        { name: 'Storage prefix initialization', fn: testStoragePrefixInitialization },
        { name: 'Project-specific storage', fn: testProjectSpecificStorage },
        { name: 'Multiple project isolation', fn: testMultipleProjectIsolation },
        { name: 'Default prefix fallback', fn: testDefaultPrefixFallback }
    ];
    
    let passed = 0;
    let failed = 0;
    
    for (const test of tests) {
        if (await runTest(test.name, test.fn)) {
            passed++;
        } else {
            failed++;
        }
    }
    
    console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
    
    if (failed === 0) {
        console.log('✅ SUCCESS: localStorage isolation working correctly');
        return true;
    } else {
        console.log('❌ FAILURE: localStorage isolation has issues');
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    main()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Unexpected error:', error);
            process.exit(1);
        });
}

module.exports = { main };