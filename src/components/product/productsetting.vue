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
       </el-col>
       <el-col :span="6">
              <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
       </el-col>
      </el-row>
      <el-table :data="this.content" border  stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" width= '150' prop="name"></el-table-column>
        <el-table-column label="轮播图" prop="pictures" style="width: 50%;">
          <template scope="scope">
             <img v-for="item in scope.row.pictures" :src="item" class="swiperImg" />
          </template>
         </el-table-column>
        <el-table-column label="详情图" width= '250' prop="details">
         <template scope="scope">
           <img  :src="scope.row.details" class="swiperImg" />
         </template>
        </el-table-column>
        <el-table-column  width= '200' label="操作">
          <template slot-scope="scope">
             <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeShopById(scope.row.id)" ></el-button>
          </template>
      </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="this.number"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size ="10"
        :total="this.totalElements">
      </el-pagination>
    </el-card>
    <!-- 添加学校对话框 -->
    <el-dialog title="添加商品" :visible.sync="addDialogVisible" width="50%" :before-close="handleClose">
       <!-- 添加学校 -->
         <el-form ref="form2" :model="form2" label-width="80px">
           <el-form-item label="活动名称" label-width="120px">
           　　<el-input v-model="form2.name" name="names" style="width:360px;"></el-input>
       　　</el-form-item>
     　　　<el-form-item label-width="120px" label="上传详情图">
       　　<!--elementui的上传图片的upload :before-upload="beforeUpload"> -->
       　　<el-upload

             ref="upload"
        　　 class="upload-demo"
         　　action="/as"
         　　:limit= "6"
             multiple
             :before-upload="beforeUpload"
         　　:auto-upload="false"
         　　:on-remove="handleRemove"
         　　list-type="picture">
         　　<el-button size="small" type="primary">点击上传</el-button>
         　  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
       　</el-upload>
     　　</el-form-item>
     　　<el-form-item style="padding-top:20px;" label-width="120px" >
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
     　 </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    created() {
      this.token = window.sessionStorage.getItem('token');
      this.getShopList(1);
    },
    data() {
      return {
         token: '',
         addDialogVisible: false, //控制对话框的显示隐藏
         addDialogVisible: false, //控制对话框的显示隐藏
         picture: [],
         details: [],
         fileList: [],
 　　　　shopData: {
   　　　　name: '',
          token: '',
          picture: [],
          details: ''
 　　　　},
         form2: {
           name: ''
         },
 　　　　params2:{},
        productList: [],
        totalElements: 0,
        number: 1,
        size: 10,
        page: 1,
        content: [],
         picture: '',
         details: ''
      }
     },
    methods: {

      //监听页码值改变事件
      handleCurrentChange(val) {
         this.page = val;
         this.getShopList(val)
      },
      //获取列表
      getShopList(page) {
        let param = new FormData();
        param.append('token', this.token);
        param.append('page', page)
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/productList'
        }).then((res) => {
          // console.log(res)
          res? res = res.data.data: '';
          this.content = res.content;
          this.totalElements = res.totalElements;
          this.size = res.size;
          this.number = res.number + 1;
        }).catch((err) => {
          console.log(err)
        })
      },
      failResult(err){
        console.log(err)
      },
 　　handleRemove(file,filesList){
   　　this.param.delete('file')
 　　},
     beforeUpload(file){
       console.log(file)
      this.fileList.push(file);



 　　},
 　　handleRemove(file,filesList){
   　　this.param2.delete('file')
 　　},
 　　onSubmit(){//表单提交的事件
       this.$refs.upload.submit();
       let param = new FormData();
       param.append('token', this.token);
       param.append('name', this.form2.name);
       console.log(this.fileList, 2)
       this.fileList.forEach(function (file) {
        param.append('picture', file); // 因为要上传多个文件，所以需要遍历一下才行
             //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        })
       axios({
         method: 'post',
         data: param,
         url: '/lightspace/addProduct',
          // headers: {
          //   'Content-Type': 'multipart/form-data'}
       }).then((res) => {
         console.log(res)
       }).catch((err) => {
         console.log(err)
       })
      },
    //关闭按钮
     handleClose() {
      this.addDialogVisible = false;
     },
     //删除班级
     async removeShopById(id) {
         const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
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
             url: '/lightspace/deleteProduct',
             data: param
         }).then(this.handleDeleteProSucc.bind(this))
         .catch(this.handleDeleteProErr.bind(this))
     },
     handleDeleteProSucc(res) {
         if(res.data.status === 10204) {
             this.$message.error(res.data.msg);
             this.$router.push('/login');
         } else if(res.data.status == 200) {
            this.$message.success('删除记录成功');
            this.getShopList(1);
            // this.recordList = res.data.data;
            // const totalPage = Math.ceil(this.recordList.length / this.pageSize) // 总页数
            // this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
            // this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
         }
     },
     handleDeleteProErr(err) {
         console.log(err)
     },
    }
    }
</script>

<style>
  input[type="file"] {
          display: none;
      }

      .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
      }

      .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
      }

      .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
      }

      .avatar {
          width: 178px;
          height: 178px;
          display: block;
      }
      .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        width: 20rpx;
        height: 20rpx;
      }
  .swiperImg {
    width: 16%;
    height: 50px;
    margin: 5px;
    display: inline-block;
  }
</style>
