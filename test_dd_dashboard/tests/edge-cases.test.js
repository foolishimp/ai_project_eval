#!/usr/bin/env node

/**
 * @test-category unit
 * @test-name Selection Edge Cases Test
 * @test-description Tests edge cases for Clear All and additive selection behavior
 */

// Mock test registry data
const mockTestRegistry = {
    'category1': [
        { file: 'test1.html', relativePath: 'tests/test1.html' },
        { file: 'test2.cjs', relativePath: 'tests/test2.cjs' }
    ],
    'category2': [
        { file: 'test3.js', relativePath: 'tests/test3.js' },
        { file: 'test4.py', relativePath: 'tests/test4.py' }
    ]
};

let testRegistry = mockTestRegistry;
let currentFilter = 'all';
let currentSearch = '';
let selectedTests = new Set();

// Mock DOM
const mockCheckboxes = new Map();
global.document = {
    getElementById: (id) => mockCheckboxes.get(id) || { checked: false, indeterminate: false },
    querySelectorAll: (selector) => {
        if (selector === 'input[type="checkbox"]') {
            return Array.from(mockCheckboxes.values());
        }
        return [];
    }
};

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

function clearAllSelections() {
    selectedTests.clear();
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.indeterminate = false;
    });
}

function toggleCategorySelection(category) {
    const checkbox = mockCheckboxes.get(`${category}-select-all`) || { checked: true };
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
        // When selecting a category, first clear ALL previous selections to avoid confusion
        selectedTests.clear();
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
            cb.indeterminate = false;
        });
        
        // Then select only filtered/visible tests in this category
        filteredTests.forEach(test => {
            selectedTests.add(`${category}:${test.file}`);
        });
        
        // Re-check this category's checkbox
        checkbox.checked = true;
    } else {
        // Only deselect filtered/visible tests in this category
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
        // Reset for each test
        selectedTests.clear();
        mockCheckboxes.clear();
        currentFilter = 'all';
        currentSearch = '';
        
        testFunction();
        console.log(`✅ PASS: ${testName}`);
        return true;
    } catch (error) {
        console.log(`❌ FAIL: ${testName} - ${error.message}`);
        return false;
    }
}

// Edge case tests
function testClearAllWithMultipleSelections() {
    // Simulate having 3 selected tests (more than visible)
    selectedTests.add('category1:test1.html');
    selectedTests.add('category1:test2.cjs');
    selectedTests.add('category2:test3.js');
    
    // Mock checkboxes as checked
    ['cat1-cb1', 'cat1-cb2', 'cat2-cb1'].forEach(id => {
        mockCheckboxes.set(id, { checked: true, indeterminate: false });
    });
    
    assert(selectedTests.size === 3, 'Setup: Should have 3 selected tests');
    
    clearAllSelections();
    
    assert(selectedTests.size === 0, 
        `Clear All should remove all selections, got ${selectedTests.size}`);
    
    // Verify all checkboxes were reset
    mockCheckboxes.forEach(checkbox => {
        assert(checkbox.checked === false, 'All checkboxes should be unchecked');
        assert(checkbox.indeterminate === false, 'All checkboxes should not be indeterminate');
    });
}

function testCategorySelectClearsOtherSelections() {
    // Pre-select tests from category1
    selectedTests.add('category1:test1.html');
    selectedTests.add('category1:test2.cjs');
    
    assert(selectedTests.size === 2, 'Setup: Should have 2 pre-selected tests');
    
    // Now select category2 - should clear previous selections
    mockCheckboxes.set('category2-select-all', { checked: true });
    toggleCategorySelection('category2');
    
    // Should only have category2 tests selected
    assert(selectedTests.size === 2, 
        `Expected 2 category2 tests, got ${selectedTests.size}`);
    
    assert(selectedTests.has('category2:test3.js'), 'Should have category2 test3.js');
    assert(selectedTests.has('category2:test4.py'), 'Should have category2 test4.py');
    assert(!selectedTests.has('category1:test1.html'), 'Should NOT have category1 tests');
    assert(!selectedTests.has('category1:test2.cjs'), 'Should NOT have category1 tests');
}

function testCategorySelectWithFilter() {
    currentFilter = 'html';
    
    // Category1 has 1 HTML test, category2 has 0 HTML tests
    mockCheckboxes.set('category1-select-all', { checked: true });
    toggleCategorySelection('category1');
    
    // Should only select the HTML test
    assert(selectedTests.size === 1, 
        `Expected 1 HTML test selected, got ${selectedTests.size}`);
    
    assert(selectedTests.has('category1:test1.html'), 'Should select HTML test');
    assert(!selectedTests.has('category1:test2.cjs'), 'Should NOT select non-HTML test');
}

function testCategoryDeselectWithFilter() {
    currentFilter = 'html';
    
    // Pre-select some tests including filtered and non-filtered
    selectedTests.add('category1:test1.html');  // HTML - matches filter
    selectedTests.add('category1:test2.cjs');   // Not HTML - doesn't match filter
    selectedTests.add('category2:test3.js');    // Not HTML - doesn't match filter
    
    assert(selectedTests.size === 3, 'Setup: Should have 3 pre-selected tests');
    
    // Deselect category1 with HTML filter - should only deselect HTML tests
    mockCheckboxes.set('category1-select-all', { checked: false });
    toggleCategorySelection('category1');
    
    // Should remove only the HTML test from category1
    assert(selectedTests.size === 2, 
        `Expected 2 tests remaining, got ${selectedTests.size}`);
    
    assert(!selectedTests.has('category1:test1.html'), 'HTML test should be deselected');
    assert(selectedTests.has('category1:test2.cjs'), 'Non-HTML test should remain');
    assert(selectedTests.has('category2:test3.js'), 'Other category should remain');
}

function testMultipleCategorySelectionsWithFilter() {
    currentFilter = 'all';
    
    // First select category1
    mockCheckboxes.set('category1-select-all', { checked: true });
    toggleCategorySelection('category1');
    
    assert(selectedTests.size === 2, 'Should have 2 tests from category1');
    
    // Then select category2 - should clear category1 and select category2
    mockCheckboxes.set('category2-select-all', { checked: true });
    toggleCategorySelection('category2');
    
    assert(selectedTests.size === 2, 'Should have 2 tests from category2');
    assert(selectedTests.has('category2:test3.js'), 'Should have category2 tests');
    assert(selectedTests.has('category2:test4.py'), 'Should have category2 tests');
    assert(!selectedTests.has('category1:test1.html'), 'Should NOT have category1 tests');
}

// Main test runner
function main() {
    console.log('🧪 Selection Edge Cases Test Suite');
    console.log('Testing Clear All and additive selection edge cases\n');
    
    const tests = [
        { name: 'Clear All with multiple selections', fn: testClearAllWithMultipleSelections },
        { name: 'Category Select clears other selections', fn: testCategorySelectClearsOtherSelections },
        { name: 'Category Select with filter', fn: testCategorySelectWithFilter },
        { name: 'Category Deselect with filter', fn: testCategoryDeselectWithFilter },
        { name: 'Multiple category selections', fn: testMultipleCategorySelectionsWithFilter }
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
        console.log('✅ SUCCESS: All edge cases handled correctly');
        return true;
    } else {
        console.log('❌ FAILURE: Some edge cases need fixes');
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    const success = main();
    process.exit(success ? 0 : 1);
}

module.exports = { main };