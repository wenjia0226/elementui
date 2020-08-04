<template>
  <div>
    <el-card>
            <el-row >
              <el-col :span="24" >
                <div style="padding: 10px  0 50px ;font-size: 30px; text-align: center;">{{schoolName}}
                <span style="color:red"> {{schoolEyeType}}</span>年级分布</div>
              </el-col>
            </el-row>
           <el-table border :data="infoList"  stripe style="width: 100%" >
             <el-table-column type="index"></el-table-column>
             <el-table-column label="所属学校" prop="schoolNmae"></el-table-column>
             <el-table-column label="所属班级" prop="name"></el-table-column>
             <el-table-column label="学生数量" prop="value"></el-table-column>
             <el-table-column label="操作">
                 <template slot-scope="scope">
                     <el-button type="primary"  size="middle" @click="seeDetail(scope.row)">查看</el-button>
                 </template>
             </el-table-column>
            </el-table>
         </el-card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    created() {
      this.token = window.sessionStorage.getItem('token');
      this.schoolId =this.$router.history.current.query.schoolId;
      this.type = this.$router.history.current.query.type;
      this.state = this.$router.history.current.query.state;
      this.grade = this.$router.history.current.query.grade;
      this.schoolName = window.sessionStorage.getItem('schoolName')
      this.schoolEyeType = window.sessionStorage.getItem('schoolEyeType');
      this.getList();
    },
    data() {
      return {
        token: '',
        type: '',
        state: '',
        schoolId: '',
        grade: '',
        infoList: [],
        schoolName: '',
        schoolEyeType: ''
      }
    },
    methods: {
      seeDetail(row) {
        let id = row.classId;
        window.sessionStorage.setItem('className', row.name)
        let routeUrl = this.$router.resolve({
            path: "/detailClassSurvey/",
            query: {
                    classId: id,
                    type: this.type,
                    state: this.state

            }
        });
        window.open(routeUrl.href, '_blank');
      },
      getList() {
        let param = new FormData();
         param.append('token', this.token);
         param.append('type', this.type);
         param.append('state', this.state);
         param.append('schoolId', this.schoolId);
         param.append('grade', this.grade)
         axios({
           method: 'post',
           url:'/lightspace/grade2ClassInfiltration',
           data: param
           }).then((res) => {
             console.log(res)
             if(res.data.status == 200) {
               this.infoList = res.data.data
             }
           }).catch((err) => {
             console.log(err)
           })
      }
    }

  }
</script>

<style>
</style>
