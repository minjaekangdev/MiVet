using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Google.Apis.AnalyticsReporting.v4.Data;
using Metric = Google.Apis.AnalyticsReporting.v4.Data.Metric;
using Microsoft.Extensions.Options;
using Sabio.Models.AppSettings;
using Sabio.Services.Interfaces;
using System;
using Microsoft.AspNetCore.Authorization;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/ga")]
    [ApiController]
    public class GAApiController : BaseApiController
    {
        private IGAService _gaService = null;
        public GAApiController(IGAService gaService,
            ILogger<PingApiController> logger) : base(logger)
        {
            _gaService = gaService;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("dates")]
        public ActionResult<ItemResponse<GetReportsResponse>> BatchDatesGet(string startDate, string endDate)
        {
            int code = 200;
            BaseResponse response = null; 
            try
            {
                GetReportsResponse gaResponse = _gaService.BatchDatesGet(startDate, endDate);

                if (gaResponse == null)
                {
                    code = 400;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<GetReportsResponse> { Item = gaResponse };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message); 
            }
            
            return StatusCode(code, response);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public ActionResult<ItemResponse<GetReportsResponse>> BatchUsersGet(string startDate, string endDate, string dimension)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                GetReportsResponse gaResponse = _gaService.BatchUsersGet(startDate, endDate, dimension);

                if (gaResponse == null)
                {
                    code = 400;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<GetReportsResponse> { Item = gaResponse };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("pageviews")]
        public ActionResult<ItemResponse<GetReportsResponse>> BatchPageViewsGet(string startDate, string endDate)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                GetReportsResponse gaResponse = _gaService.BatchPageViewsGet(startDate, endDate);

                if (gaResponse == null)
                {
                    code = 400;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<GetReportsResponse> { Item = gaResponse };
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
