<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基础数据</el-breadcrumb-item>
        <el-breadcrumb-item>检测记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">

          <el-col :span="3" >
                 <el-button type="primary" @click="handdlePi">批量导入</el-button>
          </el-col>
      </el-row>
	  <!-- 学校列表 -->
	  <el-table :data="this.reportList.slice((currentPage-1) * pageSize, currentPage * pageSize)" border  stripe style="width: 100%" >
	      <el-table-column type="index"></el-table-column>
	      <el-table-column label="报告名称" prop="name"></el-table-column>
	      <el-table-column label="时间" prop="time"></el-table-column>
	      <!-- <el-table-column label="操作">
	          <template slot-scope="scope">
	              <el-button type="primary" size="middle" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)" ></el-button>
	              <el-button type="danger"  size="middle" icon="el-icon-delete" @click="removeSchoolById(scope.row.id)"></el-button>
	          </template>
	      </el-table-column> -->
	  </el-table>
	  <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[1, 2, 5, 10]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="reportList.length">
	  </el-pagination>
    </el-card>

    <el-dialog :visible.sync="showDialog"  width="30%" center >
      <el-row>
        <el-col :span="12">
          <a class="download" href="http://www.guangliangkongjian.com/download/唐山市师范附属小学+二（3）班+李泽雅.doc">下载模板</a>
          <!-- <el-button @click="DownLoadTemplate" type="primary" size="small">下载模板</el-button> -->
        </el-col>
        <el-col :span="12">
          <el-upload
            :data="pdfData"
            class="upload-demo"
            ref="upload"
            action="/lightspace/studentWord"
            :before-upload="beforeUpload"
            accept=".doc"
            :limit="1"
            :on-success="handleSuccess"
            :file-list="fileList"
            :on-exceed="handleExceed"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.doc文件，且不超过500kb</div>
          </el-upload>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    created() {
       this.token = window.sessionStorage.getItem('token');
	   this.getReportList();
    },
    data() {
      return {
		reportList: [],
		currentPage: 1,
		pageSize: 5,
		total: 0,
        showDialog: false,
        fileList: [],//此数组中存入所有提交的文档信息
        pdfData: {
            file: '',
            token: ''
        },
      }
    },
    methods: {
      handdlePi() {
        this.showDialog = true;
      },
      handleExceed(files, fileList) {
         this.$message.warning(`每次只能选择1个文件`);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      beforeUpload(file) {
        this.pdfData.file = file;
        this.pdfData.token = this.token;
       },
       handleSuccess(res, file, fileList) {
        this.fileList = [];
         console.log(res);
         if(res.status == 10215) {
           this.$message.error(res.msg);
           return;
         }else if(res.status == 200) {
           this.$message.success(res.msg);
         }
       },
	  getReportList() {
		let param = new FormData();
		param.append('token', this.token);
		axios({
			method: 'post',
			url: '/lightspace/studentWordList',
			data: param
		}).then(this.handleGetReportSucc.bind(this))
		  .catch(this.handleGetReportErr.bind(this))
	   },
	   handleGetReportSucc(res) {
       console.log(res)
		 if(res.data.status === 10204) {
			 this.$message.error(res.data.msg);
			 this.$router.push('/login');
			} else if(res.data.status == 200) {
        console.log(res.data.data)
			  this.reportList = res.data.data;
		   }
	   },
	   handleGetReportErr(error) {
		  console.log(error)
	   },
	   //监听pageSize改变事件
	   handleSizeChange(newSize) {
	       this.pageSize = newSize
	       this.getSchoolList();
	   },
	   //监听页码值改变事件
	   handleCurrentChange(val) {
	      this.currentPage = val;
	   },
    }
  }
</script>
<style>
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
