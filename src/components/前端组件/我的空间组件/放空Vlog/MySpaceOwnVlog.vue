<template>
  <div v-if="vlogData.length">
    <water-fall gap="10px" width="250px" class="container" :data="vlogData" :delay="true">
      <template #default="item">
        <router-link :to="{name:'' , query:{'id': item.id}}">
          <div class="card">
            <div class="player-container">
              <vue3VideoPlay
                  v-bind="options"
                  :currentTime="1"
                  :src = "item.videoUrl"
              >
              </vue3VideoPlay>
            </div>
          </div></router-link>
      </template>
    </water-fall>
    <!--    <button class="halo-btn halo-btn-primary" @click.stop.prevent="loadMore">加载更多</button>-->
  </div>
</template>
<script>
import WaterFall from 'kuan-vue-waterfall';
import {reactive} from "vue";

  export default {
    name: 'MySpaceOwnVlog',
    components: {
      WaterFall,
    },
    data() {
      return {
        vlogData: {},
        options: reactive({
          width: "30px", //播放器高度
          height: "30px", //播放器高度
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
    }
  }
</script>
<style>

</style>