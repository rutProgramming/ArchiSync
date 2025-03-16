using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace ArchiSyncServer.Service.Services
{
    public static class PasswordHasher
    {
        private const int SaltSize = 16;  // 128-bit salt
        private const int HashSize = 32;  // 256-bit hash
        private const int Iterations = 10000;

        /// <summary>
        /// Hashes a password using PBKDF2 with a unique salt.
        /// </summary>
        public static string HashPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
                throw new ArgumentException("Password cannot be empty");

            // Generate a secure random salt
            byte[] salt = new byte[SaltSize];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // Hash the password with PBKDF2
            byte[] hash = KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: Iterations,
                numBytesRequested: HashSize);

            // Combine salt + hash and encode as Base64
            byte[] hashBytes = new byte[SaltSize + HashSize];
            Array.Copy(salt, 0, hashBytes, 0, SaltSize);
            Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

            return Convert.ToBase64String(hashBytes);
        }

        /// <summary>
        /// Verifies if a given password matches the stored hash.
        /// </summary>
        public static bool VerifyPassword(string password, string storedHash)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(storedHash))
                return false;

            try
            {
                // Decode Base64 string
                byte[] hashBytes = Convert.FromBase64String(storedHash);

                // Extract salt and hash
                byte[] salt = new byte[SaltSize];
                byte[] storedPasswordHash = new byte[HashSize];

                Array.Copy(hashBytes, 0, salt, 0, SaltSize);
                Array.Copy(hashBytes, SaltSize, storedPasswordHash, 0, HashSize);

                // Hash input password with extracted salt
                byte[] computedHash = KeyDerivation.Pbkdf2(
                    password: password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: Iterations,
                    numBytesRequested: HashSize);

                // Compare hashes securely
                return CryptographicOperations.FixedTimeEquals(storedPasswordHash, computedHash);
            }
            catch (FormatException)
            {
                return false; // Invalid Base64 format
            }
        }
    }
}
