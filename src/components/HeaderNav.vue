<template>
  <div id="nav">
    <div class="nav-content">
      <div class="welcome left">您好，欢迎来到二号小店</div>
      <div class="login left" v-if="CLogin">
        <router-link to="/login_register/login">
          <span class="hover">登录</span>
        </router-link>|
        <router-link to="/login_register/register">
          <span class="hover">免费注册</span>
        </router-link>
      </div>
      <div class="person left" v-else>
        <span class="hover">个人中心</span> |
        <span class="hover">注销</span>
      </div>
      <ul class="right">
        <li class="hover">
          <router-link :to="{name: 'cart'}">我的购物车</router-link>
        </li>
        <li class="hover">
          <router-link :to="{name: 'person'}">我的订单</router-link>
        </li>
        <li class="hover">购物记录</li>
        <li class="hover">联系客服</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderNav",
  data() {
    return {
      CLogin: true
    };
  }
};
</script>
<style lang="scss" scoped>
#nav {
  min-width: 1140px;
  background-color: #f8f8f8;
  height: 35px;
  .nav-content {
    margin: 0 auto;
    width: 1140px;
    height: 35px;
    line-height: 35px;
    .left {
      float: left;
    }
    .welcome {
      color: #817f7f;
    }
    .login,
    .person {
      margin: 0 5px;
      font-size: 14px;
      font-weight: 00;
    }
    .hover:hover {
      color: #e45e11;
      text-decoration: underline;
      cursor: pointer;
    }
    .right {
      display: flex;
      float: right;
      width: 320px;
      justify-content: space-around;
    }
  }
}
</style>