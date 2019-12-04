<template>
  <div id="app">
    <div class="order-content clearfix">
      <div class="content">
        <person-avatar />
        <div class="order">
          <el-table :data="tableData" border v-loading="loading" id="table">
            <el-table-column label="商品" width="580">
              <template slot-scope="scope">
                <el-table :data="scope.row.goodsInfo" border>
                  <el-table-column width="108">
                    <template slot-scope="scope">
                      <img
                        :src="axios.defaults.baseURL + scope.row.goodsId.images[0]"
                        style="width: 80px;height: 80px;"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="名称" prop="goodsId.name" width="180"></el-table-column>
                  <el-table-column label="单价" prop="goodsId.price" width="90">
                    <template slot-scope="scope">￥{{ scope.row.goodsId.price.toFixed(2) }}元</template>
                  </el-table-column>
                  <el-table-column label="数量" prop="num" width="90"></el-table-column>
                  <el-table-column label="单位" prop="goodsId.unit" width="90"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="实付款" width="85">
              <template slot-scope="scope">￥{{ scope.row.total.toFixed(2) }}元</template>
            </el-table-column>
            <el-table-column prop="status" label="订单状态" width="100">
              <template slot-scope="scope">
                <ul>
                  <li
                    v-for="(value,index) in statusEnum"
                    :key="index"
                    v-if="scope.row.status==index"
                  >{{ value }}</li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="orderDetails(scope.row._id)"
                  type="text"
                  size="small"
                  class="operate-menu"
                >订单详情</el-button>
                <el-button
                  v-if="scope.row.status === 2"
                  type="primary"
                  size="small"
                  @click="$message({type: 'success',message: '提醒商家成功！'})"
                >提醒发货</el-button>
                <el-button
                  v-if="scope.row.status === 1"
                  type="primary"
                  size="small"
                  @click="goPay(scope.row._id)"
                >去付款</el-button>
                <el-button
                  v-if="scope.row.status === 3"
                  type="primary"
                  size="small"
                  @click="confirmReceiving(scope.row._id)"
                >确认收货</el-button>
                <el-button
                  v-if="scope.row.status === 0 || scope.row.status === 4"
                  type="danger"
                  size="small"
                  @click="confirmDelete(scope.row._id)"
                >删除订单</el-button>
                <br />
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.status === 4"
                  @click="orderDetails(scope.row._id)"
                >&nbsp;&nbsp;&nbsp;评价商品</el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.status === 1"
                  @click="confirmCancel(scope.row._id)"
                >&nbsp;&nbsp;&nbsp;取消订单</el-button>
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
      tableData: [],
      statusEnum: ["已取消", "待付款", "待发货", "已发货", "已完成"],
      loading: true
    };
  },
  watch: {
    "$route.path"() {
      const status = this.$route.params.status;
      this.initOrder(status);
    }
  },
  methods: {
    orderDetails(orderId) {
      this.$router.push("/order_detail/" + orderId);
    },
    goPay(orderId) {
      this.$router.push(`/pay_order/${orderId}`);
    },
    confirmCancel(orderId) {
      this.$confirm("确认取消订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.cancelOrder(orderId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    confirmDelete(orderId) {
      this.$confirm("删除订单不可恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteOrder(orderId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    confirmReceiving(orderId) {
      this.$confirm("确认收到货物, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.completeOrder(orderId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    cancelOrder(orderId) {
      this.axios
        .post("/order/cancel", {
          _id: orderId
        })
        .then(result => {
          if (result.data.status === 1) {
            this.$message({
              type: "success",
              message: "订单取消成功"
            });
            const status = this.$route.params.status;
            this.initOrder(status);
          } else {
            this.$message.error("订单取消失败，请重新尝试！");
          }
        });
    },
    deleteOrder(orderId) {
      this.axios.delete(`/order/delete/${orderId}`).then(result => {
        if (result.data.status === 1) {
          this.$message({
            type: "success",
            message: "订单删除成功"
          });
          const status = this.$route.params.status;
          this.initOrder(status);
        } else {
          this.$message.error("订单删除失败，请重新尝试！");
        }
      });
    },
    completeOrder(orderId) {
      this.axios
          .put(`/order/sending`, {
            orderId,
            status: 4
          })
          .then(result => {
            if (result.data.status === 1) {
              for(let index of this.tableData.keys()){
                if (this.tableData[index]._id === orderId){
                  this.tableData.splice(index, 1)
                  break;
                }
              }
              this.$message({
                type: 'success',
                message: '收货成功！'
              })
              this.$router.push("/order_detail/" + orderId);
            } else {
              this.$message.error("未知错误，请刷新重试");
            }
          });
    },
    initOrder() {
      const status = this.$route.params.status;
      let url = "";
      if (status) {
        url = `/order/orderInfo/${status}`;
      } else {
        url = `/order/orderInfo`;
      }
      this.axios.get(url).then(result => {
        //成功取到数据
        this.tableData = result.data.data;
        //时间逆序排序
        this.tableData.sort((a, b) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });
        this.loading = false;
      });
    }
  },
  created() {
    this.initOrder();
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
.operate-menu {
  margin-left: 10px;
}
</style>