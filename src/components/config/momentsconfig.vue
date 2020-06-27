<template>
  <div>
    <!-- 面包屑导航区域 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>配置管理</el-breadcrumb-item>
         <el-breadcrumb-item>爱眼秀配置</el-breadcrumb-item>
     </el-breadcrumb>
     <el-card>
      <el-row :gutter="20">
         <el-col :span="6">
         </el-col>
         <el-col :span="6">
            <el-button type="primary" @click="addTupian">添加爱眼秀图片</el-button>
         </el-col>
      </el-row>
       <el-table :data="this.content" border  stripe style="width: 100%" >
          <el-table-column label="图片" min-width="50%"  prop="path"  >
           <!-- 图片的显示 -->
           <template  slot-scope="scope">
            <el-image :src="scope.row.path" fit="contain"></el-image>
           </template>
        </el-table-column>
        <el-table-column label="描述"prop="details"></el-table-column>
        <el-table-column  align="center"  label="是否使用">
         <template slot-scope="scope">
            <el-button type="primary" size="middle"  v-if="scope.row.statusStr =='使用中'">使用中</el-button>
            <el-button type="info" size="middle"  v-if="scope.row.statusStr == '未使用'" @click="showEditDialog(scope.row.id)">未使用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
               <el-button type="danger"  size="middle" icon="el-icon-delete" @click ="removeById(scope.row.id)" ></el-button>
            </template>
        </el-table-column>
       </el-table>
       <!-- 新增 -->
      <el-dialog title="添加照片" :visible.sync="addDialogVisible" width="50%" :before-close="handleClose">
        <el-form :model="addForm" :rules="addRules" ref="addFormRef" label-width="120px">
          <el-form-item label="图片" props="file">
          <el-upload
            ref="upload"
            action="/as"
            :limit ="1"
            list-type="picture-card"
            :http-request="handleUpload"
            :auto-upload="false"
            >
            <i class="el-icon-plus"></i>
          </el-upload>
          </el-form-item>
          <el-form-item label="备注" prop="details">
              <el-input type="textarea" v-model="addForm.details"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitXiu">确 定</el-button>
        </span>
      </el-dialog>
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
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getXiuImgList(this.page)
        },
    data() {
      return {
        token: '',
        page: 1,
        content: [],
        editDialogVisible: false,
        addDialogVisible: false,
        editForm: {

        },
        addForm: {
          details: '',
          file: ''
        },
        addRules: {
            file: {required: true, message: '选择图片', trigger: 'blur'}
        },
        pageSize: 5,
        size: 5,
        total:0,
        totalElements: 0,
        number: 1,
        detailFile: [],
        reuploadDetail: [],

      }
    },
    methods: {
      showEditDialog(id) {
        let param = new FormData();
        param.append('token', this.token);
        param.append('id', id);
        axios({
         method: 'post',
         url: '/lightspace/changeMomentsConfigDisplay',
         data: param
        }).then((res) => {
          this.getXiuImgList(this.page)
        }).catch((err) => {
          console.log(err)
        })
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getXiuImgList(this.page)
      },
      addTupian() {
        this.addDialogVisible = true
      },
      handleUpload(raw){
        this.addForm.file = raw.file;
      },
      submitXiu() {
        this.$refs.addFormRef.validate((valid) => {
           if(!valid) return;
           this.$refs.upload.submit();
           let param = new FormData();
           param.append('token', this.token);
           param.append('details', this.addForm.details);
           param.append('file', this.addForm.file);
           axios({
               method: 'post',
               url: '/lightspace/addMomentsConfig',
               data: param,
               headers: {
                 'Content-Type': 'multipart/form-data'
               }
           }).then(this.handleAddSucc.bind(this))
           .catch(this.handleAddErr.bind(this))
         })
        },
        //关闭按钮
        handleClose() {
         this.addDialogVisible = false;
         this.$refs.addFormRef.resetFields();
        },
        handleAddSucc(res) {
            console.log(res);
            if(res.status == 200){
              this.addDialogVisible = false;
              this.$message.success('添加成功');
              this.$refs.addFormRef.resetFields();
              this.$refs.upload.clearFiles();
              this.getXiuImgList(this.page);
            }else{
              this.$message.error(res.data.msg);
              this.$router.push('/login');
            }
        },
        handleAddErr(err) {
            console.log(err)
        },
      getXiuImgList(page) {
        let param = new FormData();
          param.append('token', this.token);
          param.append('page', page)
          axios({
            method: 'post',
            url: '/lightspace/momentsConfigList',
            data: param
          }).then(this.getXiuListSucc.bind(this)).catch((err) => {
            console.log(err)
          })
        },
      getXiuListSucc(res) {
        if(res.data.status == 200 && res.data.data !== '') {
         res ? res= res.data.data: '';
         this.content = res.content;
         this.totalElements = res.totalElements;
         this.size = res.size;
         this.number = res.number + 1;
        }
      },
      // 重新上传详情图
      reupload(raw) {
        console.log(raw)
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
      editDati(id) {
       console.log(id)
        this.editDialogVisible = true;
        let param = new URLSearchParams();
        param.append('token', this.token);
        param.append('id', id)
        axios({
            method: 'post',
            url: '/lightspace/editMomentsConfig',
            data: param
        }).then((res) => {
          console.log(res)
          if(res.data.status == 200) {
            this.editForm = res.data.data;
            let  detailFile = res.data.data.path
            this.detailFile.push({
              url: detailFile
            });
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
        param.append('id', this.goodsId);
        param.append('title', this.editForm.title);
        param.append('subtitle', this.editForm.subtitle);
        param.append('introduction', this.editForm.introduction);
        param.append('details', this.editForm.details);
        param.append('file', this.reuploadDetail.file);
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/saveAnswerConfig'
        }).then((res) => {
          // console.log(res)
          if(res.data.status == 200) {
            this.editDialogVisible = false;
            this.$refs.editRef.resetFields();
            this.detailFile = [];
            this.reuploadDetail = [];
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      editDialogClosed() {
         this.$refs.editRef.resetFields()
      },
      //根据id删除学校
      async removeById(id) {
         const confirmResult = await this.$confirm('此操作将永久删除该爱眼秀, 是否继续?', '提示', {
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
             url: '/lightspace/deleteMomentsConfig',
             data: param
         }).then(this.handleDeleteSucc.bind(this))
         .catch(this.handleDeleteErr.bind(this))
       },
       handleDeleteSucc(res) {
           if(res.data.status === 10204) {
               this.$message.error(res.data.msg);
               this.$router.push('/login');
           } else if(res.data.status == 200) {
             this.$message.success('删除成功');
             this.getXiuImgList(this.page)
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
