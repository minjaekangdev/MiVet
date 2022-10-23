import axios from "axios";

let { REACT_APP_API_HOST_PREFIX: API } = process.env;

class GoogleAnalyticsService {
  constructor(host) {
    this.host = host;
  }

  batchGet = (startDate, endDate) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/analytics/dates?startDate=${startDate}&endDate=${endDate}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  get = (startDate, endDate, dimension) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/analytics/users?startDate=${startDate}&endDate=${endDate}&dimension=${dimension}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  batchGetPageViews = (startDate, endDate) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/analytics/pageviews?startDate=${startDate}&endDate=${endDate}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  handleSuccess = (res) => {
    return res.data;
  };

  handleError = (error) => {
    return Promise.reject(error);
  };
}

export const netGAService = new GoogleAnalyticsService(API);

export default netGAService;
