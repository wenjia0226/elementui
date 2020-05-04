<template>
  <div>
    <!-- 面包屑导航区域 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>基础数据</el-breadcrumb-item>
         <el-breadcrumb-item>合作机构</el-breadcrumb-item>
     </el-breadcrumb>
     <el-card>
      <el-row :gutter="20">
       <el-col :span="6">
       </el-col>
       <el-col :span="6">
          <el-button type="primary" @click="addCooparataion">添加机构</el-button>
       </el-col>
      </el-row>
      <el-table :data="this.cooparationList" border  stripe style="width: 100%">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="图片"  prop="imgurl" min-width="20%" >
         <!-- 图片的显示 -->
         <template   slot-scope="scope">
          <el-image style="min-height: 70;height: 70" :src="scope.row.imgurl" fit="contain"></el-image>
         </template>
      </el-table-column>
      <el-table-column label="备注" prop="details"></el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
             <el-button type="danger"  size="middle" icon="el-icon-delete" @click ="removeById(scope.row.id)" ></el-button>
          </template>
      </el-table-column>
      </el-table>
      <!-- 添加对话框 -->
      <el-dialog title="添加机构" :visible.sync="addDialogVisible" width="50%" :before-close="handleClose">
          <el-form :model="addForm" :rules="addRules" ref="addFormRef" label-width="120px">
              <el-form-item label="姓名" prop="name" >
                  <el-input v-model="addForm.name"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                  <el-input v-model="addForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                  <el-input v-model="addForm.address"></el-input>
              </el-form-item>
               <el-form-item label="图片">
              <el-upload
                action="#"
                list-type="picture-card"
                :before-upload="handlePreve"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              </el-form-item>
              <el-form-item label="备注" prop="details">
                  <el-input v-model="addForm.details"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitCoparation">确 定</el-button>
          </span>
      </el-dialog>
     </el-card>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    created() {
      this.token = window.sessionStorage.getItem('token');
      this.addForm.token = window.sessionStorage.getItem('token');
      this.getCooparationList();
    },
    data() {
      return {
        token: '',
        cooparationList: [],
         fileList: [],
        addDialogVisible: false, //控制对话框的显示隐藏
        file: '',
        addForm: {
            phone: '',
            name: '',
            address: '',
            details: '',
            file: '',
            token: ''
        },
        addRules: {
            address: [{required: true, message: '请输入学校名称', trigger: 'blur' }],
            details: [{required: false, message: '请输入班级名称', trigger: 'blur' }],
            phone: [{required: true, message: '请输入手机号', trigger: 'blur' }],
            name: [{required: true, message: '请输入姓名', trigger: 'blur' }],
            file: {required: false, message: '请选择学校班级', trigger: 'blur'}
        },
        }
      },
      methods: {
         handlePreve(file) {
           console.log(file)
          this.addForm.file = file
          },

        //添加公司
        submitCoparation() {
          // this.$refs.addFormRef.submit();
         this.$refs.addFormRef.validate((valid) => {
             if(!valid) return;
             let param = new FormData();
             param.append('token', this.token);
             param.append('details', this.addForm.details);
             param.append('phone', this.addForm.phone);
             param.append('address', this.addForm.address);
             param.append('name', this.addForm.name);
             param.append('file', this.addForm.file);
             axios({
                 method: 'post',
                 url: '/lightspace/addPartnership',
                 data: param,
                 headers: {
                   'Content-Type': 'multipart/form-data'
                 }
             }).then(this.handleAddSucc.bind(this))
             .catch(this.handleAddErr.bind(this))
           })
        },
        handleAddSucc(res) {
           console.log(res);
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
             } else if(res.data.status == 10206) {
               this.$message.error(res.data.msg);
              this.addTeacherForm.schoolName = '';
            }else if(res.status == 200){
              this.addDialogVisible = false;
              this.$message.success('添加成功');
              this.$refs.addFormRef.resetFields();
              this.getCooparationList();
            }
        },
        handleAddErr(err) {
            console.log(err)
        },
        addCooparataion() {
          this.addDialogVisible = true;
        },
        //关闭按钮
        handleClose() {
         this.addDialogVisible = false;
         this.$refs.FormRef.resetFields();
        },
        getCooparationList() {
          let param = new URLSearchParams();
          param.append('token', this.token);
          axios({
            method: 'post',
            data: param,
             url: '/lightspace/partnershipList'
          }).then(this.handleCoListSucc.bind(this)).catch(this.handleCoListErr.bind(this))
        },
        handleCoListSucc(res) {
          if(res.data.status == 200) {
            this.cooparationList = res.data.data
          }

        },
        handleCoListErr(err) {
          console.log(err)
        },
        addTeacher() {

        },
        //根据id删除学校
       async removeById(id) {
          const confirmResult = await this.$confirm('此操作将永久删除该机构, 是否继续?', '提示', {
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
              url: '/lightspace/deletePartnership',
              data: param
          }).then(this.handleDeleteSucc.bind(this))
          .catch(this.handleDeleteErr.bind(this))
        },
        handleDeleteSucc(res) {
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
              this.$message.success('删除老师成功');
              this.cooparationList = res.data.data;
              // const totalPage = Math.ceil(this.teacherList.length / this.pageSize) // 总页数
              // this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
              // this.currentPage = this.currentPage < 1 ? 1 : this.currentPage;
            }
        },
        handleDeleteErr(err) {
            console.log(err)
        },
    }
  }
</script>

<style>
</style>
