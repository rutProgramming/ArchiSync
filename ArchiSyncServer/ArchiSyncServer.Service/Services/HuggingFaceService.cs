using ArchiSyncServer.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Service.Services
{
    public class HuggingFaceService : IHuggingFaceService
    {
        private static readonly string API_URL = "https://huggingface.co/lllyasviel/control_v11p_sd15_canny";
        private static readonly string API_TOKEN = "MyApi"; // עדכני כאן את הטוקן שלך

        public async Task<byte[]> GenerateImageAsync(string imagePath)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", API_TOKEN);

                using (var content = new MultipartFormDataContent())
                {
                    content.Add(new StreamContent(File.OpenRead(imagePath)), "file", Path.GetFileName(imagePath));

                    HttpResponseMessage response = await client.PostAsync(API_URL, content);

                    if (response.IsSuccessStatusCode)
                    {
                        return await response.Content.ReadAsByteArrayAsync();
                    }
                    else
                    {
                        throw new Exception("Error: " + await response.Content.ReadAsStringAsync());
                    }
                }
            }
        }
    }
}
