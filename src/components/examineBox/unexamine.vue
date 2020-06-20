<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>打卡审核</el-breadcrumb-item>
        <el-breadcrumb-item>未审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table  :data="content" border  stripe style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="学校名称" prop="schoolName"></el-table-column>
          <el-table-column label="班级名称" prop="className"></el-table-column>
          <el-table-column label="学生名称" prop="studentName"></el-table-column>
          <el-table-column label="审核时间" prop="date"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="middle" @click="showEditDialog(scope.row)" >审批</el-button>
            </template>
          </el-table-column>
      </el-table>
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
   <!-- 修改用户对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="editDialogVisible"
      width="30%"
      ref="editPic"
      :before-close="handleClose">
      <div class="block">
       <el-carousel trigger="click" height="150px">
         <el-carousel-item v-for="item in picList" :key="item">
            <el-image :src="item" fit="fit"></el-image>
          
         </el-carousel-item>
       </el-carousel>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
   </div>
</template>
<script>
  import axios from 'axios'
  export default{
  created() {
    this.token = window.sessionStorage.getItem('token');
    this.getTaskExamineList();
  },
  data() {
    return {
      page: 1,
      size: 5,
      total:0,
      totalElements: 0,
      number: 1,
      content: [],
      editDialogVisible: false,
      picList: []
    }
  },
  methods:  {
    getTaskExamineList() {
        let param = new URLSearchParams();
        param.append('token', this.token);
        param.append('type', 'unexamine');
        param.append('page', this.page);
        axios({
            method: 'post',
            url: '/lightspace/taskExamineList',
            data: param
        }).then(this.handleGetTaskListSucc.bind(this)).catch((err) => {
          console.log(err)
        })
    },
    handleGetTaskListSucc(res) {
        console.log(res)
      if(res.data.status == 200 && res.data.data !== '') {
       res ? res= res.data.data: '';
       this.content = res.content;
       this.totalElements = res.totalElements;
       this.size = res.size;
       this.number = res.number + 1;
      }
    },
    //监听页码值改变事件
    handleCurrentChange(val) {
      this.page = val;
      this.getTaskExamineList()
    },
    showEditDialog (row) {
      let picList = row.path;
      this.picList = row.path;
      this.editDialogVisible = true;
    },
    //关闭按钮
    handleClose() {
     this.editDialogVisible = false;
     // this.$refs.editPic.resetFields();
    },
  }
  }
</script>

<style>
  .el-dialog{
      position: relative;
      margin: 0 auto 50px;
      border-radius: 2px;
      -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 50%;
      }
</style>
