<template>
  <div class="">
    <NavBar />
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-8">
            <div class="row">
              <div class="col-12 col-lg-6">
                <FormInput label="First Name"
                           required
                           :is-invalid="!!errors.first_name"
                           v-model="form.first_name" />
                <FormInput label="Town / City"
                           required
                           :is-invalid="!!errors.city"
                           v-model="form.city" />
                <FormInput label="Phone Number"
                           required
                           :is-invalid="!!errors.phone"
                           v-model="form.phone" />
              </div>
              <div class="col-12 col-lg-6">
                <FormInput label="Last Name"
                           required
                           :is-invalid="!!errors.last_name"
                           v-model="form.last_name" />
                <FormInput label="Street Address"
                           required
                           :is-invalid="!!errors.address"
                           v-model="form.address" />
                <FormInput label="Email Address"
                           required
                           :is-invalid="!!errors.email"
                           v-model="form.email" />
              </div>
            </div>
            <FormTextArea label="Order Notes"
                          :rows="8"
                          v-model="form.notes" />
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="sticky-top"
                 style="top: 90px; z-index: 0">
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
              <div class="p-3">
                <div class="d-flex align-items-center">
                  <span class="font-weight-bold">Total price</span>
                  <span class="border-bottom flex-fill mx-3" />
                  <span class="font-weight-bold text-danger">{{ currency.sing }} {{ setCurrency(cartPrice).toFixed(2) }}</span>
                </div>
                <button class="btn btn-danger btn-block mt-4"
                        @click="submit">
                  <span>Place Order</span>
                </button>
              </div>
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
import { order } from '../api'
import setCurrency from '../mixins/setCurrency'
import { adds, cheeses, crusts, doughs } from '../constants'
import NavBar from '../components/NavBar'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import FormInput from '../components/FormInput'
import FormTextArea from '../components/FormTextArea'
import Validation from '../utils/Validation'

export default {
  mixins: [
    setCurrency()
  ],
  data () {
    return {
      doughs,
      crusts,
      adds,
      cheeses,
      errors: {
        city: undefined,
        notes: undefined,
        email: undefined,
        phone: undefined,
        address: undefined,
        last_name: undefined,
        first_name: undefined
      },
      form: {
        city: '',
        notes: '',
        email: '',
        phone: '',
        address: '',
        last_name: '',
        first_name: ''
      },
      validation: {
        city: 'required',
        email: 'required|email',
        phone: 'required',
        address: 'required',
        last_name: 'required',
        first_name: 'required'
      }
    }
  },
  computed: {
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
    },
    async submit () {
      const products = this.cartItems.reduce((arr, { product, settings }) => [
        ...arr,
        {
          product_id: product.id,
          settings
        }
      ], [])
      try {
        await Validation(this.form, this.validation)
        const { token } = await order.create({
          products,
          price: this.cartPrice,
          ...this.form
        })
        this.$store.commit('cart/flush')
        await this.$router.replace({ name: 'Order', params: { token } })
      } catch (errors) {
        this.errors = errors
      }
    }
  },
  components: {
    Menu,
    NavBar,
    Footer,
    FormInput,
    FormTextArea
  }
}
</script>
