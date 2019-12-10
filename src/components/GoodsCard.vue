<template>
  <li @click="handleGoodsInfo(item._id)">
  <el-card class="li" shadow="hover" :body-style="{ padding: '0px' }">
    <!-- <img :src="axios.defaults.baseURL + item.images[0]" /> -->
    <img src="@/assets/1.png" />
    <p>{{ item.name }}</p>
    <div class="bottom">
      <span class="money">{{ item.price | money }}</span>
      <span v-cloak class="num">{{ item.sales }}人付款</span>
    </div>
  </el-card>
  </li>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  filters: {
    money(data) {
      return "￥" + data.toFixed(2);
    }
  },
  methods: {
    /**
     * 响应商品卡片点击事件
     */
    handleGoodsInfo(id) {
      this.$router.replace("/goods/" + id);
    }
  }
};
</script>
<style lang="scss" scoped>
li {
  float: left;
  margin: 10px 1%;
  width: 23%;
  // height: 300px;
  // border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  img {
    // padding: 1px;
    width: 100%;
    // height: 72%;
    background: rgb(204, 225, 233);
  }

  p {
    margin: 8px auto 0 10px;
    line-height: 20px;
  }

  .bottom {
    width: 100%;
    height: 25px;
    padding: 5px 10px;
    box-sizing: border-box;

    .money {
      display: block;
      float: left;
      color: red;
    }

    .num {
      display: block;
      float: right;
    }
  }
}
</style>