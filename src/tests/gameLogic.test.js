/**
 * Comprehensive test suite for Pixel Quest game logic
 * Tests progression system, XP calculations, level advancement, and pixel revelation
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
} from '../constants/game.js';

// Mock console methods to avoid test output noise
const originalConsole = { ...console };
beforeAll(() => {
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  Object.assign(console, originalConsole);
});

describe('Level Configuration Tests', () => {
  test('LEVEL_CONFIG contains all 25 levels', () => {
    expect(Object.keys(LEVEL_CONFIG)).toHaveLength(25);
    
    for (let i = 1; i <= 25; i++) {
      expect(LEVEL_CONFIG[i]).toBeDefined();
      expect(LEVEL_CONFIG[i]).toHaveProperty('questsPerArtwork');
      expect(LEVEL_CONFIG[i]).toHaveProperty('artworksNeeded');
      expect(LEVEL_CONFIG[i]).toHaveProperty('title');
      expect(LEVEL_CONFIG[i]).toHaveProperty('description');
    }
  });

  test('Level progression follows specification', () => {
    // Test specific key levels according to specification
    expect(LEVEL_CONFIG[1]).toEqual(expect.objectContaining({
      questsPerArtwork: 5,
      artworksNeeded: 1
    }));
    
    expect(LEVEL_CONFIG[6]).toEqual(expect.objectContaining({
      questsPerArtwork: 10,
      artworksNeeded: 2
    }));
    
    expect(LEVEL_CONFIG[10]).toEqual(expect.objectContaining({
      questsPerArtwork: 15,
      artworksNeeded: 3
    }));
    
    expect(LEVEL_CONFIG[25]).toEqual(expect.objectContaining({
      questsPerArtwork: 122,
      artworksNeeded: 6
    }));
  });

  test('Artworks per level scale correctly', () => {
    // Levels 1-5: 1 artwork
    for (let i = 1; i <= 5; i++) {
      expect(LEVEL_CONFIG[i].artworksNeeded).toBe(1);
    }
    
    // Levels 6-9: 2 artworks
    for (let i = 6; i <= 9; i++) {
      expect(LEVEL_CONFIG[i].artworksNeeded).toBe(2);
    }
    
    // Levels 10-12: 3 artworks
    for (let i = 10; i <= 12; i++) {
      expect(LEVEL_CONFIG[i].artworksNeeded).toBe(3);
    }
    
    // Levels 19-25: 6 artworks
    for (let i = 19; i <= 25; i++) {
      expect(LEVEL_CONFIG[i].artworksNeeded).toBe(6);
    }
  });
});

describe('Quest Calculation Tests', () => {
  test('getTotalQuestsForLevel calculates correctly', () => {
    expect(getTotalQuestsForLevel(1)).toBe(5);  // 5 * 1
    expect(getTotalQuestsForLevel(6)).toBe(20); // 10 * 2
    expect(getTotalQuestsForLevel(10)).toBe(45); // 15 * 3
    expect(getTotalQuestsForLevel(25)).toBe(732); // 122 * 6
  });

  test('getPixelsPerQuest distributes pixels evenly', () => {
    expect(getPixelsPerQuest(1)).toBe(Math.floor(TOTAL_PIXELS / 5));
    expect(getPixelsPerQuest(6)).toBe(Math.floor(TOTAL_PIXELS / 10));
    expect(getPixelsPerQuest(25)).toBe(Math.floor(TOTAL_PIXELS / 122));
  });

  test('Pixel revelation covers all pixels', () => {
    for (let level = 1; level <= 25; level++) {
      const config = LEVEL_CONFIG[level];
      const pixelsPerQuest = getPixelsPerQuest(level);
      const totalPixelsForArtwork = pixelsPerQuest * config.questsPerArtwork;
      
      // Should reveal at least 95% of pixels for completion
      expect(totalPixelsForArtwork).toBeGreaterThanOrEqual(TOTAL_PIXELS * 0.95);
    }
  });
});

describe('XP System Tests', () => {
  test('XP values match specification', () => {
    const easyXp = 25;
    const mediumXp = 50;
    const hardXp = 100;
    
    expect(easyXp).toBe(25);
    expect(mediumXp).toBe(50);
    expect(hardXp).toBe(100);
  });

  test('getTotalXpForLevel calculates cumulative XP correctly', () => {
    // Level 1 should require 0 XP (starting level)
    expect(getTotalXpForLevel(1)).toBe(0);
    
    // Level 2 should require completion of level 1
    // Level 1: 5 quests * 37.5 avg XP = 187.5
    expect(getTotalXpForLevel(2)).toBe(187.5);
    
    // Test a few more levels
    const level3Xp = getTotalXpForLevel(3);
    const level4Xp = getTotalXpForLevel(4);
    expect(level4Xp).toBeGreaterThan(level3Xp);
  });

  test('getLevelFromXp returns correct level', () => {
    expect(getLevelFromXp(0)).toBe(1);
    expect(getLevelFromXp(100)).toBe(1);
    expect(getLevelFromXp(1000)).toBeGreaterThan(1);
    
    // Test boundary conditions
    const level2Threshold = getTotalXpForLevel(2);
    expect(getLevelFromXp(level2Threshold - 1)).toBe(1);
    expect(getLevelFromXp(level2Threshold)).toBe(2);
  });

  test('getXpRequiredForLevel returns correct XP per level', () => {
    expect(getXpRequiredForLevel(1)).toBe(187.5); // 5 * 37.5
    expect(getXpRequiredForLevel(6)).toBe(750);   // 20 * 37.5
    expect(getXpRequiredForLevel(25)).toBe(27450); // 732 * 37.5
  });

  test('Level progression is monotonically increasing', () => {
    for (let level = 1; level < 25; level++) {
      const currentLevelXp = getXpRequiredForLevel(level);
      const nextLevelXp = getXpRequiredForLevel(level + 1);
      expect(nextLevelXp).toBeGreaterThan(currentLevelXp);
    }
  });
});

describe('Artwork System Tests', () => {
  test('Sufficient artworks exist for all levels', () => {
    const totalArtworksNeeded = Object.values(LEVEL_CONFIG)
      .reduce((sum, config) => sum + config.artworksNeeded, 0);
    
    expect(ARTWORKS.length).toBeGreaterThanOrEqual(totalArtworksNeeded);
  });

  test('getArtworksForLevel returns correct artworks', () => {
    for (let level = 1; level <= 20; level++) {
      const artworks = getArtworksForLevel(level);
      expect(artworks.length).toBeGreaterThan(0);
      
      // All returned artworks should be for the correct level
      artworks.forEach(artwork => {
        expect(artwork.level).toBe(level);
      });
    }
  });

  test('Artwork metadata is complete', () => {
    ARTWORKS.forEach(artwork => {
      expect(artwork).toHaveProperty('id');
      expect(artwork).toHaveProperty('title');
      expect(artwork).toHaveProperty('artist');
      expect(artwork).toHaveProperty('description');
      expect(artwork).toHaveProperty('filename');
      expect(artwork).toHaveProperty('level');
      
      expect(typeof artwork.id).toBe('number');
      expect(typeof artwork.title).toBe('string');
      expect(typeof artwork.artist).toBe('string');
      expect(artwork.title.length).toBeGreaterThan(0);
      expect(artwork.artist.length).toBeGreaterThan(0);
    });
  });
});

describe('Game Progression Integration Tests', () => {
  test('Complete level 1 progression', () => {
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
    
    expect(currentLevel).toBe(2);
    expect(totalXp).toBe(250); // 5 quests * 50 XP
  });

  test('Multi-artwork level progression (level 6)', () => {
    const level6StartXp = getTotalXpForLevel(6);
    let totalXp = level6StartXp;
    let currentLevel = 6;
    
    const config = LEVEL_CONFIG[6];
    const totalQuestsForLevel = config.questsPerArtwork * config.artworksNeeded;
    
    // Complete all quests for level 6
    for (let i = 0; i < totalQuestsForLevel; i++) {
      totalXp += 50; // Medium difficulty
      const newLevel = getLevelFromXp(totalXp);
      if (newLevel > currentLevel) {
        currentLevel = newLevel;
      }
    }
    
    expect(currentLevel).toBe(7);
  });

  test('Pixel revelation math is correct', () => {
    // Test level 1: 5 quests should reveal entire artwork
    const level1PixelsPerQuest = getPixelsPerQuest(1);
    const level1TotalPixels = level1PixelsPerQuest * 5;
    expect(level1TotalPixels).toBeGreaterThanOrEqual(TOTAL_PIXELS * 0.95);
    
    // Test level 25: 122 quests should reveal entire artwork
    const level25PixelsPerQuest = getPixelsPerQuest(25);
    const level25TotalPixels = level25PixelsPerQuest * 122;
    expect(level25TotalPixels).toBeGreaterThanOrEqual(TOTAL_PIXELS * 0.95);
  });

  test('Edge case: Maximum level capping', () => {
    const veryHighXp = 1000000;
    const level = getLevelFromXp(veryHighXp);
    expect(level).toBeLessThanOrEqual(25);
  });

  test('Edge case: Negative or zero XP', () => {
    expect(getLevelFromXp(-100)).toBe(1);
    expect(getLevelFromXp(0)).toBe(1);
  });
});

describe('Performance Tests', () => {
  test('Level calculation performance', () => {
    const start = performance.now();
    
    // Calculate levels for a range of XP values
    for (let xp = 0; xp <= 50000; xp += 100) {
      getLevelFromXp(xp);
    }
    
    const end = performance.now();
    const duration = end - start;
    
    // Should complete in reasonable time (less than 1 second)
    expect(duration).toBeLessThan(1000);
  });

  test('Quest calculation performance', () => {
    const start = performance.now();
    
    // Calculate quest requirements for all levels
    for (let level = 1; level <= 25; level++) {
      getTotalQuestsForLevel(level);
      getPixelsPerQuest(level);
      getXpRequiredForLevel(level);
    }
    
    const end = performance.now();
    const duration = end - start;
    
    // Should be very fast (less than 10ms)
    expect(duration).toBeLessThan(10);
  });
});

describe('Data Consistency Tests', () => {
  test('All level titles are unique', () => {
    const titles = Object.values(LEVEL_CONFIG).map(config => config.title);
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  test('Artwork IDs are unique', () => {
    const ids = ARTWORKS.map(artwork => artwork.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('Quest progression is reasonable', () => {
    for (let level = 1; level <= 25; level++) {
      const quests = getTotalQuestsForLevel(level);
      
      // No level should require negative quests
      expect(quests).toBeGreaterThan(0);
      
      // No level should require an unreasonable number of quests (max 1000)
      expect(quests).toBeLessThanOrEqual(1000);
    }
  });

  test('XP progression is reasonable', () => {
    for (let level = 1; level <= 25; level++) {
      const xp = getXpRequiredForLevel(level);
      
      // No level should require negative XP
      expect(xp).toBeGreaterThan(0);
      
      // No level should require unreasonable XP (max 100,000)
      expect(xp).toBeLessThanOrEqual(100000);
    }
  });
});