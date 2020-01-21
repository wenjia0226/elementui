<template>
    <div>
          <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限分配</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
             <el-row :gutter="20">
                 <el-col :span="6">
                     <el-input placeholder="输入角色名称"  clearable>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                     </el-input>
                 </el-col>
                 <el-col :span="6">
                        <el-button type="primary" @click="addRoleDialogVisible = true">添加角色</el-button>
                 </el-col>
             </el-row>
           <!-- 学校列表 -->
            <el-table :data="roleList.slice((currentPage-1) * pageSize, currentPage * pageSize)" border  stripe style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学校名称" prop="roleName"></el-table-column>
                <el-table-column label="描述" prop="description"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeRoleById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页功能 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="roleList.length">
            </el-pagination>
        </el-card>
         <!-- 添加角色对话框 -->
        <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible" width="50%">
           <!-- 添加学校 -->
           <el-form :model="addRoleForm" :rules="addRoleRules" ref="roleFormRef" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addRoleForm.roleName" clearable></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input v-model="addRoleForm.description" clearable></el-input>
                </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitRole" >确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑角色对话框 -->
        <el-dialog title="修改角色" :visible.sync="editRoleDialogVisible" width="50%">
           <!-- 添加学校 -->
           <el-form :model="editRoleForm" :rules="editRoleRules" ref="editroleFormRef" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="editRoleForm.roleName" clearable></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input v-model="editRoleForm.description" clearable></el-input>
                </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRoleInfo" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getRoleList();       
    },
   data() {
       return {
           token: '',
           addRoleDialogVisible: false,
           editRoleDialogVisible: false,
           addRoleForm: {
               roleName: '',
               description: ''
           },
           addRoleRules: {
                roleName: [{required: true, message: '请输入角色名称', trigger: 'blur' }],
           },
           editRoleForm: {
                roleName: '',
               description: '',
               id: ''
           },
           editRoleRules: {
                roleName: [{required: true, message: '请输入角色名称', trigger: 'blur' }]
           },
           roleList: [],
           currentPage: 1,
           pageSize: 5,
           total: 0,

       }
   },
   methods: {
        //提交表单
        submitRole() {
           this.$refs.roleFormRef.validate((valid) => {
               if(!valid) return;
               let param = new URLSearchParams();
               param.append('roleName', this.addRoleForm.roleName);
               param.append('description', this.addRoleForm.description);
               param.append('token', this.token)
               axios({
                   method: 'post',
                   url: '/api/addRole',
                   data: param
               }).then(this.handleAddRoleSucc.bind(this))
               .catch(this.handleAddRoleErr.bind(this))
           })  
        },
        handleAddRoleSucc(res) {
            if(res.status !== 200)  return this.$message.error('添加角色失败');
            this.addRoleDialogVisible = false;
            this.$message.success('添加角色成功');
            this.$refs.roleFormRef.resetFields();
            this.getRoleList();
        },
        handleAddRoleErr(err) {
            console.log(err)
        },
        //列表页
        getRoleList() {
             let param = new URLSearchParams();
             param.append('token', this.token);
             axios({
                 method: 'post',
                 url: '/api/roleList',
                 data: param
             }).then(this.handleGetRoleSucc.bind(this))
               .catch(this.handleGetRoleErr.bind(this))
        },
        handleGetRoleSucc(res) {
            if(res.status !== 200) return this.$message.error('获取角色列表失败');
            this.roleList = res.data.data;
            
        },
        handleGetRoleErr(error) {
           console.log(error)
        },
         //监听pageSize改变事件
        handleSizeChange(newSize) {
            this.pageSize = newSize
            this.getRoleList();
        },
        //监听页码值改变事件
        handleCurrentChange(val) {
           this.currentPage = val;
        },
        //点击展示编辑页面
        showEditDialog (id) {
            this.addRoleDialogVisible = true;
            this.editRoleForm.id = id;
           let param = new URLSearchParams();
            param.append('id', id);
            param.append('token',this.token)
            axios({
                method: 'post',
                url: '/api/editRole',
                data: param
            }).then(this.handleEditRoleSucc.bind(this))
            .catch(this.handleEditRoleErr.bind(this))
        },
        handleEditRoleSucc(res) {
            res ? res = res.data: '';
            this.editRoleForm = res.data
        },
        handleEditRoleErr(err) {
            console.log(err)
        },
        editRoleInfo() {
            this.$refs.editroleFormRef.validate((valid) => {
                if(!valid)  return;
                let param = new URLSearchParams();
                param.append('token', this.token);
                param.append('roleName', this.editRoleForm.roleName);
                param.append('description', this.editRoleForm.description);
                param.append('id', this.editRoleForm.id)
                axios({
                    method: 'post',
                    url: '/api/saveRole',
                    data: param
                }).then(this.handleEditSaveSchoolSucc.bind(this))
                .catch(this.handleEditSaveSchoolErr.bind(this))   
                })
        },
        handleEditSaveSchoolSucc(res) {
             if(res.status !==200) return; 
            //发起修改用户信息的数据请求
             this.schoolList = res.data.data;
            //隐藏编辑框
            this.editDialogVisible = false;
            //提示修改成功
            this.$message.success('更新学校信息成功');
        },
        handleEditSaveSchoolErr(err) {
            console.log(err)
        },
        //根据id删除学校
        async removeRoleById(id) {
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
            param.append('id', id)
            axios({
                method: 'post',
                url: '/api/deleteRole',
                data: param
            }).then(this.handleDeleteRoleSucc.bind(this))
            .catch(this.handleDeleteRoleErr.bind(this))
            },
            handleDeleteRoleSucc(res) {
                if(res.status !== 200) return this.$message.error('删除角色失败');
                this.$message.success('删除角色成功');
                this.getRoleList();  
            },
            handleDeleteRoleErr(err) {
                console.log(err)
            }
   }
}
</script>
<style lang="less" scoped>

</style>