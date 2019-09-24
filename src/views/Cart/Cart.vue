<template>
  <div id="app">
    <span class="title">我的购物车</span>

    <el-divider class="divider"></el-divider>
    <div class="tables">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        class="table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="图片" width="140">
          <template slot-scope="scope">
            <img :src="scope.row.image" width="50px" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="160"></el-table-column>
        <el-table-column prop="price" label="单价" width="120"></el-table-column>
        <el-table-column label="数量" width="240">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.num"
              @change="handleChange(scope.row.id)"
              :min="1"
              :max="scope.row.count"
              label="描述文字"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="库存/件" width="100"></el-table-column>
        <el-table-column prop="danwei" label="单位" width="100"></el-table-column>
        <el-table-column label="小计" width="120">
          <template slot-scope="scope">
            <span>￥{{ scope.row.num*scope.row.price.toFixed(2) }}</span>
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
        <el-button type="primary">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      tableData: [
        {
          id: 1,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: 15.99,
          num: 2,
          count: 10,
          danwei: "斤",
          money: 0
        },
        {
          id: 2,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: 15.99,
          num: 2,
          count: 10,
          danwei: "斤",
          money: 0
        },
        {
          id: 3,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: 15.99,
          num: 2,
          count: 10,
          danwei: "斤",
          money: 0
        },
        {
          id: 4,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: 15.99,
          num: 2,
          count: 10,
          danwei: "斤",
          money: 0
        }
      ],
      multipleSelection: [],
      tatal: 0
    };
  },
  methods: {
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.tatal = 0;
      for (let item in val) {
        this.tatal += val[item].price * val[item].num;
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleChange(index) {
      let id = new Number(index)
      this.$refs.multipleTable.toggleRowSelection(this.tableData[id-1]);
      this.$refs.multipleTable.toggleRowSelection(this.tableData[id-1]);
      // this.$refs.multipleTable.toggleRowSelection(index);
    }
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