import React from 'react';
import { Home, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const Sidebar = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  currentView, 
  setCurrentView, 
  level, 
  xp, 
  levelProgress, 
  revealedPixels, 
  completedArtworks 
}) => (
  <aside className={cn(
    "fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 h-screen flex flex-col",
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  )}>
    {/* Header */}
    <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
      <div>
        <h1 className="text-xl font-medium tracking-tight text-foreground">pixel quest</h1>
        <p className="text-xs text-muted-foreground mt-0.5">complete quests to reveal art</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden h-8 w-8"
        onClick={() => setIsSidebarOpen(false)}
        aria-label="Close sidebar"
      >
        <X className="h-4 w-4" />
      </Button>
    </header>
    
    {/* Navigation */}
    <nav className="p-3 flex-shrink-0" role="navigation" aria-label="Main navigation">
      <div className="space-y-1">
        <Button
          variant={currentView === 'dashboard' ? 'default' : 'ghost'}
          className="w-full justify-start h-9 font-normal text-sm transition-colors"
          onClick={() => {
            setCurrentView('dashboard');
            setIsSidebarOpen(false);
          }}
        >
          <Home className="mr-3 h-4 w-4" />
          dashboard
        </Button>
        
        <Button
          variant={currentView === 'gallery' ? 'default' : 'ghost'}
          className="w-full justify-start h-9 font-normal text-sm transition-colors"
          onClick={() => {
            setCurrentView('gallery');
            setIsSidebarOpen(false);
          }}
        >
          <Image className="mr-3 h-4 w-4" />
          gallery 
          <span className="ml-auto text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
            {completedArtworks.length}
          </span>
        </Button>
      </div>
    </nav>
    
    {/* Progress Summary - Sticky at bottom */}
    <div className="p-3 border-t border-border mt-auto flex-shrink-0">
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
            {revealedPixels.length}/625 pixels revealed
          </p>
        </div>
        
        <div className="pt-2 border-t border-border">
          <div className="text-center">
            <div className="font-medium text-foreground text-sm">{completedArtworks.length}</div>
            <div className="text-xs text-muted-foreground">artworks collected</div>
          </div>
        </div>
      </div>
    </div>
  </aside>
);

export default Sidebar;