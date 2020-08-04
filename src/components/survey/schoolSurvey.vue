<template>
    <div>
      <el-card>
        <el-row>
          <el-col :span="6" style="height: 50px">
            <img src="../../assets/image/logo2.png" alt="" style="width:200px;height: auto;overflow:hidden">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" >
            <div style="padding: 10px  0 50px ;font-size: 30px; text-align: center;">{{schoolName}}视力概况</div>
          </el-col>
        </el-row>
        <el-row style="margin: 30px 0"  >
           <el-col :span="24">
             <div ref="totalright" style="width: 700px;height:420px; margin: 0 auto"></div>
           </el-col>
        </el-row>
        <el-row style="margin: 30px 0"  >
           <el-col :span="24">
             <div ref="totalleft" style="width: 700px;height:420px; margin: 0 auto"></div>
           </el-col>
        </el-row>
        <el-row type="flex" style="margin: 40px 0;border-bottom: 2px solid #eee" >
          <el-col :span = "12" :offset="6" >
             <div ref="totaldouble" style="width: 700px;height:420px;margin: 0 auto"></div>
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
       this.schoolId = this.$router.history.current.params.id;
       this.schoolName = window.sessionStorage.getItem('schoolName')
       this.showSchool();
   },
   data() {
     return {
       token: '',
       schoolId: '',
       schoolName: '',
       totalleftOption: [],
       totalrightOption: [],
       totaldoubleOption: [],
       totalleftLegend: [],
       totalrightLegend: [],
       totaldoubleLegend: [],
       schoolTotal: '',
     }
   },
   methods: {
     drawLine(id,lengend, option, text) {
       let that = this;
       if (id == 'totalleft') {
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
       myChart.setOption(this.option)
       myChart.on('click', function(param) {
           let  url = param.data.url;
           if(url == "leftGood") { // 左眼良好
             this.type = 1;
             this.state = 1;
             window.sessionStorage.setItem('schoolEyeType', '左眼良好')
           }else if(url == "leftMild") { //左眼轻度不良
             this.type = 1;
             this.state = 2;
             window.sessionStorage.setItem('schoolEyeType', '左眼轻度不良')
           }else if(url == "leftModerate") {//左眼中度不良
             this.type = 1;
             this.state = 3;
             window.sessionStorage.setItem('schoolEyeType', '左眼中度不良')
           }else if(url == "leftSerious") { //左眼重度不良
             this.type = 1;
             this.state = 4;
             window.sessionStorage.setItem('schoolEyeType', '左眼重度不良')
           }else if(url == "rightGood") { // 右眼良好
             this.type = 2;
             this.state = 1;
            window.sessionStorage.setItem('schoolEyeType', '右眼良好')
           }else if(url == "rightMild") { //右眼轻度不良
             this.type = 2;
             this.state = 2;
            window.sessionStorage.setItem('schoolEyeType', '右眼轻度不良')
           }else if(url == "rightModerate") {//右眼中度不良
             this.type = 2;
             this.state = 3;
            window.sessionStorage.setItem('schoolEyeType', '右眼中度不良')
           }else if(url =="rightSerious") { //右眼重度不良
             this.type = 1;
             this.state = 4;
             window.sessionStorage.setItem('schoolEyeType', '右眼重度不良');
           }else if(url =="avgGood") { // 双眼良好
             this.type = 3;
             this.state = 1;
             window.sessionStorage.setItem('schoolEyeType', '双眼良好')
           }else if(url == "avgMild") { //双眼轻度不良
             this.type = 3;
             this.state = 2;
            window.sessionStorage.setItem('schoolEyeType', '双眼轻度不良')
           }else if(url == "avgModerate") {//双眼中度不良
             this.type = 3;
             this.state = 3;
             window.sessionStorage.setItem('schoolEyeType', '双眼中度不良')
           }else if(url =="avgSerious") { //双眼重度不良
             this.type = 3;
             this.state = 4;
             window.sessionStorage.setItem('schoolEyeType', '双眼重度不良')
           }
           let routeUrl = that.$router.resolve({
               path: "/detailSchoolSurvey/",
               query: {
                       schoolId: that.schoolId,
                       type: this.type,
                       state: this.state

               }
           });
           window.open(routeUrl.href, '_blank');
        })
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
          console.log(res)
        if(res.data.status === 10204) {
            this.$message.error(res.data.msg);
            this.$router.push('/login');
        } else if(res.data.status == 200) {
           let total = res.data.data;
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
          this.drawLine('totalright', this.totalrightLegend, this.totalrightOption,'右眼概况');
          this.drawLine('totalleft', this.totalleftLegend, this.totalleftOption, '左眼概况');
          this.drawLine('totaldouble', this.totaldoubleLegend,this.totaldoubleOption, '双眼概况');
        }
      },
      handleGetSchoolAnalysisErr(err) {
        console.log(err)
      },
   }
  }
</script>

<style>
</style>
