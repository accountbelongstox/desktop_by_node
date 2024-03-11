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
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img src="@/assets/img/bruce-mars.jpg" alt="profile_image" class="shadow-sm w-100 border-radius-lg" />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">Admin</h5>
            <p class="mb-0 text-sm font-weight-bold">管理员 / 高级会员</p>
          </div>
        </div>
        <div class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
          <div class="nav-wrapper position-relative end-0">
            <ul class="p-1 bg-transparent nav nav-pills nav-fill" role="tablist">
              <li class="nav-item">
                <a class="px-0 py-1 mb-0 nav-link active" data-bs-toggle="tab" href="javascript:;" role="tab"
                  aria-selected="true">
                  <svg class="text-dark" width="16px" height="16px" viewBox="0 0 42 42" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g transform="translate(-2319.000000, -291.000000)" fill="#FFFFFF" fill-rule="nonzero">
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(603.000000, 0.000000)">
                            <path class="color-background"
                              d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z">
                            </path>
                            <path class="color-background"
                              d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                              opacity="0.7"></path>
                            <path class="color-background"
                              d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                              opacity="0.7"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span class="ms-1">软件设置</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="px-0 py-1 mb-0 nav-link" data-bs-toggle="tab" href="javascript:;" role="tab"
                  aria-selected="false">
                  <svg class="text-dark" width="16px" height="16px" viewBox="0 0 40 44" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>document</title>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g transform="translate(-1870.000000, -591.000000)" fill="#FFFFFF" fill-rule="nonzero">
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(154.000000, 300.000000)">
                            <path class="color-background"
                              d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                              opacity="0.603585379"></path>
                            <path class="color-background"
                              d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z">
                            </path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span class="ms-1">后台信息(未开通)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="px-0 py-1 mb-0 nav-link" data-bs-toggle="tab" href="javascript:;" role="tab"
                  aria-selected="false">
                  <svg class="text-dark" width="16px" height="16px" viewBox="0 0 40 40" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>settings</title>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g transform="translate(-2020.000000, -442.000000)" fill="#FFFFFF" fill-rule="nonzero">
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(304.000000, 151.000000)">
                            <polygon class="color-background" opacity="0.596981957"
                              points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667">
                            </polygon>
                            <path class="color-background"
                              d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                              opacity="0.596981957"></path>
                            <path class="color-background"
                              d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z">
                            </path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span class="ms-1">个人设置(未开通)</span>
                </a>
              </li>
            </ul>
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
                <h6 class="mb-0">商品来源</h6>
              </div>
              <div class="bt-3 distributed">
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-select label="商品来源" placeholder="商品详情" aria-label="商品详情" :options="profile.supplier"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <soft-input v-model="profile.pddCookie" label="拼多多Cookie" placeholder="" aria-label="拼多多Cookie"
                    @input="onInput" />
                </div>
                <div class="w-o distributed"></div>
                <div class="w-o distributed"></div>
                <div class="w-o distributed"></div>
              </div>

              <!-- 上架设置 -->
              <div>
                <h6 class="mb-0">上架设置</h6>
              </div>
              <div class="bt-3 distributed">
                <div class="sItem">
                  <soft-select :options="profile.supplier" label="供应商" @input="onInput" />
                </div>
                <div class="sItem">
                  <soft-select :options="profile.warehouse" label="仓库" placeholder="选择仓库" aria-label="仓库"
                    @input="onInput" />
                </div>
                <div class="sItem">
                  <soft-input v-model="profile.productionQuantity" label="生产数量" placeholder="1" aria-label="生产数量"
                    @input="onInput" />
                </div>
                <div class="sItem">
                  <soft-input v-model="profile.purchaseCycle" label="采购周期" placeholder="1周每一张" aria-label="采购周期"
                    @input="onInput" />
                </div>
                <div class="sItem">
                  <soft-select :options="profile.verificationCycle" label="检定周期" placeholder="默认设置" aria-label="检定周期"
                    @input="onInput" />
                </div>
              </div>

              <!-- 基础信息 -->
              <div>
                <h6 class="mb-0">基础信息</h6>
              </div>
              <div class="bt-3 distributed">
                <div class="w-qarter distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.strategyName" label="策略名称" placeholder="策略名称" aria-label="策略名称"
                      @input="onInput" />
                  </div>
                  <div class="sItem">
                    <soft-input v-model="profile.strategyDescription" label="策略描述" placeholder="策略描述" aria-label="策略描述"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-t distributed"></div>
                <div class="w-t distributed"></div>
                <div class="w-t distributed"></div>
              </div>

              <!-- 售价信息 -->
              <div>
                <h6 class="mb-0">售价信息</h6>
              </div>
              <div class="bt-3 distributed">
                <div class="sItem">
                  <soft-input v-model="profile.retailPrice" label="建议零售价" placeholder="建议零售价" aria-label="建议零售价"
                    @input="onInput" />
                </div>
                <div class="sItem">
                  <soft-input v-model="profile.standardSkuPrice" label="SKU标准售价" placeholder="SKU标准售价"
                    aria-label="SKU标准售价" @input="onInput" />
                </div>
                <div class="sItem">
                  <soft-input v-model="profile.highestSkuPrice" label="SKU最高售价" placeholder="SKU最高售价" aria-label="SKU最高售价"
                    @input="onInput" />
                </div>
                <div class="sItem">
                  <soft-input v-model="profile.lowestSkuPrice" label="SKU最低售价" placeholder="SKU最低售价" aria-label="SKU最低售价"
                    @input="onInput" />
                </div>
                <div class="sItem">
                  <soft-input v-model="profile.discountPrice" label="折扣价" placeholder="9.9" aria-label="折扣价"
                    @input="onInput" />
                </div>
              </div>

              <!-- 团购设置 -->
              <div>
                <h6 class="mb-0">团购设置</h6>
              </div>

              <div class="bt-3 distributed">
                <div class="w-qarter distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.groupBuyPrice" label="团购价" placeholder="0-9999,1.5+5" aria-label="团购价"
                      @input="onInput" />
                  </div>
                  <div class="sItem">
                    <soft-input v-model="profile.incrementPrice" label="每次增加" placeholder="1.00元" aria-label="每次增加"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-t distributed"></div>
                <div class="w-t distributed"></div>
                <div class="w-t distributed"></div>
              </div>

              <!-- 商品资料 w-s -->
              <div>
                <h6 class="mb-0">商品资料</h6>
              </div>
              <div class="bt-3 distributed">
                <div class="w-s distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.productName" label="名称" placeholder="名称" aria-label="名称"
                      @input="onInput" />
                  </div>
                  <div class="sItem">
                    <soft-input v-model="profile.productDescription" label="描述" placeholder="描述" aria-label="描述"
                      @input="onInput" />
                  </div>
                  <div class="sItem">
                    <soft-input v-model="profile.productImage" label="图片" placeholder="上传图片" aria-label="图片"
                      @input="onUpload" />
                  </div>
                </div>
                <div class="w-qarter distributed"></div>
              </div>
              <!-- 库存信息 -->
              <div>
                <h6 class="mb-0">库存信息</h6>
              </div>
              <div class="bt-3 distributed">
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.stockInfo" placeholder="输入库存信息" aria-label="库存信息" @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed"></div>
                <div class="w-o distributed"></div>
                <div class="w-o distributed"></div>
                <div class="w-o distributed"></div>
              </div>

              <!-- 商品详情 -->
              <div>
                <h6 class="mb-0">文字替换</h6>
              </div>
              <div class="bt-3 distributed">
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-textarea v-model="profile.productDetails" placeholder="一行一个" aria-label="一行一个"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-textarea v-model="profile.productDetails" placeholder="替换内容" aria-label="替换内容"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-textarea v-model="profile.productDetails" placeholder="关键字过滤" aria-label="关键字过滤"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-textarea v-model="profile.productDetails" placeholder="随机添加内容" aria-label="随机添加内容"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed"></div>
              </div>
              <!-- 商品基础信息 -->
              <div class="bt-3 distributed">
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.productId" label="导入商品id" placeholder="商品id" aria-label="导入商品id"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.shopToken" label="获取店铺token" placeholder="店铺token" aria-label="获取店铺token"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.brandSetting" label="品牌设置" placeholder="品牌名称" aria-label="品牌设置"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.category3C" label="3C类目" placeholder="3C类目" aria-label="3C类目"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">

                </div>
              </div>

              <!-- 销售与价格 -->
              <div class="bt-3 distributed">
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.priceIncreaseActivity" label="加价购活动" placeholder="加价购金额"
                      aria-label="加价购活动" @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.priceAdjustment" label="调价金额" placeholder="调价金额" aria-label="调价金额"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-switch id="flexSwitchCheckDefault4" name="Product Update" class="ps-0 ms-auto"
                      label-class="mb-0 text-body ms-3 text-truncate w-80" checked>是否参与折扣</soft-switch>
                  </div>
                </div>
                <div class="w-o distributed">

                </div>
                <div class="w-o distributed">

                </div>
              </div>

              <!-- 物流与发货 -->
              <div class="bt-3 distributed">
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-select :options="profile.shippingTemplate" label="运费模板" placeholder="选择运费模板" aria-label="运费模板"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-select :options="profile.shippingTime" label="发货时间" placeholder="选择发货时间" aria-label="发货时间"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-select :options="profile.stockingTime" label="配货时间" placeholder="选择配货时间" aria-label="配货时间"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">

                </div>
                <div class="w-o distributed">

                </div>
              </div>

              <!-- 商品属性与分类 -->
              <div class="bt-3 distributed">
                <div class="w-o distributed">

                  <div class="sItem">
                    <soft-select :options="profile.specificationAttribute" label="规格属性" placeholder="选择规格属性"
                      aria-label="规格属性" @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">

                  <div class="sItem">
                    <soft-select :options="profile.categorySetting" label="分类设置" placeholder="选择分类" aria-label="分类设置"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">

                  <div class="sItem">
                    <soft-select :options="profile.includeInvoice" label="是否含票" placeholder="选择是否含票" aria-label="是否含票"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">

                  <div class="sItem">
                    <soft-select :options="profile.afterSalesService" label="售后服务" placeholder="选择售后服务" aria-label="售后服务"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">

                </div>
              </div>

              <!-- 其他设置 -->
              <div class="bt-3 distributed">
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.note" label="备注" placeholder="备注内容" aria-label="备注" @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-input v-model="profile.shopSetting" label="店铺设置" placeholder="店铺信息" aria-label="店铺设置"
                      @input="onInput" />
                  </div>
                </div>
                <div class="w-o distributed">
                  <div class="sItem">
                    <soft-switch id="flexSwitchCheckDefault4" name="Product Update" class="ps-0 ms-auto"
                      label-class="mb-0 text-body ms-3 text-truncate w-80" checked>商品详情</soft-switch>
                  </div>
                </div>
                <div class="w-o distributed">
                </div>
                <div class="w-o distributed">
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
      profile: {
        supplier: ['同上家', '无'],
        warehouse: ['同上家', '无'],
        productionQuantity: ['0'],
        purchaseCycle: '',
        verificationCycle: ['同上家', '无'],
        strategyName: '',
        strategyDescription: '',
        retailPrice: '',
        standardSkuPrice: '',
        highestSkuPrice: '',
        lowestSkuPrice: '',
        discountPrice: '',
        groupBuyPrice: '',
        incrementPrice: '',
        productName: '',
        productDescription: '',
        productImage: ['同上家', '无'],
        stockInfo: '',
        productDetails: '',
        productId: '',
        shopToken: '',
        brandSetting: '',
        category3C: '',
        priceIncreaseActivity: '',
        priceAdjustment: '',
        participateDiscount: false,
        shippingTemplate: ['同上家', '无'],
        shippingTime: ['同上家', '无'],
        stockingTime: ['同上家', '无'],
        specificationAttribute: ['同上家', '无'],
        categorySetting: ['同上家', '无'],
        includeInvoice: ['同上家', '无'],
        afterSalesService: ['同上家', '无'],
        note: '',
        shopSetting: '',
        productDetailCheckbox: false,
        cookie: null,
        isLogin: null,
        localStorageData: null,
        sessionStorageData: null,
        indexedDBData: null,
      },
    };
  },
  methods: {
    ppxClick(){
      console.log("我是皮皮虾")
      const params = {}
      socket.postByProduct('getImgAttributesMatchingSelector', params, (data, message) => {
        console.log(`data`, data)
        console.log(`message`, message)

      });
 
    },

    onInput() {
      this.$emit('update:input', this.localData)
    }
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
</style>