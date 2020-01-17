<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础数据</el-breadcrumb-item>
            <el-breadcrumb-item>检测记录</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="输入学生姓名">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addRecordDialogVisible = true">添加检测记录</el-button>
                </el-col>
            </el-row>
            <!-- 记录列表 -->
            <el-table :data="recordList" border stripe style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="所属学校" prop="schoolName"></el-table-column>
                <el-table-column label="所属班级" prop="classesName"></el-table-column>
                <el-table-column label="姓名" prop="studentName"></el-table-column>
                <el-table-column label="左眼曲率" prop="curvatureLeft"></el-table-column>
                <el-table-column label="右眼曲率" prop="curvatureRight"></el-table-column>
                 <el-table-column label="左眼矫正视力" prop="cvaLeft"></el-table-column>
                <el-table-column label="右眼矫正视力" prop="cvaRight"></el-table-column>
                <el-table-column label="左眼屈光度" prop="diopterLeft"></el-table-column>
                <el-table-column label="右眼屈光度" prop="diopterRight"></el-table-column>
                <el-table-column label="左眼眼轴长度" prop="eyeAxisLengthLeft"></el-table-column>
                <el-table-column label="右眼眼轴长度" prop="eyeAxisLengthRight"></el-table-column>
                <el-table-column label="左眼裸眼视力" prop="visionLeft"></el-table-column>
                <el-table-column label="右眼裸眼视力" prop="visionRight"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showRecordEditDialog(scope.row.id)" ></el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeRecordById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加记录对话框 -->
            <el-dialog title="添加记录" :visible.sync="addRecordDialogVisible" width="50%">
                <el-form :model="addRecordForm" :rules="addRecordRules" ref="recordFormRef" label-width="120px">
                    <el-form-item label="所属学校班级" prop="name">
                        <el-cascader :options="options" v-model="addRecordForm.record_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
                    </el-form-item>
                    <el-form-item label="左眼曲率" prop="curvatureLeft">
                        <el-input v-model.number="addRecordForm.curvatureLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼曲率" prop="curvatureRight">
                        <el-input v-model.number="addRecordForm.curvatureRight" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="左眼矫正视力" prop="cvaLeft">
                        <el-input v-model.number="addRecordForm.cvaLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼矫正视力" prop="cvaRight">
                        <el-input v-model.number="addRecordForm.cvaRight" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="左眼屈光度" prop="diopterLeft">
                        <el-input v-model.number="addRecordForm.diopterLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼屈光度" prop="diopterRight">
                        <el-input v-model.number="addRecordForm.diopterRight" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="左眼眼轴长度" prop="eyeAxisLengthLeft">
                        <el-input v-model.number="addRecordForm.eyeAxisLengthLeft" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="右眼眼轴长度" prop="eyeAxisLengthRight	">
                        <el-input v-model.number="addRecordForm.eyeAxisLengthRight	" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼裸眼视力" prop="visionLeft">
                        <el-input v-model.number="addRecordForm.visionLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼裸眼视力" prop="visionRight">
                        <el-input v-model.number="addRecordForm.visionRight	" clearable></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addRecordDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitRecord" >确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改记录 -->
             <el-dialog title="修改记录" :visible.sync="editRecordDialogVisible" width="50%">
                <el-form :model="editRecordForm" :rules="editRecordRules" ref="recordEditFormRef" label-width="120px">
                    <!-- <el-form-item label="所属学校班级" prop="">
                        <el-cascader :options="options" v-model="editRecordForm.record_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
                    </el-form-item> -->
                    <el-form-item label="左眼曲率" prop="curvatureLeft">
                        <el-input v-model.number="editRecordForm.curvatureLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼曲率" prop="curvatureRight">
                        <el-input v-model.number="editRecordForm.curvatureRight" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="左眼矫正视力" prop="cvaLeft">
                        <el-input v-model.number="editRecordForm.cvaLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼矫正视力" prop="cvaRight">
                        <el-input v-model.number="editRecordForm.cvaRight" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="左眼屈光度" prop="diopterLeft">
                        <el-input v-model.number="editRecordForm.diopterLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼屈光度" prop="diopterRight">
                        <el-input v-model.number="editRecordForm.diopterRight" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="左眼眼轴长度" prop="eyeAxisLengthLeft">
                        <el-input v-model.number="editRecordForm.eyeAxisLengthLeft" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="右眼眼轴长度" prop="eyeAxisLengthRight	">
                        <el-input v-model.number="editRecordForm.eyeAxisLengthRight	" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼裸眼视力" prop="visionLeft">
                        <el-input v-model.number="editRecordForm.visionLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼裸眼视力" prop="visionRight">
                        <el-input v-model.number="editRecordForm.visionRight" clearable></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editRecordDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEditInfo" >确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
    
</template>
<script>
import axios from 'axios'
export default {
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getOPtions();
        this.getRecordList();
    },
    data() {
        return {
            id: '',
            token: '',
            addRecordDialogVisible: false,
            addRecordForm: {
                curvatureLeft: '',
                curvatureRight: '',
                cvaLeft: '',
                cvaRight: '',
                diopterLeft: '',
                diopterRight: '',
                eyeAxisLengthLeft: '',
                eyeAxisLengthRight: '',
                visionLeft: '',
                visionLeft: '',
                record_cat: ''
            },
            addRecordRules: {
                curvatureLeft:  { required: true,type: 'number', message: '请输入左眼曲率', trigger: 'blur' },
                curvatureRight:  { required: true, type: 'number',message: '请输入右眼曲率', trigger: 'blur' },
                cvaLeft:  { required: true, type: 'number', message: '请输入左眼矫正视力', trigger: 'blur' },
                cvaRight:  { required: true, type: 'number', message: '请输入右眼矫正视力', trigger: 'blur' },
                diopterLeft:  { required: true,type: 'number', message: '请输入左眼屈光度', trigger: 'blur' },
                diopterRight:  { required: true,type: 'number', message: '请输入右眼屈光度', trigger: 'blur' },
                eyeAxisLengthLeft:  { required: true, type: 'number',message: '请输入左眼眼轴长度', trigger: 'blur' },
                eyeAxisLengthRight:  { required: true, type: 'number',message: '请输入右眼眼轴长度', trigger: 'blur' },
                visionLeft:  { required: true, type: 'number',message: '请输入左眼裸眼视力', trigger: 'blur' },
                visionRight:  { required: true, type: 'number',message: '请输入右眼裸眼视力', trigger: 'blur' },
            },
            editRecordDialogVisible: false,
            editRecordForm: {
                curvatureLeft: '',
                curvatureRight: '',
                cvaLeft: '',
                cvaRight: '',
                diopterLeft: '',
                diopterRight: '',
                eyeAxisLengthLeft: '',
                eyeAxisLengthRight: '',
                visionLeft: '',
                visionLeft: '',
                record_cat: ''
            },
             editRecordRules: {
                curvatureLeft:  { required: true,type: 'number', message: '请输入左眼曲率', trigger: 'blur' },
                curvatureRight:  { required: true, type: 'number',message: '请输入右眼曲率', trigger: 'blur' },
                cvaLeft:  { required: true, type: 'number', message: '请输入左眼矫正视力', trigger: 'blur' },
                cvaRight:  { required: true, type: 'number', message: '请输入右眼矫正视力', trigger: 'blur' },
                diopterLeft:  { required: true,type: 'number', message: '请输入左眼屈光度', trigger: 'blur' },
                diopterRight:  { required: true,type: 'number', message: '请输入右眼屈光度', trigger: 'blur' },
                eyeAxisLengthLeft:  { required: true, type: 'number',message: '请输入左眼眼轴长度', trigger: 'blur' },
                eyeAxisLengthRight:  { required: true, type: 'number',message: '请输入右眼眼轴长度', trigger: 'blur' },
                visionLeft:  { required: true, type: 'number',message: '请输入左眼裸眼视力', trigger: 'blur' },
                visionRight:  { required: true, type: 'number',message: '请输入右眼裸眼视力', trigger: 'blur' },
            },
            options: [],
            schoolId: '',
            classId: '',
            studentId: '',
            cateProps: {
               label: 'name', //看到的是哪个属性
               value: 'id', // 选中的是谁的值
               children: 'children' //哪个属性实现父子节点嵌套
            },
            recordList: []
        }
    },
    methods: {
        //获取列表
        getRecordList() {
            let param = new URLSearchParams();
            param.append('token' ,this.token);
            axios({
                method: 'post',
                data: param,
                url: '/api/recordList'
            }).then(this.handleGetRecordSucc.bind(this))
            .catch(this.handleGetRecordErr.bind(this)
            )
        },
        handleGetRecordSucc(res) {
            if(res.status !== 200) return this.$message.error('获取记录列表失败');
            this.recordList = res.data.data;
        },
        handleGetRecordErr(err) {
            console.log(err)
        },
        //添加记录
        submitRecord() {
        this.$refs.recordFormRef.validate((valid) => {
            if(!valid) return this.$message.error('验证失败');
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('schoolId', this.schoolId);
            param.append('classId', this.classId);
                param.append('studentId', this.studentId);
            param.append('curvatureLeft', this.addRecordForm.curvatureLeft)
            param.append('curvatureRight',this.addRecordForm.curvatureRight)
            param.append('cvaLeft', this.addRecordForm.cvaLeft)
            param.append('cvaRight', this.addRecordForm.cvaRight)
            param.append('diopterLeft', this.addRecordForm.diopterLeft)
            param.append('diopterRight', this.addRecordForm.diopterRight)
            param.append('eyeAxisLengthLeft', this.addRecordForm.eyeAxisLengthLeft)
            param.append('eyeAxisLengthRight', this.addRecordForm.eyeAxisLengthRight)
            param.append('visionLeft', this.addRecordForm.visionLeft)
            param.append('visionRight', this.addRecordForm.visionRight)
            axios({
                method: 'post',
                url: '/api/addRecord',
                data: param
            }).then(this.handleAddRecordSucc.bind(this)).catch(this.handleAddRecordErr.bind(this))
            })
        },
        handleAddRecordSucc(res) {
            if(res.status != 200) return this.$message.error('添加记录失败');
            this.addRecordDialogVisible = false;
            this.$message.success('添加记录成功');
            this.$refs.recordFormRef.resetFields();
            this.getRecordList();
            
        },
        handleAddRecordErr(err) {
            console.log(err)
        },
        handleChange() {
            this.schoolId = this.addRecordForm.record_cat[0];
            this.classId = this.addRecordForm.record_cat[1];
            this.studentId = this.addRecordForm.record_cat[2];
        },
        //编辑出现编辑页面
        showRecordEditDialog(id) {
            this.id = id;    
            let param = new URLSearchParams();
            param.append('id', id);
            param.append('token',this.token)
            axios({
                method: 'post',
                url: '/api/editRecord',
                data: param
            }).then(this.handleEditRecordSucc.bind(this))
            .catch(this.handleEditRecordErr.bind(this))
            },
            handleEditRecordSucc(res) {
                if(res.status !== 200) return;
                res ? res = res.data: '';
                this.editRecordForm = res.data;
                this.editRecordDialogVisible = true;
            },
            handleEditRecordErr(err) {
                console.log(err)
            },
        
        
        
        //修改后保存
        saveEditInfo() {
            this.$refs.recordEditFormRef.validate((valid) => {
            if(!valid) return this.$message.error('验证失败');
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('schoolId', this.schoolId);
            param.append('classId', this.classId);
            param.append('studentId', this.studentId);
            param.append('curvatureLeft', this.editRecordForm.curvatureLeft)
            param.append('curvatureRight',this.editRecordForm.curvatureRight)
            param.append('cvaLeft', this.editRecordForm.cvaLeft)
            param.append('cvaRight', this.editRecordForm.cvaRight)
            param.append('diopterLeft', this.editRecordForm.diopterLeft)
            param.append('diopterRight', this.editRecordForm.diopterRight)
            param.append('eyeAxisLengthLeft', this.editRecordForm.eyeAxisLengthLeft)
            param.append('eyeAxisLengthRight', this.editRecordForm.eyeAxisLengthRight)
            param.append('visionLeft', this.editRecordForm.visionLeft)
            param.append('visionRight', this.editRecordForm.visionRight)
            param.append('id', this.id);
            axios({
                method: 'post',
                url: '/api/saveRecord',
                data: param
            }).then(this.handleSaveEditSucc.bind(this)).catch(this.handleSaveEditErr.bind(this))
            })
        },
    handleSaveEditSucc(res) {
        if(res.status != 200) return this.$message.error('添加记录失败');
        this.editRecordDialogVisible = false;
        this.$message.success('修改记录成功');
        this.$refs.recordEditFormRef.resetFields();
        this.getRecordList();
        
    },
    handleSaveEditErr(err) {
        console.log(err)
    },
    //删除班级
    async removeRecordById(id) {
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
            url: '/api/deleteRecord',
            data: param
        }).then(this.handleDeleteRecordSucc.bind(this))
        .catch(this.handleDeleteRecordErr.bind(this))
    },
    handleDeleteRecordSucc(res) {
        if(res.status !== 200) return this.$message.error('删除记录失败');
        this.$message.success('删除记录成功');
        this.getRecordList();  
    },
    handleDeleteRecordErr(err) {
        console.log(err)
    },
    //获取级联选择器中的数据
    getOPtions() {
        let param = new URLSearchParams();
        param.append('token', this.token);
        axios({
            method: 'post',
            url: '/api/cascade',
            data: param
        }).then(this.handleGetOptionSucc.bind(this)).catch(this.handleGetOptionErr.bind(this))
    },
    handleGetOptionSucc (res) {
        if(res.status !==200) return this.$message.error('获取级联数据失败');
        this.options = res.data.data;
    },
    handleGetOptionErr(err) {
        console.log(err)
    }
}
}
    
</script>
<style lang="less" scoped>

</style>