<template>
  <transition name="fade">
    <div class="app-menu"
         v-if="menu">
      <div class="close"
           @click="closeMenu" />
      <div class="menu">
        <div class="d-flex align-items-center p-3">
          <h4 class="title">Bag</h4>
          <button class="btn btn-squire ml-auto btn-white"
                  @click="closeMenu">
            <i class="icon-x" />
          </button>
        </div>
        <div class="list-group list-group-flush">
          <div class="list-group-item list-group-item-action"
               v-for="({ product, settings, price }, i) in cartItems"
               :key="'item_' + i">
            <div class="d-flex align-items-center mb-2">
              <h6 class="mb-0 font-weight-bold mr-auto">{{ product.name }} {{ product.sizes[settings.size] }}"</h6>
              <button class="btn btn-squire btn-sm"
                      @click="removeProduct(i)">
                <i class="icon-trash" />
              </button>
            </div>
            <div class="">
              <p class="mb-0 small"
                 v-if="settings.dough">
                + {{ doughs[settings.dough].name }}
              </p>
              <p class="mb-0 small"
                 v-for="(item, j) in settings.crust"
                 :key="'crust_' + j">
                + {{ crusts[item].name }}
              </p>
              <p class="mb-0 small"
                 v-for="(item, j) in settings.add"
                 :key="'add_' + j">
                + {{ adds[item].name }}
              </p>
              <p class="mb-0 small"
                 v-for="(item, j) in settings.cheese"
                 :key="'cheese_' + j">
                + {{ cheeses[item].name }}
              </p>
            </div>
            <h6 class="mb-0 mt-2 font-weight-bold mr-auto">{{ currency.sing }} {{ setCurrency(price).toFixed(2) }}</h6>
          </div>
        </div>
        <div class="p-3"
             v-if="cartPrice">
          <div class="d-flex align-items-center">
            <span class="font-weight-bold">Total price</span>
            <span class="border-bottom flex-fill mx-3" />
            <span class="font-weight-bold text-danger">{{ currency.sing }} {{ setCurrency(cartPrice).toFixed(2) }}</span>
          </div>
          <div class="mt-4"
               @click="closeMenu">
            <RouterLink class="btn btn-danger btn-block"
                        :to="{ name: 'CheckOut' }">
              <span>Check Out</span>
            </RouterLink>
          </div>
        </div>
        <div class="p-3 text-center"
             v-else>
          <p class="text-muted lead">Bag is empty</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import setCurrency from '../mixins/setCurrency'
import { doughs, crusts, adds, cheeses } from '../constants'

export default {
  mixins: [
    setCurrency()
  ],
  data () {
    return {
      doughs,
      crusts,
      adds,
      cheeses
    }
  },
  computed: {
    menu () {
      return this.$store.getters['storage/menu']
    },
    cartItems () {
      return this.$store.getters['cart/products']
    },
    cartPrice () {
      return this.$store.getters['cart/price']
    }
  },
  methods: {
    closeMenu () {
      this.$store.commit('storage/closeMenu')
    },
    removeProduct (item) {
      this.$store.commit('cart/remove', item)
    }
  }
}
</script>
