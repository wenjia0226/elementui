<template>
    <div>
       <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础数据</el-breadcrumb-item>
            <el-breadcrumb-item>学校设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
             <el-row :gutter="20">
                 <el-col :span="6">
                     <el-input placeholder="输入学校名称" v-model="query" clearable @clear="getSchoolList">
                        <el-button slot="append" icon="el-icon-search" @click="querySchool"></el-button>
                     </el-input>
                 </el-col>
                 <el-col :span="6">
                        <el-button type="primary" @click="addDialogVisible = true">添加学校</el-button>
                 </el-col>
             </el-row>
              <!-- 用户列表 -->
            <el-table :data="schoolList.slice((currentPage-1) * pageSize, currentPage * pageSize)" border  stripe style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学校名称" prop="name"></el-table-column>
                <el-table-column label="学校地址" prop="address"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
                        <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeSchoolById(scope.row.id)"></el-button>
                        <!-- <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="success" size="mini" icon="el-icon-setting"></el-button>
                        </el-tooltip> -->
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
                :total="schoolList.length">
            </el-pagination>
        </el-card>
        <!-- 添加用户的对话框 -->
        <el-dialog title="添加学校" :visible.sync="addDialogVisible" width="50%">
           <!-- 添加学校 -->
           <el-form :model="addSchoolForm" :rules="addSchoolRules" ref="schoolFormRef" label-width="100px">
                <el-form-item label="学校名称" prop="name">
                    <el-input v-model="addSchoolForm.name"></el-input>
                </el-form-item>
                <el-form-item label="学校地址" prop="address">
                    <el-input v-model="addSchoolForm.address"></el-input>
                </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitSchool" >确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog title="修改学校" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editSchoolForm" :rules="editSchoolRules" ref="editSchoolRef" label-width="100px">
                <el-form-item label="学校名称" prop="name">
                    <el-input v-model="editSchoolForm.name"></el-input>
                </el-form-item>
                <el-form-item label="学校地址" prop="address">
                    <el-input v-model="editSchoolForm.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSchoolInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'school',
    data () {
       return{
           token: '',
           query: '',
           currentPage: 1,
           pageSize: 5,
           total: 0,
           schoolList: [],
           editDialogVisible: false,
           addDialogVisible: false, //控制对话框的显示隐藏
           addSchoolForm: {
               num: '',
               name: '',
               address: ''
           },
           addSchoolRules: {
               name: [{required: true, message: '请输入学校名称', trigger: 'blur' }],
               address: [{required: true, message: '请输入具体地址', trigger: 'blur' }],
           },
           editSchoolForm: {
               name: '',
               address:'',
               id: ''
           },
           editSchoolRules: {
                name: [{required: true, message: '请输入学校名称', trigger: 'blur' }],
                address: [{required: true, message: '请输入具体地址', trigger: 'blur' }],
           }           
       } 
    },
    created() {
        this.getSchoolList()
        this.token = window.sessionStorage.getItem('token');
        console.log(this.token, 'school')
    },
    methods:{
        getSchoolList() {
            let param2 = new URLSearchParams();
             param2.append('token', this.token);
             axios({
                 method: 'post',
                 url: '/api/schoolList',
                 data: param2,
             }).then(this.handleGetSchoolSucc.bind(this))
               .catch(this.handleGetSchoolErr.bind(this))
        },
        handleGetSchoolSucc(res) {
            this.schoolList = res.data.data;
        },
        handleGetSchoolErr(err) {
            console.log(err)
        },
        //搜索
        querySchool() {
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('name', this.query);
            axios({
                method: "post",
                url: '/api/querySchool',
                data: param 
            }).then(this.handleQuerySucc.bind(this))
            .catch(this.handleQueryErr.bind(this))
        },
        handleQuerySucc(res) {
            if(res.status !== 200) return this.$message.error('未搜索到内容');
            this.schoolList = res.data.data;
        },
        handleQueryErr(err) {
            console.log(err)
        },
        //提交表单
        submitSchool() {
           this.$refs.schoolFormRef.validate((valid) => {
               if(!valid) return;
               let param = new URLSearchParams();
               param.append('name', this.addSchoolForm.name);
               param.append('address', this.addSchoolForm.address);
               param.append('token', this.token)
               axios({
                   method: 'post',
                   url: '/api/addSchool',
                   data: param
               }).then(this.handleAddSchoolSucc.bind(this))
               .catch(this.handleAddSchoolErr.bind(this))
           })  
        },
        handleAddSchoolSucc(res) {
            if(res.status !== 200)  return this.$message.error('添加学校失败');
            this.addDialogVisible = false;
            this.$message.success('添加学校成功');
            this.getSchoolList();
        },
        handleAddSchoolErr(err) {
            console.log(err)
        },
        //监听pageSize改变事件
        handleSizeChange(newSize) {
            this.pageSize = newSize
            this.getSchoolList();
        },
        //监听页码值改变事件
        handleCurrentChange(val) {
           this.currentPage = val;
        },
        //点击展示编辑页面
        showEditDialog (id) {
            this.editDialogVisible = true;
            let param = new URLSearchParams();
            param.append('id', id);
            param.append('token',this.token)
            axios({
                method: 'post',
                url: '/api/editSchool',
                data: param
            }).then(this.handleEditSchoolSucc.bind(this))
            .catch(this.handleEditSchoolErr.bind(this))
        },
        handleEditSchoolSucc(res) {
            res ? res = res.data: '';
            this.editSchoolForm = res.data
        },
        handleEditSchoolErr(err) {
            console.log(err)
        },
        //监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editSchoolRef.resetFields()
        },
        //修改保存
        editSchoolInfo() {
            this.$refs.editSchoolRef.validate((valid) => {
                if(!valid)  return;
                let param = new URLSearchParams();
                param.append('token', this.token);
                param.append('name', this.editSchoolForm.name);
                param.append('address', this.editSchoolForm.address);
                param.append('id', this.editSchoolForm.id)
                axios({
                    method: 'post',
                    url: '/api/saveSchool',
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
        async removeSchoolById(id) {
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
                url: '/api/deleteSchool',
                data: param
            }).then(this.handleDeleteShoolSucc.bind(this))
            .catch(this.handleDeleteSchoolErr.bind(this))
            },
            handleDeleteShoolSucc(res) {
                if(res.status !== 200) return this.$message.error('删除学校失败');
                this.$message.success('删除学校成功');
                this.getSchoolList();  
            },
            handleDeleteSchoolErr(err) {
                console.log(err)
            }
    }
}
</script>
<style lang="less" scoped>
.el-card{
    
}
</style>