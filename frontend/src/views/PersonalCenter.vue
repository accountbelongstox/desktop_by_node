<template>
  <div class="container-fluid">
    <div class="mt-4 page-header min-height-200 border-radius-xl" :style="{
      backgroundImage:
        'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
      backgroundPositionY: '50%',
    }">
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">商品API调用管理</h5>
            <p class="mb-0 text-sm font-weight-bold">当前不设置收费</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-n container-fluid">
    <div class="mt-3 row">
      <div class="col-12 col-md-6 col-xl-4">

        <div class="card h-100">
          <div class="p-3 card-body">
            <div>
              <div>
                <h6 class="mb-0">API查询</h6>
              </div>
              <div class="bt-3 distributed">
                <div class="w-qarter distributed">
                  <div class="sItem">
                    <soft-input v-model="apiSource.shopId" label="商品ID" placeholder="商品ID" aria-label="商品ID" />
                  </div>
                  <div class="sItem">
                    <button class="px-3 btn btn-outline-dark w-100 w-b-0" @click="queryShopBy('id')">
                      查询
                    </button>
                  </div>
                </div>
                <div class="w-t distributed"></div>
                <div class="w-t distributed"></div>
                <div class="w-t distributed"></div>
              </div>

              <div>
                <h6 class="mb-0">API查询(2)</h6>
              </div>
              <div class="bt-3 distributed">
                <div class="sItem">
                  <soft-input v-model="apiSource.shopUrl" label="商品URL" placeholder="商品URL" aria-label="商品URL" />
                </div>
                <div class="sItem">
                  <button class="px-3 btn btn-outline-dark w-100 w-b-0" @click="queryShopBy('url')">
                    查询
                  </button>
                </div>
                <div class="sItem">
                </div>
                <div class="sItem">
                </div>
                <div class="sItem">
                </div>
              </div>
              <!-- 商品详情 -->
              <div>
                <h6 class="mb-0">API返回信息</h6>
              </div>
              <div class="bt-3 distributed">
                <div class="distributed w-full">
                  <div class="sItem">
                    <soft-textarea v-model="apiSource.apiResultStr" rows="16" placeholder="API返回" aria-label="API返回" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SoftSwitch from "@/components/SoftSwitch.vue";
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftSelect from "@/components/SoftSelect.vue";
import SoftInput from "@/components/SoftInput.vue";
import SoftCheckbox from "@/components/SoftCheckbox.vue";
import SoftTextarea from "@/components/SoftTextarea.vue";
import PlaceHolderCard from "@/examples/Cards/PlaceHolderCard.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import { socket } from "@/api/socket";

export default {
  name: "ProfileOverview",
  components: {
    SoftSwitch,
    SoftAvatar,
    PlaceHolderCard,
    SoftSelect,
    SoftInput,
    SoftCheckbox,
    SoftTextarea,
  },
  data() {
    return {
      apiSource: {
        shopId: "508013555527",
        shopUrl: "",
        apiResult: "",
        apiResultStr: "",
      },
    };
  },
  methods: {
    async queryShopBy(type) {
      const queryField = type === 'url' ? this.apiSource.shopUrl : this.apiSource.shopId
      if (queryField) {
        const params = {
          type,
          queryField,
          cookieOwer: this.$store.state.userInfo.Authenticator === 'Admin' ? this.$store.state.userInfo.Authenticator : this.$store.state.userInfo.username
        }
        this.$swal({
          title: '请等待...',
          html: '获取实时API中(首次获取后台初始化需等待几秒)',
          didOpen: () => {
            this.$swal.showLoading();
          },
        });
        setTimeout(() => {
          this.$swal.close();
        }, 10000);
        socket.postBySocketQueue('getShopDetail', params, (data) => {
          this.apiSource.apiResult = data
          this.apiSource.apiResultStr = JSON.stringify(data, null, 2);
          this.$swal.close();
        });
      }
    },
  },
  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>
<style>
.py-n {
  padding-top: 0 !important;
}

.min-height-200 {
  min-height: 200px !important;
}

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

.bt-3 {
  margin-bottom: 1rem !important;
}

.w-half {
  width: 50% !important;
}

.w-tri {
  width: 33.3% !important;
}

.w-o {
  width: 20% !important;
}

.w-qarter {
  width: 40% !important;
}

.w-t {
  width: 20% !important;
}

.w-s {
  width: 60% !important;
}

.w-full {
  width: 100% !important;
}
</style>