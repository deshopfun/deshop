import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserPresistStore } from '@/lib'
const { getAuth, resetUser } = useUserPresistStore.getState()

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.set(
      'Content-Type',
      config.headers.get('Content-Type') ?? 'application/json; charset=utf-8'
    )
    config.headers.set('Accept', config.headers.get('Accept') ?? 'application/json')

    const auth = getAuth()
    if (auth) config.headers.set('Authorization', auth)

    config.timeout = 100_000

    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) return Promise.resolve(response.data)
    return Promise.reject(response)
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      resetUser()
      window.location.href = '/login'
      return
    } else {
      return Promise.reject(error)
    }
  }
)

export default axios
