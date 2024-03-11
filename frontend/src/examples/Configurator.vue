<template>
  <div class="fixed-plugin">
    <a class="px-3 py-2 fixed-plugin-button text-dark position-fixed" @click="toggle">
      <i class="py-2 fa fa-cog"> </i>
    </a>
    <div class="shadow-lg card blur">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div class="mt-4 float-end" @click="toggle">
          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <!-- End Toggle Button -->
      </div>
      <hr class="my-1 horizontal dark" />
      <div class="pt-0 card-body pt-sm-3">

        <!-- Sidebar Backgrounds -->
        <div>
          <h6 class="mb-0">显示色彩</h6>
        </div>
        <a href="#" class="switch-trigger background-color">
          <div class="my-2 badge-colors" :class="this.$store.state.isRTL ? 'text-end' : ' text-start'">
            <span class="badge filter bg-gradient-primary active" data-color="primary"
              @click="sidebarColor('primary')"></span>
            <span class="badge filter bg-gradient-dark" data-color="dark" @click="sidebarColor('dark')"></span>
            <span class="badge filter bg-gradient-info" data-color="info" @click="sidebarColor('info')"></span>
            <span class="badge filter bg-gradient-success" data-color="success" @click="sidebarColor('success')"></span>
            <span class="badge filter bg-gradient-warning" data-color="warning" @click="sidebarColor('warning')"></span>
            <span class="badge filter bg-gradient-danger" data-color="danger" @click="sidebarColor('danger')"></span>
          </div>
        </a>
        <!-- Sidenav Type -->
        <div class="mt-3">
          <h6 class="mb-0">会员情况</h6>
          <p class="text-sm">当前: xxxx时间剩余</p>
          <!-- <div>
            <div class="mb-3">
              <soft-textarea v-model="localData.cookie" placeholder="拼多多登陆Cookie" aria-label="拼多多登陆Cookie"
                @input="onInput" />
            </div>
            <div class="mb-3">
              <soft-input v-model="localData.session" placeholder="拼多多登陆Session" aria-label="拼多多登陆Session"
                @input="onInput" />
            </div>
            <div class="mb-3">
              <soft-input v-model="localData.localstore" placeholder="拼多多登陆Localstore" aria-label="拼多多登陆Localstore"
                @input="onInput" />
            </div>
          </div> -->
        </div>
        <div class="d-flex">
          <button id="btn-transparent" class="px-3 mb-2 btn bg-gradient-success w-100"
            :class="ifTransparent === 'bg-transparent' ? 'active' : ''" @click="sidebarType('bg-transparent')">
            会员续费
          </button>
          <!-- <button id="btn-white" class="px-3 mb-2 btn bg-gradient-success w-100 ms-2"
            :class="ifTransparent === 'bg-white' ? 'active' : ''" @click="sidebarType('bg-white')">
            提取Cookie
          </button> -->
        </div>
        <p class="mt-2 text-sm d-xl-none d-block">
          You can change the sidenav type just on desktop view.
        </p>
        <!-- Navbar Fixed -->
        <div class="mt-3">
          <h6 class="mb-0">固定导航栏</h6>
        </div>
        <div class="form-check form-switch ps-0">
          <input class="mt-1 form-check-input" :class="this.$store.state.isRTL ? 'float-end  me-auto' : ' ms-auto'"
            type="checkbox" id="navbarFixed" :checked="this.$store.state.isNavFixed" @change="setNavbarFixed"
            v-model="fixedKey" />
        </div>
        <hr class="horizontal dark my-sm-4" />
        <a class="btn bg-gradient-info w-100" href="javascript:">购买专业版</a>
        <a class="btn bg-gradient-dark w-100" href="javascript:">软件价格</a>
        <a class="btn btn-outline-dark w-100"
          href="javascript:">查看官方文档</a>
        <div class="text-center w-100">
          <a class="github-button" href="javascript:"
            data-icon="octicon-star" data-size="large" data-show-count="true"
            aria-label="Star creativetimofficial/soft-ui-dashboard on GitHub">查看</a>
          <h6 class="mt-3">软件发布渠道</h6>
          <a href="javascript:"
            class="mb-0 btn btn-dark me-2" target="_blank">
            <i class="fab fa-twitter me-1" aria-hidden="true"></i> 微博
          </a>
          <a href="javascript:"
            class="mb-0 btn btn-dark me-2" target="_blank">
            <i class="fab fa-facebook-square me-1" aria-hidden="true"></i> 微信
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import SoftTextarea from "@/components/SoftTextarea.vue";
import SoftInput from "@/components/SoftInput.vue";
import SoftSelect from "@/components/SoftSelect.vue";
import SoftCheckboxtrue from "@/components/SoftCheckboxtrue.vue";
import SoftCheckbox from "@/components/SoftCheckbox.vue";
// import { socket } from "../api/socket";
export default {
  name: "configurator",
  props: ["toggle"],
  data() {
    return {
      fixedKey: "",
    };
  },
  components: {
    SoftTextarea,
    SoftInput,
    SoftSelect,
    SoftCheckboxtrue,
    SoftCheckbox,
  },
  methods: {
    ...mapMutations(["navbarMinimize", "sidebarType", "navbarFixed"]),
    ...mapActions(["toggleSidebarColor"]),

    sidebarColor(color = "danger") {
      document.querySelector("#sidenav-main").setAttribute("data-color", color);
      this.$store.state.mcolor = `card-background-mask-${color}`;
    },

    sidebarType(type) {
      this.toggleSidebarColor(type);
    },

    setNavbarFixed() {
      if (this.$route.name !== "Profile") {
        this.$store.state.isNavFixed = !this.$store.state.isNavFixed;
      }
    },
  },
  computed: {
  },
  mounted() {
    this.sidebarColor('danger')
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
    // Deactivate sidenav type buttons on resize and small screens
  },
};
</script>
<style>
.distributed {
  display: flex;
  justify-content: space-around;
  align-items: center;

}

.sItem {
  flex: 1;
  text-align: center;
  padding: 0 5px !important;
}
</style>