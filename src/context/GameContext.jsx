import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  LEVEL_CONFIG, 
  ARTWORKS, 
  GRID_SIZE, 
  TOTAL_PIXELS, 
  getPixelsPerQuest,
  getTotalXpForLevel,
  getLevelFromXp,
  getXpRequiredForLevel,
  getArtworksForLevel
} from '../constants/game';

const GameContext = createContext();

const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

const GameProvider = ({ children }) => {
  const [quests, setQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [currentArtwork, setCurrentArtwork] = useState(ARTWORKS[0]);
  const [revealedPixels, setRevealedPixels] = useState(new Set());
  const [totalQuestsCompleted, setTotalQuestsCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);
  const [completedArtworks, setCompletedArtworks] = useState([]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newUnlocks, setNewUnlocks] = useState([]);
  
  // Difficulty XP values are defined in difficultyLevels config below
  
  // Categories configuration
  const categories = {
    work: { name: 'Work', color: '#3B82F6' },
    personal: { name: 'Personal', color: '#8B5CF6' },
    health: { name: 'Health', color: '#10B981' },
    learning: { name: 'Learning', color: '#F59E0B' },
  };
  
  // Difficulty levels configuration (as per specification)
  const difficultyLevels = {
    easy: { label: 'Easy', xp: 25, color: '#4CAF50' },
    medium: { label: 'Medium', xp: 50, color: '#FFC107' },
    hard: { label: 'Hard', xp: 100, color: '#F44336' },
  };

  // One-time fix: Auto-collect artworks from completed levels
  useEffect(() => {
    if (level > 1) {
      setCompletedArtworks(prevCompleted => {
        const allPreviousLevelArtworks = [];
        for (let prevLevel = 1; prevLevel < level; prevLevel++) {
          const levelArtworks = getArtworksForLevel(prevLevel);
          levelArtworks.forEach(artwork => {
            if (!prevCompleted.includes(artwork.id)) {
              allPreviousLevelArtworks.push(artwork.id);
            }
          });
        }
        
        if (allPreviousLevelArtworks.length > 0) {
          console.log('🔄 One-time fix: Auto-collecting artworks from completed levels:', allPreviousLevelArtworks);
          return [...prevCompleted, ...allPreviousLevelArtworks];
        }
        return prevCompleted;
      });
    }
  }, [level, getArtworksForLevel]); // Run when level changes

  // Load game state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem('pixelQuestSave');
    if (savedState) {
      try {
        const {
          quests: savedQuests,
          completedQuests: savedCompletedQuests,
          level: savedLevel,
          xp: savedXp,
          currentArtwork: savedArtwork,
          revealedPixels: savedPixels,
          totalQuestsCompleted: savedTotalQuests,
          currentArtworkIndex: savedArtworkIndex,
          completedArtworks: savedCompletedArtworks,
          streak: savedStreak
        } = JSON.parse(savedState);
        
        setQuests(Array.isArray(savedQuests) ? savedQuests : []);
        setCompletedQuests(Array.isArray(savedCompletedQuests) ? savedCompletedQuests : []);
        setLevel(Number.isInteger(savedLevel) ? savedLevel : 1);
        setXp(Number.isFinite(savedXp) ? savedXp : 0);
        setCurrentArtwork(savedArtwork || ARTWORKS[0]);
        
        // Safely handle revealedPixels initialization
        try {
          const pixels = Array.isArray(savedPixels) ? savedPixels : [];
          setRevealedPixels(new Set(pixels));
        } catch (e) {
          console.warn('Failed to parse revealedPixels, resetting to empty set', e);
          setRevealedPixels(new Set());
        }
        
        setTotalQuestsCompleted(Number.isInteger(savedTotalQuests) ? savedTotalQuests : 0);
        setCurrentArtworkIndex(Number.isInteger(savedArtworkIndex) ? savedArtworkIndex : 0);
        setCompletedArtworks(Array.isArray(savedCompletedArtworks) ? savedCompletedArtworks : []);
        setStreak(Number.isInteger(savedStreak) ? savedStreak : 0);
      } catch (error) {
        console.error('Error loading saved state:', error);
        // Reset to default values if there's an error parsing the saved state
        setQuests([]);
        setCompletedQuests([]);
        setLevel(1);
        setXp(0);
        setCurrentArtwork(ARTWORKS[0]);
        setRevealedPixels(new Set());
        setTotalQuestsCompleted(0);
        setCurrentArtworkIndex(0);
        setCompletedArtworks([]);
        setStreak(0);
      }
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    try {
      const gameState = {
        quests,
        completedQuests,
        level,
        xp,
        currentArtwork,
        revealedPixels: Array.from(revealedPixels || []),
        totalQuestsCompleted,
        currentArtworkIndex,
        completedArtworks,
        streak
      };
      localStorage.setItem('pixelQuestSave', JSON.stringify(gameState));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, [
    quests, 
    completedQuests, 
    level, 
    xp, 
    currentArtwork, 
    revealedPixels, 
    totalQuestsCompleted, 
    currentArtworkIndex, 
    completedArtworks, 
    streak
  ]);

  // Get current level progress based on XP
  const levelProgress = useMemo(() => {
    const currentLevelXpRequired = getXpRequiredForLevel(level);
    const totalXpForCurrentLevel = getTotalXpForLevel(level);
    const currentLevelXp = Math.max(0, xp - totalXpForCurrentLevel);
    
    return {
      current: currentLevelXp,
      total: currentLevelXpRequired,
      percentage: Math.min(100, Math.round((currentLevelXp / currentLevelXpRequired) * 100))
    };
  }, [level, xp]);

  // Calculate artwork progress
  const getArtworkProgress = useCallback(() => {
    if (!currentArtwork) return { 
      percentage: 0, 
      current: 0, 
      total: TOTAL_PIXELS,
      pixelsRevealed: 0,
      totalPixels: TOTAL_PIXELS,
      artwork: null
    };
    
    const percentage = Math.min(100, Math.round((revealedPixels.size / TOTAL_PIXELS) * 100));
    return {
      current: revealedPixels.size,
      total: TOTAL_PIXELS,
      percentage,
      pixelsRevealed: revealedPixels.size,
      totalPixels: TOTAL_PIXELS,
      artwork: currentArtwork
    };
  }, [revealedPixels, currentArtwork]);
  
  const artworkProgress = getArtworkProgress();

  // Generate random pixel positions for reveal
  const generatePixelPositions = useCallback((count, exclude = []) => {
    try {
      console.log('🎲 GENERATING PIXELS:', { count, excludeCount: exclude.length });
      
      // Convert exclude to a Set for faster lookups
      const excludeSet = new Set(exclude);
      const positions = [];
      const maxAttempts = TOTAL_PIXELS * 2; // Prevent infinite loops
      let attempts = 0;

      // If we need to find more pixels than available, just return all available
      if (exclude.length + count >= TOTAL_PIXELS) {
        const allAvailable = Array.from({ length: TOTAL_PIXELS }, (_, i) => i)
          .filter(pos => !excludeSet.has(pos));
        console.log('🔢 Returning all available pixels:', allAvailable.length);
        return allAvailable;
      }

      // Generate unique random positions
      while (positions.length < count && attempts < maxAttempts) {
        const pos = Math.floor(Math.random() * TOTAL_PIXELS);
        if (!excludeSet.has(pos) && !positions.includes(pos)) {
          positions.push(pos);
        }
        attempts++;
      }

      console.log('✨ Generated pixel positions:', {
        requested: count,
        generated: positions.length,
        attempts,
        samplePositions: positions.slice(0, 5)
      });
      return positions;
    } catch (error) {
      console.error('❌ Error generating pixel positions:', error);
      return [];
    }
  }, []);

  // Check if level up should occur based on XP
  const checkLevelUp = useCallback((currentXp) => {
    const newLevel = getLevelFromXp(currentXp);
    
    if (newLevel > level) {
      console.log('🎉 LEVEL UP!', { oldLevel: level, newLevel, currentXp });
      
      // Mark all artworks from previous levels as collected
      setCompletedArtworks(prevCompleted => {
        const allPreviousLevelArtworks = [];
        for (let prevLevel = 1; prevLevel < newLevel; prevLevel++) {
          const levelArtworks = getArtworksForLevel(prevLevel);
          levelArtworks.forEach(artwork => {
            if (!prevCompleted.includes(artwork.id)) {
              allPreviousLevelArtworks.push(artwork.id);
            }
          });
        }
        
        if (allPreviousLevelArtworks.length > 0) {
          console.log('📚 Auto-collecting artworks from previous levels:', allPreviousLevelArtworks);
          return [...prevCompleted, ...allPreviousLevelArtworks];
        }
        return prevCompleted;
      });
      
      setLevel(newLevel);
      setShowLevelUp(true);
      
      // Check for new artwork unlocks
      const newUnlocks = [];
      const availableArtworks = getArtworksForLevel(newLevel);
      
      // If we have artworks for this level that haven't been seen yet
      if (availableArtworks.length > 0) {
        const nextArtwork = availableArtworks[0];
        if (nextArtwork && nextArtwork.id !== currentArtwork?.id) {
          setCurrentArtwork(nextArtwork);
          setRevealedPixels(new Set());
          newUnlocks.push(nextArtwork);
        }
      }
      
      if (newUnlocks.length > 0) {
        setNewUnlocks(newUnlocks);
      }
      
      return newLevel;
    }
    return level;
  }, [level, currentArtwork, getArtworksForLevel]);

  const addQuest = useCallback((title, difficulty = 'medium', category = 'personal') => {
    const difficultyInfo = difficultyLevels[difficulty] || { xp: 25 };
    
    const newQuest = {
      id: uuidv4(),
      title,
      difficulty,
      category,
      status: 'incomplete', // 'incomplete', 'completed', or 'cancelled'
      createdAt: new Date().toISOString(),
      xp: difficultyInfo.xp
    };
    
    setQuests(prevQuests => [...prevQuests, newQuest]);
    
    // Save to localStorage
    const updatedQuests = [...quests, newQuest];
    localStorage.setItem('quests', JSON.stringify(updatedQuests));
    
    return newQuest;
  }, [difficultyLevels, quests]);

  const completeQuest = useCallback(async (questId, status = 'completed') => {
    try {
      console.log('🎯 QUEST COMPLETION STARTED:', { questId, status });
      
      // First, update the quest status
      const updatedQuests = quests.map(quest => 
        quest.id === questId ? { ...quest, status, completedAt: new Date().toISOString() } : quest
      );
      
      // Move completed quest to completedQuests
      const completedQuest = updatedQuests.find(q => q.id === questId);
      if (completedQuest) {
        console.log('✅ Quest completed:', completedQuest.title, 'XP:', completedQuest.xp);
        setCompletedQuests(prev => [completedQuest, ...prev]);
      }
      
      // Update the quests list
      setQuests(updatedQuests.filter(q => q.id !== questId));
      
      // Only process for completed quests, not cancelled ones
      if (status === 'completed') {
        // Award XP
        const xpEarned = completedQuest?.xp || 0;
        let newTotalXp = 0;
        setXp(prevXp => {
          newTotalXp = prevXp + xpEarned;
          localStorage.setItem('xp', newTotalXp);
          return newTotalXp;
        });
        
        // Update quest counter and check for level up based on XP
        setTotalQuestsCompleted(prev => {
          const newCount = prev + 1;
          checkLevelUp(newTotalXp);
          return newCount;
        });
        
        // Calculate pixels to reveal based on current level and artwork progress
        const currentLevelConfig = LEVEL_CONFIG[level];
        if (!currentLevelConfig) {
          console.warn('❌ No level config found for level:', level);
          return;
        }
        
        const pixelsPerQuest = Math.ceil(TOTAL_PIXELS / currentLevelConfig.questsPerArtwork);
        console.log('🎨 PIXEL REVELATION:', {
          level,
          questsPerArtwork: currentLevelConfig.questsPerArtwork,
          pixelsPerQuest,
          totalPixels: TOTAL_PIXELS,
          currentArtwork: currentArtwork?.title
        });
        
        // Use a state updater function to ensure we have the latest state
        setRevealedPixels(prevRevealedPixels => {
          const currentRevealed = Array.from(prevRevealedPixels || []);
          console.log('📊 Current revealed pixels before:', currentRevealed.length);
          
          const newPixels = generatePixelPositions(pixelsPerQuest, currentRevealed);
          console.log('🆕 New pixels to reveal:', newPixels.length, newPixels.slice(0, 5));
          
          // Create new set with revealed pixels
          const newSet = new Set(currentRevealed);
          newPixels.forEach(pixel => newSet.add(pixel));
          
          console.log('📈 PIXEL UPDATE:', {
            previousCount: currentRevealed.length,
            newPixelsAdded: newPixels.length,
            totalRevealed: newSet.size,
            totalPixels: TOTAL_PIXELS,
            percentage: Math.round((newSet.size / TOTAL_PIXELS) * 100)
          });
          
          // Check if current artwork is complete (all pixels revealed)
          if (newSet.size >= TOTAL_PIXELS) {
            console.log('🎉 ARTWORK COMPLETE! Moving to next artwork in level...');
            const currentArtworkId = currentArtwork?.id;
            
            if (currentArtworkId && !completedArtworks.includes(currentArtworkId)) {
              // Add current artwork to completed
              const updatedCompletedArtworks = [...completedArtworks, currentArtworkId];
              setCompletedArtworks(updatedCompletedArtworks);
              
              // Get artworks for current level
              const levelArtworks = getArtworksForLevel(level);
              const currentArtworkIndexInLevel = levelArtworks.findIndex(art => art.id === currentArtworkId);
              
              console.log('🔄 ARTWORK TRANSITION:', {
                completedArtwork: currentArtwork?.title,
                levelArtworks: levelArtworks.length,
                currentIndex: currentArtworkIndexInLevel
              });
              
              // Move to next artwork in the same level if available
              if (currentArtworkIndexInLevel + 1 < levelArtworks.length) {
                const nextArtwork = levelArtworks[currentArtworkIndexInLevel + 1];
                console.log(`➡️ Switching to next artwork in level ${level}: ${nextArtwork.title}`);
                setCurrentArtwork(nextArtwork);
                return new Set(); // Reset for new artwork
              } else {
                console.log(`✨ All artworks completed for level ${level}`);
                // All artworks for this level completed - level up will be handled by XP system
              }
            }
          }
          
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error completing quest:', error);
    }
  }, [level, currentArtwork, currentArtworkIndex, completedArtworks, quests, checkLevelUp, generatePixelPositions, getPixelsPerQuest]);

  const deleteQuest = useCallback((questId) => {
    setQuests(prevQuests => prevQuests.filter(q => q.id !== questId));
  }, []);

  const updateQuest = useCallback((questId, updates) => {
    setQuests(prevQuests => 
      prevQuests.map(quest => 
        quest.id === questId ? { ...quest, ...updates } : quest
      )
    );
  }, []);

  // Remove unused function

  const revealPixels = useCallback((count = 1) => {
    console.log(`Revealing ${count} pixels...`);
    setRevealedPixels(prev => {
      try {
        const currentPixels = Array.from(prev || []);
        console.log(`Current revealed pixels: ${currentPixels.length}/${TOTAL_PIXELS}`);
        
        // Generate new pixel positions to reveal
        const newPixels = generatePixelPositions(count, currentPixels);
        console.log('New pixels to reveal:', newPixels);
        
        // Create new set with revealed pixels
        const newSet = new Set(currentPixels);
        newPixels.forEach(pixel => newSet.add(pixel));
        
        console.log(`Total revealed after update: ${newSet.size}/${TOTAL_PIXELS}`);
        
        // Check if artwork is complete (all pixels revealed)
        if (newSet.size >= TOTAL_PIXELS) {
          console.log('Artwork complete! Moving to next artwork...');
          const currentArtworkId = currentArtwork?.id;
          
          if (currentArtworkId && !completedArtworks.includes(currentArtworkId)) {
            // Add current artwork to completed
            const updatedCompletedArtworks = [...completedArtworks, currentArtworkId];
            setCompletedArtworks(updatedCompletedArtworks);
            
            // Get artworks for current level
            const levelArtworks = getArtworksForLevel(level);
            const currentArtworkIndexInLevel = levelArtworks.findIndex(art => art.id === currentArtworkId);
            
            // Move to next artwork in the same level if available
            if (currentArtworkIndexInLevel + 1 < levelArtworks.length) {
              const nextArtwork = levelArtworks[currentArtworkIndexInLevel + 1];
              console.log(`Switching to next artwork in level ${level}: ${nextArtwork.title}`);
              setCurrentArtwork(nextArtwork);
              return new Set(); // Reset for new artwork
            }
          }
        }
        
        return newSet;
      } catch (error) {
        console.error('Error in revealPixels:', error);
        return prev;
      }
    });
  }, [currentArtwork, level, completedArtworks, generatePixelPositions]);

  const value = useMemo(() => ({
    // State
    quests,
    completedQuests,
    level,
    xp,
    streak,
    currentArtwork,
    currentArtworkIndex,
    revealedPixels: Array.from(revealedPixels),
    totalQuestsCompleted,
    completedArtworks,
    showLevelUp,
    newUnlocks,
    
    // Derived state
    categories,
    difficultyLevels,
    levelProgress,
    artworkProgress,
    totalArtworks: ARTWORKS.length,
    
    // Actions
    addQuest,
    completeQuest,
    deleteQuest,
    updateQuest,
    revealPixels,
    setShowLevelUp,
    setNewUnlocks,
    getArtworkProgress
  }), [
    quests,
    completedQuests,
    level,
    xp,
    streak,
    currentArtwork,
    currentArtworkIndex,
    revealedPixels,
    totalQuestsCompleted,
    completedArtworks,
    showLevelUp,
    newUnlocks,
    categories,
    difficultyLevels,
    levelProgress,
    artworkProgress,
    addQuest,
    completeQuest,
    deleteQuest,
    updateQuest,
    revealPixels,
    getArtworkProgress
  ]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider, useGame };
