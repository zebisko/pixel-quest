/**
 * Simple test runner for game logic validation
 * Tests the core functionality without external dependencies
 */

import { 
  LEVEL_CONFIG,
  getTotalQuestsForLevel,
  getPixelsPerQuest,
  getTotalXpForLevel,
  getLevelFromXp,
  getXpRequiredForLevel,
  getArtworksForLevel,
  ARTWORKS,
  TOTAL_PIXELS
} from './src/constants/game.js';

// Simple test framework
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  expect(value) {
    return {
      toBe: (expected) => {
        if (value !== expected) {
          throw new Error(`Expected ${expected}, got ${value}`);
        }
        return true;
      },
      toBeGreaterThan: (expected) => {
        if (value <= expected) {
          throw new Error(`Expected ${value} to be greater than ${expected}`);
        }
        return true;
      },
      toBeGreaterThanOrEqual: (expected) => {
        if (value < expected) {
          throw new Error(`Expected ${value} to be greater than or equal to ${expected}`);
        }
        return true;
      },
      toBeLessThanOrEqual: (expected) => {
        if (value > expected) {
          throw new Error(`Expected ${value} to be less than or equal to ${expected}`);
        }
        return true;
      },
      toHaveLength: (expected) => {
        if (!value || value.length !== expected) {
          throw new Error(`Expected length ${expected}, got ${value ? value.length : 'undefined'}`);
        }
        return true;
      },
      toHaveProperty: (property) => {
        if (!value || !(property in value)) {
          throw new Error(`Expected object to have property ${property}`);
        }
        return true;
      },
      toEqual: (expected) => {
        if (JSON.stringify(value) !== JSON.stringify(expected)) {
          throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)}`);
        }
        return true;
      }
    };
  }

  async run() {
    console.log('🧪 Running Pixel Quest Game Logic Tests...\n');

    for (const { name, fn } of this.tests) {
      try {
        await fn.call(this);
        console.log(`✅ ${name}`);
        this.passed++;
      } catch (error) {
        console.log(`❌ ${name}: ${error.message}`);
        this.failed++;
      }
    }

    console.log(`\n📊 Test Results: ${this.passed} passed, ${this.failed} failed`);
    
    if (this.failed > 0) {
      console.log('❌ Some tests failed');
      process.exit(1);
    } else {
      console.log('✅ All tests passed!');
    }
  }
}

const runner = new TestRunner();

// Level Configuration Tests
runner.test('LEVEL_CONFIG contains all 25 levels', function() {
  this.expect(Object.keys(LEVEL_CONFIG)).toHaveLength(25);
  
  for (let i = 1; i <= 25; i++) {
    this.expect(LEVEL_CONFIG[i]).toHaveProperty('questsPerArtwork');
    this.expect(LEVEL_CONFIG[i]).toHaveProperty('artworksNeeded');
    this.expect(LEVEL_CONFIG[i]).toHaveProperty('title');
    this.expect(LEVEL_CONFIG[i]).toHaveProperty('description');
  }
});

runner.test('Level 1 configuration is correct', function() {
  this.expect(LEVEL_CONFIG[1].questsPerArtwork).toBe(5);
  this.expect(LEVEL_CONFIG[1].artworksNeeded).toBe(1);
});

runner.test('Level 6 configuration is correct', function() {
  this.expect(LEVEL_CONFIG[6].questsPerArtwork).toBe(10);
  this.expect(LEVEL_CONFIG[6].artworksNeeded).toBe(2);
});

runner.test('Level 25 configuration is correct', function() {
  this.expect(LEVEL_CONFIG[25].questsPerArtwork).toBe(122);
  this.expect(LEVEL_CONFIG[25].artworksNeeded).toBe(6);
});

// Quest Calculation Tests
runner.test('getTotalQuestsForLevel calculates correctly', function() {
  this.expect(getTotalQuestsForLevel(1)).toBe(5);  // 5 * 1
  this.expect(getTotalQuestsForLevel(6)).toBe(20); // 10 * 2
  this.expect(getTotalQuestsForLevel(10)).toBe(45); // 15 * 3
  this.expect(getTotalQuestsForLevel(25)).toBe(732); // 122 * 6
});

runner.test('getPixelsPerQuest distributes pixels correctly', function() {
  this.expect(getPixelsPerQuest(1)).toBe(Math.ceil(TOTAL_PIXELS / 5));
  this.expect(getPixelsPerQuest(6)).toBe(Math.ceil(TOTAL_PIXELS / 10));
  this.expect(getPixelsPerQuest(25)).toBe(Math.ceil(TOTAL_PIXELS / 122));
});

runner.test('Pixel revelation covers enough pixels', function() {
  for (let level = 1; level <= 25; level++) {
    const config = LEVEL_CONFIG[level];
    const pixelsPerQuest = getPixelsPerQuest(level);
    const totalPixelsForArtwork = pixelsPerQuest * config.questsPerArtwork;
    
    // Should reveal at least 95% of pixels for completion
    this.expect(totalPixelsForArtwork).toBeGreaterThanOrEqual(Math.floor(TOTAL_PIXELS * 0.95));
  }
});

// XP System Tests
runner.test('getTotalXpForLevel calculates correctly', function() {
  this.expect(getTotalXpForLevel(1)).toBe(0); // Starting level requires 0 XP
  this.expect(getTotalXpForLevel(2)).toBe(188); // Level 1: 5 quests * 37.5 avg XP (rounded)
});

runner.test('getLevelFromXp returns correct level', function() {
  this.expect(getLevelFromXp(0)).toBe(1);
  this.expect(getLevelFromXp(100)).toBe(1);
  
  const level2Threshold = getTotalXpForLevel(2);
  this.expect(getLevelFromXp(level2Threshold - 1)).toBe(1);
  this.expect(getLevelFromXp(level2Threshold)).toBe(2);
});

runner.test('getXpRequiredForLevel returns correct XP per level', function() {
  this.expect(getXpRequiredForLevel(1)).toBe(188); // 5 * 37.5 * 1.0 (rounded)
  this.expect(getXpRequiredForLevel(6)).toBe(1125);   // 20 * 37.5 * 1.5 (rounded) 
  // Note: Level 25 XP will be much higher due to multiplier
  this.expect(getXpRequiredForLevel(25)).toBeGreaterThan(50000);
});

runner.test('Level progression is monotonically increasing', function() {
  for (let level = 1; level < 25; level++) {
    const currentLevelXp = getXpRequiredForLevel(level);
    const nextLevelXp = getXpRequiredForLevel(level + 1);
    this.expect(nextLevelXp).toBeGreaterThan(currentLevelXp);
  }
});

// Artwork System Tests
runner.test('Sufficient artworks exist', function() {
  this.expect(ARTWORKS.length).toBeGreaterThan(0);
  
  // Check first few levels have artworks
  for (let level = 1; level <= 10; level++) {
    const artworks = getArtworksForLevel(level);
    this.expect(artworks.length).toBeGreaterThan(0);
  }
});

runner.test('Artwork metadata is complete', function() {
  ARTWORKS.slice(0, 20).forEach(artwork => { // Test first 20 artworks
    this.expect(artwork).toHaveProperty('id');
    this.expect(artwork).toHaveProperty('title');
    this.expect(artwork).toHaveProperty('artist');
    this.expect(artwork).toHaveProperty('description');
    this.expect(artwork).toHaveProperty('filename');
    this.expect(artwork).toHaveProperty('level');
  });
});

// Integration Tests
runner.test('Complete level 1 progression', function() {
  let totalXp = 0;
  let currentLevel = 1;
  const questsNeeded = getTotalQuestsForLevel(1);
  
  // Complete all quests for level 1 with medium difficulty (50 XP each)
  for (let i = 0; i < questsNeeded; i++) {
    totalXp += 50;
    const newLevel = getLevelFromXp(totalXp);
    if (newLevel > currentLevel) {
      currentLevel = newLevel;
    }
  }
  
  this.expect(currentLevel).toBe(2);
  this.expect(totalXp).toBe(250); // 5 quests * 50 XP
});

runner.test('Edge case: Maximum level capping', function() {
  const veryHighXp = 1000000;
  const level = getLevelFromXp(veryHighXp);
  this.expect(level).toBeLessThanOrEqual(25);
});

runner.test('Edge case: Negative or zero XP', function() {
  this.expect(getLevelFromXp(-100)).toBe(1);
  this.expect(getLevelFromXp(0)).toBe(1);
});

// Data Consistency Tests
runner.test('Quest progression is reasonable', function() {
  for (let level = 1; level <= 25; level++) {
    const quests = getTotalQuestsForLevel(level);
    
    this.expect(quests).toBeGreaterThan(0);
    this.expect(quests).toBeLessThanOrEqual(1000);
  }
});

runner.test('XP progression is reasonable', function() {
  for (let level = 1; level <= 25; level++) {
    const xp = getXpRequiredForLevel(level);
    
    this.expect(xp).toBeGreaterThan(0);
    this.expect(xp).toBeLessThanOrEqual(100000);
  }
});

// Run all tests
runner.run().catch(console.error);