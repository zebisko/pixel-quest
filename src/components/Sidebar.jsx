import React, { useState } from 'react';
import { Home, Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

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
  revealedPixels, 
  completedArtworks,
  artworkProgress,
  currentArtwork 
}) => {
  const [showHelp, setShowHelp] = useState(true);

  return (
  <aside className={cn(
    "fixed inset-y-0 left-0 z-50 bg-white border-r border-border transition-all duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:z-0 min-h-screen lg:h-screen flex flex-col",
    isSidebarCollapsed ? "w-16" : "w-80",
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  )}>
    {/* Header */}
    <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
      {!isSidebarCollapsed && (
        <h1 className="font-medium tracking-tight text-foreground" style={{fontSize: '2.5em', lineHeight: '2.5rem'}}>pixel quest</h1>
      )}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex h-8 w-8"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-8 w-8"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </header>
    
    {/* Navigation */}
    <nav className="p-3 flex-shrink-0" role="navigation" aria-label="Main navigation">
      <div className="space-y-2">
        <Button
          variant={currentView === 'dashboard' ? 'default' : 'ghost'}
          className={cn(
            "w-full h-9 font-normal text-sm transition-colors",
            isSidebarCollapsed ? "justify-center px-2" : "justify-start"
          )}
          onClick={() => {
            setCurrentView('dashboard');
            setIsSidebarOpen(false);
          }}
        >
          <Home className={cn("h-4 w-4", !isSidebarCollapsed && "mr-3")} />
          {!isSidebarCollapsed && "dashboard"}
        </Button>
        
        <Button
          variant={currentView === 'gallery' ? 'default' : 'ghost'}
          className={cn(
            "w-full h-9 font-normal text-sm transition-colors",
            isSidebarCollapsed ? "justify-center px-2" : "justify-start"
          )}
          onClick={() => {
            setCurrentView('gallery');
            setIsSidebarOpen(false);
          }}
        >
          <Image className={cn("h-4 w-4", !isSidebarCollapsed && "mr-3")} />
          {!isSidebarCollapsed && (
            <>
              gallery 
              <span className="ml-auto text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                {completedArtworks.length}
              </span>
            </>
          )}
        </Button>
      </div>
    </nav>
    
    {/* Help Section */}
    {showHelp && !isSidebarCollapsed && (
      <div className="p-3 border-t border-border">
        <div className="border border-border bg-muted/30 rounded-xl p-3 relative">
          <button
            onClick={() => setShowHelp(false)}
            className="absolute top-2 right-2 p-1 hover:bg-muted rounded-md transition-colors"
            aria-label="Dismiss help"
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
          <div className="text-xs text-muted-foreground space-y-1 pr-3">
            <p>🎯 complete quests to reveal artwork pixels</p>
            <p>⭐ higher difficulty = more xp = more pixels revealed</p>
            <p className="font-medium">🎨 discovering: {currentArtwork?.title || 'loading...'}</p>
          </div>
        </div>
      </div>
    )}

    {/* Progress Summary - Sticky at bottom */}
    <div className="p-3 border-t border-border mt-auto flex-shrink-0">
      {isSidebarCollapsed ? (
        <div className="space-y-3 text-center">
          <div className="text-xs font-medium text-foreground">{level}</div>
          <div className="text-xs text-muted-foreground">{completedArtworks.length}</div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">level {level}</span>
              <span className="text-xs text-muted-foreground">{xp} xp</span>
            </div>
            <Progress value={levelProgress.percentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1.5">
              {levelProgress.current} / {levelProgress.total} xp to next level
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {artworkProgress?.current || 0} / {artworkProgress?.total || 0} pixels revealed
            </p>
          </div>
          
          <div className="pt-2 border-t border-border">
            <div className="text-center">
              <div className="font-medium text-foreground text-sm">{completedArtworks.length}</div>
              <div className="text-xs text-muted-foreground">artworks collected</div>
            </div>
          </div>
        </div>
      )}
    </div>
  </aside>
  );
};

export default Sidebar;