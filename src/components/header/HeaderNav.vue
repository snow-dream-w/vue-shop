<template>
  <div id="nav">
    <div class="nav-content">
      <div class="welcome left">您好，欢迎来到二号小店</div>
      <div class="login left" v-if="login_status">
        <router-link to="/login_register/login">
          <span class="hover">登录</span>
        </router-link>|
        <router-link to="/login_register/register">
          <span class="hover">免费注册</span>
        </router-link>
      </div>
      <div class="person left" v-else>
        <router-link :to="{name: 'person'}">
          <span class="hover">个人中心</span> |
        </router-link>
        <span class="hover" @click="logout">注销</span>
      </div>
      <ul class="right">
        <li class="hover">
          <router-link :to="{name: 'cart'}">我的购物车</router-link>
        </li>
        <li class="hover">
          <router-link :to="{name: 'person'}">我的订单</router-link>
        </li>
        <li class="hover" @click="$message({type:'warning',message:'购物记录,暂不可用'})">购物记录</li>
        <li class="hover" @click="$message({type:'warning',message:'联系客服,暂不可用'})">联系客服</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "HeaderNav",
  methods: {
    /**
     * 退出登录
     */
    logout() {
      this.axios.get("/user/logout").then(result => {
        if (result.data.status === 1) {
          this.$store.dispatch("changeAnsyc_login_status",true);
          this.$router.push("/");
        } else {
          this.$router.push('/login_register/login')
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      login_status: "login_status"
    })
  },
  created() {
    // 验证登录状态
    this.axios.get("/user/check_login").then(result => {
      if (result.data.status === 1) {
        this.$store.dispatch("changeAnsyc_login_status",false);
      }
    });
    // 初始化购物车数量
    this.axios.get("/user/person").then(result => {
      if (result.data.status === 1) {
        this.$store.dispatch("changeAnsyc_car_num", result.data.data.busNum);
      }
    });
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