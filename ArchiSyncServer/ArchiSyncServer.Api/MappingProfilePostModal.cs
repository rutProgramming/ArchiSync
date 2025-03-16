using AutoMapper;
using ArchiSyncServer.Api.Models;
using ArchiSyncServer.API.Models;
using ArchiSyncServer.core;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;

namespace ArchiSyncServer.Api
{
    public class MappingProfilePostModal : Profile
    {
        public MappingProfilePostModal()
        {
            // Project mappings
            CreateMap<ProjectPostModel, ProjectDTO>().ReverseMap();

            // Document mappings
            CreateMap<DocumentPostModel, DocumentDTO>().ReverseMap();

            // Comment mappings
            CreateMap<CommentPostModel, CommentDTO>().ReverseMap();

            // ProjectDocument mappings
            CreateMap<ProjectOrFolderPostModel, ProjectOrFolderDTO>().ReverseMap();

            // User mappings

            CreateMap<UserPostModel, UserDTO>().ReverseMap();

            CreateMap<RegisterModel, UserDTO>().ReverseMap();

        }
    }
}

