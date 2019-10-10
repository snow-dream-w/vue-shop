<template>
  <div class="order">
    <div class="orderDetail">
      <div class="title">订单详情</div>
      <div class="content">
        <div class="info">
          <div class="address">
            收货信息：
            <span>
              <span>17865579761</span>
              <span>&emsp;吾忆那年秋</span>
              <br />
              <span>&emsp;&emsp;&emsp;&emsp;&emsp;山东省 烟台市 莱山区 山东工商学院</span>
            </span>
          </div>
          <hr />
          <div class="orderInfo">
            <span>订单金额：</span>
            <span class="name" style="color:red;">￥316.00</span>
            <br />
            <span>订单编号：</span>
            <span class="name">11905251257461370</span>
            <br />
            <span>下单时间：</span>
            <span class="name">2019-8-25 12:57:46</span>
          </div>
        </div>
        <div class="status">
            <span style="lineHeight: 40px;">订单状态：买家已经提交订单，等待付款~</span>
            <div>您可以：
                <el-button type="primary" size="small">去付款</el-button>&emsp;
                <el-link type="primary">取消订单</el-link>
            </div>
        </div>
      </div>
    </div>
    <div class="title" style="marginTop: 15px;">商品信息</div>
    <div class="address">
      <el-table :data="tableData" border style="width: 100%" id="table">
        <el-table-column label="商品" width="879">
          <template slot-scope="scope">
            <el-table :data="scope.row.goods" border style="width: 100%">
              <el-table-column width="120">
                <template slot-scope="scope">
                  <img :src="scope.row.image" style="width: 100px;height: 100px;" />
                </template>
              </el-table-column>
              <el-table-column label="名称" prop="name" width="255"></el-table-column>
              <el-table-column label="单价" prop="price" width="160"></el-table-column>
              <el-table-column label="数量" prop="num" width="160"></el-table-column>
              <el-table-column label="单位" prop="danwei" width="160"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="实付款" width="120"></el-table-column>
        <el-table-column prop="status" label="订单状态" width="120"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
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
  created() {
    console.log(this.$route.params.id);
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
    .status{
        float: left;
        padding: 30px;
        width: 49.2%;
        height: 240px;
        border: 1px solid #ddd;
    }
  }
}
</style>