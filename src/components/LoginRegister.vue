<template>
  <div class="l-r clearfix">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-tabs class="title" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login"></el-tab-pane>
        <el-tab-pane label="注册" name="register"></el-tab-pane>
      </el-tabs>
      <el-form-item label="手机号" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入11位手机号" v-on:input="changeValue('name')"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          v-on:input="changeValue('pass')"
          @keyup.enter.native="submitForm('ruleForm')"
          autocomplete="off"
          placeholder="请输入6-20位密码"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="choose" label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          placeholder="请输入6-20位密码"
        ></el-input>
      </el-form-item>
      <div style="margin: 0 auto 15px 120px">
        <template v-if="choose">
          <el-radio v-model="ruleForm.radio" label="男">男</el-radio>
          <el-radio v-model="ruleForm.radio" label="女">女</el-radio>
        </template>
      </div>
      <span class="point">{{ point }}</span>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { async } from "q";
export default {
  name: "LoginRegister",
  data() {
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空!"));
      }
      setTimeout(() => {
        if (
          !value.match(
            /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
          )
        ) {
          callback(new Error("请输入11位合法手机号！"));
        } else {
          callback();
        }
      }, 1000);
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
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
      activeName: "login",
      point: "",
      fromPath: "",
      middle: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.choose === false) {
            this.login();
          } else {
            this.register();
          }
        }
      });
    },
    register() {
      this.axios
        .post("/user/register", {
          telephone: this.ruleForm.name,
          password: this.ruleForm.pass,
          sex: this.ruleForm.radio
        })
        .then(result => {
          if (result.data.status === 0) {
            this.point = result.data.data;
          } else {
            this.$message({
              message: "恭喜你，注册成功！请登录...",
              type: "success"
            });
            this.middle.name = result.data.data.name;
            this.middle.pass = this.ruleForm.pass;
            this.activeName = "login";
            this.point = "";
          }
        });
    },
    login() {
      this.axios
        .post("/user/login", {
          telephone: this.ruleForm.name,
          password: this.ruleForm.pass
        })
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.data)
            this.point = res.data.data;
          } else {
            this.$store.dispatch("changeAnsyc_login_status", false);
            this.$router.push(this.fromPath);
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClick(tab, event) {
      this.$refs["ruleForm"].clearValidate();
      if (tab.name === "login") {
        this.choose = false;
      } else {
        this.choose = true;
      }
    },
    changeValue(prop) {
      this.point = "";
      this.$refs["ruleForm"].clearValidate(prop);//prop是表单的prop值
    }
  },
  watch: {
    activeName(value) {
      if (value === "register") {
        this.middle.name = this.ruleForm.name;
        this.middle.pass = this.ruleForm.pass;
        this.ruleForm.name = "";
        this.ruleForm.pass = "";
        this.ruleForm.checkPass = "";
        this.ruleForm.radio = "男";
        this.choose = true;
      } else {
        this.ruleForm.name = this.middle.name;
        this.ruleForm.pass = this.middle.pass;
        this.choose = false;
      }
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromPath = from.path;
    });
  },
  created() {
    let idCard = this.$route.params.id;
    if (idCard == "register") {
      this.choose = true;
      this.activeName = "register";
    } else {
      if (this.$store.state.public_attribute.login_status === false) {
        this.$message({
          message: "已登录，请勿重复登录!",
          type: "warning"
        });
        this.$router.go(-1);
      }
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
    .point {
      display: block;
      text-indent: 4em;
      color: red;
      font-size: 14px;
      font-weight: 500;
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