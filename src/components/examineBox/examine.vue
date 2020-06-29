<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>打卡审核</el-breadcrumb-item>
        <el-breadcrumb-item>已审核</el-breadcrumb-item>
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
              <el-button type="danger" size="middle" @click="deleteItem(scope.row)" >删除</el-button>
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
      loop = "false"
      :visible.sync="editDialogVisible"
      width="30%"
      ref="editPic"
      :before-close="handleClose">
      <div class="block">
       <el-carousel trigger="click" height="300px">
         <el-carousel-item  class="itemWrap"v-for="(item, index) in picList" :key="item">
               <img :src="item" style="height: 260px;margin-bottom: 20px"></img>
         </el-carousel-item>
       </el-carousel>
       <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
       <div style="margin: 15px 0;"></div>
       <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
         <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
       </el-checkbox-group>
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
      picList: [],
      checkAll: false,
      checkedCities: [],
      cities: [],
      cityOptions: [],
      isIndeterminate: true
    }
  },
  methods:  {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    //根据id删除
    async deleteItem(row) {
      console.log(row)
      let id = row.id;
        const confirmResult = await this.$confirm('此操作将永久删除该审核记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).catch(err => err)
        if(confirmResult !== 'confirm') {
            return this.$message.info('已经取消删除')
        }
        let param = new URLSearchParams();
        param.append('token', this.token);
        param.append('id', id)
        axios({
            method: 'post',
            url: '/lightspace/deleteTaskExamine',
            data: param
        }).then(this.handleDeleteShoolSucc.bind(this))
        .catch(this.handleDeleteSchoolErr.bind(this))
        },
        handleDeleteShoolSucc(res) {
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
          } else if(res.data.status == 200) {
            this.$message.success('删除记录成功');
            this.getTaskExamineList();
           }
        },
        handleDeleteSchoolErr(err) {
            console.log(err)
        },
      getTaskExamineList() {
        let param = new URLSearchParams();
        param.append('token', this.token);
        param.append('type', 'examine');
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
      if(res.data.status == 200 && res.data.data !== '') {
       res ? res= res.data.data: '';
       this.content = res.content;
       this.totalElements = res.totalElements;
       this.size = res.size;
       this.number = res.number + 1;
        let cityOptions = res.content[0].path;
        cityOptions.forEach((item, index) => {
          this.cityOptions.push( '轮播图' + (index+ 1))
        })
        this.cities = this.cityOptions;
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
  .itemWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .checkBoxItem {
    width: 30px;
    height: 30px;
    border: 1px solid #1E88E5;
  }
</style>
