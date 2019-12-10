<template>
  <div class="avatar">
    <el-col :span="12">
      <div class="demo-basic--circle">
        <div class="block">
          <router-link :to="{name: 'edit'}">
            <el-avatar :size="50" :src="axios.defaults.baseURL + circleUrl"></el-avatar>
          </router-link>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: ""
    };
  },
  created(){
    let cookies = document.cookie.split(";");
    // 取出头像
    cookies.forEach(value => {
      if(value.indexOf("avatar=") !== -1){
        let avatar = value.split("=");
        this.circleUrl = avatar[1];
      }
    })
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  height: 70px;
  border: 0.5px solid rgb(241, 240, 240);
  border-radius: 3px;
  .el-col {
    margin: 10px auto auto 20px;
  }
}
</style>