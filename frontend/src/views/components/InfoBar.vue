<template>
  <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
    <mini-statistics-card title="今日上货" value="53,000" :percentage="{
      value: '+505%',
      color: 'text-success',
    }" :icon="{
  component: 'ni ni-money-coins',
  background: iconBackground,
}" direction-reverse />
  </div>
  <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
    <mini-statistics-card title="商品统计" value="2,300/类目20" :percentage="{
      value: '+3%',
      color: 'text-success',
    }" :icon="{
  component: ' ni ni-world',
  background: iconBackground,
}" direction-reverse />
  </div>
  <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
    <mini-statistics-card :title="'登陆账号： ' +userInfo.username" :value="userInfo.AuthenticatorDescript" :percentage="{
      value: '-2%',
      color: 'text-danger', 
    }" :icon="{
  component: 'ni ni-paper-diploma',
  background: iconBackground,
}" direction-reverse />
  </div>
  <div class="col-xl-3 col-sm-6 mb-xl-0">
    <mini-statistics-card title="销售额" value="103,430" :percentage="{
      value: '+5%',
      color: 'text-success',
    }" :icon="{
  component: 'ni ni-cart',
  background: iconBackground,
}" direction-reverse />
  </div>
</template>
  
<style lang="scss">
.sizeBox {
  position: relative !important;
  height: 200px !important;

  .text-sm {
    width: 100% !important;
    display: block !important;
    text-align: center !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    color: rgb(59, 57, 57) !important;
    margin-bottom: 10px !important;

  }

  h6,
  .h6,
  h5,
  .h5,
  h4,
  .h4,
  h3,
  .h3,
  h2,
  .h2,
  h1,
  .h1 {
    position: absolute !important;
    top: 40% !important;
    right: 10% !important;
    display: block !important;
    font-size: 14px !important;
    color: gray !important;
    text-align: center !important;
    margin-right: 10px !important;

  }

  .icon-shape {
    position: absolute;
    top: 10%;
    right: 40%;
    width: 48px !important;
    height: 48px !important;

  }

  .text-center {
    line-height: 50% !important;
  }

}

.py-n {
  padding-top: 0 !important;
  padding-bottom: 1.5rem !important;
}
</style>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import US from "../../assets/img/icons/flags/US.png";
import DE from "../../assets/img/icons/flags/DE.png";
import GB from "../../assets/img/icons/flags/GB.png";
import BR from "../../assets/img/icons/flags/BR.png";

import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "info-bar",
  data() {
    return {
      userInfo:this.$store.state.userInfo,
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  components: {
    MiniStatisticsCard,
  },
  methods: {
  }

};
</script>
  