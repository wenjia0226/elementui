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
        <el-row style="margin: 30px 0" >
           <el-col :span="12">
             <div ref="left" style="width: 600px;height:400px; margin: 0 auto"></div>
           </el-col>
           <el-col :span="12">
             <div ref="right" style="width: 600px;height:400px; margin: 0 auto"></div>
           </el-col>
        </el-row>
        <el-row type="flex" style="margin: 40px 0">
          <el-col :span = "12" :offset="6" >
             <div ref="double" style="width: 600px;height:400px;margin: 0 auto"></div>
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
            leftOption: [],
            rightOption: [],
            doubleOption: [],
            leftLegend: [],
            rightLegend: [],
            doubleLegend: []
        }
    },

  methods: {
    drawLine(id,lengend, option, text) {
      if(id == 'left') {
         var myChart = echarts.init(this.$refs.left);
      }else if(id == 'right') {
        var myChart = echarts.init(this.$refs.right);
      }else{
         var myChart = echarts.init(this.$refs.double);
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
           this.$router.push('/lightspace/login');
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
          this.$router.push('/lightspace/login');
      } else if(res.data.status == 200) {
          res.data.data ? res = res.data.data: '';
          console.log(res)
          this.leftOption = res[0];
          this.rightOption = res[1];
          this.doubleOption = res[2];
          this.leftOption.forEach((item, index) => {
            this.leftLegend.push(item.name);
          })
          this.rightOption.forEach((item, index) => {
            this.rightLegend.push(item.name);
          })
          this.doubleOption.forEach((item, index) => {
            this.doubleLegend.push(item.name);
          })
         }
        this.drawLine('left', this.leftLegend, this.leftOption, '左眼概况');
        this.drawLine('right', this.rightLegend, this.rightOption,'右眼概况');
        this.drawLine('double', this.doubleLegend,this.doubleOption, '双眼概况');




    },
    handleGetSchoolAnalysisErr(err) {
      console.log(err)
    },
   }
}
</script>
<style  scoped>

</style>
