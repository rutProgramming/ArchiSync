import axios from "axios";

export const getUploadUrl = async (parentId: string, projectName: string, fileName: string, contentType: string) => {
  console.log(parentId, projectName, fileName, contentType);
  const response = await axios.get("https://localhost:7218/api/Upload/upload-url", {
    params: { parentId, projectName, fileName, contentType },
  });
  return response.data.url;
};

export const uploadFileToS3 = async (url: string, file: File, onUploadProgress?: (progress: number) => void) => {
  await axios.put(url, file, {
    headers: { "Content-Type": file.type },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
      if (onUploadProgress) onUploadProgress(percent);
    },
  });
};

export const getDownloadUrl = async (parentId: number, projectName: string, fileName: string) => {
  const response = await axios.get("https://localhost:7218/api/Upload/download-url", {
    params: { parentId, projectName, fileName },
  });
  console.log(response);
  return response.data;
};


export const generateImage = async (
  image: string,
  scale: number,
  prompt: string,
  cn_lineart_strength: number
): Promise<string> => {
  const response = await fetch("http://localhost:7218/api/Image/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, scale, prompt, cn_lineart_strength })
  });

  const data = await response.json();
  console.log(data);
  return data.imageUrl;
};