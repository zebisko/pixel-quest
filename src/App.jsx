import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Trophy, Menu, X, Check } from 'lucide-react';
import { useGame } from './context/GameContext.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ARTWORKS } from './constants/game.js';
import { 
  APP_CONSTANTS, 
  CONSOLE_MESSAGES, 
  ARIA_LABELS, 
  Z_INDEX, 
  LAYOUT, 
  ANIMATIONS, 
  BORDER_RADIUS,
  SPACING,
  POSITIONING,
  SIDEBAR_LABELS
} from './constants/ui.js';
import Sidebar from './components/Sidebar.jsx';
import QuestCard from './components/QuestCard.jsx';
import QuestForm from './components/QuestForm.jsx';
import ArtworkPanel from './components/ArtworkPanel.jsx';
import GalleryView from './components/GalleryView.jsx';
import EditQuestModal from './components/EditQuestModal.jsx';

const PixelQuestApp = () => {
  const {
    quests,
    level,
    xp,
    currentArtwork,
    revealedPixels,
    addQuest,
    completeQuest,
    deleteQuest,
    updateQuest,
    levelProgress,
    artworkProgress,
    completedArtworks,
    showLevelUp,
    setShowLevelUp
  } = useGame();

  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newQuestDifficulty, setNewQuestDifficulty] = useState(APP_CONSTANTS.DEFAULT_DIFFICULTY);
  const [currentView, setCurrentView] = useState(APP_CONSTANTS.DEFAULT_VIEW);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [editingQuest, setEditingQuest] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const inputRef = useRef(null);


  // Quest management functions following Clean Code principles
  const isValidQuestTitle = (title) => title.trim().length > 0;

  const addNewQuest = useCallback(() => {
    if (!isValidQuestTitle(newQuestTitle)) return;

    console.log(CONSOLE_MESSAGES.ADDING_QUEST, { title: newQuestTitle, difficulty: newQuestDifficulty });
    addQuest(newQuestTitle.trim(), newQuestDifficulty);
    setNewQuestTitle('');
    
    // Keep focus on input after adding quest
    setTimeout(() => {
      inputRef.current?.focus();
    }, APP_CONSTANTS.INPUT_FOCUS_DELAY);
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

  const handleCompleteQuest = useCallback((questId) => {
    console.log(CONSOLE_MESSAGES.COMPLETING_QUEST, questId);
    completeQuest(questId);
  }, [completeQuest]);

  const handleDeleteQuest = useCallback((questId) => {
    deleteQuest(questId);
  }, [deleteQuest]);

  const handleEditQuest = useCallback((questId) => {
    const questToEdit = quests.find(q => q.id === questId);
    setEditingQuest(questToEdit);
    setIsEditModalOpen(true);
  }, [quests]);

  const handleSaveQuest = useCallback((questId, newTitle, newXp) => {
    updateQuest(questId, { title: newTitle, xp: newXp });
    setIsEditModalOpen(false);
    setEditingQuest(null);
  }, [updateQuest]);

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setEditingQuest(null);
  }, []);

  // UI state management
  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseLevelUpModal = () => setShowLevelUp(false);
  const handleViewChange = (view) => {
    setCurrentView(view);
    setShowLevelUp(false);
  };



  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className={`flex items-center justify-between ${SPACING.HEADER_PADDING} border-b border-border lg:hidden bg-card/50 backdrop-blur-sm sticky top-0 ${Z_INDEX.MOBILE_HEADER}`}>
        <Button
          variant="ghost"
          size="icon"
          className={`${LAYOUT.MOBILE_HEADER_HEIGHT} w-8 hover-lift`}
          onClick={handleOpenSidebar}
          aria-label={ARIA_LABELS.OPEN_SIDEBAR}
        >
          <Menu className="h-4 w-4" />
        </Button>
        <h1 className="font-medium text-sm text-foreground">{APP_CONSTANTS.MAIN_TITLE}</h1>
        <div className="w-8" /> {/* Spacer */}
      </header>

      {/* Fixed Sidebar */}
      <Sidebar 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          currentView={currentView}
          setCurrentView={setCurrentView}
          level={level}
          xp={xp}
          levelProgress={levelProgress}
          completedArtworks={completedArtworks}
          artworkProgress={artworkProgress}
          currentArtwork={currentArtwork}
        />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className={`${POSITIONING.FIXED_FULL_SCREEN} bg-black/20 ${Z_INDEX.MOBILE_OVERLAY} lg:hidden backdrop-blur-sm`}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content with proper margin for fixed sidebar */}
      <main className={cn(
        "p-4 lg:p-6 transition-all duration-300 ease-in-out",
        ANIMATIONS.FADE_IN,
        // Account for fixed sidebar width using Clean Code constants
        isSidebarCollapsed ? LAYOUT.SIDEBAR_MARGIN_COLLAPSED : LAYOUT.SIDEBAR_MARGIN_EXPANDED
      )}>
          <div className="max-w-7xl mx-auto">
            {currentView === APP_CONSTANTS.VIEWS.DASHBOARD ? (
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

                  <div className="space-y-3">
                    <div className={SPACING.LEFT_PADDING_SMALL}>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-foreground mb-0">active quests</h2>
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                          {quests.length}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        complete quests to reveal artwork pixels
                      </p>
                    </div>
                    
                    <Card className="border-border bg-card shadow-sm rounded-2xl">
                      <CardContent className="p-4">
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
                                onEdit={handleEditQuest}
                              />
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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

      {/* Level Up Modal */}
      {showLevelUp && (
        <div 
          className={`${POSITIONING.FIXED_VIEWPORT} bg-black/60 backdrop-blur-sm ${POSITIONING.CENTER_MODAL} ${Z_INDEX.MODAL_OVERLAY} p-4 ${ANIMATIONS.FADE_IN}`}
          onClick={handleCloseLevelUpModal}
        >
          <Card 
            className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto border-border bg-card shadow-2xl ${ANIMATIONS.SCALE_IN} ${Z_INDEX.MODAL_CONTENT}`}
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 text-center">
                  <Trophy className={`h-16 w-16 mx-auto mb-4 text-primary ${ANIMATIONS.BOUNCE}`} />
                  <h2 className="text-3xl font-bold mb-2 text-foreground">
                    {SIDEBAR_LABELS.LEVEL_PREFIX}{level}{APP_CONSTANTS.LEVEL_UP_MESSAGES.TITLE_SUFFIX}
                  </h2>
                  <p className="text-muted-foreground mb-4">{APP_CONSTANTS.LEVEL_UP_MESSAGES.SUBTITLE}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseLevelUpModal}
                  className={`${LAYOUT.MOBILE_HEADER_HEIGHT} w-8`}
                  aria-label={ARIA_LABELS.CLOSE_MODAL}
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
                          {APP_CONSTANTS.LEVEL_UP_MESSAGES.COLLECTED_FROM_LEVEL}{completedLevel}
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
                                <div className={`absolute top-2 right-2 bg-green-500 text-white p-1 ${BORDER_RADIUS.FULL}`}>
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
                  <p>{APP_CONSTANTS.LEVEL_UP_MESSAGES.CONGRATULATIONS}</p>
                  <p>{APP_CONSTANTS.LEVEL_UP_MESSAGES.KEEP_GOING}</p>
                  {level < 25 && (
                    <p>{APP_CONSTANTS.LEVEL_UP_MESSAGES.NEXT_GOAL_PREFIX}{level + 1}{APP_CONSTANTS.LEVEL_UP_MESSAGES.NEXT_GOAL_SUFFIX}</p>
                  )}
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => handleViewChange(APP_CONSTANTS.VIEWS.GALLERY)}
                  >
                    {APP_CONSTANTS.LEVEL_UP_MESSAGES.VIEW_GALLERY}
                  </Button>
                  <Button onClick={handleCloseLevelUpModal}>
                    {APP_CONSTANTS.LEVEL_UP_MESSAGES.CONTINUE_QUESTING}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Quest Modal */}
      <EditQuestModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        quest={editingQuest}
        onSave={handleSaveQuest}
      />
    </div>
  );
};

export default PixelQuestApp;