import router from '@/router'
import { auth, clearAuth } from '@/stores/common/auth'
import axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'

export type Response<T> = Promise<[boolean, T]>
type ErrorCodeMap = {
  [key: number]: { title: string; message: string }
}

const errorCodeMap: ErrorCodeMap = {
  400: { title: '400 Bad Request', message: '请求参数有误，请联系开发人员排查' },
  401: { title: '401 Unauthorized', message: '登录态已失效，即将跳转至登录界面' },
  402: { title: '402 Payment Required', message: '该请求需要付费，请联系开发人员排查' },
  403: { title: '403 Forbidden', message: '请求已被拒绝，请联系开发人员排查' },
  404: { title: '404 Not Found', message: '请求的资源未找到，请联系开发人员排查' },
  405: { title: '405 Method Not Allowed', message: '请求的方法不被允许，请联系开发人员排查' },
  406: { title: '406 Not Acceptable', message: '请求的资源不可接受，请联系开发人员排查' },
  407: {
    title: '407 Proxy Authentication Required',
    message: '代理服务器认证失败，请联系开发人员排查'
  },
  408: { title: '408 Request Timeout', message: '客户端请求超时，请稍后刷新试试' },
  409: { title: '409 Conflict', message: '请求冲突，请稍后刷新试试' },
  410: { title: '410 Gone', message: '请求的资源已被删除，请稍后刷新试试' },
  411: { title: '411 Length Required', message: '请求的长度错误，请联系开发人员排查' },
  412: { title: '412 Precondition Failed', message: '请求条件失败，请联系开发人员排查' },
  413: {
    title: '413 Request Entity/Payload Too Large',
    message: '请求的数据过大，请联系开发人员排查'
  },
  414: { title: '414 Request-URI Too Long', message: '请求的 URI 过长，请联系开发人员排查' },
  415: { title: '415 Unsupported Media Type', message: '请求的媒体类型不支持，请联系开发人员排查' },
  418: { title: "418 I'm a teapot", message: '服务器只是一只茶壶，但拒绝冲泡咖啡，请稍后刷新试试' },
  500: { title: '500 Internal Server Error', message: '服务器内部错误，请稍后刷新试试' },
  501: { title: '501 Not Implemented', message: '该请求不被支持，请检查操作或联系开发人员排查' },
  502: { title: '502 Bad Gateway', message: '网关错误，请稍后刷新试试' },
  503: { title: '503 Service Unavailable', message: '服务器暂时无法处理请求，请稍后刷新试试' },
  504: { title: '504 Gateway Timeout', message: '网关超时，请稍后刷新试试' }
}
const errorNotification = (status: number) => {
  let title: string = `${String(status)} Error`
  let message: string = '请求出错了'
  if (errorCodeMap[status]) {
    title = errorCodeMap[status].title
    message = errorCodeMap[status].message
  }
  ElNotification({
    title,
    message,
    type: 'error',
    duration: 4500,
    zIndex: Number.MAX_SAFE_INTEGER - 1000,
    customClass: 'global-error-notification'
  })
}
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-type': 'application/json'
  }
})
let redirectTimer: any = 0

api.interceptors.request.use((config: any) => {
  // 无需登录态的接口
  if (['/login'].indexOf(config.url as string) !== -1 || auth.hasLogin) {
    return config
  }

  if (redirectTimer) {
    return Promise.reject()
  }

  ElMessage.warning(errorCodeMap[401].message)

  redirectTimer = setTimeout(() => {
    router.push('/login')
  }, 1500)

  return Promise.reject()
})

api.interceptors.response.use(
  (response): Promise<any> => {
    if (Object.prototype.toString.call(response.data) === '[object Blob]') {
      return Promise.resolve([false, response.data])
    }
    return Promise.resolve([response.data.code !== 0, response.data])
  },
  (error: any) => {
    if (!error || !error.response) return Promise.resolve([true, {}])

    if (error.response.status === 401) {
      clearAuth()

      if (redirectTimer) return Promise.resolve([true, {}])

      ElMessage.warning(errorCodeMap[401].message)
      redirectTimer = setTimeout(() => router.push('/login'), 1500)
    } else {
      errorNotification(error.response.status)
    }

    return Promise.resolve([true, {}])
  }
)

export default api
