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
            Console.WriteLine(accessKey+", "+secretKey+", "+region+", "+_bucketName);
        }

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
