<template>
  <div class="form-check">
    <input
      :id="id"
      class="form-check-input"
      type="checkbox"
      :name="name"
      :checked="checked"
      @change="onCheckboxChange"
    />
    <label :for="id" class="custom-control-label" :class="$attrs.class">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "SoftCheckbox",
  props: {
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onCheckboxChange(event) {
      this.$emit('update:change', { id: this.id, checked: event.target.checked });
    }
  }
};
</script>
