// import axios from "axios";
// import { GetHeaders } from "../store/Project";
// const url = import.meta.env.VITE_BASE_URL

import axios from "axios";
import api from "../api/axiosInstance";

// export const getUploadUrl = async ( projectName: string, fileName: string, contentType: string) => {
//   try {
//     const response = await axios.get(`${url}/api/S3/upload-url`, {
//       params: { projectName, fileName, contentType },
//       headers: GetHeaders()
//     });
//     return response.data.url;
//   }
//   catch (e) {
//     throw e;
//   }
// };

// export const uploadFileToS3 = async (url: string, file: File, onUploadProgress?: (progress: number) => void) => {
//   try {
//     await axios.put(url, file, {
//       headers: { "Content-Type": file.type },
//       onUploadProgress: (progressEvent) => {
//         const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
//         if (onUploadProgress) onUploadProgress(percent);
//       },
//     });
//   }
//   catch (e) {
//     throw e;
//   }
// };

// export const getDownloadUrl = async (S3key: string) => {
//   try {
//     const response = await axios.get(`${url}/api/S3/download-url`, {
//       params: { S3key },
//       headers: GetHeaders()
//     });
//     return response.data;
//   }
//   catch (e) {
//     throw e;
//   }
// };


// export const generateImage = async (imageUrl: string, prompt: string, connectionId: string) => {
//   const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/sketch/convert`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ imageUrl, prompt, connectionId })
//   });

//   if (!response.ok) {
//     throw new Error("Failed to request image generation.");
//   }

//   return response.json();
// };



export const getUploadUrl = async (projectName: string, fileName: string, contentType: string) => {
  const response = await api.get("/api/S3/upload-url", {
    params: { projectName, fileName, contentType },
  });
  return response.data.url;
};

export const uploadFileToS3 = async (url: string, file: File, onUploadProgress?: (progress: number) => void) => {
  // כאן לא משתמשים ב-api כי הכתובת היא S3 ישירות, לא בשרת שלך
  await axios.put(url, file, {
    headers: { "Content-Type": file.type },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
      if (onUploadProgress) onUploadProgress(percent);
    },
  });
};

export const getDownloadUrl = async (S3key: string) => {
  const response = await api.get("/api/S3/download-url", {
    params: { S3key },
  });
  return response.data;
};

export const generateImage = async (imageUrl: string, prompt: string, connectionId: string) => {
  const response = await fetch(`/api/sketch/convert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl, prompt, connectionId }),
  });

  if (!response.ok) {
    throw new Error("Failed to request image generation.");
  }

  return response.json();
};
