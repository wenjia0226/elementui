<template>
  <div>
    <!-- 面包屑导航区域 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>基础数据</el-breadcrumb-item>
         <el-breadcrumb-item>店员管理</el-breadcrumb-item>
     </el-breadcrumb>
     <el-card>
       <el-row :gutter="20">
           <el-col :span="6">
            <el-input placeholder="输入店员姓名" v-model="query" clearable @clear="queryClert">
                <el-button slot="append" icon="el-icon-search" @click="queryClert"></el-button>
             </el-input>
           </el-col>
           <el-col :span="6">
                  <el-button type="primary" @click="addClert">添加店员</el-button>
           </el-col>
        </el-row>
       <el-table :data="this.content" border  stripe style="width: 100%">
          <el-table-column label="姓名" prop="name"></el-table-column>
         <el-table-column label="登录账号" prop="loginName"></el-table-column>
         <el-table-column label="密码" prop="password"></el-table-column>
         <el-table-column label="所属门店" prop="partnershipName"></el-table-column>
         <el-table-column label="生成时间" prop="genTime"></el-table-column>

         <el-table-column label="操作">
             <template slot-scope="scope">
                <el-button type="primary" size="middle" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
             </template>
         </el-table-column>
         <el-table-column label="操作">
             <template slot-scope="scope">
                <el-button type="danger"  size="middle" icon="el-icon-delete" @click ="removeClertById(scope.row.id)" ></el-button>
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
     <!-- 添加对话框 -->
     <el-dialog title="添加店员" :visible.sync="addDialogVisible" width="50%" :before-close="handleClose">
         <el-form :model="addClertForm" :rules="addClertRules" ref="addClertRef" label-width="120px">
             <el-form-item label="姓名" prop="name" >
                 <el-input v-model="addClertForm.name"></el-input>
             </el-form-item>
             <el-form-item label="登录账号" prop="loginName" >
                 <el-input v-model="addClertForm.loginName"></el-input>
             </el-form-item>
             <el-form-item label="密码" prop="password">
                 <el-input v-model="addClertForm.password"></el-input>
             </el-form-item>
            <el-form-item label="所属门店" prop='coorparation'>
                <el-select v-model="addClertForm.coorparation" placeholder="请选择"   @change="handleChange">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
         </el-form>
         <span slot="footer" class="dialog-footer">
             <el-button @click="addDialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="submitClert">确 定</el-button>
         </span>
     </el-dialog>
     <!-- 修改用户对话框 -->
     <el-dialog title="修改店员信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
       <el-form :model="editClertForm" :rules="editClertRules" ref="editClertRef" label-width="120px">
           <el-form-item label="姓名" prop="name" >
               <el-input v-model="editClertForm.name"></el-input>
           </el-form-item>
           <el-form-item label="登录账号" prop="loginName" >
               <el-input v-model="editClertForm.loginName"></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="password">
               <el-input v-model="editClertForm.password"></el-input>
           </el-form-item>
          <el-form-item label="所属门店" prop='partnershipId'>
              <el-select v-model="editClertForm.partnershipId" placeholder="请选择"   @change="handleEditChange">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
       </el-form>
         <span slot="footer" class="dialog-footer">
             <el-button @click="editDialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="editClertInfo">确 定</el-button>
         </span>
     </el-dialog>
   </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Clert',
    data () {
      return {
        id: '',
        token: '',
        query: '',
        currentPage: 1,
        pageSize: 5,
        total: 0,
        options: [],
        ClertList: [],
        content: [],
        editDialogVisible: false,
        addDialogVisible: false, //控制对话框的显示隐藏
        tea_cat: [],
        addClertForm: {
            loginName: '',
            name: '',
            password: '',
            coorparation: ''
        },
        page: 1,
        size: 5,
        total:0,
        totalElements: 0,
        number: 1,
        addClertRules: {
            coorparation: [{required: true, message: '请选择所属门店', trigger: 'blur' }],
            name: [{required: true, message: '请输入姓名', trigger: 'blur' }],
            loginName: {required: true, message: '请输入登录账号', trigger: 'blur'},
            password: [{required: true, message: '请输入密码', trigger: 'blur' }]
        },
        cateProps: {
          label: 'name', //看到的是哪个属性
          value: 'id', // 选中的是谁的值
          children: 'children' //哪个属性实现父子节点嵌套
        },
        editClertForm: {
           loginName: '',
           name: '',
           password: '',
           coorparation: ''
        },
        editClertRules: {
           partnershipId: [{required: true, message: '请选择所属门店', trigger: 'blur' }],
           name: [{required: true, message: '请输入姓名', trigger: 'blur' }],
           loginName: {required: true, message: '请输入登录账号', trigger: 'blur'},
           password: [{required: true, message: '请输入密码', trigger: 'blur' }]
        },
        searchClertList:[]
      }
    },
    created() {
      this.token = window.sessionStorage.getItem('token');
      this.getClertList(this.page);
      this.getOPtions();
    },
    methods: {
      handleChange(val) {
        this.addClertForm.coorparation = val;
      },
      handleEditChange(val) {
        this.editClertForm.partnershipId = val;
      },
      //添加店员
      submitClert() {
         this.$refs.addClertRef.validate((valid) => {
             if(!valid) return;
             let param = new URLSearchParams();
             param.append('partnershipId', this.addClertForm.coorparation);
             param.append('loginName', this.addClertForm.loginName);
             param.append('password', this.addClertForm.password);
             param.append('name', this.addClertForm.name);
             param.append('token', this.token);
             axios({
                 method: 'post',
                 url: '/lightspace/addClert',
                 data: param
             }).then(this.handleAddClertSucc.bind(this))
             .catch(this.handleAddClertErr.bind(this))
         })
      },
      handleAddClertSucc(res) {
       console.log(res);
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
           } else if(res.data.status == 10206) {
             this.$message.error(res.data.msg);
            this.addClertForm.schoolName = '';
          }else if(res.status == 200){
            this.addDialogVisible = false;
            this.$message.success('添加店员成功');
            this.$refs.addClertRef.resetFields();
            this.getClertList(1);
          }
      },
      handleAddClertErr(err) {
          console.log(err)
      },
      // 搜索
      queryClert() {
        if(this.query == "") {
             this.getClertList(1);
             this.searchClertList = [];
             return;
          }
          let param = new URLSearchParams();
          param.append('token', this.token);
          param.append('name', this.query);
          axios({
              method: "post",
              url: '/lightspace/queryClert',
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
              this.getClertList(1);
              this.searchClertList = [];
           }else if(res.status == 200) {
              this.$message.success('搜索成功');
              this.searchClertList = res.data.data;
            }
        },
        handleQueryErr(err) {
            console.log(err)
        },
      addClert() {
        this.addDialogVisible = true;
      },
      //关闭按钮
      handleClose() {
       this.addDialogVisible = false;
       this.$refs.addClertRef.resetFields();
      },
      getClertList(page) {
        let param = new URLSearchParams();
        param.append('token', this.token);
        param.append('page', page)
        axios({
          method: 'post',
          data: param,
           url: '/lightspace/clertList'
        }).then(this.handleGetClertListSucc.bind(this)).catch(this.handleGetClertErr.bind(this))
      },
      handleGetClertListSucc(res) {
         // console.log(res)
        if(res.data.status == 200 && res.data.data !== '') {
         res ? res= res.data.data: '';
         this.content = res.content;
         this.totalElements = res.totalElements;
         this.size = res.size;
         this.number = res.number + 1;
         }
      },
      handleGetClertErr(err) {
        console.log(err)
      },
     showEditDialog (id) {
       this.id = id;
         this.editDialogVisible = true;
        let param = new URLSearchParams();
         param.append('id', id);
         param.append('token',this.token)
         axios({
             method: 'post',
             url: '/lightspace/editClert',
             data: param
         }).then(this.handleEditClertSucc.bind(this))
         .catch(this.handleEditClertErr.bind(this))
     },
     handleEditClertSucc(res) {
       // console.log(res)
       if(res.data.status === 10204) {
           this.$message.error(res.data.msg);
           this.$router.push('/login');
          } else if(res.data.status == 200) {
           this.editClertForm = res.data.data;
         }
     },
     handleEditClertErr(err) {
         console.log(err)
     },
     //监听修改用户对话框的关闭事件
     editDialogClosed() {
        this.$refs.editClertRef.resetFields()
     },
     //修改保存
    editClertInfo() {
      this.$refs.editClertRef.validate((valid) => {
         if(!valid)  return;
         let param = new URLSearchParams();
         param.append('token', this.token);
         param.append('name', this.editClertForm.name);
         param.append('id', this.id);
         param.append('loginName', this.editClertForm.loginName);
         param.append('password', this.editClertForm.password);
         param.append('partnershipId', this.editClertForm.partnershipId)
         axios({
             method: 'post',
             url: '/lightspace/saveClert',
             data: param
         }).then(this.handleEditSaveClertSucc.bind(this))
         .catch(this.handleEditSaveClertErr.bind(this))
         })
     },
     handleEditSaveClertSucc(res) {
      if(res.data.status === 10204) {
          this.$message.error(res.data.msg);
          this.$router.push('/login');
         }else if(res.data.status == 200) {

           //隐藏编辑框
           this.editDialogVisible = false;
           //提示修改成功
           this.$message.success('更新学校信息成功');
           this.getClertList(this.page)
         }
     },
     handleEditSaveClertErr(err) {
         console.log(err)
     },
     //根据id删除学校
     async removeClertById(id) {
         const confirmResult = await this.$confirm('此操作将永久删除该店员, 是否继续?', '提示', {
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
             url: '/lightspace/deleteClert',
             data: param
         }).then(this.handleDeleteClertSucc.bind(this))
         .catch(this.handleDeleteClertErr.bind(this))
         },
         handleDeleteClertSucc(res) {
             if(res.data.status === 10204) {
                 this.$message.error(res.data.msg);
                 this.$router.push('/login');
             } else if(res.data.status == 200) {
               this.$message.success('删除店员成功');
               this.getClertList(this.page);
             }
         },
         handleDeleteClertErr(err) {
             console.log(err)
         },
         //监听pageSize改变事件
         handleSizeChange(newSize) {
             this.pageSize = newSize;
             this.getClertist(newSize);
         },
         //监听页码值改变事件
         handleCurrentChange(val) {
           this.getClertList(val)
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
         },
    }
  }
</script>

<style>
</style>
