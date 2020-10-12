<template>
  <div>
   <el-card>
     <el-row>
       <el-col :span="24" >
         <div style="padding: 10px  0 50px ;font-size: 30px; text-align: center;"> {{studentName}}屈光度历史检测记录</div>
       </el-col>
     </el-row>
     <el-table :data="this.content" border  stripe style="width: 100%">
         <el-table-column type="index"></el-table-column>
         <el-table-column label="学校" prop="schoolName"></el-table-column>
         <el-table-column label="班级" prop="className"></el-table-column>
         <el-table-column label="学生姓名" prop="studentName"></el-table-column>
         <el-table-column label="右眼屈光度" >
			 <template slot-scope="scope">
				<el-input v-model="scope.row.diopterRight" clearable @input="handleRightChange" @blur="handleSubmitRight(scope.row)" ></el-input>
			 </template>
         </el-table-column>
         <el-table-column label="左眼屈光度" >
			 <template slot-scope="scope">
				 <el-input v-model="scope.row.diopterLeft" clearable @input="handleLeftChange" @blur="handleSubmitRight(scope.row)" ></el-input>
			 </template>
         </el-table-column>
         <el-table-column label="上传时间" prop="genTime"></el-table-column>
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
        page: 1,
		showEditDiopter: false,
		rightInput: '',
		leftInput: '',
		editDiopterForm: {
			left: '',
			right: ''
		},
		editDiopterRules: {
			left:{ required: true,  message: '请输入左眼屈光度', trigger: 'blur' },
			right:{ required: true,  message: '请输入右眼屈光度', trigger: 'blur' }
		}
      }
    },
    created() {
       this.token = window.sessionStorage.getItem('token');
       this.studentId = this.$router.history.current.params.id;
       this.studentName = window.sessionStorage.getItem('studentName')
       this.getStudentRecordList();
   },
   methods: {
	   handleRightChange(val) {
	   	this.rightInput = val;
	   },
	   handleLeftChange(val) {
	   	this.leftInput = val;
	   },
	   handleSubmitRight(row) {
	    let param = new FormData();
	    param.append('token', this.token);
	    param.append('type', 2);
	    param.append('id', row.id);
	    param.append('diopterLeft', this.leftInput);
	    param.append('diopterRight', this.rightInput);
	   axios({
	   	method: 'post',
	   	data: param,
	   	url: '/lightspace/saveDiopter'
	     }).then(this.handleSaveDiopterSucc.bind(this)).catch((err)=> {console.log(err)})
	   
	   },
	   handleSaveDiopterSucc(res) {
	   		if(res.data.status == 200) {
			 this.$message.success('修改成功')
	   		 this.getStudentRecordList();
	   	 }
	   },
	   editDialogClosed() {
		   this.$refs.editDiopterRef.resetFields()
	   },
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
         url: '/lightspace/screeningStudentExcel'
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
          url: '/lightspace/diopterByStudent'
        }).then((res) => {
       if(res.data.status == 200 && res.data.data !== '') {
           res ? res= res.data.data: '';
           this.content = res.content;
           this.totalElements = res.totalElements;
           this.size = res.size;
           this.number = res.number + 1;
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
        param.append('token', this.token);
        param.append('id', id);
        axios({
          method: 'post',
          url: '/lightspace/deleteDiopter',
          data: param
        }).then(this.handleDelSucc.bind(this)).catch(this.handletDelErr.bind(this))
      },
      handleDelSucc(res) {
        //console.log(res)
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
       this.getStudentRecordList()
		
      },
      handletDelErr(err) {
        console.log(err)
      },
   }
  }
</script>

<style>
</style>
