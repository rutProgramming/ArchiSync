using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.Runtime;
using ArchiSyncServer.Core.IServices;

namespace ArchiSyncServer.Service.Services
{
    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public S3Service(IConfiguration configuration)
        {
            var accessKey = configuration["AWS_ACCESS_KEY_ID"];
            var secretKey = configuration["AWS_SECRET_ACCESS_KEY"];
            var region = configuration["AWS_REGION"] ?? "eu-north-1";
            _bucketName = configuration["AWS_BUCKET_NAME"]; 
            if (string.IsNullOrEmpty(accessKey) || string.IsNullOrEmpty(secretKey))
                throw new Exception("AWS credentials are missing in environment variables.");
            var credentials = new BasicAWSCredentials(accessKey, secretKey);
            var regionEndpoint = Amazon.RegionEndpoint.GetBySystemName(region);
            _s3Client = new AmazonS3Client(credentials, regionEndpoint);
        }

        public async Task<string> GeneratePresignedUrlAsync(string projectName,string fileName, string contentType)
        {
            var key = $"users/{projectName}/{fileName}"; 

            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(15),
                ContentType = contentType
            };
            string presignedUrl = _s3Client.GetPreSignedURL(request);
            return presignedUrl;
        }


        public async Task<string> GetDownloadUrlAsync(string S3key)
        {
            var key = $"{S3key}"; 

            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddHours(12) 
            };

            string presignedUrl = _s3Client.GetPreSignedURL(request);
            return presignedUrl;
        }

        public async Task<(byte[] Content, string ContentType, string FileName)> DownloadFileAsync(string fileUrl)
        {
            if (string.IsNullOrWhiteSpace(fileUrl) || !Uri.IsWellFormedUriString(fileUrl, UriKind.Absolute))
                throw new ArgumentException("Invalid file URL.");

            using var httpClient = new HttpClient();
            var response = await httpClient.GetAsync(fileUrl);

            if (!response.IsSuccessStatusCode)
                throw new HttpRequestException("Failed to download file from the provided URL.", null, response.StatusCode);

            var content = await response.Content.ReadAsByteArrayAsync();
            var contentType = response.Content.Headers.ContentType?.ToString() ?? "application/octet-stream";

            string fileName = "downloaded_file";

            if (response.Content.Headers.ContentDisposition != null)
            {
                fileName = response.Content.Headers.ContentDisposition.FileName?.Trim('"') ?? fileName;
            }
            else
            {
                fileName = Path.GetFileName(new Uri(fileUrl).AbsolutePath);
            }

            return (content, contentType, fileName);
        }
    }

}
