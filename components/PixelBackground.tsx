'use client';

import { useEffect, useRef, useState } from 'react';

interface PixelWithTimeout extends HTMLDivElement {
  timeoutId?: NodeJS.Timeout;
}

export default function PixelBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<HTMLDivElement[]>([]);
  const timeoutMapRef = useRef<Map<HTMLDivElement, NodeJS.Timeout>>(new Map());
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || dimensions.width === 0) return;

    const isMobile = dimensions.width < 640;
    const pixelSize = isMobile ? 30 : 20;
    const cols = Math.ceil(dimensions.width / pixelSize);
    const rows = Math.ceil(dimensions.height / pixelSize);
    const blueColor = '#80ccff';

    // Clear existing pixels
    container.innerHTML = '';
    pixelsRef.current = [];

    // Create pixel grid - transparent by default
    for (let i = 0; i < rows * cols; i++) {
      const pixel = document.createElement('div');
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      pixel.style.width = `${pixelSize}px`;
      pixel.style.height = `${pixelSize}px`;
      pixel.style.gridColumn = `${col + 1}`;
      pixel.style.gridRow = `${row + 1}`;
      
      // Transparent by default - no background
      pixel.style.backgroundColor = 'transparent';
      pixel.style.transition = 'background-color 0.8s ease';
      pixel.style.cursor = 'default';

      pixelsRef.current.push(pixel);
      container.appendChild(pixel);
    }

    // Only enable streak effect on desktop (width > 1024px)
    const isDesktop = dimensions.width > 1024;
    
    // Mouse move handler for streak effect (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      if (x < 0 || y < 0 || x > dimensions.width || y > dimensions.height) return;
      
      const col = Math.floor(x / pixelSize);
      const row = Math.floor(y / pixelSize);
      const idx = row * cols + col;
      
      if (idx >= 0 && idx < pixelsRef.current.length) {
        const pixel = pixelsRef.current[idx];
        // Change to blue immediately
        pixel.style.transition = 'background-color 0.05s ease';
        pixel.style.backgroundColor = blueColor;
        
        // Clear any existing timeout for this pixel
        const existingTimeout = timeoutMapRef.current.get(pixel);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
        }
        
        // Fade back to transparent after delay
        const timeoutId = setTimeout(() => {
          pixel.style.transition = 'background-color 1s ease';
          pixel.style.backgroundColor = 'transparent';
          timeoutMapRef.current.delete(pixel);
        }, 300);
        
        timeoutMapRef.current.set(pixel, timeoutId);
      }
    };

    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (isDesktop) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      // Clear all timeouts
      timeoutMapRef.current.forEach((timeout) => {
        clearTimeout(timeout);
      });
      timeoutMapRef.current.clear();
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [dimensions]);

  const pixelSize = dimensions.width < 640 ? 30 : 20;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
      {/* Grid lines background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: `${pixelSize}px ${pixelSize}px`,
          pointerEvents: 'none',
        }}
        className="pixel-grid"
      />
      {/* Interactive pixels layer */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, ${pixelSize}px)`,
          gridAutoRows: `${pixelSize}px`,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

