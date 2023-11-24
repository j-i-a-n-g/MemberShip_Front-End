import axios from "axios";
import { message } from "antd";


// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:9981" : "http://localhost:9981", // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 30 * 1000 // request timeout
});

service.interceptors.response.use(response => {
  const res = response.data;
  let config = response.config;
  let url = config.url;
  if (res.code !== 200) {
    message.error(res.msg || '请求出错')
    return Promise.reject(res);
  }
  return res
})

export default service