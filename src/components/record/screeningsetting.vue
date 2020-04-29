<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>检测记录</el-breadcrumb-item>
        <el-breadcrumb-item>裸眼检测</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
       <el-col :span="2">
          <div class="schoolSet">学校选择：</div>
       </el-col>
       <el-col :span="4">
         <el-autocomplete
          class="inline-input"
          v-model="school"
          clearable
          :fetch-suggestions="querySearchSchool"
          placeholder="请输入学校名称"
          @select="handleSelectSchool"
          ></el-autocomplete>
         </el-col>
         <el-col :span="2" >
            <div class="schoolSet">班级选择：</div>
         </el-col>
         <el-col :span="4">
           <el-autocomplete
            class="inline-input"
            v-model="className"
            clearable
            :fetch-suggestions="querySearchClass"
            placeholder="请输入学校名称"
            @select="handleSelectClass"
            ></el-autocomplete>
          </el-col>
         <el-col :span="3">
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
        </el-row>
        <el-table :data="this.screeningList" border  stripe style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="学校" prop="schoolName"></el-table-column>
            <el-table-column label="班级" prop="className"></el-table-column>
            <el-table-column label="学生姓名" prop="studentName"></el-table-column>
            <el-table-column label="右眼裸眼视力" prop="visionRight"></el-table-column>
            <el-table-column label="左眼裸眼视力" prop="visionLeft"></el-table-column>
            <el-table-column label="最近一次检测时间" prop="lastTime"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeRecord(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
      </el-card>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
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
        screeningList: []
      }
    },
    created() {
        this.token = window.sessionStorage.getItem('token');
        this.getSchoolList();
        this.getScreeningList();
    },
    methods: {
      getRecodRight() {
        if(this.schoolId && this.classId == '' && this.studentId == '') {
          this.getRecordDirect('school', this.schoolId);
        }else if(this.classId && this.studentId == ''&& this.schoolId) {
          this.getRecordDirect('class', this.classId)
        }else if(this.studentId && this.classId && this.schoolId) {
          this.getRecordDirect('student', this.studentId)
        }
        this.schoolId ='';
        this.classId = '';
        this.studentId = '';
        this.school = '';
        this.className = '';
        this.student = '';
      },
      getRecordDirect(type,id) {
        let param = new FormData();
        param.append('type', type.toString());
        param.append('id',id);
        param.append('token', this.token)
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/screeningList'
        }).then(this.handleGetRecordDirSucc.bind(this)).catch(this.handlgGetRecordDirErr.bind(this))
      },
      handleGetRecordDirSucc(res) {
        console.log(res)
        if(res.data.status == 200) {
          this.screeningList = res.data.data;
        }else if(res.data.status == 10211) {
          this.$notify({
            title: '警告',
            duration: 1000,
            message: res.data.msg,
            type: 'warning'
          });
           console.log(res.data)
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
        param.append('token', this.token);
        param.append('id', id);
        axios({
          method: 'post',
          url: '/lightspace/deleteScreening',
          data: param
        }).then(this.handleDelSucc.bind(this)).catch(this.handletDelErr.bind(this))
      },
      handleDelSucc(res) {
        // console.log(res,1111)
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
        this.screeningList = res.data.data;
        this.screeningList.forEach((item) => {
          item.lastTime = item.date + '\xa0\xa0' + item.time
        });
      },
      handletDelErr(err) {
        console.log(err)
      },
      //获取列表
      getScreeningList() {
        let param = new FormData();
        param.append('token', this.token);
        param.append('type', '');
        param.append('id', '');
        axios({
          method: 'post',
          url: '/lightspace/screeningList',
          data: param
        }).then(this.getScreenListSucc.bind(this)).catch(this.getScreenListErr.bind(this).bind(this))
      },
      getScreenListSucc(res) {
        console.log(res)
        if(res.data.status == 200 && res.data.data !== '') {
          this.screeningList = res.data.data;
          if(this.screeningList.length) {
          this.screeningList.forEach((item) => {
            item.lastTime = item.date + '\xa0\xa0' + item.time
          })
          }
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
        this.getClassList();
      },
      handleSelectClass(item) {
        this.classId = item.id;
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
        // console.log(res);
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
        param.append('schoolId', this.schoolId);
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
