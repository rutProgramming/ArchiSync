import { useSelector } from "react-redux";
import { RootState } from "../store/reduxStore";
import FileCard from "./FileCard";

const DocumentFilesDisplay = () => {
  const files = useSelector((state: RootState) => state.files.files);

  const documentFiles = files.filter(file => !file.fileType?.startsWith("image/"));
  
  return (
    <section className="files-section">
      <h2>Documents</h2>
      <div className="files-container">
        {documentFiles.map(file => (<>
          <FileCard  key={file.id}  file={file}  />
          </>))}
      </div>
    </section>
  );
};

export default DocumentFilesDisplay;
