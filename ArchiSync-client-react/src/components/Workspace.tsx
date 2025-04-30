// import React, { useState, useRef, useEffect } from "react";
// import "../Style/Workspace.css";
// import { v4 as uuidv4 } from "uuid";
// import { generateImage, getDownloadUrl, getUploadUrl, uploadFileToS3 } from "../Services/uploadService";
// import { useParams } from "react-router";
// import { Button, Stack, TextField } from "@mui/material";
// import { Download, Save } from "@mui/icons-material";

// const Workspace = () => {
//   const url = import.meta.env.VITE_BASE_URL
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [generatedImage, setGeneratedImage] = useState<string | null>(null);
//   const [description, setDescription] = useState("");
//   const [drawing, setDrawing] = useState(false);
//   const [color, setColor] = useState("#FFD700");
//   const [lineWidth, setLineWidth] = useState(5);
//   const [isErasing, setIsErasing] = useState(false);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const { projectId, projectName } = useParams<{ projectId: string; projectName: string }>();
//   const [replicateLoading, setReplicateLoading] = useState(false);
//   useEffect(() => {
//     if (uploadedImage) {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       const img = new Image();
//       img.src = uploadedImage;
//       img.onload = () => {
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0, img.width, img.height);
//         ctxRef.current = ctx;
//       };
//     }
//   }, [uploadedImage]);

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => setUploadedImage(reader.result as string);
//       reader.readAsDataURL(file);
//     } else {
//       alert("Please upload a valid image file.");
//     }
//   };

//   const handleGenerate = async () => {
//     if (!uploadedImage || !projectId || !projectName) return;

//     try {
//       setIsUploading(true);
//       setProgress(0);
//       setReplicateLoading(true);

//       const response = await fetch(uploadedImage);
//       const blob = await response.blob();
//       const file = new File([blob], "generated_image.png", { type: "image/png" });

//       const uniqueFileName = `${uuidv4()}_${file.name}`;
//       const updatedFile = new File([file], uniqueFileName, { type: file.type });

//       const uploadUrl = await getUploadUrl(projectId, projectName, updatedFile.name, updatedFile.type);
//       await uploadFileToS3(uploadUrl, updatedFile, setProgress);
//       const downloadResponse = await getDownloadUrl(parseInt(projectId), projectName, updatedFile.name);
//       setIsUploading(false);

//       console.log(downloadResponse);
//       var res=await generateImage(downloadResponse, description);
//     console.log(res);
//     setGeneratedImage(res.imageUrl);
//     setReplicateLoading(false);

//     } catch (error) {
//       console.error("Error uploading image:", error);
//     } finally {
//       setIsUploading(false);
//       setReplicateLoading(false);
//       setDescription("");
//     }
//   };

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!uploadedImage || !ctxRef.current || !canvasRef.current) return;
//     setDrawing(true);

//     const canvas = canvasRef.current;
//     const ctx = ctxRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     const x = (e.clientX - rect.left) * scaleX;
//     const y = (e.clientY - rect.top) * scaleY;

//     ctx.beginPath();
//     ctx.moveTo(x, y);
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!drawing || !uploadedImage || !ctxRef.current || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = ctxRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     const x = (e.clientX - rect.left) * scaleX;
//     const y = (e.clientY - rect.top) * scaleY;

//     ctx.lineTo(x, y);
//     ctx.strokeStyle = isErasing ? "#FFFFFF" : color;
//     ctx.lineWidth = isErasing ? 20 : lineWidth;
//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.moveTo(x, y);
//   };

//   const stopDrawing = () => setDrawing(false);

//   const clearCanvas = () => {
//     if (!uploadedImage || !ctxRef.current || !canvasRef.current) return;
//     const canvas = canvasRef.current;
//     ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   const editedImage = () => {
//     if (!canvasRef.current) return;
//     const canvas = canvasRef.current;
//     const imageData = canvas.toDataURL("image/png");
//     return imageData;
//   };
//   const saveCanvas = () => {
//     const imageData = editedImage();
//     if (!imageData) return;
//     setUploadedImage(imageData);
//   }
//   const downloadImage = () => {
//     const imageData = editedImage();
//     if (!imageData) return;
//     const link = document.createElement("a");
//     link.href = imageData;
//     link.download = "sketch.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
//   return (
//     <div className="workspace-container">
//       <div className="image-section">
//         <div className="image-preview">
//           {uploadedImage ? (
//             <canvas
//               ref={canvasRef}
//               onMouseDown={startDrawing}
//               onMouseMove={draw}
//               onMouseUp={stopDrawing}
//               onMouseLeave={stopDrawing}
//               className="canvas-style"
//             />
//           ) : (<>
//             <input type="file" onChange={handleImageUpload} className="upload-input" />
//             <p style={{ color: "#F1C40F" }}>{uploadedImage ? uploadedImage : "Upload an image to start"}</p>

//           </>)}

//         </div>
//         <div className="image-preview">
//             {replicateLoading ? (
//             <div  className="process">
//               Your generated image is ready! It took just a few minutes to process. You can view and download it using the link below:
//             </div>
//             ) : (
//             generatedImage ? (
//               <img src={generatedImage} alt="Generated" className="output-image" />
//             ) : (
//               <div className="placeholder">Generated image will appear here</div>
//             )
//             )}

//           </div>
//       </div>


//       <Stack direction="row" className="controls">
//         <Button color="inherit" onClick={saveCanvas}>
//           <Save /> Save Changes
//         </Button>
//         <Button color="inherit" onClick={downloadImage}>
//           <Download /> Download
//         </Button>
//       </Stack>

//       <Stack direction="row" className="controls">
//         <label>Color:</label>
//         <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
//         <label>Line Width:</label>
//         <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))}  />
//         <Button color="inherit" onClick={clearCanvas}>Clear</Button>
//         <Button color="inherit" onClick={() => setIsErasing(!isErasing)}>{isErasing ? "Draw" : "Erase"}</Button>
//       </Stack>
//       <Stack direction="row" className="controls">
//         <TextField
//           label="Describe your design..."
//           variant="outlined"
//           value={description}
//           required
//           rows={3}
//           onChange={(e) => setDescription(e.target.value)}
//           helperText={"The more detailed the description, the better the generated image will be."}
//           className={`custom-input`}
//         />
//         <Button color="inherit" onClick={handleGenerate}>Generate</Button>
//         {isUploading && (
//           <div className="progress-container">
//             <progress value={progress} max="100"></progress>
//             <span>{progress}%</span>
//           </div>
//         )}
//       </Stack>
//     </div>

//   );
// };

// export default Workspace;

import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { generateImage, getDownloadUrl, getUploadUrl, uploadFileToS3 } from "../Services/uploadService";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField, Stack } from "@mui/material";
import { useParams } from "react-router";

const Workspace = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [connectionId, setConnectionId] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { projectId, projectName } = useParams<{ projectId: string; projectName: string }>();

  // התחברות ל־SignalR
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_BASE_URL}/sketchhub`)
      .withAutomaticReconnect()
      .build();
  
    newConnection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");
        setConnection(newConnection);
  
        // ⬅️ פה את מקבלת את התמונה מהשרת
        newConnection.on("SketchCompleted", (data: { outputUrl: string }) => {
          console.log("Image received from SignalR:", data.outputUrl);
          setGeneratedImage(data.outputUrl);
        });
  
        // אפשר גם לקבל את ה־connectionId אם השרת שולח אותו
        newConnection.invoke("GetConnectionId").then((id) => {
          setConnectionId(id);
          console.log("Connection ID:", id);
        }).catch(err => console.error(err));
      })
      .catch((error) => {
        console.error("SignalR connection error:", error);
      });
  }, []);
  

  // העלאת תמונה ושליחת בקשה לשרת
  const handleGenerate = async () => {
    if (!uploadedImage || !projectId || !projectName || !connectionId) return;

    try {
      setIsUploading(true);
      setProgress(0);

      const blob = await (await fetch(uploadedImage)).blob();
      const file = new File([blob], "sketch.png", { type: "image/png" });

      const uniqueFileName = `${uuidv4()}_${file.name}`;
      const updatedFile = new File([file], uniqueFileName, { type: file.type });

      // קבלת כתובת העלאה
      const uploadUrl = await getUploadUrl(projectId, projectName, updatedFile.name, updatedFile.type);
      await uploadFileToS3(uploadUrl, updatedFile, setProgress);

      // קבלת כתובת הורדה
      const downloadUrl = await getDownloadUrl(parseInt(projectId), projectName, updatedFile.name);

      // שליחת הבקשה לשרת עם connectionId
      await generateImage(downloadUrl, description, connectionId);
    } catch (err) {
      console.error("Error during image generation:", err);
    }
  };

  // העלאת קובץ
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadedImage && <img src={uploadedImage} alt="Sketch" style={{ maxWidth: "400px" }} />}

      <Stack spacing={2} mt={2}>
        <TextField
          label="Describe your design"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleGenerate} disabled={isUploading}>Generate</Button>
        {isUploading && (
          <div>
            <progress value={progress} max="100" />
            <span>{progress}%</span>
          </div>
        )}
      </Stack>

      {generatedImage && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Generated Image:</h3>
          <img src={generatedImage} alt="Generated" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default Workspace;
