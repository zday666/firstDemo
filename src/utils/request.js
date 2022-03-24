import axios from "axios";
import $store from "../store";
import toLogin from "@libs/login";
import { VUE_APP_API_URL } from "@utils/index";

const instance = axios.create({
  baseURL: "/api", //"/api",  //VUE_APP_API_URL
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => {
    // 定时刷新access-token
    return response.data;
  },
  (error) => {
    if (error.toString() == "Error: Network Error") {
      toLogin();
      return Promise.reject({
        message: "请检查后台api接口服务是否启动",
        toLogin: true,
      });
    }
    if (error.response.data.status == 401) {
      toLogin();
      return Promise.reject({ message: "未登录", toLogin: true });
    }

    //return Promise.reject(error);
    return Promise.reject({
      message: error.response.data.message
        ? error.response.data.message
        : error.response.data.message,
      res: error.response,
    });
  }
);

const defaultOpt = { login: true };

function baseRequest(options) {
  const token = $store.state.app.token;
  const headers = options.headers || {};
  //if (options.login) {
  // headers["Authorization"] = "Bearer " + token;
  //}

  //console.log('token',token)
  options.headers = headers;
  if (options.login && !token) {
    toLogin();
    return Promise.reject({ message: "未登录", toLogin: true });
  }

  return instance(options).then((res) => {
    const data = res.data || {};
    if (!res.code) {
      // console.log("res", res);
      return Promise.resolve(res, res);
    }
    if (res.code !== 200)
      return Promise.reject({ message: "请求失败", res, data });

    // console.log("res:" + res.status);
    if ([401, 403].indexOf(res.code) !== -1) {
      toLogin();
      return Promise.reject({ message: res.message, res, data, toLogin: true });
    } else if (res.code === 200) {
      return Promise.resolve(data, res);
    } else {
      return Promise.reject({ message: res.message, res, data });
    }
  });
}

/**
 * http 请求基础类
 * 参考文档 https://www.kancloud.cn/yunye/axios/234845
 *
 */
const request = ["post", "put", "patch"].reduce((request, method) => {
  // console.log(333333);
  /**
   *
   * @param url string 接口地址
   * @param data object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, data = {}, options = {}) => {
    return baseRequest(
      Object.assign({ url, data, method }, defaultOpt, options)
    );
  };
  return request;
}, {});

["get", "delete", "head"].forEach((method) => {
  /**
   *
   * @param url string 接口地址
   * @param params object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, params = {}, options = {}) => {
    return baseRequest(
      Object.assign({ url, params, method }, defaultOpt, options)
    );
  };
});

export default request;
