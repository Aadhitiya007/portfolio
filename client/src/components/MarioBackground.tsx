import React, { useEffect, useRef } from 'react';

interface MarioBackgroundProps {
  speed?: number;
}

const MarioBackground: React.FC<MarioBackgroundProps> = ({
  speed = 1
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

    // Mario world elements
    const clouds: {
      x: number;
      y: number;
      width: number;
      speed: number;
    }[] = [];
    
    const pipes: {
      x: number;
      y: number;
      height: number;
      width: number;
    }[] = [];
    
    const blocks: {
      x: number;
      y: number;
      type: 'brick' | 'question';
    }[] = [];
    
    const coins: {
      x: number;
      y: number;
      frame: number;
      maxFrame: number;
      floating: boolean;
      initialY: number;
    }[] = [];

    // Create initial clouds
    for (let i = 0; i < 8; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 120 + 20,
        width: Math.random() * 80 + 60,
        speed: (Math.random() * 0.5 + 0.1) * speed
      });
    }
    
    // Create pipes
    for (let i = 0; i < 5; i++) {
      pipes.push({
        x: Math.random() * canvas.width,
        y: canvas.height - Math.random() * 100 - 80,
        height: Math.random() * 100 + 80,
        width: 60
      });
    }
    
    // Create blocks
    for (let i = 0; i < 15; i++) {
      blocks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height - 200) + 100,
        type: Math.random() > 0.5 ? 'brick' : 'question'
      });
    }
    
    // Create coins
    for (let i = 0; i < 10; i++) {
      const y = Math.random() * (canvas.height - 200) + 100;
      coins.push({
        x: Math.random() * canvas.width,
        y,
        initialY: y,
        frame: Math.floor(Math.random() * 4),
        maxFrame: 4,
        floating: Math.random() > 0.5
      });
    }

    // Draw Mario world elements
    const drawCloud = (x: number, y: number, width: number) => {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x, y, width/3, 0, Math.PI * 2);
      ctx.arc(x + width/3, y - width/6, width/3, 0, Math.PI * 2);
      ctx.arc(x + width/1.5, y, width/3, 0, Math.PI * 2);
      ctx.fill();
    };
    
    const drawPipe = (x: number, y: number, height: number, width: number) => {
      // Pipe body (dark green)
      ctx.fillStyle = '#006400';
      ctx.fillRect(x, y, width, height);
      
      // Pipe highlight (lighter green)
      ctx.fillStyle = '#00AA00';
      ctx.fillRect(x, y, width * 0.8, height);
      
      // Pipe top
      ctx.fillStyle = '#006400';
      ctx.fillRect(x - 5, y, width + 10, 15);
      
      ctx.fillStyle = '#00AA00';
      ctx.fillRect(x - 5, y, (width + 10) * 0.8, 15);
    };
    
    const drawBrick = (x: number, y: number) => {
      ctx.fillStyle = '#B86F50';
      ctx.fillRect(x, y, 30, 30);
      
      // Brick details
      ctx.fillStyle = '#8C5642';
      ctx.fillRect(x, y + 10, 30, 3);
      ctx.fillRect(x, y + 20, 30, 3);
      ctx.fillRect(x + 15, y, 3, 30);
    };
    
    const drawQuestionBlock = (x: number, y: number, frame: number) => {
      // Yellow block
      ctx.fillStyle = '#E5BF00';
      ctx.fillRect(x, y, 30, 30);
      
      // Question mark
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px Arial';
      ctx.fillText('?', x + 10, y + 22);
      
      // Shine effect
      if (frame % 30 < 15) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.moveTo(x + 5, y + 5);
        ctx.lineTo(x + 10, y + 5);
        ctx.lineTo(x + 5, y + 10);
        ctx.fill();
      }
    };
    
    const drawCoin = (x: number, y: number, frame: number) => {
      ctx.fillStyle = '#FFD700';
      
      // Simulate coin rotation by changing width
      const widthAdjust = Math.abs(Math.sin(frame * 0.2)) * 20;
      
      // Ellipse for coin
      ctx.beginPath();
      ctx.ellipse(x + 15, y + 15, widthAdjust, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Shine effect
      ctx.fillStyle = '#FFF380';
      ctx.beginPath();
      ctx.ellipse(x + 15, y + 15, widthAdjust * 0.6, 9, 0, 0, Math.PI * 2);
      ctx.fill();
    };
    
    const drawGround = () => {
      // Ground fill
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
      
      // Ground pattern
      ctx.fillStyle = '#754C24';
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.fillRect(x, canvas.height - 40, 15, 20);
      }
    };

    // Animation frame counter
    let frameCount = 0;
    
    // Animation loop
    const animate = () => {
      frameCount++;
      
      // Clear canvas with sky blue background
      ctx.fillStyle = '#63C5DA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw clouds
      clouds.forEach(cloud => {
        drawCloud(cloud.x, cloud.y, cloud.width);
        cloud.x -= cloud.speed;
        
        // Reset cloud position when off screen
        if (cloud.x + cloud.width < 0) {
          cloud.x = canvas.width + cloud.width;
          cloud.y = Math.random() * 120 + 20;
        }
      });
      
      // Draw ground
      drawGround();
      
      // Draw pipes
      pipes.forEach(pipe => {
        drawPipe(pipe.x, pipe.y, pipe.height, pipe.width);
        
        // Move pipes for parallax effect
        pipe.x -= speed * 0.5;
        
        // Reset pipe position when off screen
        if (pipe.x + pipe.width < 0) {
          pipe.x = canvas.width;
          pipe.y = canvas.height - Math.random() * 100 - 80;
          pipe.height = Math.random() * 100 + 80;
        }
      });
      
      // Draw blocks
      blocks.forEach(block => {
        if (block.type === 'brick') {
          drawBrick(block.x, block.y);
        } else {
          drawQuestionBlock(block.x, block.y, frameCount);
        }
        
        // Move blocks for parallax effect
        block.x -= speed * 0.3;
        
        // Reset block position when off screen
        if (block.x + 30 < 0) {
          block.x = canvas.width;
          block.y = Math.random() * (canvas.height - 200) + 100;
          block.type = Math.random() > 0.5 ? 'brick' : 'question';
        }
      });
      
      // Draw coins
      coins.forEach(coin => {
        drawCoin(coin.x, coin.y, coin.frame);
        
        // Animate coin frame
        coin.frame = (coin.frame + 0.1) % coin.maxFrame;
        
        // Make coins float up and down
        if (coin.floating) {
          coin.y = coin.initialY + Math.sin(frameCount * 0.05) * 10;
        }
        
        // Move coins for parallax effect
        coin.x -= speed * 0.2;
        
        // Reset coin position when off screen
        if (coin.x + 30 < 0) {
          coin.x = canvas.width;
          coin.y = Math.random() * (canvas.height - 200) + 100;
          coin.initialY = coin.y;
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" 
    />
  );
};

export default MarioBackground;