import React, { useEffect, useRef } from 'react';

export default function BackgroundHeadSection({ speed = 60, intensity = 0.35 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let lastTime = 0;
    
    const chars = '01';
    const fontSize = 18;
    
    const brandColorBase = 'rgba(24, 118, 242,';

    let gridRows = 0;
    let gridCols = 0;
    let gridData = []; 

    const initializeGridData = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;

      gridCols = Math.ceil(canvas.width / fontSize);
      gridRows = Math.ceil(canvas.height / (fontSize * 1.2));

      // Reset data
      gridData = [];
      const totalChars = gridCols * gridRows;

      for (let i = 0; i < totalChars; i++) {
        gridData.push({
          char: chars.charAt(Math.floor(Math.random() * chars.length)), 
          opacityOffset: Math.random() * Math.PI * 2 
        });
      }
    };

    const resizeHandler = () => {
      initializeGridData();
    };

    initializeGridData();
    window.addEventListener('resize', resizeHandler);

    const draw = (currentTime) => {
      animationFrameId = requestAnimationFrame(draw);

      if (currentTime - lastTime < speed) return;
      lastTime = currentTime;

      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const parent = canvas.parentElement;
      if (!parent) return;

      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const index = row * gridCols + col;
          const charItem = gridData[index];
          if (!charItem) continue;

          const timeFactor = currentTime * 0.003; 
          const pulse = (Math.sin(timeFactor + charItem.opacityOffset) + 1) / 2;
          const calculatedOpacity = pulse * intensity; 

          ctx.fillStyle = `${brandColorBase} ${calculatedOpacity})`;

          ctx.fillText(
            charItem.char,
            (col * fontSize) + (fontSize / 2),
            (row * fontSize * 1.2) + (fontSize / 2) 
          );
        }
      }
    };

    draw(0); // Start the loop

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, intensity]);

  return <canvas ref={canvasRef} className="binary-canvas" style={{ mixBlendMode: 'multiply' }}/>;
}