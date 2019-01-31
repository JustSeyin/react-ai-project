using System.Runtime.Serialization;
using WebApi.Entities;
using Group = System.Text.RegularExpressions.Group;

namespace WebApi.Dtos
{
    public class UserGroupDto
    {
        public User User { get; set; }
        public Group Group { get; set; }
    }
}