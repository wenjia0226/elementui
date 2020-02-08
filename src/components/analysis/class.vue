<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据分析</el-breadcrumb-item>
          <el-breadcrumb-item>班级概况</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="20">
            <el-col :span="4">
                 <el-cascader :options="options" v-model="stu_cat" :props="cateProps" @change="handleChange" clearable></el-cascader>
            </el-col>
            <el-col :span="6">
               <el-button type="primary" @click="showClass">查看班级概况</el-button>
            </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
           <el-col :span="12">
             <div ref="left" style="width: 600px;height:400px;;"></div>
           </el-col>
           <el-col :span="12">
             <div ref="right" style="width: 600px;height:400px;;"></div>
           </el-col>
        </el-row>
        <el-row>
          <el-col :span = "12" :offset="6">
             <div ref="double" style="width: 600px;height:400px;"></div>
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
          schoolId: '',
           schooloptions: [],
            value: '',
            leftOption: [],
            rightOption: [],
            doubleOption: [],
            leftLegend: [],
            rightLegend: [],
            doubleLegend: [],
            stu_cat: [],
            cateProps: {
            label: 'name', //看到的是哪个属性
            value: 'id', // 选中的是谁的值
            children: 'children' //哪个属性实现父子节点嵌套
            },
            options: [],
            classId: '',
            schoolId: ''
        }
    },

  methods: {
    drawLine(id,lengend, option) {
      if(id == 'left') {
         var myChart = echarts.init(this.$refs.left);
      }else if(id == 'right') {
        var myChart = echarts.init(this.$refs.right);
      }else{
         var myChart = echarts.init(this.$refs.double);
      }
       this.option = {
          title: {
              text: '班级概况',
              subtext: '',
              left: 'center'
          },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: lengend
              },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: '80%',
                  center: ['50%', '60%'],
                  data: option,
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      };
      myChart.setOption(this.option)
     },
     //改变选中数据
     handleChangeSchool(val) {
       this.schoolId = val;
     },
    //获取学校近视眼概况
    showClass() {
      this.leftLegend = [];
      let param = new URLSearchParams();
      param.append('token', this.token);
      param.append('classId', this.classId);
      axios({
        method: 'post',
        url:'/classStatistics',
        data: param
      }).then(this.getClassAnalysisSucc.bind(this)).catch(this.handleGetClassAnalysisErr.bind(this))
    },
    getClassAnalysisSucc(res) {
      if(res.status !== 200) return;
      res.data.data ? res = res.data.data: '';
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
        this.drawLine('left', this.leftLegend, this.leftOption);
        this.drawLine('right', this.rightLegend, this.rightOption);
        this.drawLine('double', this.doubleLegend,this.doubleOption);




    },
    handleGetClassAnalysisErr(err) {
      console.log(err)
    },
    //获取级联选择器中的数据
    getOPtions() {
        let param = new URLSearchParams();
        param.append('token', this.token);
        axios({
            method: 'post',
            url: '/cascade1',
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
    },
   }
}
</script>
<style  scoped>

</style>
