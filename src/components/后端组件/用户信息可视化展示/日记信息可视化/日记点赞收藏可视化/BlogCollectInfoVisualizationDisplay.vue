<template>
  <div class="blogWriteInfoVisualizationDisplay">
    <div id="myChart" ref="myChart" :style="{ width: '1000px', height: '500px' }"></div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'BlogCollectInfoVisualizationDisplay',
  data() {
    return {
      option: {
        title: {
          text: "博客收藏统计"
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
    // 获取日记点赞数据
    getDiaryCollectAWeekDataVisualization() {
      axios.get('/getDiaryCollectAWeekDataVisualization').then(response => {
        // console.log(response.data)
        this.option.xAxis.data = response.data.xaxis
        this.option.series[0].data = response.data.yaxis
      })
    },
    // 获取句子点赞数据
    getSentenceCollectAWeekDataVisualization() {
      axios.get('/getSentenceCollectAWeekDataVisualization').then(response => {
        // this.option.xAxis.data = response.data[0].xaxis
        this.option.series[1].data = response.data.yaxis
      })
    },
    // 获取Vlog点赞数据
    getVlogCollectAWeekDataVisualization() {
      axios.get('/getVlogCollectAWeekDataVisualization').then(response => {
        // this.option.xAxis.data = response.data[0].xaxis
        this.option.series[2].data = response.data.yaxis
      })
    },
    // 获取图文点赞数据
    getGriphicCollectAWeekDataVisualization() {
      axios.get('/getGriphicCollectAWeekDataVisualization').then(response => {
        // this.option.xAxis.data = response.data[0].xaxis
        this.option.series[3].data = response.data.yaxis
      })
    },
  },
  mounted() {
    // console.log(this.echarts)
    let myChart = this.$echarts.init(this.$refs.myChart);

    this.getDiaryCollectAWeekDataVisualization()
    this.getSentenceCollectAWeekDataVisualization()
    this.getVlogCollectAWeekDataVisualization()
    this.getGriphicCollectAWeekDataVisualization()

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