import { Storage } from './helpers'

export default {
  namespaced: true,
  state: {
    products: Storage.get('cart') || []
  },
  getters: {
    products (state) {
      return state.products
    },
    price (state) {
      return state.products.reduce((total, { price }) => total + parseFloat(price), 0)
    }
  },
  mutations: {
    add (state, { product, settings, price }) {
      state.products.push({
        price,
        product,
        settings
      })
      Storage.set('cart', state.products)
    },
    remove (state, item) {
      state.products.splice(item, 1)
      Storage.set('cart', state.products)
    },
    flush (state) {
      state.products = []
      Storage.remove('cart')
    }
  }
}
