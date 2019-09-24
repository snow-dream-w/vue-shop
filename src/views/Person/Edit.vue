<template>
  <div id="app">
    <div class="hover clearfix">
      <div class="content">

        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/user/upload"
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
              <el-input v-model="ruleForm.telephone" :disabled="disabled"></el-input>
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
    return {
      avatar: "http://localhost:3000/avatar/default.png",
      ruleForm: {
        telephone: "17865579761",
        name: "吾忆那年秋",
        sex: "男",
        date: new Date("1900-01-01"),
        articleNum: 0,
        commentNum: 0
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 4, max: 20, message: "长度在 4 到 2 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择活动区域", trigger: "change" }],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      disabled: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      console.log(file);

      this.avatar = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 4;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
      }
      return isJPG && isLt2M;
    }
  },
  components: {
    changePassword
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
