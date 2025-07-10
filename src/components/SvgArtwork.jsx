import React, { useState, useEffect, useRef } from 'react';

const SvgArtwork = ({ svgPath, revealedPixels = [], title = "Artwork" }) => {
  const canvasRef = useRef(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  
  if (!svgPath) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-muted rounded-lg">
        <div className="text-muted-foreground">No artwork selected</div>
      </div>
    );
  }

  console.log('🖼️ SvgArtwork props:', { svgPath, title, revealedPixelsCount: revealedPixels.length });

  // Draw the SVG with pixel-based revelation
  useEffect(() => {
    const drawPixelRevealedSvg = async () => {
      const canvas = canvasRef.current;
      if (!canvas || !svgPath || !svgLoaded) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const gridSize = 25; // 25x25 pixel grid
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const pixelWidth = canvasWidth / gridSize;
      const pixelHeight = canvasHeight / gridSize;

      console.log('🎨 Drawing pixel-revealed SVG:', {
        artwork: title,
        revealedCount: revealedPixels.length,
        totalPixels: gridSize * gridSize,
        pixelSize: { width: pixelWidth, height: pixelHeight }
      });

      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Create an image from the SVG
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // Draw the full SVG to a temporary canvas
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvasWidth;
        tempCanvas.height = canvasHeight;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

        // Only draw revealed pixels
        revealedPixels.forEach(pixelPos => {
          const x = pixelPos % gridSize;
          const y = Math.floor(pixelPos / gridSize);
          
          const sourceX = x * pixelWidth;
          const sourceY = y * pixelHeight;
          
          // Copy this pixel area from the temp canvas to the main canvas
          const imageData = tempCtx.getImageData(sourceX, sourceY, pixelWidth, pixelHeight);
          ctx.putImageData(imageData, sourceX, sourceY);
        });

        console.log('✅ Pixel-revealed SVG drawn with', revealedPixels.length, 'revealed pixels');
      };
      
      img.onerror = () => {
        console.error('Failed to load SVG for pixel revelation');
      };
      
      img.src = svgPath;
    };

    drawPixelRevealedSvg();
  }, [svgPath, revealedPixels, title, svgLoaded]);

  return (
    <div className="relative w-full">
      {/* Hidden image to trigger onLoad */}
      <img
        src={svgPath}
        alt=""
        style={{ display: 'none' }}
        onLoad={() => setSvgLoaded(true)}
        onError={(e) => {
          console.error('Failed to load SVG image:', e.target.src);
        }}
      />
      
      {/* Canvas for pixel revelation */}
      <div 
        className="w-full border border-border rounded-xl overflow-hidden bg-muted"
        style={{ aspectRatio: '3/2' }}
      >
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full h-full"
          style={{ imageRendering: 'auto' }}
        />
      </div>
      
      {/* Overlay showing progress */}
      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
        {Math.round((revealedPixels.length / 625) * 100)}% revealed
      </div>
    </div>
  );
};

export default SvgArtwork;