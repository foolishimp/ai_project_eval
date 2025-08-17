#!/usr/bin/env node

/**
 * Unit test for math functions
 */

function testAddition() {
    const result = 2 + 2;
    if (result !== 4) throw new Error('Addition failed');
}

function testSubtraction() {
    const result = 5 - 3;
    if (result !== 2) throw new Error('Subtraction failed');
}

function main() {
    console.log('🧪 Math Unit Tests');
    
    try {
        testAddition();
        testSubtraction();
        console.log('✅ All math tests passed');
        return true;
    } catch (error) {
        console.log('❌ Math test failed:', error.message);
        return false;
    }
}

if (require.main === module) {
    const success = main();
    process.exit(success ? 0 : 1);
}