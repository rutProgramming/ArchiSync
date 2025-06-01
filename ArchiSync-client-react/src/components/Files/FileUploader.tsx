// "use client"

// import type React from "react"

// import { useState, useRef } from "react"
// import { Upload, X, File, FileText, ImageIcon, Film } from "lucide-react"
// import Button from "../Button"
// import { cn } from "../utils"

// interface FileUploaderProps {
//   onUpload?: (files: File[]) => void
//   accept?: string
//   multiple?: boolean
//   maxSize?: number // in MB
//   key: string
// }

// const FileUploader = ({ onUpload, accept = "*", multiple = false, maxSize = 10 }: FileUploaderProps) => {
//   const [files, setFiles] = useState<File[]>([])
//   const [isDragging, setIsDragging] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const fileList = Array.from(e.target.files)
//       validateAndSetFiles(fileList)
//     }
//   }

//   const validateAndSetFiles = (fileList: File[]) => {
//     setError(null)

//     // Check file size
//     const oversizedFiles = fileList.filter((file) => file.size > maxSize * 1024 * 1024)
//     if (oversizedFiles.length > 0) {
//       setError(`Some files exceed the maximum size of ${maxSize}MB`)
//       return
//     }

//     setFiles((prev) => (multiple ? [...prev, ...fileList] : fileList))

//     if (onUpload) {
//       onUpload(multiple ? [...files, ...fileList] : fileList)
//     }
//   }

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(true)
//   }

//   const handleDragLeave = () => {
//     setIsDragging(false)
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(false)

//     if (e.dataTransfer.files) {
//       const fileList = Array.from(e.dataTransfer.files)
//       validateAndSetFiles(fileList)
//     }
//   }

//   const handleRemoveFile = (index: number) => {
//     const newFiles = [...files]
//     newFiles.splice(index, 1)
//     setFiles(newFiles)

//     if (onUpload) {
//       onUpload(newFiles)
//     }
//   }

//   const getFileIcon = (file: File) => {
//     const type = file.type.split("/")[0]
//     switch (type) {
//       case "image":
//         return <ImageIcon size={20} />
//       case "video":
//         return <Film size={20} />
//       case "text":
//         return <FileText size={20} />
//       default:
//         return <File size={20} />
//     }
//   }

//   const triggerFileInput = () => {
//     fileInputRef.current?.click()
//   }

//   return (
//     <div className="file-uploader">
//       <div
//         className={cn("upload-area", isDragging && "dragging", Boolean(error) && "has-error")}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         onClick={triggerFileInput}
//       >
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           accept={accept}
//           multiple={multiple}
//           className="file-input"
//         />

//         <div className="upload-icon">
//           <Upload size={32} />
//         </div>

//         <div className="upload-text">
//           <p>Drag and drop files here, or click to browse</p>
//           <span className="upload-hint">Maximum file size: {maxSize}MB</span>
//         </div>
//       </div>

//       {error && <div className="upload-error">{error}</div>}

//       {files.length > 0 && (
//         <div className="file-list">
//           {files.map((file, index) => (
//             <div key={`${file.name}-${index}`} className="file-item">
//               <div className="file-icon">{getFileIcon(file)}</div>
//               <div className="file-info">
//                 <div className="file-name">{file.name}</div>
//                 <div className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
//               </div>
//               <button
//                 className="remove-file"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   handleRemoveFile(index)
//                 }}
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           ))}

//           {multiple && (
//             <Button
//               variant="outline"
//               size="sm"
//               className="add-more-files"
//               onClick={(e) => {
//                 e.stopPropagation()
//                 triggerFileInput()
//               }}
//             >
//               Add More Files
//             </Button>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default FileUploader


"use client";

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import { Upload, X, File, FileText, ImageIcon, Film } from "lucide-react";
import { Snackbar, Alert } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
//import "../Style/FileUploader.css";
import { getUploadUrl, uploadFileToS3 } from "../../Services/uploadService";
import { AppDispatch, RootState } from "../../store/reduxStore";
import { addFile } from "../../store/File";
import Button from "../Additional/Button";

interface FileUploaderProps {
    projectId: number;
    projectName: string;
    fileName?: string;
}
const FileUploader = ({ projectId, projectName, fileName }: FileUploaderProps) => {
 
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.connect.user);

  const maxSize = 10; 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      validateAndSetFiles(fileList);
    }
  };

  const validateAndSetFiles = (fileList: File[]) => {
    setError(null);
    const oversized = fileList.filter((file) => file.size > maxSize * 1024 * 1024);
    if (oversized.length > 0) {
      setError(`Some files exceed the maximum size of ${maxSize}MB`);
      return;
    }
    setFiles(fileList);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const fileList = Array.from(e.dataTransfer.files);
      validateAndSetFiles(fileList);
    }
  };

  const getFileIcon = (file: File) => {
    const type = file.type.split("/")[0];
    switch (type) {
      case "image":
        return <ImageIcon size={20} />;
      case "video":
        return <Film size={20} />;
      case "text":
        return <FileText size={20} />;
      default:
        return <File size={20} />;
    }
  };

  const handleUpload = async () => {

    if (!files.length || !projectId || !projectName) return;
    setIsUploading(true);
    try {
      for (const file of files) {
        const uniqueFileName = fileName ? fileName : `${uuidv4()}_${file.name}`;
        const uploadUrl = await getUploadUrl(projectName, uniqueFileName, file.type);
        await uploadFileToS3(uploadUrl, file, setProgress);

        const fileServer = {
          fileName: uniqueFileName,
          fileType: file.type,
          ownerId: user.userId,
          projectId: projectId,
          s3Key: `users/${projectName}/${uniqueFileName}`,
          size: file.size,
          isDeleted: false,
        };
        dispatch(addFile(fileServer));
      }
      setSnackbar(true);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div
        className="ArrowButton arrow-button"
        onClick={() => navigate(-1)}
      >
        <ArrowBack fontSize="large" />
      </div>

      <div
        className={`upload-area ${isDragging ? "dragging" : ""} ${error ? "has-error" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          multiple={false}
          ref={inputRef}
          onChange={handleFileChange}
          className="file-input"
          accept="*"
        />
        <div className="upload-icon">
          <Upload size={32} />
        </div>
        <p>Drag and drop a file here, or click to browse</p>
        <span className="upload-hint">Max size: {maxSize}MB</span>
      </div>

      {error && <div className="upload-error">{error}</div>}

      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="file-item">
              <div className="file-icon">{getFileIcon(file)}</div>
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
              <button
                className="remove-file"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles([]);
                }}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {progress > 0 && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      <Button onClick={handleUpload} disabled={!files.length || isUploading}>
        {isUploading ? "Uploading..." : "Upload File"}
      </Button>

      <Snackbar
        open={snackbar}
        autoHideDuration={4000}
        onClose={() => {
          setSnackbar(false);
          navigate(-2);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setSnackbar(false);
            navigate(-1);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          File uploaded successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FileUploader;
