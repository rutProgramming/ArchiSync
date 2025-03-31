import { useSelector } from "react-redux";
import { RootState } from "../store/reduxStore";
import FileCard from "./FileCard";
import "../Style/FileCard.css"
import { useEffect, useState } from "react";
import { File } from "../types/types";

const ImageFilesDisplay = () => {
  const files = useSelector((state: RootState) => state.files.files);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  useEffect(() => {
    setImageFiles(files.filter(file => file.fileType?.startsWith("image/"))
    .sort((a, b) => {
      const nameA = a.fileName.split("_").pop()?.toLowerCase() || "";
      const nameB = b.fileName.split("_").pop()?.toLowerCase() || "";
      return nameA.localeCompare(nameB, undefined, { numeric: true });
  }));
  }, [files]);
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
