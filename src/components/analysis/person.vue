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
	           <el-cascader  :options="options" v-model="stu_cat" :props="cateProps" @change="handleChange"></el-cascader>
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
            @change="handleAutoChange"
            @select="handleSelect">
          </el-autocomplete>
        </el-col>
        <el-col :span="2">
             <div class="schoolSet">查看范围：</div>
        </el-col>
        <el-col :span="3">
            <el-select v-model="time" clearable>
            <el-option v-for="item in timeoptions" :key="item.value"  :label="item.label"  :value="item.value" >
            </el-option>
        </el-select>
        </el-col>
	      <el-col :span="4">
	         <el-button type="primary" @click="showPerson">查看个人分析</el-button>
	      </el-col>
	  </el-row>
    <el-row>
      <el-col :span="24" style="font-size: 40px;padding: 20px;margin: 20rpx;text-align: center;">
        学生视觉检查报告单
      </el-col>
    </el-row>
   <el-row>
     <el-col :span="16" :offset="4">
       <table cellpadding="0" cellspacing="0" class="report">
         <tr>
           <th colspan="2">姓名: {{studentWord.name}}</th>
           <th colspan="1">性别: {{studentWord.gender}}</th>
           <th colspan="2">生日:{{studentWord.birthday}}</th>
           <th colspan="3">学校: {{studentWord.school}}</th>
           <th colspan="2">电话:{{studentWord.phone}}</th>
         </tr>
         <tr>
           <td rowspan="3">屈光度</td>
           <td>眼别</td>
           <td>远裸视</td>
           <td>近裸视</td>
           <td>球镜</td>
           <td>柱镜</td>
           <td>轴位</td>
           <td>矫正视力</td>
           <td>瞳距</td>
           <td>主导眼</td>
         </tr>
         <tr>
           <td>右眼</td>
           <td>{{studentWord.farRight}}</td>
           <td>{{studentWord.nearRight}}</td>
           <td>{{studentWord.sphRight}}</td>
           <td>{{studentWord.cytRight}}</td>
           <td>{{studentWord.axisRight}}</td>
           <td>{{studentWord.correctRight}}</td>
           <td>{{studentWord.ipdRight}}</td>
           <td>{{studentWord.leadingRight}}</td>
         </tr>
         <tr>
           <td>左眼</td>
           <td>{{studentWord.farLeft}}</td>
           <td>{{studentWord.nearLeft}}</td>
           <td>{{studentWord.sphLeft}}</td>
           <td>{{studentWord.cytLeft}}</td>
           <td>{{studentWord.axisLeft}}</td>
           <td>{{studentWord.correctLeft}}</td>
           <td>{{studentWord.ipdLeft}}</td>
           <td>{{studentWord.leadingLeft}}</td>
         </tr>
         <tr>
           <td rowspan="5">视功能检查</td>
           <td colspan="5">眼球运动:{{studentWord.motion}}</td>
           <td colspan="4">立体检查:{{studentWord.stereopsis}}</td>
         </tr>
         <tr>
           <td colspan="5">遮盖眼位:{{studentWord.cover}}</td>
           <td colspan="4">Worth-4点:{{studentWord.worth}}</td>
         </tr>
         <tr>
           <td colspan="5">集合近点:{{studentWord.assembly}}</td>
           <td rowspan="3" >调节灵敏度</td>
           <td colspan="3">右眼:{{studentWord.splRight}}</td>
         </tr>
         <tr>
           <td colspan="5" rowspan="2">色觉检查:{{studentWord.colourVision}}</td>
           <!-- <td >调节灵敏度</td> -->
            <td colspan="3">左眼:{{studentWord.splLeft}}</td>
         </tr>
         <tr>
          <!-- <td colspan="5">色觉检查</td> -->
          <!-- <td >调节灵敏度</td> -->
           <td colspan="3">双眼:{{studentWord.splBinoculus}}</td>
         </tr>
         <!-- 生物测量检查 -->
         <tr>
           <td rowspan="3">生物测量检查</td>
           <td>眼别</td>
           <td colspan="2">水平曲率值</td>
           <td colspan="2">垂直曲率值</td>
           <td colspan="2">眼轴长度</td>
           <td >前房深度</td>
           <td >晶体厚度</td>
         </tr>
         <tr>
           <td>右眼</td>
           <td colspan="2">{{studentWord.levelRight}}</td>
           <td colspan="2">{{studentWord.verticalRight}}</td>
           <td colspan="2">{{studentWord.axialLengthRight}}</td>
           <td >{{studentWord.acdRight}}</td>
           <td >{{studentWord.ltRight}}</td>
         </tr>
         <tr>
           <td>左眼</td>
           <td colspan="2">{{studentWord.levelLeft}}</td>
           <td colspan="2">{{studentWord.verticalLeft}}</td>
           <td colspan="2">{{studentWord.axialLengthLeft}}</td>
           <td >{{studentWord.acdLeft}}</td>
           <td >{{studentWord.ltLeft}}</td>
         </tr>
         <!-- 眼部健康检查 -->
         <tr  style="text-align: left;">
           <td rowspan="2">眼部健康检查</td>
           <td colspan="9">裂隙灯检查:{{studentWord.slitLamp}}</td>
         </tr>
         <tr>
           <td colspan="9">眼底照相检查:{{studentWord.retCam}}</td>
         </tr>
         <!-- 身体情况 -->
         <tr align="left">
           <td rowspan="2">身体情况</td>
           <td colspan="9">身高(cm): {{studentWord.height}}</td>
         </tr>
         <tr>
           <td colspan="9">体重(kg):{{studentWord.weight}}</td>
         </tr>
        <!-- 处理建议 -->
        <tr>
          <td >处理建议</td>
          <td colspan="9">{{studentWord.suggest}}</td>
        </tr>

       </table>
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
      rightQuY: [],
      studentWord: [],
      time: 365,
      timeoptions:[{
        value: 30 ,
        label: '一个月'
      }, {
        value: 90,
        label: '三个月'
      }, {
        value: 180,
        label: '六个月'
      }, {
        value: 365,
        label: '一年'
      }],
		}
	},
	methods: {
    handleAutoChange(value) {
      console.log(value)
    },
	  drawLine() {
      let myChart = echarts.init(this.$refs.left);
	     this.option = {
        title: {
             text: '裸眼视力分析',
             subtext: '',
             left: 'center'
         },
        legend: {
                  orient: 'vertical',
                   data: ['左眼裸眼视力', '右眼裸眼视力'],
                   left: 'left',
                   y: 'top',
                   top:'5%',
                 },
       grid: {                   // 折线位置
               top:'8%',
               right: '10%',
             },
        xAxis: {
            type: 'category',
            symbol: 'none',
            boundaryGap: true,
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
                    orient: 'vertical',
                    data: ['左眼曲率', '右眼曲率'],
                    left: 'left',
                    y: 'top',
                    top:'5%',
                },
       grid: {                   // 折线位置
               top:40,
               right: '10%',
             },
        xAxis: {
               type: 'category',
               symbol: 'none',
               boundaryGap: true,
               data: this.leftQuX
         },
         grid: {                   // 折线位置
                 top:'8%',
                 right: '10%',
               },
         yAxis: {
             name: '单位为(D)',
             type: 'value',
             min:35,
             max:55,
             splitNumber:20,
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
              left: 'center',
              padding:[5 , 0 ,10, 0]
          },
         legend: {
                    orient: 'vertical',
                    data: ['左眼眼轴长度', '右眼眼轴长度'],
                    left: 'left',
                    selectedMode:false,
                    y: 'top',
                    top:'5%',
                },
        grid: {                   // 折线位置
                top:'8%',
                right: '10%',
              },
         xAxis: {
             type: 'category',
             symbol: 'none',
             boundaryGap: true,
             data: this.leftZhouX
         },
         yAxis: {
             name: '单位为(mm)',
             type: 'value',
             min:15,
             max:35,
             splitNumber:20
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
    showPerson() {
        let param = new URLSearchParams();
        if(!this.token) {
          this.$message.error('请重新登录');
        }else if(!this.studentId) {
          this.$message.error('请先选择学生')
        }else if(!this.time) {
          this.$message.error('请选择查看时间范围')
        } else{
          param.append('token', this.token);
          param.append('time', this.time * 86400 )
          param.append('studentId', this.studentId);
          axios({
            method: 'post',
            data: param,
            url: '/lightspace/studentRecords'
          }).then(this.handleGetStudentRecordSucc.bind(this)).catch(this.handleGetStudentRecordErr.bind(this))
        }
    },
    handleGetStudentRecordSucc(res) {
      if(res.data.status === 10204) {
          this.$message.error(res.data.msg);
          this.$router.push('/login');
      } else if(res.data.status == 200) {
        res? res= res.data.data: '';
        if(res.studnetWord !== null) {
          this.studentWord = res.studnetWord;
        }
        this.leftLuoX = res.visionLeft.xDataList;
        this.leftLuoY = res.visionLeft.yDataList;
        this.rightLuoX = res.visionRight.xDataList;
        this.rightLuoY = res.visionRight.yDataList;
        this.leftZhouX = res.eyeAxisLengthLeft.xDataList;
        this.leftZhouY = res.eyeAxisLengthLeft.yDataList;
        this.rightZhouX = res.eyeAxisLengthRight.xDataList;
        this.rightZhouY = res.eyeAxisLengthRight.yDataList;
        this.leftQuX = res.curvatureLeft.xDataList;
        this.leftQuY = res.curvatureLeft.yDataList;
        this.rightQuX = res.curvatureRight.xDataList;
        this.rightQuY = res.curvatureRight.yDataList;
        this.drawLine();
        this.drawLine2();
        this.drawLine3();
      }
    },
    handleGetStudentRecordErr(err) {
      console.log(err)
    }
	}
}
</script>
<style lang="less" scoped>
  .el-cascader {
    width: 100%;
  }
  .report{margin: 20px 0;}
  .report th, td {padding: 30px;text-align:center;border:1px solid #ccc; text-align: left;}
  .report tr:nth-child(2n+1) td{text-align: left;}
</style>
