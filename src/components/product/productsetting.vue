<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>兑换商城</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
       <el-col :span="6">
        <!--  <el-input placeholder="输入学校名称" v-model="query" clearable @clear="querySchool">
              <el-button slot="append" icon="el-icon-search" @click="querySchool"></el-button>
           </el-input> -->
          <!-- <el-autocomplete
             class="inline-input"
             v-model="state1"
             :fetch-suggestions="querySearch"
             placeholder="请输入学生姓名"
             clearable
             @select="handleSelect">

             </el-autocomplete> -->

       </el-col>
       <el-col :span="6">
              <el-button type="primary" @click="addDialogVisible = true">添加学校</el-button>
       </el-col>
      </el-row>
    </el-card>
    <!-- 添加学校对话框 -->
    <el-dialog title="添加商品" :visible.sync="addDialogVisible" width="50%" :before-close="handleClose">
       <!-- 添加学校 -->
     <el-form :model="addShopForm" :rules="addShopRules" ref="shopFormRef" label-width="100px">
          <el-form-item label="商品名称" prop="name">
              <el-input v-model="addShopForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="轮播图" prop="picture">
              <!-- <el-input v-model="addSchoolForm.address" clearable></el-input> -->
          </el-form-item>
           <el-form-item label="详情图" prop="details">
           </el-form-item>
     </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitShop" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
         token: '',
         addDialogVisible: false, //控制对话框的显示隐藏
         addDialogVisible: false, //控制对话框的显示隐藏
         addShopForm: {
             name: '',
             picture: ''
         },
         addShopRules: {
             name: [{required: true, message: '请输入学校名称', trigger: 'blur' }],

         },
      }
    },
    methods: {
      //关闭按钮
      handleClose() {
       this.addDialogVisible = false;
      },
      submitShop() {
      }
    }
  }
</script>

<style>
</style>
