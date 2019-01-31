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
    [Route("requests")]
    public class RequestController : Controller
    {
        private IRequestService _requestService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public RequestController(
            IRequestService requestService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _requestService = requestService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var requests =  _requestService.GetAll();
            var requestDtos = _mapper.Map<IList<RequestDto>>(requests);
            return Ok(requestDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var request =  _requestService.GetById(id);
            var requestDto = _mapper.Map<RequestDto>(request);
            return Ok(requestDto);
        }

        [HttpPut("/approve/{id}")]
        public IActionResult Approve(int id)
        {
            try 
            {
                _requestService.Approve(id);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("decline/{id}")]
        public IActionResult Decline(int id)
        {
            try 
            {
                _requestService.Decline(id);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _requestService.Delete(id);
            return Ok();
        }
    }
}
