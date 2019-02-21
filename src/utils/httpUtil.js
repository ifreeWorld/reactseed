import axios from 'axios'
import { notification } from 'antd'

const request = axios.create({
  baseURL: 'https://some-domain.com/api/',
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

// 给实例绑定axios.all方法
request.all = axios.all

// 请求拦截器
request.interceptors.request.use(
  config => {
    let token = getCookie('token')
    if (token) {
      config.params = config.params || {}
      config.params.__sid = token
    }
  },
  err => {
    notification.error({ message: '请求异常!' })
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  config => {
    return config
  },
  err => {
    notification.error({ message: '请求异常!' })
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

export { request, getCookie }
