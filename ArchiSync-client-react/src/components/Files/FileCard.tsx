import { useEffect, useState } from "react";
import { getDownloadUrl } from "../../Services/uploadService";
import { File } from "../../types/types";
import { AppDispatch } from "../../store/reduxStore";
import { useDispatch } from "react-redux";
import { deleteFile } from "../../store/File";
import "./FileCard.css"
import api from "../../api/axiosInstance";

export interface FileCardProps {
  file: File;
  hasAccess: boolean;
}

const FileCard = ({ file, hasAccess }: FileCardProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);
      try {
        const downloadUrl = await getDownloadUrl(file.s3Key);
        setUrl(downloadUrl);
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
      alert("No URL available for download.");
      return;
    }

    try {
      const response = await api.get(`/api/S3/download?fileUrl=${encodeURIComponent(url)}`, {
        responseType: "blob"
      });

      const blob = response.data;
      const contentDisposition = response.headers["content-disposition"];
      const fileNameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
      const fileName = fileNameMatch?.[1] || file.fileName;

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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        const response = await dispatch(deleteFile(file));
        if (response.meta.requestStatus === "fulfilled") {
        } else {
          console.error("Failed to delete file:", response);
          alert("Failed to delete file");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete file");
      }
    }
  };

  const getFileIcon = () => {
    if (file.fileType.startsWith("image/")) return "🖼️";
    if (file.fileType.startsWith("application/pdf")) return "📄";
    if (file.fileType.includes("word")) return "📝";
    if (file.fileType.includes("excel")) return "📊";
    return "📁";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isImage = file.fileType.startsWith("image/");
  const isPdf = file.fileType.startsWith("application/pdf");
  const cleanFileName = file.fileName.split("_").pop() || file.fileName;

  if (loading) {
    return (
      <div className="file-card loading">
        <div className="file-loading">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="file-card error">
        <div className="file-error">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="file-card" onClick={() => setModalOpen(true)}>
        <div className="file-preview">
          {isImage && url ? (
            <img src={url} alt={cleanFileName} className="file-thumbnail" />
          ) : isPdf && url ? (
            <div className="pdf-preview">
              <iframe src={url} className="file-thumbnail-pdf" title={cleanFileName} />
            </div>
          ) : (
            <div className="file-icon-container">
              <span className="file-icon">{getFileIcon()}</span>
            </div>
          )}
        </div>

        <div className="file-info">
          <div className="file-name">{cleanFileName}</div>
          <div className="file-meta">
            <span className="file-type">{file.fileType.split('/')[1]?.toUpperCase()}</span>
            <span className="file-size">{formatFileSize(file.size || 0)}</span>
          </div>
        </div>

        {hasAccess && (
          <div className="file-actions">
            <button
              className="action-btn download-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              title="Download"
            >
              <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <button
              className="action-btn delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              title="Delete"
            >
              <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="3,6 5,6 21,6" />
                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
              </svg>
            </button>
          </div>
        )}

      </div>
      {modalOpen && (
        <div className="file-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="file-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="modal-body">
              {isImage && url ? (
                <img src={url} alt={cleanFileName} className="modal-image" />
              ) : isPdf && url ? (
                <iframe src={url} className="modal-pdf" title={cleanFileName} />
              ) : (
                <div className="modal-unsupported">
                  <span className="file-icon-large">{getFileIcon()}</span>
                  <p>Preview not available for this file type</p>
                  <p className="file-name-modal">{cleanFileName}</p>
                </div>
              )}
            </div>
            {hasAccess && (
              <div className="modal-actions">
                <button className="modal-btn download" onClick={handleDownload}>
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7,10 12,15 17,10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default FileCard;