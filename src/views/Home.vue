<template>
  <div class="home clearfix">
    <ul>
      <li v-for="item in list" :key="item.id" @click="handleGoodsInfo(item._id)">
        <img :src="staticBaseUrl + item.images[0]" />
        <p>{{ item.name }}</p>
        <div class="bottom">
          <span class="money">{{ item.price | money }}</span>
          <span v-cloak class="num">{{ item.sales }}人付款</span>
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
          :total="total"
        ></el-pagination>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      currentPage: 0,
      total: 0,
      limit: 8, //此条仅为限制数组
      page: 1, //当前页
      list: []
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.axios
        .get("/goods/query", {
          params: {
            limit: 8,
            status: 1,
            skip: val - 1
          }
        })
        .then(result => {
          if (result.data.status === 1) {
            this.list = result.data.data;
            this.total = result.data.count;
          } else {
            alert(404);
          }
        });
    },
    handleGoodsInfo(id) {
      this.$router.replace("/goods/" + id);
    },
    init(goods_type) {
      this.axios
        .get("/goods/query", {
          params: {
            type: goods_type,
            limit: this.limit,
            status: 1
          }
        })
        .then(result => {
          if (result.data.status === 1) {
            this.list = result.data.data;
            this.total = result.data.count;
          } else {
            alert(404);
          }
        });
    }
  },
  watch: {
    goods_type: function(newVal, oldVal) {
      this.init(newVal)
    }
  },
  filters: {
    money(data) {
      return "￥" + data.toFixed(2);
    }
  },
  computed: {
    ...mapGetters({
      goods_type: "goods_type"
    })
  },
  created() {
    this.init(this.goods_type);
  }
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 400px;
  ul {
    float: right;
    width: 940px;
    li {
      float: left;
      margin: 10px 1%;
      width: 23%;
      height: 300px;
      border: 1px solid #ddd;
      border-radius: 3px;
      cursor: pointer;
      img {
        padding: 1px;
        width: 100%;
        height: 72%;
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
