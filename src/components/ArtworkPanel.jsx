import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SvgArtwork from './SvgArtwork.jsx';

const ArtworkPanel = ({ currentArtwork, revealedPixels }) => (
  <div className="space-y-6">
    <div className="space-y-3">
      <div className="text-left">
        <h2 className="text-xl font-semibold text-foreground leading-tight mb-0">
          {currentArtwork?.title || 'loading...'}
        </h2>
        <div className="text-sm text-muted-foreground flex items-center gap-1 flex-wrap">
          <span className="artwork-prefix">by</span>
          <span className="artwork-separator">·</span>
          <span className="artwork-artist">{currentArtwork?.artist || 'unknown'}</span>
          <span className="artwork-separator">·</span>
          <span className="artwork-year">{currentArtwork?.year || '---'}</span>
          <span className="artwork-separator">·</span>
          <span className="artwork-description text-xs">{currentArtwork?.description || 'loading artwork...'}</span>
        </div>
      </div>
      
      <Card className="border-border bg-card shadow-sm rounded-2xl">
        <CardContent className="p-4">
          {console.log('🎨 Current artwork data:', currentArtwork)}
          <SvgArtwork 
            svgPath={currentArtwork?.svgPath} 
            revealedPixels={revealedPixels}
            title={currentArtwork?.title}
          />
        </CardContent>
      </Card>
    </div>

    <Card className="bg-muted/30 border-border/50 shadow-sm rounded-2xl">
      <CardContent className="p-4 text-center text-sm text-muted-foreground space-y-1">
        <p>🎯 complete quests to reveal artwork pixels</p>
        <p>⭐ higher difficulty = more xp = more pixels revealed</p>
        <p className="font-medium">🎨 discovering: {currentArtwork?.title || 'loading...'}</p>
      </CardContent>
    </Card>
  </div>
);

export default ArtworkPanel;