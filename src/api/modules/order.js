import { api, HttpMethodsEnum } from '../index'

export default class Order {
  /**
   * Load order
   * @param {number} id
   */
  async load (id) {
    const { data } = await api.request(HttpMethodsEnum.GET, `/orders/${id}`)
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
