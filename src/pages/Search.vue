<template>
  <div class="">
    <NavBar />
    <section class="py-5"
             v-if="pizzas.length === 0">
      <div class="container py-5 text-center">
        <h4 class="font-weight-bold">No results found</h4>
        <p class="text-muted">It seems we can’t find any results based on your search</p>
      </div>
    </section>
    <section class="pt-5"
             v-else>
      <div class="container">
        <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-5"
             v-for="(pizza, i) in pizzas"
             :key="i">
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
  watch: {
    $route () {
      this.load()
    }
  },
  beforeRouteEnter (to, from, next) {
    const { query } = to.query
    pizza.list(1, { query })
      .then((data) => {
        next((vm) => vm.setData(data))
      })
  },
  methods: {
    async load () {
      const { query } = this.$route.query
      const data = await pizza.list(1, { query })
      this.setData(data)
    },
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
