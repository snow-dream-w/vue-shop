<template>
  <div id="query">
    <div class="image">
      <img
        src="http://yycmedia.image.alimmdn.com/upos/saleyspms.ushopn5.com-UPos/6B590F8DD9C0F178ABE6775B973B85A1.jpg"
      />
    </div>
    <div class="input">
      <div class="query">
        <input v-model="queryValue" placeholder="请输入关键字" />
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <router-link :to="{name: 'cart'}">
        <div class="cart">
          <i class="el-icon-shopping-cart-2 icon-cart"></i>
          <span>购物车[</span>
          <span class="num">{{ busNum }}</span>]
          <i class="el-icon-right"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "HeaderQuery",
  data() {
    return {
      queryValue: "",
    };
  },
  computed: {
    ...mapState({
      busNum: state => state.car_manager.busNum
    })
  }
};
</script>
<style lang="scss" scoped>
#query {
  display: flex;
  margin: 0 auto;
  width: 1140px;
  height: 90px;
  .image {
    width: 50%;
    img {
      margin-top: 7px;
      width: 288px;
      height: 75px;
    }
  }
  .input {
    display: flex;
    align-items: center;
    width: 50%;
    .query {
      background: #409eff;
      height: 42px;
      input {
        margin-left: 2px;
        width: 320px;
        height: 38px;
        border: 2px solid #409eff;
        text-indent: 1em;
      }
    }
    .cart {
      padding: 6px;
      margin-left: 34px;
      width: 120px;
      height: 38px;
      background: #f3f1f1;
      border: 1px solid #e9e9e9;
      box-sizing: border-box;
      .icon-cart {
        margin-right: 5px;
        font-size: 20px;
        color: #409eff;
      }
      .num {
        color: #409eff;
      }
    }
    .cart:hover {
      cursor: pointer;
      background: #e4e2e2;
    }
  }
}
</style>