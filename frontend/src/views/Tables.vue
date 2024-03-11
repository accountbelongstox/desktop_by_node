<template>
  <div class="py-n container-fluid">
    <div class="row">
      <info-bar></info-bar>
    </div>


    <div class="row m-b">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div>
                <p class="mb-0 text-sm text-capitalize font-weight-bold">快捷功能</p>
              </div>
              <div class="bt-3 distributed">
                <div class="w-e distributed">
                  <div class="sItem">
                    <button class="px-3 btn bg-gradient-info w-100 w-b-0" @click="handleToggleAddshop('exportProduct')">
                      批量导入商品URL
                    </button>
                  </div>
                  <div class="sItem">
                    <button class="px-3 btn bg-gradient-dark w-100 w-b-0" @click="handleToggleAddshop('addProductType')">
                      添加分类
                    </button>
                  </div>
                  <div class="sItem">
                    <button class="px-3 btn btn-outline-dark w-100 w-b-0" @click="getPddCookie">
                      获取Cookie
                    </button>
                  </div>
                  <div class="sItem">
                    <soft-input v-model="pdd.cookieStr" label="Cookie" placeholder="Cookie" aria-label="Cookie"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-t distributed"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row restrain-h">
      <div class="col-12">
        <product-list />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.py-n {
  padding-top: 0 !important;
  padding-bottom: 1.5rem !important;
}

.restrain-h {
  height: 720px !important;
  overflow: hidden !important;
  overflow-y: scroll !important;
}

.m-b {
  margin-bottom: 20px;
}

.w-b-0 {
  margin-bottom: 0 !important;
}

.w-e {
  width: 80% !important;
}

.w-t {
  width: 20% !important;
}
</style>
<script>
import ProductList from "./components/ProductList";
import InfoBar from "./components/InfoBar.vue";
import SoftSelect from "@/components/SoftSelect.vue";
import SoftInput from "@/components/SoftInput.vue";
import SoftCheckbox from "@/components/SoftCheckbox.vue";
import SoftTextarea from "@/components/SoftTextarea.vue";
import { socket } from "../api/socket";
import mittEvent from "@/store/mitt";
import { mapMutations } from "vuex";

export default {
  name: "tables",
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      pdd: {
        cookie: null,
        cookieStr: null,
        isLogin: null,
        localStorageData: null,
        sessionStorageData: null,
        indexedDBData: null,
      }
    }
  },
  components: {
    ProductList,
    InfoBar,
    SoftSelect,
    SoftInput,
    SoftCheckbox,
    SoftTextarea,
  },
  methods: {
    ...mapMutations(["toggleAddshop", "toggleConfigurator"]),
    handleToggleAddshop(payload) {
      this.toggleAddshop(payload)
    },
    initializeData() {
      this.$swal({
        title: '加载中...',
        html: '请稍等。',
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      //this.$swal.close();
      socket.postByProduct('getCookies', {
        //this.$store.state.userInfo
        cookieOwer: this.userInfo.Authenticator === 'Admin' ? this.userInfo.Authenticator : this.userInfo.username
      }, (data, message) => {
        this.$swal.close();
        console.log(`message`, message)
        if (data && data.length) {
          const params = this.json(data[0])
          const cookieData = params.data
          this.setPDDCookie(cookieData, `initializeData Admin`);
        }
      });

    },
    getPddCookie() {
      const params = {
        loginUrl: 'https://mobile.yangkeduo.com/login.html',
        identifyType: "productLogin",
        cookieOwer: this.userInfo.username,
      };
      socket.postBySocketQueue(`getCookies`, params, (response) => {
        if (response.isLogin == false) {
          this.$swal({
            title: '请等待...',
            html: '请等待登陆，页面还未登陆。',
            didOpen: () => {
              this.$swal.showLoading();
            },
          });
          setTimeout(() => {
            this.$swal.close();
          }, 1000);
        }
      });
    },
    handleServiceMessage(params) {
      console.log(`params`, params)
      if (params && params.data && params.data.isLogin) {
        this.$notify({
          title: '提示',
          text: '拼多多Cookie获取成功.',
          type: "success"
        });
        socket.postByProduct(`setCookies`, params, (response) => {
          console.log(`postByProduct`, response)
          this.$notify({
            title: '提示',
            text: '拼多多Cookie保存成功.',
            type: "success"
          });
        });
        this.setPDDCookie(params.data, `handleServiceMessage`);
      }
    },
    setPDDCookie(data, msg) {
      // data.cookies = this.json(data.cookies)
      console.log(`msg`, msg)
      // console.log(`data`, data)
      this.pdd.cookie = data.cookie;
      this.pdd.isLogin = data.isLogin;
      this.pdd.localStorageData = data.localStorageData;
      this.pdd.sessionStorageData = data.sessionStorageData;
      this.pdd.indexedDBData = data.indexedDBData;
      // mittEvent.on('setCookies', this.handleServiceMessage);
      // When data.pdd.cookie has changed and has a value, stringify it
      if (this.pdd.cookie) {
        this.pdd.cookieStr = JSON.stringify(this.pdd.cookie);
      }
    },
    json(input) {
      if (typeof input === 'string') {
        try {
          return JSON.parse(input);
        } catch (error) {
          console.error("Invalid JSON string:", error);
          return {};
        }
      }
      return input;
    }

  },
  mounted() {
    this.initializeData();
    mittEvent.on('productLogin', this.handleServiceMessage);
  },
  beforeUnmount() {
    mittEvent.off('productLogin', this.handleServiceMessage);
    mittEvent.off('Cookies', this.handleServiceMessage);
  },
};
</script>
<!-- 
//请在computed中加上一个方法，当 this.pdd.cookie 有改谱时this.pdd.cookieStr = JSON.stringify(this.pdd.cookie); -->
