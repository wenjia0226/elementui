<template>
    <div>
      <el-card>
        <el-row>
          <el-col :span="6" style="height: 50px">
            <img src="../../assets/image/logo2.png" alt="" style="width:200px;height: auto;overflow:hidden">
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24" >
            <div style="padding: 10px  0 50px ;font-size: 30px; text-align: center;">{{schoolName}}{{className}}视力概况</div>
          </el-col>
        </el-row>
        <el-row style="margin: 40px 0">
           <el-col :span="24">
             <div ref="right" style="width: 700px;height:500px;margin: 0 auto;"></div>
           </el-col>
        </el-row>
        <el-row style="margin: 40px 0">
           <el-col :span="24">
             <div ref="left" style="width: 700px;height:500px;margin: 0 auto;"></div>
           </el-col>
        </el-row>

        <el-row style="margin: 40px 0">
          <el-col :span = "12" :offset="6" >
             <div ref="double" style="width: 700px;height:500px;margin: 0 auto;"></div>
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
    this.schoolName = window.sessionStorage.getItem('cschoolName');
    this.className = window.sessionStorage.getItem('className');
    this.classId =this.$router.history.current.params.id;
     this.showClass();
  },
    data() {
        return {
          token: '',
          schoolId: '',
          schoolName: '',
          className: '',
          schooloptions: [],
            value: '',
            leftOption: [],
            rightOption: [],
            doubleOption: [],
            leftLegend: [],
            rightLegend: [],
            doubleLegend: [],
            totalStudent: '',
            correctedStudent: '',
            uncorrectedStudent: '',
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
              left: 'center'
          },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
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
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  },
                  itemStyle: {
                    normal: {
                      borderWidth:4,	//边框的宽度
                      borderColor:'#fff',//边框的颜色
                    }
                  }
              }
          ]
      };
      myChart.setOption(this.option)
     },

    //获取学校近视眼概况
    showClass() {
      this.leftLegend = [];
      let param = new URLSearchParams();
      param.append('token', this.token);
      param.append('classId', this.classId);
      axios({
        method: 'post',
        url:'/lightspace/classStatistics',
        data: param
      }).then(this.getClassAnalysisSucc.bind(this)).catch(this.handleGetClassAnalysisErr.bind(this))
    },
    getClassAnalysisSucc(res) {
      if(res.data.status === 10204) {
          this.$message.error(res.data.msg);
          this.$router.push('/login');
      } else if(res.data.status == 200) {

      this.leftOption = res.data.data[0];
      this.rightOption = res.data.data[1];
      this.doubleOption = res.data.data[2];
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
      this.drawLine('right', this.rightLegend, this.rightOption, '右眼概况');
      this.drawLine('double', this.doubleLegend,this.doubleOption, '双眼概况');
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
            url: '/lightspace/cascade1',
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
<style  scoped style="less">
.el-cascader{
  width: 100%;
}
.center {
  text-align: center;
}
</style>
