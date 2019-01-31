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
using System.Security.Principal;
using WebApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("groups")]
    public class GroupController : Controller
    {
        private IGroupService _groupService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public GroupController(
            IGroupService groupService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _groupService = groupService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var groups =  _groupService.GetAll();
            var groupDtos = _mapper.Map<IList<GroupDto>>(groups);
            return Ok(groupDtos);
        }
        
        [HttpPost("create")]
        public IActionResult Create([FromBody]GroupDto groupDto)
        {
            // map dto to entity
            var group = _mapper.Map<Group>(groupDto);

            try 
            {
                // save 
                _groupService.Create(group);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("apply/{id}")]
        public IActionResult Apply(int id)
        {
            // map dto to entity
            var group = _groupService.GetById(id);
            var userId = 1; // User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var request = new Request();
            request.Group = group;
            request.State = 0;
            request.StateId = 0;
            try 
            {
                // save 
                _groupService.Apply(request, userId);
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
            _groupService.Delete(id);
            return Ok();
        }
    }
}
