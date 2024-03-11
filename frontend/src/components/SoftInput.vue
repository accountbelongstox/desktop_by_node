<template>
  <div class="input-group">
    <div :class="hasIcon(icon)">
      <span v-if="label" class="input-group-text tp">
        {{ label }}
      </span>
      <span v-else-if="iconDir === 'left' && !noIcon" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <input
        :id="id"
        :type="type"
        class="form-control c-t"
        :class="getClasses(size, success, error)"
        :name="name"
        :placeholder="placeholder"
        :isRequired="isRequired"
        :value="modelValue"
        :label="label"
        @input="updateValue"
      />
      <span v-if="iconDir === 'right' && !label && !noIcon" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SoftInput",
  props: {
    size: {
      type: String,
      default: "default",
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "fa fa-circle",
    },
    iconDir: {
      type: String,
      default: "left",
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Type here...",
    },
    type: {
      type: [String, Number,Boolean],
      default: "text",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },  
    noIcon: {
      type: Boolean,
      default: false,
    },     
    modelValue: {
      type: [String, Number, Boolean, Object, Array], // Accept multiple types
      default: ""
    },
  },
  methods: {
    getClasses: (size, success, error) => {
      let sizeValue, isValidValue;

      sizeValue = size ? `form-control-${size}` : null;

      if (error) {
        isValidValue = "is-invalid";
      } else if (success) {
        isValidValue = "is-valid";
      } else {
        isValidValue = "";
      }

      return `${sizeValue} ${isValidValue}`;
    },
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    getIcon: (icon) => (icon ? icon : null),
    hasIcon: (icon) => (icon ? "input-group" : null),
  },
};
</script>
<style>
.tp{
  padding: 0 5px !important;
}
.c-t{
  text-align: center !important;
}
</style>