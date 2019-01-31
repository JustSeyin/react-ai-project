using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IGroupService
    {
        IEnumerable<Group> GetAll();
        void Delete(int id);
        Group Create(Group group);
        Group GetById(int id);
        Request Apply(Request request, int userId);
    }

    public class GroupService : IGroupService
    {
        private DataContext _context;

        public GroupService(DataContext context)
        {
            _context = context;
        }


        public IEnumerable<Group> GetAll()
        {
            return _context.Groups;
        }

        public Group Create(Group group)
        {
            // validation
            if (_context.Groups.Any(x => x.TimeFrom == group.TimeFrom))
                throw new AppException("Są już przypisane zajęcia na wybranym terminie:  '" + group.TimeFrom );

            _context.Groups.Add(group);
            _context.SaveChanges();

            return group;
        }

        public Request Apply(Request request, int userId)
        {
            request.User= _context.Users.Find(userId);
            // validation
            if (_context.Requests.Any(x => x.User == request.User && x.Group == request.Group))
                throw new AppException("Istnieje już taki wniosek");

            _context.Requests.Add(request);
            _context.SaveChanges();

            return request;
        }

        public Group GetById(int id)
        {
            return _context.Groups.Find(id);
        }
        
        public void Delete(int id)
        {
            var group = _context.Groups.Find(id);
            if (group != null)
            {
                _context.Groups.Remove(group);
                _context.SaveChanges();
            }
        }

    }
}