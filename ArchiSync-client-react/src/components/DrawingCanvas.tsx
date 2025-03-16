import React, { useRef, useEffect } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black"; // צבע רקע ראשוני
    ctx.fillRect(0, 0, canvas.width, canvas.height);

  }, []);

  return (
    <canvas ref={canvasRef} width={800} height={600} style={{ border: "1px solid yellow" }} />
  );
};

export default DrawingCanvas;
