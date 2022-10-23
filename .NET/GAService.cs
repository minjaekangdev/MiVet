using Google.Apis.AnalyticsReporting.v4;
using Google.Apis.AnalyticsReporting.v4.Data;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Sabio.Models.AppSettings;
using Sabio.Services.Interfaces;
using System.IO;
using System.Reflection.Metadata;

namespace Sabio.Services
{
    public class GAService : IGAService
    {
        private AppKeys _appKeys;
        private IWebHostEnvironment _hostEnvironment;
        private GoogleCredential _credential;
        public GAService(IOptions<AppKeys> appKeys,
            IWebHostEnvironment env)
        {
            _hostEnvironment = env;
            _appKeys = appKeys.Value;
            var credentialsFile = Path.Combine(_hostEnvironment.WebRootPath, "GoogleAnalytics", "ga_service_account_credentials.json");
            _credential = GoogleCredential.FromFile(credentialsFile)
                                .CreateScoped(new[] { AnalyticsReportingService.Scope.AnalyticsReadonly });
        }
        public GetReportsResponse BatchDatesGet(string startDate, string endDate)
        {
            var response = new GetReportsResponse();
            using (var analytics = new AnalyticsReportingService(new BaseClientService.Initializer
            {
                HttpClientInitializer = _credential
            }))
            {
                var request = analytics.Reports.BatchGet(new GetReportsRequest
                {
                    ReportRequests = new[] {
                        new ReportRequest{
                            DateRanges = new[] { new DateRange{ StartDate = startDate, EndDate = endDate }},
                            Dimensions = new[] { new Dimension{ Name = "ga:date" }},
                            Metrics = new[] {
                                new Metric{ Expression = "ga:users" },
                                new Metric{ Expression = "ga:newUsers" },
                                new Metric{ Expression = "ga:bounceRate" },
                                new Metric{ Expression = "ga:avgSessionDuration" },
                                new Metric{ Expression = "ga:sessionDuration" },
                                new Metric{ Expression = "ga:pageViewsPerSession" },
                                new Metric{ Expression = "ga:sessions"},
                            },
                            ViewId = _appKeys.GoogleAnalyticsViewId
                        }
                    }
                });
                response = request.Execute();
            }
            return response;
        }
        public GetReportsResponse BatchUsersGet(string startDate, string endDate, string dimension)
        {
            var response = new GetReportsResponse();
            using (var analytics = new AnalyticsReportingService(new BaseClientService.Initializer
            {
                HttpClientInitializer = _credential
            }))
            {
                var request = analytics.Reports.BatchGet(new GetReportsRequest
                {
                    ReportRequests = new[] {
                        new ReportRequest{
                            DateRanges = new[] { new DateRange{ StartDate = startDate, EndDate = endDate }},
                            Dimensions = new[] { new Dimension{ Name = dimension }
                            },
                            Metrics = new[] {
                                new Metric{ Expression = "ga:users" },
                            },
                            OrderBys = new [] { new OrderBy { FieldName = "ga:users" , SortOrder = "DESCENDING" } },
                            ViewId = _appKeys.GoogleAnalyticsViewId
                        }
                    }
                });
                response = request.Execute();
            }
            return response;
        }
        public GetReportsResponse BatchPageViewsGet(string startDate, string endDate)
        {
            var response = new GetReportsResponse();
            using (var analytics = new AnalyticsReportingService(new BaseClientService.Initializer
            {
                HttpClientInitializer = _credential
            }))
            {
                var request = analytics.Reports.BatchGet(new GetReportsRequest
                {
                    ReportRequests = new[] {
                        new ReportRequest{
                            DateRanges = new[] { new DateRange{ StartDate = startDate, EndDate = endDate }},
                            Dimensions = new[] { new Dimension{ Name = "ga:pagepath" }
                            },
                            Metrics = new[] {
                                new Metric{ Expression = "ga:pageviews" },
                                new Metric{ Expression = "ga:exits" },
                            },
                            OrderBys = new [] { new OrderBy { FieldName = "ga:pageviews" , SortOrder = "DESCENDING" } },
                            ViewId = _appKeys.GoogleAnalyticsViewId
                        }
                    }
                });
                response = request.Execute();
            }
            return response;
        }
    }
}
