import axios from 'axios'
import { auth, HttpMethodsEnum } from './index'
import Observer from './observer'

export default class Api {
  constructor () {
    this.subscribers = []
    this.observer = new Observer()
    this.baseUrl = process.env.API_URL || 'http://127.0.0.1:8000/api'
    this.axios = axios.create({
      baseURL: this.baseUrl
    })
    this.axios.interceptors.request.use((config) => {
      config.requestStartTime = Date.now()
      return config
    })
    this.axios.interceptors.response.use((response) => {
      response.config.requestTime = Date.now() - response.config.requestStartTime
      return response
    })
  }

  async request (method, url, params, headers = {}) {
    this.observer.broadcast('request', { method, url, params, headers })
    if (auth.getToken()) {
      headers.Authorization = 'Bearer ' + auth.getToken()
    }
    if (auth.expiresAt && auth.expiresAt <= Date.now()) {
      if (!auth.refreshing) {
        auth.refreshing = true
        auth.expiresAt = undefined
        this.subscribers = []
        try {
          await auth.refresh()
          auth.refreshing = false
        } catch (e) {
          this.observer.broadcast('refresh_filed', this.subscribers[this.subscribers.length - 1])
        }
        const r = this.subscribers[this.subscribers.length - 1] || { method, url, params, headers }
        return this.request(r.method, r.url, r.params, r.headers)
      }
      this.subscribers.push({ method, url, params, headers })
    } else {
      const config = {
        method: (method === HttpMethodsEnum.PUT) ? HttpMethodsEnum.POST : method,
        headers: headers,
        url: url
      }
      if (method === HttpMethodsEnum.GET) {
        config.params = params
      } else if (method === HttpMethodsEnum.POST) {
        if (params instanceof FormData) {
          headers['Content-Type'] = 'multipart/form-data'
        }
        config.data = params
      } else if (method === HttpMethodsEnum.PUT) {
        config.data = { ...params, _method: 'put' }
      }
      return this.axios.request(config)
    }
  }
}
