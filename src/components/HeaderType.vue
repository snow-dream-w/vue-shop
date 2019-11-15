<template>
  <div id="type">
    <div class="menu">
      <div
        class="select clearfix"
        :style="menuHeight"
        @mouseover.capture="selectStyle"
        @mouseout="outStyle"
      >
        <ul class="first-menu">
          <router-link :to="{name: 'home'}">
            <li class="first first-menu-li" @click="resetGoodsType()">
              全部商品
              <i v-if="CIcon" class="el-icon-caret-right"></i>
              <i v-else class="el-icon-caret-bottom"></i>
            </li>
          </router-link>

          <li
            class="menu-list first-menu-li"
            v-for="(items,index) in menuList"
            :key="items.value"
            v-on:mouseover.capture="handleHoverOver(index)"
            v-on:mouseout="handleHoverOut(index)"
          >
            {{items.label}}
            <i class="el-icon-arrow-right"></i>
            <ul class="second">
              <router-link :to="{name: 'home'}">
                <li
                  class="second-menu"
                  v-for="item in items.children"
                  :key="item.value"
                  @click="menuStyle(index, item.value)"
                >{{item.label}}</li>
              </router-link>
            </ul>
          </li>
        </ul>
      </div>
      <ul class="type">
        <li
          v-for="item in typeList"
          :key="item.id"
          @click="clickMenu(item.id,item.path)"
        >{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderType",
  data() {
    return {
      CIcon: false,
      menuList: [
        {
          value: "pinzhishengxian",
          label: "品质生鲜",
          children: [
            {
              value: "shuiguo",
              label: "水果"
            },
            {
              value: "shuicai",
              label: "蔬菜"
            }
          ]
        },
        {
          value: "meizhuanghuli",
          label: "美妆护理",
          children: [
            {
              value: "caizhuangxiangshui",
              label: "彩妆香水"
            },
            {
              value: "mianmoyanghu",
              label: "面膜养护"
            },
            {
              value: "gerenqingjie",
              label: "个人清洁"
            }
          ]
        },
        {
          value: "jingzhishenghuo",
          label: "精致生活",
          children: [
            {
              value: "jiajujiadian",
              label: "家具家电"
            },
            {
              value: "yundonghuwai",
              label: "运动户外"
            },
            {
              value: "xiefuxiangbao",
              label: "鞋服箱包"
            }
          ]
        },
        {
          value: "chajiuyinliao",
          label: "茶酒饮料",
          children: [
            {
              value: "putaojiu",
              label: "葡萄酒"
            },
            {
              value: "baijiu",
              label: "白酒"
            },
            {
              value: "pijiu",
              label: "啤酒"
            },
            {
              value: "guozhiyinliao",
              label: "果汁饮料"
            }
          ]
        },
        {
          value: "nongditechan",
          label: "农地特产",
          children: [
            {
              value: "wuguzaliang",
              label: "五谷杂粮"
            },
            {
              value: "shanzhenganhuo",
              label: "山珍干货"
            },
            {
              value: "liangyoufushi",
              label: "粮油副食"
            }
          ]
        }
      ],
      typeList: [
        {
          id: 0,
          name: "首页",
          path: "/"
        },
        {
          id: 1,
          name: "热门推荐",
          path: "/about"
        },
        {
          id: 2,
          name: "限时折扣",
          path: "/1"
        },
        {
          id: 3,
          name: "猜你喜欢",
          path: "/2"
        },
        {
          id: 4,
          name: "最新产品",
          path: "/4"
        }
      ]
    };
  },
  methods: {
    controllerMenu() {
      this.CIcon = !this.CIcon;
    },
    clickMenu(index, router) {
      let typeDom = document.querySelectorAll("#type .menu .type li");
      typeDom.forEach(element => {
        element.setAttribute("class", "");
      });
      typeDom[index].setAttribute("class", "click");
      this.$router.replace(router);
    },
    selectStyle() {
      if (this.CIcon === true && this.$route.path !== "/") {
        this.CIcon = !this.CIcon;
      }
    },
    outStyle() {
      if (this.CIcon === false && this.$route.path !== "/") {
        this.CIcon = !this.CIcon;
      }
    },
    handleHoverOver(index) {
      let second = document.querySelectorAll(".second");
      second[index].style.display = "block";
      document.querySelector(".select").style.overflow = "unset";
    },
    handleHoverOut(index) {
      document.querySelector(".select").style.overflow = "hidden";
      let second = document.querySelectorAll(".second");
      second[index].style.display = "none";
    },
    menuStyle(index, type) {
      this.$store.dispatch("changeAnsyc_goods_type",type);
      let firstMenu = document.querySelectorAll(".menu-list");
      firstMenu.forEach(function(e) {
        e.classList.remove("first-menu-bg");
      });
      firstMenu[index].classList.add("first-menu-bg");

      let second = document.querySelectorAll(".second");
      second[index].style.display = "none";
    },
    resetGoodsType(){
      this.$store.dispatch("changeAnsyc_goods_type",'');
    }
  },
  computed: {
    menuHeight() {
      return "height: " + (41 + this.menuList.length * 50 * !this.CIcon) + "px";
    }
  },
  watch: {
    "$route.path"(newRoute, oldRoute) {
      if (
        newRoute !== "/" &&
        this.CIcon === false &&
        newRoute !== "/1" &&
        newRoute !== "/2" &&
        newRoute !== "/4"
      ) {
        this.CIcon = !this.CIcon;
      } else if (newRoute === "/") {
        this.CIcon = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#type {
  min-width: 1140px;
  height: 40px;
  background: rgb(10, 157, 241);
  .menu {
    position: relative;
    margin: 0 auto;
    width: 1140px;
    .select {
      overflow: hidden;
      position: absolute;
      width: 200px;
      transition: 0.2s;
      .first-menu {
        width: 100%;
        z-index: 1;
        .first-menu-li {
          width: 198px;
          height: 49px;
          text-align: center;
          line-height: 40px;
          font-size: 15px;
          color: #000;
          font-weight: 500;
          border-bottom: 1px solid #ddd;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
        .first {
          height: 41px;
          color: #fff;
        }
        .first:hover {
          cursor: pointer;
          background: #4a58ce;
        }
        .menu-list:hover {
          cursor: pointer;
          background: rgb(211, 231, 243);
        }
        .menu-list:hover,
        .select {
          overflow: unset;
        }
        .menu-list {
          position: relative;
          padding-right: 40px;
          line-height: 50px;
          background: #fff;
          font-size: 18px;
          font-weight: 500;
          box-sizing: border-box;
          i {
            position: absolute;
            right: 20px;
            top: 15px;
          }
          .second {
            display: none;
            position: absolute;
            width: 300px;
            padding: 20px 40px;
            left: 198px;
            top: 0;
            box-shadow: 2px 0 2px #d4d3d3, -2px 0 2px #d4d3d3, 0 2px 2px #d4d3d3,
              0 -2px 2px #d4d3d3;
            background: #fff;
            .second-menu {
              float: left;
              padding: 0 4px;
              line-height: 30px;
              border-left: 2px solid rgb(236, 94, 58);
              line-height: 15px;
              font-size: 15px;
              color: #000;
            }
            .second-menu:hover {
              color: orangered;
            }
          }
        }
        .first-menu-bg {
          background: rgb(131, 204, 247);
        }
      }
    }
    .type {
      position: absolute;
      left: 200px;
      width: 610px;
      height: 40px;
      align-items: center;
      justify-content: space-around;
      font-size: 15px;
      color: #fff;
      font-weight: 500;
      .click {
        background: #4a58ce;
      }
    }
    .type > li {
      float: left;
      width: 120px;
      height: 100%;
      text-align: center;
      line-height: 40px;
      border-right: 1px solid #ddd;
    }
    .type > li:hover {
      background: #4a58ce;
      cursor: pointer;
    }
  }
}
</style>