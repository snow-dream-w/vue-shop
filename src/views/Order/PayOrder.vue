<template>
  <div id="pay">
    <div class="pay_order">
      <div class="pay_order1">
        <div id="hr"></div>
        <div id="order">
          <p class="title">订单提交成功，请您尽快付款！</p>
          <span v-cloak>订单编号：{{ orderInfo._id }}</span> |
          <span v-cloak>
            付款金额:
            <span class="money">{{ orderInfo.total | money }}</span>元
          </span>
          <div class="detail">
            订单金额:
            <span>{{ orderInfo.total | money }}</span>元
            <br />收货信息:
            <span>{{ orderInfo.address.area.join(' ') }} {{ orderInfo.address.details }}</span>
            <br />下单时间:
            <span>{{ orderInfo.created }}</span>
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
            <el-button type="primary" @click="openInputPassword">确认支付</el-button>
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
      orderInfo: {
        address: {
          area: []
        }
      },
      radio: "1"
    };
  },
  filters: {
    money(data) {
      return "￥" + new Number(data).toFixed(2);
    }
  },
  methods: {
    /**
     * 初始化订单数据
     */
    initOrder(orderId) {
      this.axios
        .get(`/order/get/${orderId}`)
        .then(result => {
          if (result.data.status === 1) {
            this.orderInfo = result.data.data;
          } else {
            this.$router.push("/*");
          }
        })
        .catch(err => {
          console.log(err, "++--++");
          this.$router.push("/*");
        });
    },
    /**
     * 验证支付密码
     */
    openInputPassword() {
      this.$prompt("请输入支付密码（暂时默认123456）", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: 'password'
      })
        .then(({ value }) => {
          if (value === "123456") {
            this.okPay();
          } else {
            this.openPrompt()
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "支付已取消"
          });
        });
    },
    /**
     * 提示密码输入错误
     */
    openPrompt() {
        this.$alert('支付密码输入错误，请重试', '提示', {
          confirmButtonText: '确定',
        });
    },
    /**
     * 确认支付
     */
    okPay() {
      this.axios
        .post(`/order/account`, {
          _id: this.$route.params.orderId
        })
        .then(result => {
          if (result.data.status === 1) {
            alert("结算成功，跳转首页");
            this.$router.push("/");
          } else {
            this.$message({
              type: "warning",
              message: result.data.data
            });
          }
        })
        .catch(err => {
          console.log(err, "++--+.++");
          this.$router.push("/*");
        });
    }
  },
  mounted() {
    const orderId = this.$route.params.orderId;
    this.initOrder(orderId);
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
.pay_order:hover .pay_order1 {
  z-index: 0;
}
</style>