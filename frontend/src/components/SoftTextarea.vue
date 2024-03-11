<template>
  <div class="form-group">
    <label :for="id" v-if="id">
      <slot />
    </label>
    <textarea
      :id="id"
      class="form-control"
      :rows="rows"
      :placeholder="placeholder"
      :style="{ height: height }"
      :value="modelValue"
      @input="updateValue"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "SoftTextarea",
  props: {
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Your text here...",
    },
    height: {
      type: String,
      default: "auto",
    },
    rows: {
      type: [String, Number],
      default: 5,
    },   
    modelValue: {
      type: [String, Number, Boolean, Object, Array], // Accept multiple types
      default: ""
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>
