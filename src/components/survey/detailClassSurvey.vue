<template>
  <div>
     <el-card>
        <el-row >
          <el-col :span="24" >
            <div style="padding: 10px  0 50px ;font-size: 30px; text-align: center;">{{schoolName}}{{eyeType}}学生名单</div>
          </el-col>
        </el-row>
       <el-table border :data="childrenInfoList"  stripe style="width: 100%" >
         <el-table-column type="index"></el-table-column>
         <el-table-column label="所属学校" prop="schoolName"></el-table-column>
         <el-table-column label="所属班级" prop="classesName"></el-table-column>
         <el-table-column label="姓名" prop="name"></el-table-column>
         <el-table-column label="右眼小数计数视力" prop="visionRightStr"></el-table-column>
          <el-table-column label="左眼小数计数视力" prop="visionLeftStr"></el-table-column>
       </el-table>
     </el-card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    created() {
      this.token = window.sessionStorage.getItem('token');
      this.schoolName = window.sessionStorage.getItem('cschoolName');
      this.className = window.sessionStorage.getItem('className');
      this.eyeType = window.sessionStorage.getItem('eyeType');
      this.classId =this.$router.history.current.query.classId;
      this.type = this.$router.history.current.query.type;
      this.state = this.$router.history.current.query.state;
      this.getList();
    },
    data() {
      return {
        type: '',
        state: '',
        token:'',
        classId: '',
        childrenInfoList: [],
        eyeType: '',
        schoolName: '',
        className: ''
      }
    },
    methods: {
      getList() {
        let param = new FormData();
         param.append('token', this.token);
         param.append('type', this.type);
         param.append('state', this.state);
         param.append('classId', this.classId);
         axios({
           method: 'post',
           url:'/lightspace/classInfiltration',
           data: param
           }).then((res) => {
             // console.log(res)
             if(res.data.status == 200) {
               this.childrenInfoList = res.data.data
             }
           })
      },
    }
  }
</script>

<style>
</style>
