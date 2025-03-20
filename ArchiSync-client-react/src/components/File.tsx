import axios from "axios";
import { useState } from "react";

const S3Uploader= () => {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  // שלב 1 - קבלת ה-Pre-Signed URL להעלאה
  const getUploadUrl = async (fileName: string, contentType: string): Promise<string | null> => {
    try {
        const API_URL = "http://localhost:7218/api/Upload"; // לוודא שהפורט נכון

     const response = await axios.get("https://localhost:7218/api/Upload/upload-url",  {
             params: {  fileName: fileName, contentType:contentType },
         });
        console.log(response)
    } catch (error) {
      console.error("Error fetching upload URL:", error);
      return null;
    }
  };

  // שלב 2 - העלאת הקובץ ל-S3 עם ה-URL שקיבלנו
  const uploadFile = async () => {
    if (!file) {
      alert("בחר קובץ להעלאה");
      return;
    }

    const uploadUrl = await getUploadUrl(file.name, file.type);
    if (!uploadUrl) {
      alert("לא ניתן לקבל URL להעלאה");
      return;
    }

    try {
      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.ok) {
        alert("✅ הקובץ הועלה בהצלחה!");
      } else {
        console.error("❌ Upload failed:", response);
      }
    } catch (error) {
      console.error("❌ Error uploading file:", error);
    }
  };

  // קבלת Pre-Signed URL להורדה
  const getDownloadUrl = async (fileName: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/s3/download-url?fileName=${fileName}`);
      if (!response.ok) throw new Error("Failed to get download URL");
      const data = await response.json();
      setDownloadUrl(data.url);
    } catch (error) {
      console.error("❌ Error fetching download URL:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🔼 העלאת קובץ ל-S3</h2>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={uploadFile} style={{ marginLeft: "10px" }}>העלה קובץ</button>

      <h2>🔽 הורדת קובץ</h2>
      <input
        type="text"
        placeholder="שם הקובץ"
        onBlur={(e) => getDownloadUrl(e.target.value)}
      />
      {downloadUrl && (
        <p>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            לחץ כאן להורדת הקובץ
          </a>
        </p>
      )}
    </div>
  );
};

export default S3Uploader;
