<template>
  <div class="form-check">
    <input
      :id="id"
      class="form-check-input"
      type="radio"
      :name="name"
      :checked="checked"
      @change="onRadioChange" 
    />
    <label class="custom-control-label" :for="id">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "SoftRadio",
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    value: { 
      type: String,
      default: null,
    }
  },
  methods: {
    onRadioChange(event) {
      if (event.target.checked) { 
        this.$emit('update:change', {id:event.target.id}  );
      }
    },
  }
};
</script>
