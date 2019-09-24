<template>
  <div class="home clearfix">
    <ul>
      <li v-for="item in list" :key="item.id" @click="handleGoodsInfo(item.id)">
        <img :src="item.image" />
        <p>{{ item.name }}</p>
        <div class="bottom">
          <span class="money">{{ item.price | money }}</span>
          <span v-cloak class="num">{{ item.num }}人付款</span>
        </div>
      </li>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 12, 16]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="80"
        ></el-pagination>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      currentPage: 4,
      total: 0,
      limit: 8, //此条仅为限制数组
      page: 1, //当前页
      list: [
        {
          id: 1,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: parseFloat(15.01),
          sales: 5
        },
        {
          id: 2,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: parseFloat(15.01),
          sales: 5
        },
        {
          id: 3,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: parseFloat(15.01),
          sales: 5
        },
        {
          id: 4,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: parseFloat(15.01),
          sales: 5
        },
        {
          id: 5,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: parseFloat(15.01),
          sales: 5
        },
        {
          id: 6,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: parseFloat(15.01),
          sales: 5
        },
        {
          id: 7,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: parseFloat(15.01),
          sales: 5
        },
        {
          id: 8,
          image: require("@/assets/logo.png"),
          name: "Vue套餐",
          price: parseFloat(15.01),
          sales: 5
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
    },
    handleGoodsInfo(id) {
      this.$router.replace('/goods/'+id);
    }
  },
  filters: {
    money(data) {
      return "￥" + data.toFixed(2);
    }
  },
  created() {
    this.total = this.list.length;
  }
};
</script>

<style lang="scss" scoped>
.home {
  ul {
    float: right;
    width: 940px;
    li {
      float: left;
      margin: 10px 1%;
      width: 22.7%;
      height: 300px;
      border: 1px solid #ddd;
      border-radius: 3px;
      cursor: pointer;
      img {
        padding: 10px;
        width: 100%;
        background: rgb(204, 225, 233);
      }
      p {
        margin: 5px auto 5px 10px;
        line-height: 50px;
      }
      .bottom {
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        .money {
          display: block;
          float: left;
          color: red;
        }
        .num {
          display: block;
          float: right;
        }
      }
    }
    .block {
      float: right;
      margin-top: 10px;
      width: 940px;
      text-align: center;
    }
  }
}
</style>
