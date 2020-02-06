<template>
    <div>
	<el-breadcrumb separator-class="el-icon-arrow-right">
	    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	    <el-breadcrumb-item>数据分析</el-breadcrumb-item>
	    <el-breadcrumb-item>个人分析</el-breadcrumb-item>
	</el-breadcrumb>
	<el-card>
	  <el-row :gutter="10">
      <el-col :span="2">
           <div class="schoolSet">学校班级选择：</div>
      </el-col>
	      <el-col :span="4">
	           <el-cascader  width= "100%" :options="options" v-model="stu_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
	      </el-col>
        <el-col :span="2">
             <div class="schoolSet">请填写学生姓名：</div>
        </el-col>
        <el-col :span="4">
          <el-autocomplete
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入学生姓名"
            clearable
            @select="handleSelect"></el-autocomplete>
        </el-col>
	      <el-col :span="6">
	         <el-button type="primary" @click="showPerson">查看个人分析</el-button>
	      </el-col>
	  </el-row>
	</el-card>
	</div>
</template>
<script>
  import echarts from 'echarts'
  import axios from 'axios'
export default {
	created() {
	  this.token = window.sessionStorage.getItem('token');
	  this.getOPtions();
	},
    data() {
		return {
      token: '',
			stu_cat: [],
			cateProps: {
			label: 'name', //看到的是哪个属性
			value: 'id', // 选中的是谁的值
			children: 'children' //哪个属性实现父子节点嵌套
			},
			options: [],
			classId: '',
			schoolId: '',
      restaurants: [],
      state1: '',
      studentList: []
		}
	},
	methods: {
    getStudentName() {
      let param = new URLSearchParams();
      param.append('token', this.token);
      param.append('schoolId' ,this.schoolId);
      param.append('classId', this.classId);
      axios({
        method: 'post',
        url: '/api/queryStudentBySidCid',
        data: param
      }).then(this.getStudentListSucc.bind(this)).catch(this.getStudnentListErr.bind(this))
    },
    getStudentListSucc(res) {
      if(res.status !== 200) return;
      res ? res = res.data.data: '';
      for(let i  =0; i <res.length; i++) {
        this.studentList.push({
          value: res[i].name
        })
      }

    },
    getStudnentListErr(err) {
      console.log(err)
    },
    //模糊查询
    querySearch(queryString, cb) {
      var studentList = this.studentList;
      var results = queryString ? studentList.filter(this.createFilter(queryString)) : studentList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      console.log(queryString);
      return (studentList) => {
        return (studentList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      // console.log(item);
     },
		//获取级联选择器中的数据
		getOPtions() {
		    let param = new URLSearchParams();
		    param.append('token', this.token);
		    axios({
		        method: 'post',
		        url: '/api/cascade1',
		        data: param
		    }).then(this.handleGetOptionSucc.bind(this)).catch(this.handleGetOptionErr.bind(this))
		},
		handleGetOptionSucc (res) {
		    if(res.status !==200) return this.$message.error('获取级联数据失败');
		    this.options =  res.data.data;
		},
		handleGetOptionErr(err) {
		    console.log(err)
		},
		handleChange() {
		   this.schoolId = this.stu_cat[0];
		   this.classId = this.stu_cat[1];
       this.getStudentName();
		},
    showPerson() {

    }
	}
}
</script>
<style lang="less">

</style>
