import { useSelector } from "react-redux";
import { RootState } from "../store/reduxStore";
import FileCard from "./FileCard";
import { File } from "../types/types";
import { useEffect } from "react";

const DocumentFilesDisplay = ({ onFileClick }: { onFileClick: (file: File) => void }) => {
  const files = useSelector((state: RootState) => state.files.files);

  const documentFiles = files.filter(file => file.fileType === "application/pdf" || file.fileType.includes("msword"));

  useEffect(() => {
    
  }, []);
  
  return (
    <section className="files-section">
      <h2>Documents</h2>
      <div className="files-container">
        {documentFiles.map(file => (
          <FileCard  key={file.id}  file={file}  />
        ))}
      </div>
    </section>
  );
};

export default DocumentFilesDisplay;
