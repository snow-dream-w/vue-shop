<template>
  <div class="#app">
    <div class="hover clearfix">
      <div class="content">
        <person-avatar />
        <div class="title">
          <span style="fontSize: 20px;fontWeight: bold;lineHeight: 80px;">&emsp;管理收货地址</span>
          <div style="float: right;margin:15px 10px 0 0;">
            <el-button type="primary" @click="$refs.addressEdit.isShow('add')">新增地址</el-button>
          </div>
        </div>
        <div class="address">
          <el-table v-loading="loading" :data="tableData" border>
            <el-table-column prop="name" label="收货人" width="80"></el-table-column>
            <el-table-column prop="telephone" label="联系方式" width="120"></el-table-column>
            <el-table-column prop="address.area" label="地区" width="170"></el-table-column>
            <el-table-column prop="address.details" label="详细地址" width="230"></el-table-column>
            <el-table-column prop="post" label="邮编" width="80"></el-table-column>
            <el-table-column prop="defaultAddress" label="默认地址" width="120" align="center">
              <template slot-scope="scope">
                <el-button
                  :type="scope.row.primary"
                  size="mini"
                  @click="handleDefault(scope.row._id)"
                >{{scope.row.defaultAddress}}</el-button>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="handleQuery(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleDelete(scope.row._id)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <edit-address ref="addressEdit" @initParent="init" />
  </div>
</template>

<script>
import EditAddress from "@/components/EditAddress.vue";
export default {
  data() {
    return {
      tableData: [],
      loading: true
    };
  },
  methods: {
    handleQuery(row) {
      this.$refs.addressEdit.isShow("query");
      this.$refs.addressEdit.init(row);
    },
    handleEdit(row) {
      this.$refs.addressEdit.isShow("edit");
      this.$refs.addressEdit.init(row);
    },
    handleDefault(_id) {
      this.axios
        .post("/address/default", {
          _id: _id
        })
        .then(result => {
          if (result.data.status === 1) {
            this.init();
          } else {
            this.$message.error("设置默认地址失败，请重新尝试");
          }
        })
        .catch(err => {
          this.$router.push("/*");
        });
    },
    handleDelete(_id) {
      this.$confirm("此操作将永久删除该地址, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addressDelete(_id)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除操作"
          });
        });
    },
    addressDelete(_id) {
      this.axios
        .delete("/address/delete/" + _id)
        .then(result => {
          if (result.data.status === 1) {
            this.$message({
              type: "success",
              message: "地址删除成功!"
            });
            this.init();
          } else {
            this.$message({
              type: "warning",
              message: "默认地址不可删除！"
            });
          }
        })
        .catch(err => {
          this.$router.push("/*");
        });
    },
    init() {
      this.axios
        .get("/address/get/10")
        .then(result => {
          if (result.data.status === 1) {
            result.data.data.forEach((element, index) => {
              if (element.defaultAddress === 1) {
                result.data.data[index].defaultAddress = "默认地址";
                result.data.data[index]["primary"] = "primary";
              } else {
                result.data.data[index].defaultAddress = "设为默认";
                result.data.data[index]["primary"] = "info";
              }
            });
            this.tableData = result.data.data;
            //时间逆序排序
            this.tableData.sort((a, b) => {
              return (
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
              );
            });
          } else {
            this.$message.error("数据请求失败，请刷新重新尝试");
          }
          this.loading = false
        })
        .catch(err => {
          this.$router.push("/*");
        });
    }
  },
  components: {
    EditAddress
  },
  created() {
    this.init();
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