using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Entities
{
    public class Group
    {
        public int Id { get; set; }
        public virtual ICollection<UserGroup> UserGroups { get; set; }
        public DateTime TimeFrom { get; set; }
        public DateTime TimeTo { get; set; }
        public int Limit { get; set; }
    }
}