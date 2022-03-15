<template>
  <div class="userLoginVisualizationDisplay">
    <div id="myChart" ref="myChart" :style="{ width: '1000px', height: '500px' }"></div>
  </div>

</template>
<script>
import axios from "axios";
import {  CodeToText } from 'element-china-area-data'
export default {
  name: 'UserLocationInfoVisualizationDisplay',
  data() {
    return {
      option: {
        title: {
          text: "用户位置统计"
        },
        legend: {
          data: ['用户位置'],
          right: 100,
          icon: 'circle'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '用户位置',
            data: [],
            label: {
              show: true,
              position: 'top'
            },
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    }
  },
  mounted() {
    // console.log(this.echarts)
    let myChart = this.$echarts.init(this.$refs.myChart);

    axios.get("/getUserPlaceDataVisualization").then(response => {
      // console.log(response.data)
      this.option.xAxis.data = response.data.xaxis
      for (let i = 0 ; i < this.option.xAxis.data.length ; i++) {
        let code = this.option.xAxis.data[i].split(",")
        this.option.xAxis.data[i] = CodeToText[code[0]] + CodeToText[code[1]]
      }
      console.log(this.option.xAxis.data)
      this.option.series[0].data = response.data.yaxis
      // this.option.series[1].data = response.data[1].yaxis
      // console.log(this.option)
      myChart.setOption(this.option)
    })
  }
}
</script>
<style scoped>
  .userLoginVisualizationDisplay {
    width: 100%;
    height: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
  }
</style>