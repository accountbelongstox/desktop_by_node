
<template>
  <div v-if="showType === 'addShop'">
    <div class="mb-3">
      <soft-input v-model="localData.account" type="text" placeholder="账号" aria-label="账号" @input="onInput" />
    </div>
    <div class="mb-3">
      <soft-input v-model="localData.password" type="text" placeholder="密码" aria-label="密码" @input="onInput" />
    </div>

    <div class="mb-3">
      <soft-textarea v-model="localData.bindShopUrls" rows="10" placeholder="导入商品网页连接,一行一个" aria-label="导入商品网页连接,一行一个"
        @input="onInput" />
    </div>
    <div class="mb-3">
      <soft-input v-model="localData.cookie" type="text" placeholder="登陆cookie(有则填)" aria-label="登陆cookie(有则填)"
        @input="onInput" />
    </div>
  </div>
  <div v-if="showType.startsWith('addProductLink')">
    <div class="mt-2 position-relative text-center">
      <p class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 px-3"> (该商户追加上货链接) </p>
      <br />
      <p class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 px-3"> 一行一个</p>
      <br />
      <p class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 px-3"> 追加到: </p>
      <br />
      <p class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 px-3"> 账号:{{
        this.$store.state.activeShop.account }} </p>
      <br />
      <p class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 px-3"> 识别Id:{{
        this.$store.state.activeShop.id }}</p>
      <br />
      <p class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 px-3"> 当前有:{{
        this.$store.state.activeShop.bindShopUrlsCount }} 条商品</p>
    </div>
    <div class="mb-3">
      <soft-textarea v-model="localData.addProductWebLink" rows="20" placeholder="追加商品网页连接,一行一个"
        aria-label="追加商品网页连接,一行一个" @input="onInput" />
    </div>
  </div>

  <div v-if="showType === 'exportShop'">
    <div class="mb-3">
      <soft-textarea v-model="localData.accounts" rows="16" placeholder="账号密码,一行一个(使用空格分隔)" aria-label="账号密码,一行一个(使用空格分隔)"
        @input="onInput" />
    </div>
  </div>

  <div v-if="showType === 'addShop' || showType === 'exportShop'">
    <div class="mb-3">
      <soft-input v-model="localData.deliveryQuantity" type="number" placeholder="上货数量(默认0)" aria-label="上货数量(默认0)"
        @input="onInput" />
    </div>
  </div>

  <div v-if="showType === 'exportProduct'">
    <div class="mb-3">
      <soft-textarea v-model="localData.exportProducts" rows="18" placeholder="导入商品URL连接,一行一个" aria-label="导入商品URL连接,一行一个"
        @input="onInput" />
    </div>
  </div>

  <div v-if="showType === 'addProductType'">
    <div class="mb-3">
      <soft-input v-model="localData.newProducts" type="text" placeholder="商品分类" aria-label="商品分类" @input="onInput" />
    </div>
  </div>

  <div v-if="showType === 'addShop' || showType === 'exportShop' || showType === 'addProductType'">
    <div v-for="item in inputCheckListBind" :key="item.id">
      <soft-checkboxtrue :id="item.id" :name="item.id" class="font-weight-light" :checked="checkedList.includes(item.id)"
        @update:change="updateCheck">{{ item.name }}</soft-checkboxtrue>
    </div>
  </div>

  <div v-if="showType === 'exportProduct'">
    <div v-for="item in inputCheckListBind" :key="item.id">
      <soft-radio :id="item.id" :name="showType" class="font-weight-light" :checked="radioDict.exportProductId == item.id"
        @update:change="updateRadio">{{ item.name }} ({{ item.id }})</soft-radio>
    </div>
  </div>
</template>

<script>
import SoftInput from "./SoftInput.vue";
import SoftCheckboxtrue from "./SoftCheckboxtrue.vue";
import SoftRadio from "./SoftRadio.vue";
import SoftTextarea from "./SoftTextarea.vue";
import { reactive, toRefs, watch } from 'vue';

export default {
  name: "AddPanelForm",
  components: {
    SoftInput,
    SoftCheckboxtrue,
    SoftTextarea,
    SoftRadio
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
      default: () => [],
      required: true
    },
    showType: {
      type: String,
      default: () => '',
      required: true
    }
  },
  data() {
    const data = reactive({
      localData: { ...this.inputDataBind },
      checkedList: this.outputCheckListBind.length > 0 ? this.outputCheckListBind : [],
      radioDict: {
        exportProductId: this.inputCheckListBind.length > 0 ? this.inputCheckListBind[0].id : ''
      }
    });
    return { ...toRefs(data) };
  },
  created() {

    if (this.inputCheckListBind.length > 0 && !this.radioDict.exportProductId) {
      this.radioDict.exportProductId = this.inputCheckListBind[0].id;
    }

    watch(() => this.outputCheckListBind, (newVal) => {
      if (newVal.length > 0 && this.checkedList.length === 0) {
        this.checkedList = newVal;
      }
    });
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
    updateRadio({ id }) {
      this.radioDict.exportProductId = id;
      this.$emit('update:radio', id);
    }
  }
};
</script>

<style lang="scss"></style>