import { useSelector } from "react-redux";
import { RootState } from "../store/reduxStore";
import FileCard from "./FileCard";
import { File } from "../types/types";

const ImageFilesDisplay = ({ onFileClick }: { onFileClick: (file: File) => void }) => {
  const files = useSelector((state: RootState) => state.files.files);

  const imageFiles = files.filter(file => file.fileType?.startsWith("image/")).sort((a, b) => a.fileName.localeCompare(b.fileName));
  

  return (
    <section className="files-section">
      <h2>Images</h2>
      <div className="files-container">
        {imageFiles.length > 0 ? (
          imageFiles.map(file => (<>
            <FileCard key={file.id} file={file} />
            </>))
        ) : (
          <p>No images found</p>
        )}
      </div>
    </section>
  );
};

export default ImageFilesDisplay;
