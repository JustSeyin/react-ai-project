using WebApi.Entities;

namespace WebApi.Dtos
{
    public class RequestDto
    {

        public int Id { get; set; }
        public virtual User User { get; set; }
        public virtual Group Group { get; set; }
        public int StateId { get; set; }
    }
}