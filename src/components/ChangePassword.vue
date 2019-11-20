<template>
  <div>
    <div class="edit">
      <el-row>
        <b>&emsp;修改密码：</b>
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          :disabled="!disabled"
          @click="disabled=!disabled"
        ></el-button>
      </el-row>
    </div>

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="oldpass">
        <el-input
          type="password"
          v-model="ruleForm.oldpass"
          autocomplete="off"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item v-show="!disabled">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
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
        oldpass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      disabled: true
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/user/edit/password", {
              oldPassword: this.ruleForm.oldpass,
              newPassword: this.ruleForm.pass
            })
            .then(result => {
              if (result.data.status === 1) {
                this.$message({
                  message: "密码修改成功！",
                  type: "success"
                });
                this.disabled = false;
                this.ruleForm.oldpass = ''
                this.pass = ''
                this.checkPass = ''
              } else {
                this.$message.error("密码修改失败，请重新尝试！");
                if (result.data.status === 0) {
                  this.$router.push("/login_register/login");
                }
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.edit {
  margin-bottom: 20px;
}
.edit button {
  margin-right: 10px;
  float: right;
}
.el-input {
  width: 65%;
}
</style>

