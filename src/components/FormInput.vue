<template>
  <div class="form-group">
    <label class="font-weight-bold"
           :class="{ 'text-danger': isInvalid, 'text-success': isValid }"
           v-if="label">
      <span>{{ label }}</span>
      <span class="text-danger"
            v-if="required">*</span>
    </label>
    <input type="text"
           aria-label=""
           class="form-control"
           :class="{ 'is-invalid': isInvalid, 'is-valid': isValid }"
           v-model="_value">
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    required: Boolean,
    isInvalid: Boolean,
    isValid: Boolean,
    value: [Number, String]
  },
  computed: {
    _value: {
      get () { return this.value },
      set (value) { this.$emit('input', value) }
    }
  }
}
</script>
