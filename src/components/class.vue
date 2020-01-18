<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础数据</el-breadcrumb-item>
            <el-breadcrumb-item>班级设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12"></el-col>
                <el-col :span="6">
                    <el-input placeholder="输入班级"  clearable>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                   <el-button type="primary" @click="addClass">添加班级</el-button> 
                </el-col>
            </el-row>
             <!-- 班级列表 -->
            <el-table border  :data="classList.slice((currentPage-1) * pageSize, currentPage * pageSize)" stripe style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="所属学校" prop="schoolName"></el-table-column>
                <el-table-column label="班级名称" prop="className"></el-table-column>
                <el-table-column label="容纳人数" prop="volume"></el-table-column>
                 <el-table-column label="教室长度" prop="roomLength"></el-table-column>
                <el-table-column label="教室宽度" prop="roomWidth"></el-table-column>
                <el-table-column label="黑板长度" prop="bbLength"></el-table-column>
                <el-table-column label="是否是实验班" prop="experiment"></el-table-column>
                <el-table-column label="备注" prop="description"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showClassEditDialog(scope.row.id)" ></el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeClassById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页功能 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="classList.length">
            </el-pagination>
        </el-card>
        <!-- 添加班级 -->
        <el-dialog title="添加班级" ref="addClassRef" :visible.sync="addClassVisible" width="50%">
            <el-form :model="addClassForm" :rules="addClassRules" ref="addClassRef" label-width="120px" class="demo-ruleForm">
                <el-form-item label="所属学校" prop="schoolName">
                    <el-cascader v-model="selectedOptions"  :options="school" :props ="cateProps" @change="handleChange">
                    </el-cascader> 
                </el-form-item>
                <el-form-item label="班级" prop="className">
                    <el-input v-model="addClassForm.className" clearable></el-input>
                </el-form-item>
                <el-form-item label="教室长度(米)" prop="roomLength">
                    <el-input v-model="addClassForm.roomLength" clearable></el-input>
                </el-form-item>
                <el-form-item label="教室宽度(米)" prop="roomWidth">
                    <el-input v-model="addClassForm.roomWidth" clearable></el-input>
                </el-form-item>
                <el-form-item label="黑板长度(米)" prop="bbLength">
                    <el-input v-model="addClassForm.bbLength" clearable></el-input>
                </el-form-item>
                <el-form-item label="人数" prop="volume">
                    <el-input v-model.number="addClassForm.volume" clearable></el-input>
                </el-form-item>
            
                <el-form-item label="是否实验班" prop="experiment">
                    <el-radio-group  size="medium"  v-model="addClassForm.experiment">
                    <el-radio border  label="1">是</el-radio>
                    <el-radio border label="0">不是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="description">
                    <el-input v-model="addClassForm.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addClassVisible = false">取 消</el-button>
                <el-button type="primary" @click=" sumitClass">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改班级对话框 -->
        <el-dialog title="修改班级" :visible.sync="editVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editClassForm" :rules="editClassRules" ref="editClassRef" label-width="100px">
                <el-form-item label="所属学校" prop="schoolName" >
                    <el-cascader v-model="selectedOptions"  :options="school" :props ="cateProps" @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="班级" prop="className">
                    <el-input v-model="editClassForm.className" clearable></el-input>
                </el-form-item>
                <el-form-item label="教室长度(米)" prop="roomLength">
                    <el-input v-model="editClassForm.roomLength" clearable></el-input>
                </el-form-item>
                <el-form-item label="教室宽度(米)" prop="roomWidth">
                    <el-input v-model="editClassForm.roomWidth" clearable></el-input>
                </el-form-item>
                <el-form-item label="黑板长度(米)" prop="bbLength">
                    <el-input v-model="editClassForm.bbLength" clearable></el-input>
                </el-form-item>
                <el-form-item label="人数" prop="volume">
                    <el-input v-model.number="editClassForm.volume" clearable></el-input>
                </el-form-item>
                <el-form-item label="是否实验班" prop="experiment">
                    <!-- <el-radio-group size="medium" > -->
                    <el-radio border  v-model="editClassForm.experiment" :label="1" >是</el-radio>
                    <el-radio border  v-model="editClassForm.experiment"  :label="0">不是</el-radio>
                    <!-- </el-radio-group> -->
                </el-form-item>
                <el-form-item label="备注" prop="description">
                    <el-input v-model="editClassForm.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="editClassInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import axios from 'axios'
export default {
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getClassList();
        this.getSchoolList();
    },
    data() {
        var valiNumberPass1 = (rule, value, callback) => {//包含小数的数字
            let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/g;
            if (value === '') {
                callback(new Error('请输入内容'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入数字'));
            } else {
                callback();
            }
        };
        return {
            token: '',
            addClassVisible: false,
            editVisible: false,
            school: [],
            schoolId: '',
            labelNum1: 1,
            labelNum2: 0,
            selectedOptions: [],
            addClassForm: {
                className:'',
                roomLength: '',
                roomWidth: '',
                bbLength: '',
                volume: '',
                description: '',
                experiment: '',
                schoolName: ''
            },
            addClassRules: {
                schoolName:  { required: true,  message: '请选择学校', trigger: 'blur' },
                className:  { required: true,  message: '请输入班级', trigger: 'blur' },
                roomLength:  { required: true, validator: valiNumberPass1, message: '请输入教室长度', trigger: 'blur'},
                roomWidth:  { required: true,  validator: valiNumberPass1, message: '请输入教室宽度', trigger: 'blur' },
                bbLength:  { required: true,  validator: valiNumberPass1,message: '请输入黑板长度', trigger: 'blur' },
                volume:  { required: true, type:'number', message: '请输入班级容量', trigger: 'blur' },
                experiment: {required: true, message: '请选择是否是实验班', trigger: 'blur'}
               
            },
            cateProps: {
                label: 'name', //看到的是哪个属性
                value: 'id', // 选中的是谁的值
                children: 'children' //哪个属性实现父子节点嵌套
            },
            classList: [],
            currentPage: 1,
            pageSize: 5,
            total: 0,
            editClassForm: {
                className:'',
                roomLength: '',
                roomWidth: '',
                bbLength: '',
                volume: '',
                description: '',
                experiment: '',
                schoolName: ''
            },
            editClassRules: {
                schoolName:  { required: true, message: '请选择学校', trigger: 'blur' },
                classNameame:  { required: true, message: '请输入班级', trigger: 'blur' },
                roomLength:  { required: true, validator: valiNumberPass1, message: '请输入教室长度', trigger: 'blur'},
                roomWidth:  { required: true,  validator: valiNumberPass1, message: '请输入教室宽度', trigger: 'blur' },
                bbLength:  { required: true,  validator: valiNumberPass1, message: '请输入黑板长度', trigger: 'blur' },
                volume:  { required: true, type:'number', message: '请输入班级容量', trigger: 'blur' },
                experiment: {required: true, message: '请选择是否是实验班', trigger: 'blur'}
            }
            
        }
    },
    methods: {
        addClass() {
            this.addClassVisible = true  
        },
        //获取班级列表
        getClassList () {
            let param2 = new URLSearchParams();
            param2.append('token' ,this.token);
            axios({
                method: 'post',
                data: param2,
                url: '/api/classesList'
            }).then(this.handleGetClassSucc.bind(this))
            .catch(this.handleGetClassErr.bind(this)
            )
        },
        handleGetClassSucc(res) {
            if(res.status !== 200) return this.$message.error('获取班级列表失败');
            this.classList = res.data.data;
        },
        handleGetClassErr(err) {
            console.log(err)
        },
        //分页
        //监听pageSize改变事件
        handleSizeChange(newSize) {
            this.pageSize = newSize
            this.getClassList();
        },
        //监听页码值改变事件
        handleCurrentChange(val) {
           this.currentPage = val;
        },
        // 添加班级
        sumitClass() { 
            this.$refs.addClassRef.validate((valid) => {
                if(!valid)  return;
                var param = new URLSearchParams();
                param.append('token', this.token);
                param.append('schoolId',this.schoolId);
                param.append('className',this.addClassForm.className);
                param.append('roomLength',this.addClassForm.roomLength);
                param.append('roomWidth',this.addClassForm.roomWidth);
                param.append('volume',this.addClassForm.volume);
                param.append('bbLength', this.addClassForm.bbLength);
                param.append('description',this.addClassForm.description);
                param.append('experiment',this.addClassForm.experiment);
                axios({
                    method: 'post',
                    data: param,
                    url:'/api/addClasses'
                }).then(this.handleAddClassSucc.bind(this))
                .catch(this.handleAddClassErr.bind(this))
            })
        },
         handleChange(item) {
           this.schoolId = this.addClassForm.schoolName;
        },
        handleAddClassSucc(res) {
            if(res.status !== 200) return this.$message.error('添加班级失败');
            this.addClassVisible = false;
            this.$refs.addClassRef.resetFields();
            this.getClassList();
        },
        handleAddClassErr(err) {
            console.log(err)
        },
        //点击展示编辑页面
        showClassEditDialog (id) {
            let param = new URLSearchParams();
            param.append('id', id);
            param.append('token',this.token)
            axios({
                method: 'post',
                url: '/api/editClasses',
                data: param
            }).then(this.handleEditClassSucc.bind(this))
            .catch(this.handleEditclassErr.bind(this))
        },
        handleEditClassSucc(res) {
            if(res.status !== 200) return;
            res ? res = res.data: '';
            this.editClassForm = res.data;
            this.selectedOptions = res.data.schoolId;
            this.editVisible = true;
        },
        handleEditclassErr(err) {
            console.log(err)
        },
        //修改保存
        editClassInfo() {
            this.$refs.editClassRef.validate((valid) => {
                if(!valid)  return;
                let param = new URLSearchParams();
                param.append('token', this.token);
                param.append('schoolId',this.schoolId);
                param.append('className',this.editClassForm.className);
                param.append('roomLength',this.editClassForm.roomLength);
                param.append('roomWidth',this.editClassForm.roomWidth);
                param.append('volume',this.editClassForm.volume);
                param.append('bbLength', this.editClassForm.bbLength);
                param.append('description',this.editClassForm.description);
                param.append('experiment',this.editClassForm.experiment);
                param.append('id', this.editClassForm.id)
                axios({
                    method: 'post',
                    url: '/api/saveClasses',
                    data: param
                }).then(this.handleEditSaveClassSucc.bind(this))
                .catch(this.handleEditSaveClassErr.bind(this))   
                })
        },
         handleEditSaveClassSucc(res) {
             if(res.status !==200) return; 
            //发起修改用户信息的数据请求
             this.classlList = res.data.data;
            //隐藏编辑框
            this.editVisible = false;
            //提示修改成功
            this.$message.success('更新班级信息成功');
            this.getClassList();
        },
        handleEditSaveClassErr(err) {
            console.log(err)
        },
         //监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editClassRef.resetFields()
        },
        // 获取学校列表
         getSchoolList() {
            let param = new URLSearchParams();
             param.append('token', this.token);
             axios({
                 method: 'post',
                 url: '/api/schoolList',
                 data: param
             }).then(this.handleGetSchoolSucc.bind(this))
               .catch(this.handleGetSchoolErr.bind(this))
        },
        handleGetSchoolSucc(res) {
            if(res.status !== 200) return this.$message.error('获取学校列表失败');
            this.school = res.data.data;
        },
        handleGetSchoolErr(err) {
            console.log(err)
        },
        //删除班级
        async removeClassById(id) {
        const confirmResult = await this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
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
            url: '/api/deleteClasses',
            data: param
        }).then(this.handleDeleteClassSucc.bind(this))
        .catch(this.handleDeleteClassErr.bind(this))
        },
        handleDeleteClassSucc(res) {
            if(res.status !== 200) return this.$message.error('删除班级失败');
            this.$message.success('删除班级成功');
            this.getClassList();  
        },
        handleDeleteClassErr(err) {
            console.log(err)
        }
    }
    
}
</script>
<style lang="less" scoped>

</style>