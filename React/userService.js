import axios from "axios";

let { REACT_APP_API_HOST_PREFIX: API } = process.env;

class UserService {
  constructor(host) {
    this.host = host;
  }

  changePassword = (payload) => {
    const config = {
      method: "PUT",
      url: `${this.host}/api/users/changepassword`,
      data: payload,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  sendResetPasswordEmail = (email) => {
    const config = {
      method: "PUT",
      url: `${this.host}/api/users/resetpassword?email=${email}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  getAllUsers = (pageIndex, pageSize) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/users?PageIndex=${pageIndex}&PageSize=${pageSize}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  getUserById = (id) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/users/${id}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  newUser = (payload) => {
    const config = {
      method: "POST",
      url: `${this.host}/api/users`,
      data: payload,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  userLogin = (payload) => {
    const config = {
      method: "POST",
      url: `${this.host}/api/users/login`,
      data: payload,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  updateUser = (id, payload) => {
    const config = {
      method: "PUT",
      url: `${this.host}/api/users/${id}`,
      data: payload,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  updateUserStatus = (id, statusId) => {
    const config = {
      method: "PUT",
      url: `${this.host}/api/users/status?id=${id}&statusTypeId=${statusId}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  userLogout = () => {
    const config = {
      method: "GET",
      url: `${this.host}/api/users/logout`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  getCurrentUser = () => {
    const config = {
      method: "GET",
      url: `${this.host}/api/users/current`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  confirmUser = (token) => {
    const config = {
      method: "PUT",
      url: `${this.host}/api/users/confirm?token=${token}`,
      headers: { "Content-Type": "application/json" },
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

export const netUserService = new UserService(API);

export default netUserService;
