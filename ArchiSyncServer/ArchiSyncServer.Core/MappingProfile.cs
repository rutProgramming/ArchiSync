using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;
using ArchiSyncServer.Core.Entities;
using File = ArchiSyncServer.Core.Entities.File;

namespace ArchiSyncServer.core
{


    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Project, ProjectDTO>()
                .ForMember(dest => dest.Architects, opt => opt.MapFrom(src =>
                    src.ProjectArchitects.Select(pa => pa.Architect).ToList()
                ))

                .ReverseMap();
            CreateMap<Message, MessageDTO>().ReverseMap();
            CreateMap<Comment, CommentDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<UserRoles, UserRolesDTO>().ReverseMap();
            CreateMap<ProjectPermission, ProjectPermissionDTO>().ReverseMap();
            CreateMap<File, FileDTO>().ReverseMap();
        }
    }

}
