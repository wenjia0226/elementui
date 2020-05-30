<template>
  <div>
    <!-- 面包屑导航区域 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>用户管理</el-breadcrumb-item>
         <el-breadcrumb-item>小程序用户管理</el-breadcrumb-item>
     </el-breadcrumb>
     <el-card>
     <!-- 学校列表 -->
     <el-table ref="table" :data="this.userList" border  stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column  type="expand" label="查看孩子信息" width="100">
           <template slot-scope="scope" >
             <el-table :data="scope.row.student" border>
               <el-table-column label="学校" prop="schoolName"></el-table-column>
               <el-table-column label="班级" prop="classesName"></el-table-column>
               <el-table-column label="姓名" prop="name"></el-table-column>
               <el-table-column label="最近一次检测时间" prop="lastTime"></el-table-column>
             </el-table>
           </template>
        </el-table-column>
        <el-table-column label="用户标识" prop="openId"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="生成时间" prop="genTime"></el-table-column>

     </el-table>
     <!-- 表格 -->
     <!-- 分页功能 -->
     <el-pagination
       background
       :current-page="this.number"
       @current-change="handleCurrentChange"
       layout="prev, pager, next"
       :page-size ="this.size"
       :total="this.totalElements">
     </el-pagination>
     </el-card>

  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    data() {
      return {
       size: 10,
       total:0,
       page: 1,
       totalElements: 0,
       number: 1,
        currentPage: 1,
        pageSize: 5,
        total: 0,
        userList: [],
        studentInfo: []
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
      // //监听页码值改变事件
      // handleCurrentChange(val) {
      //    this.currentPage = val;
      // },
      //监听页码值改变事件
      handleCurrentChange(val) {
        this.page = val;
        this.getUserlList();
      },
      getUserlList() {
          let param = new FormData();
           param.append('token', this.token);
           param.append('page' ,this.page)
           axios({
               method: 'post',
               url: '/lightspace/parentList',
               data: param
           }).then(this.handleGetUserSucc.bind(this))
             .catch(this.handleGetUserErr.bind(this))
      },
      handleGetUserSucc(res) {
         if(res.data.status == 200) {

            res ? res= res.data.data: '';
            this.userList = res.content;
            this.totalElements = res.totalElements;
            this.size = res.size;
            this.number = res.number + 1;
          }else if(res.data.status == 10204) {
            this.$notify({
              title: '警告',
              duration: 1000,
              message: res.data.msg,
              type: 'warning'
            });
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
