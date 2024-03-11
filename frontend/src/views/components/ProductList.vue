<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>商品类型及采集</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                分类名
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                商品数量
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                采集状态
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                采集比例
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in productCategories" :key="index">
              <td>
                <div class="d-flex px-2">
                  <div>
                    <img
                      src="../../assets/img/small-logos/logo-invision.svg"
                      class="avatar avatar-sm rounded-circle me-2"
                      alt="spotify"
                    />
                  </div>
                  <div class="my-auto">
                    <h6 class="mb-0 text-sm">{{ item.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">{{ item.dataCount }}</p>
              </td>
              <td>
                <span class="text-xs font-weight-bold">{{ item.conllectioning }}</span>
              </td>
              <td class="align-middle text-center">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="me-2 text-xs font-weight-bold">{{ item.collectionProcess }}</span>
                  <div>
                    <soft-progress
                      color="info"
                      variant="gradient"
                      :percentage="item.collectionProcess"
                    />
                  </div>
                </div>
              </td>
              <td class="align-middle">
                <button class="btn btn-link text-secondary mb-0">
                  <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SoftProgress from "@/components/SoftProgress";
import mittEvent from '@/store/mitt';
import { socket } from "../../api/socket.js";

export default {
  name: "product-list",
  components: {
    SoftProgress,
  },
  data() {
    return {
      productCategories: [],
    };
  },
  beforeUnmount() {
    mittEvent.off('update-productCategories', this.updateProductCategories);
  },
  created() {
    mittEvent.on('update-productCategories', this.updateProductCategories);
  },
  methods: {
    updateProductCategories(newData) {
      if(!newData.length){
        socket.getByProduct('getProductCategoriesAndCount', (data) => {
          this.productCategories = data
        });
      }else{
        this.productCategories = newData;
      }
    },
  },
  mounted() {
    console.log(`mounted`)
    mittEvent.emit('get-productCategories');
  },
};
</script>
