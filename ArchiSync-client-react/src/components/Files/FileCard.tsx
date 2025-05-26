import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDownloadUrl } from "../../Services/uploadService";
import { File } from "../../types/types";
import Modal from "@mui/material/Modal";
import "../Style/FileCard.css";
import { Delete, FileDownload } from "@mui/icons-material";
import { Style } from "../../Style/Style";
import { AppDispatch } from "../../store/reduxStore";
import { useDispatch } from "react-redux";
import { deleteFile } from "../../store/File";
export interface FileCardProps {
  file: File;
}

const FileCard = ({ file }: FileCardProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);
      try {
        if (file.project && file.project.title) {
          const downloadUrl = await getDownloadUrl(`${file.project.title}/${file.fileName}`);
          setUrl(downloadUrl);
        } else {
          throw new Error("Project information is missing.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load file");
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [file]);
  const handleDownload = async () => {
    if (!url) {
      console.error("No URL available for download.");
      alert("No URL available for download.");
      return;
    }

    try {
      const urlbase = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`${urlbase}/api/Upload/download?fileUrl=${encodeURIComponent(url)}`);

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      const fileNameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
      const fileName = fileNameMatch?.[1] || "downloaded_file";

      // יצירת קישור זמני להורדה
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed");
    }
  };

  const handleDelete = () => {
    var res=dispatch(deleteFile(file))
    res.then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        console.log("File deleted successfully");
      } else {
        console.error("Failed to delete file:", response);
      }
    });
  }

  return (
    <>
      <motion.div
        className="file-card"
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px yellow" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
      >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            {file.fileType.startsWith("image/") && url ? (
              <img src={url} alt={file.fileName} className="file-thumbnail" />
            ) : file.fileType.startsWith("application/pdf") && url ? (
              <iframe src={url} className="file-thumbnail" title={file.fileName} />
            ) : (
              <div className="file-icon">📄</div>
            )}
            <div>{file.fileName.split("_").pop()}</div>
           
          </>
        )}
      </motion.div>
      <button onClick={handleDownload} className="file-download-button">download</button>
              <FileDownload sx={Style.file_download_button} />
              <button onClick={handleDelete} className="file-delete-button">delete</button>
              <Delete sx={Style.file_download_button} />

      <Modal open={open} onClose={() => setOpen(!open)} className="modal-container">
        <motion.div className="modal-content" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <>
              {file.fileType.startsWith("image/") && url ? (
                <img src={url} alt={file.fileName} className="file-fullsize" />
              ) : file.fileType.startsWith("application/pdf") && url ? (
                <iframe src={url} className="file-fullsize" title={file.fileName} />
              ) : (
                <p>File format not supported.</p>
              )}
              <FileDownload onClick={handleDownload} sx={Style.file_download_button}></FileDownload>
            </>
          )}
        </motion.div>
      </Modal>
    </>
  );
};

export default FileCard;
