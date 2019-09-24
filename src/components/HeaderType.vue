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
            <li class="first first-menu-li">
              全部商品
              <i v-if="CIcon" class="el-icon-caret-right"></i>
              <i v-else class="el-icon-caret-bottom"></i>
            </li>
          </router-link>

          <li
            class="menu-list first-menu-li"
            v-for="(items,index) in menuList"
            :key="items.id"
            v-on:mouseover.capture="handleHoverOver(index)"
            v-on:mouseout="handleHoverOut(index)"
          >
            {{items.name}}
            <i class="el-icon-arrow-right"></i>
            <ul class="second">
              <router-link :to="{name: 'home'}">
                <li
                  class="second-menu"
                  v-for="item in items.type"
                  :key="item.id"
                  @click="menuStyle(index)"
                >{{item.name}}</li>
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
          id: 0,
          name: "水果",
          type: [
            {
              id: 0,
              name: "梨子"
            },
            {
              id: 1,
              name: "苹果"
            }
          ]
        },
        {
          id: 1,
          name: "蔬菜",
          type: [
            {
              id: 0,
              name: "菠菜"
            },
            {
              id: 1,
              name: "小白菜"
            }
          ]
        },
        {
          id: 2,
          name: "优质生鲜",
          type: [
            {
              id: 0,
              name: "菠菜"
            },
            {
              id: 1,
              name: "小白菜"
            }
          ]
        },
        {
          id: 3,
          name: "智商感人",
          type: [
            {
              id: 0,
              name: "菠菜"
            },
            {
              id: 1,
              name: "小白菜"
            },
            {
              id: 2,
              name: "菠菜巴拉"
            },
            {
              id: 3,
              name: "小白菜"
            }
          ]
        },
        {
          id: 4,
          name: "去你妹的",
          type: [
            {
              id: 0,
              name: "菠菜"
            },
            {
              id: 1,
              name: "小白菜"
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
    menuStyle(index) {
      let firstMenu = document.querySelectorAll(".menu-list");
      firstMenu.forEach(function(e) {
        e.classList.remove("first-menu-bg");
      });
      firstMenu[index].classList.add("first-menu-bg");

      let second = document.querySelectorAll(".second");
      second[index].style.display = "none";
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
              padding: 0 8px;
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