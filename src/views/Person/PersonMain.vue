<template>
  <div id="app" class="clearfix">
    <div class="tac clearfix">
      <div class="per-content">
        <Menu ref="selection" :theme="theme" active-name="1" width="200" @on-select="clickHandle()">
          <MenuGroup title="订单管理">
            <router-link to="/person/order">
              <MenuItem name="1">
                <i class="el-icon-date"></i>
                全部订单
              </MenuItem>
            </router-link>
            <router-link to="/person/order/1">
              <MenuItem name="2">
                <i class="el-icon-wallet"></i>
                待付款
              </MenuItem>
            </router-link>
            <router-link to="/person/order/2">
              <MenuItem name="3">
                <Icon type="ios-cube-outline" /> 待发货
              </MenuItem>
            </router-link>
            <router-link to="/person/order/3">
              <MenuItem name="4">
                <Icon type="ios-car-outline" /> 已发货
              </MenuItem>
            </router-link>
            <router-link to="/person/order/4">
              <MenuItem name="5">
                <i class="el-icon-check"></i>
                已完成
              </MenuItem>
            </router-link>
            <router-link to="/person/order/0">
              <MenuItem name="6">
                <i class="el-icon-close"></i>
                已取消
              </MenuItem>
            </router-link>
          </MenuGroup>
          <MenuGroup title="账号管理">
            <router-link :to="{name: 'edit'}">
              <MenuItem name="7">
                <i class="el-icon-edit"></i>
                编辑个人资料
              </MenuItem>
            </router-link>
            <router-link :to="{name: 'address'}">
              <MenuItem name="8">
                <i class="el-icon-setting"></i>
                管理收货地址
              </MenuItem>
            </router-link>
          </MenuGroup>
        </Menu>
        <br />
        <p class="theme">切换主题</p>
        <RadioGroup v-model="theme">
          <Radio label="light"></Radio>
          <Radio label="dark"></Radio>
        </RadioGroup>
      </div>
    </div>
    <router-view id="order"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      theme: "light",
    };
  },
  methods: {
    clickHandle(){
      console.log(this.$refs.selection.currentActiveName+"监听路由");
    }
  }
};
</script>
<style scoped lang="scss">
#app {
  width: 100%;
  .tac {
    float: left;
    width: 200px;
    .per-content {
      position: relative;
      margin-top: 10px;
      width: 200px;
      box-shadow: 2px 0px rgb(241, 239, 239), -2px 0px rgb(241, 239, 239),
        0px 2px rgb(241, 239, 239), 0px -2px rgb(241, 239, 239);
      z-index: -1;
    }
  }

  #order {
    float: right;
    width: 940px;
    min-height: 650px;
    z-index: -1;
  }
  .tac:hover .per-content {
    z-index: 1;
  }
}
</style>
<style>
.ivu-radio-group {
  text-indent: 0.5em;
  line-height: 40px;
}
.theme {
  font-size: 16px;
  text-indent: 1em;
}
</style>
