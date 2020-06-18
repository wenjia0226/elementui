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
          <el-input placeholder="输入商品名称" v-model="query" clearable @clear="queryShop">
              <el-button slot="append" icon="el-icon-search" @click="queryShop"></el-button>
           </el-input>
       </el-col>
       <el-col :span="6">
             <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
       </el-col>
       <el-col :span="6">
         <el-button  type="primary" @click="switchShow">{{showFlag}}兑换人数</el-button>
       </el-col>
      </el-row> 
      <el-table :data="this.content" border  stripe style="width: 100%"  v-show="!this.searchContent.length">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" width= '150' prop="name"></el-table-column>
        <el-table-column label="轮播图" prop="pictures" style="width: 50%;">
          <template slot-scope="scope">
             <img v-for="item in scope.row.pictures" :src="item" class="swiperImg" />
          </template>
         </el-table-column>
        <el-table-column label="详情图" width= '250' prop="details">
         <template slot-scope="scope">
           <img  :src="scope.row.details" class="swiperImg"  style="height: 100px; width: auto;"/>
         </template>
        </el-table-column>
        <el-table-column label="合作机构" prop="partnershipName"></el-table-column>
        <el-table-column label="生成时间" prop="genTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
          </template>
        </el-table-column>
        <el-table-column  width= '200' label="操作">
          <template slot-scope="scope">
             <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeShopById(scope.row.id)" ></el-button>
          </template>
      </el-table-column>
      </el-table>
      <el-pagination
       v-show="!this.searchContent.length"
        background
        :current-page="this.number"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size ="10"
        :total="this.totalElements">
      </el-pagination>
       <!-- 搜索列表 -->
       <el-table :data="this.searchContent" border  stripe style="width: 100%"  v-show="this.searchContent.length">
         <el-table-column type="index"></el-table-column>
         <el-table-column label="商品名称" width= '150' prop="name"></el-table-column>
         <el-table-column label="轮播图" prop="pictures" style="width: 50%;">
           <template slot-scope="scope">
              <img v-for="item in scope.row.pictures" :src="item" class="swiperImg" />
           </template>
          </el-table-column>
         <el-table-column label="详情图" width= '250' prop="details">
          <template slot-scope="scope">
            <img  :src="scope.row.details" class="swiperImg" />
          </template>
         </el-table-column>
         <el-table-column label="合作机构" prop="partnershipName"></el-table-column>
         <el-table-column label="生成时间" prop="genTime"></el-table-column>
         <el-table-column label="操作">
           <template slot-scope="scope">
               <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
           </template>
         </el-table-column>
         <el-table-column  width= '200' label="操作">
           <template slot-scope="scope">
              <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeShopById(scope.row.id)" ></el-button>
           </template>
       </el-table-column>
       </el-table>
       <el-pagination
         v-show="this.searchContent.length"
         background
         :current-page="this.searchNumber"
         @current-change="handleSearchCurrentChange"
         layout="prev, pager, next"
         :page-size ="this.searchSize"
         :total="this.searchTotalElements">
       </el-pagination>
    </el-card>
    <!-- 添加学校对话框 -->
    <el-dialog title="添加商品" :visible.sync="addDialogVisible" width="50%" :before-close="handleClose">
       <!-- 添加商品 -->
         <el-form  :model="form2" label-width="80px" :rules="addShopRules" ref="addShopFormRef">
          <el-form-item label="商品名称" label-width="120px" prop="name">
           　　<el-input v-model="form2.name" name="names" style="width:360px;"></el-input>
       　　</el-form-item>
     　　　<el-form-item label-width="120px" label="上传轮播图(最多6张)" prop="addDetail" >
       　　<!--elementui的上传图片的upload :before-upload="beforeUpload"> -->
       　　  <el-upload
             ref="upload"
        　　 class="upload-demo"
             v-model="form2.addDetail"
         　　action="/as"
         　　:limit= "6"
             multiple
             :http-request="handleUpload"
         　　:auto-upload="false"
         　　list-type="picture">
         　　<el-button size="small" type="primary">点击上传</el-button>
         　  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
       　  </el-upload>
     　　 </el-form-item>
         <el-form-item label-width="120px" label="上传详情图" prop="addSwiper">
       　　<!--elementui的上传图片的upload :before-upload="beforeUpload"> -->
       　　<el-upload
             ref="detailUpload"
        　　 class="upload-demo"
         　　action="/as"
         　　:limit= "1"
             multiple
             :http-request="handleDetailUpload"
         　　:auto-upload="false"
         　　list-type="picture">
         　　<el-button size="small" type="primary">点击上传</el-button>
         　  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
       　</el-upload>
     　　</el-form-item>
        <el-form-item label="合作机构" prop='coorparation'>
           <el-select v-model="form2.coorparation" placeholder="请选择"   @change="handleChange">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
       </el-form-item>
     　　<el-form-item style="padding-top:20px;" label-width="120px" >
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
     　 </el-form-item>
    </el-form>
    </el-dialog>
    <!-- 修改商品对话框 -->
    <el-dialog title="修改商品" :visible.sync="editDialogVisible" width="50%" :before-close="handleEditClose">
       <!-- 修改商品 -->
         <el-form ref="form2" :model="editForm" label-width="80px">
           <el-form-item label="活动名称" label-width="120px">
           　　<el-input v-model="editForm.name" name="names" style="width:360px;"></el-input>
       　　</el-form-item>
       <el-form-item label-width="120px" label="上传轮播图(最多6张)" wx:if="this.editForm.pictures.length">
           <!-- 轮播图 -->
           <el-upload
             ref="editPic"
             action="/as"
             :limit = '6'
             :auto-upload = "true"
             list-type="picture-card"
             :file-list = "pictureFile"
             :on-remove="handleRemove"
             :http-request="reuploadPicture"
              style="display: inline-block">
             <i class="el-icon-plus"></i>
           </el-upload>
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
         <el-form-item label="合作机构" prop='partnershipId'>
                <el-select v-model="editForm.partnershipId" placeholder="请选择"   @change="handleChange">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
          　　
     　　<el-form-item style="padding-top:20px;" label-width="120px" >
          <el-button type="primary" @click="onresetSubmit">确定修改</el-button>
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
       this.getOPtions();
    },
    data() {
      return {
         token: '',
         query: '',
         showFlag: '隐藏',
		 options: [],
         addDialogVisible: false, //控制对话框的显示隐藏
         editDialogVisible: false, //控制对话框的显示隐藏
         picture: [],
         details: [],
         fileList: [],
         cooparationId: '',
 　　　　shopData: {
   　　　　name: '',
          token: '',
          picture: [],
          details: ''
 　　　　},
        form2: {
          name: '',
          addSwiper: '',
          addDetail: '',
		  coorparation: ''
        },
         addShopRules: {
             name: [{required: true, message: '请输入商品名称', trigger: 'blur' }],
			 coorparation:  [{required: true, message: '请选择门店', trigger: 'blur' }]
         },
         editForm: {
           name: '',
           picture: [],
           details: '',
           partnershipId: ''
         },
 　　　　params2:{},
        productList: [],
        totalElements: 0,
        number: 1,
        size: 10,
        page: 1,
        content: [],
        searchContent: [],
        searchNumber: 1,
        searchSize: 10,
        searchPage: 1,
        searchTotalElements: 0,
         picture: '',
         details: '',
         detailFile: [],
         pictureFile: [],
         reuploadDetail: '', //重新上传图片
         reuplodPicture: [],
         goodsId: '' ,// 点击编辑按钮商品id,
         delPic: []
      }
     },
    methods: {
      switchShow() {
        let param = new URLSearchParams();
        param.append('token', this.token);
        axios({
            method: "post",
            url: '/lightspace/disPlayBuyer',
            data: param
        }).then((res) => {
         // console.log(res)
          if(this.showFlag =='隐藏') {
            this.showFlag = '显示'
          }else {
            this.showFlag ='隐藏'
          }

        }).catch((err) => {
          console.log(err)
        })
      },
      // 新增合作机构修改
      handleChange(val) {
        this.form2.coorparation = val;
      },
      // 修改合作机构
      handleEditChange(val) {
        this.editForm.partnershipId = val;
      },
      handleRemove(file, fileList) {
        if(this.reuplodPicture.length) {
          let temp = this.reuplodPicture;
          let arr = temp.filter((item) => {
            if(item.uid !== file.uid) {
              return item
            }
          })
           this.reuplodPicture = arr;
        }else {
          this.delPic.push(file.url)
        }
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
      //搜索
      queryShop() {
        if(this.query == "") {
            this.getShopList(1);
           return;
        }
          let param = new URLSearchParams();
          param.append('token', this.token);
          param.append('name', this.query);
          param.append('page', this.searchPage);
          axios({
              method: "post",
              url: '/lightspace/findProductByName',
              data: param
          }).then(this.handleQuerySucc.bind(this))
          .catch(this.handleQueryErr.bind(this))
      },
      handleQuerySucc(res) {
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
           } else if(res.data.status == 10208) {
            this.$message.error(res.data.msg);
         }else if(res.status == 200) {
            this.$message.success('搜索成功');
            // console.log(res)
            res? res = res.data.data: '';
            this.searchContent = res.content;
            this.searchTotalElements = res.totalElements;
            this.searchSize = res.size;
            this.searchNumber = res.number + 1;
          }
      },
      handleQueryErr(err) {
          console.log(err)
      },
      //监听页码值改变事件
      handleCurrentChange(val) {
         this.page = val;
         this.getShopList(val)
      },
      //监听页码值改变事件
      handleSearchCurrentChange(val) {
         this.searchPage = val;
         this.queryShop();
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
 　　
     beforeUpload(file){
      this.fileList.push(file);
 　　},
    handleUpload(raw){
      this.fileList.push(raw.file);
    },
    handleDetailUpload(raw) {
      this.details = raw.file;
    },
  // 重新上传详情图
  reupload(raw) {
    this.reuploadDetail = raw.file;
  },
  // 重新上传轮播图
  reuploadPicture(raw) {
    this.reuplodPicture.push(raw.file)
  },
    async onresetSubmit() {
      let param = new FormData();
      param.append('token', this.token);
      param.append('id', this.goodsId);
      param.append('name', this.editForm.name);
      param.append('details', this.reuploadDetail);
      param.append('delPic', this.delPic);
      param.append('partnershipId', this.editForm.partnershipId)
      this.reuplodPicture.forEach(function (file) {
       param.append('picture', file); // 因为要上传多个文件，所以需要遍历一下才行
            //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
       })
      axios({
        method: 'post',
        data: param,
        url: '/lightspace/saveProduct'
      }).then((res) => {
        if(res.data.status == 200) {
          this.editDialogVisible = false;
          this.editForm.name = '';
          this.reuplodPicture = [];  //上传完成后清空
          this.reuploadDetail = [];
          this.pictureFile = [];
          this.detailFile = [];
          this.delPic = [];
          this.getShopList(1);
        }
      }).catch((err) => {
        console.log(err)
      })
    },
     //新增添加
 　　async onSubmit(){//表单提交的事件
         this.$refs.addShopFormRef.validate((valid) => {
         if(!valid) return;
         this.$refs.upload.submit();
         this.$refs.detailUpload.submit();
         let param = new FormData();
         param.append('token', this.token);
         param.append('name', this.form2.name);
         param.append('details', this.details);
         param.append('partnership', this.form2.coorparation)
         this.fileList.forEach(function (file) {
          param.append('picture', file); // 因为要上传多个文件，所以需要遍历一下才行
               //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
          })
         axios({
           method: 'post',
           data: param,
           url: '/lightspace/addProduct'
         }).then((res) => {
           // console.log(res)
           if(res.data.status == 200) {
             this.addDialogVisible = false;
             this.form2.name = '';
             this.$refs.upload.clearFiles(); // 清空上传的图片
             this.$refs.detailUpload.clearFiles();
             this.getShopList(1);
           }
         }).catch((err) => {
           console.log(err)
         })
      })
    },
    //关闭按钮
     handleClose() {
      this.addDialogVisible = false;
      this.form2.name = '';
      this.$refs.upload.clearFiles();
      this.$refs.detailUpload.clearFiles();
     },
     handleEditClose() {
       this.detailFile = [];
       this.pictureFile = [];
       this.editDialogVisible = false;
       this.editForm.name= '';
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
            if(this.query == '') {
                this.getShopList(1);
            }else {
              this.queryShop();
            }
         }
     },
     handleDeleteProErr(err) {
         console.log(err)
     },
     showEditDialog(id){
       this.goodsId = id;
       let param = new FormData();
       param.append('token', this.token);
       param.append('id', id);
       axios({
         method: 'post',
         data: param,
         url: '/lightspace/editProduct'
       }).then((res) => {
         this.editDialogVisible = true;
         this.editForm = res.data.data;
         let detailFile = res.data.data.details;
         let pictureFile = res.data.data.pictures;
         this.pictureFile = pictureFile.map((t) => {
           var obj = {};
           obj.url = t;
           return obj;
         })
         this.detailFile.push({
           url: detailFile
         });
       }).catch((err) => {
         console.log(err)
       })
     },
	 //获取级联选择器中的数据
	 getOPtions() {
	     let param = new URLSearchParams();
	     param.append('token', this.token);
	     axios({
	         method: 'post',
	         url: '/lightspace/partnershipList',
	         data: param
	     }).then(this.handleGetOptionSucc.bind(this)).catch(this.handleGetOptionErr.bind(this))
	 },
	 handleGetOptionSucc (res) {
     // console.log(res)
	   if(res.data.status === 10204) {
	       this.$message.error(res.data.msg);
	       this.$router.push('/login');
	   } else if(res.data.status == 200) {
	      let options = res.data.data;
	      options.forEach((item, index) => {
	        this.options.push({
	          value: item.id,
	          label: item.name
	        })
	      })
	   }
	 },
	 handleGetOptionErr(err) {
	     console.log(err)
	 }
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
    width: auto;
    height: 50px !important;
    margin: 5px;
    display: inline-block;
  }
  .bgGrey {
    background: grey
  }
</style>
