using Google.Apis.AnalyticsReporting.v4.Data;

namespace Sabio.Services.Interfaces
{
    public interface IGAService
    {
        GetReportsResponse BatchDatesGet(string startDate, string endDate);
        GetReportsResponse BatchUsersGet(string startDate, string endDate, string dimension);
        GetReportsResponse BatchPageViewsGet(string startDate, string endDate);
    }
}