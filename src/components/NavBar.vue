<template>
  <div style="padding-top: 76px;">
    <nav class="navbar navbar-light bg-white fixed-top shadow-sm">
      <div class="container d-flex align-items-center position-relative">
        <RouterLink class="mr-auto"
                    :to="{ name: 'Home' }">
          <img src="/static/img/logo.svg"
               height="60"
               alt="logo">
        </RouterLink>
        <div class="position-relative flex-fill pl-3 d-none d-md-block"
             style="height: 40px; max-width: 300px">
          <div class="position-relative">
            <div class="navbar-search">
              <input type="text"
                     aria-label="search"
                     placeholder="Search..."
                     class="form-control"
                     v-keypress:enter="onEnter"
                     :class="{ active: query.length }"
                     v-model="query">
              <router-link class="btn"
                           :to="{ name: 'Search', query: { query } }">
                <i class="icon-search" />
              </router-link>
            </div>
          </div>
        </div>
        <button class="btn btn-squire px-3 ml-2 text-uppercase d-none d-md-block"
                v-for="(item, i) in currencies"
                :key="i"
                :class="currency.text === item.text ? 'btn-danger' : 'btn-white'"
                @click="updateCurrency(item)">
          {{ item.text }}
        </button>
        <button class="btn btn-white btn-squire ml-2"
                :class="{ 'px-3': cartPrice }"
                @click="openMenu">
          <i class="icon-shopping-bag" />
          <span class="ml-2 price position-relative"
                style="top: 1px;"
                v-if="cartPrice">
            {{ currency.sing }} {{ setCurrency(cartPrice).toFixed(2) }}
          </span>
        </button>
      </div>
    </nav>
    <div class="container d-md-none">
      <div class="d-flex py-3">
        <div class="position-relative flex-fill"
             style="height: 40px;">
          <div class="position-relative">
            <div class="navbar-search">
              <input type="text"
                     aria-label="search"
                     placeholder="Search..."
                     v-keypress:enter="onEnter"
                     class="form-control active"
                     v-model="query">
              <router-link class="btn"
                           :to="{ name: 'Search', query: { query } }">
                <i class="icon-search" />
              </router-link>
            </div>
          </div>
        </div>
        <button class="btn btn-squire px-3 ml-2 text-uppercase"
                v-for="(item, i) in currencies"
                :key="i"
                :class="currency.text === item.text ? 'btn-danger' : 'btn-white'"
                @click="setCurrency(item)">
          {{ item.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import setCurrency from '../mixins/setCurrency'

export default {
  mixins: [
    setCurrency()
  ],
  data () {
    return {
      query: '',
      currencies: [
        {
          text: 'usd',
          sing: '$',
          value: 1
        },
        {
          text: 'eur',
          sing: '€',
          value: 0.89
        }
      ]
    }
  },
  computed: {
    currency () {
      return this.$store.getters['storage/currency']
    },
    menu () {
      return this.$store.getters['storage/menu']
    },
    cartPrice () {
      return this.$store.getters['cart/price']
    }
  },
  methods: {
    onEnter () {
      this.$router.push({ name: 'Search', query: { query: this.query } })
    },
    openMenu () {
      this.$store.commit('storage/openMenu')
    },
    updateCurrency (currency) {
      this.$store.commit('storage/setCurrency', currency)
    }
  }
}
</script>
