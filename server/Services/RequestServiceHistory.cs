using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IRequestHistoryService
    {
        IEnumerable<RequestHistory> GetAll();
        RequestHistory Create(RequestHistory request);
        void Delete(int id);
    }

    public class RequestHistoryService : IRequestHistoryService
    {
        private DataContext _context;

        public RequestHistoryService(DataContext context)
        {
            _context = context;
        }


        public IEnumerable<RequestHistory> GetAll()
        {
            return _context.RequestsHistory;
        }

        public RequestHistory Create(RequestHistory request)
        {
            // validation

            _context.RequestsHistory.Add(request);
            _context.SaveChanges();

            return request;
        }

        public void Delete(int id)
        {
            var request = _context.RequestsHistory.Find(id);
            if (request != null)
            {
                _context.RequestsHistory.Remove(request);
                _context.SaveChanges();
            }
        }

    }
}