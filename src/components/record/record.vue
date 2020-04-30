<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>检测记录</el-breadcrumb-item>
            <el-breadcrumb-item>机构检测</el-breadcrumb-item>
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
                    <el-button type="primary" @click="addRecordDialogVisible = true">添加检测记录</el-button>
                </el-col>
                <el-col :span="3" >
                       <el-button type="primary" @click="handdlePi">批量导入</el-button>
                </el-col>
            </el-row>

            <!-- 记录列表 -->
            <el-table :data="recordList.slice((currentPage-1) * pageSize, currentPage * pageSize)" border stripe style="width: 100%" v-show="!this.searchRecordList.length">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="所属学校" prop="schoolName"></el-table-column>
                <el-table-column label="所属班级" prop="classesName"></el-table-column>
                <el-table-column label="姓名" prop="studentName"></el-table-column>
                <el-table-column label="右眼裸眼视力" prop="visionRight"></el-table-column>
                <el-table-column label="左眼裸眼视力" prop="visionLeft"></el-table-column>
                <el-table-column label="右眼眼轴长度" prop="eyeAxisLengthRight"></el-table-column>
                <el-table-column label="左眼眼轴长度" prop="eyeAxisLengthLeft"></el-table-column>
                <el-table-column label="右眼曲率" prop="curvatureRight"></el-table-column>
                <el-table-column label="左眼曲率" prop="curvatureLeft"></el-table-column>
                <el-table-column label="右眼矫正视力" prop="cvaRight"></el-table-column>
                <el-table-column label="左眼矫正视力" prop="cvaLeft"></el-table-column>
                <el-table-column label="右眼屈光度" prop="diopterRight"></el-table-column>
                <el-table-column label="左眼屈光度" prop="diopterLeft"></el-table-column>


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
            <!-- 搜索记录 -->
            <el-table :data="searchRecordList" border stripe style="width: 100%" v-show="this.searchRecordList.length">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="所属学校" prop="schoolName"></el-table-column>
                <el-table-column label="所属班级" prop="classesName"></el-table-column>
                <el-table-column label="姓名" prop="studentName"></el-table-column>
                <el-table-column label="右眼裸眼视力" prop="visionRight"></el-table-column>
                <el-table-column label="左眼裸眼视力" prop="visionLeft"></el-table-column>
                <el-table-column label="右眼眼轴长度" prop="eyeAxisLengthRight"></el-table-column>
                <el-table-column label="左眼眼轴长度" prop="eyeAxisLengthLeft"></el-table-column>
                <el-table-column label="右眼曲率" prop="curvatureRight"></el-table-column>
                <el-table-column label="左眼曲率" prop="curvatureLeft"></el-table-column>
                <el-table-column label="右眼矫正视力" prop="cvaRight"></el-table-column>
                <el-table-column label="左眼矫正视力" prop="cvaLeft"></el-table-column>
                <el-table-column label="右眼屈光度" prop="diopterRight"></el-table-column>
                <el-table-column label="左眼屈光度" prop="diopterLeft"></el-table-column>

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
             <!-- 分页功能 -->
            <el-pagination
                v-show="!this.searchRecordList.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="recordList.length">
            </el-pagination>
            <!-- 添加记录 -->
            <el-dialog title="添加记录" :visible.sync="addRecordDialogVisible" width="50%" :before-close="handleClose">
                <el-form :model="addRecordForm" :rules="addRecordRules" ref="recordFormRef" label-width="120px">
                    <el-form-item label="学校班级姓名" prop="record_cat">
                        <el-cascader :options="options" v-model="addRecordForm.record_cat" :props="cateProps" @change="handleChange"clearable></el-cascader>
                    </el-form-item>
                     <el-form-item label="右眼裸眼视力" prop="visionRight">
                        <el-input v-model="addRecordForm.visionRight" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼裸眼视力" prop="visionLeft">
                        <el-input v-model="addRecordForm.visionLeft" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="右眼眼轴长度" prop="eyeAxisLengthRight">
                        <el-input v-model="addRecordForm.eyeAxisLengthRight" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼眼轴长度" prop="eyeAxisLengthLeft">
                        <el-input v-model="addRecordForm.eyeAxisLengthLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼曲率" prop="curvatureRight">
                        <el-input v-model="addRecordForm.curvatureRight" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼曲率" prop="curvatureLeft">
                        <el-input v-model="addRecordForm.curvatureLeft" clearable></el-input>
                    </el-form-item>
                    <!-- 左右眼矫正视力是非必填项 -->
                     <el-form-item label="右眼矫正视力">
                        <el-input v-model="addRecordForm.cvaRight" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼矫正视力" >
                        <el-input v-model="addRecordForm.cvaLeft" clearable></el-input>
                    </el-form-item>
                   <!-- 屈光度是非必填项 -->
                     <el-form-item label="右眼屈光度">
                        <el-input v-model="addRecordForm.diopterRight" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼屈光度" >
                        <el-input v-model="addRecordForm.diopterLeft" clearable></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click=" handleClose">重置</el-button>
                    <el-button type="primary" @click="submitRecord" >确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改记录 -->
             <el-dialog title="修改记录" :visible.sync="editRecordDialogVisible" width="50%">
                <el-form :model="editRecordForm" :rules="editRecordRules" ref="recordEditFormRef" label-width="120px">
                   <el-form-item label="所属学校班级"  prop="record_cat">
                        <el-cascader :options="secondClass" v-model="editRecordForm.record_cat"    :props="cateProps" @change="handleEditChange" clearable></el-cascader>
                    </el-form-item>
                    <el-form-item label="学生姓名"  prop="sudentName">
                        <el-input v-model="editRecordForm.studentName"   clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼裸眼视力" prop="visionRight">
                        <el-input v-model="editRecordForm.visionRight" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼裸眼视力" prop="visionLeft">
                        <el-input v-model="editRecordForm.visionLeft" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="右眼眼轴长度" prop="eyeAxisLengthRight">
                        <el-input v-model="editRecordForm.eyeAxisLengthRight" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼眼轴长度" prop="eyeAxisLengthLeft">
                        <el-input v-model="editRecordForm.eyeAxisLengthLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼曲率" prop="curvatureRight">
                        <el-input  v-model="editRecordForm.curvatureRight" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼曲率" prop="curvatureLeft">
                        <el-input  v-model="editRecordForm.curvatureLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼矫正视力">
                        <el-input  v-model="editRecordForm.cvaRight" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼矫正视力" >
                        <el-input v-model="editRecordForm.cvaLeft" clearable></el-input>
                    </el-form-item>
                     <el-form-item label="右眼屈光度" >
                        <el-input v-model="editRecordForm.diopterRight" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="左眼屈光度" >
                        <el-input v-model="editRecordForm.diopterLeft" clearable></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editRecordDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEditInfo" >确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog :visible.sync="showDialog"  width="30%" center >
              <el-row>
                <el-col :span="12">
                  <a class="download" href="http://www.guangliangkongjian.com/download/检查数据导入模板.xlsx">下载模板</a>
                  <!-- <el-button @click="DownLoadTemplate" type="primary" size="small">下载模板</el-button> -->
                </el-col>
                <el-col :span="12">
                  <el-upload
                    :data="pdfData"
                    class="upload-demo"
                    ref="upload"
                    action="/lightspace/recordExcel"
                    :before-upload="beforeUpload"
                    accept=".xlsx"
                    :limit="1"
                    :on-success="handleSuccess"
                    :file-list="fileList"
                    :on-exceed="handleExceed"
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
var valid
export default {
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getOPtions();
        this.getSecondClass();
        this.getRecordList();
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
          fileList: [],//此数组中存入所有提交的文档信息

          pdfData: {
              file: '',
              token: ''
          },
          showDialog: false,
          schoolList: [],
          schoolName: '',
          secondClass: [],
            url: ['../../assets/image/1.jpg'],
            id: '',
            token: '',
            query: '',
            searchRecordList: [],
            record_cat: [],
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
                record_cat: []
            },
            addRecordRules: {
                record_cat: {required: true,  message: '请选择学校班级', trigger: 'blur' },
                curvatureLeft:  { required: true, validator: valiNumberPass1, message: '请输入左眼曲率', trigger: 'blur' },
                curvatureRight:  { required: true, validator: valiNumberPass1, message: '请输入右眼曲率', trigger: 'blur' },
                cvaLeft:  { required: true, validator: valiNumberPass1, message: '请输入左眼矫正视力', trigger: 'blur' },
                cvaRight:  { required: true, validator: valiNumberPass1, message: '请输入右眼矫正视力', trigger: 'blur' },
                diopterLeft:  { required: true,validator: valiNumberPass1, message: '请输入左眼屈光度', trigger: 'blur' },
                diopterRight:  { required: true,validator: valiNumberPass1, message: '请输入右眼屈光度', trigger: 'blur' },
                eyeAxisLengthLeft: { required: true,validator: valiNumberPass1, message: '请输入左眼眼轴长度取值范围25-35', trigger: 'blur',min: 25,max: 35 },
                eyeAxisLengthRight: { required: true, validator: valiNumberPass1, message: '请输入右眼眼轴长度', trigger: 'blur' },
                visionLeft:  { required: true, validator: valiNumberPass1, message: '请输入左眼裸眼视力', trigger: 'blur' },
                visionRight:  { required: true, validator: valiNumberPass1, message: '请输入右眼裸眼视力', trigger: 'blur' },
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
                record_cat: [],
                studentName: ''
            },
            editRecordRules: {
                record_cat: {required: true,  message: '请选择学校班级', trigger: 'blur' },
                curvatureLeft:  { required: true,validator: valiNumberPass1, message: '请输入左眼曲率', trigger: 'blur' },
                curvatureRight:  { required: true, validator: valiNumberPass1,message: '请输入右眼曲率', trigger: 'blur' },
                cvaLeft:  { required: true, validator: valiNumberPass1, message: '请输入左眼矫正视力', trigger: 'blur' },
                cvaRight:  { required: true,validator: valiNumberPass1, message: '请输入右眼矫正视力', trigger: 'blur' },
                diopterLeft:  { required: true,validator: valiNumberPass1, message: '请输入左眼屈光度', trigger: 'blur' },
                diopterRight:  { required: true,validator: valiNumberPass1, message: '请输入右眼屈光度', trigger: 'blur' },
                eyeAxisLengthLeft:  { required: true, validator: valiNumberPass1, message: '请输入左眼眼轴长度', trigger: 'blur' },
                eyeAxisLengthRight:  { required: true, validator: valiNumberPass1, message: '请输入右眼眼轴长度', trigger: 'blur' },
                visionLeft:  { required: true, validator: valiNumberPass1, message: '请输入左眼裸眼视力', trigger: 'blur' },
                visionRight:  { required: true, validator: valiNumberPass1, message: '请输入右眼裸眼视力', trigger: 'blur' },
                studentName:  { required: true, validator: valiNumberPass1, message: '请输入学生姓名',trigger: 'blur' },
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
            currentPage: 1,
            pageSize: 5,
            total: 0,
            recordList: []
        }
    },
    methods: {
      handleExceed(files, fileList) {
         this.$message.warning(`每次只能选择1个文件`);
      },
      beforeUpload(file) {
        this.pdfData.file = file;
        this.pdfData.token = this.token;
       },
       submitUpload() {
         this.$refs.upload.submit();
       },
       handleRemove(file, fileList) {
         console.log(file, fileList);
       },
       handlePreview(file) {
         console.log(file);
       },
       handleSuccess(res, file, fileList) {
        this.fileList = [];
         // console.log(res);
         if(res.status == 10215) {
           this.$message.error(res.msg);
           return;
         }else if(res.status == 200) {
           this.$message.success(res.msg);
         }
       },
      handdlePi() {
        this.showDialog = true;
      },
      //获取级联选择器中的数据
      getSecondClass() {
          let param = new URLSearchParams();
          param.append('token', this.token);
          axios({
              method: 'post',
              url: '/lightspace/cascade1',
              data: param
          }).then(this.handleGetSecondSucc.bind(this)).catch(this.handleGetSecondErr.bind(this))
      },
      handleGetSecondSucc (res) {
         if(res.data.status === 10204) {
             this.$message.error(res.data.msg);
             this.$router.push('/login');
         } else if(res.data.status == 200) {
             this.secondClass =  res.data.data;
         }

      },
      handleGetSecondErr(err) {
          console.log(err)
      },
      //关闭按钮
        handleClose() {
         this.addRecordDialogVisible = false;
         this.$refs.recordFormRef.resetFields();
         this.addRecordForm.cvaLeft = '';
         this.addRecordForm.cvaRight = "";
         this.addRecordForm.diopterLeft = '';
         this.addRecordForm.diopterRight = '';

        },
        //搜索学生
        queryStudent() {
            let param = new URLSearchParams();
            if(this.query == "") {
              this.getRecordList();
              this.searchRecordList = [];
              return;
            }
            param.append('token', this.token);
            param.append('name', this.query);
            axios({
                method: "post",
                url: '/lightspace/queryRecord',
                data: param
            }).then(this.handleQuerySucc.bind(this))
            .catch(this.handleQueryErr.bind(this))
        },
        handleQuerySucc(res) {
          if(res.data.status === 10204) {
              this.$message.error(res.data.msg);
              this.$router.push('/login');
          }else if(res.data.status == 10209) {
              this.$message.error(res.data.msg);
              this.getRecordList();
              this.searchRecordList = [];
           }else if(res.status == 200) {
              this.$message.success('搜索成功');
              this.searchRecordList = res.data.data;
            }
        },
        handleQueryErr(err) {
            console.log(err)
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
        //获取列表
        getRecordList() {
            let param = new URLSearchParams();
            param.append('token' ,this.token);
            axios({
                method: 'post',
                data: param,
                url: '/lightspace/recordList'
            }).then(this.handleGetRecordSucc.bind(this))
            .catch(this.handleGetRecordErr.bind(this)
            )
        },
        handleGetRecordSucc(res) {
          console.log(res)
           if(res.data.status === 10204) {
               this.$message.error(res.data.msg);
               this.$router.push('/login');
           } else if(res.data.status == 200) {
               this.recordList = res.data.data;
           }
            this.recordList.forEach((item ,index) => {
              if(item.cvaLeft == 0) {
                 item.cvaLeft = '无'
              }
              if(item.cvaRight == 0) {
                 item.cvaRight = '无'
              }
              if(item.diopterLeft == '') {
                item.diopterLeft = '--/--'
               }
             if(item.diopterRight == '') {
                item.diopterRight = '--/--'
              }
            })
        },
        handleGetRecordErr(err) {
            console.log(err)
        },
        //分页
        //监听pageSize改变事件
        handleSizeChange(newSize) {
            this.pageSize = newSize
            this.getRecordList();
        },
        //监听页码值改变事件
        handleCurrentChange(val) {
           this.currentPage = val;
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
                url: '/lightspace/addRecord',
                data: param
            }).then(this.handleAddRecordSucc.bind(this)).catch(this.handleAddRecordErr.bind(this))
            })
        },
        handleAddRecordSucc(res) {
            if(res.data.status === 10204) {
               this.$message.error(res.data.msg);
               this.$router.push('/login');
            } else if(res.data.status == 200) {
              this.addRecordDialogVisible = false;
              this.$message.success('添加记录成功');
              this.$refs.recordFormRef.resetFields();
              this.addRecordForm.cvaLeft = '';
              this.addRecordForm.cvaRight = "";
              this.addRecordForm.diopterLeft = '';
              this.addRecordForm.diopterRight = '';
              this.getRecordList();
            }
        },
        handleAddRecordErr(err) {
          this.$message.error('添加记录失败')
            console.log(err)
        },
        handleChange() {
            this.schoolId = this.addRecordForm.record_cat[0];
            this.classId = this.addRecordForm.record_cat[1];
            this.studentId = this.addRecordForm.record_cat[2];
        },
        handleEditChange() {
          this.schoolId = this.editRecordForm.record_cat[0];
          this.classId = this.editRecordForm.record_cat[1];
          this.studentId = this.editRecordForm.record_cat[2];
        },
        //编辑出现编辑页面
        showRecordEditDialog(id) {
            this.id = id;
            let param = new URLSearchParams();
            param.append('id', id);
            param.append('token',this.token)
            axios({
                method: 'post',
                url: '/lightspace/editRecord',
                data: param
            }).then(this.handleEditRecordSucc.bind(this))
            .catch(this.handleEditRecordErr.bind(this))
            },
        handleEditRecordSucc(res) {
         if(res.data.status === 10204) {
             this.$message.error(res.data.msg);
             this.$router.push('/login');
         } else if(res.data.status == 200) {
            this.editRecordForm = res.data.data;
            this.editRecordDialogVisible = true;
         }


          },
        handleEditRecordErr(err) {
          this.$message.error('修改记录失败');
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
                url: '/lightspace/saveRecord',
                data: param
            }).then(this.handleSaveEditSucc.bind(this)).catch(this.handleSaveEditErr.bind(this))
            })
        },
    handleSaveEditSucc(res) {
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
        } else if(res.data.status == 200) {
           this.editRecordDialogVisible = false;
           this.$refs.recordEditFormRef.resetFields();
           this.$message.success('修改记录成功');
           this.getRecordList();
        }


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
            url: '/lightspace/deleteRecord',
            data: param
        }).then(this.handleDeleteRecordSucc.bind(this))
        .catch(this.handleDeleteRecordErr.bind(this))
    },
    handleDeleteRecordSucc(res) {
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
        } else if(res.data.status == 200) {
           this.$message.success('删除记录成功');
           this.recordList = res.data.data;
           const totalPage = Math.ceil(this.recordList.length / this.pageSize) // 总页数
           this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
           this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
        }
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
            url: '/lightspace/cascade',
            data: param
        }).then(this.handleGetOptionSucc.bind(this)).catch(this.handleGetOptionErr.bind(this))
    },
    handleGetOptionSucc (res) {
       if(res.data.status === 10204) {
           this.$message.error(res.data.msg);
           this.$router.push('/login');
       } else if(res.data.status == 200) {
           this.options = res.data.data;
       }
    },
    handleGetOptionErr(err) {
        console.log(err)
    }
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
