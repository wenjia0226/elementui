<template>
  <div>
	<el-breadcrumb separator-class="el-icon-arrow-right">
	    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	    <el-breadcrumb-item>数据分析</el-breadcrumb-item>
	    <el-breadcrumb-item>个人分析</el-breadcrumb-item>
	</el-breadcrumb>
	<el-card>
	  <el-row :gutter="10">
      <el-col :span="3">
          <div class="schoolSet">学校班级选择：</div>
      </el-col>
	      <el-col :span="6">
	        <el-cascader  :options="options" v-model="stu_cat" :props="cateProps" @change="handleChange"></el-cascader>
	      </el-col>
        <el-col :span="3">
           <div class="schoolSet">学生姓名选择：</div>
        </el-col>
        <el-col :span="3">
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
    <el-row style="margin: 10px auto" v-if="this.leftLuoX.length">
      <el-col :span="24">
         <div ref="left" style="width: 100%;height: 400px;margin: 0 auto"></div>
       </el-col>
     </el-row>
    <el-row style="margin: 10px auto" v-if="this.rightZhouY.length">
       <el-col :span="24">
         <div ref="right" style="width: 100%;height: 400px"></div>
       </el-col>
     </el-row>
     <el-row style="margin: 10px auto" v-if="this.rightQuY.length">
       <el-col :span="24">
         <div ref="both" style="width: 100%;height: 400px"></div>
       </el-col>
    </el-row>
    <el-row v-if="this.studentWord">
      <el-col :span="16" :offset="4" style="font-size: 40px;padding: 20px;margin: 20rpx auto;text-align: center;">
        学生视觉检查报告单
      </el-col>
    </el-row>
    <el-row  v-if="this.studentWord">
      <el-col :span="16" :offset="4">
        <table cellpadding="0" cellspacing="0" class="newReport" style="margin: 0 auto">
          <tr class="reportTitle" style="margin: 20px 0">
            <div style="margin: 10px 0"> 屈光度</div>
          </tr>
          <tr class="bgReport">
            <td align="center">眼别</td>
            <td>远裸视</td>
            <td>近裸视</td>
            <td>球镜</td>
            <td>柱镜</td>
            <td>轴位</td>
            <td>矫正视力</td>
            <td>瞳距</td>
            <td>主导眼</td>
          </tr>
          <tr class="bgReport">
            <td >右眼</td>
            <td v-if="studentWord.farRight">{{studentWord.farRight}}</td>
            <td v-if="!studentWord.farRight">--/--</td>
            <td v-if="studentWord.nearRight">{{studentWord.nearRight}}</td>
            <td v-if="!studentWord.nearRight">--/--</td>
            <td v-if="studentWord.sphRight">{{studentWord.sphRight}}</td>
            <td v-if="!studentWord.sphRight">--/--</td>
            <td v-if="studentWord.cytRight">{{studentWord.cytRight}}</td>
            <td v-if="!studentWord.cytRight">--/--</td>
            <td v-if="studentWord.axisRight">{{studentWord.axisRight}}</td>
            <td v-if="!studentWord.axisRight">--/--</td>
            <td v-if="studentWord.correctRight">{{studentWord.correctRight}}</td>
            <td v-if="!studentWord.correctRight">--/--</td>
            <td v-if="studentWord.ipdRight">{{studentWord.ipdRight}}</td>
            <td v-if="!studentWord.ipdRight">--/--</td>
            <td rowspan="2" v-if="studentWord.leadingRight">{{studentWord.leadingRight}}</td>
            <td rowspan="2" v-if="!studentWord.leadingRight">--/--</td>
          </tr>
          <tr class="bgReport">
            <td>左眼</td>
            <td v-if="studentWord.farLeft">{{studentWord.farLeft}}</td>
             <td v-if="!studentWord.farLeft">--/--</td>
            <td v-if="studentWord.nearLeft">{{studentWord.nearLeft}}</td>
            <td v-if="!studentWord.nearLeft">--/--</td>
            <td v-if="studentWord.sphLeft">{{studentWord.sphLeft}}</td>
            <td v-if="!studentWord.sphLeft">--/--</td>
            <td v-if="studentWord.cytLeft">{{studentWord.cytLeft}}</td>
            <td v-if="!studentWord.cytLeft">--/--</td>
            <td v-if="studentWord.axisLeft">{{studentWord.axisLeft}}</td>
            <td v-if="!studentWord.axisLeft">--/--</td>
            <td v-if="studentWord.correctLeft">{{studentWord.correctLeft}}</td>
            <td v-if="!studentWord.correctLeft">--/--</td>
            <td v-if="studentWord.ipdLeft">{{studentWord.ipdLeft}}</td>
            <td v-if="!studentWord.ipdLeft">--/--</td>
            <!-- <td>{{studentWord.leadingLeft}}</td> -->
          </tr>
          <tr class="reportTitle" >
            <div style="margin: 10px 0"> 视功能检查</div>
          </tr>
          <tr class="noBorder">
            <td colspan="5" v-if="studentWord.motion">眼球运动:{{studentWord.motion}}</td>
            <td colspan="5" v-if="!studentWord.motion">眼球运动:--/--</td>
            <td colspan="4" v-if="studentWord.stereopsis">立体检查:{{studentWord.stereopsis}}</td>
            <td colspan="4" v-if="!studentWord.stereopsis">立体检查:--/-- </td>
          </tr>
          <tr class="noBorder">
            <td colspan="5" v-if="studentWord.cover">遮盖眼位:{{studentWord.cover}}</td>
             <td colspan="5" v-if="!studentWord.cover">遮盖眼位:--/-- </td>
            <td colspan="4" v-if="studentWord.worth">Worth-4点:{{studentWord.worth}}</td>
            <td colspan="4" v-if="!studentWord.worth">Worth-4点:--/-- </td>
          </tr>
          <tr class="noBorder">
            <td colspan="5" v-if="studentWord.assembly">集合近点:{{studentWord.assembly}}</td>
            <td colspan="5" v-if="!studentWord.assembly">集合近点:--/-- </td>
            <td rowspan="3">调节灵敏度</td>
            <td colspan="3" v-if="studentWord.splRight">右眼:{{studentWord.splRight}}cpm</td>
            <td colspan="3" v-if="!studentWord.splRight">右眼:{{studentWord.splRight}}cpm</td>
          </tr>
          <tr class="noBorder">
            <td colspan="5" rowspan="2" v-if="studentWord.colourVision">色觉检查:{{studentWord.colourVision}}</td>
            <td colspan="5" rowspan="2" v-if="!studentWord.colourVision">色觉检查:--/--</td>
            <!-- <td >调节灵敏度</td> -->
             <td colspan="3" v-if="studentWord.splLeft">左眼:{{studentWord.splLeft}}cpm</td>
             <td colspan="3" v-if="!studentWord.splLeft">左眼:--/--</td>
          </tr>
          <tr class="noBorder">
           <!-- <td colspan="5">色觉检查</td> -->
           <!-- <td >调节灵敏度</td> -->
            <td colspan="3" v-if="studentWord.splBinoculus">双眼:{{studentWord.splBinoculus}}cpm</td>
            <td colspan="3" v-if="!studentWord.splBinoculus">双眼:  --/--</td>
          </tr>
          <tr class="reportTitle">
            <div style="margin: 10px 0">生物测量检查</div>
          </tr>
          <!-- 生物测量检查 -->
          <tr class="bgReport">
            <td>眼别</td>
            <td colspan="2">水平曲率值</td>
            <td colspan="2">垂直曲率值</td>
            <td >眼轴长度</td>
            <td colspan="2">前房深度</td>
            <td colspan="2">晶体厚度</td>
          </tr>
          <tr class="bgReport" >
            <td align="center">右眼</td>
            <td colspan="2" v-if="studentWord.levelRight">{{studentWord.levelRight}}</td>
            <td colspan="2" v-if="!studentWord.levelRight">--/--</td>
            <td colspan="2" v-if="studentWord.verticalRight">{{studentWord.verticalRight}}</td>
            <td colspan="2" v-if="!studentWord.verticalRight">--/--</td>
            <td v-if="studentWord.axialLengthRight">{{studentWord.axialLengthRight}}</td>
            <td v-if="!studentWord.axialLengthRight">--/--</td>
            <td colspan="2" v-if="studentWord.acdRight">{{studentWord.acdRight}}</td>
            <td colspan="2" v-if="!studentWord.acdRight">--/--</td>
            <td colspan="2" v-if="studentWord.ltRight">{{studentWord.ltRight}}</td>
            <td colspan="2" v-if="!studentWord.ltRight">--/--</td>
          </tr>
          <tr class="bgReport">
            <td>左眼</td>
            <td colspan="2" v-if="studentWord.levelLeft">{{studentWord.levelLeft}}</td>
            <td colspan="2" v-if="!studentWord.levelLeft">--/--</td>
            <td colspan="2" v-if="studentWord.verticalLeft">{{studentWord.verticalLeft}}</td>
            <td colspan="2" v-if="!studentWord.verticalLeft">--/--</td>
            <td v-if="studentWord.axialLengthLeft">{{studentWord.axialLengthLeft}}</td>
            <td v-if="!studentWord.axialLengthLeft">--/--</td>
            <td colspan="2" v-if="studentWord.acdLeft">{{studentWord.acdLeft}}</td>
            <td colspan="2" v-if="!studentWord.acdLeft">--/--</td>
            <td colspan="2" v-if="studentWord.ltLeft">{{studentWord.ltLeft}}</td>
            <td colspan="2" v-if="!studentWord.ltLeft">--/--</td>
          </tr>
          <tr class="reportTitle">
            <div style="margin: 10px 0">眼部健康检查</div>
          </tr>
          <!-- 眼部健康检查 -->
           <tr  class="noBorder">
             <td colspan="9" v-if="studentWord.slitLamp">裂隙灯检查:{{studentWord.slitLamp}}</td>
             <td colspan="9" v-if="!studentWord.slitLamp">裂隙灯检查:--/--</td>
           </tr>
           <tr class="noBorder">
             <td colspan="9" v-if="studentWord.retCam">眼底照相检查:{{studentWord.retCam}}</td>
             <td colspan="9" v-if="!studentWord.retCam">眼底照相检查:--/--</td>
           </tr>
           <!-- 身体情况 -->
           <tr class="reportTitle">
             <div style="margin: 10px 0">身体情况</div>
           </tr>
           <tr class="noBorder">
             <td colspan="9" v-if="studentWord.height">身高(cm): {{studentWord.height}}</td>
             <td colspan="9"  v-if="!studentWord.height">身高(cm):--/--</td>
           </tr>
           <tr class="noBorder">
             <td colspan="9" v-if="studentWord.weight">体重(kg):{{studentWord.weight}}</td>
             <td colspan="9" v-if="!studentWord.weight">体重(kg):--/--</td>
           </tr>
          <!-- 处理建议 -->
          <tr class="reportTitle">
             <div style="margin: 10px 0">处理建议</div>
          </tr>
          <tr class="noBorder">
             <td colspan="9" style="height: 10px" v-if="studentWord.suggest">{{studentWord.suggest}}</td>
              <td colspan="9" style="padding: 10px" v-if="!studentWord.suggest">--/--</td>
          </tr>
        </table>
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
    let user = window.sessionStorage.getItem('token');
    this.identity = user.split('-') [1];
    this.fondId = user.split('-')[2];
	  this.getOPtions();
	},
    data() {
		 return {
      token: '',
			stu_cat: [],
      identity: '',
      fondId: "",
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
      // console.log(value)
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
               right: '15%'
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
            max:2,
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
             min:20,
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
      let that = this;
		    if(res.data.status === 10204) {
		        this.$message.error(res.data.msg);
		        this.$router.push('/login');
		    } else if(res.data.status == 200) {
		       this.options =  res.data.data;
           if(this.identity == 1) {  // admin

            }else if(this.identity == 2) {   //2 校长
               let selectedOption = this.options;
               let filterOption = selectedOption.filter((item, index) => {
                  if(item.id == Number(that.fondId)) {
                   return item
                 }
               })
            this.options = filterOption;
           }else if(this.identity == 3) {   // 教师
             this.options.forEach((item) => {
               item.children.forEach((secondItem) => {
                 if(secondItem.id == this.fondId) {
                   this.stu_cat[0]= item.id;
                   this.stu_cat[1] = secondItem.id;
                   this.schoolId = item.id;
                   this.classId = secondItem.id;
                   this.options = [];
                   item.disabled = true;
                   this.options.push(item)
                 }
               })
             })
             this.getStudentName()

           }
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

        res? res = res.data.data: '';
        if(res.studnetWord !== null) {
          this.studentWord = res.studnetWord;
          if(this.studentWord.gender == 0) {
            this.studentWord.gender = '男'
          }else {
            this.studentWord.gender = '女'
          }
        }
       // console.log(res)
        this.leftLuoX = res.visionLeft.xDataList;
        this.leftLuoY = res.visionLeft.yDataList;
        this.rightLuoX = res.visionRight.xDataList;
        this.rightLuoY = res.visionRight.yDataList;
        // this.leftZhouX = res.eyeAxisLengthLeft.xDataList;
        // this.leftZhouY = res.eyeAxisLengthLeft.yDataList;
        // this.rightZhouX = res.eyeAxisLengthRight.xDataList;
        // this.rightZhouY = res.eyeAxisLengthRight.yDataList;
        // this.leftQuX = res.curvatureLeft.xDataList;
        // this.leftQuY = res.curvatureLeft.yDataList;
        // this.rightQuX = res.curvatureRight.xDataList;
        // this.rightQuY = res.curvatureRight.yDataList;
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
  .report th, td {padding: 30px;text-align:center;border:1px solid #ccc; }
  .report tr:nth-child(2n+1) td{text-align: center;}
.newReport {
   font-size: 16px;
   // background:#fffbed;
}
 .reportTitle {
   color: #6794EB;
   font-size:20px;
   margin: 10px 0;
   font-weight: bold;
   background: #fff;

 }
table {border-collapse:collapse;border:none;}
table td {border:solid #6794EB 2px;padding: 10px 16px;fonts-size: 14px !important}
.noBorder  td{
  border:solid #fff 3px;
  background: #fffbed;
  text-align: left;
}
.bgReport {
   background: #fffbed;
}
.suggest {
  height: 40px;
}
</style>
