<template>
  <el-dialog
    :title="'请对商品 '+goodsName+' 进行评价'"
    :visible.sync="dialogFormVisible"
    @close="handleClose"
    width="640px"
  >
    <el-form ref="ruleForm" :model="formData">
      <el-form-item label="满意度" :label-width="formLabelWidth">
        <el-rate v-model="formData.grade" show-text style="margin-top:10px;"></el-rate>
      </el-form-item>
      <el-form-item label="评价内容" :label-width="formLabelWidth" prop="content">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="formData.content"
          maxlength="300"
          show-word-limit
          rows="10"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      formLabelWidth: "70px",
      dialogFormVisible: false,
      goodsName: "苹果",
      formData: {
        grade: 5,
        content: "",
        carsId: undefined,
        goodsId: undefined
      }
    };
  },
  methods: {
    /**
     * 关闭弹窗重置表单
     */
    handleClose() {
      this.$refs.ruleForm.resetFields()
    },
    /**
     * 初始化参数
     */
    initOpen(carsId, goodsId){
      this.dialogFormVisible = true
      this.formData.carsId = carsId
      this.formData.goodsId = goodsId
    },
    /**
     * 提交评价
     */
    submit() {
      this.axios.post('/comment/add',this.formData).then(result => {
        if(result.data.status === 1) {
          this.$message({
            type: 'success',
            message: '评论成功'
          })
          this.$emit('initOrder', this.$route.params.id)
          this.dialogFormVisible = false
        } else {
          this.$message.error(result.data.data)
        }
      })
    }
  }
};
</script>