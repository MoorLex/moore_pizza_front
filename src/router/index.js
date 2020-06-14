import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../pages/Home')
const Menu = () => import('../pages/Menu')
const Pizza = () => import('../pages/Pizza')
const Order = () => import('../pages/Order')
const Search = () => import('../pages/Search')
const CheckOut = () => import('../pages/CheckOut')
const NotFound = () => import('../pages/NotFound')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/check_out',
    name: 'CheckOut',
    component: CheckOut
  },
  {
    path: '/pizza/:id',
    props: route => ({
      id: parseInt(route.params.id)
    }),
    name: 'Pizza',
    component: Pizza
  },
  {
    path: '/order/:token',
    props: route => ({
      token: route.params.token
    }),
    name: 'Order',
    component: Order
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

export default new Router({
  linkActiveClass: 'active',
  hashbang: false,
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else if (to.hash) return { selector: to.hash }
    else return { x: 0, y: 0 }
  }
})
