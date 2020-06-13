<template>
  <div class="form-group">
    <div class="custom-control custom-checkbox"
         @click="$refs.input.click()">
      <input type="checkbox"
             aria-label=""
             ref="input"
             :value="inputValue"
             v-model="_value"
             class="custom-control-input">
      <label class="custom-control-label d-flex justify-content-between align-items-center">
        <slot />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    isInvalid: Boolean,
    isValid: Boolean,
    inputValue: [Number, String, Boolean],
    value: Array
  },
  computed: {
    _value: {
      get () { return this.value },
      set (value) { this.$emit('input', value) }
    }
  }
}
</script>
