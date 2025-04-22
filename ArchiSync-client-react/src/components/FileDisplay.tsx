import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDownloadUrl } from "../Services/uploadService";
import { File } from "../types/types";
// import { FileDownload } from "@mui/icons-material";

interface FileDisplayProps {
  file: File;
}

const FileDisplay = ({ file }: FileDisplayProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);
      try {
        if (file.project && file.project.name) {
          const downloadUrl = await getDownloadUrl(file.projectId, file.project.name, file.fileName);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // const handleDownload = () => {
  //   if (url) {
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = file.fileName;
  //     link.click();
  //   }
  // };
  return (
    <>
      <motion.div
        className="file-card"
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px yellow" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenModal}
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
            <p>{file.fileName}</p>

          </>
        )}
      </motion.div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>Close</button>
            <h2>{file.fileName}</h2>
            {file.fileType.startsWith("image/") && url ? (
              <img src={url} alt={file.fileName} width="100%" />
            ) : file.fileType.startsWith("application/pdf") && url ? (
              <iframe src={url} title={file.fileName} width="100%" height="500px" />
            ) : (
              <p>File cannot be displayed.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FileDisplay;
