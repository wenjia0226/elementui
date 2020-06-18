<template>
  <div>
    <!-- 面包屑导航区域 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>基础数据</el-breadcrumb-item>
         <el-breadcrumb-item>教师管理</el-breadcrumb-item>
     </el-breadcrumb>
     <el-card>
       <el-row :gutter="20">
           <el-col :span="6">
            <el-input placeholder="输入学校名称" v-model="query" clearable @clear="queryTeacher">
                <el-button slot="append" icon="el-icon-search" @click="queryTeacher"></el-button>
             </el-input>
           </el-col>
           <el-col :span="6">
                  <el-button type="primary" @click="addTeacher">添加老师</el-button>
           </el-col>
        </el-row>
       <el-table :data="this.content" border  stripe style="width: 100%">
          <el-table-column label="姓名" prop="name"></el-table-column>
         <el-table-column label="学校名称" prop="schoolName"></el-table-column>
         <el-table-column label="班级" prop="className"></el-table-column>
         <el-table-column label="电话" prop="phone"></el-table-column>
          <el-table-column label="密码" prop="password"></el-table-column>
         <el-table-column label="操作">
             <template slot-scope="scope">
                <el-button type="primary" size="middle" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
             </template>
         </el-table-column>
         <el-table-column label="操作">
             <template slot-scope="scope">
                <el-button type="danger"  size="middle" icon="el-icon-delete" @click ="removeTeacherById(scope.row.id)" ></el-button>
             </template>
         </el-table-column>
       </el-table>
       <!-- 搜索 -->
       <el-row v-show="this.searchTeacherList.length">
          <el-col>搜索结果</el-col>
        </el-row>
        <!-- <el-table :data="this.searchTeacherList" border  stripe style="width: 100%" v-show="this.searchTeacherList.length">
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="学校名称" prop="schoolName"></el-table-column>
          <el-table-column label="班级" prop="className"></el-table-column>
          <el-table-column label="电话" prop="phone"></el-table-column>
          <el-table-column label="密码" prop="password"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                 <el-button type="primary" size="middle" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
              </template>
          </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                 <el-button type="danger"  size="middle" icon="el-icon-delete" @click ="removeTeacherById(scope.row.id)" ></el-button>
              </template>
          </el-table-column>
        </el-table> -->
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
     <el-dialog title="添加教师" :visible.sync="addDialogVisible" width="50%" :before-close="handleClose">
         <el-form :model="addTeacherForm" :rules="addTeacherRules" ref="addTeacherRef" label-width="120px">
             <el-form-item label="姓名" prop="name" >
                 <el-input v-model="addTeacherForm.name"></el-input>
             </el-form-item>
            <el-form-item label="所属学校班级" prop='stu_cat'>
                <el-cascader :options="options" v-model="addTeacherForm.stu_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
            </el-form-item>
             <el-form-item label="电话" prop="phone">
                 <el-input v-model="addTeacherForm.phone"></el-input>
             </el-form-item>
             <el-form-item label="密码" prop="password">
                 <el-input v-model="addTeacherForm.password"></el-input>
             </el-form-item>
         </el-form>
         <span slot="footer" class="dialog-footer">
             <el-button @click="addDialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="submitTeacher">确 定</el-button>
         </span>
     </el-dialog>
     <!-- 修改用户对话框 -->
     <el-dialog title="修改教师信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
         <el-form :model="editTeacherForm" :rules="editTeacherRules" ref="editTeacherRef" label-width="100px">
             <el-form-item label="姓名" prop="name">
                 <el-input v-model="editTeacherForm.name"></el-input>
             </el-form-item>
             <el-form-item label="所属学校班级" prop='tea_cat'>
                 <el-cascader :options="options" v-model="editTeacherForm.tea_cat" :props="cateProps" @change="handleEditChange" clearable></el-cascader>
             </el-form-item>
            <!-- <el-form-item label="学校名称" prop="schoolName">
                 <el-input v-model="editTeacherForm.schoolName"></el-input>
             </el-form-item>
             <el-form-item label="班级" prop="className">
                 <el-input v-model="editTeacherForm.className"></el-input>
             </el-form-item> -->
             <el-form-item label="电话" prop="phone">
                 <el-input v-model="editTeacherForm.phone"></el-input>
             </el-form-item>
             <el-form-item label="密码" prop="password">
                 <el-input v-model="editTeacherForm.password"></el-input>
             </el-form-item>
         </el-form>
         <span slot="footer" class="dialog-footer">
             <el-button @click="editDialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="editTeacherInfo">确 定</el-button>
         </span>
     </el-dialog>
   </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'teacher',
    data () {
      return {
        token: '',
        query: '',
        currentPage: 1,
        pageSize: 5,
        total: 0,
        options: [],
        teacherList: [],
        editDialogVisible: false,
        addDialogVisible: false, //控制对话框的显示隐藏
        tea_cat: [],
        page: 1,
        size: 5,
        total:0,
        totalElements: 0,
        number: 1,
        content: [],
        addTeacherForm: {
            schoolName: '',
            className: '',
            phone: '',
            name: '',
            password: ''
        },
        addTeacherRules: {
            schoolName: [{required: true, message: '请输入学校名称', trigger: 'blur' }],
            className: [{required: true, message: '请输入班级名称', trigger: 'blur' }],
            phone: [{required: true, message: '请输入手机号', trigger: 'blur' }],
            name: [{required: true, message: '请输入姓名', trigger: 'blur' }],
            tea_cat: {required: true, message: '请选择学校班级', trigger: 'blur'},
            password: [{required: true, message: '请输入密码', trigger: 'blur' }]
        },
        cateProps: {
          label: 'name', //看到的是哪个属性
          value: 'id', // 选中的是谁的值
          children: 'children' //哪个属性实现父子节点嵌套
        },
        editTeacherForm: {
            schoolId: '',
            classId: '',
            phone: '',
            name: '',
            password: '',
            tea_cat:[]
        },
        editTeacherRules: {
            schoolName: [{required: true, message: '请输入学校名称', trigger: 'blur' }],
            className: [{required: true, message: '请输入班级名称', trigger: 'blur' }],
            phone: [{required: true, message: '请输入手机号', trigger: 'blur' }],
            name: [{required: true, message: '请输入姓名', trigger: 'blur' }],
            stu_cat: {required: true, message: '请选择学校班级', trigger: 'blur'},
            password: [{required: true, message: '请输入密码', trigger: 'blur' }]
        },
        searchTeacherList:[]
      }
    },
    created() {
      this.token = window.sessionStorage.getItem('token');
      this.getTeacherList(this.page);
      this.getOPtions();
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getTeacherList(val)
      },
      //添加老师
      submitTeacher() {
         this.$refs.addTeacherRef.validate((valid) => {
             if(!valid) return;
             let param = new URLSearchParams();
             param.append('schoolId', this.schoolId);
             param.append('classId', this.classId);
             param.append('phone', this.addTeacherForm.phone);
             param.append('password', this.addTeacherForm.password);
             param.append('name', this.addTeacherForm.name);
             param.append('token', this.token);
             axios({
                 method: 'post',
                 url: '/lightspace/addTeacher',
                 data: param
             }).then(this.handleAddTeacherSucc.bind(this))
             .catch(this.handleAddTeacherErr.bind(this))
         })
      },
      //级联选择器选择变化会触发这个函数
      handleChange() {
         this.schoolId = this.addTeacherForm.stu_cat[0];
         this.classId = this.addTeacherForm.stu_cat[1];
      },
      handleEditChange(val) {
        this.schoolId = val[0];
        this.classId = val[1];
      },
      handleAddTeacherSucc(res) {
         console.log(res);
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
           } else if(res.data.status == 10206) {
             this.$message.error(res.data.msg);
            this.addTeacherForm.schoolName = '';
          }else if(res.status == 200){
            this.addDialogVisible = false;
            this.$message.success('添加教师成功');
            this.$refs.addTeacherRef.resetFields();
            this.getTeacherList(1);
          }
      },
      handleAddTeacherErr(err) {
          console.log(err)
      },
      // 搜索
      queryTeacher() {
        if(this.query == "") {
             this.getTeacherList(1);
             this.searchTeacherList = [];
             return;
          }
          let param = new URLSearchParams();
          param.append('token', this.token);
          param.append('name', this.query);
          axios({
              method: "post",
              url: '/lightspace/queryTeacher',
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
              this.getTeacherList(1);
              this.searchTeacherList = [];
           }else if(res.status == 200) {
              this.$message.success('搜索成功');
              console.log(res)
              this.content = res.data.data;
            }
        },
        handleQueryErr(err) {
            console.log(err)
        },
      addTeacher() {
        this.addDialogVisible = true;
      },
      //关闭按钮
      handleClose() {
       this.addDialogVisible = false;
       this.$refs.addteacherRef.resetFields();
      },
      getTeacherList(page) {
        let param = new URLSearchParams();
        param.append('token', this.token);
        param.append('page', page);
        axios({
          method: 'post',
          data: param,
           url: '/lightspace/teacherList'
        }).then(this.handleGetTeacherListSucc.bind(this)).catch(this.handleGetTeacherErr.bind(this))
      },
      handleGetTeacherListSucc(res) {
        if(res.data.status == 200 && res.data.data !== '') {
         res ? res= res.data.data: '';
         this.content = res.content;
         this.totalElements = res.totalElements;
         this.size = res.size;
         this.number = res.number + 1;
         }
      },
      handleGetTeacherErr(err) {
        console.log(err)
      },
     showEditDialog (id) {
         this.editDialogVisible = true;
        let param = new URLSearchParams();
         param.append('id', id);
         param.append('token',this.token)
         axios({
             method: 'post',
             url: '/lightspace/editTeacher',
             data: param
         }).then(this.handleEditTeacherSucc.bind(this))
         .catch(this.handleEditTeacherErr.bind(this))
     },
     handleEditTeacherSucc(res) {
       if(res.data.status === 10204) {
           this.$message.error(res.data.msg);
           this.$router.push('/login');
          } else if(res.data.status == 200) {
           this.editTeacherForm = res.data.data;
           console.log(this.editTeacherForm)
         }
     },
     handleEditTeacherErr(err) {
         console.log(err)
     },
     //监听修改用户对话框的关闭事件
     editDialogClosed() {
        this.$refs.editTeacherRef.resetFields()
     },
     //修改保存
    editTeacherInfo() {
      this.$refs.editTeacherRef.validate((valid) => {
         if(!valid)  return;
         let param = new URLSearchParams();
         param.append('token', this.token);
         param.append('name', this.editTeacherForm.name);
         param.append('schooId', this.editTeacherForm.tea_cat[0]);
         param.append('classId', this.editTeacherForm.tea_cat[1]);
         param.append('phone', this.editTeacherForm.phone);
         param.append('password', this.editTeacherForm.password);
         param.append('id', this.editTeacherForm.id);
         axios({
             method: 'post',
             url: '/lightspace/saveTeacher',
             data: param
         }).then(this.handleEditSaveTeacherSucc.bind(this))
         .catch(this.handleEditSaveTeacherErr.bind(this))
         })
     },
     handleEditSaveTeacherSucc(res) {
      if(res.data.status === 10204) {
          this.$message.error(res.data.msg);
          this.$router.push('/login');
         }else if(res.data.status == 200) {
           //隐藏编辑框
           this.editDialogVisible = false;
           //提示修改成功
           this.$message.success('更新教师信息成功');
           this.getTeacherList(this.page)
         }
     },
     handleEditSaveTeacherErr(err) {
         console.log(err)
     },
     //根据id删除学校
     async removeTeacherById(id) {
         const confirmResult = await this.$confirm('此操作将永久删除该老师, 是否继续?', '提示', {
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
             url: '/lightspace/deleteTeacher',
             data: param
         }).then(this.handleDeleteTeacherSucc.bind(this))
         .catch(this.handleDeleteTeacherErr.bind(this))
         },
         handleDeleteTeacherSucc(res) {
             if(res.data.status === 10204) {
                 this.$message.error(res.data.msg);
                 this.$router.push('/login');
             } else if(res.data.status == 200) {
               this.$message.success('删除老师成功');
               this.getTeacherList(this.page)
              }
         },
         handleDeleteTeacherErr(err) {
             console.log(err)
         },
         //监听pageSize改变事件
         handleSizeChange(newSize) {
             this.pageSize = newSize;
             this.getTeacherList();
         },
         //获取级联选择器中的数据
         getOPtions() {
             let param = new URLSearchParams();
             param.append('token', this.token);
             axios({
                 method: 'post',
                 url: '/lightspace/cascade1',
                 data: param
             }).then(this.handleGetOptionSucc.bind(this)).catch(this.handleGetOptionErr.bind(this))
         },
         handleGetOptionSucc (res) {
           if(res.data.status === 10204) {
               this.$message.error(res.data.msg);
               this.$router.push('/login');
           } else if(res.data.status == 200) {
              this.options =  res.data.data;
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
