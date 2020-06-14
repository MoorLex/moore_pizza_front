import { api, HttpMethodsEnum } from '../index'

export default class Order {
  /**
   * Load order
   * @param {string} token
   */
  async load (token) {
    const { data } = await api.request(HttpMethodsEnum.GET, `/orders/${token}`)
    return data.data
  }

  /**
   * Create order
   * @param {Object} params
   */
  async create (params) {
    const { data } = await api.request(HttpMethodsEnum.POST, '/orders', params)
    return data.data
  }
}
