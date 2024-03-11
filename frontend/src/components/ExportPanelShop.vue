
<template>
      <div class="mb-3">
        <soft-textarea 
          v-model="localData.account" 
          placeholder="账号密码,一行一个(使用空格分隔)" 
          aria-label="account"
         />
      </div>
      <div class="mb-3">
        <soft-input
          v-model="localData.deliveryQuantity"
          type="number"
          placeholder="上货数量"
          aria-label="上货数量"
          @input="onInput"
        />
      </div>
      <div v-for="item in inputCheckListBind" :key="item.id">
        <soft-checkboxtrue
          :id="item.id"
          :name="item.id"
          class="font-weight-light"
          v-model="checkedList"
          :checked="checkedList.includes(item.id)"
          @update:change="updateCheck"
        >{{ item.data }}</soft-checkboxtrue>
      </div>
</template>

<script>
import SoftInput from "./SoftInput.vue";
import SoftCheckboxtrue from "./SoftCheckboxtrue.vue";
import SoftTextarea from "./SoftTextarea.vue";

export default {
  name:"ExportPanelShop",
  components: {
    SoftInput,
    SoftCheckboxtrue,
    SoftTextarea,
  },
  props: {
    inputDataBind: {
      type: Object,
      required: true
    },
    inputCheckListBind: {
      type: Array,
      required: true
    },
    outputCheckListBind: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localData: { ...this.inputDataBind },
      checkedList:this.outputCheckListBind
    };
  },  
  methods: {
    onInput() {
      this.$emit('update:input', this.localData);
    },
    updateCheck({ id, checked }) {
      if (checked && !this.checkedList.includes(id)) {
        this.checkedList.push(id);
      } else if (!checked && this.checkedList.includes(id)) {
        this.checkedList = this.checkedList.filter(cId => cId !== id);
      }
      this.$emit('update:checked', this.checkedList);
    },
  }
};
</script>

<style lang="scss">
</style>