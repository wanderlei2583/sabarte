"use client";

import { useEffect, useRef } from "react";

type Trail = {
  x: number;
  y: number;
  alpha: number;
};

export default function ArtisticMouse() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fadeInterval = 50; // Intervalo para atualização do fade
    const fadeStep = 0.02; // Suaviza o fade (menor = mais suave)
    const trails: Trail[] = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      trails.push({ x, y, alpha: 1 }); // Adiciona nova posição ao rastro
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (trails.length < 2) return; // Precisa de pelo menos dois pontos para desenhar uma linha

      ctx.beginPath();
      ctx.moveTo(trails[0].x, trails[0].y); // Começa no primeiro ponto
      trails.forEach((trail, index) => {
        if (index > 0) ctx.lineTo(trail.x, trail.y); // Conecta os pontos
        trail.alpha -= fadeStep; // Reduz opacidade
        if (trail.alpha <= 0) trails.splice(index, 1); // Remove trilhas invisíveis
      });

      ctx.strokeStyle = "rgba(0, 150, 255, 0.5)"; // Define cor da linha
      ctx.lineWidth = 8; // Define largura da linha
      ctx.lineCap = "round"; // Final arredondado
      ctx.stroke();
    };

    const loop = () => {
      draw();
      requestAnimationFrame(loop);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    loop();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}

