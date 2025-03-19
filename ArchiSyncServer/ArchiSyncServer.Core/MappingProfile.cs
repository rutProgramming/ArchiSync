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

namespace ArchiSyncServer.core
{
    

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Project, ProjectDTO>().ReverseMap();
            CreateMap<Document, DocumentDTO>().ReverseMap();
            CreateMap<Comment, CommentDTO>().ReverseMap();
            CreateMap<Project, ProjectDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<UserRoles, UserRolesDTO>().ReverseMap();

        }
    }

}
