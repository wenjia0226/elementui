<template>
     <div>
       <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础数据</el-breadcrumb-item>
            <el-breadcrumb-item>学生名单</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 卡片视图 -->
        <el-card>
            <el-row :gutter="20">
                 <el-col :span="6">
                     <el-input placeholder="输入学生姓名"  clearable >
                        <el-button slot="append" icon="el-icon-search"></el-button>
                     </el-input>
                 </el-col>
                 <el-col :span="6">
                        <el-button type="primary" @click="addStudent">添加学生</el-button>
                 </el-col>
             </el-row>
              <!-- 学生列表 -->
            <el-table :data="studentList" border stripe style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="所属学校" prop="schoolName"></el-table-column>
                <el-table-column label="所属班级" prop="classesName"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="性别" prop="gender"></el-table-column>
                <el-table-column label="年龄" prop="age"></el-table-column>
                 <el-table-column label="身高" prop="height"></el-table-column>
                <el-table-column label="体重" prop="weight"></el-table-column>
                <el-table-column label="性格" prop="nature"></el-table-column>
                <el-table-column label="椅子高度" prop="chairHeight"></el-table-column>
                <el-table-column label="坐姿高度" prop="sittingHeight"></el-table-column>
                <el-table-column label="是否矫正" prop="correct"></el-table-column>
                <el-table-column label="备注" prop="description"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showClassEditDialog(scope.row.id)" ></el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeStudentsById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
              <!-- 添加学生 -->
            <el-dialog title="添加学生" :visible.sync="addStudentVisible" width="50%">
                <el-form :model="addStudentForm" :rules="addStudentRules" ref="studentFormRef" label-width="100px">
                    <el-form-item label="所属学校班级" prop="name">
                        <el-cascader :options="options" v-model="addStudentForm.stu_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
                    </el-form-item>
                    <el-form-item label="学生姓名" prop="name">
                        <el-input v-model.number="addStudentForm.name" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="性别" prop="gender">
                        <el-radio v-model="addStudentForm.gender" size="medium" border :label="0">男</el-radio>
                        <el-radio v-model="addStudentForm.gender" size="medium" border :label="1">女</el-radio>
                   </el-form-item>
                   <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="addStudentForm.age" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="身高" prop="height">
                        <el-input v-model.number="addStudentForm.height" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="体重" prop="weight">
                        <el-input v-model.number="addStudentForm.weight" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="性格" prop="nature">
                        <el-input v-model="addStudentForm.nature" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="椅子高度" prop="chairHeight">
                        <el-input v-model.number="addStudentForm.chairHeight" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="坐姿高度" prop="sittingHeight">
                        <el-input v-model.number="addStudentForm.sittingHeight" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="是否矫正" prop="correct">
                            <el-radio v-model="addStudentForm.correct" size="medium" border  :label="1">已矫正</el-radio>
                            <el-radio v-model="addStudentForm.correct" size="medium" border :label="0">未校正</el-radio>
                   </el-form-item>
                   <el-form-item label="备注" prop="description">
                        <el-input v-model="addStudentForm.description" clearable></el-input>
                   </el-form-item>
                </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="addStudentVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sumitAddStudent" >确 定</el-button>
                    </span>
            </el-dialog>
            <!-- 编辑学生 -->
        </el-card> 
     </div>
</template>
<script>
import axios from 'axios'
export default {
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getOPtions();
        this.getStudentList();
    },
    data() {
        return {
            token: '',
            options: [],
            addStudentVisible: false,
            schoolId: '',
            classId: '',
            studentList: [],
            addStudentForm: {
                "age":'' ,
                "chairHeight": '',
                "sittingHeight":'',
                "correct": '',
                "description":"",
                "gender":'',
                "height":'',
                "weight": '',
                "name":"",
                "nature":"",
                "stu_cat":[]
                
            },
            addStudentRules: {
                name:  { required: true, message: '请输入姓名', trigger: 'blur' },
                age:  { required: true,  type: 'number', message: '请输入年龄', trigger: 'blur' },
                chairHeight:  { required: true, type: 'number', message: '请输入椅子高度', trigger: 'blur' },
                sittingHeight:  { required: true,type: 'number', message: '请输入坐姿高度', trigger: 'blur' },
                correct:  { required: true, type: 'number',message: '请输入是否矫正', trigger: 'blur' },
                gender:  { required: true,type: 'number', message: '请输入性别', trigger: 'blur' },
                height:  { required: true,type: 'number', message: '请输入身高', trigger: 'blur' },
                weight:  { required: true,type: 'number', message: '请输入体重', trigger: 'blur' },
                nature:  { required: true, message: '请输入性格', trigger: 'blur' },
            },
            cateProps: {
               label: 'name', //看到的是哪个属性
               value: 'id', // 选中的是谁的值
               children: 'children' //哪个属性实现父子节点嵌套
            }

        }
    },
     methods: {
         //添加学生
        addStudent() { 
            this.addStudentVisible = true   
        },
        sumitAddStudent() {
            this.$refs.studentFormRef.validate((valid) => {
                if(!valid) return this.$message.error('验证失败');
                let param = new URLSearchParams();
                param.append('token', this.token);
                param.append('schoolId', this.schoolId);
                param.append('classId', this.classId);
                param.append('age', this.addStudentForm.age)
                param.append('chairHeight', this.addStudentForm.chairHeight)
                param.append('sittingHeight',this.addStudentForm.sittingHeight)
                param.append('correct', this.addStudentForm.correct)
                param.append('description', this.addStudentForm.description)
                param.append('gender', this.addStudentForm.gender)
                param.append('height', this.addStudentForm.height)
                param.append('weight', this.addStudentForm.weight)
                param.append('name', this.addStudentForm.name)
                param.append('nature', this.addStudentForm.nature)
                param.append('age', this.addStudentForm.age)
                param.append('stu_cat', this.addStudentForm.stu_cat)
                axios({
                    method: 'post',
                    url: '/api/addStudent',
                    data: param
                }).then(this.handleAddStuSucc.bind(this)).catch(this.handleAddStuErr.bind(this))
                })
        },
        handleAddStuSucc(res) {
           if(res.status != 200) return this.$message.error('添加学生信息失败');
           this.addStudentVisible = false;
           this.getStudentList();
            this.$message.success('添加学生信息成功');
        },
        handleAddStuErr(err) {
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
        },
        //级联选择器选择变化会触发这个函数
        handleChange() {
           this.schoolId = this.addStudentForm.stu_cat[0];
           this.classId = this.addStudentForm.stu_cat[1];
        },
        //获取学生列表
        getStudentList() {
            let param = new URLSearchParams();
            param.append('token', this.token);
            axios({
                method: 'post',
                url: '/api/studentList',
                data: param
            }).then(this.handleGetStudentList.bind(this)).catch(this.handleGetStudentErr.bind(this))
        },
        handleGetStudentList(res) {
            if(res.status !==200) return this.$message.error('获取学生列表失败');
            this.studentList = res.data.data;
        },
        handleGetStudentErr(err) {
            console.log(err)
        },
        //删除学校
        removeStudentsById(id) {
            let param = new URLSearchParams();
            param.append('id', id);
            param.append('token', this.token);
            axios({
                method: 'post',
                url: '/api/deleteStudent',
                data: param
            }).then(this.handleDeleteStuSucc.bind(this)).catch(this.handleDeleteStuErr.bind(this))
        },
        handleDeleteStuSucc(res) {
            console.log(res)
            if(res.status !== 200) return this.$message.error('删除学生失败');
            this.getStudentList();
        },
        handleDeleteStuErr(err) {
            console.log(err)
        }
    }
}
</script>
<style lang="less" scoped>

</style>