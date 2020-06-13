<template>
  <div class="">
    <NavBar />
    <section class="py-5 hero">
      <Swiper class="swiper mb-5"
              ref="swiperHero"
              :options="{ slidesPerView: 1, initialSlide: 0, loop: true, loopedSlides: 3 }">
        <SwiperSlide v-for="(pizza, i) in pizzas"
                     :key="i">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-12 col-md-5 order-md-last mb-5 mb-md-0">
                <div class="ratio r-1x1"
                     :style="{ backgroundImage: `url(${pizza.image})` }" />
              </div>
              <div class="col-12 col-md-7">
                <h1 class="title">{{ pizza.name }}</h1>
                <h5 class="font-weight-bold mb-4">{{ pizza.title }}</h5>
                <p class="lead text-muted menu-description">{{ pizza.description }}</p>
                <div class="d-flex align-items-center mb-4">
                  <div class="mr-4">
                    <p class="m-0 font-weight-bold">{{ pizza.calories }}</p>
                    <p class="m-0">Calories</p>
                  </div>
                  <div class="">
                    <p class="m-0 font-weight-bold">{{ pizza.cheese }}g</p>
                    <p class="m-0">Cheese</p>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <RouterLink class="btn btn-danger mr-3 rounded-pill px-4"
                              :to="{ name: 'Pizza', params: { id: pizza.id } }">
                    More
                  </RouterLink>
                  <h2 class="price font-weight-bold mb-0">{{ currency.sing }} {{ setCurrency(pizza.price).toFixed(2) }}</h2>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="container d-none d-lg-block">
        <swiper class="swiper hero-thumbs"
                :options="{ slidesPerView: 3, touchRatio: 0.2, loop: true, loopedSlides: 3, slideToClickedSlide: true }"
                ref="swiperThumbs">
          <SwiperSlide class="px-3"
                       v-for="(pizza, i) in pizzas"
                       :key="i">
            <div class="card border-0">
              <div class="card-body d-flex align-items-center">
                <div style="flex: 0 0 50px">
                  <div class="ratio r-1x1"
                       :style="{ backgroundImage: `url(${pizza.image})` }" />
                </div>
                <div class="pl-3">
                  <h6 class="font-weight-bold mb-0">{{ pizza.name }}</h6>
                  <p class="mb-0">{{ currency.sing }} {{ setCurrency(pizza.price).toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </swiper>
      </div>
    </section>
    <section class="py-5 menu">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-md-6 px-md-5">
            <div class="ml-auto"
                 style="max-width: 520px">
              <h5 class="font-weight-bold text-danger">Pizza Menu</h5>
              <h1 class="title mb-4">Our Passion, Our Heritage, Our Pizzas</h1>
              <p class="lead text-muted mb-5">Donec auctor, mi a ullamcorper varius, nisl mi cursus nulla, vel ultricies purus quam vel quam. Maecenas fringilla eros eu vehicula dictum.</p>
              <div class="row">
                <div class="col-12 col-xl-6 mb-4 mb-xl-3"
                     v-for="(pizza, i) in pizzas"
                     :key="i">
                  <RouterLink class="d-flex align-items-center mb-3 text-dark"
                              :to="{ name: 'Pizza', params: { id: pizza.id } }">
                    <span class="font-weight-bold">{{ pizza.name }}</span>
                    <span class="font-weight-bold border-bottom flex-fill mx-3" />
                    <span class="text-danger price">{{ currency.sing }} {{ setCurrency(pizza.price).toFixed(2) }}</span>
                  </RouterLink>
                  <p class="text-muted mb-0 menu-description">{{ pizza.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 d-none d-md-block">
            <div class="fill-parent bg-image rounded-left"
                 :style="{ backgroundImage: `url(http://androthemes.com/themes/html/slices/assets/img/categories-lg/4.jpg)` }" />
          </div>
        </div>
      </div>
    </section>
    <section class="py-5 about">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6 py-5 py-md-0">
            <div class="py-5 py-md-0 h-100">
              <div class="fill-parent rounded bg-image"
                   :style="{ backgroundImage: `url(http://androthemes.com/themes/html/slices/assets/img/auth.jpg)` }" />
            </div>
          </div>
          <div class="col-12 col-lg-6 pt-5 p-lg-5">
            <h5 class="font-weight-bold text-danger">Sir Moore's Heritage</h5>
            <h1 class="title mb-4">Serving Pizzas By The Slice Since 2020</h1>
            <p class="lead text-muted">Donec tellus odio, iaculis nec magna id, convallis blandit metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus lorem a tristique gravida. Fusce mi tortor, tristique non finibus nec, pretium sed leo.</p>
            <p class="lead text-muted mb-4">Nam vitae dolor diam. In tempus erat sit amet semper placerat. Mauris eu dui eget dui efficitur fermentum.</p>
            <RouterLink class="btn btn-danger mr-3 rounded-pill px-4"
                        :to="{ name: 'Menu' }">
              Check our menu
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
    <section class="py-5 popular">
      <div class="container">
        <h5 class="font-weight-bold text-danger">Trending</h5>
        <h1 class="title mb-4">Our Customers' Top Picks</h1>
        <Swiper class="swiper"
                :options="popularOptions">
          <SwiperSlide v-for="(pizza, i) in popular"
                       :key="i">
            <PizzaCard class="px-3"
                       :pizza="pizza" />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
    <Footer />
    <Menu />
  </div>
</template>

<script>
import { pizza } from '../api'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import setCurrency from '../mixins/setCurrency'
import NavBar from '../components/NavBar'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import PizzaCard from '../components/PizzaCard'

export default {
  mixins: [
    setCurrency()
  ],
  data () {
    return {
      pizzas: [],
      popular: [],
      popularOptions: {
        slidesPerView: 1,
        initialSlide: 0,
        breakpoints: {
          992: {
            slidesPerView: 3
          },
          768: {
            slidesPerView: 2
          }
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    pizza.list(1)
      .then((data) => {
        next((vm) => vm.setData(data))
      })
  },
  created () {
    this.loadPopular()
  },
  methods: {
    async loadPopular () {
      this.popular = await pizza.popular()
    },
    setData (data) {
      this.pizzas = data

      this.$nextTick(() => {
        const swiperHero = this.$refs.swiperHero.$swiper
        const swiperThumbs = this.$refs.swiperThumbs.$swiper
        swiperHero.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperHero
      })
    }
  },
  components: {
    Menu,
    NavBar,
    Footer,
    PizzaCard,
    Swiper,
    SwiperSlide
  }
}
</script>
