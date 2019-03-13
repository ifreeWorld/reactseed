import axios from 'axios'
import { notification } from 'antd'

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

// 给实例绑定axios.all方法
instance.all = axios.all

// 请求拦截器
instance.interceptors.request.use(
  config => {
    let token = getCookie('token')
    if (token) {
      config.params = config.params || {}
      config.params.__sid = token
    }
    return config
  },
  err => {
    notification.error({ message: '请求异常！' })
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  config => {
    return config.data
  },
  err => {
    // 401
    if (err.response.status === 401) {
      // cookie中的token失效处理，跳转登陆
    }
    notification.error({ message: `请求异常！ ${err.response.status} ${err.response.statusText}` })
    return Promise.reject(err)
  }
)

const getCookie = name => {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return arr[2]
  }
  return null
}

const request = {
  post: (url, params) => {
    return instance.post(url, params)
      .then((res) => {
        return res
      }).catch((err) => {
        return err
      })
  },
  get: (url, params) => {
    return instance.get(url, { params })
      .then((res) => {
        return res
      }).catch((err) => {
        return err
      })
  }
}

export { request, getCookie }
