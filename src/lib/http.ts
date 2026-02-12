import axios from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean
  }
}

export const api = axios.create({
  baseURL: 'https://back-adico.test/api',
  withCredentials: true,
})

const refreshApi = axios.create({
  baseURL: 'https://back-adico.test/api',
  withCredentials: true,
})

let isRefreshing = false
let refreshPromise: Promise<any> | null = null

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config

    if (err.response?.status !== 401 || original._retry || original.skipAuth) {
      return Promise.reject(err)
    }

    original._retry = true

    try {
      if (!isRefreshing) {
        isRefreshing = true
        refreshPromise = refreshApi.post('/refresh').finally(() => {
          isRefreshing = false
        })
      }
      await refreshPromise
      return api(original)
    } catch (e) {
      await api.post('/logout', {}, { skipAuth: true })
      window.location.href = '/'
      return Promise.reject(e)
    }
  },
)
