<template>
  <div>
   <el-card>
     <el-row>
       <el-col :span="24" >
         <div style="padding: 10px  0 50px ;font-size: 30px; text-align: center;"> {{studentName}}戴镜历史检测记录</div>
       </el-col>
     </el-row>
     <el-row>
       <el-col :offset="22" :span="2">
          <el-button type="primary" @click="exportExcel">excel导出</el-button>
       </el-col>
     </el-row>
     <el-table :data="this.content" border  stripe style="width: 100%">
         <el-table-column type="index"></el-table-column>
         <el-table-column label="学校" prop="schoolName"></el-table-column>
         <el-table-column label="班级" prop="className"></el-table-column>
         <el-table-column label="学生姓名" prop="studentName"></el-table-column>
         <el-table-column label="右眼裸眼视力" prop="visionRight"></el-table-column>
         <el-table-column label="左眼裸眼视力" prop="visionLeft"></el-table-column>
         <el-table-column label="检测时间" prop="lastTime"></el-table-column>
         <el-table-column label="操作" >
             <template slot-scope="scope">
                 <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeRecord(scope.row.id)"></el-button>
             </template>
         </el-table-column>

     </el-table>
     <el-pagination
       background
       :current-page="this.number"
       @current-change="handleCurrentChange"
       layout="prev, pager, next"
       :page-size ="this.size"
       :total="this.totalElements">
     </el-pagination>
   </el-card>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        token: '',
        studentId: '',
        studentName: '',
        page: 1,
        content: [],
        totalElements: 0,
        number: 1,
        size: 10,
        page: 1
      }
    },
    created() {
       this.token = window.sessionStorage.getItem('token');
       this.studentId = this.$router.history.current.params.id;
       this.studentName = window.sessionStorage.getItem('studentNameWear')
       this.getStudentRecordList();
   },
   methods: {
     // 导出excel
     exportExcel() {
       this.loading = this.$loading({
          lock: true,
          text: '生成中,请耐心等候...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
       let param = new FormData();
       param.append('id', this.studentId);
       param.append('token', this.token);
       axios({
         method: 'post',
         data: param,
         url: '/lightspace/screeningWearStudentExcel'
       }).then(this.handleGetExcelSucc.bind(this)).catch(this.handleGetExcelErr.bind(this))
     },
     handleGetExcelSucc(res) {
       if(res.data.status == 200) {
         const downloadElement = document.createElement('a'); // 创建a标签
         downloadElement.href = 'https://www.guangliangkongjian.com/file/Members.xls';
         document.body.appendChild(downloadElement);
         downloadElement.click();
         document.body.removeChild(downloadElement);
         this.loading.close();
       }
     },
     handleGetExcelErr(err) {
       console.log(err)
     },
     handleCurrentChange(val) {
       this.page = val;
       this.getStudentRecordList();
     },
     getStudentRecordList() {
        let param = new FormData();
        param.append('token', this.token);
        param.append('id', this.studentId);
        param.append('page', this.page)
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/screeningWearByStudent'
        }).then((res) => {
       if(res.data.status == 200 && res.data.data !== '') {
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
          }
        }).catch((err) => {
          console.log(err)
        })
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
        // if(this.schoolId && this.classId === '' && this.studentId === '') {
        //   param.append('school', this.schoolId);
        // }else if(this.classId && this.studentId === ''&& this.schoolId) {
        //   param.append('class', this.classId)
        // }else if(this.studentId && this.classId && this.schoolId) {
        //   param.append('student', this.studentId)
        // }
        param.append('token', this.token);
        param.append('id', id);
        axios({
          method: 'post',
          url: '/lightspace/deleteScreeningWear',
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
   }
  }
</script>

<style>
</style>
