<template>
  <div>
    <el-card>
       <el-row >
         <el-col :span="24" >
           <div style="padding: 10px  0 50px ;font-size: 30px; text-align: center;">{{schoolName}}
           <span style="color:red"> {{schoolEyeType}}</span>分布</div>
         </el-col>
       </el-row>
      <el-table border :data="infoList"  stripe style="width: 100%" >
        <el-table-column type="index"></el-table-column>
        <el-table-column label="年级" prop="grade"></el-table-column>
        <el-table-column label="人数" prop="value"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary"  size="middle" @click="seeDetail(scope.row.grade)">查看</el-button>
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
        infoList: [],
        schoolName: '',
        schoolEyeType: '',
        grade: 1
      }
    },
    methods: {
      seeDetail(grade) {
        console.log(grade)
         
        if(grade == '一年级') {
          this.grade = 1
        }else if(grade == '二年级') {
          this.grade = 2
        }else if(grade == '三年级') {
          this.grade = 3
        }else if(grade == '四年级') {
          this.grade = 4
        }else if(grade == '五年级') {
          this.grade = 5
        }else if(grade == '六年级') {
          this.grade = 6
        }
        let routeUrl = this.$router.resolve({
            path: "/detailGradeSurvey/",
            query: {
                    token: this.token,
                    grade: this.grade,
                    type: this.type,
                    state: this.state,
                    schoolId: this.schoolId

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
         axios({
           method: 'post',
           url:'/lightspace/gradeInfiltration',
           data: param
           }).then((res) => {
             console.log(res)
             if(res.data.status == 200) {
               this.infoList = res.data.data
             }
           }).catch((err) => {
             console.log(err)
           })
      },
    }
  }
</script>

<style>
</style>
