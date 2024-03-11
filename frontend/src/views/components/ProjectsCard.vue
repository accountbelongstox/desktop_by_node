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
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                上货信息
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                上货商品类别
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                上货速率/秒
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
                      <soft-input v-if="item.cookieData" v-model="item.verifyCode" type="text" label="验证码"
                        placeholder="验证码" aria-label="验证码" @input="onInput" />
                    </div>
                    <div v-else>
                      <div>
                        <p class="text-xs font-weight-bold mb-0">已上货量：{{ item.alreadyInStock }}</p>
                        <p class="text-xs text-secondary mb-0">总上货需量：{{ item.deliveryQuantity }}</p>
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
                      :class="(item.loginStatus !== undefined ? item.loginStatus : item.isCollecting === false) ? 'btn-outline-dark w-100 px-3 mb-2 btn' : 'bg-gradient-success w-100 px-3 mb-2 btn'"
                      @click="toggleProductsOnShelves(item.id, index)">
                      {{ item.statusText ? item.statusText : (item.isCollecting === false ? '暂停中..' : '上货中..') }}
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
              <td class="align-middle text-center">{{ item.createdAt }}</td>
              <td>
                <span class="text-xs font-weight-bold">{{ item.id }}</span>
              </td>
              <td>
                <soft-input v-if="item.cookieData" v-model="item.cookieData.cookieStr" type="text" placeholder="Cookie"
                  aria-label="Cookie" :noIcon="true" @input="onInput" />
                <span v-else class="text-xs font-weight-bold">-</span>
              </td>
              <td class="align-middle">
                <!-- <a class="btn btn-link text-dark px-a mb-0" href="javascript:;" @click="getShopCookie(index, item)">
                  <i class="fas fa-user-circle text-dark me-2" aria-hidden="true"></i>
                  <span>获取Cookie</span>
                </a> -->
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
  flex: 0 0 30%;
  padding: 10px 5px 0 5px !important;
}

.main-shop-last {
  flex: 0 0 70%;
}
</style>
<script>


export default {
  name: "projects-card",
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
  },
  beforeUnmount() {

  },
  mounted() {
  },
  computed: {
  }
};
</script>
