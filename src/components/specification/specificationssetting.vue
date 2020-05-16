<template>
  <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>兑换商城</el-breadcrumb-item>
          <el-breadcrumb-item>规格管理</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 卡片视图 -->
      <el-card>
        <el-row>
          <el-col :span="4">
            <el-select v-model="searchquery" placeholder="请选择" @change="handleSearchChange">
             <el-option
               v-for="item in this.productList"
               :key="item.value"
               :label="item.label"
               :value="item.value"
              >
             </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" >
            <el-button  type="primary"  @click="searchProduct">搜索商品规格</el-button>
          </el-col>
          <el-col :span="6" :offset="1">
                 <el-button type="primary" @click="addDialogVisible = true">添加规格</el-button>
          </el-col>
        </el-row>
       <el-table :data="this.content" border stripe style="width: 100%" v-show="!this.searchContent.length">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="productName"></el-table-column>
        <el-table-column label="规格名称" prop="name"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="爱眼币" prop="integral"></el-table-column>
        <el-table-column label="运费" prop="freight"></el-table-column>
        <el-table-column label="库存" prop="stock"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeSpecById(scope.row.id)"></el-button>
            </template>
        </el-table-column>
        </el-table>
       <el-pagination
        v-show="!this.searchContent.length"
         background
         clearable
         :current-page="this.number"
         @current-change="handleCurrentChange"
         layout="prev, pager, next"
         :page-size ="this.size"
         :total="this.totalElements">
       </el-pagination>
       <!-- 搜索 -->
       <el-table :data="this.searchContent" border stripe style="width: 100%" v-show="this.searchContent.length">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="商品名称" prop="productId"></el-table-column>
            <el-table-column label="规格名称" prop="name"></el-table-column>
            <el-table-column label="价格" prop="price"></el-table-column>
            <el-table-column label="爱眼币" prop="integral"></el-table-column>
            <el-table-column label="运费" prop="freight"></el-table-column>
            <el-table-column label="库存" prop="stock"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeSpecById(scope.row.id)"></el-button>
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
      <el-dialog title="添加规格" :visible.sync="addDialogVisible" width="50%" :before-close="handleClose">
       <!-- 添加规格-->
       <el-form :model="addShopForm" :rules="addShopRules" ref="shopFormRef" label-width="100px">
        <el-form-item label="商品名称" prop="productId">
         <el-select v-model="addShopForm.product" placeholder="请选择" @change="handleChange">
          <el-option
            v-for="item in this.productList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
           >
          </el-option>
         </el-select>
        </el-form-item>
        <el-form-item label="规格名称" prop="name">
            <el-input v-model="addShopForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="价钱" prop="price">
            <el-input v-model="addShopForm.price" clearable></el-input>
        </el-form-item>
        <el-form-item label="爱眼币" prop="integral">
            <el-input v-model="addShopForm.integral" clearable></el-input>
        </el-form-item>
        <el-form-item label="运费" prop="freight">
            <el-input v-model="addShopForm.freight" clearable></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
            <el-input v-model="addShopForm.stock" clearable></el-input>
        </el-form-item>
        <el-form-item label="百分比" prop="percentage">
            <el-input v-model="addShopForm.percentage" clearable></el-input>
        </el-form-item>
       </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="hideAddDialog">取 消</el-button>
            <el-button type="primary" @click="saveAdd" >确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改规格" :visible.sync="editDialogVisible" width="50%" >
       <!-- 修改规格-->
       <el-form :model="editShopForm" :rules="editShopRules" ref="shopEditFormRef" label-width="100px">
        <el-form-item label="商品名称" prop="productId">
         <el-select v-model="editShopForm.productName" placeholder="请选择" @change="handleChange">
          <el-option
            v-for="item in this.productList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
           >
          </el-option>
         </el-select>
        </el-form-item>
        <el-form-item label="规格名称" prop="name">
            <el-input v-model="editShopForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="价钱" prop="price">
            <el-input v-model="editShopForm.price" clearable></el-input>
        </el-form-item>
        <el-form-item label="爱眼币" prop="integral">
            <el-input v-model="editShopForm.integral" clearable></el-input>
        </el-form-item>
        <el-form-item label="运费" prop="freight">
            <el-input v-model="editShopForm.freight" clearable></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
            <el-input v-model="editShopForm.stock" clearable></el-input>
        </el-form-item>
        <el-form-item label="百分比" prop="percentage">
            <el-input v-model="editShopForm.percentage" clearable></el-input>
        </el-form-item>
       </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="hideEditDialog">取 消</el-button>
            <el-button type="primary" @click="editSave">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
 import axios from 'axios'
 export default {
    created() {
       this.token = window.sessionStorage.getItem('token');
       this.getSpecList(1);
       this.getAllProducts();
    },
    data() {
      return {
        searchquery: '',
        addDialogVisible: false,
        editDialogVisible: false,
        shopList: [],
        productList: [],
        addShopForm: {
          productId: '',
          name: '',
          price: '',
          integral: '',
          freight: '',
          stock: '',
          percentage: ''
        },
        editShopForm: {
          productId: '',
          productName: '',
          name: '',
          price: '',
          integral: '',
          freight: '',
          stock: '',
          percentage: '',

        },
        addShopRules: {
          name: {required: true, message: '请输入规格名称', trigger: 'blur' },
          price: {required: true, message: '请输入价格', trigger: 'blur' },
          integral: {required: true, message: '请输入爱眼币', trigger: 'blur' },
          freight: {required: true, message: '请输入运费', trigger: 'blur' },
          stock: {required: true, message: '请输入库存', trigger: 'blur' },
          percentage: {required: true, message: '请输入百分比', trigger: 'blur' },
          productId: {required: true, message: '请选择商品名称', trigger: 'blur' },
        },
        editShopRules: {
          name: {required: true, message: '请输入规格名称', trigger: 'blur' },
          price: {required: true, message: '请输入价格', trigger: 'blur' },
          integral: {required: true, message: '请输入爱眼币', trigger: 'blur' },
          freight: {required: true, message: '请输入运费', trigger: 'blur' },
          stock: {required: true, message: '请输入库存', trigger: 'blur' },
          percentage: {required: true, message: '请输入百分比', trigger: 'blur' },
          productId: {required: true, message: '请选择商品名称', trigger: 'blur' },
        },
        content: [],
        totalElements: 0,
        number:1,
        size: 10,
        page: 1,
        id: '',
        searchContent: [],
        searchTotalElements: 0,
        searchProductId: '',
        searchNumber: 1,
        searchSize: 10,
        searchPage: 1,
      }
    },
    methods: {
      searchProduct() {
          let param = new FormData();
          param.append('token', this.token);
          param.append('productId', this.searchProductId);
          param.append('page', this.searchPage)
          axios({
            data: param,
            method: 'post',
            url: '/lightspace/specificationsList'
          }).then((res) => {
            console.log(res)
            res? res = res.data.data: '';
            this.searchContent = res.content;
            this.searchTotalElements = res.totalElements;
            this.searchSize = res.size;
            this.searchNumber = res.number + 1;
          }).catch((err) => {
            console.log(err)
          })
      },
      // 新增选择商品改变
      handleChange(val) {
        this.addShopForm.productId = val;
      },
      handleSearchChange(val) {
        console.log(val)
        this.searchProductId = val;

      },
     // 列表页修改
      handleCurrentChange(val) {
         this.page = val;
         this.getSpecList(val)
      },
      handleSearchCurrentChange(val) {
        this.searchPage = val;
        this.searchProduct();
      },
      // 获取规格列表
      getSpecList(page) {
        let param = new FormData();
        param.append('token', this.token);
        param.append('page', page)
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/specificationsList'
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
      // 新增保存商品规格
      saveAdd() {
        this.$refs.shopFormRef.validate((valid) => {
        if(!valid) return this.$message.error('验证失败');
        let param = new FormData();
        param.append('token', this.token);
        param.append('productId', this.addShopForm.productId);
        param.append('name', this.addShopForm.name);
        param.append('price', this.addShopForm.price);
        param.append('integral', this.addShopForm.integral);
        param.append('freight', this.addShopForm.freight);
        param.append('stock', this.addShopForm.stock);
        param.append('percentage', this.addShopForm.percentage);
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/addSpecifications'
        }).then((res) => {
          // console.log(res)
          if(res.data.status == 200) {
            this.addDialogVisible = false;
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.getSpecList(1);
          }

        }).catch((err) => {
          console.log(err)
        })
        })
      },
      hideAddDialog() {
        this.addDialogVisible = false;
      },
      //点击x,清除添加商品选项
      handleClose() {
        this.addDialogVisible = false;
        this.$refs.shopFormRef.resetFields();
        this.addShopForm.product = '';
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
      //删除规格
      async removeSpecById(id) {
        const confirmResult = await this.$confirm('此操作将永久删除该规格, 是否继续?', '提示', {
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
            url: '/lightspace/deleteSpecifications',
            data: param
        }).then((res) => {
          if(res.data.status == 200) {
             this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.getSpecList(1)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //修改
      //编辑出现编辑页面
      showEditDialog(id) {
        this.id = id;
        this.editDialogVisible = true;
        let param = new URLSearchParams();
        param.append('id', id);
        param.append('token',this.token)
        axios({
            method: 'post',
            url: '/lightspace/editSpecifications',
            data: param
        }).then((res)=> {
          this.editShopForm = res.data.data;
        }).catch((err) => {
          console.log(err)
        })
      },
      //修改后保存
      editSave() {
        this.$refs.shopEditFormRef.validate((valid) => {
        if(!valid) return this.$message.error('验证失败');
        let param = new FormData();
        param.append('token', this.token);
        param.append('id', this.id);
        param.append('productId', this.editShopForm.productId);
        param.append('name', this.editShopForm.name);
        param.append('price', this.editShopForm.price);
        param.append('integral', this.editShopForm.integral);
        param.append('freight', this.editShopForm.freight);
        param.append('stock', this.editShopForm.stock);
        param.append('percentage', this.editShopForm.percentage);
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/saveSpecifications'
        }).then((res) => {
          // console.log(res)
          if(res.data.status == 200) {
           this.editDialogVisible = false;
            this.$message({
              message: res.data.msg,
              type: 'success'
            });

            this.getSpecList(1);
          }

        }).catch((err) => {
          console.log(err)
        })
        })
      },
      hideEditDialog() {
         this.editDialogVisible = false;
      }
    }
  }
</script>

<style>
</style>
