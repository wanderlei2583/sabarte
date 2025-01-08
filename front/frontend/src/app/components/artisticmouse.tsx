"use client"

import { useEffect, useRef } from 'react';

type Trail = {
  x: number;
  y: number;
  alpha: number;
};

export default function ArtisticMouse() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return; // Garantimos que canvas não seja null.

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Verificação adicional para o contexto.

    const fadeInterval = 80; // Tempo entre cada redução de opacidade
    const fadeStep = 0.02; // Redução de opacidade por passo
    const trails: Trail[] = []; // Declaração do tipo de 'trails'.

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      trails.push({ x, y, alpha: 1 });
      trails.push({ x: x + 10, y: y + 10, alpha: 0.8 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trails.forEach((trail, index) => {
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 150, 255, ${trail.alpha})`;
        ctx.fill();
        trail.alpha -= fadeStep;
        if (trail.alpha <= 0) trails.splice(index, 1); // Remove traços com opacidade <= 0.
      });
    };

    const loop = () => {
      draw();
      requestAnimationFrame(loop);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    const fadeIntervalId = setInterval(draw, fadeInterval);
    loop();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      clearInterval(fadeIntervalId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
}

