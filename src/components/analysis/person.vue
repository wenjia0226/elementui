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
	           <el-cascader  :options="options" v-model="stu_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
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
	      <el-col :span="4">
	         <el-button type="primary" @click="showPerson">查看个人分析</el-button>
	      </el-col>
	  </el-row>
    <el-row style="margin: 10px 0">
       <el-col :span="24">
         <div ref="left" style="width: 100%;height: 400px"></div>
       </el-col>
     </el-row>
     <el-row style="margin: 10px 0">
       <el-col :span="24">
         <div ref="right" style="width: 100%;height: 400px"></div>
       </el-col>
     </el-row>
     <el-row style="margin: 10px 0">
       <el-col :span="24">
         <div ref="both" style="width: 100%;height: 400px"></div>
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
      studentList: [],
      studetId: '',
      leftLuoX: [],
      leftLuoY: [],
      rightLuoX: [],
      rightLuoY: [],
      leftZhouX: [],
      leftZhouY: [],
      rightZhouX: [],
      rightZhouY: [],
      leftQuX:[],
      leftQuY:[],
      rightQuX: [],
      rightQuY: []
		}
	},
	methods: {
	  drawLine() {
      let myChart = echarts.init(this.$refs.left);
	     this.option = {
        title: {
             text: '裸眼视力分析',
             subtext: '',
             left: 'center'
         },
        legend: {
                   data: ['左眼裸眼视力', '右眼裸眼视力'],
                   left: 'left',
               },
        xAxis: {
            type: 'category',
            symbol: 'none',
            boundaryGap: false,
            data: this.leftLuoX
        },
        yAxis: {
            type: 'value',
            min:0,
            max:1,
            splitNumber:10
        },
        series: [{
           name: '左眼裸眼视力',
            data: this.leftLuoY,
            type: 'line',
            smooth: true,
             color: 'blue'
        },
        {
            name: '右眼裸眼视力',
            data: this.rightLuoY,
            type: 'line',
             smooth: true,
            color: 'red'
        }]
      }
      myChart.setOption(this.option)
	   },
     drawLine3() {
       let myChart = echarts.init(this.$refs.both);
       this.option = {
         title: {
              text: '曲率分析',
              subtext: '',
              left: 'center'
          },
         legend: {
                    data: ['左眼曲率', '右眼曲率'],
                    left: 'left',
                },
         xAxis: {
             type: 'category',
             symbol: 'none',
             boundaryGap: false,
             data: this.leftQuX
         },
         yAxis: {
             type: 'value',
             min:0,
             max:50,
             splitNumber:100
         },
         series: [{
            name: '左眼曲率',
             data: this.leftQuY,
             type: 'line',
             smooth: true,
             color: 'blue'
         },
         {
             name: '右眼曲率',
             data: this.rightQuY,
             type: 'line',
             smooth: true,
             color: 'red'
         }]
      }
       myChart.setOption(this.option)
     },
     drawLine2() {
       let myChart = echarts.init(this.$refs.right);
       this.option = {
         title: {
              text: '眼轴分析',
              subtext: '',
              left: 'center'
          },
         legend: {
                    data: ['左眼眼轴长度', '右眼眼轴长度'],
                    left: 'left',
                },
         xAxis: {
             type: 'category',
             symbol: 'none',
             boundaryGap: false,
             data: this.leftZhouX
         },
         yAxis: {
             type: 'value',
             min:0,
             max:50,
             splitNumber:100
         },
         series: [{
            name: '左眼眼轴长度',
             data: this.leftZhouY,
             type: 'line',
             smooth: true,
              color: 'blue'
         },
         {
             name: '右眼眼轴长度',
             data: this.rightZhouY,
             type: 'line',
              smooth: true,
             color: 'red'
         }]
      }
       myChart.setOption(this.option)
     },
    //模糊查询学生名
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
          value: res[i].name,
          id: res[i].id
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
      return (student) => {
        return (student.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
       this.studentId = item.id;
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
        let param = new URLSearchParams();
        param.append('token', this.token);
        param.append('studentId', 15);
        axios({
          method: 'post',
          data: param,
          url: '/api/studentRecords'
        }).then(this.handleGetStudentRecordSucc.bind(this)).catch(this.handleGetStudentRecordErr.bind(this))
    },
    handleGetStudentRecordSucc(res) {
      if(res.status !== 200) return;
      console.log(res);
      res? res= res.data.data: '';
      for(let i = 0; i < res.length; i++) {
        if(res[i].name=="左眼裸眼视力") {
          this.leftLuoX = res[0].xDataList;
          this.leftLuoY = res[0].yDataList;
        }else if(res[i].name == '右眼裸眼视力') {
           this.rightLuoX = res[1].xDataList;
           this.rightLuoY = res[1].yDataList;
         }else if(res[i].name=="左眼眼轴长度") {
           this.leftZhouX = res[2].xDataList;
           this.leftZhouY = res[2].yDataList;
         }else if(res[i].name == '右眼眼轴长度') {
            this.rightZhouX = res[3].xDataList;
            this.rightZhouY = res[3].yDataList
          }else if(res[i].name == '左眼曲率') {
            this.leftQuX = res[4].xDataList;
            this.leftQuY = res[4].yDataList;
          }else {
            this.rightQuX = res[5].xDataList;
            this.rightQuY = res[5].yDataList;
          }
         }
        console.log(this.rightQuY, this.leftQuY)
      this.drawLine();
      this.drawLine2();
      this.drawLine3();
    },
    handleGetStudentRecordErr(err) {
      console.log(err)
    }
	}
}
</script>
<style lang="less">
.el-cascader {
  width: 100%;
}
</style>
