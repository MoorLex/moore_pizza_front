import Api from './api'
import Auth from './modules/auth'
import User from './modules/user'
import Pizza from './modules/pizza'
import Order from './modules/order'

const HttpMethodsEnum = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}

const api = new Api()
const map = new Map()
const auth = new Auth()
const user = new User()
const pizza = new Pizza()
const order = new Order()

export default api
export {
  api,
  map,
  auth,
  user,
  pizza,
  order,
  HttpMethodsEnum
}
