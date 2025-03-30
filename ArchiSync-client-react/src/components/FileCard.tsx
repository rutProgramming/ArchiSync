import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDownloadUrl } from "../Services/uploadService";
import { File } from "../types/types";
import Modal from "@mui/material/Modal";
import "../Style/FileCard.css";
export interface FileCardProps {
  file: File;
}

const FileCard = ({ file }: FileCardProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);
      try {
        // console.log("Fetching URL for file:", file);
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
            {file.fileType.startsWith("image/") && url ? (<>
              <img src={url} alt={file.fileName} className="file-thumbnail" />
            </>) : file.fileType.startsWith("application/pdf") && url ? (<>
              <iframe src={url} className="file-thumbnail" title={file.fileName} />
            </>) : (
              <div className="file-icon">📄</div>
            )}
            <div>{file.fileName.split("_").pop()}</div>
          </>
        )}
      </motion.div>

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
              </>
            )}
          </motion.div>
      </Modal>
    </>
  );
};

export default FileCard;
