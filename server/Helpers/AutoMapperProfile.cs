using AutoMapper;
using WebApi.Dtos;
using WebApi.Entities;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserGroup, UserGroupDto>();
            CreateMap<UserGroupDto, UserGroup>();
            CreateMap<Group, GroupDto>();
            CreateMap<GroupDto, Group>();
            CreateMap<Request, RequestDto>();
            CreateMap<RequestDto, Request>();
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}