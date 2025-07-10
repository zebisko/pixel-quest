import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SvgArtwork from './SvgArtwork.jsx';
import { SPACING } from '../constants/ui.js';

const ArtworkPanel = ({ currentArtwork, revealedPixels }) => (
  <div className="space-y-6">
    <div className="space-y-3">
      <div className={SPACING.LEFT_PADDING_SMALL}>
        <h2 className="text-lg font-semibold text-foreground mb-0">
          {currentArtwork?.title || 'loading...'}
        </h2>
        <p className="text-sm text-muted-foreground flex items-center gap-1 flex-wrap">
          <span className="artwork-prefix">by</span>
          <span className="artwork-separator">·</span>
          <span className="artwork-artist">{currentArtwork?.artist || 'unknown'}</span>
          <span className="artwork-separator">·</span>
          <span className="artwork-year">{currentArtwork?.year || '---'}</span>
          <span className="artwork-separator">·</span>
          <span className="artwork-description text-xs">{currentArtwork?.description || 'loading artwork...'}</span>
        </p>
      </div>
      
      <Card className="border-border bg-card shadow-sm rounded-2xl">
        <CardContent className="p-2">
          {console.log('🎨 Current artwork data:', currentArtwork)}
          <SvgArtwork 
            svgPath={currentArtwork?.svgPath} 
            revealedPixels={revealedPixels}
            title={currentArtwork?.title}
          />
        </CardContent>
      </Card>
    </div>
  </div>
);

export default ArtworkPanel;