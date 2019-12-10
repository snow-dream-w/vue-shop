<template>
  <div id="app">
    <div class="index">
      <div class="index2">
        <div class="decoration">
          <div class="content">
            <div class="block">
              <el-carousel trigger="click" direction="vertical" height="450px">
                <el-carousel-item v-for="item in goodsInfo.images" :key="item._id">
                  <img :src="item.src" />
                </el-carousel-item>
              </el-carousel>
              <vue-preview
                :list="list"
                :thumbImageStyle="{width: '180px', height: '100px', margin: '4px', zIndex: 10}"
                :previewBoxStyle="{border: '1px solid #eee'}"
                :tapToClose="true"
                @close="closeHandler"
                @destroy="destroyHandler"
              />
            </div>
            <div class="detail">
              <el-tabs type="border-card">
                <el-tab-pane label="商品描述">这是商品描述</el-tab-pane>
                <el-tab-pane :label="'评论数量'+goodsInfo.commentNum">
                  <ul>
                    <li v-for="item in comments" :key="item.id">
                      <img :src="axios.defaults.baseURL + item.image" width="30" />
                      <span>{{ item.name }}</span>
                      <span class="date">2018-08-01</span>
                      <span class="delBtn">删除</span>
                      <p>{{ item.content }}</p>
                      <div class="nice">
                        <i class="el-icon-chat-dot-square"></i>
                        <span>{{ item.num1 }}</span>
                        &emsp;
                        <i class="el-icon-magic-stick"></i>
                        <span>{{ item.num2 }}</span>
                      </div>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
        <div class="info">
          <span>{{ goodsInfo.name }}</span>
          <el-divider></el-divider>
          <div class="first">
            价格
            <span class="price" v-cloak>￥{{goodsInfo.price}}</span>
            销量
            <span>{{goodsInfo.sales}}</span>
            <el-divider></el-divider>数量
            <el-input-number
              v-model="buyNum"
              @change="handleChange"
              :min="1"
              :max="goodsInfo.inventoryNum"
              label="描述文字"
            ></el-input-number>&emsp;库存：
            <span class="num">{{ goodsInfo.inventoryNum }}</span>件
          </div>
          <el-divider></el-divider>&emsp;
          <el-button type="primary" @click="addCar">
            <i class="el-icon-shopping-cart-2"></i>加入购物车
          </el-button>&emsp;
          <el-button type="danger" @click="buyGoods">
            <i class="el-icon-trophy"></i>立即购买
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsInfo: {
        images: [
          {
            id: 1,
            src: null
          }
        ],
        name: "Vue套餐",
        price: parseFloat(15.01),
        unit: "件",
        sales: 5,
        inventoryNum: 10,
        commentNum: 15
      },
      buyNum: 1,
      list: [
        {
          src: require("@/assets/logo.png"),
          w: 720,
          h: 400
        }
      ],
      comments: [
        {
          id: 1,
          image: require("@/assets/logo.png"),
          name: "吾忆那年秋",
          content: "这是一段评论内容",
          num1: 10,
          num2: 1000
        },
        {
          id: 2,
          image: require("@/assets/logo.png"),
          name: "吾忆那年秋",
          content:
            "这是一段评论内这是一段评论内容这是一段评论内容这是一段评论内容这是一段评论内容这是一段评论内容这是一段评论内容这是一段评论内容这是一段评论内容容",
          num1: 10,
          num2: 1000
        },
        {
          id: 3,
          image: require("@/assets/logo.png"),
          name: "吾忆那年秋",
          content: "这是一段评论内容",
          num1: 10,
          num2: 1000
        }
      ]
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    /**
     * 即将关闭的时候，调用这个处理函数
     */
    closeHandler() {
      console.log("closeHandler");
    },
    /**
     * 完全关闭之后，调用这个函数清理资源
     */
    destroyHandler() {
      console.log("destroyHandler");
    },
    /**
     * 将商品添加至购物车
     */
    addCar() {
      this.axios
        .post("/car/add", {
          goodsId: this.goodsInfo._id,
          num: this.buyNum
        })
        .then(result => {
          if (result.data.status === 1) {
            this.$notify({
              title: "成功",
              message: "成功加入购物车",
              type: "success"
            });
            this.$store.dispatch('changeAnsyc_car_num', 1)
          } else if (result.data.data == "未登录") {
            this.$router.push("/login_register/login");
          } else {
            this.$router.push("*");
          }
        });
    },
    /**
     * 购买商品
     */
    buyGoods() {
      this.axios
        .post("/car/add", {
          goodsId: this.goodsInfo._id,
          num: this.buyNum
        })
        .then(result => {
          if (result.data.status === 1) {
            this.$router.push("/cart");
          } else if (result.data.data == "未登录") {
            this.$router.push("/login_register/login");
          } else {
            this.$router.push("*");
          }
        });
    }
  },
  created() {
    // 初始化商品详情数据
    this.axios
      .get("/goods/goodsDetail/" + this.$route.params.id)
      .then(result => {
        if (result.data.status === 1) {
          this.goodsInfo = result.data.data;
          for (let index = 0; index < result.data.data.images.length; index++) {
            let obj = {
              id: index,
              w: 720,
              h: 400,
              src: this.axios.defaults.baseURL + result.data.data.images[index]
            };
            result.data.data.images[index] = obj;
            this.list[index] = obj;
          }
        } else {
          alert(404);
        }
      });
  }
};
</script>

<style lang="scss" scoped>
#app {
  .index:hover .index2 {
    z-index: 0;
  }
  .index2 {
    position: relative;
    z-index: -1;
  }
  .decoration {
    position: relative;
    overflow-y: scroll;
    top: 10px;
    width: 68%;
    height: calc(100vh - 65px);
    .content {
      .block {
        img {
          width: 100%;
          height: 100%;
        }
        .el-carousel__item h3 {
          color: #475669;
          font-size: 14px;
          opacity: 0.75;
          line-height: 200px;
          margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
        }
      }
      .detail {
        margin-top: 10px;
        width: 100%;
        .nice {
          width: 100%;
          text-align: right;
        }
        li {
          padding: 5px 0;
          border-bottom: 0.5px solid #e9e9e9;
          .date {
            font-size: 10px;
            color: #2e2d2d;
            padding-left: 10px;
          }
          .delBtn {
            float: right;
            color: red;
          }
        }
        p {
          padding: 0 1em;
          text-indent: 2em;
        }
      }
    }
  }
  .info {
    position: absolute;
    padding: 15px;
    right: 2px;
    top: 30px;
    width: 345px;
    height: 440px;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    box-shadow: 0 0 4px #ddd;
    .first {
      .price {
        margin-right: 150px;
        color: red;
      }
      .num {
        font-weight: bold;
      }
    }
  }
}
</style>