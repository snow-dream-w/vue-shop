<template>
  <div class="l-r clearfix">
    <el-form :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-tabs class="title" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login"></el-tab-pane>
        <el-tab-pane label="注册" name="register"></el-tab-pane>
      </el-tabs>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="choose" label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <div style="margin: 0 auto 15px 120px">
        <template v-if="choose">
          <el-radio v-model="ruleForm.radio" label="男">男</el-radio>
          <el-radio v-model="ruleForm.radio" label="女">女</el-radio>
        </template>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "LoginRegister",
  data() {
    var checkAge = (rule, value, callback) => {
      this.regResult = false;
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value.length < 4 || value.length > 16) {
          callback(new Error("请输入4-16位字符"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      this.regResult = false;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      this.regResult = false;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        name: "",
        radio: "男"
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkAge, trigger: "blur" }]
      },
      choose: false,
      title: "登录",
      activeName: "login"
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("提交成功");
        }
      });
    },
    register() {},
    login() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClick(tab, event) {
      if (tab.name === "login") {
        this.choose = false;
      } else {
        this.choose = true;
      }
    }
  },
  watch: {
    choose() {
      this.ruleForm.name = "";
      this.ruleForm.pass = "";
    },
    "$route.path"(newRouter, oldRouter) {
      if (newRouter.includes("/register")) {
        this.activeName = "register";
        this.choose = true;
        this.title = "注册";
      } else {
        this.activeName = "login";
        this.choose = false;
        this.title = "登录";
      }
    }
  },
  components: {},
  created() {
    let idCard = this.$route.params.id;
    if (idCard == "register") {
      this.choose = true;
      this.activeName = "register";
    }
  }
};
</script>
<style lang="scss" scoped>
.l-r {
  width: 1140px;
  height: 600px;
  background: url("../assets/loginbg.jpg") no-repeat;
  .el-form {
    position: relative;
    float: right;
    padding: 60px 40px 10px 0;
    margin: 80px 30px auto auto;
    width: 360px;
    box-shadow: 2px 0 5px rgb(196, 193, 193), -2px 0 5px rgb(196, 193, 193),
      0 2px 5px rgb(196, 193, 193), 0 -2px 5px rgb(196, 193, 193);
    background: #fff;
    .title {
      position: absolute;
      left: 140px;
      top: 8px;
    }
    .el-button {
      margin-left: 20px;
    }
  }
}
</style>
<style>
#tab-login,
#tab-register {
  font-size: 20px;
  font-weight: 550;
}
</style>