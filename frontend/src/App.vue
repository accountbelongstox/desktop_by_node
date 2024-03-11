<template>
  <notifications position="top center" width="40%"/>
  <sidenav
    :custom_class="this.$store.state.mcolor"
    :class="[
      this.$store.state.isTransparent,
      this.$store.state.isRTL ? 'fixed-end' : 'fixed-start',
    ]"
    v-if="this.$store.state.showSidenav"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    :style="this.$store.state.isRTL ? 'overflow-x: hidden' : ''"
  >
    <!-- nav -->
    <navbar
      :class="[navClasses]"
      :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="this.$store.state.showNavbar"
    />
    <router-view />
    <app-footer v-show="this.$store.state.showFooter" />
    <configurator
      :toggle="toggleConfigurator"
      :class="[
        this.$store.state.showConfig ? 'show' : '',
        this.$store.state.hideConfigButton ? 'd-none' : '',
      ]"
    />
    <AddAndExportShop
      :toggle="toggleAddshop"
      :class="[
        this.$store.state.showAddshop ? '' : 'd-none',
      ]"
      :showType="this.$store.state.showAddshopType"
    />
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
import Configurator from "@/examples/Configurator.vue";
import AddAndExportShop from "@/examples/AddAndExportShop.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    Sidenav,
    Configurator,
    AddAndExportShop,
    Navbar,
    AppFooter,
  },
  methods: {
    ...mapMutations(["toggleAddshop","toggleConfigurator", "navbarMinimize"]),
  },
  computed: {
    navClasses() {
      return {
        "position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky": this
          .$store.state.isNavFixed,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-0 mx-4 mt-4": !this.$store.state.isAbsolute,
      };
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
  },
};
</script>
<style>
.swal2-container {
  z-index: 20000 !important;
}
</style>