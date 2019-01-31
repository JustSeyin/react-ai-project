using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;

namespace WebApi.Dtos
{
    public class GroupDto
    {
        public int Id { get; set; }
        public DateTime TimeFrom { get; set; }
        public DateTime TimeTo { get; set; }
        public int Limit { get; set; }
    }
}