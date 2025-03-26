import React, { useEffect, useRef } from 'react';

interface RetroBackgroundProps {
  density?: number;
  speed?: number;
  color?: string;
}

const RetroBackground: React.FC<RetroBackgroundProps> = ({
  density = 100,
  speed = 1,
  color = '#00FF00'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    // Create matrix particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      char: string;
      brightnessTick: number;
    }[] = [];
    
    // Binary, kanji-like and matrix-style characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンー\\/*-+|=@#$%&';
    
    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 12 + 8,
        speed: (Math.random() * 1.5 + 0.5) * speed,
        char: chars[Math.floor(Math.random() * chars.length)],
        brightnessTick: Math.random() * 100
      });
    }

    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        // Update brightness for pulsing effect
        p.brightnessTick += 0.01;
        const alpha = 0.5 + 0.5 * Math.sin(p.brightnessTick);
        
        // Draw character
        ctx.font = `${p.size}px monospace`;
        ctx.fillStyle = color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        ctx.fillText(p.char, p.x, p.y);
        
        // Move downward
        p.y += p.speed;
        
        // Reset when off screen
        if (p.y > canvas.height) {
          p.y = -p.size;
          p.x = Math.random() * canvas.width;
          p.char = chars[Math.floor(Math.random() * chars.length)];
        }
        
        // Randomly change character sometimes
        if (Math.random() < 0.003) {
          p.char = chars[Math.floor(Math.random() * chars.length)];
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed, color]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" 
    />
  );
};

export default RetroBackground;