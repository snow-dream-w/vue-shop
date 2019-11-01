<template>
  <div class="#app">
    <div class="hover clearfix">
      <div class="content">
        <person-avatar />
        <div class="title">
          <span style="fontSize: 20px;fontWeight: bold;lineHeight: 80px;">&emsp;管理收货地址</span>
          <div style="float: right;margin:15px 10px 0 0;">
            <el-button type="primary">新增地址</el-button>
          </div>
        </div>
        <div class="address">
          <el-table :data="tableData" border>
            <el-table-column prop="name" label="收货人" width="80"></el-table-column>
            <el-table-column prop="telephone" label="联系方式" width="120"></el-table-column>
            <el-table-column prop="city" label="地区" width="160"></el-table-column>
            <el-table-column prop="address" label="详细地址" width="240"></el-table-column>
            <el-table-column prop="post" label="邮编" width="80"></el-table-column>
            <el-table-column prop="default" label="默认地址" width="120" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini">{{scope.row.default}}</el-button>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "王小虎",
          telephone: "17865579761",
          city: "山东省烟台市莱山区",
          address: "上海市普陀区金沙江路 1518 弄",
          post: "200333",
          default: "默认地址"
        },
        {
          id: 2,
          name: "王小虎",
          telephone: "17865579761",
          city: "山东省烟台市莱山区",
          address: "上海市普陀区金沙江路 1518 弄",
          post: "200333",
          default: "设为默认"
        },
        {
          id: 3,
          name: "王小虎",
          telephone: "17865579761",
          city: "山东省烟台市莱山区",
          address: "上海市普陀区金沙江路 1518 弄",
          post: "200333",
          default: "设为默认"
        },
        {
          id: 4,
          name: "王小虎",
          telephone: "17865579761",
          city: "山东省烟台市莱山区",
          address: "上海市普陀区金沙江路 1518 弄",
          post: "200333",
          default: "设为默认"
        },
        {
          id: 5,
          name: "王小虎",
          telephone: "17865579761",
          city: "山东省烟台市莱山区",
          address: "上海市普陀区金沙江路 1518 弄",
          post: "200333",
          default: "设为默认"
        }
      ]
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style scoped lang="scss">
.hover:hover .content {
  z-index: 0;
}
.content {
  position: relative;
  margin: 10px 0 0 15px;
  width: 925px;
  z-index: -1;
}
</style>