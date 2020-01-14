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
                     <el-input placeholder="输入学校名称" v-model="query" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="getSchoolList"></el-button>
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
                    <template>
                        <el-button type="primary" size="middle" icon="el-icon-edit" ></el-button>
                        <el-button type="danger"  size="middle" icon="el-icon-delete"></el-button>
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
                :total="7">
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
                <el-button type="primary" @click="submitSchool">确 定</el-button>
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
           currentPage: 2,
           pageSize: 5,
           schoolList: [],
           total: 0,
           addDialogVisible: false, //控制对话框的显示隐藏
           addSchoolForm: {
               num: '',
               name: '',
               address: ''
           },
           addSchoolRules: {
               name: [{required: true, message: '请输入学校名称', trigger: 'blur' }],
               address: [{required: true, message: '请输入具体地址', trigger: 'blur' }],
           }
       } 
    },
    created() {
        this.getSchoolList()
        this.token = window.sessionStorage.getItem('token');
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
            console.log(res)
            this.schoolList = res.data.data;
        },
        handleGetSchoolErr(err) {
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
            if(res.status !== 200)  return;
            this.addDialogVisible = false;
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
        }
        
    }
}
</script>
<style lang="less" scoped>
.el-card{
    
}
</style>