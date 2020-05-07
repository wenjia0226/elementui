<template>
    <div>
          <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限分配</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <!-- 权限列表 -->
            <el-table :data="this.rgihtList.slice((currentPage-1) * pageSize, currentPage * pageSize)" border  stripe style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
               
            </el-table>
            <!-- 分页功能 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="rgihtList.length">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getrightList();       
    },
   data() {
       return {
         addRoleDialogVisible: false,
         rgihtList: [],
         currentPage: 1,
         pageSize: 5,
         total: 0
       }
   },
   methods: {
    getrightList() {
      let param = new URLSearchParams();
     param.append('token', this.token);
     axios({
         method: 'post',
         url: '/lightspace/rightList',
         data: param
     }).then(this.handleGetRightSucc.bind(this))
       .catch(this.handleGetRightErr.bind(this))
    },
    handleGetRightSucc(res) {
      if(res.data.status === 10204) {
          this.$message.error(res.data.msg);
          this.$router.push('/lightspace/login');
      } else if(res.data.status == 200) {
          this.rgihtList = res.data.data;
      }
    },
    handleGetRightErr(error) {
        console.log(error)
    },
    handleSizeChange(newSize) {
        this.pageSize = newSize
        this.getrightList();
    },
    //监听页码值改变事件
    handleCurrentChange(val) {
       this.currentPage = val;
    },
   }
  
}
</script>
<style lang="less" scoped>

</style>