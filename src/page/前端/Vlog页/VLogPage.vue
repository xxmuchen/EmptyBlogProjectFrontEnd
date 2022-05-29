<template>
  <el-container>
    <el-main>
      <el-carousel direction="vertical" :autoplay="false"  :height="screenHeight"
                   indicator-position="none"
                   @change="getIndex"
                   ref="carousel">
        <el-carousel-item v-for="(item,index) in vlogs" :key="index" >
          <div class="player-container">
            <vue3VideoPlay
                v-bind="options"
                :ref="'vue3-video-player' + index"
                :currentTime="0"
                :src = "item.videoUrl"
                @play="likeDisplay(item)"
            >
            </vue3VideoPlay>
          </div>
          <div class="rightSide">
            <div class="controlVideo">
              <div v-on:click="nextToNextVideo" class="nextToNextVideo"><i class="iconfont icon-up"></i></div>
              <div v-on:click="prevToLastVideo" class="prevToLastVideo"><i class="iconfont icon-down"></i></div>
            </div>
            <div class="avator">
              <div class="block"><el-avatar :size="50" :src="item.authorAvatar"></el-avatar></div>
            </div>
            <div class="like">
              <div class="block" v-show="!isLike" @click="saveDiaryStar(item.id)"><i class="iconfont icon-xihuan"></i></div>
              <div class="block" v-show="isLike" @click="cancelDiaryStar(item.id)"><i class="iconfont icon-xiai"></i></div>
            </div>
            <div class="collect">
              <div class="block" v-show="!isCollect" @click="saveDiaryCollection(item.id)"><i class="iconfont icon-shoucang2"></i></div>
              <div class="block" v-show="isCollect" @click="cancelDiaryCollection(item.id)"><i class="iconfont icon-shoucang1"></i></div>
            </div>
            <div class="details">
              <div class="block" @click="justToVlogPageDetailDisplay(item.id)"><i class="iconfont icon-xiangqing"></i></div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>

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
  </el-container>
</template>
<script>
  import { reactive } from "vue";
  import axios from "axios";
  import {ElMessage} from "element-plus";
  // const onPlay = (ev) => {
  //   console.log(ev);
  // };
  export default {
    name: 'VLogPage',
    components: {},
    data() {
      return {
        url: 'http://localhost:8080/images/logo/logo.png',
        screenHeight: document.body.clientHeight - 40 + 'px',
        isLike: false,
        isCollect: false,
        autoplay: false,//是否自动切换
        isPlay:false,//播放状态
        isIn:true,//鼠标是否位于播放器内
        cutTime:5000,//轮播时间，单位毫秒
        nowIndex: 0,
        vlogs:[{

        }],
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
        })
      }
    },
    methods: {
      justToVlogPageDetailDisplay(id) {
        this.$router.push({name: 'VlogPageDetailDisplay' , query: {vlogId: id}})
      },
      likeDisplay(e) {
        console.log(e)
        this.hasAlreadLike(e.id)
        this.hasAlreadCollect(e.id)
      },
      getIndex(nowIndex, oldIndex){
        // console.log(nowIndex, oldIndex)
        //用户可能在上个视频未播放完毕就切换
        //此时需要暂停上个视频并把时间归零，否则影响对当前视频的监听逻辑
        this.getScreenHeightAndWidth()
        let myOldVideo = this.$refs['vue3-video-player' + oldIndex];
        myOldVideo[0].pause();
        myOldVideo[0].currentTime = 0

        let myNowVideo = this.$refs['vue3-video-player' + nowIndex];

        // myNowVideo[0].src = 'https://mvwebfs.ali.kugou.com/202202150544/c1e25c8affc83e84bf4581bbfd14b3b1/KGTX/CLTX002/2ef485d5ce1b774f6773483b193b7a73.mp4'
        myNowVideo[0].play();
      },
      nextToNextVideo() {
          // this.$refs.carousel.
        this.getScreenHeightAndWidth()
          this.$refs.carousel.next()
      },
      prevToLastVideo() {
        this.getScreenHeightAndWidth()
        this.$refs.carousel.prev();
      },
      getScreenHeightAndWidth() {
        // 获取屏幕高度
        let that = this;
        // this.myEcharts();
        window.onresize = () => {
          return (() => {
            window.fullHeight = document.documentElement.clientHeight;
            window.fullWidth = document.documentElement.clientWidth;
            // that.screenHeight = window.fullHeight - 40 + 'px'; // 高
            that.screenHeight = window.fullHeight + 'px'; // 高
            that.windowWidth = window.fullWidth; // 宽
          })()
        };
      },
      getAllVlog() {

        axios.get('/getAllVlog').then(response => {
            this.vlogs = response.data
            this.$forceUpdate()
          // console.log(this.vlogs)
        })
        this.getScreenHeightAndWidth()
      },

      saveDiaryStar(vlogId) {
        axios.post('/saveObjStar' , {
          objId: vlogId,
          objType: '放空Vlog'
        }).then(response => {
          this.isLike = true;
          // console.log(response)
          ElMessage({
            type: "success",
            message: response.data
          })
        })
      },
      cancelDiaryStar(vlogId) {
        axios.post('/cancelObjStar', {
          objId: vlogId,
          objType: '放空Vlog'
        }).then(response => {
          this.isLike = false;
          ElMessage({
            type: "success",
            message: response.data
          })
        })

      },
      saveDiaryCollection(vlogId) {
        // console.log(this.diary.id)
        axios.post('/saveObjCollection' , {
          objId: vlogId,
          objType: '放空Vlog'
        }).then(response => {
          this.isCollect = true;
          // console.log(response)
          ElMessage({
            type: "success",
            message: response.data
          })
        })
      },
      cancelDiaryCollection(vlogId) {
        axios.post('/cancelObjCollection', {
          objId: vlogId,
          objType: '放空Vlog'
        }).then(response => {
          this.isCollect = false;
          ElMessage({
            type: "success",
            message: response.data
          })
        })

      },
      hasAlreadLike(vlogId){
        console.log(vlogId)
        let eleToken = localStorage.getItem('eleToken')
        if (eleToken !== null) {
          axios.get('/hasAlreadLike?objId=' + vlogId + '&objType=放空Vlog').then(response => {
            if (response.data === 'like') {
              this.isLike = true;
            }else {
              this.isLike = false;
            }
          })
        }
      },
      hasAlreadCollect(vlogId){
        // console.log(this.diary.id)
        let eleToken = localStorage.getItem('eleToken')
        if (eleToken !== null) {
          axios.get('/hasAlreadCollect?objId=' + vlogId + '&objType=放空Vlog').then(response => {
            if (response.data === 'collect') {
              this.isCollect = true;
            }else {
              this.isCollect = false;
            }
          })
        }
      }
    },
    mounted() {
      // this.getScreenHeightAndWidth()
      this.getAllVlog()
    },
    watch: {
      'item': {
        deep: true,
        immediate: true,
        handler(newValue,oldValue) {
          console.log('item被修改了',newValue,oldValue)
        }
      }
    }
  }
</script>
<style scoped>
.el-container {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
.el-header, .el-footer {
  /*background-color: #B3C0D1;*/
  /*color: #333;*/
  text-align: center;
  /*line-height: 40px;*/
  height: 100%;
  width: 100%;
}

.el-main {
  /*background-color: #E9EEF3;*/
  /*color: #333;*/
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;

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

.el-carousel {
  width: 100%;
  height: 100%;
}
::v-deep(.el-carousel__container) {
  width: 100%;
  /*height: 100%;*/
  height: 100%;
  min-height: 100%;
}
.el-carousel__item:nth-child(2n) {
  /*background-color: #99a9bf;*/
}

.el-carousel__item:nth-child(2n+1) {
  /*background-color: #d3dce6;*/
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
  /*background: greenyellow;*/
  border-radius: 50px;
  position: absolute;
  /*top: 30px;*/
  right: 30px;
  top: 80px;

  z-index: 1000;

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

  z-index: 1000;
  /*position: absolute;*/
  /*top: 30px;*/
  /*right: 30px;*/
}
.nextToNextVideo {
  border-bottom: 1px solid gray;
  z-index: 1000;
}

.avator {
  position: absolute;
  /*top: 30px;*/
  right: 30px;
  top: 250px;
  z-index: 1000;
}
.like {
  position: absolute;
  /*top: 30px;*/
  right: 30px;
  top: 340px;
  z-index: 1000;
}

.collect {
  position: absolute;
  /*top: 30px;*/
  right: 30px;
  top: 420px;
  z-index: 100;
}
.details {
  position: absolute;
  /*top: 30px;*/
  right: 30px;
  top: 500px;
  z-index: 100;
}

</style>