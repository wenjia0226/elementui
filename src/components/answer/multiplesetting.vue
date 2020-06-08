<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>题库管理</el-breadcrumb-item>
        <el-breadcrumb-item>单选题</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="3" >
            <el-button type="primary" @click="handdlePi" >批量导入</el-button>
      </el-col>
    </el-row>
    <el-table :data="this.content" border stripe style="width: 100%" >
     <el-table-column type="index"></el-table-column>
     <el-table-column label="题目" prop="title"></el-table-column>
     <el-table-column label="选项一" prop="optionOne"></el-table-column>
     <el-table-column label="选项二" prop="optionTwo"></el-table-column>
     <el-table-column label="选项三" prop="optionThree"></el-table-column>
     <el-table-column label="选项四" prop="optionFour"></el-table-column>
     <el-table-column label="答案" prop="keyStr"></el-table-column>
     <el-table-column label="类型" prop="freight"></el-table-column>
     <el-table-column label="操作">
         <template slot-scope="scope">
             <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeSpecById(scope.row.id)"></el-button>
         </template>
     </el-table-column>
     </el-table>
    <el-pagination
      background
      clearable
      :current-page="this.number"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :page-size ="this.size"
      :total="this.totalElements">
    </el-pagination>
    <el-dialog :visible.sync="showDialog"  width="30%" center :before-close="handleFileClose">
      <el-row>
        <el-col :span="12">
          <a class="download" href="https://www.guangliangkongjian.com/download/题库导入模板.xlsx">下载模板</a>
        </el-col>
        <el-col :span="12">
          <el-upload
            :data="pdfData"
            class="upload-demo"
            ref="upload"
            action="/lightspace/answerExcel"
            :before-upload="beforeUpload"
            accept=".xlsx"
            show-file-list
            :on-change="changeUpload"
            :on-success="handleSuccess"
            :file-list="fileList"
            multiple
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.xlsx文件，且不超过500kb</div>
          </el-upload>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    created() {
       this.token = window.sessionStorage.getItem('token');
       let user = window.sessionStorage.getItem('token');
       this.identity = user.split('-') [1];
       this.fondId = user.split('-')[2];
        if(this.identity == 1) {  // admin
          this.getSpecList(1);
       }
    },
    data() {
      return {
        content: [],
        totalElements: 0,
        number:1,
        size: 10,
        page: 1,
        showDialog: false,
        fileList: [],
        pdfData: {
            file: '',
            token: ''
        },
      }
    },
    methods: {
      handdlePi() {
        this.showDialog = true;
      },
      changeUpload(file, fileList) {
       if(fileList.length == 2)  {
         this.fileList = fileList.slice(1,2);
       }
      },
      //请求参数传递
      beforeUpload(file) {
        this.pdfData.file = file;
        this.pdfData.token = this.token;
       },
       submitUpload() {
         this.$refs.upload.submit();
         this.showDialog = false;
         this.loading = true;
         this.getSpecList()

       },
       handleSuccess(res, file, fileList) {
          this.loading = false;
        if(res.status == 10215) {
          this.$message.error(res.msg);
          this.fileList = [];
          return;
        }else if(res.status == 200) {
          this.$message.success(res.msg);
          this.fileList = [];
        }
       },
      // 列表页修改
       handleCurrentChange(val) {
          this.page = val;
          this.getSpecList()
       },
       handleFileClose() {
         this.showDialog = false;
          this.$refs.upload.clearFiles();
       },
       // 获取规格列表
       getSpecList() {
         let param = new FormData();
         param.append('token', this.token);
         param.append('page', this.page);
         param.append('type', 2)
         axios({
           method: 'post',
           data: param,
           url: '/lightspace/answerList'
         }).then((res) => {
             console.log(res)
           res? res = res.data.data: '';
           this.content = res.content;
           this.totalElements = res.totalElements;
           this.size = res.size;
           this.number = res.number + 1;
         }).catch((err) => {
           console.log(err)
         })
       },
       //删除规格
       async removeSpecById(id) {
         console.log(id)
         const confirmResult = await this.$confirm('此操作将永久删除该题, 是否继续?', '提示', {
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
             url: '/lightspace/deleteAnswer',
             data: param
         }).then((res) => {
           if(res.data.status == 200) {
              this.$message({
               message: res.data.msg,
               type: 'success'
             });
             this.getSpecList()
           }
         }).catch((err) => {
           console.log(err)
         })
       },
    }
  }
</script>

<style>
  .download {
    display: block;
    width: 50%;
    height: 30px;
    background: red;
    text-decoration: none;
    line-height: 30px;
    text-align: center;
    background: #66b1ff;
    color: #fff;
    border-radius: 10px;
  }
</style>
