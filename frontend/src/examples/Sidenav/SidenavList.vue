<template>
  <div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="商铺管理" :to="{ name: 'Dashboard' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="商品/分类" :to="{ name: 'Tables' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="信息汇总" :to="{ name: 'Billing' }">
          <template #icon>
            <credit-card />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Api调试" :to="{ name: 'ApiPanel' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>

  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <div class="m-h">
      <h4 class=" text-uppercase font-weight-bolder opacity-6" :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'">
        快捷功能
      </h4>
      <div class="m-h dhight">
        <router-link class="btn bg-gradient-success w-100 hhight" to="/profile">软件设置</router-link>
        <button :class="buttonClass" @click="toggleCollecte()">
          {{ buttonText }}
        </button>
        <button :class="productsOnShelvesButtonClass" @click="toggleProductsOnShelves()">
          {{ productsOnShelvesButtonText }}
        </button>
      </div>
    </div>
    <sidenav-card :class="cardBg" textPrimary="升级会员?" textSecondary="购买升级终身会员" route="javascript:" label="立即升级终身会员"
      icon="ni ni-diamond" />
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCard from "./SidenavCard.vue";
import Shop from "../../components/Icon/Shop.vue";
import Office from "../../components/Icon/Office.vue";
import CreditCard from "../../components/Icon/CreditCard.vue";
import Document from "../../components/Icon/Document.vue";
import { mapMutations, mapActions } from "vuex";
import { socket } from "../../api/socket";


export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      collectionStats: false,
      productsOnShelvesStatus: false,
      userInfo: this.$store.state.userInfo,
      pdd: {
        cookie: null,
        cookieStr: null, // added this property to store the stringified cookie
        isLogin: null,
        localStorageData: null,
        sessionStorageData: null,
        indexedDBData: null,
      }
    };
  },
  components: {
    SidenavCollapse,
    SidenavCard,
    Shop,
    Office,
    CreditCard,
    Document,
  },
  methods: {

    ...mapActions(["toggleSidebarColor"]),
    initializeData() {
      const params = {
        cookieOwer: this.userInfo.Authenticator === 'Admin' ? this.userInfo.Authenticator : this.userInfo.username
      }
      socket.postByProduct('getCookies', params, (data, message) => {
        console.log(`initializeData Admin`, data, message)
        if (data && data.length) {
          const params = this.json(data[0])
          const cookieData = params.data
          this.setPDDCookie(cookieData, `initializeData`);
        }
      });
    },
    ...mapMutations(["toggleAddshop", "toggleConfigurator"]),
    handleToggleAddshop(payload) {
      this.toggleAddshop(payload);
    },
    toggleCollecte() {
      this.collectionStats = !this.collectionStats;
      socket.postBySocketQueue('controlDataFetching', {
        state: this.collectionStats,
        cookie: this.pdd
      }, (Response) => {
        console.log(Response)
      })
    },
    toggleProductsOnShelves() {
      this.productsOnShelvesStatus = !this.productsOnShelvesStatus;
    },
    setPDDCookie(data) {
      this.pdd.cookie = data.cookie;
      this.pdd.isLogin = data.isLogin;
      this.pdd.localStorageData = data.localStorageData;
      this.pdd.sessionStorageData = data.sessionStorageData;
      this.pdd.indexedDBData = data.indexedDBData;
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
  },
  computed: {
    isDashboardRoute() {
      return this.$route.name === 'Dashboard';
    },
    isTablesRoute() {
      return this.$route.name === 'Tables';
    },
    buttonClass() {
      return this.collectionStats ? 'bg-gradient-success w-100 px-3 mb-2 btn' : 'btn-outline-dark w-100 px-3 mb-2 btn';
    },
    productsOnShelvesButtonClass() {
      return this.productsOnShelvesStatus ? 'bg-gradient-success w-100 px-3 mb-2 btn' : 'btn-outline-dark w-100 px-3 mb-2 btn';
    },
    buttonText() {
      return this.collectionStats ? '后台采集中（停止?）...' : '开始采集商品';
    },
    productsOnShelvesButtonText() {
      return this.productsOnShelvesStatus ? '后台商品上架中（停止?）...' : '开始商品上架';
    },
  }
};
</script>

<style lang="scss">
.nav-item {
  margin: 0px !important;
}

.m-h {
  min-height: 400px !important;
}

.opacity-6 {
  font-size: 15px;
  margin: 0px;
  padding: 0px;

}

.dhight {
  padding-top: 10px;
}

.hhight {
  height: 100px !important;
  line-height: 80px !important;
  ;
  font-size: 20px !important;
  padding-top: 10px;
}
</style>