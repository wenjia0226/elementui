<template>
	<div>
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>检测记录</el-breadcrumb-item>
			<el-breadcrumb-item>屈光度检测</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
		<el-row :gutter="20">
		   <el-col :span="2" >
		      <div class="schoolSet" v-if="this.identity !== 3">学校选择：</div>
		   </el-col>
		   <el-col :span="4" v-if="this.identity !== 3">
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
		     <el-col :span="2" v-if="this.identity !== 3">
		        <div class="schoolSet">班级选择：</div>
		     </el-col>
		     <el-col :span="4" v-if="this.identity !== 3">
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
			 <el-col :span="3" >
				<el-button type="primary" @click="handdlePi" >批量导入</el-button>
			 </el-col>
		</el-row>
		<el-table :data="this.content" border  stripe style="width: 100%">
		<el-table-column type="index"></el-table-column>
		<el-table-column label="学校" prop="schoolName"></el-table-column>
		<el-table-column label="班级" prop="className"></el-table-column>
		<el-table-column label="学生姓名" prop="studentName"></el-table-column>
		<el-table-column label="右眼球镜" prop="ds1R"></el-table-column>
		<el-table-column label="左眼球镜" prop="ds1L"></el-table-column>
		<el-table-column label="右眼柱镜" prop="dc1R"></el-table-column>
		<el-table-column label="左眼柱镜" prop="dc1L"></el-table-column>
		<el-table-column label="右眼轴位" prop="axis1R"></el-table-column>
		<el-table-column label="左眼轴位" prop="axis1L"></el-table-column>
		<el-table-column label="右眼水平眼位" prop="ghR"></el-table-column>
		<el-table-column label="左眼水平眼位" prop="ghR"></el-table-column>
		<el-table-column label="右眼垂直眼位" prop="gvR"></el-table-column>
		<el-table-column label="左眼垂直眼位" prop="gvL"></el-table-column>
		<el-table-column label="操作">
		<template slot-scope="scope">
		  <el-button type="primary"  size="middle"  @click="record(scope.row)">历史记录</el-button>
		</template>
		</el-table-column>
		    </el-table>
		    <el-pagination
		      v-if="!this.searchResult"
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
		<!-- 批量导入-->
		<el-dialog :visible.sync="showDialog"  width="30%" center :before-close="handleFileClose">
			<el-form ref="studentFormRef" :rules="addStudentRules" label-width="120px" >
				<el-form-item label="所属学校班级" prop='classId'>
					<el-cascader :options="options" v-model="addStudentForm.classId" :props="cateProps" @change="handleChange" clearable></el-cascader>
				</el-form-item>
				<el-form-item label="上传机器数据" prop='exportList' >
					<el-upload
					:data="pdfData"
					ref="upload"
					class="upload-demo"
					action="/lightspace/readDiopterExcel"
					accept=".xlsx"
					show-file-list
					:on-change="changeUpload"
					:file-list="fileList"
					:auto-upload="false"
					multiple
					>
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
					<!-- <div slot="tip" class="el-upload__tip">只能上传.xlsx文件，且不超过500kb</div> -->
					</el-upload>
				</el-form-item>
				<el-form-item label="上传学生排序" prop ="nameList">
					<el-upload
					:data="pdfData"
					ref="uploadStu"
					class="upload-demo"
					action="/lightspace/readDiopterExcel"
					accept=".xlsx"
					show-file-list
					:on-change="changeUploadStu"
					:file-list="fileList"
					 multiple
					:auto-upload="false"
					>
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
					<!-- <div slot="tip" class="el-upload__tip">只能上传.xlsx文件，且不超过500kb</div> -->
					</el-upload>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="handleClose">取 消</el-button>
			    <el-button type="primary" @click="sumitAdd" >确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</div>
</template>
<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				token: '',
				school: '',
				className: '',
				student: '',
				schoolId: '',
				classId: '',
				studentId: '',
				schoolList: [],
				classList: [],
				studentList: [],
				screeningList: [],
				content: [],
				totalElements: 0,
				number: 1,
				size: 10,
				page: 1,
				rightInput: '', 
				leftInput: '',
				searchPage: 1,
				schoolInfo: {},
				fondId: '',
				type: '',
				identity: '' ,//身份标识
				searchResult: false,
				showDialog: false, //批量导入
				fileList: [],
				options: [],
				pdfData: {
					token: '',
					exportList: '',
					nameList: '',
					classId: ''
				},
				cateProps: {
				   label: 'name', //看到的是哪个属性
				   value: 'id', // 选中的是谁的值
				   children: 'children' //哪个属性实现父子节点嵌套
				},
			  addStudentForm: {
				  classId: '',
				  exportList: '',
				  nameList: ''
			  },
			  addStudentRules: {
			      classId:  { required: true, message: '请选择班级', trigger: 'blur' },
				  exportList: { required: true, message: '请选择要上传检测记录', trigger: 'blur' },
				  nameList: { required: true, message: '请选择要上传学生名单', trigger: 'blur' },
			},
			}
		},
		created() {
		    this.token = window.sessionStorage.getItem('token');
			this.getOPtions();
			let user = window.sessionStorage.getItem('token');
			this.identity = user.split('-') [1];
			this.fondId = user.split('-')[2];
			 this.getSchoolList();
			 if(this.identity == 1) {  // admin
			   this.getScreeningList('',this.number);
			 }else if(this.identity == 2) {   //2 校长
			   this.type = 'school';
			   this.getScreeningList(this.type, this.number);
			   this.schoolId = this.fondId;
			   this.getClassList();
			}else if(this.identity == 3) {   // 教师
			  this.type = "class";
			  this.classId = this.fondId;
			  this.getScreeningList(this.type,this.number);
			  this.getStudentList();
			}else {  // 地区管理员
			 this.getSchoolList();
			 this.getScreeningList('',this.number);
			}
		},
		methods: {
			handleFileClose() {
			  this.showDialog = false;
			  this.$refs.upload.clearFiles();
			  this.$refs.uploadStu.clearFiles();
			  this.addStudentForm.classId = ''
			},
			handdlePi() {
			  this.showDialog = true;
			},
			changeUpload(file, fileList) {
				this.pdfData.exportList = file.raw;
			 if(fileList.length == 2)  {
			   this.fileList = fileList.slice(1,2);
			 }
			},
			changeUploadStu(file, fileList) {
				this.pdfData.nameList = file.raw;
				if(fileList.length == 2)  {
				  this.fileList = fileList.slice(1,2);
				}
			},
			 submitUpload() {
			   this.$refs.upload.submit();
			   this.showDialog = false;
			  
			 },
			 handleClose() {
				 this.showDialog = false;
			 },
			 sumitAdd() {
				 this.$refs.studentFormRef.validate((valid) => {
				   if(!valid) return this.$message.error('验证失败');
				 let param = new FormData();
				 
				 param.append('token', this.token);
				 param.append('classId', this.classId);
				 param.append('nameList', this.pdfData.nameList);
				 param.append('exportList', this.pdfData.exportList);
				 axios({
					method: 'post',
					data: param,
					 url: '/lightspace/readDiopterExcel' 
				 }).then((res) => {
					 // console.log(res)
					 if(res.data.status ==200) {
						 this.showDialog = false;
						 this.$refs.upload.clearFiles();
						  this.$refs.uploadStu.clearFiles();
						  this.addStudentForm.classId = ''
					 }else {
						 this.$message.error(res.data.msg)
					 }
				 }).catch((err) => {console.log(err)})
				})
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
			 handleChange(val) {
			    this.classId = val[1];
			 },
			 //查看历史记录
			 record(row) {
			   let id = row.id;
			   window.sessionStorage.setItem('studentName', row.studentName);
			  let routeUrl = this.$router.resolve({
			           path: "/diopterRecord/"+ row.studentId,
			           // query: {id:id}
			      });
			      window.open(routeUrl .href, '_blank');
			 }, //搜索改变页码
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
            this.getRecordDirect('','')
         }
       }
     },
      //监听页码值改变事件
      handleCurrentChange(val) {
        this.page = val;
        if(this.type == 'school') {
          this.getScreeningList(this.type, this.page);
        }else if(this.type == 'class') {
          this.getScreeningList(this.type, this.page);
        }else {
          if(this.school && this.className && this.student) {
            this.getRecordInType('student', this.studentId, this.page); //校长查询学生
          }else if(this.school && this.className && this.student == '') {
            this.getRecordInType('class', this.classId, this.page); //校长查询班级
          }else if(this.school && this.className == '' && this.student == '') {
            this.getRecordInType('school',this.schoolId, this.page);
          }else {
            this.getScreeningList('', this.page);
          }
        }
      },
      handleSchoolChange(val) {
        this.schoolId =  val.id;
      },
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
          this.getScreeningList(this.type,1)
         }else {
            this.getScreeningList(this.type,1)
         }
       }else if(this.type == 'class') {  //如果老师搜索
         if(this.student) {
            this.getRecordDirect('student', this.studentId)
         }else {
           this.searchResult = false;
           this.getScreeningList(this.type, 1);
         }
       }else {        //如果管理员搜索
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
            // this.$notify({
            //   title: '警告',
            //   duration: 1000,
            //   message: '请选择要查询的条件',
            //   type: 'warning'
            // });
            this.getScreeningList(this.type, 1)
            this.searchResult = false;
         }
       }
     },
      // 搜索条件下的分页
      getRecordInType(type, id, page) {
        let param = new FormData();
        param.append('type', type.toString());
        param.append('id',id);
        param.append('token', this.token);
        param.append('page', page)
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/screeningList'
        }).then(this.handleGetRecordInTypeSucc.bind(this)).catch(this.handleGetRecordInTypeErr.bind(this))
      },
      handleGetRecordInTypeSucc(res) {
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
      handleGetRecordInTypeErr(err) {
        console.log(err)
      },
      getRecordDirect(type,id) {
        let param = new FormData();
        param.append('type', type.toString());
        param.append('id',id);
        param.append('token', this.token);
        param.append('page', this.searchPage)
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/diopterList'
        }).then(this.handleGetRecordDirSucc.bind(this)).catch(this.handlgGetRecordDirErr.bind(this))
      },
      handleGetRecordDirSucc(res) {
        // console.log(res)
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
     // 删除记录
      async removeRecord(id) {
        const confirmResult = await this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).catch(err => err)
        if(confirmResult !== 'confirm') {
            return this.$message.info('已经取消删除')
        }
        let param = new FormData();
        if(this.schoolId && this.classId === '' && this.studentId === '') {
          param.append('school', this.schoolId);
        }else if(this.classId && this.studentId === ''&& this.schoolId) {
          param.append('class', this.classId)
        }else if(this.studentId && this.classId && this.schoolId) {
          param.append('student', this.studentId)
        }
        param.append('token', this.token);
        param.append('id', id);
        axios({
          method: 'post',
          url: '/lightspace/deleteScreening',
          data: param
        }).then(this.handleDelSucc.bind(this)).catch(this.handletDelErr.bind(this))
      },
      handleDelSucc(res) {
        if(res.data.status == 200) {
          this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
            });
        }else if(res.data.status == 10211) {
          this.$notify({
              title: '失败',
              message: res.data.msg,
              type: 'fail'
            });
        }
        res ? res= res.data.data: '';
        this.content = res.content;
        this.totalElements = res.totalElements;
        this.size = res.size;
        this.number = res.number + 1;  //返回的页码从0开始
        this.content.forEach((item) => {
          item.lastTime = item.date + '\xa0\xa0' + item.time
        });
      },
      handletDelErr(err) {
        console.log(err)
      },
      //获取列表
      getScreeningList(type, page) {
        let param = new FormData();
        param.append('token', this.token);
        param.append('type', type);
        param.append('id', this.fondId);
        param.append('page', page)
        axios({
          method: 'post',
          url: '/lightspace/diopterList',
          data: param
        }).then(this.getScreenListSucc.bind(this)).catch(this.getScreenListErr.bind(this).bind(this))
      },
      getScreenListSucc(res) {
		 // console.log(res)
        if(res.data.status == 200 && res.data.data !== '') {
         res ? res= res.data.data: '';
         this.content = res.content;
         this.totalElements = res.totalElements;
         this.size = res.size;
         this.number = res.number + 1;
        }
      },
      getScreenListErr(err) {
        console.log(err)
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
       this.getStudentList();
     },
      handleSelect(item) {
        this.studentId = item.id
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
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
           } else if(res.data.status == 200) {
             this.schoolList = res.data.data;

            if(this.identity == 2) {
              let sc = this.schoolList;
              let choose = sc.filter((item, index) => {
                if(Number(this.fondId)==  item.id) {
                  return item;
                }
              })
              this.schoolList  = choose;
             this.school = choose[0].name;
             this.schoolId = choose[0].id;
            }
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
	  getStudentList() {
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
	  }
	}
}
</script>

<style>
</style>
