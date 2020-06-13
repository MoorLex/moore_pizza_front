import { Storage } from './helpers'

const currency = {
  text: 'usd',
  sing: '$',
  value: 1
}

export default {
  namespaced: true,
  state: {
    menu: false,
    currency: Storage.get('currency') || currency
  },
  getters: {
    menu (state) {
      return state.menu
    },
    currency (state) {
      return state.currency
    }
  },
  mutations: {
    setCurrency (state, currency) {
      state.currency = currency
      Storage.set('currency', currency)
    },
    openMenu (state) {
      state.menu = true
    },
    closeMenu (state) {
      state.menu = false
    }
  }
}
