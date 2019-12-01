<template>
  <div class="home clearfix">
    <ul>
      <!-- <li v-for="item in list" :key="item.id" @click="handleGoodsInfo(item._id)">
        <img :src="axios.defaults.baseURL + item.images[0]" />
        <p>{{ item.name }}</p>
        <div class="bottom">
          <span class="money">{{ item.price | money }}</span>
          <span v-cloak class="num">{{ item.sales }}人付款</span>
        </div>
      </li>-->
      <GoodsCard v-for="item in list" :key="item.id" :item="item" />
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
import GoodsCard from "@/components/GoodsCard";
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
    // handleGoodsInfo(id) {
    //   this.$router.replace("/goods/" + id);
    // },
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
    },
    getRecommend() {
      this.axios.get("/goods/recommend/user").then(result => {
        if (result.data.status === 1) {
          this.list = result.data.data;
          this.total = result.data.count;
        } else {
          this.$message.error("暂无推荐商品");
        }
      });
    },
    referGoods(menu) {
      switch (menu) {
        case "home":
          this.init();
          break;
        case "recommend":
          this.getRecommend();
          break;
        case "new":
          this.$message({
            type: "warning",
            message: "此功能暂不可用"
          });
          break;
        case "hot":
          this.$message({
            type: "warning",
            message: "此功能暂不可用"
          });
          break;
        case "precent":
          this.$message({
            type: "warning",
            message: "此功能暂不可用"
          });
          break;
      }
    }
  },
  watch: {
    goods_type: function(newVal, oldVal) {
      if(newVal){
        this.init(newVal);
      }
    },
    "$route.query.menu"(newVal, oldVal) {
      this.$store.dispatch("changeAnsyc_goods_type", "");
      this.referGoods(newVal)
    }
  },
  computed: {
    ...mapGetters({
      goods_type: "goods_type"
    })
  },
  components: {
    GoodsCard
  },
  created() {
    if(this.$route.query.menu){
      this.referGoods(this.$route.query.menu)
    } else {
      this.init(this.goods_type);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 400px;
  ul {
    float: right;
    width: 940px;
    .block {
      float: right;
      margin-top: 10px;
      width: 940px;
      text-align: center;
    }
  }
}
</style>
