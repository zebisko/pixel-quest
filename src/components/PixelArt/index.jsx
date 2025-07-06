import React, { useMemo } from 'react';
import { useGame } from '../../context/GameContext';
import ProgressBar from '../ProgressBar';
import './style.css';

const PixelArt = () => {
  const { currentArtwork, artworkProgress } = useGame();
  
  const gridSize = 25; // 25x25 grid
  const totalPixels = gridSize * gridSize;
  const pixelSize = 100 / gridSize; // Size as percentage for responsive design

  // Calculate pixel mask for revealed pixels
  const pixelMask = useMemo(() => {
    if (!currentArtwork || artworkProgress.percentage === 0) {
      return 'radial-gradient(circle at 0px 0px, transparent 0px, black 0px)';
    }
    
    const pixelsToReveal = Math.floor((artworkProgress.percentage / 100) * totalPixels);
    
    if (pixelsToReveal === 0) {
      return 'radial-gradient(circle at -100px -100px, transparent 1px, black 1px)';
    }
    
    const revealedPixels = new Set();
    
    // Generate random pixels (seeded for consistency)
    const random = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    // Use artwork ID as seed for consistent reveals
    const seed = currentArtwork.id || 1;
    
    while (revealedPixels.size < pixelsToReveal && revealedPixels.size < totalPixels) {
      const randomPixel = Math.floor(random(seed + revealedPixels.size) * totalPixels);
      revealedPixels.add(randomPixel);
    }
    
    const gradients = Array.from(revealedPixels).map(pixelIndex => {
      const row = Math.floor(pixelIndex / gridSize);
      const col = pixelIndex % gridSize;
      const x = (col * pixelSize) + (pixelSize / 2);
      const y = (row * pixelSize) + (pixelSize / 2);
      const radius = pixelSize * 0.4; // Slightly smaller than cell size for gap effect
      
      return `radial-gradient(circle at ${x}% ${y}%, transparent ${radius}%, black ${radius}%)`;
    });
    
    return gradients.join(', ');
  }, [currentArtwork, artworkProgress.percentage, totalPixels, pixelSize]);

  if (!currentArtwork) {
    return <div>Loading artwork...</div>;
  }

  return (
    <div className="pixel-art">
      <div className="artwork-container">
        <div className="artwork-header">
          <h2 className="artwork-title">{currentArtwork.name}</h2>
          <p className="artwork-artist">by {currentArtwork.artist}</p>
          <div className="artwork-progress">
            Completion: {Math.round(artworkProgress.percentage)}% 
            ({Math.round((artworkProgress.percentage / 100) * totalPixels)}/{totalPixels} pixels)
          </div>
        </div>
        
        <div className="artwork-display">
          {artworkProgress.percentage === 0 ? (
            <div className="artwork-placeholder">
              Complete quests to reveal artwork
            </div>
          ) : (
            <img
              src={`/artworks/${currentArtwork.filename}`}
              alt={currentArtwork.name}
              className="artwork-image"
              style={{
                mask: pixelMask,
                WebkitMask: pixelMask
              }}
            />
          )}
        </div>
        
        <div className="artwork-description">
          <p>{currentArtwork.description}</p>
        </div>
      </div>
      
      <div className="progress-container">
        <ProgressBar
          value={artworkProgress.current}
          max={artworkProgress.total}
          label={`${artworkProgress.current} / ${artworkProgress.total} pixels revealed`}
          showPercentage={false}
          color="primary"
          height={6}
          className="progress-rounded progress-glow"
        />
      </div>
    </div>
  );
};

export default PixelArt;
