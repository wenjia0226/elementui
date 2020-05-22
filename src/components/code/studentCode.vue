<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>生成二维码</el-breadcrumb-item>
        <el-breadcrumb-item>生成学生码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="10">
        <el-col :span="2">
             <div class="schoolSet">学校班级选择：</div>
        </el-col>
          <el-col :span="4">
               <el-cascader  :options="options" v-model="stu_cat" :props="cateProps" @change="handleChange" width="100%"></el-cascader>
          </el-col>
          <el-col :span="2">
               <div class="schoolSet">学生姓名选择：</div>
          </el-col>
          <el-col :span="4">
            <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              clearable
              placeholder="请输入学生姓名"
              @select="handleSelect">
            </el-autocomplete>
          </el-col>

          <el-col :span="4">
             <el-button type="primary" @click="getCode">下载二维码</el-button>
          </el-col>
        </el-row>
     </el-card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    created() {
      this.token = window.sessionStorage.getItem('token');
      this.getOPtions();
    },
    data() {
      return {
        token: '',
        state1: '',
        stu_cat: [],
        options: [],
        classId: '',
        schoolId: '',
        cateProps: {
        label: 'name', //看到的是哪个属性
        value: 'id', // 选中的是谁的值
        children: 'children' //哪个属性实现父子节点嵌套
        },
        studentList: [],
        loading: {}
      }
    },
    methods: {
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
      handleChange() {
        this.state1 = ''; //如果改变学校班级，学生姓名自动清空
         this.schoolId = this.stu_cat[0];
         this.classId = this.stu_cat[1];
         this.studentList = [];
         this.studentId = '';
         this.getStudentName();
      },
      //模糊查询
      querySearch(queryString, cb) {
        var studentList = this.studentList;
        var results = queryString ? studentList.filter(this.createFilter(queryString)) : studentList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (student) => {
          return (student.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
         this.studentId = item.id;
     },
     getStudentName() {
       let param = new URLSearchParams();
       param.append('token', this.token);
       param.append('schoolId' ,this.schoolId);
       param.append('classId', this.classId);
       axios({
         method: 'post',
         url: '/lightspace/queryStudentBySidCid',
         data: param
       }).then(this.getStudentListSucc.bind(this)).catch(this.getStudnentListErr.bind(this))
     },
     getStudentListSucc(res) {
       if(res.data.status === 10204) {
         this.$message.error(res.data.msg);
         this.$router.push('/login');
       } else if(res.data.status == 200) {
         res ? res = res.data.data: '';

         for(let i  =0; i <res.length; i++) {
           this.studentList.push({
             value: res[i].name,
             id: res[i].id
           })
         }
       }
     },
     getStudnentListErr(err) {
       console.log(err)
     },
     getCode() {
      this.loading = this.$loading({
         lock: true,
         text: '生成中,请耐心等候...',
         spinner: 'el-icon-loading',
         background: 'rgba(0, 0, 0, 0.7)'
       });
       let param= new FormData();
       param.append('token', this.token);
       param.append('id',this.studentId);
       param.append('type', 'student');
       axios({
         method: 'post',
         url: '/lightspace/download',
         data: param
       }).then(this.handleGetCodeSucc.bind(this)).catch(this.handleGetCodeErr.bind(this))
    },
    handleGetCodeSucc(res) {
      if(res.data.status == 200) {
		  // console.log(res)
        const downloadElement = document.createElement('a'); // 创建a标签
        downloadElement.href = res.data.data;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        this.loading.close();
        this.state1 = '';
        this.stu_cat = '';
      }
    },
    handleGetCodeErr(err) {
      console.log(err)
    }
   }
  }
</script>

<style>
  .el-cascader {
    width: 100%;
  }
</style>
