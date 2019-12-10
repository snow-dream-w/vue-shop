<template>
  <div id="app">
    <header-nav />
    <header-query />
    <header-type />
    <transition>
      <router-view ref="home" id="router"></router-view>
    </transition>
    <div style="height: 30px"></div>
    <!-- <el-divider></el-divider> -->
    <!-- <footer>
      脚部描述
      <br />二号小店有限公司
    </footer> -->
  </div>
</template>

<script>
import HeaderNav from "@/components/Header/HeaderNav.vue";
import HeaderQuery from "@/components/Header/HeaderQuery.vue";
import HeaderType from "@/components/Header/HeaderType.vue";

export default {
  components: {
    HeaderNav,
    HeaderQuery,
    HeaderType
  }
};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  #router {
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(27, 24, 240, 0.3);
      background-color: #a6cee6;
    }
    ::-webkit-scrollbar-thumb:hover{
      background-color: #87c2e7;
    }
    margin: 0 auto;
    width: 1140px;
    min-height: 600px
  }
  footer {
    width: 100%;
    position: absolute;
    text-align: center;
    z-index: -5;
  }
}
.v-enter,
.v-leave-to {
  opacity: 1;
  /* transform: rotateX(360deg) */
}

.v-enter-active,
.v-leave-active {
  opacity: 0;
  transition: all 0.2s linear;
}
</style>
