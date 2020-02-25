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
                     <el-input placeholder="输入学生姓名"  clearable v-model="query"  @clear="queryStudent">
                        <el-button slot="append" icon="el-icon-search" @click="queryStudent"></el-button>
                     </el-input>
                 </el-col>
                 <el-col :span="6">
                        <el-button type="primary" @click="addStudent">添加学生</el-button>
                 </el-col>
                 <el-col :span="3" >
                        <el-button type="primary" @click="showDialog" >批量导入</el-button>
                 </el-col>
                 <el-col :span="3"><el-button @click="DownLoadTemplate" type="primary" size="small">下载模板</el-button></el-col>
             </el-row>
              <!-- 学生列表 -->
            <el-table :data="studentList.slice((currentPage-1) * pageSize, currentPage * pageSize)" border stripe style="width: 100%" v-show="!this.searchStudentList.length">
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
                        <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showStudentEditDialog(scope.row.id)" ></el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeStudentsById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 搜索学生 -->
            <el-table :data="this.searchStudentList" border stripe style="width: 100%" v-show="this.searchStudentList.length">
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
                        <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showStudentEditDialog(scope.row.id)" ></el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeStudentsById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页功能 -->
            <el-pagination
                v-show="!this.searchStudentList.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="studentList.length">
            </el-pagination>
              <!-- 添加学生 -->
            <el-dialog title="添加学生" :visible.sync="addStudentVisible" width="50%" :before-close="handleClose">
                <el-form :model="addStudentForm" :rules="addStudentRules" ref="studentFormRef" label-width="120px" >
                    <el-form-item label="所属学校班级" prop='stu_cat'>
                        <el-cascader :options="options" v-model="addStudentForm.stu_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
                    </el-form-item>
                    <el-form-item label="学生姓名" prop="name">
                        <el-input v-model="addStudentForm.name" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="性别" prop="gender">
                        <el-radio v-model="addStudentForm.gender" size="medium" border :label="0">男</el-radio>
                        <el-radio v-model="addStudentForm.gender" size="medium" border :label="1">女</el-radio>
                   </el-form-item>
                   <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="addStudentForm.age" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="身高(米)" prop="height">
                        <el-input v-model="addStudentForm.height" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="体重(KG)" prop="weight">
                        <el-input v-model="addStudentForm.weight" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="椅子高度(米)" prop="chairHeight">
                        <el-input v-model="addStudentForm.chairHeight" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="坐姿高度(米)" prop="sittingHeight">
                        <el-input v-model="addStudentForm.sittingHeight" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="是否矫正" prop="correct">
                            <el-radio v-model="addStudentForm.correct" size="medium" border  :label="1">已矫正</el-radio>
                            <el-radio v-model="addStudentForm.correct" size="medium" border :label="0">未校正</el-radio>
                   </el-form-item>
                   <el-form-item label="性格">
                        <el-input v-model="addStudentForm.nature" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="备注" prop="description">
                        <el-input v-model="addStudentForm.description" clearable></el-input>
                   </el-form-item>
                </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="handleClose">取 消</el-button>
                        <el-button type="primary" @click="sumitAddStudent" >确 定</el-button>
                    </span>
            </el-dialog>
            <!-- 编辑学生 -->
            <el-dialog title="编辑学生" :visible.sync="editStudentVisible" width="50%" >
              <el-form :model="editStudentForm" :rules="editStudentRules" ref="studentEditFormRef" label-width="120px">
                  <el-form-item label="所属学校/班级" prop="name" width="100%">
                      <el-cascader ref="myCascader" :options="options" v-model="editStudentForm.stu_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
                  </el-form-item>
                  <el-form-item label="学生姓名" prop="name">
                      <el-input v-model="editStudentForm.name" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="性别" prop="gender">
                      <el-radio v-model="editStudentForm.gender" size="medium" border :label="0">男</el-radio>
                      <el-radio v-model="editStudentForm.gender" size="medium" border :label="1">女</el-radio>
                 </el-form-item>
                 <el-form-item label="年龄" prop="age">
                      <el-input v-model.number="editStudentForm.age" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="身高(米)" prop="height">
                      <el-input v-model="editStudentForm.height" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="体重(KG)" prop="weight">
                      <el-input v-model="editStudentForm.weight" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="椅子高度(米)" prop="chairHeight">
                      <el-input v-model="editStudentForm.chairHeight" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="坐姿高度(米)" prop="sittingHeight">
                      <el-input v-model="editStudentForm.sittingHeight" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="是否矫正" prop="correct">
                          <el-radio v-model="editStudentForm.correct" size="medium" border  :label="1">已矫正</el-radio>
                          <el-radio v-model="editStudentForm.correct" size="medium" border :label="0">未矫正</el-radio>
                 </el-form-item>
                 <el-form-item label="性格">
                      <el-input v-model="editStudentForm.nature" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="备注" prop="description">
                      <el-input v-model="editStudentForm.description" clearable></el-input>
                 </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <!--  <el-button @click="reset">取 消</el-button> -->
                  <el-button type="primary" @click="saveEditInfo" >确 定</el-button>
              </span>
            </el-dialog>
        <el-dialog :visible.sync="showDialog">
          <el-row>
            <el-col :span="6"> </el-col>
            <el-col :span="6">
              <el-upload
                class="upload-demo"
                action="/"
                :on-success='handlesuccess'
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-col>
          </el-row>

        </el-dialog>

        </el-card>
     </div>
</template>
<script>
import axios from 'axios'
const thsAreaCode = ''; // 拼接 三级联动地址代码
export default {
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getOPtions();
        this.getStudentList();
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
            id: '', //学生id
            query:"",
            token: '',
            options: [],
            showDialog: false,
            addStudentVisible: false,
            schoolId: '',
            classId: '',
            studentList: [],
            currentPage: 1,
            pageSize: 5,
            total:0,
            selectedOptions: [],
            query: '',
            fileList: [],//此数组中存入所有提交的文档信息
            searchStudentList: [],
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
                "nature":""

            },
            addStudentRules: {
                name:  { required: true, message: '请输入姓名', trigger: 'blur' },
                age:  { required: true,  type: 'number', message: '请输入年龄', trigger: 'blur' },
                chairHeight:  { required: true, validator: valiNumberPass1, message: '请输入椅子高度(cm)', trigger: 'blur' },
                sittingHeight:  { required: true,validator: valiNumberPass1, message: '请输入坐姿高度(cm)', trigger: 'blur' },
                correct:  { required: true, type: 'number',message: '请输入是否矫正', trigger: 'blur' },
                gender:  { required: true,type: 'number', message: '请输入性别', trigger: 'blur' },
                height:  { required: true, validator: valiNumberPass1, message: '请输入身高(m)', trigger: 'blur' },
                weight:  { required: true,validator: valiNumberPass1, message: '请输入体重(kg)', trigger: 'blur' },
                nature:  { required: true, message: '请输入性格', trigger: 'blur' },
                stu_cat: {required: true, message: '请选择学校班级', trigger: 'blur'}
            },
            cateProps: {
               label: 'name', //看到的是哪个属性
               value: 'id', // 选中的是谁的值
               children: 'children' //哪个属性实现父子节点嵌套
            },
            editStudentVisible: false,
            editStudentForm:{
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
            editStudentRules: {
                name:  { required: true, message: '请输入姓名', trigger: 'blur' },
                age:  { required: true,  type: 'number', message: '请输入年龄', trigger: 'blur' },
                chairHeight:  { required: true, validator: valiNumberPass1, message: '请输入椅子高度', trigger: 'blur' },
                sittingHeight:  { required: true,validator: valiNumberPass1, message: '请输入坐姿高度', trigger: 'blur' },
                correct:  { required: true, type: 'number',message: '请输入是否矫正', trigger: 'blur' },
                gender:  { required: true,type: 'number', message: '请输入性别', trigger: 'blur' },
                height:  { required: true,validator: valiNumberPass1, message: '请输入身高', trigger: 'blur' },
                weight:  { required: true,validator: valiNumberPass1, message: '请输入体重', trigger: 'blur' },
                nature:  { required: true, message: '请输入性格', trigger: 'blur' },
                stu_cat: {required: true, message: '请选择学校班级', trigger: 'blur'}
            }

        }
    },
     methods: {
       // 下载模板
       DownLoadTemplate() {
         let param = new URLSearchParams();
         param.append('token' , this.token);
         axios({
           method:"post",
           data: param,
           url:'/lightspace/downloadStudent'
         }).then(this.handleGetDownLoadSuccss.bind(this)).catch(this.hanadleGetDownLoadErr.bind(this))
       },
       handleGetDownLoadSuccss(res) {
         console.log(res)
       },
       hanadleGetDownLoadErr(err) {
         console.log(err)
       },
      handleChange(file, fileList) {
        console.log(fileList)
             this.fileList = fileList;
           },
     //文件上传
       handleExceed(files, fileList) {
             this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
           },
          handlesuccess(response, file, fileList){
         //response即为后台返回的全部内容
          if(response.success === 1){
            console.log('解析成功')
          }else{
             console.log('解析失败')
            }
         },
     //关闭按钮
      handleClose() {
        this.addStudentVisible = false;
        this.$refs.studentFormRef.resetFields();
        this.addStudentForm.nature = '';
        this.addStudentForm.description = ''
       },
      //搜索学生
      queryStudent() {
          let param = new URLSearchParams();
          if(this.query == "") {
            this.getStudentList();
            this.searchStudentList = [];
            return;
          }
          param.append('token', this.token);
          param.append('name', this.query);
          axios({
              method: "post",
              url: '/lightspace/queryStudent',
              data: param,

          }).then(this.handleQuerySucc.bind(this))
          .catch(this.handleQueryErr.bind(this))
      },
      handleQuerySucc(res) {
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
        } else if(res.data.status == 10211) {
            this.$message.error(res.data.msg);
            this.getStudentList();
            this.searchStudentList = [];
         }else if(res.data.status == 200) {
            this.$message.success('搜索成功');
            this.searchStudentList = res.data.data;
          }
        },
        handleQueryErr(err) {
            console.log(err)
        },
         //点击出现添加学生框
        addStudent() {
            this.addStudentVisible = true
        },
        //添加学生
        sumitAddStudent() {
          this.$refs.studentFormRef.validate((valid) => {
            if(!valid) return this.$message.error('验证失败');
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('schoolId', this.schoolId);
            param.append('classId', this.classId);
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
            // param.append('stu_cat', this.addStudentForm.stu_cat)
            axios({
                method: 'post',
                url: '/lightspace/addStudent',
                data: param
            }).then(this.handleAddStuSucc.bind(this)).catch(this.handleAddStuErr.bind(this))
            })
        },
        handleAddStuSucc(res) {
           if(res.data.status === 10204) {
               this.$message.error(res.data.msg);
               this.$router.push('/login');
           } else if(res.data.status == 200) {
              this.addStudentVisible = false;
              this.$message.success('添加学生信息成功');
              this.$refs.studentFormRef.resetFields();
              this.getStudentList();
           }
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
                url: '/lightspace/studentList',
                data: param
            }).then(this.handleGetStudentList.bind(this)).catch(this.handleGetStudentErr.bind(this))
        },
        //分页
        //监听pageSize改变事件
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.getStudentList();
        },
        //监听页码值改变事件
        handleCurrentChange(val) {
           this.currentPage = val;
        },
        handleGetStudentList(res) {
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
               this.studentList = res.data.data;
               this.studentList.forEach((value, index) => {
                   if(value.gender == 1) {
                       value.gender = '女'
                   }else{
                       value.gender = '男'
                   }
                   if(value.correct ==1 ) {
                       value.correct = '已矫正'
                   }else {
                       value.correct = '未矫正'
                   }
               })
            }
        },
        handleGetStudentErr(err) {
            console.log(err)
        },
        // 修改学生
        showStudentEditDialog(id) {
            this.id = id;
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('id', id);
            axios({
                method: 'post',
                url: '/lightspace/editStudent',
                data: param
            }).then(this.handleEditStuSucc.bind(this)).catch(this.handleEditStuErr.bind(this))
        },
        handleEditStuSucc(res) {
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
              this.editStudentForm = res.data.data;
              this.editStudentVisible = true;
              this.getStudentList();
            }
        },
        handleAddressFun(e, form, thsAreaCode) {
            thsAreaCode = this.$refs['cascaderAddr'].currentLabels;
            alert(thsAreaCode)

        },
        handleEditStuErr(err) {
            console.log(err)
        },
        //保存修改的数据
        saveEditInfo() {
            this.$refs.studentEditFormRef.validate((valid) => {
            if(!valid) return this.$message.error('验证失败');
            let param = new URLSearchParams();
            param.append('token', this.token);
            param.append('schoolId', this.schoolId);
            param.append('classId', this.classId);
            param.append('age', this.editStudentForm.age)
            param.append('chairHeight', this.editStudentForm.chairHeight)
            param.append('sittingHeight',this.editStudentForm.sittingHeight)
            param.append('correct', this.editStudentForm.correct)
            param.append('description', this.editStudentForm.description)
            param.append('gender', this.editStudentForm.gender)
            param.append('height', this.editStudentForm.height)
            param.append('weight', this.editStudentForm.weight)
            param.append('name', this.editStudentForm.name)
            param.append('nature', this.editStudentForm.nature)
            param.append('id', this.id)
            axios({
                method: 'post',
                url: '/lightspace/saveStudent',
                data: param
            }).then(this.handldEditStuSucc.bind(this)).catch(this.handleEditStuErr.bind(this))
            })
        },
        handldEditStuSucc(res) {
           if(res.data.status === 10204) {
               this.$message.error(res.data.msg);
               this.$router.push('/login');
           } else if(res.data.status == 200) {
             this.studentList = res.data.data;
             //隐藏编辑框
             this.editStudentVisible = false;
             //提示修改成功
             this.$message.success('更新学生信息成功');
             this.getStudentList();
           }
        },
        handleEditStuErr(err) {
            console.log(err)
        },
        //删除学生
       async removeStudentsById(id) {
        const confirmResult = await this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).catch(err => err)
        if(confirmResult !== 'confirm') {
            return this.$message.info('已经取消删除')
        }
            let param = new URLSearchParams();
            param.append('id', id);
            param.append('token', this.token);
            axios({
                method: 'post',
                url: '/lightspace/deleteStudent',
                data: param
            }).then(this.handleDeleteStuSucc.bind(this)).catch(this.handleDeleteStuErr.bind(this))
        },
        handleDeleteStuSucc(res) {
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
              this.studentList = res.data.data;
              const totalPage = Math.ceil(this.studentList.length / this.pageSize) // 总页数
              this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
              this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
            }
        },
        handleDeleteStuErr(err) {
          console.log(err)
        },
    }
}
</script>
<style lang="less" scoped>

</style>
