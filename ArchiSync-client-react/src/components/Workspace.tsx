import React, { useEffect , useRef, useState} from "react";
import * as signalR from "@microsoft/signalr";
import { v4 as uuidv4 } from "uuid";
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
 
  const [isGenerating, _setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [_connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [connectionId, setConnectionId] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [_isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const uniqueNameRef = useRef<string | null>(null);
  const user = useSelector((state: RootState) => state.connect.user);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_BASE_URL}/sketchhub`)
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        setConnection(newConnection);

        newConnection.on("SketchCompleted", (data: { outputUrl: string }) => {
          setGeneratedImage(data.outputUrl);
        });

        newConnection.invoke("GetConnectionId")
          .then((id) => {
            setConnectionId(id);
          })
          .catch(err => console.error(err));
      })
      .catch((error) => {
        error("SignalR connection error:", error);
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
\        <div className="upload-section">
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