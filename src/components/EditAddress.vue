<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="600px">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="收货人" prop="name">
        <el-input
          :disabled="disabled"
          v-model="ruleForm.name"
          placeholder="请输入收货人姓名"
          maxlength="12"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="telephone">
        <el-input
          :disabled="disabled"
          v-model="ruleForm.telephone"
          placeholder="请输入正确联系方式"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" prop="post">
        <el-input
          :disabled="disabled"
          v-model="ruleForm.post"
          style="width: 200px"
          placeholder="请输入邮编"
        ></el-input>
      </el-form-item>
      <el-form-item label="收货地址" prop="address.area">
        <el-cascader :disabled="disabled" v-model="ruleForm.address.area" :options="options"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address.details">
        <el-input
          :disabled="disabled"
          type="textarea"
          v-model="ruleForm.address.details"
          style="width: 400px"
          placeholder="请认真填写详细地址，确保商品顺利送达（不超100字）"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin:30px 0 0 100px;" v-if="!disabled">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
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
      dialogFormVisible: false,
      ruleForm: {
        name: "",
        telephone: "",
        post: "",
        address: {
          area: [],
          details: ""
        }
      },
      formLabelWidth: "120px",
      rules: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        telephone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        "address.area": [{ required: true, trigger: "blur" }],
        "address.details": [
          { required: true, message: "详细地址不能为空", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "详细地址不能为空且不能超过100字",
            trigger: "blur"
          }
        ]
      },
      value: [],
      title: "",
      disabled: false,
      openWay: "",
      options: options
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.openWay === "add") {
            this.axios
              .post("/address/add", this.ruleForm)
              .then(result => {
                if (result.data.status === 1) {
                  this.$message({
                    type: "success",
                    message: "地址添加成功"
                  });
                  this.$emit("initParent");
                  this.dialogFormVisible = false;
                } else {
                  this.$message.error("添加失败，请重新尝试");
                }
              })
              .catch(err => {
                this.$router.push("/*");
              });
          } else {
            this.axios
              .post("/address/update", {
                _id: this.ruleForm._id,
                name: this.ruleForm.name,
                telephone: this.ruleForm.telephone,
                post: this.ruleForm.post,
                address: {
                  area: this.ruleForm.address.area,
                  details: this.ruleForm.address.details
                }
              })
              .then(result => {
                if (result.data.status === 1) {
                  this.$message({
                    type: "success",
                    message: "地址更新成功"
                  });
                  this.$emit("initParent");
                  this.dialogFormVisible = false;
                } else {
                  this.$message.error("添加失败，请重新尝试");
                }
              })
              .catch(err => {
                this.$router.push("/*");
              });
          }
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
    },
    init(addressInfo) {
      this.ruleForm = addressInfo;
    },
    isShow(way) {
      this.openWay = way;
      this.disabled = false;
      if (way === "add") {
        this.ruleForm = {
          name: "",
          telephone: "",
          post: "",
          address: {
            area: [],
            details: ""
          }
        };
        this.title = "添加收货地址";
      } else if (way === "query") {
        this.title = "收货地址详情";
      } else {
        this.title = "编辑收货地址";
      }
      if (way === "query") {
        this.disabled = true;
      }
      this.dialogFormVisible = !this.dialogFormVisible;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 300px;
}
</style>
