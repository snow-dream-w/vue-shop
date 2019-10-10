<template>
  <div id="pay">
    <div class="pay_order">
      <div class="pay_order1">
        <div id="hr"></div>
        <div id="order">
          <p class="title">订单提交成功，请您尽快付款！</p>
          <span v-cloak>订单编号：{{ orderId }}</span> |
          <span v-cloak>
            付款金额:
            <span class="money">{{ total | money }}</span>元
          </span>
          <div class="detail">
            订单金额:
            <span>{{ total | money }}</span>元
            <br />收货信息:
            <span>{{ address.area }} {{ address.details }}</span>
            <br />下单时间:
            <span>{{ createAt }}</span>
          </div>
        </div>
        <div class="pay">
          <span class="choose">| 请选择支付方式</span>
          <div class="paylist">
            <el-checkbox-group v-model="checkList">
              <el-radio v-model="radio" label="1">余额支付</el-radio>
              <el-radio disabled v-model="radio" label="2">微信支付</el-radio>
            </el-checkbox-group>
          </div>
          <div class="submit">
            <el-button type="primary">确认支付</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: "M11908251257461370",
      total: 316,
      address: {
        area: "山东省 烟台市 莱山区",
        details: "山东工商学院"
      },
      createAt: "2020/02/02 21.09.21",
      radio: "1"
    };
  },
  filters: {
    money(data) {
      return "￥" + data.toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.pay_order {
  width: 100%;
  min-height: 460px;
  .pay_order1 {
    position: relative;
    z-index: -1;
    #hr {
      margin-top: 15px;
      border-top: 2px solid rgb(51, 202, 37);
    }
    #order {
      padding: 30px 120px;
      width: 100%;
      height: 230px;
      background: rgb(244, 248, 245);
      box-sizing: border-box;
      .title {
        margin-bottom: 5px;
        font-size: 18px;
        color: rgb(51, 202, 37);
      }
      .money {
        color: red;
        font-size: 18px;
        font-weight: bold;
      }
      .detail {
        margin-top: 20px;
        span {
          line-height: 30px;
        }
      }
    }
    .pay {
      margin-top: 50px;
      .choose {
        display: block;
        height: 30px;
        font-weight: bold;
      }
      .paylist {
        padding-left: 20px;
        height: 110px;
        line-height: 120px;
        font-size: 20px;
        border: 1px solid #e9e9e9;
      }
      .submit {
        float: right;
      }
    }
  }
}
.pay_order:hover .pay_order1{
  z-index: 0;
}
</style>