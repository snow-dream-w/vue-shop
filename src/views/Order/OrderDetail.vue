<template>
  <div class="order">
    <div class="orderDetail">
      <div class="title">订单详情</div>
      <div class="content">
        <div class="info">
          <div class="address">
            收货信息：
            <span>
              <span>{{ tableData[0]&&tableData[0].telephone }}</span>
              <span>&emsp;{{ tableData[0]&&tableData[0].name }}</span>
              <br />
              <span>&emsp;&emsp;&emsp;&emsp;&emsp;{{ tableData[0]&&tableData[0].address.area.join(' ')}} {{ tableData[0]&&tableData[0].address.details }}</span>
            </span>
          </div>
          <hr />
          <div class="orderInfo">
            <span>订单金额：</span>
            <span class="name" style="color:red;">{{ tableData[0]&&tableData[0].total.toFixed(2) }}</span>
            <br />
            <span>订单编号：</span>
            <span class="name">{{ tableData[0]&&tableData[0]._id }}</span>
            <br />
            <span>下单时间：</span>
            <span class="name">{{ tableData[0]&&tableData[0].updatedAt | formatDate('') }}</span>
          </div>
        </div>
        <div class="status">
          <span style="lineHeight: 40px;">订单状态：{{ tableData[0]&&statusEnum[tableData[0].status] }}</span>
          <div>
            您可以：
            <el-button
              v-if="tableData[0]&&tableData[0].status===1"
              type="primary"
              size="small"
              @click="goPay(tableData[0]._id)"
            >去付款</el-button>
            <el-button
              v-if="tableData[0]&&tableData[0].status===1"
              type="text"
              size="small"
              @click="confirmCancel(tableData[0]._id)"
            >取消订单</el-button>
            <el-button
              v-if="tableData[0]&&tableData[0].status===2"
              type="primary"
              size="small"
              @click="$message({type: 'success',message: '提醒商家成功！'})"
            >提醒商家发货</el-button>
            <el-button
              v-if="tableData[0]&&tableData[0].status===3"
              type="text"
              size="small"
            >查看物流(暂不可用)</el-button>
            <el-button
              v-if="tableData[0]&&(tableData[0].status===0||tableData[0].status==4)"
              type="danger"
              size="small"
              @click="confirmDelete(tableData[0]._id)"
            >删除订单</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="title" style="marginTop: 15px;">商品信息</div>
    <div class="address">
      <el-table :data="tableData" border style="width: 100%" id="table">
        <el-table-column label="商品" width="879">
          <template slot-scope="scope">
            <el-table :data="scope.row.goodsInfo" border style="width: 100%">
              <el-table-column width="120">
                <template slot-scope="scope">
                  <img
                    :src="staticBaseUrl + scope.row.goodsId.images[0]"
                    style="width: 100px;height: 100px;"
                  />
                </template>
              </el-table-column>
              <el-table-column label="名称" prop="goodsId.name" width="180"></el-table-column>
              <el-table-column label="单价" width="140">
                <template slot-scope="scope">{{ scope.row.goodsId.price.toFixed(2) }}</template>
              </el-table-column>
              <el-table-column label="数量" prop="num" width="140"></el-table-column>
              <el-table-column label="单位" prop="goodsId.unit" width="140"></el-table-column>
              <el-table-column label="操作" width="135">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.status === 2&&tableData[0]&&tableData[0].status===4" type="primary" size="small">评价商品</el-button>
                  <el-button v-if="scope.row.status === 3&&tableData[0]&&tableData[0].status===4" type="primary" size="small">追评</el-button>
                  <el-button v-if="scope.row.status === 4&&tableData[0]&&tableData[0].status===4" type="text" size="small">修改评论(暂不可用)</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="实付款" width="120">
          <template slot-scope="scope">{{ scope.row.total.toFixed(2) }}</template>
        </el-table-column>
        <el-table-column label="订单状态" width="125">
          <template slot-scope="scope">{{ statusEnum[scope.row.status] }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      statusEnum: ["已取消", "待付款", "待发货", "已发货", "已完成"]
    };
  },
  filters: {
    formatDate(dates) {
      const times = new Date(dates);
      const year = times.getFullYear();
      const month = times.getMonth() + 1;
      const date = times.getDate();
      const hour = times.getHours();
      const minute = times.getMinutes();
      const second = times.getSeconds();
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    }
  },
  methods: {
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
            this.tableData[0].status = 0;
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
          this.$router.push("/person/order");
        } else {
          this.$message.error("订单删除失败，请重新尝试！");
        }
      });
    },
    initOrder(orderId) {
      this.axios.get(`/order/get/${orderId}`).then(result => {
        if (result.data.status === 1) {
          //成功取得数据，准备交互
          this.tableData.push(result.data.data);
        } else {
          this.$router.push("/*");
        }
      });
    }
  },
  created() {
    const orderId = this.$route.params.id;
    this.initOrder(orderId);
  }
};
</script>

<style lang="scss" scoped>
.order {
  width: 100%;
  .title {
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    text-indent: 1em;
    line-height: 50px;
    background: #ddd;
  }
  .content {
    width: 100%;
    overflow: hidden;
    .info {
      float: left;
      width: 45%;
      height: 240px;
      border: 1px solid #ddd;
      .address {
        padding: 20px;
        color: rgb(104, 101, 101);
        font-weight: bold;
        span {
          line-height: 30px;
          font-weight: 500;
        }
      }
      .orderInfo {
        padding: 20px;
        color: rgb(104, 101, 101);
        font-weight: bold;
        .name {
          line-height: 30px;
          font-weight: 500;
        }
      }
    }
    .status {
      float: left;
      padding: 30px;
      width: 627px;
      height: 240px;
      border: 1px solid #ddd;
    }
  }
}
</style>