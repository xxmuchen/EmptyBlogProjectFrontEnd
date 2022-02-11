<template>
  <el-container>
    <el-main>


      <el-carousel direction="vertical" :autoplay="false"  :height="screenHeight"
                   indicator-position="none"
                   @change="getIndex"
                   ref="carousel">
        <el-carousel-item v-for="(item,index) in videos" :key="index">
          <div class="player-container">
            <vue3VideoPlay
                v-bind="options"
                :ref="'vue3-video-player' + index"
                :currentTime="0"
                :src = "item.src"
            >
            </vue3VideoPlay>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="controlVideo">
        <div v-on:click="nextToNextVideo" class="nextToNextVideo">next</div>
        <div v-on:click="prevToLastVideo" class="prevToLastVideo">prev</div>
      </div>
      <div class="avator">
        <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
      </div>
      <div class="like">
        <div class="block"><i class="iconfont icon-lovetaoxin"></i></div>
      </div>
      <div class="collect">
        <div class="block"><i class="iconfont icon-shoucang"></i></div>
      </div>
      <div class="grid-content bg-purple logoControl">
        <router-link :to="{name:'HomePage'}"><div class="demo-image">
          <div class="block">
            <el-image
                :src="url" fit="fill"></el-image>
          </div>
        </div>
        </router-link>
      </div>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
  import { reactive } from "vue";
  // const onPlay = (ev) => {
  //   console.log(ev);
  // };
  export default {
    name: 'VLogPage',
    components: {},
    data() {
      return {
        url: 'https://s4.ax1x.com/2022/02/11/HUfWjA.png',
        screenHeight: document.body.clientHeight - 40 + 'px',
        autoplay: false,//是否自动切换
        isPlay:false,//播放状态
        isIn:true,//鼠标是否位于播放器内
        cutTime:5000,//轮播时间，单位毫秒
        nowIndex: 0,
        videos:[
          // {
          //   src:"https://www.runoob.com/try/demo_source/mov_bbb.mp4"
          // },
          {
            src:"https://mvwebfs.ali.kugou.com/202202150544/c1e25c8affc83e84bf4581bbfd14b3b1/KGTX/CLTX002/2ef485d5ce1b774f6773483b193b7a73.mp4"
          },
          {
            src:"https://mvwebfs.tx.kugou.com/202202150544/bf7cd429df2ebc0725bcc5d836f1f93b/KGTX/CLTX002/7f4b65785921171338015f6b9896e79e.mp4"
          },
        ],
        options: reactive({
          width: "100%", //播放器高度
          height: "100%", //播放器高度
          color: "#409eff", //主题色
          title: "", //视频名称
          // poster: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg",
          src: "https://mvwebfs.ali.kugou.com/202202150544/c1e25c8affc83e84bf4581bbfd14b3b1/KGTX/CLTX002/2ef485d5ce1b774f6773483b193b7a73.mp4", //视频源
          // currentTime: 0,
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
        })
      }
    },
    methods: {

      getIndex(nowIndex, oldIndex){
        //用户可能在上个视频未播放完毕就切换
        //此时需要暂停上个视频并把时间归零，否则影响对当前视频的监听逻辑
        let myOldVideo = this.$refs['vue3-video-player' + oldIndex];
        myOldVideo[0].pause();
        // myOldVideo[0].currentTime = 1;
        myOldVideo[0].currentTime = 0

        let myNowVideo = this.$refs['vue3-video-player' + nowIndex];

        // myNowVideo[0].src = 'https://mvwebfs.ali.kugou.com/202202150544/c1e25c8affc83e84bf4581bbfd14b3b1/KGTX/CLTX002/2ef485d5ce1b774f6773483b193b7a73.mp4'
        myNowVideo[0].play();


      },
      nextToNextVideo() {
          // this.$refs.carousel.
          this.$refs.carousel.next();
      },
      prevToLastVideo() {
        this.$refs.carousel.prev();
      }
    },
    mounted() {
        // this.screenHeight = do
      // 获取屏幕高度
      let that = this;
      // this.myEcharts();
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          window.fullWidth = document.documentElement.clientWidth;
          that.screenHeight = window.fullHeight - 40 + 'px'; // 高
          that.windowWidth = window.fullWidth; // 宽
          // console.log("实时屏幕高度：", that.screenHeight);

          // console.log("实时屏幕宽度：", that.windowWidth);
          // myChart.resize();
          // myChart2.resize();
        })()
      };
    }
  }
</script>
<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 40px;
  height: auto;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 0;
  margin: 0;
  /*text-align: center;*/
  /*line-height: 160px;*/
}
.logoControl {
  width: 150px;
  height: 60px;
  opacity: 0.6;
  position: absolute;
  top: 30px;
  left: 30px;
}
.logoControl > .demo-image {
  width: 100%;
  height: 100%;
}
body > .el-container {
  /*margin-bottom: 40px;*/
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  /*line-height: 260px;*/
}

.el-container:nth-child(7) .el-aside {
  /*line-height: 320px;*/
}


.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.el-carousel-item {
  width: 100%;
  height: 100%;
}
.player-container {
  width: 100%;
  height: 100%;
}
video-play {
  width:100%;
  height:100%;
  /*position: fixed;*/
  /*display: inline-block;*/
  /*vertical-align: baseline;*/
  /*object-fit: fill;*/
  border: 0px;
  /*width: 100%;*/
  /*height: 100%;*/
  /*object-fit: fill;*/
}
.controlVideo {
  width: 50px;
  height: 140px;
  background: greenyellow;
  border-radius: 50px;
  position: absolute;
  /*top: 30px;*/
  right: 30px;
  top: 80px;

}
.nextToNextVideo , .prevToLastVideo {
  width: 50px;
  height: 70px;
  /*border-radius: 20px;*/
  /*background: red;*/
  display: flex;
  align-items:center;/*实现水平居中*/
  justify-content:center;
  text-align: center;
  /*background: red;*/
  display: flex;
  align-items:center;/*实现水平居中*/
  justify-content:center;
  text-align: center;

  /*position: absolute;*/
  /*top: 30px;*/
  /*right: 30px;*/
}
.nextToNextVideo {
  border-bottom: 1px solid gray;
}

.avator {
  position: absolute;
  /*top: 30px;*/
  right: 30px;
  top: 250px;
}
.like {
  position: absolute;
  /*top: 30px;*/
  right: 30px;
  top: 340px;
}

.collect {
  position: absolute;
  /*top: 30px;*/
  right: 30px;
  top: 420px;
}
</style>