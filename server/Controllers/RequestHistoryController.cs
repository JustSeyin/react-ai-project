using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Dtos;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using WebApi.Entities;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("requestsHistory")]
    public class RequestHistoryController : Controller
    {
        private IRequestHistoryService _requestHistoryService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public RequestHistoryController(
            IRequestHistoryService requestHistoryService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _requestHistoryService = requestHistoryService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            var requests =  _requestHistoryService.GetAll();
            var requestsHistoryDtos = _mapper.Map<IList<RequestHistoryDto>>(requests);
            return Ok(requestsHistoryDtos);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _requestHistoryService.Delete(id);
            return Ok();
        }
    }
}
