import React, { useState } from 'react';
import { Home, Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  LAYOUT, 
  SPACING, 
  BORDER_RADIUS, 
  TYPOGRAPHY, 
  ANIMATIONS, 
  Z_INDEX, 
  POSITIONING, 
  SIDEBAR_LABELS, 
  ARIA_LABELS 
} from '../constants/ui.js';

const Sidebar = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  currentView, 
  setCurrentView, 
  level, 
  xp, 
  levelProgress, 
  completedArtworks,
  artworkProgress,
  currentArtwork 
}) => {
  const [showHelp, setShowHelp] = useState(true);

  // Helper functions following Clean Code principles
  const handleViewChange = (view) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleDismissHelp = () => {
    setShowHelp(false);
  };

  const getSidebarClasses = () => {
    return cn(
      // Base positioning - always fixed for consistent behavior
      POSITIONING.SIDEBAR_FIXED,
      "bg-white border-r border-border transition-all ease-in-out flex flex-col",
      // Z-index management for proper layering
      `lg:${Z_INDEX.SIDEBAR_DESKTOP} ${Z_INDEX.SIDEBAR_MOBILE}`,
      // Animation classes
      `${ANIMATIONS.TRANSITION_DURATION} ${ANIMATIONS.TRANSITION_EASE}`,
      // Width management
      isSidebarCollapsed ? LAYOUT.SIDEBAR_WIDTH_COLLAPSED : LAYOUT.SIDEBAR_WIDTH_EXPANDED,
      // Mobile visibility
      isSidebarOpen ? "translate-x-0" : "-translate-x-full",
      // Desktop visibility
      "lg:translate-x-0"
    );
  };

  const getNavButtonClasses = () => {
    return cn(
      `w-full ${LAYOUT.QUEST_CARD_HEIGHT} font-normal text-sm transition-colors`,
      isSidebarCollapsed ? "justify-center px-2" : "justify-start"
    );
  };

  const getIconClasses = () => {
    return cn("h-4 w-4", !isSidebarCollapsed && "mr-3");
  };

  return (
  <aside className={getSidebarClasses()}>
    {/* Header */}
    <header className={`flex items-center justify-between border-b border-border flex-shrink-0 ${SPACING.HEADER_PADDING}`}>
      {!isSidebarCollapsed && (
        <h1 
          className="font-medium tracking-tight text-foreground" 
          style={{
            fontSize: TYPOGRAPHY.TITLE_FONT_SIZE, 
            lineHeight: TYPOGRAPHY.TITLE_LINE_HEIGHT
          }}
        >
          pixel quest
        </h1>
      )}
      <div className={`flex items-center ${SPACING.MEDIUM_GAP}`}>
        <Button
          variant="ghost"
          size="icon"
          className={`hidden lg:flex ${LAYOUT.BUTTON_HEIGHT} w-8`}
          onClick={handleToggleCollapse}
          aria-label={isSidebarCollapsed ? ARIA_LABELS.EXPAND_SIDEBAR : ARIA_LABELS.COLLAPSE_SIDEBAR}
        >
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`lg:hidden ${LAYOUT.BUTTON_HEIGHT} w-8`}
          onClick={handleCloseSidebar}
          aria-label={ARIA_LABELS.CLOSE_SIDEBAR}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </header>
    
    {/* Navigation */}
    <nav className={`${SPACING.CONTENT_PADDING} flex-shrink-0`} role="navigation" aria-label="Main navigation">
      <div className="space-y-2">
        <Button
          variant={currentView === 'dashboard' ? 'default' : 'ghost'}
          className={getNavButtonClasses()}
          onClick={() => handleViewChange('dashboard')}
        >
          <Home className={getIconClasses()} />
          {!isSidebarCollapsed && SIDEBAR_LABELS.DASHBOARD}
        </Button>
        
        <Button
          variant={currentView === 'gallery' ? 'default' : 'ghost'}
          className={getNavButtonClasses()}
          onClick={() => handleViewChange('gallery')}
        >
          <Image className={getIconClasses()} />
          {!isSidebarCollapsed && (
            <>
              {SIDEBAR_LABELS.GALLERY}
              <span className={`ml-auto ${TYPOGRAPHY.SMALL_TEXT} text-muted-foreground bg-muted px-1.5 py-0.5 ${BORDER_RADIUS.FULL}`}>
                {completedArtworks.length}
              </span>
            </>
          )}
        </Button>
      </div>
    </nav>
    
    {/* Help Section */}
    {showHelp && !isSidebarCollapsed && (
      <div className={`${SPACING.CONTENT_PADDING} border-t border-border`}>
        <div className={`border border-border bg-muted/30 ${BORDER_RADIUS.MEDIUM} ${SPACING.CONTENT_PADDING} relative`}>
          <button
            onClick={handleDismissHelp}
            className={`absolute top-2 right-2 p-1 hover:bg-muted ${BORDER_RADIUS.SMALL} transition-colors`}
            aria-label={ARIA_LABELS.DISMISS_HELP}
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
          <div className={`${TYPOGRAPHY.SMALL_TEXT} text-muted-foreground space-y-1 pr-3`}>
            <p>🎯 complete quests to reveal artwork pixels</p>
            <p>⭐ higher difficulty = more xp = more pixels revealed</p>
            <p className="font-medium">🎨 discovering: {currentArtwork?.title || 'loading...'}</p>
          </div>
        </div>
      </div>
    )}

    {/* Progress Summary - Sticky at bottom */}
    <div className={`${SPACING.CONTENT_PADDING} border-t border-border mt-auto flex-shrink-0`}>
      {isSidebarCollapsed ? (
        <div className={`space-y-3 text-center`}>
          <div className={`${TYPOGRAPHY.SMALL_TEXT} font-medium text-foreground`}>{level}</div>
          <div className={`${TYPOGRAPHY.SMALL_TEXT} text-muted-foreground`}>{completedArtworks.length}</div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`${TYPOGRAPHY.SMALL_TEXT} font-medium text-foreground`}>
                {SIDEBAR_LABELS.LEVEL_PREFIX}{level}
              </span>
              <span className={`${TYPOGRAPHY.SMALL_TEXT} text-muted-foreground`}>
                {xp}{SIDEBAR_LABELS.XP_SUFFIX}
              </span>
            </div>
            <Progress value={levelProgress.percentage} className={LAYOUT.PROGRESS_BAR_HEIGHT} />
            <p className={`${TYPOGRAPHY.SMALL_TEXT} text-muted-foreground mt-1.5`}>
              {levelProgress.current} / {levelProgress.total}{SIDEBAR_LABELS.XP_TO_NEXT_LEVEL}
            </p>
            <p className={`${TYPOGRAPHY.SMALL_TEXT} text-muted-foreground mt-1`}>
              {artworkProgress?.current || 0} / {artworkProgress?.total || 0}{SIDEBAR_LABELS.PIXELS_REVEALED}
            </p>
          </div>
          
          <div className="pt-2 border-t border-border">
            <div className="text-center">
              <div className={`font-medium text-foreground ${TYPOGRAPHY.MEDIUM_TEXT}`}>{completedArtworks.length}</div>
              <div className={`${TYPOGRAPHY.SMALL_TEXT} text-muted-foreground`}>{SIDEBAR_LABELS.ARTWORKS_COLLECTED}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  </aside>
  );
};

export default Sidebar;