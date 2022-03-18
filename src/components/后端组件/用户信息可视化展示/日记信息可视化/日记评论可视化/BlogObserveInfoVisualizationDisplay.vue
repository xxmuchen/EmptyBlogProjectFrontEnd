<template>
  <div class="blogWriteInfoVisualizationDisplay">
    <div id="myChart" ref="myChart" :style="{ width: '1000px', height: '500px' }"></div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'BlogObserveInfoVisualizationDisplay',
  data() {
    return {
      option: {
        title: {
          text: "博客评论统计"
        },
        legend: {
          data: ['放空日记' , '放空句子' , '放空Vlog' , '放空图文'],
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
            name: '放空日记',
            data: [],
            type: 'line',
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '放空句子',
            data: [],
            type: 'line',
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '放空Vlog',
            data: [],
            type: 'line',
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '放空图文',
            data: [],
            type: 'line',
            label: {
              show: true,
              position: 'top'
            }
          },
        ]
      }
    }
  },
  methods: {
    // 获取日记评论数据
    getDiaryObserveAWeekDataVisualization() {
      axios.get('/getDiaryObserveAWeekDataVisualization').then(response => {
        // console.log(response.data)
        this.option.xAxis.data = response.data.xaxis
        this.option.series[0].data = response.data.yaxis
      })
    },
    // 获取句子评论数据
    getSentenceObserveAWeekDataVisualization() {
      axios.get('/getSentenceObserveAWeekDataVisualization').then(response => {
        // this.option.xAxis.data = response.data[0].xaxis
        this.option.series[1].data = response.data.yaxis
      })
    },
    // 获取Vlog评论数据
    getVlogObserveAWeekDataVisualization() {
      axios.get('/getVlogObserveAWeekDataVisualization').then(response => {
        // this.option.xAxis.data = response.data[0].xaxis
        this.option.series[2].data = response.data.yaxis
      })
    },
    // 获取图文评论数据
    getGriphicObserveAWeekDataVisualization() {
      axios.get('/getGriphicObserveAWeekDataVisualization').then(response => {
        // this.option.xAxis.data = response.data[0].xaxis
        this.option.series[3].data = response.data.yaxis
      })
    },
  },
  mounted() {
    // console.log(this.echarts)
    let myChart = this.$echarts.init(this.$refs.myChart);

    this.getDiaryObserveAWeekDataVisualization()
    this.getSentenceObserveAWeekDataVisualization()
    this.getVlogObserveAWeekDataVisualization()
    this.getGriphicObserveAWeekDataVisualization()

    setTimeout(() => {
      myChart.setOption(this.option)
    }, 1000)
  }
}
</script>
<style scoped>
.blogWriteInfoVisualizationDisplay {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
</style>