import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { Toast } from 'antd-mobile';

// const history = useHistory();

const tip = msg => {
  Toast.info(msg, 1000, null, true);
};

const toLogin = () => {
  console.log(123);
  // history.push({
  //   path: '/login',
  //   query: {
  //     redirect: router.currentRoute.fullPath,
  //   },
  // });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 sessionid
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录');
      localStorage.removeItem('sessionid');
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
};

var axiosInstance = axios.create({ timeout: 1000 * 12 });

axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截
axiosInstance.interceptors.request.use(
  config => {
    const sessionid = localStorage.getItem('sessionid');
    sessionid && (config.headers.sessionid = sessionid);
    return config;
  },
  error => Promise.error(error),
);

// 响应拦截
axiosInstance.interceptors.response.use(
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      if (!window.navigator.onLine) {
        console.log('无网络');
      } else {
        return Promise.reject(error);
      }
    }
  },
);

export default axiosInstance;
