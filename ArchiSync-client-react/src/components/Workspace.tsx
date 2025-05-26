// // // import React, { useState, useRef, useEffect } from "react";
// // // import "../Style/Workspace.css";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { generateImage, getDownloadUrl, getUploadUrl, uploadFileToS3 } from "../Services/uploadService";
// // // import { useParams } from "react-router";
// // // import { Button, Stack, TextField } from "@mui/material";
// // // import { Download, Save } from "@mui/icons-material";

// // // const Workspace = () => {
// // //   const url = import.meta.env.VITE_BASE_URL
// // //   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
// // //   const [generatedImage, setGeneratedImage] = useState<string | null>(null);
// // //   const [description, setDescription] = useState("");
// // //   const [drawing, setDrawing] = useState(false);
// // //   const [color, setColor] = useState("#FFD700");
// // //   const [lineWidth, setLineWidth] = useState(5);
// // //   const [isErasing, setIsErasing] = useState(false);
// // //   const canvasRef = useRef<HTMLCanvasElement | null>(null);
// // //   const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
// // //   const [progress, setProgress] = useState(0);
// // //   const [isUploading, setIsUploading] = useState(false);
// // //   const { projectId, projectName } = useParams<{ projectId: string; projectName: string }>();
// // //   const [replicateLoading, setReplicateLoading] = useState(false);
// // //   useEffect(() => {
// // //     if (uploadedImage) {
// // //       const canvas = canvasRef.current;
// // //       if (!canvas) return;
// // //       const ctx = canvas.getContext("2d");
// // //       if (!ctx) return;

// // //       const img = new Image();
// // //       img.src = uploadedImage;
// // //       img.onload = () => {
// // //         canvas.width = img.width;
// // //         canvas.height = img.height;
// // //         ctx.drawImage(img, 0, 0, img.width, img.height);
// // //         ctxRef.current = ctx;
// // //       };
// // //     }
// // //   }, [uploadedImage]);

// // //   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = event.target.files?.[0];
// // //     if (file && file.type.startsWith("image/")) {
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => setUploadedImage(reader.result as string);
// // //       reader.readAsDataURL(file);
// // //     } else {
// // //       alert("Please upload a valid image file.");
// // //     }
// // //   };

// // //   const handleGenerate = async () => {
// // //     if (!uploadedImage || !projectId || !projectName) return;

// // //     try {
// // //       setIsUploading(true);
// // //       setProgress(0);
// // //       setReplicateLoading(true);

// // //       const response = await fetch(uploadedImage);
// // //       const blob = await response.blob();
// // //       const file = new File([blob], "generated_image.png", { type: "image/png" });

// // //       const uniqueFileName = `${uuidv4()}_${file.name}`;
// // //       const updatedFile = new File([file], uniqueFileName, { type: file.type });

// // //       const uploadUrl = await getUploadUrl(projectId, projectName, updatedFile.name, updatedFile.type);
// // //       await uploadFileToS3(uploadUrl, updatedFile, setProgress);
// // //       const downloadResponse = await getDownloadUrl(parseInt(projectId), projectName, updatedFile.name);
// // //       setIsUploading(false);

// // //       console.log(downloadResponse);
// // //       var res=await generateImage(downloadResponse, description);
// // //     console.log(res);
// // //     setGeneratedImage(res.imageUrl);
// // //     setReplicateLoading(false);

// // //     } catch (error) {
// // //       console.error("Error uploading image:", error);
// // //     } finally {
// // //       setIsUploading(false);
// // //       setReplicateLoading(false);
// // //       setDescription("");
// // //     }
// // //   };

// // //   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
// // //     if (!uploadedImage || !ctxRef.current || !canvasRef.current) return;
// // //     setDrawing(true);

// // //     const canvas = canvasRef.current;
// // //     const ctx = ctxRef.current;
// // //     const rect = canvas.getBoundingClientRect();
// // //     const scaleX = canvas.width / rect.width;
// // //     const scaleY = canvas.height / rect.height;
// // //     const x = (e.clientX - rect.left) * scaleX;
// // //     const y = (e.clientY - rect.top) * scaleY;

// // //     ctx.beginPath();
// // //     ctx.moveTo(x, y);
// // //   };

// // //   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
// // //     if (!drawing || !uploadedImage || !ctxRef.current || !canvasRef.current) return;

// // //     const canvas = canvasRef.current;
// // //     const ctx = ctxRef.current;
// // //     const rect = canvas.getBoundingClientRect();
// // //     const scaleX = canvas.width / rect.width;
// // //     const scaleY = canvas.height / rect.height;
// // //     const x = (e.clientX - rect.left) * scaleX;
// // //     const y = (e.clientY - rect.top) * scaleY;

// // //     ctx.lineTo(x, y);
// // //     ctx.strokeStyle = isErasing ? "#FFFFFF" : color;
// // //     ctx.lineWidth = isErasing ? 20 : lineWidth;
// // //     ctx.lineCap = "round";
// // //     ctx.lineJoin = "round";
// // //     ctx.stroke();

// // //     ctx.beginPath();
// // //     ctx.moveTo(x, y);
// // //   };

// // //   const stopDrawing = () => setDrawing(false);

// // //   const clearCanvas = () => {
// // //     if (!uploadedImage || !ctxRef.current || !canvasRef.current) return;
// // //     const canvas = canvasRef.current;
// // //     ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
// // //   };

// // //   const editedImage = () => {
// // //     if (!canvasRef.current) return;
// // //     const canvas = canvasRef.current;
// // //     const imageData = canvas.toDataURL("image/png");
// // //     return imageData;
// // //   };
// // //   const saveCanvas = () => {
// // //     const imageData = editedImage();
// // //     if (!imageData) return;
// // //     setUploadedImage(imageData);
// // //   }
// // //   const downloadImage = () => {
// // //     const imageData = editedImage();
// // //     if (!imageData) return;
// // //     const link = document.createElement("a");
// // //     link.href = imageData;
// // //     link.download = "sketch.png";
// // //     document.body.appendChild(link);
// // //     link.click();
// // //     document.body.removeChild(link);
// // //   }
// // //   return (
// // //     <div className="workspace-container">
// // //       <div className="image-section">
// // //         <div className="image-preview">
// // //           {uploadedImage ? (
// // //             <canvas
// // //               ref={canvasRef}
// // //               onMouseDown={startDrawing}
// // //               onMouseMove={draw}
// // //               onMouseUp={stopDrawing}
// // //               onMouseLeave={stopDrawing}
// // //               className="canvas-style"
// // //             />
// // //           ) : (<>
// // //             <input type="file" onChange={handleImageUpload} className="upload-input" />
// // //             <p style={{ color: "#F1C40F" }}>{uploadedImage ? uploadedImage : "Upload an image to start"}</p>

// // //           </>)}

// // //         </div>
// // //         <div className="image-preview">
// // //             {replicateLoading ? (
// // //             <div  className="process">
// // //               Your generated image is ready! It took just a few minutes to process. You can view and download it using the link below:
// // //             </div>
// // //             ) : (
// // //             generatedImage ? (
// // //               <img src={generatedImage} alt="Generated" className="output-image" />
// // //             ) : (
// // //               <div className="placeholder">Generated image will appear here</div>
// // //             )
// // //             )}

// // //           </div>
// // //       </div>


// // //       <Stack direction="row" className="controls">
// // //         <Button color="inherit" onClick={saveCanvas}>
// // //           <Save /> Save Changes
// // //         </Button>
// // //         <Button color="inherit" onClick={downloadImage}>
// // //           <Download /> Download
// // //         </Button>
// // //       </Stack>

// // //       <Stack direction="row" className="controls">
// // //         <label>Color:</label>
// // //         <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
// // //         <label>Line Width:</label>
// // //         <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))}  />
// // //         <Button color="inherit" onClick={clearCanvas}>Clear</Button>
// // //         <Button color="inherit" onClick={() => setIsErasing(!isErasing)}>{isErasing ? "Draw" : "Erase"}</Button>
// // //       </Stack>
// // //       <Stack direction="row" className="controls">
// // //         <TextField
// // //           label="Describe your design..."
// // //           variant="outlined"
// // //           value={description}
// // //           required
// // //           rows={3}
// // //           onChange={(e) => setDescription(e.target.value)}
// // //           helperText={"The more detailed the description, the better the generated image will be."}
// // //           className={`custom-input`}
// // //         />
// // //         <Button color="inherit" onClick={handleGenerate}>Generate</Button>
// // //         {isUploading && (
// // //           <div className="progress-container">
// // //             <progress value={progress} max="100"></progress>
// // //             <span>{progress}%</span>
// // //           </div>
// // //         )}
// // //       </Stack>
// // //     </div>

// // //   );
// // // };

// // // export default Workspace;

// // import React, { useEffect, useState } from "react";
// // import * as signalR from "@microsoft/signalr";
// // import { generateImage, getDownloadUrl, getUploadUrl, uploadFileToS3 } from "../Services/uploadService";
// // import { v4 as uuidv4 } from "uuid";
// // import { Button, TextField, Stack } from "@mui/material";
// // import { useParams } from "react-router";
// // import { addFile } from "../store/File";
// // import { useDispatch, useSelector } from "react-redux";
// // import { AppDispatch, RootState } from "../store/reduxStore";

// // const Workspace = () => {
// //   const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
// //   const [connectionId, setConnectionId] = useState<string>("");
// //   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
// //   const [generatedImage, setGeneratedImage] = useState<string | null>(null);
// //   const [description, setDescription] = useState("");
// //   const [progress, setProgress] = useState(0);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const { projectId, projectName } = useParams<{ projectId: string; projectName: string }>();
// //   const [file, setFile] = useState<File | null>(null);
// //   const [uniqueFileName, setUniqueFileName] = useState<string|null>(null);
// //   const dispatch: AppDispatch = useDispatch();
// //     const user = useSelector((state: RootState) => state.connect.user);
  
// //   // התחברות ל־SignalR
// //   useEffect(() => {
// //     const newConnection = new signalR.HubConnectionBuilder()
// //       .withUrl(`${import.meta.env.VITE_BASE_URL}/sketchhub`)
// //       .withAutomaticReconnect()
// //       .build();
  
// //     newConnection
// //       .start()
// //       .then(() => {
// //         console.log("Connected to SignalR hub");
// //         setConnection(newConnection);
  
// //         // ⬅️ פה את מקבלת את התמונה מהשרת
// //         newConnection.on("SketchCompleted", (data: { outputUrl: string }) => {
// //           console.log("Image received from SignalR:", data.outputUrl,data);
// //           setGeneratedImage(data.outputUrl);
// //         });
  
// //         // אפשר גם לקבל את ה־connectionId אם השרת שולח אותו
// //         newConnection.invoke("GetConnectionId").then((id) => {
// //           setConnectionId(id);
// //           console.log("Connection ID:", id);
// //         }).catch(err => console.error(err));
// //       })
// //       .catch((error) => {
// //         console.error("SignalR connection error:", error);
// //       });
// //   }, []);
  

// //   // העלאת תמונה ושליחת בקשה לשרת
// //   const handleGenerate = async () => {
// //     if (!uploadedImage || !projectId || !projectName || !connectionId) return;
// //     debugger
// //     try {
// //       setIsUploading(true);
// //       setProgress(0);

// //       const blob = await (await fetch(uploadedImage)).blob();
// //       const file = new File([blob],"fefe", { type: "image/png" });
// //       const k=`${uuidv4()}_${file.name}`;
// //       setUniqueFileName(k);
// //       const updatedFile = new File([file], k, { type: "image/png" });

// //       // קבלת כתובת העלאה
// //       const uploadUrl = await getUploadUrl(projectId, projectName, updatedFile.name, updatedFile.type);
// //       await uploadFileToS3(uploadUrl, updatedFile, setProgress);

// //       // קבלת כתובת הורדה
// //       const downloadUrl = await getDownloadUrl(parseInt(projectId), projectName, updatedFile.name);
// //       console.log("Download URL:", downloadUrl);
// //       const fileServer = {
// //         fileName: file.name,
// //         fileType: file.type,
// //         ownerId: user.userId,
// //         projectId: parseInt(projectId),
// //         s3Key: `users/${projectId}/${projectName}/${file.name}`,
// //         size: file.size,
// //       };
// //       const res=await dispatch(addFile(fileServer))
// //       // שליחת הבקשה לשרת עם connectionId
// //       await generateImage(downloadUrl, description, connectionId);
// //     } catch (err) {
// //       console.error("Error during image generation:", err);
// //     }
// //   };

// //   // העלאת קובץ
// //   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     debugger
// //     const file = event.target.files?.[0];
// //     console.log(file)
// //     setFile(file!);
// //     if (file && file.type.startsWith("image/")) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => setUploadedImage(reader.result as string);
// //       reader.readAsDataURL(file);
// //     } else {
// //       alert("Please upload a valid image file.");
// //     }
// //   };
// //   const downloadAi = () => {

// //     if (!generatedImage) return;
// //     fetch(generatedImage)
// //     .then(response => {
// //         response.blob().then(blob => {
// //             let url = window.URL.createObjectURL(blob);
// //             let a = document.createElement('a');
// //             a.href = url;
// //             a.download = `${uniqueFileName}_ai`;
// //             a.click();
// //             a.remove();
// //         });
// //     });}

// //   const saveAI = async () => {
// //     if (!generatedImage || !projectId || !projectName) {
// //       alert("Generated image or project info is missing.");
// //       return;
// //     }
  
// //     try {
// //       setIsUploading(true);
// //       setProgress(0);
// //       console.log(generatedImage)
// //       const response = await fetch(generatedImage);
// //       // שלב 1: הורדת התמונה מ-URL כ-Blob
// //       const blob = await response.blob();
  
// //       // שלב 2: יצירת File מה-Blob
// //       const fileName = `${uniqueFileName}_ai`;
// //       const file = new File([blob], fileName, { type: "image/png" });
  
// //       // שלב 3: קבלת URL להעלאה
// //       const uploadUrl = await getUploadUrl(projectId, projectName, file.name, file.type);
  
// //       // שלב 4: העלאה ל-S3
// //       await uploadFileToS3(uploadUrl, file, setProgress);
  
// //       // שלב 5: קבלת URL לצפייה בקובץ (אם צריך)
// //       const downloadUrl = await getDownloadUrl(parseInt(projectId), projectName, file.name);
  
// //       console.log("AI image saved to AWS:", downloadUrl);
// //       alert("AI image uploaded successfully.");
// //       const fileServer = {
// //         fileName: file.name+`_ai`,
// //         fileType: file.type,
// //         ownerId: user.userId,
// //         projectId: parseInt(projectId),
// //         s3Key: `users/${projectId}/${projectName}/${file.name+`_ai`}`,
// //         size: file.size,
// //       };
// //       const res=await dispatch(addFile(fileServer))
// //       console.log(res)
  
// //     } catch (error) {
// //       console.error("Error uploading AI image:", error);
// //       alert("Failed to upload AI image.");
// //     } finally {
// //       setIsUploading(false);
// //     }
// //   };
  
// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <input type="file" accept="image/*" onChange={handleImageUpload} />
// //       {uploadedImage && <img src={uploadedImage} alt="Sketch" style={{ maxWidth: "400px" }} />}

// //       <Stack spacing={2} mt={2}>
// //         <TextField
// //           label="Describe your design"
// //           variant="outlined"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //         />
// //         <Button onClick={handleGenerate} disabled={isUploading}>Generate</Button>
// //         {isUploading && (
// //           <div>
// //             <progress value={progress} max="100" />
// //             <span>{progress}%</span>
// //           </div>
// //         )}
// //       </Stack>

// //       {generatedImage && (
// //         <div style={{ marginTop: "2rem" }}>
// //           <h3>Generated Image:</h3>
// //           <img src={generatedImage} alt="Generated" style={{ maxWidth: "100%" }} />
// //             <Button variant="contained" color="primary" onClick={downloadAi}>Download</Button>
// //             <Button variant="contained" color="primary" onClick={saveAI}>save</Button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Workspace;






// import React, { useEffect, useRef, useState } from "react";
// import * as signalR from "@microsoft/signalr";
// import { v4 as uuidv4 } from "uuid";
// import { Button, TextField, Stack } from "@mui/material";
// import { useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";

// import { getUploadUrl, uploadFileToS3, getDownloadUrl, generateImage } from "../Services/uploadService";
// import { addFile } from "../store/File";
// import { AppDispatch, RootState } from "../store/reduxStore";

// const Workspace = () => {
//   const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
//   const [connectionId, setConnectionId] = useState<string>("");
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [generatedImage, setGeneratedImage] = useState<string | null>(null);
//   const [description, setDescription] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const uniqueNameRef = useRef<string | null>(null);

//   const { projectId, projectName } = useParams<{ projectId: string; projectName: string }>();
//   const dispatch: AppDispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.connect.user);

//   // SignalR חיבור ל-
//   useEffect(() => {
//     const newConnection = new signalR.HubConnectionBuilder()
//       .withUrl(`${import.meta.env.VITE_BASE_URL}/sketchhub`)
//       .withAutomaticReconnect()
//       .build();

//     newConnection
//       .start()
//       .then(() => {
//         console.log("Connected to SignalR hub");
//         setConnection(newConnection);

//         newConnection.on("SketchCompleted", (data: { outputUrl: string }) => {
//           console.log("Image received from SignalR:", data.outputUrl);
//           setGeneratedImage(data.outputUrl);
//         });

//         newConnection.invoke("GetConnectionId")
//           .then((id) => {
//             setConnectionId(id);
//             console.log("Connection ID:", id);
//           })
//           .catch(err => console.error(err));
//       })
//       .catch((error) => {
//         console.error("SignalR connection error:", error);
//       });
//   }, []);

//   // העלאת תמונה מקומית לתצוגה
//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile && selectedFile.type.startsWith("image/")) {
//       setFile(selectedFile);
//       const reader = new FileReader();
//       reader.onloadend = () => setUploadedImage(reader.result as string);
//       reader.readAsDataURL(selectedFile);
//     } else {
//       alert("Please upload a valid image file.");
//     }
//   };

//   // שליחת הבקשה לשרת ליצירת תמונה
//   const handleGenerate = async () => {
//     if (!uploadedImage || !projectId || !projectName || !connectionId||!file) return;
//     console.log(file)
//     try {
//       setIsUploading(true);
//       setProgress(0);

//       const blob = await (await fetch(uploadedImage)).blob();
//       const baseFile = new File([blob], file.name, { type: "image/png" });
//       const uniqueName = `${uuidv4()}_${baseFile.name}`;
//       uniqueNameRef.current = uniqueName;
//       const renamedFile = new File([baseFile], uniqueName, { type: baseFile.type });

//       debugger
//       const uploadUrl = await getUploadUrl(projectId, projectName, renamedFile.name, renamedFile.type);
//       await uploadFileToS3(uploadUrl, renamedFile, setProgress);

//       const downloadUrl = await getDownloadUrl(parseInt(projectId), projectName, renamedFile.name);
//       const fileData = {
//         fileName: renamedFile.name,
//         fileType: renamedFile.type,
//         ownerId: user.userId,
//         projectId: parseInt(projectId),
//         s3Key: `users/${projectId}/${projectName}/${renamedFile.name}`,
//         size: renamedFile.size,
//       };

//       await dispatch(addFile(fileData));
//       await generateImage(downloadUrl, description, connectionId);
//     } catch (err) {
//       console.error("Error during image generation:", err);
//     }
//   };

//   const saveAI = async () => {
//     if (!generatedImage || !projectId || !projectName || !uniqueNameRef.current) {
//       alert("Missing data to save AI image.");
//       return;
//     }

//     try {
//       setIsUploading(true);
//       setProgress(0);

//       const response = await fetch(generatedImage);
//       const blob = await response.blob();

//       const aiFileName = uniqueNameRef.current.replace(/(\.[^.]*)$/, "Ai$1");

//       const aiFile = new File([blob], aiFileName, { type: "image/png" });

//       const uploadUrl = await getUploadUrl(projectId, projectName, aiFile.name, aiFile.type);
//       await uploadFileToS3(uploadUrl, aiFile, setProgress);

//       const fileData = {
//         fileName: aiFile.name,
//         fileType: aiFile.type,
//         ownerId: user.userId,
//         projectId: parseInt(projectId),
//         s3Key: `users/${projectId}/${projectName}/${aiFile.name}`,
//         size: aiFile.size,
//       };

//       await dispatch(addFile(fileData));
//       alert("AI image uploaded successfully.");
//     } catch (error) {
//       console.error("Error uploading AI image:", error);
//       alert("Failed to upload AI image.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const downloadAi = () => {
//     if (!generatedImage || !uniqueNameRef.current) return;
//     const aiFileName = uniqueNameRef.current.replace(/(\.[^.]*)$/, "Ai$1");

//     fetch(generatedImage)
//       .then(response => response.blob())
//       .then(blob => {
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = aiFileName.split("/").pop() || "generated_image.png";
//         a.click();
//         a.remove();
//       });
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {uploadedImage && <img src={uploadedImage} alt="Sketch" style={{ maxWidth: "400px" }} />}

//       <Stack spacing={2} mt={2}>
//         <TextField
//           label="Describe your design"
//           variant="outlined"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <Button onClick={handleGenerate} disabled={isUploading}>Generate</Button>

//         {isUploading && (
//           <div>
//             <progress value={progress} max="100" />
//             <span>{progress}%</span>
//           </div>
//         )}
//       </Stack>

//       {generatedImage && (
//         <div style={{ marginTop: "2rem" }}>
//           <h3>Generated Image:</h3>
//           <img src={generatedImage} alt="Generated" style={{ maxWidth: "100%" }} />
//           <Stack spacing={2} direction="row" mt={2}>
//             <Button variant="contained" color="primary" onClick={downloadAi}>Download</Button>
//             <Button variant="contained" color="primary" onClick={saveAI}>Save</Button>
//           </Stack>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Workspace;



import React, { useEffect , useRef, useState} from "react";
import * as signalR from "@microsoft/signalr";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField, Stack } from "@mui/material";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUploadUrl, uploadFileToS3, getDownloadUrl, generateImage } from "../Services/uploadService";
import { Upload, Image, Wand2, Download, Save, Loader2, Camera, FileImage, Sparkles } from "lucide-react";
import { addFile } from "../store/File";
import { AppDispatch, RootState } from "../store/reduxStore";
import "./WorkSpace.css"
import toast from "react-hot-toast";
interface WorkspaceProps {
  projectId: number;
  projectName: string;
}

const Workspace: React.FC<WorkspaceProps> = ({ projectId, projectName }) => {
  // const [uploadedImage, setUploadedImage] = useState(null);
  // const [generatedImage, setGeneratedImage] = useState(null);
  // const [description, setDescription] = useState("");
  // const [progress, setProgress] = useState(0);
  // const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  // const [file, setFile] = useState(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [connectionId, setConnectionId] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const uniqueNameRef = useRef<string | null>(null);
  const user = useSelector((state: RootState) => state.connect.user);
  const dispatch: AppDispatch = useDispatch();
  // SignalR חיבור ל-
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

        newConnection.on("SketchCompleted", (data: { outputUrl: string }) => {
          console.log("Image received from SignalR:", data.outputUrl);
          setGeneratedImage(data.outputUrl);
        });

        newConnection.invoke("GetConnectionId")
          .then((id) => {
            setConnectionId(id);
            console.log("Connection ID:", id);
          })
          .catch(err => console.error(err));
      })
      .catch((error) => {
        console.error("SignalR connection error:", error);
      });
  }, []);

  // העלאת תמונה מקומית לתצוגה
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  // שליחת הבקשה לשרת ליצירת תמונה
  const handleGenerate = async () => {
    if (!uploadedImage  || !projectName || !connectionId||!file) return;
    console.log(file)
    try {
      setIsUploading(true);
      setProgress(0);

      const blob = await (await fetch(uploadedImage)).blob();
      const baseFile = new File([blob], file.name, { type: "image/png" });
      const uniqueName = `${uuidv4()}_${baseFile.name}`;
      uniqueNameRef.current = uniqueName;
      const renamedFile = new File([baseFile], uniqueName, { type: baseFile.type });

      const uploadUrl = await getUploadUrl(projectName, renamedFile.name, renamedFile.type);
      await uploadFileToS3(uploadUrl, renamedFile, setProgress);

      const downloadUrl = await getDownloadUrl(`users/${projectName}/${renamedFile.name}`);
      const fileData = {
        fileName: renamedFile.name,
        fileType: renamedFile.type,
        ownerId: user.userId,
        projectId: projectId,
        s3Key: `users/${projectName}/${renamedFile.name}`,
        size: renamedFile.size,
      };

      await dispatch(addFile(fileData));
      var result = await generateImage(downloadUrl, description, connectionId);
      console.log(result);
      setGeneratedImage(result.outputUrl);
    } catch (err) {
      console.error("Error during image generation:", err);
    }
  };

  const saveAI = async () => {
    if (!generatedImage || !projectId || !projectName || !uniqueNameRef.current) {
      alert("Missing data to save AI image.");
      return;
    }

    try {
      setIsUploading(true);
      setProgress(0);

      const response = await fetch(generatedImage);
      const blob = await response.blob();

      const aiFileName = uniqueNameRef.current.replace(/(\.[^.]*)$/, "Ai$1");

      const aiFile = new File([blob], aiFileName, { type: "image/png" });

      const uploadUrl = await getUploadUrl(projectName, aiFile.name, aiFile.type);
      await uploadFileToS3(uploadUrl, aiFile, setProgress);

      const fileData = {
        fileName: aiFile.name,
        fileType: aiFile.type,
        ownerId: user.userId,
        projectId:projectId,
        s3Key: `users/${projectName}/${aiFile.name}`,
        size: aiFile.size,
      };

      await dispatch(addFile(fileData));
      toast.success("AI image uploaded successfully.");
    } catch (error) {
      console.error("Error uploading AI image:", error);
      toast.error("Failed to upload AI image.");
    } finally {
      setIsUploading(false);
    }
  };

  const downloadAi = () => {
    if (!generatedImage || !uniqueNameRef.current) return;
    const aiFileName = uniqueNameRef.current.replace(/(\.[^.]*)$/, "Ai$1");

    fetch(generatedImage)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = aiFileName.split("/").pop() || "generated_image.png";
        a.click();
        a.remove();
      });
  };
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0];
  //   if (selectedFile && selectedFile.type.startsWith("image/")) {
  //     setFile(selectedFile);
  //     const reader = new FileReader();
  //     reader.onloadend = () => setUploadedImage(reader.result);
  //     reader.readAsDataURL(selectedFile);
  //   } else {
  //     alert("Please upload a valid image file.");
  //   }
  // };

  // const handleGenerate = async () => {
  //   if (!uploadedImage || !description.trim()) {
  //     alert("Please upload an image and provide a description.");
  //     return;
  //   }
    
  //   setIsGenerating(true);
  //   setProgress(0);
    
  //   // Simulate progress
  //   const progressInterval = setInterval(() => {
  //     setProgress(prev => {
  //       if (prev >= 90) {
  //         clearInterval(progressInterval);
  //         return 90;
  //       }
  //       return prev + 10;
  //     });
  //   }, 200);

  //   // Simulate generation delay
  //   setTimeout(() => {
  //     clearInterval(progressInterval);
  //     setProgress(100);
  //     // For demo purposes, using the uploaded image as generated
  //     setGeneratedImage(uploadedImage);
  //     setIsGenerating(false);
  //   }, 3000);
  // };

  // const downloadAi = () => {
  //   if (!generatedImage) return;
    
  //   const link = document.createElement("a");
  //   link.href = generatedImage;
  //   link.download = "generated_design.png";
  //   link.click();
  // };

  // const saveAI = () => {
  //   alert("AI image saved successfully to your project!");
  // };

  return (
    <div className="workspace-container">
      <div className="workspace-header">
        <div className="header-content">
          <div className="header-icon">
            <Wand2 className="icon" />
          </div>
          <div>
            <h1 className="workspace-title">AI Design Studio</h1>
            <p className="workspace-subtitle">Transform your sketches into stunning designs</p>
          </div>
        </div>
      </div>

      <div className="workspace-content">
        {/* Upload Section */}
        <div className="upload-section">
          <div className="upload-card">
            <div className="upload-header">
              <FileImage className="section-icon" />
              <h2>Upload Your Sketch</h2>
            </div>
            
            <div 
              className={`upload-area ${uploadedImage ? 'has-image' : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadedImage ? (
                <div className="image-preview">
                  <img src={uploadedImage} alt="Uploaded sketch" />
                  <div className="image-overlay">
                    <Camera className="overlay-icon" />
                    <span>Click to change image</span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <Upload className="upload-icon" />
                  <div className="upload-text">
                    <h3>Drop your image here</h3>
                    <p>or click to browse files</p>
                    <span className="file-types">PNG, JPG, GIF up to 10MB</span>
                  </div>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
          </div>
        </div>

        <div className="description-section">
          <div className="description-card">
            <div className="description-header">
              <Sparkles className="section-icon" />
              <h2>Describe Your Vision</h2>
            </div>
            
            <div className="description-content">
              <textarea
                className="description-input"
                placeholder="Describe your design vision in detail... For example: 'A modern living room with minimalist furniture, warm lighting, and natural textures'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
              
              <div className="suggestion-chips">
                <button 
                  className="chip"
                  onClick={() => setDescription("Modern minimalist interior with clean lines and natural light")}
                >
                  Minimalist Style
                </button>
                <button 
                  className="chip"
                  onClick={() => setDescription("Cozy traditional room with warm colors and vintage furniture")}
                >
                  Traditional Style
                </button>
                <button 
                  className="chip"
                  onClick={() => setDescription("Industrial loft with exposed brick and metal accents")}
                >
                  Industrial Style
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="generate-section">
          <button 
            className={`generate-button ${(!uploadedImage || !description.trim() || isGenerating) ? 'disabled' : ''}`}
            onClick={handleGenerate}
            disabled={!uploadedImage || !description.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="button-icon spinning" />
                Generating Design...
              </>
            ) : (
              <>
                <Wand2 className="button-icon" />
                Generate AI Design
              </>
            )}
          </button>
        </div>

        {isGenerating && (
          <div className="progress-section">
            <div className="progress-card">
              <div className="progress-header">
                <Loader2 className="section-icon spinning" />
                <h3>Creating Your Design</h3>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="progress-text">{progress}% Complete</p>
            </div>
          </div>
        )}

        {generatedImage && !isGenerating && (
          <div className="result-section">
            <div className="result-card">
              <div className="result-header">
                <Image className="section-icon" />
                <h2>Generated Design</h2>
              </div>
              
              <div className="result-image">
                <img src={generatedImage} alt="Generated design" />
              </div>
              
              <div className="result-actions">
                <button className="action-button secondary" onClick={downloadAi}>
                  <Download className="button-icon" />
                  Download
                </button>
                <button className="action-button primary" onClick={saveAI}>
                  <Save className="button-icon" />
                  Save to Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

     
    </div>
  );
};

export default Workspace;