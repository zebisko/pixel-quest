import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Trophy, Menu, X, Check } from 'lucide-react';
import { useGame } from './context/GameContext.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ARTWORKS } from './constants/game.js';
import Sidebar from './components/Sidebar.jsx';
import QuestCard from './components/QuestCard.jsx';
import QuestForm from './components/QuestForm.jsx';
import ArtworkPanel from './components/ArtworkPanel.jsx';
import GalleryView from './components/GalleryView.jsx';

const PixelQuestApp = () => {
  const {
    quests,
    completedQuests,
    level,
    xp,
    currentArtwork,
    revealedPixels,
    addQuest,
    completeQuest,
    deleteQuest,
    difficultyLevels,
    levelProgress,
    artworkProgress,
    completedArtworks,
    showLevelUp,
    setShowLevelUp
  } = useGame();

  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newQuestDifficulty, setNewQuestDifficulty] = useState('medium');
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const inputRef = useRef(null);


  // Add quest
  const addNewQuest = useCallback(() => {
    if (!newQuestTitle.trim()) return;

    console.log('➕ Adding new quest:', { title: newQuestTitle, difficulty: newQuestDifficulty });
    addQuest(newQuestTitle.trim(), newQuestDifficulty);
    setNewQuestTitle('');
    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [newQuestTitle, newQuestDifficulty, addQuest]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addNewQuest();
    }
  }, [addNewQuest]);

  // Quest actions
  const handleCompleteQuest = useCallback((questId) => {
    console.log('🎯 Completing quest:', questId);
    completeQuest(questId);
  }, [completeQuest]);

  const handleDeleteQuest = useCallback((questId) => {
    deleteQuest(questId);
  }, [deleteQuest]);



  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="flex items-center justify-between p-4 border-b border-border lg:hidden bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover-lift"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <h1 className="font-medium text-sm text-foreground">pixel quest</h1>
        <div className="w-8" /> {/* Spacer */}
      </header>

      <div className="flex">
        <Sidebar 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
          level={level}
          xp={xp}
          levelProgress={levelProgress}
          revealedPixels={revealedPixels}
          completedArtworks={completedArtworks}
        />
        
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Quest Panel */}
                <div className="space-y-4">
                  <QuestForm
                    ref={inputRef}
                    newQuestTitle={newQuestTitle}
                    setNewQuestTitle={setNewQuestTitle}
                    newQuestDifficulty={newQuestDifficulty}
                    setNewQuestDifficulty={setNewQuestDifficulty}
                    onAddQuest={addNewQuest}
                    onInputKeyDown={handleInputKeyDown}
                  />

                  <Card className="border-border bg-card shadow-sm rounded-2xl">
                    <CardHeader className="pb-3 p-4 space-y-1">
                      <CardTitle className="text-lg font-semibold text-foreground mb-0.5">
                        active quests 
                        <span className="ml-auto text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full ml-1">
                          {quests.length}
                        </span>
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        complete quests to reveal artwork pixels
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                        {quests.length === 0 ? (
                          <div className="text-center py-8 text-sm text-muted-foreground">
                            <div className="text-2xl mb-2">🎯</div>
                            no active quests. add one to start your adventure!
                          </div>
                        ) : (
                          quests.map((quest) => (
                            <QuestCard 
                              key={quest.id} 
                              quest={quest} 
                              onComplete={handleCompleteQuest}
                              onDelete={handleDeleteQuest}
                            />
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Artwork Panel */}
                <ArtworkPanel 
                  currentArtwork={currentArtwork}
                  revealedPixels={revealedPixels}
                />
              </div>
            ) : (
              <GalleryView 
                level={level}
                xp={xp}
                completedArtworks={completedArtworks}
                setCurrentView={setCurrentView}
              />
            )}
          </div>
        </main>
      </div>

      {/* Level Up Modal */}
      {showLevelUp && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setShowLevelUp(false)}
        >
          <Card 
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-border bg-card shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 text-center">
                  <Trophy className="h-16 w-16 mx-auto mb-4 text-primary animate-bounce" />
                  <h2 className="text-3xl font-bold mb-2 text-foreground">level {level} complete!</h2>
                  <p className="text-muted-foreground mb-4">you've unlocked new artworks!</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLevelUp(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Show completed artworks from the previous level */}
              {(() => {
                const completedLevel = level - 1; // Show artworks from the level just completed
                if (completedLevel > 0) {
                  const levelArtworks = ARTWORKS.filter(artwork => artwork.level === completedLevel);
                  
                  if (levelArtworks.length > 0) {
                    return (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4 text-center text-foreground">
                          artworks collected from level {completedLevel}
                        </h3>
                        <div className={cn(
                          "grid gap-4 mb-6",
                          levelArtworks.length === 1 && "grid-cols-1 justify-items-center",
                          levelArtworks.length === 2 && "grid-cols-2 justify-items-center",
                          levelArtworks.length >= 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        )}>
                          {levelArtworks.map((artwork) => (
                            <Card key={artwork.id} className="overflow-hidden">
                              <div className="aspect-[3/2] relative">
                                <img
                                  src={artwork.svgPath}
                                  alt={artwork.title}
                                  className="w-full h-full object-contain bg-background"
                                />
                                <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                                  <Check className="h-3 w-3" />
                                </div>
                              </div>
                              <CardContent className="p-3">
                                <h4 className="font-semibold text-sm mb-1 text-foreground">{artwork.title}</h4>
                                <p className="text-xs text-muted-foreground mb-1">
                                  {artwork.artist} • {artwork.year}
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {artwork.description}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  }
                }
                return null;
              })()}
              
              <div className="text-center space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🎉 congratulations on your progress!</p>
                  <p>keep completing quests to discover more masterpieces.</p>
                  {level < 25 && (
                    <p>🎯 next goal: reach level {level + 1} to unlock new artworks!</p>
                  )}
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCurrentView('gallery');
                      setShowLevelUp(false);
                    }}
                  >
                    view gallery
                  </Button>
                  <Button onClick={() => setShowLevelUp(false)}>
                    continue questing
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PixelQuestApp;