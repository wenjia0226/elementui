<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>兑换商城</el-breadcrumb-item>
        <el-breadcrumb-item>轮播推荐</el-breadcrumb-item>
    </el-breadcrumb>
  <el-card>
    <el-row :gutter="20">
     <el-col :span="6">
        <el-button type="primary" @click="addDialogVisible = true">添加轮播图</el-button>
     </el-col>
    </el-row>
    <el-table :data="this.content" border  stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="商品名称" width= '150' prop="productName"></el-table-column>
      <el-table-column label="轮播图" width= '250' prop="path">
       <template slot-scope="scope">
         <img  :src="scope.row.path" class="swiperImg" />
       </template>
      </el-table-column>
      <el-table-column label="生成时间" prop="genTime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
        </template>
      </el-table-column>
      <el-table-column  width= '200' label="操作">
        <template slot-scope="scope">
           <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeSwiperById(scope.row.id)" ></el-button>
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
   <!-- 添加轮播图-->
  <el-dialog title="添加规格" :visible.sync="addDialogVisible" width="50%" :before-close	="handleClose">
   <el-form :model="addSwiperForm" :rules="addSwiperRules" ref="swiperFormRef" label-width="100px">
   <el-form-item label="商品名称" prop="productId">
     <el-select v-model="addSwiperForm.productName" placeholder="请选择" @change="handleChange">
      <el-option
        v-for="item in this.productList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
       >
      </el-option>
     </el-select>
   </el-form-item>
   <el-form-item label="图片" props="rotationPic">
     <el-upload
         ref="upload"
    　　 class="upload-demo"
     　　action="/as"
     　　:limit= "1"
         :http-request="handleDetailUpload"
     　　:auto-upload="false"
     　　list-type="picture">
     　　<el-button size="small" type="primary">点击上传</el-button>
     　  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
   　</el-upload>
   </el-form-item>
   </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="hideAddDialog" @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveAdd" >确 定</el-button>
    </span>
  </el-dialog>
<!-- 修改轮播图-->
  <el-dialog title="修改规格" :visible.sync="editDialogVisible" width="50%">
   <el-form :model="editSwiperForm" :rules="editSwiperRules" ref="editSwiperFormRef" label-width="100px">
   <el-form-item label="商品名称" prop="productId">
     <el-select v-model="editSwiperForm.productName" placeholder="请选择" @change="handleReUpChange">
      <el-option
        v-for="item in this.productList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
       >
      </el-option>
     </el-select>
   </el-form-item>
   <el-form-item label="图片" props="rotationPic">
   <el-upload
      ref="editUpload"
      action="/as"
      :limit = '1'
      :auto-upload = "true"
      :http-request="reupload"
      list-type="picture-card"
      :file-list = "swiperFile"
      >
      <i class="el-icon-plus"></i>
   </el-upload>
   </el-form-item>
   </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="hideAddDialog">取 消</el-button>
        <el-button type="primary" @click="onresetSubmit" >确 定</el-button>
    </span>
  </el-dialog>
 </div>
</template>

<script>
import axios from 'axios'
export default {
   created() {
      this.token = window.sessionStorage.getItem('token');
      this.getAllProducts();
      this.getSwiperList(1);
   },
  data() {
    return {
      token: '',
      query: '',
      addDialogVisible: false, //控制对话框的显示隐藏
      editDialogVisible: false, //控制对话框的显示隐藏
      productList: [],
      totalElements: 0,
      number: 1,
      size: 10,
      page: 1,
      content: [],
      swiperFile: [], // 回显图片
      reuploadSwiper: [],
      goodsId: '',
      addSwiperForm: {
        productId: '',
        rotationPic: ''
      },
      addSwiperRules: {
        productId: {required: true, message: '请选择商品名称', trigger: 'blur' },
        rotationPic: {required: true, message: '请选择图片', trigger: 'blur' },
      },
      editSwiperForm: {
        productId: '',
        rotationPic: '',
        productName: ''
      },
      editSwiperRules: {
        productId: {required: true, message: '请选择商品名称', trigger: 'blur' },
        rotationPic: {required: true, message: '请选择图片', trigger: 'blur' },
      },
    }
  },
  methods: {
    hideAddDialog() {
      this.addDialogVisible = false;
    },
    async onresetSubmit() {
      let param = new FormData();
      param.append('token', this.token);
      param.append('id', this.goodsId);
      param.append('productId', this.editSwiperForm.productId);
      param.append('rotationPic', this.reuploadSwiper);
      axios({
        method: 'post',
        data: param,
        url: '/lightspace/saveRotationPic'
      }).then((res) => {
        console.log(res)
        if(res.data.status == 200) {
          this.editDialogVisible = false;
          this.swiperFile = [];
          this.getSwiperList(1);
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //重新上传详情图
    reupload(raw) {
      this.reuploadSwiper = raw.file;
    },
    showEditDialog(id){
      this.goodsId = id;
      let param = new FormData();
      param.append('token', this.token);
      param.append('id', id);
      axios({
        method: 'post',
        data: param,
        url: '/lightspace/editRotationPic'
      }).then((res) => {
        this.editDialogVisible = true;
        this.editSwiperForm = res.data.data;
        let swiperFile = res.data.data.path;
        this.swiperFile.push({
          url: swiperFile
        });
      }).catch((err) => {
        console.log(err)
      })
    },
    //监听页码值改变事件
    handleCurrentChange(val) {
       this.page = val;
       this.getSwiperList(val)
    },
    getSwiperList(page) {
      let param = new FormData();
      param.append('token', this.token);
      param.append('page', page)
      axios({
        method: 'post',
        data: param,
        url: '/lightspace/rotationList'
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
    handleDetailUpload(raw) {
       this.addSwiperForm.rotationPic = raw.file;
    },
    // 新增选择商品改变
    handleChange(val) {
      this.addSwiperForm.productId = val;
    },
    handleReUpChange(val) {
      this.editSwiperForm.productId = val;
    },
    // 获取所有商品列表
    getAllProducts() {
     let param = new FormData();
     param.append('token', this.token);
     axios({
       method: 'post',
       data: param,
       url: '/lightspace/allProduct'
     }).then((res) => {
       this.productList = res.data.data;
       this.productList.forEach((item) => {
          item.value = item.id;
          item.label = item.name;
       })
     }).catch((err) => {
       console.log(err)
     })
    },
    // 新增保存商品规格
    async saveAdd() {
      this.$refs.upload.submit();
      this.$refs.swiperFormRef.validate((valid) => {
      if(!valid) return this.$message.error('验证失败');
      let param = new FormData();
      param.append('token', this.token);
      param.append('productId', this.addSwiperForm.productId);
      param.append('rotationPic', this.addSwiperForm.rotationPic);
      axios({
        method: 'post',
        data: param,
        url: '/lightspace/addRotationPic'
      }).then((res) => {
        if(res.data.status == 200) {
          this.addDialogVisible = false;
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.swiperFile = [];
          this.addSwiperForm.productName = '';
         this.getSwiperList(1)
        }
      }).catch((err) => {
        console.log(err)
      })
      })
    },
    //删除班级
    async removeSwiperById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).catch(err => err)
      if(confirmResult !== 'confirm') {
          return this.$message.info('已经取消删除')
      }
      let param = new FormData();
      param.append('token', this.token);
      param.append('id', id)
      axios({
          method: 'post',
          url: '/lightspace/deleteRotationPic',
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
           this.getSwiperList(1)
        }
    },
    handleDeleteProErr(err) {
        console.log(err)
    }
  }
}
</script>
<style>
</style><template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>兑换商城</el-breadcrumb-item>
      <el-breadcrumb-item>轮播推荐</el-breadcrumb-item>
    </el-breadcrumb>
  <el-card>
    <el-row :gutter="20">
     <el-col :span="6">
        <el-button type="primary" @click="addDialogVisible = true">添加轮播图</el-button>
     </el-col>
    </el-row>
    <el-table :data="this.content" border  stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="商品名称" width= '150' prop="productName"></el-table-column>
      <el-table-column label="轮播图" width= '250' prop="path">
       <template slot-scope="scope">
         <img  :src="scope.row.path" class="swiperImg" />
       </template>
      </el-table-column>
      <el-table-column label="生成时间" prop="genTime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
        </template>
      </el-table-column>
      <el-table-column  width= '200' label="操作">
        <template slot-scope="scope">
          <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeSwiperById(scope.row.id)" ></el-button>
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
   <!-- 添加轮播图-->
  <el-dialog title="添加轮播图" :visible.sync="addDialogVisible" width="50%" :before-close="handleClose">
   <el-form :model="addSwiperForm" :rules="addSwiperRules" ref="swiperFormRef" label-width="100px">
   <el-form-item label="商品名称" prop="productId">
     <el-select v-model="addSwiperForm.productName" placeholder="请选择" @change="handleChange">
      <el-option
        v-for="item in this.productList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
       >
      </el-option>
     </el-select>
   </el-form-item>
   <el-form-item label="图片" props="rotationPic">
     <el-upload
        ref="upload"
    　　 class="upload-demo"
     　　action="/as"
     　　:limit= "1"
         :http-request="handleDetailUpload"
     　　:auto-upload="false"
     　　list-type="picture">
     　　<el-button size="small" type="primary">点击上传</el-button>
     　  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
   　</el-upload>
   </el-form-item>
   </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveAdd" >确 定</el-button>
    </span>
  </el-dialog>
<!-- 修改轮播图-->
  <el-dialog title="修改轮播图" :visible.sync="editDialogVisible" width="50%" :before-close="handleCloseEdit">
   <el-form :model="editSwiperForm" :rules="editSwiperRules" ref="editSwiperFormRef" label-width="100px">
   <el-form-item label="商品名称" prop="productId">
     <el-select v-model="editSwiperForm.productName" placeholder="请选择" @change="handleReUpChange">
      <el-option
        v-for="item in this.productList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
       >
      </el-option>
     </el-select>
   </el-form-item>
   <el-form-item label="图片" props="rotationPic">
   <el-upload
      ref="editUpload"
      action="/as"
      :limit = '1'
      :auto-upload = "true"
      :http-request="reupload"
      list-type="picture-card"
      :file-list = "swiperFile"
      >
      <i class="el-icon-plus"></i>
   </el-upload>
   </el-form-item>
   </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onresetSubmit" >确 定</el-button>
    </span>
  </el-dialog>
 </div>
</template>

<script>
import axios from 'axios'
export default {
   created() {
      this.token = window.sessionStorage.getItem('token');
      this.getAllProducts();
      this.getSwiperList(1);
   },
  data() {
    return {
      token: '',
      query: '',
      addDialogVisible: false, //控制对话框的显示隐藏
      editDialogVisible: false, //控制对话框的显示隐藏
      productList: [],
      totalElements: 0,
      number: 1,
      size: 10,
      page: 1,
      content: [],
      swiperFile: [], // 回显图片
      reuploadSwiper: [],
      goodsId: '',
      addSwiperForm: {
        productId: '',
        rotationPic: ''
      },
      addSwiperRules: {
        productId: {required: true, message: '请选择商品名称', trigger: 'blur' },
        rotationPic: {required: true, message: '请选择图片', trigger: 'blur' },
      },
      editSwiperForm: {
        productId: '',
        rotationPic: '',
        productName: ''
      },
      editSwiperRules: {
        productId: {required: true, message: '请选择商品名称', trigger: 'blur' },
        rotationPic: {required: true, message: '请选择图片', trigger: 'blur' },
      },
    }
  },
  methods: {
    async onresetSubmit() {
      let param = new FormData();
      param.append('token', this.token);
      param.append('id', this.goodsId);
      param.append('productId', this.editSwiperForm.productId);
      param.append('rotationPic', this.reuploadSwiper);
      axios({
        method: 'post',
        data: param,
        url: '/lightspace/saveRotationPic'
      }).then((res) => {
        console.log(res)
        if(res.data.status == 200) {
          this.editDialogVisible = false;
          this.$refs.swiperFormRef.resetFields();
          this.$refs.editUpload.clearFiles();
          this.getSwiperList(1);
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //重新上传详情图
    reupload(raw) {
      this.reuploadSwiper = raw.file;
    },
    showEditDialog(id){
      let that = this;
      this.goodsId = id;
      let param = new FormData();
      param.append('token', this.token);
      param.append('id', id);
      axios({
        method: 'post',
        data: param,
        url: '/lightspace/editRotationPic'
      }).then((res) => {
        // console.log(res)
        this.swiperFile = [];
        this.editDialogVisible = true;
        this.editSwiperForm = res.data.data;
        let swiperFile = res.data.data.path;
        this.swiperFile.push({
          url: swiperFile
        });
      }).catch((err) => {
        console.log(err)
      })
    },
    //监听页码值改变事件
    handleCurrentChange(val) {
       this.page = val;
       this.getSwiperList(val)
    },
    getSwiperList(page) {
      let param = new FormData();
      param.append('token', this.token);
      param.append('page', page)
      axios({
        method: 'post',
        data: param,
        url: '/lightspace/rotationList'
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
    handleDetailUpload(raw) {
       this.addSwiperForm.rotationPic = raw.file;
    },
    // 新增选择商品改变
    handleChange(val) {
      this.addSwiperForm.productId = val;
    },
    handleReUpChange(val) {
      this.editSwiperForm.productId = val;
    },
    // 获取所有商品列表
    getAllProducts() {
     let param = new FormData();
     param.append('token', this.token);
     axios({
       method: 'post',
       data: param,
       url: '/lightspace/allProduct'
     }).then((res) => {
       this.productList = res.data.data;
       this.productList.forEach((item) => {
          item.value = item.id;
          item.label = item.name;
       })
     }).catch((err) => {
       console.log(err)
     })
    },
    handleCloseEdit() {
      this.$refs.editUpload.clearFiles();
      this.editDialogVisible = false;
    },
    //点击x,清除添加商品选项
    handleClose() {
      this.addDialogVisible = false;
      this.$refs.swiperFormRef.resetFields();
      this.addSwiperForm.productName = '';
      this.$refs.upload.clearFiles(); // 清空上传的图片
    },
    hideAddDialog() {
      this.addDialogVisible = false;
    },
    // 新增保存商品规格
    async saveAdd() {
      this.$refs.upload.submit();
      this.$refs.swiperFormRef.validate((valid) => {
      if(!valid) return this.$message.error('验证失败');
      let param = new FormData();
      param.append('token', this.token);
      param.append('productId', this.addSwiperForm.productId);
      param.append('rotationPic', this.addSwiperForm.rotationPic);
      axios({
        method: 'post',
        data: param,
        url: '/lightspace/addRotationPic'
      }).then((res) => {
        if(res.data.status == 200) {
          this.addDialogVisible = false;
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          //this.swiperFile = [];
          this.$refs.upload.clearFiles(); // 清空上传的图片
          this.addSwiperForm.productName = '';
         this.getSwiperList(1)
        }
      }).catch((err) => {
        console.log(err)
      })
      })
    },
    //删除班级
    async removeSwiperById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).catch(err => err)
      if(confirmResult !== 'confirm') {
          return this.$message.info('已经取消删除')
      }
      let param = new FormData();
      param.append('token', this.token);
      param.append('id', id)
      axios({
          method: 'post',
          url: '/lightspace/deleteRotationPic',
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
           this.getSwiperList(1)
        }
    },
    handleDeleteProErr(err) {
        console.log(err)
    }
  }
}
</script>
<style></style>
</style>
