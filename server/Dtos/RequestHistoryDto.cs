using System;
using WebApi.Entities;

namespace WebApi.Dtos
{
    public class RequestHistoryDto
    {
        public int Id { get; set; }
        public Request Request { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
    }
}