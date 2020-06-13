import { api, HttpMethodsEnum } from '../index'
import Observer from '../observer'

export default class User {
  constructor () {
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

  /**
   * Load profile
   */
  async load () {
    const { data } = await api.request(HttpMethodsEnum.GET, '/user/me')
    this.observer.broadcast('load', data.data)
    return data.data
  }

  /**
   * Profile registration
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */
  async register (name, email, password) {
    const { data } = await api.request(HttpMethodsEnum.POST, '/user/register', { name, email, password })
    this.observer.broadcast('register', data.data)
    return data.data
  }

  /**
   * Profile update
   * @param {Object} params
   * @param {string} [params.name]
   * @param {string} [params.phone]
   * @param {string} [params.email]
   * @param {string} [params.birthday]
   * @param {string} [params.password]
   * @param {number} [params.city_id]
   */
  async update (params) {
    const { data } = await api.request(HttpMethodsEnum.PUT, '/user/me', params)
    this.observer.broadcast('update', data.data)
    return data.data
  }

  /**
   * Add media to user
   * @param {string} type
   * @param {Blob} file
   */
  async addMedia (type, file) {
    const formData = new FormData()
    formData.append('category', type)
    formData.append('media', file)
    const { data } = await api.request(HttpMethodsEnum.POST, '/user/media', formData)
    return data.data
  }

  /**
   * Add media to user disk
   * @param {Blob} file
   */
  async addToCloud (file) {
    const formData = new FormData()
    formData.append('media', file)
    const { data } = await api.request(HttpMethodsEnum.POST, '/user/cloud', formData)
    return data.data
  }

  /**
   * Get media from user cloud
   */
  async loadCloud () {
    const { data } = await api.request(HttpMethodsEnum.GET, '/user/cloud')
    return data.data
  }

  /**
   * Remove media from user cloud
   * @param {number} id
   */
  async removeFromCloud (id) {
    const { data } = await api.request(HttpMethodsEnum.DELETE, `/user/cloud/${id}`)
    return data.data
  }
}
