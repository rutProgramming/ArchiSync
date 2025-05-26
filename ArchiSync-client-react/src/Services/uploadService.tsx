import axios from "axios";
import { GetHeaders } from "../store/Project";
const url = import.meta.env.VITE_BASE_URL

export const getUploadUrl = async ( projectName: string, fileName: string, contentType: string) => {
  console.log("getUploadUrl", projectName, fileName, contentType);
  try {
    const response = await axios.get(`${url}/api/S3/upload-url`, {
      params: { projectName, fileName, contentType },
      headers: GetHeaders()
    });
    return response.data.url;
  }
  catch (e) {
    throw e;
  }
};

export const uploadFileToS3 = async (url: string, file: File, onUploadProgress?: (progress: number) => void) => {
  try {
    await axios.put(url, file, {
      headers: { "Content-Type": file.type },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        if (onUploadProgress) onUploadProgress(percent);
      },
    });
  }
  catch (e) {
    throw e;
  }
};

export const getDownloadUrl = async (S3key: string) => {
  try {
    const response = await axios.get(`${url}/api/S3/download-url`, {
      params: { S3key },
      headers: GetHeaders()
    });
    return response.data;
  }
  catch (e) {
    throw e;
  }
};
// export const generateImage = async (imageUrl: string, prompt: string) => {
//   try {
//     console.log(imageUrl, prompt);
//     const requestData = { imageUrl, prompt };
//     const response = await axios.post(
//       `${url}/api/Sketch/convert`,
//       requestData,
//       { headers: { "Content-Type": "application/json" } }
//     );

//     console.log(response);
//     return response.data
//   }
//   catch (e) {
//     throw e;
//   }
// }


export const generateImage = async (imageUrl: string, prompt: string, connectionId: string) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/sketch/convert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl, prompt, connectionId })
  });

  if (!response.ok) {
    throw new Error("Failed to request image generation.");
  }

  return response.json();
};
