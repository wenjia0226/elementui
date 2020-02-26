<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据分析</el-breadcrumb-item>
          <el-breadcrumb-item>校园概况</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="20">
            <el-col :span="12"></el-col>
            <el-col :span="4">
                 <el-select v-model="value" placeholder="请选择" @change="handleChangeSchool">
                    <el-option
                      v-for="item in schooloptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                 </el-select>
            </el-col>
            <el-col :span="6">
               <el-button type="primary" @click="showSchool">查看校园概况</el-button>
            </el-col>
        </el-row>
        <el-row style="margin: 30px 0;padding: 10px;font-size: 30px;border-bottom: 2px solid"v-show="this.totaldoubleLegend.length">
          <el-col :span="8" class="center">学校总人数：{{schoolTotal}}人</el-col>
          <el-col :span="8" class="center">实验班人数：{{schoolTest}}人</el-col>
          <el-col :span="8"  class="center">非实验班人数：{{schoolNormal}}人</el-col>
        </el-row>
        <!-- 校园 -->
        <el-row >
          <el-col :span="6" :offset="9" style="padding: 20px; fong-weight: bold;font-size: 34px;" v-show="this.totaldoubleLegend.length">校园概况</el-col>
        </el-row>
        <el-row style="margin: 30px 0" v-show="this.totaldoubleLegend.length" >
           <el-col :span="12">
             <div ref="totalleft" style="width: 600px;height:400px; margin: 0 auto"></div>
           </el-col>
           <el-col :span="12">
             <div ref="totalright" style="width: 600px;height:400px; margin: 0 auto"></div>
           </el-col>
        </el-row>
        <el-row type="flex" style="margin: 40px 0;border-bottom: 2px solid #eee" v-show="this.totaldoubleLegend.length">
          <el-col :span = "12" :offset="6" >
             <div ref="totaldouble" style="width: 600px;height:400px;margin: 0 auto"></div>
        </el-col>
        </el-row>
        <!-- 实验班 -->
        <el-row v-show="this.totaldoubleLegend.length">
          <el-col :span="6" :offset="9"  style="padding: 20px; fong-weight: bold;font-size: 34px;">实验班概况</el-col>
        </el-row>
        <el-row style="margin: 30px 0" v-show="this.totaldoubleLegend.length">
           <el-col :span="12">
             <div ref="testleft" style="width: 600px;height:400px; margin: 0 auto"></div>
           </el-col>
           <el-col :span="12">
             <div ref="testright" style="width: 600px;height:400px; margin: 0 auto"></div>
           </el-col>
        </el-row>
        <el-row type="flex" style="margin: 40px 0;border-bottom: 2px solid #eee"  v-show="this.totaldoubleLegend.length">
          <el-col :span = "12" :offset="6" >
             <div ref="testdouble" style="width: 600px;height:400px;margin: 0 auto"></div>
          </el-col>
        </el-row>
       <!-- 非实验班 -->
        <el-row v-show="this.totaldoubleLegend.length">
          <el-col :span="6" :offset="9"  style="padding: 20px; fong-weight: bold;font-size: 34px;">非实验班概况</el-col>
        </el-row>
        <el-row style="margin: 30px 0" v-show="this.totaldoubleLegend.length">
           <el-col :span="12">
             <div ref="normalleft" style="width: 600px;height:400px; margin: 0 auto"></div>
           </el-col>
           <el-col :span="12">
             <div ref="normalright" style="width: 600px;height:400px; margin: 0 auto"></div>
           </el-col>
        </el-row>
        <el-row type="flex" style="margin: 40px 0;border-bottom: 2px solid #eee"  v-show="this.totaldoubleLegend.length">
          <el-col :span = "12" :offset="6" >
             <div ref="normaldouble" style="width: 600px;height:400px;margin: 0 auto"></div>
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
    this.getSchoolList();
  },
    data() {
        return {
          token: '',
          schoolId: '',
           schooloptions: [],
            value: '',
            normalleftOption: [],
            normalrightOption: [],
            normaldoubleOption: [],
            normalleftLegend: [],
            normalrightLegend: [],
            normaldoubleLegend: [],
            testleftOption: [],
            testrightOption: [],
            testdoubleOption: [],
            testleftLegend: [],
            testrightLegend: [],
            testdoubleLegend: [],
            totalleftOption: [],
            totalrightOption: [],
            totaldoubleOption: [],
            totalleftLegend: [],
            totalrightLegend: [],
            totaldoubleLegend: [],
            schoolTotal: '',
            schoolTest: '',
            schoolNormal: ''
        }
    },

  methods: {
    drawLine(id,lengend, option, text) {
      console.log(id, 'normlleft' )
      if(id == 'normalleft') {
         var myChart = echarts.init(this.$refs.normalleft);
      }else if(id == 'normalright') {
        var myChart = echarts.init(this.$refs.normalright);
      }else if(id == 'normaldouble'){
         var myChart = echarts.init(this.$refs.normaldouble);
      }else if (id == 'testleft') {
         var myChart = echarts.init(this.$refs.testleft);
      }else if(id == 'testright') {
        var myChart = echarts.init(this.$refs.testright);
      }else if(id == 'testdouble'){
         var myChart = echarts.init(this.$refs.testdouble);
      }else if (id == 'totalleft') {
         var myChart = echarts.init(this.$refs.totalleft);
      }else if(id == 'totalright') {
        var myChart = echarts.init(this.$refs.totalright);
      }else if(id == 'totaldouble'){
         var myChart = echarts.init(this.$refs.totaldouble);
      }
       this.option = {
          title: {
              text: text,
              subtext: '',
              left: 'center'
          },
          tooltip: {
              trigger: 'item',
          },
          legend: {
              orient: 'vertical',
              left: 'right',
              selectedMode:false,
              data: lengend
              },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: '80%',
                  center: ['50%', '50%'],
                  label: {formatter: '{b}:{c}: ({d}%)'},
                  data: option,
                  itemStyle: {
                    normal: {
                      borderWidth:4,	//边框的宽度
                      borderColor:'#fff',//边框的颜色
                    }
                  },
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)',

                      }
                  },
                  normal:{
                          label:{
                              show: true,
                              formatter: '{b} : {c} ({d}%)'
                          },
                          labelLine :{show:true}
                      }
              }
          ]
      };
      console.log(myChart, this.option)
      myChart.setOption(this.option)
     },
     //获取学校下拉列表
     getSchoolList() {
       var param = new URLSearchParams();
       param.append('token', this.token);
       axios({
         method:'post',
         url: '/lightspace/schoolList',
         data: param
       }).then(this.handleGetSchoolLisSucc.bind(this)).catch(this.handleGetSchoolListErr.bind(this))
     },
     handleGetSchoolLisSucc(res) {
       if(res.data.status === 10204) {
           this.$message.error(res.data.msg);
           this.$router.push('/login');
       } else if(res.data.status == 200) {
          this.schooloptions = res.data.data;
       }
     },
     handleGetSchoolListErr(err) {
       console.log(err)
     },
     //改变选中数据
     handleChangeSchool(val) {
       this.schoolId = val;
     },
    //获取学校近视眼概况
    showSchool() {
      this.leftLegend = [];
      let param = new URLSearchParams();
      param.append('token', this.token);
      param.append('schoolId', this.schoolId);
      axios({
        method: 'post',
        url:'/lightspace/schoolStatistics',
        data: param
      }).then(this.getSchoolAnalysisSucc.bind(this)).catch(this.handleGetSchoolAnalysisErr.bind(this))
    },
    getSchoolAnalysisSucc(res) {
      if(res.data.status === 10204) {
          this.$message.error(res.data.msg);
          this.$router.push('/login');
      } else if(res.data.status == 200) {
          res.data.data ? res = res.data.data: '';
          console.log(res)
          this.schoolTotal = res.schoolTotal;
          this.schoolTest = res.schoolTest;
          this.schoolNormal = res.schoolNormal;
          let normal = res.normalData;
          let test = res.testData;
          let total = res.totalData;
          //非实验班
          this.normalleftOption = normal[0];
          this.normalrightOption = normal[1];
          this.normaldoubleOption = normal[2];
          this.normalleftOption.forEach((item, index) => {
            this.normalleftLegend.push(item.name);
          })
          this.normalrightOption.forEach((item, index) => {
            this.normalrightLegend.push(item.name);
          })
          this.normaldoubleOption.forEach((item, index) => {
            this.normaldoubleLegend.push(item.name);
          })
        this.drawLine('normalleft', this.normalleftLegend, this.normalleftOption, '左眼概况');
        this.drawLine('normalright', this.normalrightLegend, this.normalrightOption,'右眼概况');
        this.drawLine('normaldouble', this.normaldoubleLegend,this.normaldoubleOption, '双眼概况');
        //实验班
        this.testleftOption = test[0];
        this.testrightOption = test[1];
        this.testdoubleOption = test[2];
        this.testleftOption.forEach((item, index) => {
          this.testleftLegend.push(item.name);
        })
        this.testrightOption.forEach((item, index) => {
          this.testrightLegend.push(item.name);
        })
        this.testdoubleOption.forEach((item, index) => {
          this.testdoubleLegend.push(item.name);
        })
        this.drawLine('testleft', this.testleftLegend, this.testleftOption, '左眼概况');
        this.drawLine('testright', this.testrightLegend, this.testrightOption,'右眼概况');
        this.drawLine('testdouble', this.testdoubleLegend,this.testdoubleOption, '双眼概况');
        //总共
        this.totalleftOption = total[0];
          this.totalrightOption = total[1];
          this.totaldoubleOption = total[2];
          this.totalleftOption.forEach((item, index) => {
            this.totalleftLegend.push(item.name);
          })
          this.totalrightOption.forEach((item, index) => {
            this.totalrightLegend.push(item.name);
          })
          this.totaldoubleOption.forEach((item, index) => {
            this.totaldoubleLegend.push(item.name);
          })
        this.drawLine('totalleft', this.totalleftLegend, this.totalleftOption, '左眼概况');
        this.drawLine('totalright', this.totalrightLegend, this.totalrightOption,'右眼概况');
        this.drawLine('totaldouble', this.totaldoubleLegend,this.totaldoubleOption, '双眼概况');
      }
    },
    handleGetSchoolAnalysisErr(err) {
      console.log(err)
    },
   }
}
</script>
<style  scoped>
.center{
  text-align: center;
}
</style>
