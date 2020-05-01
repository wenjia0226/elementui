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
              <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
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
          <el-form-item label="轮播图" prop="picture"   style="width: 800px;">
          <!-- <el-upload
             action="#"
             list-type="picture-card"
             :on-preview="handlePictureCardPreview"
             :on-remove="handleRemove"

             :before-upload="beforeAvatarUpload"
             :file-list="fileList"
           >
             <i class="el-icon-plus"></i>
           </el-upload> -->
           <el-upload
              action="http://lightspace/addProduct/"
             list-type="picture-card"
             :before-upload="beforeAvatarUpload"
             >
             <i class="el-icon-plus"></i>
           </el-upload>
           <el-dialog :visible.sync="dialogVisible">
             <img width="100%" :src="dialogImageUrl" alt="">
           </el-dialog>
          </el-form-item>
          <!-- <el-form-item label="详情图" prop="details">
             <el-upload
               action="#"
               list-type="picture-card"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove"

               :before-upload="beforeDetailPicUpoLoad"
               :file-list="fileList"
             >
             <i class="el-icon-plus"></i>
           </el-upload>
           </el-form-item> -->
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
         dialogImageUrl: '',
         dialogVisible: false,
         picList: [],
         fileList: []
      }
    },
    methods: {
      //关闭按钮
      handleClose() {
       this.addDialogVisible = false;
      },
      submitShop() {
        let param = new FormData();
        param.append('token',this.token);
        param.append('name', this.name);
        param.append('picture', this.picList);
        param.append('details', this.picList);
        axios({
          method: 'post',
          data: param,
          url: 'lightspace/addProduct'
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      },
      uploadAvatar(item) {
        const formData = new FormData()
        formData.append('file', item.file)
        const uid = item.file.uid;
        axios({
          method: 'post',
          data: formData,
          url: '/'
        }).then(res => {
          this.picList.push({ key: uid, value: res.data.data.url })
          this.emptyUpload()
        }).catch(() => {
          this.$message.error('上传失败，请重新上传')
          this.emptyUpload()
        })
      },
      beforeDetailPicUpoLoad(file) {
        this.fileList.push(file)
      },
      beforeAvatarUpload(file) {
        console.log(file)
        this.picList.push(file)
        const isJPG = file.type === 'image/jpeg'
        const isPng = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG && !isPng) {
          this.$message.error('上传图片只能是 JPG或png 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return (isJPG || isPng) && isLt2M
      },
      handleRemove(file, fileList) {
        for (const i in this.picList) {
          if (this.picList[i].key === file.uid) {
            this.picList.splice(i, 1)
          }
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      /**
       * 清空上传组件
       */
      emptyUpload() {
        const mainImg = this.$refs.upload
        if (mainImg) {
          if (mainImg.length) {
            mainImg.forEach(item => {
              item.clearFiles()
            })
          } else {
            this.$refs.upload.clearFiles()
          }
        }
      }
    }
  }
</script>

<style>
</style>
