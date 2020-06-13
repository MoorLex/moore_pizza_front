<template>
  <div class="form-group">
    <label class="font-weight-bold"
           :class="{ 'text-danger': isInvalid, 'text-success': isValid }"
           v-if="label">
      <span>{{ label }}</span>
      <span class="text-danger"
            v-if="required">*</span>
    </label>
    <textarea ref="input"
              aria-label=""
              :rows="rows || 4"
              class="form-control"
              :class="{ 'is-invalid': isInvalid, 'is-valid': isValid }"
              v-model="_value" />
  </div>
</template>

<script>
export default {
  props: {
    rows: Number,
    label: String,
    required: Boolean,
    autoHeight: Boolean,
    isInvalid: Boolean,
    isValid: Boolean,
    value: [Number, String]
  },
  computed: {
    _value: {
      get () { return this.value },
      set (value) { this.$emit('input', value) }
    }
  },
  watch: {
    value () {
      this.$nextTick(() => {
        if (this.autoHeight) {
          const input = this.$refs.input
          input.style.height = 'auto'
          input.style.height = (input.scrollHeight) + 'px'
        }
      })
    }
  },
  mounted () {
    if (this.autoHeight) {
      const input = this.$refs.input
      this.$refs.input.setAttribute('style', 'height:' + (input.scrollHeight) + 'px;overflow-y:hidden;')
      input.style.height = 'auto'
      input.style.height = (input.scrollHeight) + 'px'
    }
  }
}
</script>
