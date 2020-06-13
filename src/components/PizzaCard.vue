<template>
  <div class="pizza-card">
    <div class="p-3">
      <div class="ratio r-1x1"
           :style="{ backgroundImage: `url(${pizza.image})` }" />
    </div>
    <h5 class="title">{{ pizza.name }}</h5>
    <p class="text-muted menu-description mb-4">{{ pizza.description }}</p>
    <RouterLink class="btn btn-outline-danger w-100 d-flex justify-content-between"
                :to="{ name: 'Pizza', params: { id: pizza.id } }">
      <span>More</span>
      <span>{{ currency.sing }}{{ setCurrency(pizza.price).toFixed(2) }}</span>
    </RouterLink>
  </div>
</template>

<script>
import setCurrency from '../mixins/setCurrency'

export default {
  mixins: [
    setCurrency()
  ],
  props: {
    pizza: Object
  }
}
</script>
