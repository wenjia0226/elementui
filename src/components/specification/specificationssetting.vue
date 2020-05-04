<template>
  <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>兑换商城</el-breadcrumb-item>
          <el-breadcrumb-item>规格管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
       <!-- <el-table :data="shopList" border stripe style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="商品名称" prop="schoolName"></el-table-column>
            <el-table-column label="所属班级" prop="classesName"></el-table-column>
        </el-table> -->
      </el-card>
  </div>
</template>

<script>
 import axios from 'axios'
 export default {
    created() {
       this.token = window.sessionStorage.getItem('token');
       
    },
    data() {
      return {
        shopList: []
      }
    }
  }
</script>

<style>
</style>
