<template>
  <div class="input-group">
    <span class="input-group-text tp">
      {{ label }}
    </span>
    <select :id="id" :name="name" class="form-control t-c" v-model="selectedValue" @change="onSelectChange">
      <option class="p-5" v-for="(option, index) in processedOptions" :key="index" :value="option.value">
        {{ option.text }}
      </option>
      <slot />
    </select>
    <span class="input-group-text tp">
      <i class="fas fa-solid fa-caret-down"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "SoftSelect",
  props: {
    name: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    options: {
      type: [Array, Object],
      default: () => [],
    },
    value: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      selectedValue: this.getDefaultSelectedValue(),
    };
  },
  computed: {
    processedOptions() {
      if (Array.isArray(this.options)) {
        return this.options.map((option, index) => {
          return { value: index, text: option };
        });
      } else if (typeof this.options === 'object' && this.options !== null) {
        return Object.entries(this.options).map(([key, value]) => {
          return { value: key, text: value };
        });
      }
      return [];
    }
  },
  watch: {
    value(newVal) {
      this.selectedValue = newVal;
    }
  },
  methods: {
    getDefaultSelectedValue() {
      const options = this.getProcessedOptions();
      return this.value || (options[0] ? options[0].value : null);
    },
    getProcessedOptions() {
      if (Array.isArray(this.options)) {
        return this.options.map((option, index) => {
          return { value: index, text: option };
        });
      } else if (typeof this.options === 'object' && this.options !== null) {
        return Object.entries(this.options).map(([key, value]) => {
          return { value: key, text: value };
        });
      }
      return [];
    },
    onSelectChange(event) {
      this.$emit('update:value', event.target.value);
    },
  }
};
</script>

