﻿using ArchiSyncServer.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace ArchiSyncServer.Data
{


    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectDocument> ProjectDocuments { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<Core.Entities.File> File { get; set; }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<RolePermissions> RolePermissions { get; set; }
        public DbSet<ProjectPermission> ProjectPermissions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .EnableSensitiveDataLogging()
                .LogTo(message => Console.WriteLine(message), LogLevel.Information);
        }
    }



}
