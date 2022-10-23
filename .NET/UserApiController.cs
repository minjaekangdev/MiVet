using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Sabio.Models;
using Sabio.Models.AppSettings;
using Sabio.Models.Domain.Users;
using Sabio.Models.Enums;
using Sabio.Models.Requests.Users;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserApiController : BaseApiController
    {
        private IUserService _service = null;
        private IAuthenticationService<int> _authService = null;
        private AppKeys _appKeys;
        private readonly IEmailService _emailService = null;

        public UserApiController(IUserService service,
            ILogger<PingApiController> logger,
            IOptions<AppKeys> appKeys,
            IEmailService emailService,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
            _appKeys = appKeys.Value;
            _emailService = emailService;
        }

        [AllowAnonymous]
        [HttpPut("changepassword")]
        public ActionResult<SuccessResponse> ChangePassword(PasswordUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int rowAffected = _service.UpdatePassword(model.Password, model.Token, model.Email);

                if(rowAffected == 0)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource Not Found.");
                }
                else
                {
 
                    response = new SuccessResponse();
                }
                
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);

        }

        [AllowAnonymous]
        [HttpPut("resetpassword")]
        public ActionResult<SuccessResponse> SendResetPasswordEmail(string email)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                string token = Guid.NewGuid().ToString();
                int tokenType = (int)TokenType.ResetPassword;
                int id = _service.ForgetPasswordTokenInsert(email, token, tokenType);

                if (id == 0)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    _emailService.SendResetPasswordEmail(email, token);
                    response = new SuccessResponse();
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet]
        public ActionResult<ItemsResponse<User>> GetAll(int PageIndex, int PageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<User> page = _service.GetAll(PageIndex, PageSize);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<User>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<User>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                User user = _service.GetById(id);

                if (user == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<User> { Item = user };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<int> Create(UserAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int id = _service.Create(model);

                if (id > 0)
                {
                    string token = Guid.NewGuid().ToString();
                    int tokenType = (int)TokenType.NewUser;
                    _service.AddToken(token, id, tokenType);
                    _emailService.SendConfirmEmail(model.Email, token);

                    response = new ItemResponse<int> { Item = id };

                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [AllowAnonymous]
        [HttpPut("confirm")]
        public ActionResult<SuccessResponse> Confirm(string token)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Confirm(token);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(UserUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("status")]
        public ActionResult<SuccessResponse> UpdateStatus(int id, int statusTypeId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateStatus(id, statusTypeId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<SuccessResponse> Login(UserLoginRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                bool isValidCredentials = _service.LogInAsync(model.Email, model.Password).Result;

                if (isValidCredentials != false)
                {
                    response = new SuccessResponse();
                }
                else
                {
                    code = 401;
                    response = new ErrorResponse("Incorrect email or password.");
                }

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("logout")]
        public async Task<ActionResult<SuccessResponse>> Logout()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                bool isLoggedIn = _authService.IsLoggedIn();

                if (isLoggedIn)
                {
                    await _authService.LogOutAsync();
                    response = new SuccessResponse();
                }
                else
                {
                    code = 400;
                    response = new ErrorResponse("App resource not found.");

                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("current")]
        public ActionResult<ItemResponse<IUserAuthData>> GetCurrentUser()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                IUserAuthData user = _authService.GetCurrentUser();

                if (user != null)
                {
                    response = new ItemResponse<IUserAuthData> { Item = user };
                }
                else
                {
                    code = 400;
                    response = new ErrorResponse("App resource not found.");
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}
