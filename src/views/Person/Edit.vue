<template>
  <div id="app">
    <div class="hover clearfix">
      <div class="content">
        <el-upload
          class="avatar-uploader"
          :action="axios.defaults.baseURL + '/user/upload'"
          :with-credentials="true"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-tooltip class="item" effect="dark" content="单击更换头像" placement="bottom">
            <el-avatar :size="50" :src="avatar"></el-avatar>
          </el-tooltip>
        </el-upload>

        <div class="title">
          <span>&emsp;编辑个人资料</span>
        </div>
        <div class="info">
          <div class="edit">
            <el-row>
              <b>&emsp;基本信息：</b>
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
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="注册手机" prop="telephone" disabled>
              <el-input v-model="ruleForm.telephone" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="name" disabled>
              <el-input v-model="ruleForm.name" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="ruleForm.sex" placeholder="请选择活动区域" :disabled="disabled">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!disabled">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            <el-divider></el-divider>
            <change-password />
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import changePassword from "../../components/ChangePassword";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (!value.match(/^[a-zA-Z0-9_\-\u4e00-\u9fa5]{4,12}$/)) {
        callback(new Error("请输入中英文字符、数字或下划线组成的4-20位昵称！"));
      } else {
        callback();
      }
    };
    return {
      avatar: "/avatar/default.png",
      ruleForm: {
        telephone: "17865579761",
        name: "",
        sex: "男"
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称!", trigger: "change" },
          { validator: validateName, trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }]
      },
      disabled: true
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/user/edit/info", {
              name: this.ruleForm.name,
              sex: this.ruleForm.sex
            })
            .then(result => {
              if (result.data.status === 1) {
                this.$message({
                  message: "修改成功！",
                  type: "success"
                });
                this.disabled = !this.disabled
              } else {
                this.$message.error("修改失败，请重新尝试！");
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.avatar = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === "image/jpeg") | (file.type === "image/png");
      const isLt2M = file.size / 1024 / 1024 < 4;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是JPG/PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
      }
      return isJPG && isLt2M;
    }
  },
  components: {
    changePassword
  },
  created() {
    this.axios.get("/user/person").then(result => {
      if(result.data.status === 0){
        this.$router.push('/login_register/login');
      }
      this.ruleForm.telephone = result.data.data.telephone;
      this.ruleForm.name = result.data.data.name;
      this.ruleForm.sex = result.data.data.sex;
      this.avatar = this.axios.defaults.baseURL + result.data.data.avatar;
    });
  }
};
</script>
<style scoped lang="scss">
.hover:hover .content {
  z-index: 0;
}
.content {
  position: relative;
  margin: 10px 0 0 15px;
  width: 925px;
  border: 1px solid transparent;
  z-index: -1;
  .title {
    border: 1px solid #ddd;
    margin-top: 10px;
    background: #ddd;
    span {
      font-size: 18px;
      font-weight: bold;
      line-height: 50px;
    }
  }
  .info {
    width: 100%;
    border: 1px solid #ddd;
    box-sizing: border-box;
    .edit {
      margin-top: 10px;
      width: 100%;
      height: 60px;
      button {
        margin-right: 10px;
        float: right;
      }
    }
  }
}
</style>
