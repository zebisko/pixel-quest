import React, { useMemo } from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ARTWORKS } from '../constants/game.js';
import { useArtworkModal } from '../hooks/useArtworkModal.js';
import Modal from './Modal.jsx';
import { BORDER_RADIUS, SPACING } from '../constants/ui.js';

const ArtworkCard = React.memo(({ artwork, isLocked, isCollected, onSelect }) => (
  <Card 
    className={cn(
      "overflow-hidden transition-all duration-300 hover-lift border-border bg-card",
      isLocked ? "opacity-60" : "hover:shadow-lg",
      isCollected ? "cursor-pointer ring-1 ring-primary/20" : "",
      "animate-scale-in"
    )}
    onClick={() => {
      if (isCollected && !isLocked) {
        onSelect(artwork);
      }
    }}
  >
    <div className="aspect-[3/2] relative">
      <img
        src={artwork.svgPath}
        alt={artwork.title}
        className={cn(
          "w-full h-full object-contain bg-background",
          isLocked && "grayscale",
          !isCollected && !isLocked && "grayscale opacity-40"
        )}
      />
      
      {isLocked && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-3xl mb-2">🔒</div>
            <p className="text-sm font-medium">reach level {artwork.level}</p>
            <p className="text-xs opacity-80">to unlock</p>
          </div>
        </div>
      )}
      
      {!isCollected && !isLocked && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-2xl mb-1">👁️</div>
            <p className="text-xs">not collected</p>
          </div>
        </div>
      )}
      
      {isCollected && (
        <>
          <div className="absolute top-2 right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
            <Check className="h-3 w-3" />
          </div>
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            click to view
          </div>
        </>
      )}
    </div>
    <CardContent className="p-3">
      <h3 className={cn(
        "font-semibold text-sm mb-1 leading-tight",
        isLocked ? "text-muted-foreground" : "text-foreground"
      )}>
        {artwork.title}
      </h3>
      <p className="text-xs text-muted-foreground mb-1">
        {artwork.artist} • {artwork.year}
      </p>
      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
        {isLocked ? `unlock at level ${artwork.level} to collect this masterpiece` : artwork.description}
      </p>
      <div className="flex items-center justify-between">
        <span className={cn(
          "text-xs px-2 py-1 rounded-full",
          isLocked ? "bg-muted text-muted-foreground" : "bg-secondary text-white"
        )}>
          {isLocked ? '🔒 locked' : artwork.period}
        </span>
        <span className="text-xs text-muted-foreground">level {artwork.level}</span>
      </div>
    </CardContent>
  </Card>
));

ArtworkCard.displayName = 'ArtworkCard';

const GalleryView = React.memo(({ level, xp, completedArtworks, setCurrentView }) => {
  const { selectedArtwork, openModal, closeModal } = useArtworkModal();
  
  // Organize artworks by level
  const artworksByLevel = useMemo(() => {
    const organized = {};
    ARTWORKS.forEach(artwork => {
      if (!organized[artwork.level]) {
        organized[artwork.level] = [];
      }
      organized[artwork.level].push(artwork);
    });
    return organized;
  }, []);

  // Get all levels (1-25) and sort them
  const allLevels = useMemo(() => Array.from({ length: 25 }, (_, i) => i + 1), []);

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="text-center space-y-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">art gallery</h2>
          <p className="text-muted-foreground">
            {completedArtworks.length} of {ARTWORKS.length} masterpieces collected
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full">
            <span className="text-sm text-muted-foreground">current level:</span>
            <span className="font-semibold text-foreground">{level}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-sm text-primary">{xp} xp</span>
          </div>
        </div>
      </header>

      {ARTWORKS.length === 0 ? (
        <Card className="p-8 text-center border-border bg-card hover-lift">
          <div className="text-6xl mb-4 animate-bounce">🖼️</div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">no artworks available</h3>
          <p className="text-muted-foreground mb-6">check back later for amazing art discoveries!</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {allLevels.map(levelNum => {
            const levelArtworks = artworksByLevel[levelNum] || [];
            const isLevelLocked = levelNum > level;
            const isLevelComplete = levelNum < level;
            const isCurrentLevel = levelNum === level;
            const hasArtworks = levelArtworks.length > 0;
            
            if (!hasArtworks && levelNum > Math.max(...ARTWORKS.map(a => a.level))) {
              return null;
            }

            return (
              <section key={levelNum} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className={cn(
                    "text-xl font-semibold transition-colors",
                    isLevelLocked ? "text-muted-foreground" : "text-foreground"
                  )}>
                    level {levelNum}
                  </h3>
                  {isLevelLocked && (
                    <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                      🔒 locked
                    </span>
                  )}
                  {isLevelComplete && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      ✓ complete
                    </span>
                  )}
                  {isCurrentLevel && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      🎯 current
                    </span>
                  )}
                </div>
                
                {hasArtworks ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {levelArtworks.map((artwork) => (
                      <ArtworkCard
                        key={artwork.id}
                        artwork={artwork}
                        isLocked={isLevelLocked}
                        isCollected={completedArtworks.includes(artwork.id)}
                        onSelect={openModal}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="p-6 text-center border-dashed border-border bg-card">
                    <div className="text-2xl mb-2">🎨</div>
                    <p className="text-sm text-muted-foreground">
                      {isLevelLocked ? 'artworks locked' : 'no artworks at this level'}
                    </p>
                  </Card>
                )}
              </section>
            );
          })}
        </div>
      )}

      {completedArtworks.length === 0 && (
        <Card className="p-8 text-center mt-8 border-border bg-card hover-lift">
          <div className="text-6xl mb-4 animate-bounce">🎯</div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">start your collection</h3>
          <p className="text-muted-foreground mb-6">complete quests to unlock and collect masterpieces!</p>
          <Button onClick={() => setCurrentView('dashboard')} className="hover:scale-105 transition-transform">
            start questing
          </Button>
        </Card>
      )}

      {/* Artwork Detail Modal using Clean Code Modal component */}
      <Modal 
        isOpen={!!selectedArtwork} 
        onClose={closeModal}
        showCloseButton={true}
        closeOnOverlayClick={true}
      >
        {selectedArtwork && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground pr-8">{selectedArtwork.title}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                by {selectedArtwork.artist} • {selectedArtwork.year} • {selectedArtwork.period}
              </CardDescription>
            </CardHeader>
            <CardContent className={SPACING.CARD_PADDING}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Artwork Image */}
                <div className="space-y-4">
                  <div className={`aspect-[3/2] border border-border ${BORDER_RADIUS.MEDIUM} overflow-hidden bg-background`}>
                    <img
                      src={selectedArtwork.svgPath}
                      alt={selectedArtwork.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500" />
                    collected at level {selectedArtwork.level}
                  </div>
                </div>
                
                {/* Artwork Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">about this artwork</h3>
                    <p className="text-muted-foreground">{selectedArtwork.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-foreground">artist:</span>
                      <p className="text-muted-foreground">{selectedArtwork.artist}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">year:</span>
                      <p className="text-muted-foreground">{selectedArtwork.year}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">period:</span>
                      <p className="text-muted-foreground">{selectedArtwork.period}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">level:</span>
                      <p className="text-muted-foreground">{selectedArtwork.level}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <Button 
                      onClick={() => setCurrentView('dashboard')}
                      className="w-full hover:scale-105 transition-transform"
                    >
                      continue questing
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Modal>
    </div>
  );
});

GalleryView.displayName = 'GalleryView';

export default GalleryView;