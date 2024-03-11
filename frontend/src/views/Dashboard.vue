<template>
  <div class="py-n container-fluid">
    <div class="row">
      <info-bar />
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
                <div class="w-qarter distributed">
                  <div class="sItem">
                    <button class="px-3 mb-2 btn bg-gradient-info w-100 w-b-0" @click="handleToggleAddshop('addShop')">
                      添加店铺
                    </button>
                  </div>
                  <div class="sItem">
                    <button class="px-3 mb-2 btn bg-gradient-dark w-100 w-b-0" @click="handleToggleAddshop('exportShop')">
                      批量导入
                    </button>
                  </div>
                </div>
                <div class="w-s distributed"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row py-n restrain-h">
      <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
        <shop-account-card />
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

</style>
<script>
import InfoBar from "./components/InfoBar.vue";
// import ProjectsCard from "./components/ProjectsCard.vue";
import ShopAccountCard from "./components/ShopAccountCard.vue";
import SoftInput from "@/components/SoftInput.vue";
import { mapMutations } from "vuex";

import {
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "dashboard-default",
  data() {
    return {
    };
  },
  components: {
    InfoBar,
    // ProjectsCard,
    SoftInput,
    ShopAccountCard
  },
  methods: {
    ...mapMutations(["toggleAddshop", "toggleConfigurator"]),
    handleToggleAddshop(payload) {
      this.toggleAddshop(payload);
    },
  }

};
</script>
