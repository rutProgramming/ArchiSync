import React, { useState, useRef, useEffect } from "react";
import "./Workspace.css";

const Workspace = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#FFD700");
  const [lineWidth, setLineWidth] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (uploadedImage) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.src = uploadedImage;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        ctxRef.current = ctx;
      };
    }
  }, [uploadedImage, brightness, contrast]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (!uploadedImage) return;
    setTimeout(() => {
      setGeneratedImage(uploadedImage);
    }, 2000);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!uploadedImage || !ctxRef.current || !canvasRef.current) return;
    setDrawing(true);

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const rect = canvas.getBoundingClientRect();

    // חישוב קנה המידה של התמונה ב-Canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // תיקון המיקום לפי קנה המידה
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
};

const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !uploadedImage || !ctxRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const rect = canvas.getBoundingClientRect();

    // חישוב קנה המידה של התמונה ב-Canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // תיקון המיקום לפי קנה המידה
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.strokeStyle = isErasing ? "#FFFFFF" : color;
    ctx.lineWidth = isErasing ? 20 : lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
};



  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    if (!uploadedImage || !ctxRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = uploadedImage;
    img.onload = () => {
      ctxRef.current?.drawImage(img, 0, 0, img.width, img.height);
    };
  };

  return (
    <div className="workspace-container">
      <div className="image-section">
        <div className="image-preview">
          {uploadedImage ? (
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{ backgroundColor: "#f5f5f5", border: "2px solid #ccc" }}
            />
          ) : (
            <div className="placeholder">Upload an image to start</div>
          )}
        </div>

        <div className="image-preview">
          {generatedImage ? (
            <img src={generatedImage} alt="Generated" className="output-image" />
          ) : (
            <div className="placeholder">Generated image will appear here</div>
          )}
        </div>
      </div>

      <div className="controls">
        <input type="file" onChange={handleImageUpload} accept="image/*" />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your design..."
        />

        <div className="tools">
          <label>Color:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

          <label>Line Width:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
          />

          <button className="custom-btn clear-btn" onClick={clearCanvas}>Clear</button>
          <button className="custom-btn erase-btn" onClick={() => setIsErasing(!isErasing)}>
            {isErasing ? "🖌️ Draw" : "🧽 Erase"}
          </button>

          <label>Brightness:</label>
          <input
            type="range"
            min="50"
            max="150"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
          />

          <label>Contrast:</label>
          <input
            type="range"
            min="50"
            max="150"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
          />
        </div>

        <button className="custom-btn generate-btn" onClick={handleGenerate}>Generate</button>
      </div>
    </div>
  );
};

export default Workspace;
