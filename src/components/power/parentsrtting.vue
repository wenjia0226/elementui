<template>
  <div>
    <!-- 面包屑导航区域 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>基础数据</el-breadcrumb-item>
         <el-breadcrumb-item>合作机构</el-breadcrumb-item>
     </el-breadcrumb>
     <el-card>
     <!-- 学校列表 -->
     <el-table :data="this.userList.slice((currentPage-1) * pageSize, currentPage * pageSize)" border  stripe style="width: 100%">
         <el-table-column type="index"></el-table-column>
         <el-table-column label="生成时间" prop="genTime"></el-table-column>
         <el-table-column label="电话" prop="phone"></el-table-column>
     </el-table>
     <!-- 分页功能 -->
     <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="currentPage"
         :page-sizes="[1, 2, 5, 10]"
         :page-size="pageSize"
         layout="total, sizes, prev, pager, next, jumper"
         :total="userList.length">
     </el-pagination>
     </el-card>

  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    data() {
      return {
        currentPage: 1,
        pageSize: 5,
        total: 0,
        userList: []
      }
    },
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getUserlList();
    },
    methods: {
      handleSizeChange(newSize) {
          this.pageSize = newSize
          this.getUserlList();
      },
      //监听页码值改变事件
      handleCurrentChange(val) {
         this.currentPage = val;
      },
      getUserlList() {
          let param = new FormData();
           param.append('token', this.token);
           axios({
               method: 'post',
               url: '/lightspace/parentList',
               data: param
           }).then(this.handleGetUserSucc.bind(this))
             .catch(this.handleGetUserErr.bind(this))
      },
      handleGetUserSucc(res) {
        console.log(res)
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
           } else if(res.data.status == 200) {
             this.userList = res.data.data;
          }
      },
      handleGetUserErr(error) {
         console.log(error)
      },
    }
  }
</script>

<style>
</style>
