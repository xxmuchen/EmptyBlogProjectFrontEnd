<template>
  <div class="userLoginVisualizationDisplay">
    <div id="myChart" ref="myChart" :style="{ width: '1000px', height: '500px' }"></div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'UserLoginAndRegistInfoVisualizationDisplay',
  data() {
    return {
      option: {
        title: {
          text: "登录统计"
        },
        legend: {
          data: ['登录用户数量' , '注册用户数量'],
          right: 100,
          icon: 'rect'
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
            name: '登录用户数量',
            data: [],
            type: 'line',
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '注册用户数量',
            data: [],
            type: 'line',
            label: {
              show: true,
              position: 'top'
            }
          }
        ]
      }
    }
  },
  methods: {
    getUserLoginAWeekDataVisualization() {
      axios.get("/getUserLoginAWeekDataVisualization").then(response => {
        this.option.xAxis.data = response.data[0].xaxis
        this.option.series[0].data = response.data[0].yaxis
        this.option.series[1].data = response.data[1].yaxis
      })
    }
  },
  mounted() {
    // console.log(this.echarts)
    let myChart = this.$echarts.init(this.$refs.myChart);
    this.getUserLoginAWeekDataVisualization()
    setTimeout(() => {
      myChart.setOption(this.option)
    } , 1000)
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