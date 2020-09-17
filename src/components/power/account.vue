<template>
    <div>
          <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>账号管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="输入账号"   v-model="query" clearable @clear="searchAccount">
                    <el-button slot="append" icon="el-icon-search"  @click="searchAccount"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="showAddCountDiaglog">新增账号</el-button>
                </el-col>
            </el-row>
              <!-- 用户列表 -->
            <el-table
             :data="userList" border highlight-current-row   ref="table" stripe style="width: 100%" v-show="!this.searchAccountList.length">
             <!-- <el-table-column>
              @row-click="clickTable" row-key="id"  ref="refTable"
               <template slot-scope="props">
                 <el-row>
                   <el-col :span="16">
                     <el-table  border :data="props.row.children" stripe>
                        <el-table-column align="center"label="学校" prop="name"></el-table-column>
                         <el-table-column align="center"label="所属区" prop="regionName"></el-table-column>
                        <el-table-column  align="center" label="操作">
                          <template slot-scope="scope">
                             <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteSchool(scope.row.id)"></el-button>
                          </template>
                        </el-table-column>
                     </el-table>
                   </el-col>
                 </el-row>
               </template>
             </el-table-column> -->
            <el-table-column label="登录账号" prop="loginName"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
             <el-table-column label="角色" prop="roleName"></el-table-column>
            <el-table-column label="创建时间" prop="genTime"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeUserById(scope.row.id)"></el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary"  size="middle"  @click="showAddSchoolDialog(scope.row.id)" >添加集团从属学校</el-button>
                </template>
            </el-table-column>
             <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="text" @click="toogleExpand(scope.row)">查看从属学校</el-button>
              </template>
            </el-table-column>
            <el-table-column type="expand" width="1">
              <template slot-scope="props">
               <el-table  border :data="props.row.children" stripe>
                  <el-table-column align="center"label="学校" prop="name"></el-table-column>
                   <el-table-column align="center"label="所属区" prop="regionName"></el-table-column>
                  <el-table-column  align="center" label="操作">
                    <template slot-scope="scope">
                       <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteSchool(scope.row.id)"></el-button>
                    </template>
                  </el-table-column>
               </el-table>
               </template>
            </el-table-column>
            </el-table>
            <!-- 搜索列表 -->
            <el-table :data="searchAccountList" border  stripe style="width: 100%" v-show="this.searchAccountList.length">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="登录账号" prop="loginName"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                 <el-table-column label="角色" prop="roleName"></el-table-column>
                <el-table-column label="创建时间" prop="genTime"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeUserById(scope.row.id)"></el-button>
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
         <el-dialog title="添加从属学校"  :visible.sync="showAddSchool" width="50%" :before-close="handleShoolClose">
            <el-form :model="addSchoolForm" label-width="120px">
                 <el-form-item label="学校选择" >
                     <el-select v-model="school" placeholder="请选择" @change="handleAddSchool">
                        <el-option
                          v-for="item in schoolList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                 </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleShoolClose">取 消</el-button>
                <el-button type="primary" @click="submitAddSchool" >确 定</el-button>
            </span>
        </el-dialog>
         <!-- 添加角色对话框 -->
        <el-dialog title="添加角色"  :visible.sync="addAccountDialogVisible" width="50%"  :before-close="handleClose">
           <el-form :model="addAccountForm" :rules="addAccountRules" ref="accountFormRef" label-width="120px">
            <el-form-item label="姓名" prop="name" >
                <el-input v-model="addAccountForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="loginName">
                <el-input v-model="addAccountForm.loginName" clearable></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input v-model="addAccountForm.password" clearable></el-input>
            </el-form-item>
            <el-form-item label="微信昵称" prop="wechatName">
                <el-input v-model="addAccountForm.wechatName" clearable></el-input>
            </el-form-item>
            <el-form-item label="分配角色" prop="role">
                <el-select v-model="addAccountForm.role" placeholder="请选择" @change="handleRoleChange">
                    <el-option v-for="item in roleList" :key="item.roleId"  :label="item.roleName" :value="item" clearable>
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" width="100%" v-if="addAccountForm.role == '超级管理员' " v-show="false">
                <!-- <el-cascader ref="myCascader" :options="options" v-model="addAccountForm.selectedOptions" :props="cateProps" @change="handleChange" clearable></el-cascader> -->
            </el-form-item>
            <el-form-item label="所属学校" prop="schoolOptions" width="100%" v-else-if="addAccountForm.role == '校级管理员' ">
                <el-cascader ref="myCascader" :options="schoolOptions" v-model="addAccountForm.schoolOptions" :props="cateProps" @change="handleSchoolChange" clearable></el-cascader>
            </el-form-item>
            <el-form-item label="所属班级" prop="selectedOptions" width="100%" v-else-if="addAccountForm.role == '班级管理员' ">
                <el-cascader ref="myCascader" :options="options" v-model="addAccountForm.selectedOptions" :props="cateProps" @change="handleChange" clearable></el-cascader>
            </el-form-item>
            <el-form-item label="所属班级" prop="selectedOptions" width="100%" v-else-if="addAccountForm.role == '地区管理员'">
                <el-cascader ref="myCascader" :options="options" v-model="addAccountForm.selectedOptions" :props="cateProps" @change="handleChange" clearable></el-cascader>
            </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submitAccount" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
    created() {
        this.token = window.sessionStorage.getItem('token');
         let user = window.sessionStorage.getItem('token');
         this.identity = user.split('-') [1];
         this.fondId = user.split('-')[2];
         this.getOPtions();
         this.getUserList();
         this.getAllSchool();

    },
     data() {
         return {
            token: '',
            page: 1,
            totalElements: 0,
            number: 1,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            size: 10,
            addAccountDialogVisible: false,
            roleList: [],  //角色列表
            query: '',
            searchAccountList: [],
            showAddSchool: false,
            comschoolId: '',
            comroleId: '',
            school: '',
            schoolList: [],
            addSchoolForm: {

            },
            addAccountForm: {
               name: '',
               loginName: '',
               password: '',
               wechatName: '',
               role: '', //角色下拉框默认选中
               selectedOptions: [],
               schoolOptions: [],
              id: ''
           },
           addAccountRules: {
                name: [{required: true, message: '请输入所属人', trigger: 'blur' }],
                loginName: [{required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{required: true, message: '请输入密码', trigger: 'blur' }],
                selectedOptions: [{required: true, message: '请选择所属学校班级', trigger: 'change' }],
                schoolOptions:  [{required: true, message: '请选择所属学校', trigger: 'change' }],
                role:  [{required: true, message: '请选择角色', trigger: 'change' }]
           },
            cateProps: {
               label: 'name', //看到的是哪个属性
               value: 'id', // 选中的是谁的值
               children: 'children' //哪个属性实现父子节点嵌套
            },
            roleId: '', // 选中角色的id,
            schoolId: '',
            classId: '',
            userList: [], // 用户列表
            currentPage: 1,
            pageSize: 5,
            show: true,
            options: [], //级联绑定的数据
            schoolOptions: []

         }
     },
     methods: {
       toogleExpand(row) {
          let $table = this.$refs.table;
         this.userList.map((item) => {
            if (row.id != item.id) {
             $table.toggleRowExpansion(item, false)
            }
         })

          $table.toggleRowExpansion(row)
          this.roleId = row.id
       },
       //根据id删除学校
       async deleteSchool(id) {
       const confirmResult = await this.$confirm('此操作将接触该集团学校绑定, 是否继续?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
       }).catch(err => err)
       if(confirmResult !== 'confirm') {
           return this.$message.info('已经取消删除')
       }
       console.log(this.roleId)
       let param = new URLSearchParams();
       param.append('token', this.token);
       param.append('schoolId', id);
       param.append('userId', this.roleId);
       axios({
           method: 'post',
           url: '/lightspace/deleteUserSchool',
           data: param
       }).then(this.handleDeleteUserShoolSucc.bind(this))
       .catch((err) => {console.log(err)})
       },
       handleDeleteUserShoolSucc(res) {
           if(res.data.status === 10204) {
               this.$message.error(res.data.msg);
               this.$router.push('/login');
           } else if(res.data.status == 200) {
             this.$message.success('删除学校成功');
             this.getUserList()
           }

       },
       showAddSchoolDialog(id) {
         this.comroleId = id;
         this.showAddSchool = true;
       },
       handleAddSchool(val) {
         this.comschoolId = val;
       },
       handleShoolClose() {
         this.school = '';
         this.comschoolId = '';
         this.showAddSchool = false;
       },
       submitAddSchool() {
         let param = new FormData();
         param.append('token',this.token);
         param.append('schoolId', this.comschoolId);
         param.append('userId', this.comroleId);
         axios({
           method: 'post',
           data: param,
           url: '/lightspace/addUserSchool'
         }).then(this.handleAddComSchool.bind(this)).catch((err) => {console.log(err)})
       },
       handleAddComSchool(res) {
         if(res.data.status == 200) {
           this.$message.success('恭喜您' + res.data.msg);
           this.showAddSchool = false;
         }else if(res.data.status == 10206) {
           this.$message.error(res.data.msg);
           this.showAddSchool = false;
         }
       },
       clickTable(row,index,e){
          this.nowGrade = row.name;
          this.currentRow = row;
          this.$refs.refTable.toggleRowExpansion(row)
        },
       //监听页码值改变事件
       handleCurrentChange(val) {
         this.page = val;
         this.getUserList();
       },
       searchAccount() {
          if(this.query == "") {
             this.getUserList();
             this.searchAccountList = [];
             return;
          }
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('name', this.query);
            axios({
                method: "post",
                url: '/lightspace/queryUser',
                data: param
            }).then(this.handleQuerySucc.bind(this))
            .catch(this.handleQueryErr.bind(this))
        },
       handleQuerySucc(res) {
         if(res.data.status === 10204) {
             this.$message.error(res.data.msg);
             this.$router.push('/login');
         } else if(res.data.status == 10213) {
             this.$message.error(res.data.msg);
             this.getUserList();
             this.searchAccountList = [];
          }else if(res.data.status == 200) {
             this.$message.success('搜索成功');
             this.searchAccountList = res.data.data;
           }
       },
        handleQueryErr(err) {
            console.log(err)
        },
       //关闭按钮
         handleClose() {
          this.addAccountDialogVisible = false;
          this.$refs.accountFormRef.resetFields();
          this.addAccountForm.wechatName = ''
         },
         showCascade() {
            if(this.addAccountForm.role == '超级管理员') {
                 this.show = false;
             }else if(this.addAccountForm.role == '校级管理员') {

             }else if (this.addAccountForm.role == '班级管理员') {

             }else {

             }
         },
         getUserList() {
             let param = new URLSearchParams();
             param.append('token', this.token);
             param.append('page', this.page);
             axios({
                 method: 'post',
                 url: '/lightspace/userList',
                 data: param
             }).then(this.handleGetUserListSucc.bind(this))
             .catch(this.handleGetUserListErr.bind(this))
         },
         handleGetUserListErr(err) {
             console.log(err)
         },
         handleGetUserListSucc(res) {
           console.log(res)
             if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
             } else if(res.data.status == 200) {
                 res ? res= res.data.data: '';
                 this.userList = res.content;
                 this.totalElements = res.totalElements;
                 this.size = res.size;
                 this.number = res.number + 1;
             }

         },
         showAddCountDiaglog() {
             let param = new URLSearchParams();
             param.append('token', this.token);
             axios({
                 method: 'post',
                 url: '/lightspace/roleList',
                 data: param
             }).then(this.handleGetRoleListSucc.bind(this))
             .catch(this.handleGetRoleListErr.bind(this))


         },
         handleGetRoleListSucc(res) {
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
               this.roleList = res.data.data;
               this.addAccountDialogVisible = true
            }
         },
         handleGetRoleListErr(err) {
             console.log(err)
         },
         submitAccount() {
             this.$refs.accountFormRef.validate((valid) => {
                if(!valid) return this.$message.error('验证失败');
                let param = new URLSearchParams();
                param.append('classId', this.classId);
                param.append('schoolId', this.schoolId);
                param.append('roleId', this.roleId);
                param.append('token' ,this.token);
                param.append('loginName' ,this.addAccountForm.loginName);
                param.append('name', this.addAccountForm.name);
                param.append('password', this.addAccountForm.password);
                param.append('wechatName', this.addAccountForm.wechatName);
                axios({
                    method: 'post',
                    url: '/lightspace/addUser',
                    data: param
                }).then(this.handleAddUserSucc.bind(this))
                .catch(this.handleAddUserErr.bind(this))
                })
         },
         handleAddUserSucc(res) {
           if(res.data.status === 10204) {
               this.$message.error(res.data.msg);
               this.$router.push('/login');
           } else if(res.data.status == 10205) {
               this.$message.error(res.data.msg);
               this.addAccountForm.loginName = '';
             }else if(res.data.status == 200) {
               this.$message.success('添加用户成功');
               this.addAccountDialogVisible  = false;
               this.$refs.accountFormRef.resetFields();
               this.getUserList();
             }
         },
         handleAddUserErr(err) {
             console.log(err)
         },
         handleChange(item) {
          this.addAccountForm.selectedOptions = item;
          this.schoolId = item[0];
          this.classId = item[1];
         },
         handleSchoolChange(item) {
          this.addAccountForm.selectedOptions = item;
          this.schoolId = item[0];
          this.classId = '';
         },
         getAllSchool() {
           let param = new FormData();
           param.append('token', this.token);
           axios({
             method: 'post',
             data:param,
             url: '/lightspace/schoolList'
           }).then((res) => {
             console.log(res)
             if(res.data.data) {
                this.schoolList = res.data.data;
             }
           }).catch((err)=> {console.log(err)})
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
               let arr1 = this.options;
               for(var i in arr1) {
                       this.schoolOptions.push({
                           name: arr1[i].name,
                           id: arr1[i].id
               })
               }
            }
        },
        handleGetOptionErr(err) {
            console.log(err)
        },
        handleRoleChange(item) {
            this.addAccountForm.role = item.roleName;
            this.addAccountForm.id = item.roleId;
            this.roleId = item.roleId;
        },
        //监听pageSize改变事件
        handleSizeChange(newSize) {
            this.pageSize = newSize
            this.getUserList();
        },

        //删除用户
        async removeUserById(id) {
            const confirmResult = await this.$confirm('此操作将永久删除该学校, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err => err)
            if(confirmResult !== 'confirm') {
                return this.$message.info('已经取消删除')
            }
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('id', id);
            axios({
                method: 'post',
                url: '/lightspace/deleteUser',
                data: param
            }).then(this.handleDeleteUserSucc.bind(this))
            .catch(this.handleDeleteUserErr.bind(this))
            },
            handleDeleteUserSucc(res) {
                if(res.data.status === 10204) {
                   this.$message.error(res.data.msg);
                   this.$router.push('/login');
                } else if(res.data.status == 200) {
                  this.$message.success('删除用户成功');
                  this.userList = res.data.data;
                  const totalPage = Math.ceil(this.userList.length / this.pageSize) // 总页数
                  this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
                  this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
                }

            },
            handleDeleteUserErr(err) {
                console.log(err)
            }
     }
}
</script>
<style lang="less" scoped>

</style>
