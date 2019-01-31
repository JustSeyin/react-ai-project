using System;

namespace WebApi.Entities
{
    public class RequestHistory
    {
        public int Id { get; set; }
        public Request Request { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
    }
}