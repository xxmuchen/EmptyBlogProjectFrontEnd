<template>
  <el-container>
    <el-header>
      <router-link :to="{name: 'VLogPage'}">
        <div class="homePageInfoType">
          <div style="font: 20px Extra large">{{ homePageDisplayType }}<br /></div>
        </div>
      </router-link>
      <div class="homePageInfoContent">
        <div style="font: 16px Medium" v-for="item in homePageInfoContent" :key="item.id">{{ item.content }}<br /></div>
      </div>
    </el-header>
    <el-main>
      <el-carousel  arrow="hover" :autoplay="false"  height="350px" v-on:change="stopVideo">
        <el-carousel-item v-for="(item , index) of homePageInfoMedia" :key="item.id">
<!--          <h3>{{ item }}</h3>-->
          <video :ref="'videoPlayer' + index" controls>
            <source :src="item.content">
          </video>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>
</template>
<script>
  import axios from "axios";
  import 'video.js/dist/video-js.css'
  export default {
    name: 'HomePageVlogDisplay',
    data() {
      return {
        homePageDisplay: {},
        homePageDisplayType:'',
        homePageInfoContent:{},
        homePageInfoMedia: {},
        homePageInfoExample: {},
        // autoplay: true,//是否自动切换
        isPlay:false,//播放状态
        // isIn:false,//鼠标是否位于播放器内
        nowIndex: 0,
      }
    },
    methods: {
      stopVideo(nowIndex, oldIndex) {
        let myVideo = this.$refs['videoPlayer' + oldIndex];
        myVideo[0].pause();
        myVideo[0].currentTime = 0;
        this.nowIndex = nowIndex;
        this.listenVideo();
      },
      //监听视频的播放、暂停、播放完毕等事件
      listenVideo(){
        //注意：这样获取的dom是一个数组，必须加上[0]索引才能正确的添加事件
        let myVideo = this.$refs['videoPlayer' + this.nowIndex];
        //监听播放
        myVideo[0].addEventListener("play",()=>{
          this.autoplay = false;
          this.isPlay = true;
        });
        //监听暂停
        myVideo[0].addEventListener("pause",()=>{
          this.autoplay = true;
          this.isPlay = false;
        });
        //监听播放完毕
        myVideo[0].addEventListener("ended",()=>{
          //时间归零
          myVideo[0].currentTime = 0;
          this.autoplay = true;
          this.isPlay = false;
        });
      },
      //播放视频
      playVideo(){
        //注意：这样获取的dom是一个数组，必须加上[0]索引才能正确的添加事件
        let myVideo = this.$refs['videoPlayer' + this.nowIndex];
        myVideo[0].play();
      },
      //暂停视频
      pauseVideo(){
        //注意：这样获取的dom是一个数组，必须加上[0]索引才能正确的添加事件
        let myVideo = this.$refs['videoPlayer' + this.nowIndex];
        myVideo[0].pause();
      }
    },
    mounted() {
      axios.get('http://localhost:8081/api/HomePageVlogDisplay').then(response => {
        this.homePageDisplay = response.data
        this.homePageDisplayType = this.homePageDisplay.type
        this.homePageInfoContent = this.homePageDisplay.homePageInfoContent;
        this.homePageInfoMedia = this.homePageDisplay.homePageInfoMedia;
        this.homePageInfoExample = this.homePageDisplay.homePageInfoExample;

        // console.log(this.homePageInfoExample)
      })
    }
  }
</script>
<style scoped>
  .el-header, .el-footer {
    background-color: #D2C3E1;
    color: #333;
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
    background: green;
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
    background: orange;
    width: 300px;
    height: auto;
    /*background: green;*/
    padding-top: 10px;
    text-align:center
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
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
  video {
    /*padding: 10px;*/
    border: 0px;
    width: 100%;
    height: 100%;
  }
</style>