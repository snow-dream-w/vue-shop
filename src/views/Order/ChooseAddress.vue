<template>
  <div id="app">
    <div class="choose">
      <div class="choose1">
        <div class="address">
          <p>选择收货地址</p>
          <el-radio-group class="choose" ref="choose" v-model="radio">
            <el-button
              type="primary"
              v-if="addressList.length===0"
              @click="$refs.addressEdit.isShow('add')"
              class="addAddress"
            >点击添加收货地址</el-button>
            <el-radio-button
              v-for="item in addressList"
              class="button"
              :key="item.id"
              :label="item._id"
            >
              <div>
                {{ item.name }}&emsp;
                {{ item.telephone }}
              </div>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.address.area.join(' ')+' '+item.address.details"
                placement="bottom"
              >
                <div>{{ item.address.area.join(' ') }} {{ item.address.details }}</div>
              </el-tooltip>
              <!-- <div>{{ item.address.area.join(' ') }} {{ item.address.details }}</div> -->
            </el-radio-button>
          </el-radio-group>
          <div class="menu">
            <a id="left" @click="changeH">显示全部地址</a>
            <router-link id="right" :to="{name:'address'}">管理收货地址</router-link>
          </div>
        </div>
        <div class="goods">
          <p>商品信息</p>
          <el-table ref="multipleTable" :data="goodsData" tooltip-effect="dark" style="width: 100%">
            <el-table-column label="图片" width="150">
              <template slot-scope="scope">
                <img :src="staticBaseUrl + scope.row.goodsId.images[0]" width="50px" />
              </template>
            </el-table-column>
            <el-table-column prop="goodsId.name" label="名称" width="340"></el-table-column>
            <el-table-column prop="goodsId.price" label="单价" width="160"></el-table-column>
            <el-table-column prop="goodsId.num" label="数量" width="130"></el-table-column>
            <el-table-column prop="goodsId.unit" label="单位" width="158"></el-table-column>
            <el-table-column label="小计" width="200">
              <template slot-scope="scope">
                <span>￥{{ scope.row.num*scope.row.goodsId.price }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="decoration">
            <p>
              <span>{{ goodsData.length }}</span> 件商品，总商品金额:￥
              <span>{{ get_goods_total.toFixed(2) }}</span>元
            </p>
            <p>
              应付总额:￥
              <span>{{ get_goods_total.toFixed(2) }}</span>元
            </p>
            <el-button type="primary" @click="goPay">去付款</el-button>
          </div>
        </div>
      </div>
    </div>
    <edit-address ref="addressEdit" @getAddress="getAddress" />
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import EditAddress from "@/components/EditAddress.vue";
export default {
  data() {
    return {
      radio: undefined,
      addressList: [],
      // 用来展示
      goodsData: [],
      // 用来当做生成订单的参数
      goodsArray: []
    };
  },
  methods: {
    /**
     * 控制地址显示的个数
     */
    changeH() {
      let div = this.$refs.choose.$el.style;
      div.height === "auto" ? (div.height = "155px") : (div.height = "auto");
    },
    /**
     * 跳转订单路由
     */
    goPay() {
      if(this.radio === undefined) {
        this.$refs.addressEdit.isShow('add')
      }
      if(this.$store.state.car_manager.carInfo.length === 0) {
        this.$router.push(`/cart`);
      }
      this.axios
        .post("/order/set", {
          addressId: this.radio,
          array: this.goodsArray
        })
        .then(result => {
          if (result.data.status === 1) {
            this.$store.dispatch("changeAnsyc_select_goods", []);
            this.$router.push(`/pay_order/${result.data.data._id}`);
          } else {
            this.$message({
              type: 'warning',
              showClose: true,
              message: result.data.data,
              duration: 0
            });
          }
        })
        .catch(err => {
          console.log(err, "+++++++");
          this.$router.push("/*");
        });
    },
    /**
     * 格式化商品
     */
    formatGoods() {
      const array = this.$store.state.car_manager.carInfo;
      array.forEach(element => {
        let obj = {};
        obj._id = element._id;
        obj.goodsId = element.goodsId._id;
        obj.num = element.num;
        this.goodsArray.push(obj);
      });
    },
    /**
     * 获取地址
     */
    getAddress() {
      this.axios
        .get("/address/get/1000")
        .then(result => {
          if (result.data.status === 1) {
            if (result.data.data.length === 0) {
              this.$refs.addressEdit.isShow("add");
              return;
            }
            this.addressList = _.sortBy(result.data.data, function(item) {
              return -item.defaultAddress;
            });
            this.radio = this.addressList[0]._id;
          } else {
            this.$router.push("/*");
          }
        })
        .catch(err => {
          console.log(err);
          this.$router.push("/*");
        });
    }
  },
  computed: {
    ...mapGetters({
      get_goods_total: "get_goods_total"
    })
  },
  components: {
    EditAddress
  },
  created() {
    this.formatGoods();
    this.getAddress();
    if (this.$store.state.car_manager.carInfo.length !== 0) {
      this.goodsData = this.$store.state.car_manager.carInfo;
    } else {
      this.$router.push("/cart");
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  .choose {
    margin-top: 10px;
    width: 100%;
    .choose1 {
      position: relative;
      z-index: -1;
      .address {
        width: 100%;
        border: 1px solid #e9e9e9;
        .choose {
          overflow: hidden;
          padding: 10px 1%;
          height: 155px;
          width: 100%;
          border-top: 1px solid #e9e9e9;
          text-align: center;
          .addAddress {
            margin-top: 60px;
          }
          .button {
            float: left;
            margin: 10px 30px;
            width: 310px;
            border: 1px solid #ddd;
            border-radius: 1px;
            box-shadow: 6px 6px 4px rgb(210, 211, 212);
            div {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: left;
              line-height: 50px;
              font-size: 16px;
              width: 267px;
              height: 50px;
            }
          }
        }
        p {
          text-indent: 2em;
          line-height: 50px;
          font-size: 20px;
          font-weight: bold;
        }
        .menu {
          padding: 0 2%;
          width: 100%;
          height: 50px;
          a {
            line-height: 50px;
          }
          #left {
            float: left;
            color: orangered !important;
          }
          #right {
            float: right;
            color: orangered !important;
          }
        }
      }
      .goods {
        margin-top: 10px;
        border: 1px solid #e9e9e9;
        p {
          text-indent: 2em;
          line-height: 50px;
          font-size: 20px;
          font-weight: bold;
        }
        .decoration {
          padding: 10px;
          text-align: right;
          span {
            color: orangered;
          }
        }
      }
    }
  }
  .choose:hover .choose1 {
    z-index: 0;
  }
}
</style>