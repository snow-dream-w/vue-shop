<template>
  <div id="app">
    <span class="title">我的购物车</span>

    <el-divider class="divider"></el-divider>
    <div class="tables">
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        class="table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="图片" width="140">
          <template slot-scope="scope">
            <img :src="axios.defaults.baseURL + scope.row.goodsId.images[0]" width="50px" />
          </template>
        </el-table-column>
        <el-table-column prop="goodsId.name" label="名称" width="160"></el-table-column>
        <el-table-column prop="goodsId.price" label="单价" width="120"></el-table-column>
        <el-table-column label="数量" width="240">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.num"
              @change="handleChange(scope.row.id)"
              :min="1"
              :max="scope.row.goodsId.inventoryNum"
              label="描述文字"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="goodsId.inventoryNum" label="库存/件" width="100"></el-table-column>
        <el-table-column prop="goodsId.unit" label="单位" width="100"></el-table-column>
        <el-table-column label="小计" width="120">
          <template slot-scope="scope">
            <span>￥{{ scope.row.num*scope.row.goodsId.price.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="button">
      <el-button>清空购物车</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <div style="float: right;width:200px;">
        总计
        <span style="color: red;">￥{{ tatal.toFixed(2) }}</span>&emsp;
        <el-button type="primary" @click="carSettle">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      tatal: 0,
      dialogVisible: false,
      loading: true
    };
  },
  methods: {
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(val) {
      let b = [];
      this.multipleSelection = val;
      this.tatal = 0;
      for (let item in val) {
        this.tatal += val[item].goodsId.price * val[item].num;
      }
    },
    handleDelete(index, row) {
      this.open(row._id);
    },
    handleChange(index) {
      let id = new Number(index);
      this.$refs.multipleTable.toggleRowSelection(this.tableData[id - 1]);
      this.$refs.multipleTable.toggleRowSelection(this.tableData[id - 1]);
      // this.$refs.multipleTable.toggleRowSelection(index);
    },
    carSettle() {
      if(this.multipleSelection.length === 0){
        this.$message.error('请选择要结算的商品');
        return;
      }
      this.$store.dispatch("changeAnsyc_select_goods", this.multipleSelection);
      this.$router.push("/choose_address");
    },
    open(_id) {
      this.$confirm("将该商品从购物车删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.delete("/car/delete/" + _id).then(result => {
            if (result.data.status === 1) {
              for (let index in this.tableData) {
                const element = this.tableData[index];
                if (element._id === _id) {
                  this.tableData.splice(index, 1);
                  break;
                }
              }
            } else{
              this.$router.push('*')
            }
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.axios.get("/car/get").then(result => {
      this.tableData = result.data.data;
      for (let index = 0; index < this.tableData.length; index++) {
        this.tableData[index]["id"] = index + 1;
      }
      this.loading = false
    });
  }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  .title {
    display: block;
    margin-top: 20px;
    font-size: 25px;
    font-weight: bold;
    color: rgb(7, 131, 248);
  }
  .divider {
    margin: 10px 0;
    z-index: -1;
  }
  .tables {
    // min-height: 320px;
    .table {
      z-index: -1;
    }
  }
  .tables:hover .table {
    cursor: pointer;
    z-index: 0;
  }
  .button {
    margin-top: 20px;
  }
}
</style>