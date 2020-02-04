<template>
    <div>
        <el-card>
            <div ref="main" style="width: 600px;height:400px;"></div>
        </el-card>
    </div>
</template>
<script>
import echarts from 'echarts';
export default {
    data() {
        return {}
    },
    //dom渲染完毕后
     mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
       
        let myChart = this.$echarts.init(this.$refs.mian)
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  }
}
</script>
<style lang="less">

</style>
