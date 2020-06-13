import { api, HttpMethodsEnum } from '../index'

export default class Pizza {
  /**
   * Load pizza
   * @param {number} id
   */
  async load (id) {
    const { data } = await api.request(HttpMethodsEnum.GET, `/pizzas/${id}`)
    return data.data
  }

  /**
   * Load pizzas list
   * @param {number} [page]
   * @param {Object} [filters]
   * @param {string} [filters.query]
   */
  async list (page, filters = {}) {
    const params = {
      page: page || 1,
      ...filters
    }
    const { data } = await api.request(HttpMethodsEnum.GET, '/pizzas', params)
    return data.data
  }

  /**
   * Load popular pizzas list
   * @param {number} [page]
   */
  async popular (page) {
    const params = {
      page: page || 1
    }
    const { data } = await api.request(HttpMethodsEnum.GET, '/pizzas/popular', params)
    return data.data
  }
}
