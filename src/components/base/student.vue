Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore

@wenjia0226
wenjia0226
/
elementui
1
00
Code
Issues
Pull requests
6
Actions
Projects
Wiki
Security
11
Insights
Settings
elementui/src/components/base/student.vue
@wenjia0226
wenjia0226 12
Latest commit a1f77c0 10 days ago
 History
 1 contributor
We found potential security vulnerabilities in your dependencies.
Only the owner of this repository can see this message.

1121 lines (1114 sloc)  46.7 KB

<template>
     <div  v-loading="loading">
       <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础数据</el-breadcrumb-item>
            <el-breadcrumb-item>学生名单</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 卡片视图 -->
        <el-card>
          <el-row :gutter="20">
           <el-col :span="2" v-if="this.identity == 1">
              <div class="schoolSet">学校选择：</div>
           </el-col>
           <el-col :span="4" v-if="this.identity == 1">
             <el-autocomplete
              class="inline-input"
              v-model="school"
              clearable
              :fetch-suggestions="querySearchSchool"
              placeholder="请输入学校名称"
              @select="handleSelectSchool"
              @change="handleSchoolChange"
              ></el-autocomplete>
             </el-col>
             <el-col :span="2" v-if="this.identity ==  2 || this.identity ==  1 ">
                <div class="schoolSet">班级选择：</div>
             </el-col>
             <el-col :span="4"  v-if="this.identity ==  2|| this.identity ==  1">
               <el-autocomplete
                class="inline-input"
                v-model="className"
                clearable
                :fetch-suggestions="querySearchClass"
                placeholder="请输入班级名称"
                @select="handleSelectClass"
                ></el-autocomplete>
              </el-col>
             <el-col :span="3" >
                  <div class="schoolSet">学生姓名选择：</div>
             </el-col>
             <el-col :span="4">
               <el-autocomplete
                 class="inline-input"
                 v-model="student"
                 :fetch-suggestions="querySearch"
                 clearable
                 placeholder="请输入学生姓名"
                 @select="handleSelect">
               </el-autocomplete>
             </el-col>
             <el-col :span="2">
              <el-button type="primary" @click="getRecodRight">查询</el-button>
             </el-col>
           <el-col :span="3">
                  <el-button type="primary" @click="addStudent">添加学生</el-button>
           </el-col>
           <el-col :span="3" >
                  <el-button type="primary" @click="handdlePi" >批量导入</el-button>
           </el-col>
          </el-row>
              <!-- 学生列表 -->
            <el-table :data="this.content" border stripe style="width: 100%" v-show="!this.searchStudentList.length">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="所属学校" prop="schoolName"></el-table-column>
                <el-table-column label="所属班级" prop="classesName"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="性别" prop="gender"></el-table-column>
                <el-table-column label="年龄" prop="age"></el-table-column>
                <el-table-column label="出生日期" prop="birthday"></el-table-column>
                <el-table-column label="身高" prop="height"></el-table-column>
                <el-table-column label="体重" prop="weight"></el-table-column>
                <el-table-column label="性格" prop="nature"></el-table-column>
                <el-table-column label="椅子高度" prop="chairHeight"></el-table-column>
                <el-table-column label="坐姿高度" prop="sittingHeight"></el-table-column>
                <el-table-column label="是否矫正" prop="correct"></el-table-column>
                <el-table-column label="家长手机号" prop="parentPhone"></el-table-column>
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
            <el-table :data="this.content" border stripe style="width: 100%" v-show="this.searchStudentList.length">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="所属学校" prop="schoolName"></el-table-column>
              <el-table-column label="所属班级" prop="classesName"></el-table-column>
              <el-table-column label="姓名" prop="name"></el-table-column>
              <el-table-column label="性别" prop="gender"></el-table-column>
              <el-table-column label="年龄" prop="age"></el-table-column>
              <el-table-column label="出生日期" prop="birthday"></el-table-column>
              <el-table-column label="身高" prop="height"></el-table-column>
              <el-table-column label="体重" prop="weight"></el-table-column>
              <el-table-column label="性格" prop="nature"></el-table-column>
              <el-table-column label="椅子高度" prop="chairHeight"></el-table-column>
              <el-table-column label="坐姿高度" prop="sittingHeight"></el-table-column>
              <el-table-column label="家长手机号" prop="parentPhone"></el-table-column>
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
             v-show="!this.searchResult"
             background
             :current-page="this.number"
             @current-change="handleCurrentChange"
             layout="prev, pager, next"
             :page-size ="this.size"
             :total="this.totalElements">
           </el-pagination>
           <el-pagination
             v-if="this.searchResult"
             background
             :current-page="this.number"
             @current-change="handleSearchCurrentChange"
             layout="prev, pager, next"
             :page-size ="this.size"
             :total="this.totalElements">
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
                   <el-form-item label ="出生日期" prop="birthday">
                      <el-date-picker
                       v-model="addStudentForm.birthday"
                       type="date"
                       @change="dateChange"
                       placeholder="选择日期">
                      </el-date-picker>
                   </el-form-item>
                   <el-form-item label="年龄">
                        <el-input v-model.number="addStudentForm.age" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="身高(米)" >
                        <el-input v-model="addStudentForm.height" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="体重(KG)" >
                        <el-input v-model="addStudentForm.weight" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="椅子高度(米)" >
                        <el-input v-model="addStudentForm.chairHeight" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="坐姿高度(米)" >
                        <el-input v-model="addStudentForm.sittingHeight" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="是否矫正" >
                            <el-radio v-model="addStudentForm.correct" size="medium" border  :label="1">已矫正</el-radio>
                            <el-radio v-model="addStudentForm.correct" size="medium" border :label="0">未校正</el-radio>
                   </el-form-item>
                   <el-form-item label="家长手机号" >
                        <el-input v-model="addStudentForm.parentPhone" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="性格">
                        <el-input v-model="addStudentForm.nature" clearable></el-input>
                   </el-form-item>
                   <el-form-item label="备注" >
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
                 <el-form-item label ="出生日期">
                    <el-date-picker
                     v-model="editStudentForm.birthday"
                     type="date"
                     @change="dateChange"
                     placeholder="选择日期">
                    </el-date-picker>
                 </el-form-item>
                 <el-form-item label="年龄" >
                      <el-input v-model.number="editStudentForm.age" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="身高(米)" >
                      <el-input v-model="editStudentForm.height" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="体重(KG)" >
                      <el-input v-model="editStudentForm.weight" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="椅子高度(米)" >
                      <el-input v-model="editStudentForm.chairHeight" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="坐姿高度(米)" >
                      <el-input v-model="editStudentForm.sittingHeight" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="是否矫正" >
                          <el-radio v-model="editStudentForm.correct" size="medium" border  :label="1">已矫正</el-radio>
                          <el-radio v-model="editStudentForm.correct" size="medium" border :label="0">未矫正</el-radio>
                 </el-form-item>
                 <el-form-item label="家长手机号" >
                      <el-input v-model="editStudentForm.parentPhone" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="性格">
                      <el-input v-model="editStudentForm.nature" clearable></el-input>
                 </el-form-item>
                 <el-form-item label="备注" >
                      <el-input v-model="editStudentForm.description" clearable></el-input>
                 </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <!--  <el-button @click="reset">取 消</el-button> -->
                  <el-button type="primary" @click="saveEditInfo" >确 定</el-button>
              </span>
            </el-dialog>
          <el-dialog :visible.sync="showDialog"  width="30%" center :before-close="handleFileClose">
          <el-row>
            <el-col :span="12">
              <a class="download" href="http://www.guangliangkongjian.com/download/学生导入模板.xlsx">下载模板</a>
              <!-- <el-button @click="DownLoadTemplate" type="primary" size="small">下载模板</el-button> -->
            </el-col>
            <el-col :span="12">
              <el-upload
                :data="pdfData"
                class="upload-demo"
                ref="upload"
                action="/lightspace/studentExcel"
                :before-upload="beforeUpload"
                accept=".xlsx"
                show-file-list
                :on-change="changeUpload"
                :on-success="handleSuccess"
                :file-list="fileList"
                multiple
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传.xlsx文件，且不超过500kb</div>
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
        let user = window.sessionStorage.getItem('token');
        this.identity = user.split('-') [1];
        this.fondId = user.split('-')[2];
         if(this.identity == 1) {  // admin
           this.getSchoolList();
           this.getStudentList('',this.number);
         }else if(this.identity == 2) {   //2 校长
           this.type = 'school';
           this.getStudentList(this.type, this.number);
           this.schoolId = this.fondId;
           this.getClassList(); // 获取对应学校下的所有班级
        }else if(this.identity == 3) {   // 教师
          this.type = "class";
          this.classId = this.fondId;
          this.getStudentList(this.type,this.number);
           this.getStudentListBySelect();
           // this.getScreeningList(this.type, this.number);
        }else {
          this.getSchoolList();
          this.getStudentList('',this.number);
        }
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
       }
        var validPhone=(rule, value,callback)=>{
           let reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
              if (!value){
                  callback(new Error('请输入电话号码'))
              }else  if (!reg.test(value)){
                callback(new Error('请输入正确的11位手机号码'))
              }else {
                  callback()
              }
        };
        return {
           searchResult: false,
            searchPage: 1,
            loading: false,
            id: '', //学生id
            query:"",
            token: '',
            options: [],
            showDialog: false,
            addStudentVisible: false,
            schoolId: '',
            classId: '',
            studentId: '',
            school: '', // 搜索绑定
            className: '',
            student: '',
            schoolList: [],
            classList: [],
            studentList: [],
            content: [],
            birthday: '',
            studentList: [],
            pageSize: 5,
            size: 5,
            total:0,
            totalElements: 0,
            number: 1,
            selectedOptions: [],
            query: '',
            fileList: [],//此数组中存入所有提交的文档信息
            pdfData: {
                file: '',
                token: ''
            },
            value1: '',
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
                "nature":"",
                "parentPhone": '',
                "birthday": ''
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
                stu_cat: {required: true, message: '请选择学校班级', trigger: 'blur'},
                parentPhone: {required: true, message: '请输入手机号', validator:validPhone, trigger: 'blur' },
                birthday: {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
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
                "stu_cat":[],
                "parentPhone": '',
                "birthday": ''
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
                stu_cat: {required: true, message: '请选择学校班级', trigger: 'blur'},
                parentPhone: {required: true, message: '请输入手机号', validator:validPhone, trigger: 'blur'},
                birthday: {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
            }
        }
    },
     methods: {
       //搜索
       getRecodRight() {
         this.searchResult = true;
         if(this.type == 'school') {   //如果校长搜索
           if(this.className && this.student) {
             this.searchPage = 1;
             this.getRecordDirect('student', this.studentId); //校长查询学生
           }else if(this.className&& this.student == '') {
             this.getRecordDirect('class', this.classId); //校长查询班级
           }else if(this.className == '' && this.student == '') {
            this.getStudentList(this.type,1)
           }else {
               this.$message({
                  message: '请先选择班级',
                  type: 'warning'
                });
           }
         }else if(this.type == 'class') {  //如果老师搜索
           if(this.student) {
              this.getRecordDirect('student', this.studentId)
           }else {
             this.getStudentList(this.type, 1);
           }
         }else {
         //如果管理员搜索
           if(this.school && this.className && this.student) {
             this.searchPage = 1;
             this.getRecordDirect('student', this.studentId); //校长查询学生
           }else if(this.school && this.className && this.student == '') {
             this.searchPage = 1;
             this.getRecordDirect('class', this.classId); //校长查询班级
           }else if(this.school && this.className == '' && this.student == '') {
             this.searchPage = 1;
             this.getRecordDirect('school',this.schoolId);
           }else {
              this.getStudentList(this.type, 1)
              this.searchResult = false;
           }
         }
       },
      //搜索改变页码
      handleSearchCurrentChange(val) {
        this.searchPage = val;
        if(this.type == 'school') {
          this.getRecodRight(this.type, this.searchPage);
        }else if(this.type == 'class') {
          this.getRecodRight(this.type, this.searchPage);
        }else {
          if(this.school && this.className && this.student) {
            this.getRecordDirect('student', this.studentId); //校长查询学生
          }else if(this.school && this.className && this.student == '') {
            this.getRecordDirect('class', this.classId); //校长查询班级
          }else if(this.school && this.className == '' && this.student == '') {
            this.getRecordDirect('school',this.schoolId);
          }else {
             this.getStudentList(this.type, 1)
             this.searchResult = false;
          }
        }
      },
       getRecordDirect(type,id) {
         let param = new FormData();
         param.append('type', type.toString());
         param.append('id',id);
         param.append('token', this.token);
         param.append('page', this.searchPage);
         axios({
           method: 'post',
           data: param,
           url: '/lightspace/studentList'
         }).then(this.handleGetRecordDirSucc.bind(this)).catch(this.handlgGetRecordDirErr.bind(this))
       },
       handleGetRecordDirSucc(res) {
         if(res.data.status == 200) {
           res ? res= res.data.data: '';
           this.content = res.content;
           this.totalElements = res.totalElements;
           this.size = res.size;
           this.number = res.number + 1;
           if(this.content.length) {
             this.content.forEach((item) => {
               item.lastTime = item.date + '\xa0\xa0' + item.time
             })
           }
         }else if(res.data.status == 10211) {
           this.$notify({
             title: '警告',
             duration: 1000,
             message: res.data.msg,
             type: 'warning'
           });
         }
       },
       handlgGetRecordDirErr(err) {
         console.log(err)
       },
       //获取学校列表
       getSchoolList() {
         let param = new URLSearchParams();
          param.append('token', this.token);
          axios({
              method: 'post',
              url: '/lightspace/schoolList',
              data: param
          }).then(this.handleGetSchoolSucc.bind(this))
            .catch(this.handleGetSchoolErr.bind(this))
       },
       handleGetSchoolSucc(res) {
         // console.log(res)
         if(res.data.status === 10204) {
             this.$message.error(res.data.msg);
             this.$router.push('/login');
            } else if(res.data.status == 200) {
              this.schoolList = res.data.data;
           }
       },
       handleGetSchoolErr(error) {
          console.log(error)
       },
       //获取班级列表
       getClassList() {
         let param = new FormData();
         param.append('token', this.token);
         param.append('schoolId', this.schoolId)
         axios({
           method: 'post',
           url: '/lightspace/queryClassesBySchool',
           data: param
         }).then(this.handleGetClassSucc.bind(this)).catch(this.handleGetClassErr.bind(this))
       },
       handleGetClassSucc(res) {
         if(res.data.status == 200) {
           this.classList = res.data.data;
           this.classList.forEach((item) => {
            item.value = item.className
           })
         }
       },
       handleGetClassErr(err) {
         console.log(err)
       },
       //获取学生列表
       getStudentListBySelect() {
         let param = new URLSearchParams();
         param.append('token', this.token);
         param.append('classId', this.classId);
         axios({
             method: 'post',
             url: '/lightspace/queryStudentBySidCid',
             data: param
         }).then(this.handleGetStudentListSucc.bind(this)).catch(this.handleGetStudentErr.bind(this))
       },
       handleGetStudentListSucc(res) {
         if(res.data.status === 10204) {
             this.$message.error(res.data.msg);
             this.$router.push('/login');
         } else if(res.data.status == 200) {
            this.studentList = res.data.data;
            this.studentList.forEach((item) => {
              item.value = item.name
            })
         }
       },
       handleGetStudentErr(err) {
          console.log(err)
       },
       //获取列表
       getStudentList(type, page) {
         let param = new FormData();
         param.append('token', this.token);
         param.append('type', type);
         param.append('id', this.fondId);
         param.append('page', page)
         axios({
           method: 'post',
           url: '/lightspace/studentList',
           data: param
         }).then(this.getStuListSucc.bind(this)).catch(this.getStuListErr.bind(this).bind(this))
       },
       getStuListSucc(res) {
         if(res.data.status == 200 && res.data.data !== '') {
          res ? res= res.data.data: '';
          this.content = res.content;
          this.content.forEach((item) => {
            if(item.gender == 0) {
              item.gender = '男'
            }else {
              item.gender = '女'
            }
            if(item.correct == 0) {
              item.correct = '未校正'
            }else {
              item.correct = '矫正'
            }
          })
          this.totalElements = res.totalElements;
          this.size = res.size;
          this.number = res.number + 1;
           if(this.content.length) {
           this.content.forEach((item) => {
             item.lastTime = item.date + '\xa0\xa0' + item.time
           })
           }
         }
       },
       getStuListErr(err) {
         console.log(err)
       },
       handleSchoolChange(val) {
         this.schoolId =  val.id;
       },
       handleSelectSchool(item) {
         this.schoolId = item.id;
         this.classId = '';
         this.className = '';
         this.student = '';
         this.studentId = '';
         this.fontId = this.schoolId;
         this.getClassList();
       },
       handleSelectClass(item) {
         this.classId = item.id;
         this.student = '';
         this.studentId = '';
         this.getStudentListBySelect();
       },
        handleSelect(item) {
          this.studentId = item.id
        },
       // 学校选择
       querySearchSchool(queryString, cb) {
         var schoolList = this.schoolList;
         var results = queryString ? schoolList.filter(this.createFilter(queryString)) : schoolList;
         // 调用 callback 返回建议列表的数据
         cb(results);
       },
       createFilter(queryString) {
         return (schoolList) => {
           return (schoolList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
         }
       },
       // 班级选择
       querySearchClass(queryString, cb) {
         var classList = this.classList;
         var results = queryString ? classList.filter(this.createFilter(queryString)) : classList;
         // 调用 callback 返回建议列表的数据
         cb(results);
       },
       createFilter(queryString) {
         return (classList) => {
           return (classList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
         }
       },
       //学生选择
       querySearch(queryString, cb) {
         var studentList = this.studentList;
         var results = queryString ? studentList.filter(this.createFilter(queryString)) : studentList;
         // 调用 callback 返回建议列表的数据
         cb(results);
       },
       createFilter(queryString) {
         return (studentList) => {
           return (studentList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
         }
       },
       dateChange(val) {
        if(val) {
          this.startTime = val.toString().split(",")[0]
          this.endTime = val.toString().split(",")[1]
          this.birthday = val.toLocaleString().split(' ') [0];
        }
      },
       changeUpload(file, fileList) {
        if(fileList.length == 2)  {
          this.fileList = fileList.slice(1,2);
        }
       },
       //请求参数传递
       beforeUpload(file) {
         this.pdfData.file = file;
         this.pdfData.token = this.token;
        },
        submitUpload() {
          this.$refs.upload.submit();
          this.showDialog = false;
          this.loading = true;
        },
        handleSuccess(res, file, fileList) {
           this.loading = false;
         if(res.status == 10215) {
           this.$message.error(res.msg);
           this.fileList = [];
           return;
         }else if(res.status == 200) {
           this.$message.success(res.msg);
           this.fileList = [];
         }
        },
       handdlePi() {
         this.showDialog = true;
       },
       // 下载模板  post 方式，现在没用
     DownLoadTemplate() {
       let param = new URLSearchParams();
       param.append('token' , this.token);
       axios({
         method:"post",
         data: param,
         url:'/lightspace/downloadStudent',
         responseType: "blob"
       }).then(this.handleGetDownLoadSuccss.bind(this)).catch(this.hanadleGetDownLoadErr.bind(this))
     },
     handleGetDownLoadSuccss(res) {
       this.download(res.data)
     },
     // 下载文件
    download (data) {
       if (!data) return;
       let url = window.URL.createObjectURL(new Blob([data]))
       let link = document.createElement('a')
       link.style.display = 'none'
       link.href = url
       link.setAttribute('download', '数据检查导入模板.xlsx')
       document.body.appendChild(link);
       link.click()
      },
     hanadleGetDownLoadErr(err) {
       console.log(err)
     },
     handleFileClose() {
       this.showDialog = false;
        this.$refs.upload.clearFiles();
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
          this.getStudentList( 1);
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
          this.getStudentList(1);
          this.searchStudentList = [];
       }else if(res.data.status == 200) {
          this.$message.success('搜索成功');
          this.searchStudentList = res.data.data;
          this.searchStudentList.forEach((value, index) => {
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
            param.append('parentPhone', this.addStudentForm.parentPhone)
            param.append('birthday', this.birthday);
            console.log(this.birthday);
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
              this.getStudentList(1);
              if(this.identity == 1) {  // admin
                 this.getSchoolList();
                 this.getStudentList('',1);
               }else if(this.identity == 2) {   //2 校长
                 this.type = 'school';
                 this.getStudentList(this.type, 1);
                 this.schoolId = this.fondId;
                 this.getClassList(); // 获取对应学校下的所有班级
              }else if(this.identity == 3) {   // 教师
                this.type = "class";
                this.classId = this.fondId;
                this.getStudentList(this.type, 1);
                 this.getStudentListBySelect();
              }
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
        //监听pageSize改变事件
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.getStudentList(1);
        },
        //监听页码值改变事件
        handleCurrentChange(val) {
          this.page = val;
          if(this.type == 'school') {
            this.getStudentList(this.type, this.page);
          }else if(this.type == 'class') {
            this.getStudentList(this.type, this.page);
          }else {
            if(this.school && this.className && this.student) {
              this.getStuInType('student', this.studentId, this.page); //校长查询学生
            }else if(this.school && this.className && this.student == '') {
              this.getStuInType('class', this.classId, this.page); //校长查询班级
            }else if(this.school && this.className == '' && this.student == '') {
              this.getStuInType('school',this.schoolId, this.page);
            }else {
              this.getStudentList('', this.page);
            }
          }
        },
        // 搜索条件下的分页
        getStuInType(type, id, page) {
          let param = new FormData();
          param.append('type', type.toString());
          param.append('id',id);
          param.append('token', this.token);
          param.append('page', page)
          axios({
            method: 'post',
            data: param,
            url: '/lightspace/studentList'
          }).then(this.handleGetStuInTypeSucc.bind(this)).catch(this.handleGetStuInTypeErr.bind(this))
        },
        handleGetStuInTypeSucc(res) {
          if(res.data.status == 200) {
            res ? res= res.data.data: '';
            this.content = res.content;
            this.totalElements = res.totalElements;
            this.size = res.size;
            this.number = res.number + 1;
            if(this.content.length) {
              this.content.forEach((item) => {
                item.lastTime = item.date + '\xa0\xa0' + item.time
              })
            }
          }else if(res.data.status == 10211) {
            this.$notify({
              title: '警告',
              duration: 1000,
              message: res.data.msg,
              type: 'warning'
            });
          }
        },
        handleGetStuInTypeErr(err) {
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
          console.log(res)
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
              this.editStudentForm = res.data.data;
              this.editStudentVisible = true;
              // if(this.identity == 1) {  // admin
              //    this.getSchoolList();
              //    this.getStudentList('',1);
              //  }else if(this.identity == 2) {   //2 校长
              //    this.type = 'school';
              //    this.getStudentList(this.type, 1);
              //    this.schoolId = this.fondId;
              //    this.getClassList(); // 获取对应学校下的所有班级
              // }else if(this.identity == 3) {   // 教师
              //   this.type = "class";
              //   this.classId = this.fondId;
              //   this.getStudentList(this.type,1);
              //    this.getStudentListBySelect();
              //    // this.getScreeningList(this.type, this.number);
              // }
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
          console.log(123)
            this.$refs.studentEditFormRef.validate((valid) => {
            if(!valid) return this.$message.error('验证失败');
            let param = new FormData();
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
            param.append('parentPhone', this.editStudentForm.parentPhone),
            param.append('birthday', this.birthday)
            param.append('id', this.id)
            axios({
                method: 'post',
                url: '/lightspace/saveStudent',
                data: param
            }).then(this.handldEditStuSucc.bind(this)).catch(this.handleEditStuErr.bind(this))
            })
        },
        handldEditStuSucc(res) {
          console.log(res)
           if(res.data.status === 10204) {
               this.$message.error(res.data.msg);
               this.$router.push('/login');
           } else if(res.data.status == 200) {
             this.studentList = res.data.data;
             //隐藏编辑框
             this.editStudentVisible = false;
             //提示修改成功
             this.$message.success('更新学生信息成功');
            if(this.identity == 1) {  // admin
               this.getStudentList('',1);
             }else if(this.identity == 2) {   //2 校长
               this.type = 'school';
               this.getStudentList(this.type, 1);
            }else if(this.identity == 3) {   // 教师
              this.type = "class";
              this.getStudentList(this.type,1);
            }
           }
        },
        handleEditStuErr(err) {
            console.log(err)
        },
        //删除学生
       async removeStudentsById(id) {
        const confirmResult = await this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
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
          console.log(res)
            if(res.data.status === 10204) {
                this.$message.error(res.data.msg);
                this.$router.push('/login');
            } else if(res.data.status == 200) {
              if(this.identity == 1) {  // admin
                 this.getStudentList('', 1);
               }else if(this.identity == 2) {   //2 校长
                 this.type = 'school';
                 this.getStudentList(this.type, 1);
              }else if(this.identity == 3) {   // 教师
                this.type = "class";
                this.getStudentList(this.type,1);
              }
            }
        },
        handleDeleteStuErr(err) {
          console.log(err)
        },
    }
}
</script>
<style lang="less" scoped>
.download {
  display: block;
  width: 50%;
  height: 30px;
  background: red;
  text-decoration: none;
  line-height: 30px;
  text-align: center;
  background: #66b1ff;
  color: #fff;
  border-radius: 10px;
}
</style>
