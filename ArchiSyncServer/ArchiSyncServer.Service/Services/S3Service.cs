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
            var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
            var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
            var region = Environment.GetEnvironmentVariable("AWS_REGION") ?? "eu-north-1";
            if (string.IsNullOrEmpty(accessKey) || string.IsNullOrEmpty(secretKey))
                throw new Exception("AWS credentials are missing in environment variables.");
            var credentials = new BasicAWSCredentials(accessKey, secretKey);
            var regionEndpoint = Amazon.RegionEndpoint.GetBySystemName(region);
            _s3Client = new AmazonS3Client(credentials, regionEndpoint);
            _bucketName = "ruth-shtraicher-storage-bucket"; 
        }

        /// ⬆️ יצירת Pre-Signed URL להעלאת קובץ
        public async Task<string> GeneratePresignedUrlAsync(string parentId,string projectName,string fileName, string contentType)
        {
            var key = $"users/{parentId}/{projectName}/{fileName}"; 

            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(15),
                ContentType = contentType
            };
            string presignedUrl = _s3Client.GetPreSignedURL(request);
            Console.WriteLine($"Generated Upload URL: {presignedUrl}");
            return presignedUrl;
        }


        /// ⬇️ יצירת Pre-Signed URL להורדת קובץ
        public async Task<string> GetDownloadUrlAsync(string parentId,string projectName, string fileName)
        {
            var key = $"users/{parentId}/{projectName}/{fileName}"; 

            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(60) 
            };

            string presignedUrl = _s3Client.GetPreSignedURL(request);
            Console.WriteLine($"Generated Download URL: {presignedUrl}");
            return presignedUrl;
        }
    }
}
