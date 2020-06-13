<template>
  <div class="">
    <NavBar />
    <section class="pt-5">
      <div class="container">
        <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-5"
             v-for="(pizza, i) in pizzas"
             :key="'pizza_' + i">
          <PizzaCard :pizza="pizza" />
        </div>
      </div>
      </div>
    </section>
    <Footer />
    <Menu />
  </div>
</template>

<script>
import { pizza } from '../api'
import NavBar from '../components/NavBar'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import PizzaCard from '../components/PizzaCard'

export default {
  data () {
    return {
      pizzas: []
    }
  },
  beforeRouteEnter (to, from, next) {
    pizza.list(1)
      .then((data) => {
        next((vm) => vm.setData(data))
      })
  },
  methods: {
    setData (data) {
      this.pizzas = data
    }
  },
  components: {
    Menu,
    NavBar,
    Footer,
    PizzaCard
  }
}
</script>
