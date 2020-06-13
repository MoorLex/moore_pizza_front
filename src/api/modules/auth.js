import { api, HttpMethodsEnum } from '../index'
import Observer from '../observer'

export default class Auth {
  constructor () {
    this.expiresAt = null
    this.refreshing = false
    this.token = {}
    this.observer = new Observer()
  }

  /**
   * Subscribe auth
   * @param {string} name
   * @param {function} fn
   */
  subscribe (name, fn) {
    this.observer.subscribe(name, fn)
    return () => { this.observer.unsubscribe(fn) }
  }

  isAuthenticated () {
    return this.expiresAt ? parseInt(this.expiresAt) >= Date.now() : false
  }

  getToken () {
    return this.token.token
  }

  setToken (token, expiresAt) {
    this.token = token
    if (expiresAt) {
      this.expiresAt = expiresAt
    } else {
      this.expiresAt = Date.now() + (token.expires_in * 1000)
    }
  }

  /**
   * @param {string} email
   * @param {string} password
   * @param {boolean} remember
   */
  async login (email, password, remember) {
    const { data } = await api.request(HttpMethodsEnum.POST, '/user/login', { email, password })
    this.setToken(data.data)
    this.observer.broadcast('login', { ...data.data, remember })
    return data
  }

  async refresh () {
    const { data } = await api.request(HttpMethodsEnum.POST, '/user/refresh')
    this.setToken(data.data)
    this.observer.broadcast('refresh', { ...data.data, remember: true })
    return data.data
  }

  logout () {
    this.token = {}
    this.expiresAt = undefined
    this.observer.broadcast('logout', undefined)
  }
}
