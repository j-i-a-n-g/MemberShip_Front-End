import axios from "axios";
import { message } from "antd";


// create an axios instance
const service = axios.create({
  // baseURL: process.env.NODE_ENV === "development" ? "http://localhost:9981" : "http://localhost:9981", // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 30 * 1000 // request timeout
});
service.interceptors.request.use(request => {
  console.log(request)
  if (request.url !== "/api/user/autoLogin") {
    return request
  }
  let token = localStorage.getItem('member_token')
  if (!token) {
    window.location.href = "/"
    return
  }
  request.headers["Authorization"] = token;
  return request
}, error => {
  return Promise.reject(error);
})

service.interceptors.response.use(response => {
  const res = response.data;
  // let config = response.config;
  // let url = config.url;
  if (res.code !== 200) {
    message.error(res.message || '请求出错')
    return Promise.reject(res.data);
  }
  return res.data
}, error => {
  // do something with request error
  if (process.env.NODE_ENV === "development") {
    message.error(error.response.data.message || '请求出错')
  }
  return Promise.reject(error);
})

export default service