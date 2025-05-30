﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IServices
{
    public interface IS3Service
    {
        Task<string> GeneratePresignedUrlAsync( string projectName, string fileName, string contentType);
        Task<string> GetDownloadUrlAsync(string S3key);
        Task<(byte[] Content, string ContentType, string FileName)> DownloadFileAsync(string fileUrl);


    }
}
