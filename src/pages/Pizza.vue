<template>
  <div class="">
    <NavBar />
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-8">
            <div class="ratio r-1x1 mb-4 d-md-none"
                 :style="{ backgroundImage: pizza.image ? `url(${pizza.image})` : undefined }" />
            <h1 class="title">{{ pizza.name }}</h1>
            <h5 class="font-weight-bold text-danger mb-4">{{ pizza.sub_title }}</h5>
            <p class="text-muted menu-description mb-4">{{ pizza.description }}</p>
            <p class="font-weight-bold lead mb-2">Size:</p>
            <div class="d-flex mb-4">
              <button class="btn btn-squire mr-2"
                      :class="i === form.size ? 'btn-danger' : 'btn-light'"
                      v-for="(size, i) in pizza.sizes"
                      @click="form.size = i"
                      :key="i">
                {{ size }}"
              </button>
            </div>
            <div class="row">
              <div class="col-12 col-lg-6 mb-4">
                <div class="p-3 bg-light rounded h-100">
                  <p class="font-weight-bold">Dough</p>
                  <FormRadio v-for="(item, i) in doughs"
                             :key="i"
                             :input-value="i"
                             v-model="form.dough">
                    <span>{{ item.name }}</span>
                    <span>+ {{ setCurrency(item.price).toFixed(2) }}{{ currency.sing }}</span>
                  </FormRadio>
                </div>
              </div>
              <div class="col-12 col-lg-6 mb-4">
                <div class="p-3 bg-light rounded h-100">
                  <p class="font-weight-bold">Crust</p>
                  <FormCheckBox v-for="(item, i) in crusts"
                                :key="i"
                                :input-value="i"
                                v-model="form.crust">
                    <span>{{ item.name }}</span>
                    <span>+ {{ setCurrency(item.price).toFixed(2) }}{{ currency.sing }}</span>
                  </FormCheckBox>
                </div>
              </div>
              <div class="col-12 col-lg-6 mb-4">
                <div class="p-3 bg-light rounded h-100">
                  <p class="font-weight-bold">Add</p>
                  <FormCheckBox v-for="(item, i) in adds"
                                :key="i"
                                :input-value="i"
                                v-model="form.add">
                    <span>{{ item.name }}</span>
                    <span>+ {{ setCurrency(item.price).toFixed(2) }}{{ currency.sing }}</span>
                  </FormCheckBox>
                </div>
              </div>
              <div class="col-12 col-lg-6 mb-4">
                <div class="p-3 bg-light rounded h-100">
                  <p class="font-weight-bold">Cheese</p>
                  <FormCheckBox v-for="(item, i) in cheeses"
                                :key="i"
                                :input-value="i"
                                v-model="form.cheese">
                    <span>{{ item.name }}</span>
                    <span>+ {{ setCurrency(item.price).toFixed(2) }}{{ currency.sing }}</span>
                  </FormCheckBox>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4 order-md-first">
            <div class="sticky-top pb-4"
                 style="top: 90px; z-index: 0">
              <div class="ratio r-1x1 mb-4 d-none d-md-block"
                   :style="{ backgroundImage: pizza.image ? `url(${pizza.image})` : undefined }" />
              <div class="mb-4">
                <div class="d-flex align-items-center"
                     v-if="form.dough">
                  <span>+ {{ doughs[form.dough].name }}</span>
                  <span class="border-bottom flex-fill mx-3" />
                  <span>{{ currency.sing }} {{ setCurrency(doughs[form.dough].price).toFixed(2) }}</span>
                </div>
                <div class="d-flex align-items-center"
                     v-for="(item, i) in form.crust"
                     :key="'crust_' + i">
                  <span>+ {{ crusts[item].name }}</span>
                  <span class="border-bottom flex-fill mx-3" />
                  <span>{{ currency.sing }} {{ setCurrency(crusts[item].price).toFixed(2) }}</span>
                </div>
                <div class="d-flex align-items-center"
                     v-for="(item, i) in form.add"
                     :key="'add_' + i">
                  <span>+ {{ adds[item].name }}</span>
                  <span class="border-bottom flex-fill mx-3" />
                  <span>{{ currency.sing }} {{ setCurrency(adds[item].price).toFixed(2) }}</span>
                </div>
                <div class="d-flex align-items-center"
                     v-for="(item, i) in form.cheese"
                     :key="'cheese_' + i">
                  <span>+ {{ cheeses[item].name }}</span>
                  <span class="border-bottom flex-fill mx-3" />
                  <span>{{ currency.sing }} {{ setCurrency(cheeses[item].price).toFixed(2) }}</span>
                </div>
              </div>
              <div class="d-flex align-items-center mb-4">
                <span class="font-weight-bold">Pizza {{ pizza.sizes ? pizza.sizes[form.size] : '' }}"</span>
                <span class="border-bottom flex-fill mx-3" />
                <span class="text-danger">{{ currency.sing }} {{ setCurrency(price).toFixed(2) }}</span>
              </div>
              <button class="btn btn-danger btn-block"
                      @click="addToBag">
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    <Menu />
  </div>
</template>

<script>
import setCurrency from '../mixins/setCurrency'
import { doughs, crusts, adds, cheeses } from '../constants'
import { pizza } from '../api'
import NavBar from '../components/NavBar'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import FormRadio from '../components/FormRadio'
import FormCheckBox from '../components/FormCheckBox'

export default {
  mixins: [
    setCurrency()
  ],
  props: {
    id: Number
  },
  data () {
    return {
      pizza: {},
      doughs,
      crusts,
      adds,
      cheeses,
      form: {
        size: 0,
        dough: 0,
        crust: [],
        add: [],
        cheese: []
      }
    }
  },
  computed: {
    price () {
      let price = this.pizza.price || 0
      price += this.doughs[this.form.dough].price
      if (this.pizza.sizes) {
        price += this.pizza.sizes[this.form.size] - 11
      }
      this.form.crust.map((item) => {
        price += this.crusts[item].price
      })
      this.form.add.map((item) => {
        price += this.adds[item].price
      })
      this.form.cheese.map((item) => {
        price += this.cheeses[item].price
      })
      return price.toFixed(2)
    }
  },
  beforeRouteEnter (to, from, next) {
    pizza.load(parseInt(to.params.id))
      .then((data) => {
        next((vm) => vm.setData(data))
      })
      .catch(() => {
        next({ name: 'NotFound', query: { from: to.path } })
      })
  },
  methods: {
    setData (data) {
      this.pizza = data
    },
    addToBag () {
      this.$store.commit('cart/add', {
        price: this.price,
        product: { ...this.pizza },
        settings: { ...this.form }
      })
    }
  },
  components: {
    Menu,
    NavBar,
    Footer,
    FormRadio,
    FormCheckBox
  }
}
</script>
