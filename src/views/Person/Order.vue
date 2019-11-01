<template>
  <div id="app">
    <div class="order-content clearfix">
      <div class="content">
        <person-avatar />
        <div class="order">
          <el-table :data="tableData" border id="table">
            <el-table-column label="商品" width="580">
              <template slot-scope="scope">
                <el-table :data="scope.row.goods" border>
                  <el-table-column width="108">
                    <template slot-scope="scope">
                      <img :src="scope.row.image" style="width: 80px;height: 80px;" />
                    </template>
                  </el-table-column>
                  <el-table-column label="名称" prop="name" width="180"></el-table-column>
                  <el-table-column label="单价" prop="price" width="90"></el-table-column>
                  <el-table-column label="数量" prop="num" width="90"></el-table-column>
                  <el-table-column label="单位" prop="danwei" width="90"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="money" label="实付款" width="85"></el-table-column>
            <el-table-column prop="status" label="订单状态" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  class="operate-menu"
                >订单详情</el-button>
                <el-button type="primary" size="small">确认发货</el-button>
                <el-button type="text" size="small">取消订单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          goods: [
            {
              id: 1,
              image: require("@/assets/logo.png"),
              name: "酸奶plus",
              price: 10.5,
              num: 1,
              danwei: "件"
            }
          ],
          money: "￥120.00",
          status: "已付款"
        },
        {
          id: 2,
          goods: [
            {
              id: 1,
              image: require("@/assets/logo.png"),
              name: "酸奶plus",
              price: 10.6,
              num: 1,
              danwei: "件"
            },
            {
              id: 2,
              image: require("@/assets/logo.png"),
              name: "酸奶plus",
              price: 10.7,
              num: 1,
              danwei: "件"
            }
          ],
          money: "￥100.00",
          status: "待付款"
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(row) {
      this.$router.push('/order_detail/'+row.id)
    }
  }
};
</script>
<style scoped lang="scss">
#app {
  width: 940px;
  z-index: -2;
  .order-content {
    width: 100%;
    .content {
      float: left;
      margin-top: 10px;
      margin-left: 15px;
      width: 920px;
      z-index: -1;
      .order {
        position: relative;
        margin-top: 15px;
        width: 920px;
        z-index: -1;
      }
    }
  }
  .order-content:hover .order {
    z-index: 1;
  }
}
</style>
<style>
  .operate-menu{
    margin-left: 10px;
  }
</style>