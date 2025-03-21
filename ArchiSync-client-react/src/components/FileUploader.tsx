import React, { useState } from "react";
import axios from "axios";
import { centerStyle } from "./style";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store/reduxStore";
import { useSelector } from "react-redux";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const user = useSelector((state: RootState) => state.connect.user);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const uniqueFileName = `${uuidv4()}_${file.name}`;
    const updatedFile = new File([file], uniqueFileName, { type: file.type });

    setIsUploading(true);

    try {
      // Request presigned URL
      const response = await axios.get("https://localhost:7218/api/Upload/upload-url",  {
        params: { parentId: 1,projectName: "projectName", fileName: updatedFile.name, contentType: file.type },
    });
console.log(response)
      // Upload the file to S3
      const res=await axios.put(response.data.url, updatedFile, {
        headers: { "Content-Type": updatedFile.type },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setProgress(percent);
        },
      });
      const respo = await axios.get("https://localhost:7218/api/Upload/download-url",  {
        params: { userId: user.userId, fileName: updatedFile.name },
    });
    console.log("arrr",respo)
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      maxWidth: "400px",
      margin: "40px auto",
      padding: "24px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#ffffff",
    },
    inputContainer: {
      position: "relative" as const,
      border: "2px dashed #3498db",
      borderRadius: "6px",
      padding: "20px",
      textAlign: "center" as const,
      cursor: "pointer",
    },
    input: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0,
      cursor: "pointer",
    },
    button: {
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "10px 16px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      opacity: isUploading ? 0.6 : 1,
    },
    progressContainer: {
      width: "100%",
      backgroundColor: "#e0e0e0",
      borderRadius: "3px",
      height: "8px",
    },
    progressBar: {
      height: "100%",
      backgroundColor: "#2ecc71",
      borderRadius: "3px",
      transition: "width 0.3s",
    },
  };

  return (
    <div style={centerStyle}>
      <div style={styles.container}>
        <div style={styles.inputContainer}>
          <input type="file" onChange={handleFileChange} style={styles.input} />
          <p>{file ? file.name : "Select a file to upload"}</p>
        </div>

        {progress > 0 && (
          <div style={styles.progressContainer}>
            <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
          </div>
        )}

        <button onClick={handleUpload} disabled={!file || isUploading} style={styles.button}>
          {isUploading ? "Uploading..." : "Upload File"}
        </button>

      </div>
    </div>
  );
};

export default FileUploader;
