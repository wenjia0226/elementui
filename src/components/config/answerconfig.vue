<template>
  <div>
    <!-- 面包屑导航区域 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>配置管理</el-breadcrumb-item>
         <el-breadcrumb-item>爱眼答题配置</el-breadcrumb-item>
     </el-breadcrumb>
     <el-card>
       <el-col :span="6" style="margin-bottom: 20px">
              <el-button type="primary" @click="editDati">修改答题</el-button>
       </el-col>

     <!-- 修改用户对话框 -->
      <el-dialog title="修改答题信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
         <el-form :model="editForm" ref="editRef"label-width="100px">
             <el-form-item label="一级标题" >
                <el-input v-model="editForm.title"></el-input>
             </el-form-item>
            <el-form-item label="二级标题">
              <el-input v-model="editForm.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
              <el-input  type="textarea"v-model="editForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="详情介绍">
              <el-input  type="textarea" v-model="editForm.details"></el-input>
            </el-form-item>
            <el-form-item label-width="120px" label="上传详情图">
             <!-- 详情图 -->
             <el-upload
               ref="editUpload"
               action="/as"
               :limit = '1'
               :auto-upload = "true"
               :http-request="reupload"
               list-type="picture-card"
               :file-list = "detailFile"
               :on-remove="handleRemoveDetail"
               　>
               <i class="el-icon-plus"></i>
            </el-upload>
         </el-form-item>
         </el-form>
         <span slot="footer" class="dialog-footer">
             <el-button @click="editDialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="editInfo">确 定</el-button>
         </span>
     </el-dialog>
      </el-card>
 </div>
</template>

<script>
  import axios from 'axios'
  export default{
    created() {
        this.token = window.sessionStorage.getItem('token');
        },
    data() {
      return {
        token: '',
        editDialogVisible: false,
        editForm: {

        },
         detailFile: [],
         reuploadDetail: []
      }
    },
    methods: {
      // 重新上传详情图
      reupload(raw) {
        this.reuploadDetail = raw.file;
      },
      handleRemoveDetail(file, fileList) {
        if(this.reuploadDetail.length == 0) {
          this.$message({
          message: '详情图不能为空',
          type: 'warning'
        });
        return;
        }
      },
      editDati() {
        this.editDialogVisible = true;
        let param = new URLSearchParams();
        param.append('token', this.token);
        axios({
            method: 'post',
            url: '/lightspace/editAnswerConfig',
            data: param
        }).then((res) => {
          // console.log(res)
          if(res.data.status == 200) {
            this.editForm = res.data.data;
            let  detailFile = res.data.data.pic
            this.detailFile.push({
              url: detailFile
            });
			// console.log(this.detailFile)
          }else if(res.data.status == 10204) {
            this.$notify({
              title: '警告',
              duration: 1000,
              message: res.data.msg,
              type: 'warning'
            });
             this.$router.push('/login');

          }
        }).catch((err) => {
          console.log(err)
        })
      },
      editInfo() {
        let param = new FormData();
        param.append('token', this.token);
        param.append('title', this.editForm.title);
        param.append('subtitle', this.editForm.subtitle);
        param.append('introduction', this.editForm.introduction);
        param.append('details', this.editForm.details);
        param.append('file', this.reuploadDetail)
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/saveAnswerConfig'
        }).then((res) => {
          // console.log(res)
          if(res.data.status == 200) {
            this.editDialogVisible = false;
            this.$refs.editRef.resetFields();
            this.$refs.editUpload.clearFiles();
            this.detailFile = [];  //清空回显
            this.reuploadDetail = [];

          }
        }).catch((err) => {
          console.log(err)
        })
      },
      editDialogClosed() {
         this.$refs.editUpload.clearFiles();
         this.$refs.editRef.resetFields();

      },
    }
  }
</script>

<style>
</style>
