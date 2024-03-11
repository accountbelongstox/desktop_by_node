<template>
  <div class="fixed-plugin">
    <a class="px-3 py-2 fixed-plugin-button text-dark position-fixed" @click="handleToggleAddshop('close')">
      <i class="py-2 fa fa-cog"> </i>
    </a>
    <div class="shadow-lg card-shop blur">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div class="mt-4 float-end" @click="handleToggleAddshop('close')">
          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div class="pt-4 text-center card-header">
          <h5 v-if="showType === 'addShop'">商铺账号添加</h5>
          <h5 v-if="showType === 'exportShop'">导入商铺账号</h5>
          <h5 v-if="showType === 'addProductType'">添加商品分类</h5>
          <h5 v-if="showType === 'exportProduct'">导入商品连接</h5>
          <h5 v-if="showType.startsWith('addProductLink')">追加商品链接</h5>
        </div>
        <div class="card-body">
          <div class="text-center w-b">
            <a class="btn bg-gradient-success w-100 px-3 mb-2 w-100" @click="submitForm(showType)">确认</a>
          </div>
          <AddPanelForm :inputDataBind="accountAndProductForm" :inputCheckListBind="productCategories"
            :outputCheckListBind="categories" :showType="showType" @update:input="updateAccountAndProductForm"
            @update:checked="updateCategories" @update:radio="updateExportProductId" />
        </div>
      </div>
      <hr class="my-1 horizontal dark" />
      <div class="pt-0 card-body pt-sm-3">
      </div>
    </div>
  </div>
</template>

<script>
import { socket } from "../api/socket"
import { mapMutations } from "vuex";
import SoftInput from "@/components/SoftInput.vue";
import SoftCheckboxtrue from "@/components/SoftCheckboxtrue.vue";
import SoftButton from "@/components/SoftButton.vue";
import mittEvent from '@/store/mitt';
import AddPanelForm from '@/components/AddPanelForm.vue';

export default {
  name: "AddAndExportShop",
  props: {
    toggle: Function,
    showType: {
      type: String,
      default: "addShop"
    },
    shopId: {
      type: String,
      default: ""
    },
  },
  components: {
    SoftInput,
    SoftCheckboxtrue,
    SoftButton,
    AddPanelForm,
  },
  emits: [],
  data() {
    return {
      accountInfo: {
        username: "Admin",
      },
      accountAndProductForm: {
        newProducts: '',
        exportProducts: '',
        exportProductId: '',
        bindShopUrls: '',
        addProductWebLink: '',
        isCollecting: true,
        accounts: "",
        account: "",
        password: "",
        cookie: "",
        deliveryQuantity: "",
        alreadyInStock: 0,
        createdBy: "Admin",
      },
      categories: [],
      productCategories: []
    }
  },
  methods: {
    updateExportProductId(id) {
      this.accountAndProductForm.exportProductId = id
    },
    updateAccountAndProductForm(data) {
      this.accountAndProductForm = data
    },
    updateCategories(data) {
      this.categories = data
    },
    submitAddShop() {
      if (!this.accountAndProductForm.account || !this.accountAndProductForm.password) {
        this.$notify({
          title: '信息缺失',
          text: '账号、密码 不能为空.',
          type: "warn"
        });
        return;
      }
      const data = {
        account: this.accountAndProductForm.account,
        password: this.accountAndProductForm.password,
        cookie: this.accountAndProductForm.cookie,
        categories: this.categories,
        isCollecting: this.isCollecting,
        deliveryQuantity: this.accountAndProductForm.deliveryQuantity ? this.accountAndProductForm.deliveryQuantity : 0,
        alreadyInStock: this.accountAndProductForm.alreadyInStock,
        createdBy: this.accountAndProductForm.createdBy
      };
      socket.postByProduct('addShop', data, (response) => {
        this.updateProductData(response)
        this.accountAndProductForm.account = '';
        this.accountAndProductForm.password = '';
        this.accountAndProductForm.cookie = '';
        this.$notify({
          title: '添加成功',
          text: `识别ID: ${response.id} 
          账号: ${response.account} 
          密码: ${response.password} 
          添加日期: ${response.createdAt} 
          添加人: ${response.createdBy}  
          `,
          type: "success"
        });
      });
    },

    submitExportShop() {
      if (!this.accountAndProductForm.accounts) {
        this.$notify({
          title: '信息缺失',
          text: '要导入的账号不能为空.',
          type: "warn"
        });
        return;
      }
      const data = {
        account: this.accountAndProductForm.account,
        password: this.accountAndProductForm.password,
        categories: this.categories,
        deliveryQuantity: this.accountAndProductForm.deliveryQuantity ? this.accountAndProductForm.deliveryQuantity : 0,
        alreadyInStock: this.accountAndProductForm.alreadyInStock,
        createdBy: this.accountAndProductForm.createdBy
      };
      socket.postByProduct('addShop', data, (response) => {
        this.updateProductData(response)
        this.accountAndProductForm.account = '';
        this.accountAndProductForm.password = '';
        this.$notify({
          title: '添加成功',
          text: `识别ID: ${response.id} 
          账号: ${response.account} 
          密码: ${response.password} 
          添加日期: ${response.createdAt} 
          添加人: ${response.createdBy}  
          `,
          type: "success"
        });
      });
    },
    submitAddProductType() {
      if (!this.accountAndProductForm.account || !this.accountAndProductForm.password || !this.categories.length) {
        this.$notify({
          title: '信息缺失',
          text: '账号、密码、上货数量、商品分类 不能为空.',
          type: "warn"
        });
        return;
      }
    },
    async submitExportProduct() {
      let requiredMessage = []
      if (!this.accountAndProductForm.exportProducts) {
        requiredMessage.push(`商品连接`)
      }
      if (!this.accountAndProductForm.exportProductId) {
        requiredMessage.push(`商品商品类别ID`)
      }
      if (!this.accountAndProductForm.exportProducts || !this.accountAndProductForm.exportProductId) {
        requiredMessage = this.joinMessage(requiredMessage)
        this.$notify({
          title: '信息缺失',
          text: requiredMessage,
          type: "warn"
        });
        return;
      }
      const { validUrls } = this.processUrls(this.accountAndProductForm.exportProducts);
      if (validUrls.length === 0) {
        requiredMessage = []
        requiredMessage.push(`没有有效URL`)
        requiredMessage = this.joinMessage(requiredMessage)
        this.$notify({
          title: '信息缺失',
          text: requiredMessage,
          type: "warn"
        });
        return;
      }
      this.$swal({
        title: '提交中...',
        html: '请等待，数据正在提交中。',
        didOpen: () => {
          this.$swal.showLoading()
        },
      });
      const pid = this.accountAndProductForm.exportProductId;
      const data = {
        products: validUrls,
        pid,
        createBy: this.accountInfo.username
      };
      socket.postByProduct('addProductList', data, (response) => {
        this.accountAndProductForm.exportProducts = '';
        setTimeout(() => {
          this.$swal.close();
          requiredMessage = []
          let title
          let type
          if (response && response.createAt) {
            title = `添加成功`
            type = `success`
            requiredMessage.push(`商品类别: ${pid}`)
            requiredMessage.push(`添加成功: ${response.addCount}`)
            requiredMessage.push(`已经存在: ${response.existingCount}`)
            requiredMessage.push(`添加日期: ${response.createAt}`)
            requiredMessage.push(`添加人: ${response.createBy}`)
          } else {
            title = `添加失败`
            type = `warn`
            requiredMessage.push(`商品类别: ${pid}`)
            requiredMessage.push(`返回信息: ${response}`)
          }
          requiredMessage = this.joinMessage(requiredMessage)
          this.$notify({
            title,
            text: requiredMessage,
            type
          });
        }, 1000);
      });
    },
    submitAddProductLink() {
      if (this.accountAndProductForm.addProductWebLink) {
        const { validUrls } = this.processUrls(this.accountAndProductForm.addProductWebLink);
        const params = {
          id: this.$store.state.activeShop.id,
          data: validUrls
        };
        socket.postByProduct('bindShopUrls', params,(data) => {
          const {
            addCount,
            existsCount
          } = data
          this.$notify({
            title: '提示',
            text: `账号: ${this.$store.state.activeShop.account} 上货商品链接添加成功, 添加: ${addCount}条，已存在：${existsCount}条.`,
            type: `${addCount ? 'success' : 'warn'}`,
          });
          if(!this.$store.state.activeShop.bindShopUrlsCount)this.$store.state.activeShop.bindShopUrlsCount = 0
          this.$store.state.activeShop.bindShopUrlsCount += addCount
          this.accountAndProductForm.addProductWebLink = ''
          mittEvent.emit('update-shop-info', this.$store.state.activeShop);
        })
      }
    },
    submitForm(showType) {
      if (showType === 'addShop') {
        this.submitAddShop();
      } else if (showType === 'exportShop') {
        this.submitExportShop();
      } else if (showType === 'addProductType') {
        this.submitAddProductType();
      } else if (showType === 'exportProduct') {
        this.submitExportProduct();
      } else if (showType.startsWith('addProductLink')) {
        this.submitAddProductLink();
      } else {
        console.error('Unknown showType:', showType);
      }
    },
    processUrls(rawUrls) {
      const urls = rawUrls.split('\n').map(url => url.trim());
      const validUrls = [];
      const invalidUrls = [];
      urls.forEach(url => {
        if (!url.startsWith('http')) {
          url = 'http://' + url;
        }
        if (this.isValidUrl(url)) {
          validUrls.push(url);
        } else {
          invalidUrls.push(url);
        }
      });

      return { validUrls, invalidUrls };
    },
    isValidUrl(url) {
      if (url.indexOf(`.`) == -1) return false;
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    },
    joinMessage(requiredMessage) {
      requiredMessage = requiredMessage.join(' , ')
      requiredMessage = `必须字段 ：` + requiredMessage
      return requiredMessage
    },
    joinMessageHTML(requiredMessage) {
      requiredMessage = requiredMessage.map(message => {
        return `<span style="color:red">必须：${message}</span>`;
      });
      requiredMessage = requiredMessage.join('<br />')
      return requiredMessage
    },
    updateProductData(newData) {
      mittEvent.emit('update-product-by-addshop', newData);
    },
    ...mapMutations(["toggleAddshop"]),
    handleToggleAddshop(payload) {
      this.toggleAddshop(payload);
    },
    putProductCategories() {
      console.log(`putProductCategories`)
      mittEvent.emit('update-productCategories', this.productCategories);
    }
  },
  created() {
    mittEvent.on('get-productCategories', this.putProductCategories);
  },
  mounted() {
    socket.getByProduct('getProductCategoriesAndCount', (data) => {
      this.productCategories = data
    });
  },
  beforeUnmount() {
    mittEvent.off('get-productCategories', this.putProductCategories);
  },
};
</script>

<style lang="scss">
.fixed-plugin {
  width: auto;
  overflow: hidden;
  margin-left: 0px;

  .float-start {
    width: 100px;
    height: 50px;

    .mt-3 {
      position: fixed;
      top: 16px;
      left: 130px;
    }
  }

  .addTable label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .addTable input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  .addTable button {
    width: 100%;
    padding: 10px;
    background-color: #5bc0de;
    /* Bootstrap's info color */
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  .addTable button:hover {
    background-color: #46b8da;
    /* Darker shade on hover */
  }

  .w-b {
    padding-bottom: 10px !important;
  }
}
</style>

