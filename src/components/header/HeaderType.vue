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
import options from '@/assets/menu'
export default {
  name: "HeaderType",
  data() {
    return {
      CIcon: false,
      menuList: options,
      typeList: [
        {
          id: 0,
          name: "首页",
          path: "/?menu=home"
        },
        {
          id: 1,
          name: "热门推荐",
          path: "/?menu=hot"
        },
        {
          id: 2,
          name: "限时折扣",
          path: "/?menu=precent"
        },
        {
          id: 3,
          name: "猜你喜欢",
          path: "/?menu=recommend"
        },
        {
          id: 4,
          name: "最新产品",
          path: "/?menu=new"
        }
      ]
    };
  },
  methods: {
    /**
     * 控制菜单的打开和关闭
     */
    controllerMenu() {
      this.CIcon = !this.CIcon;
    },
    /**
     * 响应点击菜单
     */
    clickMenu(index, router) {
      let typeDom = document.querySelectorAll("#type .menu .type li");
      typeDom.forEach(element => {
        element.setAttribute("class", "");
      });
      typeDom[index].setAttribute("class", "click");
      this.$router.replace(router);
    },
    /**
     * 打开拉菜单
     */
    selectStyle() {
      if (this.CIcon === true && this.$route.path !== "/") {
        this.CIcon = !this.CIcon;
      }
    },
    /**
     * 收起菜单
     */
    outStyle() {
      if (
        this.CIcon === false &&
        this.$route.path !== "/" &&
        this.$route.path !== "/recommend" &&
        this.$route.path !== "/hot" &&
        this.$route.path !== "/new" &&
        this.$route.path !== "/precent"
      ) {
        this.CIcon = !this.CIcon;
      }
    },
    /**
     * 响应鼠标悬停事件
     */
    handleHoverOver(index) {
      let second = document.querySelectorAll(".second");
      second[index].style.display = "block";
      document.querySelector(".select").style.overflow = "unset";
    },
    /**
     * 响应鼠标离开事件
     */
    handleHoverOut(index) {
      document.querySelector(".select").style.overflow = "hidden";
      let second = document.querySelectorAll(".second");
      second[index].style.display = "none";
    },
    /**
     * 改变菜单样式
     */
    menuStyle(index, type) {
      this.$store.dispatch("changeAnsyc_goods_type", type);
      let firstMenu = document.querySelectorAll(".menu-list");
      firstMenu.forEach(function(e) {
        e.classList.remove("first-menu-bg");
      });
      firstMenu[index].classList.add("first-menu-bg");

      let second = document.querySelectorAll(".second");
      second[index].style.display = "none";
    },
    /**
     * 重置商品类型状态
     */
    resetGoodsType() {
      this.$store.dispatch("changeAnsyc_goods_type", "");
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
        newRoute !== "/recommend" &&
        newRoute !== "/hot" &&
        newRoute !== "/new" &&
        newRoute !== "/precent"
      ) {
        this.CIcon = !this.CIcon;
      } else if (
        newRoute === "/" ||
        newRoute === "/recommend" ||
        newRoute === "/hot" ||
        newRoute === "/new" ||
        newRoute === "/precent"
      ) {
        this.CIcon = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#type {
  font-family: "PingFang SC";
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
          font-weight: 600;
          border-bottom: 1px solid #e2e2e2;
          border-left: 1px solid #e2e2e2;
          border-right: 1px solid #e2e2e2;
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
          font-size: 16px;
          font-weight: 500;
          font-family: "微软雅黑";
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
            padding: 14px 40px;
            left: 198px;
            top: 0;
            // box-shadow: 2px 0 2px #d4d3d3, -2px 0 2px #d4d3d3, 0 2px 2px #d4d3d3,
            //   0 -2px 2px #d4d3d3;
            border: 3px solid #19a6f1;
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
          background: #19a6f1;
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