import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ mousePos, intensity = 1.0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool setup
    const particleCount = Math.min(Math.floor((width * height) / 18000), 70);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.2 - 0.15, // slight upward float
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      hue: Math.random() > 0.3 ? 40 : 210 // subtle warm gold or cool moonlight hue
    }));

    let currentMouseX = width / 2;
    let currentMouseY = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse parallax smooth interpolation
      const targetMouseX = mousePos?.x ?? width / 2;
      const targetMouseY = mousePos?.y ?? height / 2;
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      const parallaxX = (currentMouseX - width / 2) * 0.03;
      const parallaxY = (currentMouseY - height / 2) * 0.03;

      // Soft ambient light radial follow
      const lightGradient = ctx.createRadialGradient(
        currentMouseX,
        currentMouseY,
        10,
        currentMouseX,
        currentMouseY,
        width * 0.6
      );
      lightGradient.addColorStop(0, 'rgba(212, 175, 55, 0.04)');
      lightGradient.addColorStop(0.5, 'rgba(160, 180, 210, 0.02)');
      lightGradient.addColorStop(1, 'rgba(10, 10, 12, 0)');

      ctx.fillStyle = lightGradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += p.pulseSpeed;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = (Math.sin(p.pulse) * 0.2 + 0.3) * p.alpha * intensity;
        const renderX = p.x + parallaxX * (p.radius * 0.8);
        const renderY = p.y + parallaxY * (p.radius * 0.8);

        ctx.beginPath();
        ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
        
        if (p.hue === 40) {
          ctx.fillStyle = `rgba(230, 200, 140, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.3)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(190, 210, 240, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(190, 210, 240, 0.2)';
          ctx.shadowBlur = 6;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000"
    />
  );
}
