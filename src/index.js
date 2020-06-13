import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

import 'swiper/css/swiper.css'
import './styles/index.scss'

Vue.directive('keypress', {
  bind: function (el, binding, vnode) {
    el.addEventListener('keypress', (e) => {
      if (binding.arg && binding.arg === e.key.toLowerCase()) vnode.context[binding.expression](el.value)
      if (!binding.arg) vnode.context[binding.expression](el.value, e)
    })
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
