import axios from "axios";

export const getUploadUrl = async (parentId: string, projectName: string, fileName: string, contentType: string) => {
  try {
    const response = await axios.get("https://localhost:7218/api/Upload/upload-url", {
      params: { parentId, projectName, fileName, contentType },
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

export const getDownloadUrl = async (parentId: number, projectName: string, fileName: string) => {
  try {
    const response = await axios.get("https://localhost:7218/api/Upload/download-url", {
      params: { parentId, projectName, fileName },
    });
    return response.data;
  }
  catch (e) {
    throw e;
  }
};
export const generateImage = async (imageUrl: string, prompt: string) => {
  try {
    const requestData = { imageUrl, prompt };
    const response = await axios.post(
      "https://localhost:7218/api/Sketch/convert",
      requestData,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(response);
    return response.data
  }
  catch (e) {
    throw e;
  }
}


// export const generateImage = async (
//   imageUrl: string,
//  // scale: number,
//   prompt: string,
//   //cn_lineart_strength: number
// ): Promise<string> => {
//   const response = await fetch(" https://localhost:7218/api/Sketch/convert", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ imageUrl, prompt })
//   });

//   const data = await response.json();
//   console.log(data);
//   return data.imageUrl;
// };