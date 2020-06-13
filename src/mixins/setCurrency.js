export default function setCurrency () {
  return {
    computed: {
      currency () {
        return this.$store.getters['storage/currency']
      }
    },
    methods: {
      setCurrency (price) {
        return price * this.currency.value
      }
    }
  }
}
