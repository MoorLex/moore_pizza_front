import Vue from 'vue'
import Vuex from 'vuex'

import storage from './storage'
import cart from './cart'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    storage,
    cart
  }
})

export default store
