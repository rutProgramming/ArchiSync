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
            CreateMap<ProjectPostModel, ProjectDTO>().ReverseMap();
            CreateMap<MessagePostModel, MessageDTO>().ReverseMap();
            CreateMap<CommentPostModel, CommentDTO>().ReverseMap();
            CreateMap<UserPostModel, UserDTO>().ReverseMap();
            CreateMap<RegisterModel, UserDTO>().ReverseMap();
            CreateMap<ProjectPermissionPostModel, ProjectPermissionDTO>().ReverseMap();
            CreateMap<FilePostModel, FileDTO>().ReverseMap();
            CreateMap<UserForCreationDTO, User>();
            CreateMap<User, UserDTO>(); 
            CreateMap<RegisterModel, UserForCreationDTO>(); 

        }
    }
}

