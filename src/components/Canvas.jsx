import React, { useRef, useEffect } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const w = document.body.offsetWidth;
  const h = document.body.offsetWidth;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
  }, []);

  return (
    <div className="bg-black w-full h-full -z-20 relative">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
