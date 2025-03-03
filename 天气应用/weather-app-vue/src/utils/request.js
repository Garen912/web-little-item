import axios from "axios";
import { ElMessage } from "element-plus";

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

// 初始化 axios
const request = axios.create({
  baseURL: '//api.openweathermap.org/',
  timeout: 5000
})

// 设置请求拦截
request.interceptors.request.use(
  (config) => {
    config.cancelToken = source.token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 设置响应拦截
request.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return response.data
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request