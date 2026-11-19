import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useUserPresistStore } from '@/lib'

type AppAxios = AxiosInstance & {
  isCancel: typeof axios.isCancel
}

/** App API client — do not use bare `axios` in feature code. */
const api = axios.create() as AppAxios
api.isCancel = axios.isCancel

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.set(
      'Content-Type',
      config.headers.get('Content-Type') ?? 'application/json; charset=utf-8'
    )
    config.headers.set('Accept', config.headers.get('Accept') ?? 'application/json')

    // Read store per-request so rehydrated / post-login auth is always current.
    const auth = useUserPresistStore.getState().getAuth()
    if (auth) config.headers.set('Authorization', auth)

    config.timeout = 100_000

    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) return Promise.resolve(response.data)
    return Promise.reject(response)
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useUserPresistStore.getState().resetUser()
      if (typeof window !== 'undefined') {
        // Interceptor is outside React; full navigation clears in-memory app state.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- auth hard redirect
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export const isCancel = axios.isCancel
export default api
