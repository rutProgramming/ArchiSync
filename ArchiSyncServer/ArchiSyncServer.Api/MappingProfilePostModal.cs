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
            CreateMap<MessagePostModel, MessageDTO>().ReverseMap();

            // Comment mappings
            CreateMap<CommentPostModel, CommentDTO>().ReverseMap();

            // ProjectDocument mappings
            CreateMap<ProjectPostModel, ProjectDTO>().ReverseMap();

            // User mappings

            CreateMap<UserPostModel, UserDTO>().ReverseMap();

            CreateMap<RegisterModel, UserDTO>().ReverseMap();

        }
    }
}

