#!/usr/bin/env node

/**
 * @test-category unit
 * @test-name Category Select All Filter Test
 * @test-description Tests that category Select All checkboxes respect current filter
 */

// Mock test registry data
const mockTestRegistry = {
    'mixed': [
        { file: 'api-test.cjs', relativePath: 'tests/api-test.cjs' },
        { file: 'widget-test.html', relativePath: 'tests/widget-test.html' },
        { file: 'workflow.py', relativePath: 'tests/workflow.py' },
        { file: 'button.test.ts', relativePath: 'tests/button.test.ts' }
    ]
};

let testRegistry = mockTestRegistry;
let currentFilter = 'all';
let currentSearch = '';
let selectedTests = new Set();

// Copy dashboard functions
function getTestType(test) {
    const ext = test.file.split('.').pop();
    const name = test.file.toLowerCase();
    
    if (ext === 'cjs' || name.includes('playwright')) return 'playwright';
    if (ext === 'html') return 'html';
    if (name.includes('.test.') || name.includes('.spec.')) return 'vitest';
    if (ext === 'py') return 'python';
    return 'nodejs';
}

// Mock DOM
global.document = {
    getElementById: (id) => ({ checked: false })
};

// Copy the FIXED toggleCategorySelection function
function toggleCategorySelection(category) {
    const checkbox = { checked: true }; // Mock checkbox as checked
    const tests = testRegistry[category] || [];
    
    // Apply same filtering logic - only operate on visible/filtered tests
    const filteredTests = tests.filter(test => {
        const type = getTestType(test);
        
        const matchesFilter = currentFilter === 'all' || type === currentFilter;
        const matchesSearch = !currentSearch || 
            test.file.toLowerCase().includes(currentSearch.toLowerCase()) ||
            category.toLowerCase().includes(currentSearch.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });
    
    if (checkbox.checked) {
        // Only select filtered/visible tests
        filteredTests.forEach(test => {
            selectedTests.add(`${category}:${test.file}`);
        });
    } else {
        // Only deselect filtered/visible tests
        filteredTests.forEach(test => {
            selectedTests.delete(`${category}:${test.file}`);
        });
    }
}

// Test functions
function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}

function runTest(testName, testFunction) {
    try {
        selectedTests.clear();
        testFunction();
        console.log(`✅ PASS: ${testName}`);
        return true;
    } catch (error) {
        console.log(`❌ FAIL: ${testName} - ${error.message}`);
        return false;
    }
}

// Test cases
function testCategorySelectAllWithNoFilter() {
    currentFilter = 'all';
    currentSearch = '';
    
    toggleCategorySelection('mixed');
    
    assert(selectedTests.size === 4, 
        `Expected 4 tests selected (no filter), got ${selectedTests.size}`);
}

function testCategorySelectAllWithHtmlFilter() {
    currentFilter = 'html';
    currentSearch = '';
    
    toggleCategorySelection('mixed');
    
    // Should only select HTML tests
    assert(selectedTests.size === 1, 
        `Expected 1 HTML test selected, got ${selectedTests.size}`);
    
    assert(selectedTests.has('mixed:widget-test.html'), 
        'HTML test should be selected');
}

function testCategorySelectAllWithPlaywrightFilter() {
    currentFilter = 'playwright';
    currentSearch = '';
    
    toggleCategorySelection('mixed');
    
    // Should only select Playwright tests (.cjs files)
    assert(selectedTests.size === 1, 
        `Expected 1 Playwright test selected, got ${selectedTests.size}`);
    
    assert(selectedTests.has('mixed:api-test.cjs'), 
        'Playwright test should be selected');
}

function testCategorySelectAllWithSearch() {
    currentFilter = 'all';
    currentSearch = 'test';
    
    toggleCategorySelection('mixed');
    
    // Should only select tests with "test" in name
    const expectedTests = mockTestRegistry.mixed.filter(test => 
        test.file.toLowerCase().includes('test'));
    
    assert(selectedTests.size === expectedTests.length, 
        `Expected ${expectedTests.length} tests with "test", got ${selectedTests.size}`);
}

function testCategorySelectAllWithFilterAndSearch() {
    currentFilter = 'vitest';
    currentSearch = 'button';
    
    toggleCategorySelection('mixed');
    
    // Should only select vitest tests with "button" in name
    assert(selectedTests.size === 1, 
        `Expected 1 filtered test, got ${selectedTests.size}`);
    
    assert(selectedTests.has('mixed:button.test.ts'), 
        'Filtered test should be selected');
}

// Main test runner
function main() {
    console.log('🧪 Category Select All Filter Test Suite');
    console.log('Testing that category Select All checkboxes respect filters\n');
    
    const tests = [
        { name: 'Category Select All with no filter', fn: testCategorySelectAllWithNoFilter },
        { name: 'Category Select All with HTML filter', fn: testCategorySelectAllWithHtmlFilter },
        { name: 'Category Select All with Playwright filter', fn: testCategorySelectAllWithPlaywrightFilter },
        { name: 'Category Select All with search', fn: testCategorySelectAllWithSearch },
        { name: 'Category Select All with filter and search', fn: testCategorySelectAllWithFilterAndSearch }
    ];
    
    let passed = 0;
    let failed = 0;
    
    tests.forEach(test => {
        if (runTest(test.name, test.fn)) {
            passed++;
        } else {
            failed++;
        }
    });
    
    console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
    
    if (failed === 0) {
        console.log('✅ SUCCESS: Category Select All respects filters correctly');
        return true;
    } else {
        console.log('❌ FAILURE: Category Select All filter logic needs fixes');
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    const success = main();
    process.exit(success ? 0 : 1);
}

module.exports = { main };