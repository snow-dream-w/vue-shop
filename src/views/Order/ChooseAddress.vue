<template>
  <div id="app">
    <div class="choose">
      <div class="choose1">
        <div class="address">
          <p>收货地址</p>
          <el-radio-group class="choose" ref="choose" v-model="radio">
            <el-radio-button v-for="item in list" class="button" :key="item.id" :label="item.id">
              <div>
                <span>陈乾坤</span>&emsp;
                <span>17865579761</span>
              </div>
              <div>
                <span>山东省 烟台市 莱山区</span>&emsp;
                <span>山东工商学院</span>
              </div>
            </el-radio-button>
          </el-radio-group>
          <div class="menu">
            <a id="left" @click="changeH">显示全部地址</a>
            <router-link id="right" :to="{name:'address'}">管理收货地址</router-link>
          </div>
        </div>
        <div class="goods">
          <p>商品信息</p>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column label="图片" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.image" width="50px" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" width="340"></el-table-column>
            <el-table-column prop="price" label="单价" width="160"></el-table-column>
            <el-table-column prop="num" label="数量" width="130"></el-table-column>
            <el-table-column prop="danwei" label="单位" width="158"></el-table-column>
            <el-table-column label="小计" width="200">
              <template slot-scope="scope">
                <span>￥{{ scope.row.num*scope.row.price }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="decoration">
            <p>
              <span>{{ tableData.length }}</span> 件商品，总商品金额:
              <span>￥27.80</span>
            </p>
            <p>
              应付总额:
              <span>￥27.80</span>
            </p>
            <el-button type="primary" @click="goPay">去付款</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      list: [
        {
          id: 1,
          name: "陈乾坤",
          telephone: "17865579761",
          area: "山东省 烟台市 莱山区",
          address: "山东工商学院"
        },
        {
          id: 2,
          name: "陈乾坤",
          telephone: "17865579761",
          area: "山东省 烟台市 莱山区",
          address: "山东工商学院"
        },
        {
          id: 3,
          name: "陈乾坤",
          telephone: "17865579761",
          area: "山东省 烟台市 莱山区",
          address: "山东工商学院"
        },
        {
          id: 4,
          name: "陈乾坤",
          telephone: "17865579761",
          area: "山东省 烟台市 莱山区",
          address: "山东工商学院"
        },
        {
          id: 5,
          name: "陈乾坤",
          telephone: "17865579761",
          area: "山东省 烟台市 莱山区",
          address: "山东工商学院"
        }
      ],
      tableData: [
        {
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: 15.99,
          num: 2,
          count: 10,
          danwei: "斤",
          money: 0
        },
        {
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: 15.99,
          num: 2,
          count: 10,
          danwei: "斤",
          money: 0
        },
        {
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: 15.99,
          num: 2,
          count: 10,
          danwei: "斤",
          money: 0
        },
        {
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: 15.99,
          num: 2,
          count: 10,
          danwei: "斤",
          money: 0
        }
      ]
    };
  },
  watch: {
    radio(oldval, newval) {
      console.log(newval);
    }
  },
  methods: {
    changeH() {
      let div = this.$refs.choose.$el.style;
      div.height === "auto" ? (div.height = "155px") : (div.height = "auto");
    },
    goPay(){
        this.$router.push('/pay_order')
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
          .button {
            float: left;
            margin: 10px 30px;
            border: 1px solid #ddd;
            border-radius: 1px;
            box-shadow: 6px 6px 4px rgb(210, 211, 212);
            div {
              text-align: left;
              height: 50px;
              span {
                line-height: 50px;
                font-size: 16px;
              }
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