<template>
  <div class="">
    <NavBar />
    <section class="py-5">
      <div class="container">
        <h2 class="title mb-4">Billing Details</h2>
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item list-group-item-action">
              <dl class="row mb-0 align-items-center">
                <dt class="col-md-3">Status:</dt>
                <dd class="col-md-9 mb-0">
                  <button class="btn events-disable btn-sm"
                          :class="'btn-' + status.color">
                    {{ status.text }}
                  </button>
                </dd>
              </dl>
            </li>
            <li class="list-group-item list-group-item-action"
                v-for="(item, i) in ['created_at', 'first_name', 'last_name', 'email', 'phone', 'city', 'address', 'notes']"
                :key="i">
              <dl class="row mb-0">
                <dt class="col-md-3">{{ constants[item] }}:</dt>
                <dd class="col-md-9 mb-0">{{ order[item] }}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="pb-5">
      <div class="container">
        <h2 class="title mb-4">Order Details</h2>
        <div class="card mb-3"
             v-for="(product, i) in products"
             :key="i">
          <ul class="list-group list-group-flush">
            <li class="list-group-item list-group-item-action">
              <dl class="mb-0">
                <dt>{{ product.product.name }}</dt>
              </dl>
            </li>
            <li class="list-group-item list-group-item-action"
                v-if="product.settings.dough">
              <dl class="mb-0">
                <dd class="mb-0">+ {{ doughs[product.settings.dough].name }}</dd>
              </dl>
            </li>
            <li class="list-group-item list-group-item-action"
                v-for="(item, j) in product.settings.crust"
                :key="'crust_' + j">
              <dl class="mb-0">
                <dd class="mb-0">+ {{ crusts[item].name }}</dd>
              </dl>
            </li>
            <li class="list-group-item list-group-item-action"
                v-for="(item, j) in product.settings.add"
                :key="'add_' + j">
              <dl class="mb-0">
                <dd class="mb-0">+ {{ adds[item].name }}</dd>
              </dl>
            </li>
            <li class="list-group-item list-group-item-action"
                v-for="(item, j) in product.settings.cheese"
                :key="'cheese_' + j">
              <dl class="mb-0">
                <dd class="mb-0">+ {{ cheeses[item].name }}</dd>
              </dl>
            </li>
          </ul>
        </div>
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item list-group-item-action">
              <dl class="row mb-0">
                <dt class="col-md-3">Final Price:</dt>
                <dd class="col-md-9 mb-0 price text-danger font-weight-bold">{{ currency.sing }} {{ setCurrency(order.price).toFixed(2) }}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <Footer />
    <Menu />
  </div>
</template>

<script>
import setCurrency from '../mixins/setCurrency'
import { order } from '../api'
import { adds, cheeses, crusts, doughs, statuses } from '../constants'
import NavBar from '../components/NavBar'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

export default {
  mixins: [
    setCurrency()
  ],
  props: {
    id: Number
  },
  data () {
    return {
      doughs,
      crusts,
      adds,
      cheeses,
      statuses,
      constants: {
        created_at: 'Order Placed At',
        first_name: 'First Name',
        last_name: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        city: 'City',
        address: 'Address',
        notes: 'Order Notes'
      },
      order: {},
      products: []
    }
  },
  computed: {
    status () {
      const status = {
        text: 'No Data',
        color: 'muted',
        value: 0
      }
      return statuses.find(({ value }) => value === this.order.status) || status
    }
  },
  beforeRouteEnter (to, from, next) {
    order.load(parseInt(to.params.id))
      .then((data) => {
        next((vm) => vm.setData(data))
      })
      .catch(() => {
        next({ name: 'NotFound', query: { from: to.path } })
      })
  },
  methods: {
    setData (data) {
      this.order = data
      this.products = data.products
    }
  },
  components: {
    Menu,
    NavBar,
    Footer
  }
}
</script>
