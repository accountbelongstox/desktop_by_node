<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-lg-6 col-7">
          <h6 @click="fetchData()">店铺信息</h6>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pb-2 pt0">
      <div class="table-responsive">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                账号
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-12">
                上货信息
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                添加商品
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                上货速率/秒
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                上货商品类别
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                添加时间
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                唯一标识
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Cookie(请勿改动)
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in shopsJSON" :key="index">
              <td>
                <div class="d-flex px-2">
                  <div>
                    <img src="../../assets/img/small-logos/logo-invision.svg" class="avatar avatar-sm rounded-circle me-2"
                      alt="spotify" />
                  </div>
                  <div class="my-auto">
                    <h6 class="mb-0 text-sm">{{ item.account }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <div class="main-shop-container">
                  <div class="main-shop-last">
                    <div v-if="item.needVerifyCode">
                      <soft-input v-if="item.needVerifyCode" v-model="item.verifyCode" type="text" label="手机验证码"
                        placeholder="手机验证码" aria-label="手机验证码" @input="onInput" />
                    </div>
                    <div v-else>
                      <div>
                        <p class="text-xs font-weight-bold mb-0">已上货量：{{ item.alreadyInStock }}</p>
                        <p class="text-xs text-secondary mb-0">总上货需量：{{ item.bindShopUrlsCount }}</p>
                      </div>
                      <div class="d-flex align-items-center justify-content-center">
                        <span class="me-2 text-xs font-weight-bold">{{ item.percentageComplete }}%</span>
                        <div>
                          <soft-progress color="info" variant="gradient" :percentage="item.percentageComplete" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="main-shop-first">
                    <button
                      :class="(item.isCollecting === false) ? 'btn-outline-dark w-100 px-3 mb-2 btn' : 'bg-gradient-success w-100 px-3 mb-2 btn'"
                      @click="toCellecting(item, index)">
                      {{ item.isCollecting === false ? '暂停中..' : item.statusText }}
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">类别</p>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">20</p>
              </td>
              <td>
                <div>
                  <button class="btn mb-1 bg-gradient-info w-100 px-3 btn"
                    @click="handleToggleAddshop(`addProductLink-${item.account}`, item.id, item.account)">
                    追加商品链接
                  </button>
                </div>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs text-secondary mb-0">
                  {{ item.createdAt }}
                </p>
              </td>
              <td>
                <span class="text-xs font-weight-bold">{{ item.id }}</span>
              </td>
              <td>
                <soft-input v-if="item.cookieData" v-model="item.cookieData.cookieStr" type="text" placeholder="Cookie"
                  aria-label="Cookie" :noIcon="true" @input="onInput" />
                <span v-else class="text-xs font-weight-bold">-</span>
              </td>
              <td class="align-middle">
                <a class="btn btn-link text-dark px-a mb-0" href="javascript:;">
                  <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                </a>
                <a class="btn btn-link text-danger px-a mb-0" href="javascript:;" @click="removeShop(index, item.id)">
                  <i class="fas fa-trash-alt text-danger me-2" aria-hidden="true"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.text-xxs {
  font-size: 15px !important;
}

.col-md-6 {
  width: 100% !important;
}

.pt0 {
  padding-top: 0 !important;
}

.px-a {
  padding-right: 0.5rem !important;
  padding-left: 0.1rem !important;
}

.main-shop-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.main-shop-first {
  flex: 0 0 50%;
  padding: 10px 5px 0 5px !important;
}

.main-shop-last {
  flex: 0 0 50%;
}
</style>
<script>
import SoftInput from "@/components/SoftInput.vue";
import setTooltip from "@/assets/js/tooltip.js";
import { socket } from "../../api/socket.js";
import img6 from "../../assets/img/team-4.jpg";
import SoftProgress from "@/components/SoftProgress";
import mittEvent from '@/store/mitt';
// import { watch } from 'vue';
import { mapMutations } from "vuex";

export default {
  name: "shop-account-card",
  data() {
    return {
      img6,
      shopsJSON: [],
      currentVerifyAccount: null,
      informationTemp: {
        getCookieSuccess: {

        }
      }
    };
  },
  components: {
    SoftProgress,
    SoftInput,
  },
  methods: {
    toCellecting(item) {
      let title = '', text = '', textType = ''
      if (item.needVerifyCode === true) {
        title = `提示`
        if (!item.verifyCode) {
          return
        }
        text = `${item.verifyCode ? '验证码提交成功,请等待后台登陆成功' : '后台正在登陆中,需要手机验证码,请先输入并提交'}`
        textType = `${item.verifyCode ? 'success' : 'warn'}`
      } else {
        item.statusText = '请等待...';
        if (item.isCollecting == undefined) {
          item.isCollecting = true
        }
        item.isCollecting = !item.isCollecting
        title = `${item.isCollecting ? '添加' : '移除'}成功`
        text = `当前商铺从后台上货队列: ${item.isCollecting ? '添加' : '移除'} 
              成功, 
              账号Id: ${item.id}  
              `
        textType = `${item.isCollecting ? 'success' : 'info'}`
      }
      socket.postBySocketQueue("toCellecting", item, (response) => {
        this.$notify({
          title,
          text,
          type: textType
        });
        console.log(`toggleProductsOnShelves`, response)
      });
    },
    async removeShop(index, id) {
      this.shopsJSON.splice(index, 1);
      socket.postByProduct("deleteShop", { id });
    },
    editShop(item) {
      const { id, account, password, categories } = item;
      const dataToSend = {
        id,
        account,
        password,
        categories,
      };
      mittEvent.emit('edit-shop', dataToSend);
    },
    updateProductLocal(newData) {
      const percentage = (newData.alreadyInStock / newData.deliveryQuantity) * 100;
      newData.percentageComplete = percentage;
      this.shopsJSON.push(newData);
    },
    loginEvent(data) {
      if (data.loginStatus === true) {
        this.updateProduct(data, true)
      } else {
        this.updateProduct(data, false)
      }
    },
    updateProduct(data, save = true) {
      console.warn(`data`, data);
      const shop = this.shopsJSON.find(shop => shop.id === data.id);
      if (shop) {
        Object.assign(shop, data);
      } else {
        console.warn(`Shop with ID ${data.id} not found!`);
        return;
      }
      if (save) {
        const updateShop = this.accountFileter(data)
        const params = {
          id: updateShop.id,
          data: updateShop
        };
        socket.postByProduct('updateShop', params, () => {
          this.$notify({
            title: '提示',
            text: `账号: ${data.account} cookie保存成功.`,
            type: 'success',
          });
        });
      }
    },
    loadingStatus(shopsStatusData) {
      const collectingQueue = shopsStatusData.data;
      for (let id in collectingQueue) {
        const shopIndex = this.shopsJSON.findIndex(shop => shop.id === id);
        if (shopIndex !== -1) {
          let item = this.accountFileter(collectingQueue[id]);
          this.shopsJSON[shopIndex] = { ...this.shopsJSON[shopIndex], ...item };
          if (item.cookieData && item.cookieData.cookie && !this.informationTemp.getCookieSuccess[id]) {
            this.informationTemp.getCookieSuccess[id] = true
            this.$notify({
              title: '成功',
              text: `账号: ${item.account} cookie获取成功.`,
              type: 'success',
            });
            item.cookieData.cookieStr = JSON.stringify(item.cookieData.cookie)
          }
        }
      }
    },
    accountFileter(item) {
      const keysToInclude = [
        "activeBrowser",
        "browser",
        "cookieEvent",
        "timeoutEvent",
        "cookieEvent",
        // "bindShopUrls",
      ];
      item = Object.keys(item)
        .filter(key => !keysToInclude.includes(key))
        .reduce((obj, key) => {
          obj[key] = item[key];
          return obj;
        }, {});
      return item
    }
    ,
    fetchData() {
      this.$swal({
        title: '加载中...',
        html: '请稍等。',
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      //this.$swal.close();
      socket.getByProduct("getShops", (shopsJSON) => {
        this.$swal.close();
        shopsJSON.forEach((item) => {
          if (!item.alreadyInStock) item.alreadyInStock = 0
          let percentage;
          if (item.alreadyInStock == 0) {
            percentage = 100
          } else {
            percentage = (item.alreadyInStock / item.deliveryQuantity) * 100;
          }
          item.percentageComplete = percentage;
          if (item.cookieData && item.cookieData.cookie) {
            item.cookieData.cookieStr = JSON.stringify(item.cookieData.cookie)
          }
          item.verifyCode = '';
          item.needVerifyCode = false;
          item.statusText = '查询中';
          item.bindShopUrls = '';
          item.bindShopUrlsCount = 0;
          // const params = {
          //   id: item.id
          // }
        });
        this.shopsJSON = shopsJSON;
        socket.getByProduct(`queryBindShopUrls`, (bindShopUrls) => {
          bindShopUrls.forEach(item => {
            if (item.id && item.bindShopUrls) {
              if (typeof item.bindShopUrls == 'string') {
                try {
                  item.bindShopUrls = JSON.parse(item.bindShopUrls)
                } catch (e) {
                  console.log(`e`, e)
                  item.bindShopUrls = []
                }
              }
              const shop = this.shopsJSON.find(shop => shop.id === item.id);
              if (shop) {
                shop.bindShopUrlsCount = item.bindShopUrls.length
              }
            }
          })
          socket.getBySocketQueue(`processQueue`)
        })
      });
    },
    subStr(str) {
      if (!str) return str;
      const maxLength = 10;
      if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
      }
      return str;
    },
    formatDate(dateStr, format) {
      const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
      let formattedDate = format;
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const parts = new Intl.DateTimeFormat('zh-CN', options).formatToParts(date);
      parts.forEach(part => {
        switch (part.type) {
          case 'year': formattedDate = formattedDate.replace('Y', part.value); break;
          case 'month': formattedDate = formattedDate.replace('M', part.value); break;
          case 'day': formattedDate = formattedDate.replace('D', part.value); break;
          case 'hour': formattedDate = formattedDate.replace('h', part.value); break;
          case 'minute': formattedDate = formattedDate.replace('m', part.value); break;
          case 'second': formattedDate = formattedDate.replace('s', part.value); break;
        }
      });
      return formattedDate;
    },
    ...mapMutations(["toggleAddshop"]),
    handleToggleAddshop(payload, shopId) {
      this.$store.state.activeShop = this.shopsJSON.find(shop => shop.id === shopId);
      console.log(this.$store.state.activeShop)
      this.toggleAddshop(payload);
    },
  },
  beforeUnmount() {
    mittEvent.off('update-product-by-addshop', this.updateProductLocal);
    // mittEvent.off('login-event', this.loginEvent);
    mittEvent.off('loading-status', this.loadingStatus);
    mittEvent.off('update-shop-info', this.updateProduct);

  },
  mounted() {
    mittEvent.on('update-product-by-addshop', this.updateProductLocal);
    // mittEvent.on('login-event', this.loginEvent);
    mittEvent.on('loading-status', this.loadingStatus);
    mittEvent.on('update-shop-info', this.updateProduct);
    this.fetchData();
    setTooltip();
  },
  computed: {
  }
};
</script>
  