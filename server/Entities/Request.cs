namespace WebApi.Entities
{
    public enum StateEnum
    {
        Submitted = 0,
        Approved = 1,
        RejectedByUser = 2,
        RejectedByAdmin = 3
    }
    public class Request
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Group Group { get; set; }
        public int StateId { get; set; }
        public StateEnum State
        {
            get => (StateEnum)Id;
            set => StateId = (int)value;
        }
    }
}