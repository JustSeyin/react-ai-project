using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IRequestService
    {
        IEnumerable<Request> GetAll();
        Request Create(Request request);
        Request GetById(int id);
        void Delete(int id);
        void Decline(int id);
        void Approve(int id);
    }

    public class RequestService : IRequestService
    {
        private DataContext _context;

        public RequestService(DataContext context)
        {
            _context = context;
        }


        public IEnumerable<Request> GetAll()
        {
            return _context.Requests
                .Include(x => x.User).Include(x => x.Group);;
        }

        public Request Create(Request request)
        {
            // validation
            if (_context.Requests.Any(x => x.Id == request.Id))
                throw new AppException("Group with  '" + request.Id + "' is already taken");

            _context.Requests.Add(request);
            _context.SaveChanges();

            return request;
        }

        public void Delete(int id)
        {
            var request = _context.Requests.Find(id);
            if (request != null)
            {
                _context.Requests.Remove(request);
                _context.SaveChanges();
            }
        }

        public Request GetById(int id)
        {
            return _context.Requests.Find(id);
        }
        
        public void Approve(int id)
        {
            var request = _context.Requests.Find(id);

            if (request == null)
                throw new AppException("User not found");

            // update user properties
            request.StateId = 2;

            _context.Requests.Update(request);
            _context.SaveChanges();
        }
        
        public void Decline(int id)
        {
            var request = _context.Requests.Find(id);

            if (request == null)
                throw new AppException("User not found");

            // update user properties
            request.StateId = 3;

            _context.Requests.Update(request);
            _context.SaveChanges();
        }

    }
}