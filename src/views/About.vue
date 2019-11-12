<template>
  <div class="about">
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="600px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="收货人" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入收货人姓名" maxlength="12" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephone">
          <el-input v-model="ruleForm.telephone" placeholder="请输入联系方式" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="post">
          <el-input v-model="ruleForm.post" style="width: 200px" placeholder="请输入邮编"></el-input>
        </el-form-item>
        <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
        <el-form-item style="margin:30px 0 0 100px;">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import options from "../assets/city";
export default {
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("收货人不能为空"));
      }
      setTimeout(() => {
        if (!value.match(/^[a-zA-Z0-9_\-\u4e00-\u9fa5]{1,12}$/)) {
          callback(new Error("请输入1-12位中文、英文字母、数字或_组成的名称"));
        } else {
          callback();
        }
      }, 300);
    };
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("联系方式不能为空"));
      }
      setTimeout(() => {
        if (
          !value.match(
            /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
          )
        ) {
          callback(new Error("请输入11位手机号"));
        } else {
          callback();
        }
      }, 300);
    };
    return {
      dialogFormVisible: true,
      ruleForm: {
        name: "吾忆那年秋",
        telephone: "17865579761",
        post: "123456",
        address: {
          area: "山东省 烟台市 莱山区",
          details: "山东工商学院"
        }
      },
      formLabelWidth: "120px",
      rules: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        telephone: [{ required: true, validator: checkPhone, trigger: "blur" }]
      },
      value: [],
      options: options
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 300px;
}
</style>
