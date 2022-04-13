<template>
  <el-container>
    <el-header>

        <div class="homePageInfoType">
          <div style="font-size: 28px;font-family: 华文行楷">
            <router-link :to="{name: 'VLogPage'}">{{ homePageDisplayType }}</router-link>
            <br />
          </div>
        </div>

      <div class="homePageInfoContent">
        <div style="font-size: 20px;font-family: 华文楷体" v-for="item in homePageInfoContent" :key="item.id">{{ item.content }}<br /></div>
      </div>
    </el-header>
    <el-main>
      <el-carousel  :autoplay="false" height="450px"

                   @change="getIndex"
                   ref="carousel">
        <el-carousel-item v-for="(item,index) in homePageInfoMedia" :key="index">
          <div class="player-container" >
            <vue3VideoPlay

                v-bind="options"
                :ref="'vue3-video-player' + index"
                :currentTime="0"
                :src = "item.content"
            >
            </vue3VideoPlay>
          </div>
        </el-carousel-item>
      </el-carousel>

<!--          <h3>{{ item }}</h3>-->

    </el-main>
  </el-container>
</template>
<script>
  import axios from "axios";
  import 'video.js/dist/video-js.css'
  import {reactive} from "vue";
  export default {
    name: 'HomePageVlogDisplay',
    data() {
      return {
        homePageDisplay: {},
        homePageDisplayType:'',
        homePageInfoContent:{},
        homePageInfoMedia: [{}],
        homePageInfoExample: {},
        options: reactive({
          width: "100%", //播放器高度
          height: "100%", //播放器高度
          color: "#409eff", //主题色
          title: "", //视频名称
          muted: false, //静音
          webFullScreen: false,
          speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
          autoPlay: false, //自动播放
          loop: false, //循环播放
          mirror: false, //镜像画面
          ligthOff: false, //关灯模式
          volume: 0.3, //默认音量大小
          control: true, //是否显示控制
          controlBtns: [
            "audioTrack",
            "quality",
            "speedRate",
            "volume",
            "setting",
            "pip",
            "pageFullScreen",
            "fullScreen",
          ], //显示所有按钮,
        }),
        // autoplay: true,//是否自动切换
        isPlay:false,//播放状态
        // isIn:false,//鼠标是否位于播放器内
        nowIndex: 0,
      }
    },
    methods: {
      getIndex(nowIndex, oldIndex){
        console.log(nowIndex, oldIndex)
        //用户可能在上个视频未播放完毕就切换
        //此时需要暂停上个视频并把时间归零，否则影响对当前视频的监听逻辑
        let myOldVideo = this.$refs['vue3-video-player' + oldIndex];
        myOldVideo[0].pause();
        myOldVideo[0].currentTime = 0

        let myNowVideo = this.$refs['vue3-video-player' + nowIndex];

        myNowVideo[0].play();
      },
    },
    mounted() {
      axios.get('/HomePageVlogDisplay').then(response => {
        this.homePageDisplay = response.data
        this.homePageDisplayType = this.homePageDisplay.type
        this.homePageInfoContent = this.homePageDisplay.homePageInfoContent;
        this.homePageInfoMedia = this.homePageDisplay.homePageInfoMedia;
        this.homePageInfoExample = this.homePageDisplay.homePageInfoExample;
        this.$forceUpdate()
        console.log(this.homePageInfoMedia)
      })
    }
  }
</script>
<style scoped>
  .el-header, .el-footer {
    /*background-color: #D2C3E1;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 60px;*/
    height: 150px;
    margin: 0;
    padding: 0;
  }
  .homePageInfoType {
    width: 100%;
    height: auto;
    /*background: red;*/
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 30px;
    /*justify-content: center;*/
    /*padding-left: 160px;*/
    /*padding-top: 100px;*/
  }
  .homePageInfoType > div {
    /*background: green;*/
    width: 300px;
    height: auto;
    text-align:center
    /*background: green;*/
    /*padding: 5px;*/
    /*margin-right: 0;*/
    /*margin-left: 0;*/
  }
  .homePageInfoContent {
    /*background: yellow;*/
    width: 100%;
    height: auto;
    /*background: green;*/
    /*margin-left: 160px;*/
    /*margin-top: 30px;*/
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 35px;
  }
  .homePageInfoContent > div {
    /*background: orange;*/
    width: 300px;
    height: auto;
    /*background: green;*/
    padding-top: 10px;
    text-align:center
  }
  .el-main {
    /*background-color: #E9EEF3;*/
    /*color: #333;*/
    /*padding: 0;*/
    /*margin: 0;*/
    /*text-align: center;*/
    /*line-height: 160px;*/
  }

  .el-main > .el-container {
    /*margin-bottom: 40px;*/
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  /*video {*/
  /*  !*padding: 10px;*!*/
  /*  border: 0px;*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*}*/

  .player-container {
    width: 100%;
    height: 100%;
  }
</style>