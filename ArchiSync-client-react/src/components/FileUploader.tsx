import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addFile } from "../store/File";
import { AppDispatch, RootState } from "../store/reduxStore";
import { ArrowBack, Public } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Alert, Snackbar } from "@mui/material";
import "../Style/FileUploader.css";
import { getDownloadUrl, getUploadUrl, uploadFileToS3 } from "../Services/uploadService";

const FileUploader = () => {
  const {parentId, projectId, projectName } = useParams<{parentId: string; projectId: string; projectName: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const user = useSelector((state: RootState) => state.connect.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setProgress(0);
    }
  };

   const handleUpload = async () => {
    if (!file || !projectId || !projectName) return;

    const uniqueFileName = `${uuidv4()}_${file.name}`;
    const updatedFile = new File([file], uniqueFileName, { type: file.type });
    setIsUploading(true);

    try {
      const uploadUrl = await getUploadUrl(projectId, projectName, updatedFile.name, updatedFile.type);
      await uploadFileToS3(uploadUrl, updatedFile, setProgress);
      const fileServer = {
        fileName: updatedFile.name,
        fileType: updatedFile.type,
        ownerId: user.userId,
        projectId: parseInt(projectId),
        s3Key: `users/${projectId}/${projectName}/${updatedFile.name}`,
        size: updatedFile.size,
      };
      dispatch(addFile(fileServer));
      console.log("fileServer", fileServer);
      setSnackbar(true);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <motion.div
        className="ArrowButton arrow-button"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(-1)}
      >
        <ArrowBack fontSize="large" />
      </motion.div>

      <div className="file-uploader-container">
        <div className="upload-area">
          <input type="file" onChange={handleFileChange} className="upload-input" />
          <p style={{ color: "#F1C40F" }}>{file ? file.name : "Select a file to upload"}</p>
        </div>

        {progress > 0 && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        <button onClick={handleUpload} disabled={!file || isUploading} className="upload-button">
          {isUploading ? "Uploading..." : "Upload File"}
        </button>

        <Snackbar
          open={snackbar}
          autoHideDuration={4000}
          onClose={() => {
            setSnackbar(false);
            navigate(-1);
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
      </div>
    </>
  );
};

export default FileUploader;
