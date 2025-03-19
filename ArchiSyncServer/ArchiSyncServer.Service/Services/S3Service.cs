using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using ArchiSyncServer.Core.IServices;
using Amazon.Runtime;

namespace ArchiSyncServer.Service.Services
{

    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _s3Client;

        public S3Service(IConfiguration configuration)
        {
            var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID", EnvironmentVariableTarget.User);
            var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY", EnvironmentVariableTarget.User);
            var region = Environment.GetEnvironmentVariable("AWS_REGION", EnvironmentVariableTarget.User);

            var credentials = new BasicAWSCredentials(accessKey, secretKey);

            var regionEndpoint = Amazon.RegionEndpoint.GetBySystemName(region);
            _s3Client = new AmazonS3Client(credentials, regionEndpoint);
        }
        public async Task<string> GeneratePresignedUrlAsync(string userId, string fileName, string contentType)
        {
            var key = $"users/{userId}/{fileName}"; // נתיב כולל תיקיה

            var request = new GetPreSignedUrlRequest
            {
                BucketName = "ruth-shtraicher-storage-bucket",
                Key = key,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(60),
                ContentType = contentType
            };

            return _s3Client.GetPreSignedURL(request);
        }

        public async Task<string> GetDownloadUrlAsync(string userId, string fileName)
        {
            var key = $"users/{userId}/{fileName}"; // נתיב כולל תיקיה

            var request = new GetPreSignedUrlRequest
            {
                BucketName = "files-warranty",
                Key = key,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(60) // תוקף של שעה
            };

            return _s3Client.GetPreSignedURL(request);
        }

    }
}



