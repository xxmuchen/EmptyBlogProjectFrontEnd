<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="3">
            <div class="logo">
              <TopLogo></TopLogo>
            </div>
          </el-col>

          <el-col :span="3" :offset="18">
            <div class="logo">
              <UserLoginAvatarAndNameDisplay></UserLoginAvatarAndNameDisplay>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!--      <el-container>-->
      <el-main>
        <!--          <el-scrollbar>-->
        <div class="mainContent">
          <div class="leftSection">
            <div class="videoContent">
              <div class="vlogSection">
                <vue3-video-play v-bind="options" :src="vlogData.videoUrl"></vue3-video-play>
              </div>
              <div class="titleAndDescribe">
                <div class="title">
                  {{ vlogData.title }}
                </div>
                <div class="describe">
                  {{ vlogData.description }}
                </div>
              </div>
              <div class="userOperation">
                <div class="operation">
                  <i class="iconfont icon-xihuan" v-show="!isLike" @click="saveDiaryStar"></i>
                  <i class="iconfont icon-xiai" v-show="isLike" @click="cancelDiaryStar"></i>
                </div>
                <div class="operation">
                  <i class="iconfont icon-shoucang2" v-show="!isCollect" @click="saveDiaryCollection"></i>
                  <i class="iconfont icon-shoucang1" v-show="isCollect" @click="cancelDiaryCollection"></i>
                </div>
              </div>
            </div>
            <div class="sentenceFooter">
              <div class="commentSection">
                <ObserveComponent :obj_id="vlogData.id" objType='放空Vlog' v-if="vlogData.id != null"></ObserveComponent>
              </div>
            </div>
          </div>

          <!--        <el-aside width="500px">-->
          <div class="rightSection">
            <PageDetailDisplayPageRightSideBar :user_id="vlogData.authorId" v-if="vlogData.id != null"></PageDetailDisplayPageRightSideBar>
          </div>
        </div>
        <!--          </el-scrollbar>-->
      </el-main>
      <!--        </el-aside>-->
      <!--      </el-container>-->
    </el-container>
  </div>
</template>
<script>
import TopLogo from "@/components/前端组件/logo组件/TopLogo";
import UserLoginAvatarAndNameDisplay from "@/components/前端组件/用户登录信息组件/UserLoginAvatarAndNameDisplay";
import PageDetailDisplayPageRightSideBar from "@/components/前端组件/RightSideBar/PageDetailDisplayPageRightSideBar";
import {reactive} from "vue";
import axios from "axios";
import ObserveComponent from "@/components/前端组件/评论组件/ObserveComponent";
import {ElMessage} from "element-plus";

export default {
  name: 'VlogPageDetailDisplay',
  components: {ObserveComponent, PageDetailDisplayPageRightSideBar, UserLoginAvatarAndNameDisplay, TopLogo},
  data() {
    return {
      isLike: false,
      isCollect: false,
      vlogData: {},
      options: reactive({
        width: '100%', //播放器高度
        height: '500px', //播放器高度
        color: "#409eff", //主题色
        title: '', //视频名称
        // src: "", //视频源
        muted: false, //静音
        webFullScreen: false,
        speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
        autoPlay: false, //自动播放
        loop: false, //循环播放
        mirror: false, //镜像画面
        ligthOff: false,  //关灯模式
        volume: 0.3, //默认音量大小
        control: true, //是否显示控制
        controlBtns: ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'] //显示所有按钮,
      })
    }
  },
  methods: {
    saveDiaryStar() {
      // console.log(this.diary.id)
      axios.post('/saveObjStar', {
        objId: this.vlogData.id,
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
    cancelDiaryStar() {
      axios.post('/cancelObjStar', {
        objId: this.vlogData.id,
        objType: '放空Vlog'
      }).then(response => {
        this.isLike = false;
        ElMessage({
          type: "success",
          message: response.data
        })
      })

    },
    saveDiaryCollection() {
      // console.log(this.diary.id)
      axios.post('/saveObjCollection', {
        objId: this.vlogData.id,
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
    cancelDiaryCollection() {
      axios.post('/cancelObjCollection', {
        objId: this.vlogData.id,
        objType: '放空Vlog'
      }).then(response => {
        this.isCollect = false;
        ElMessage({
          type: "success",
          message: response.data
        })
      })

    },
    hasAlreadLike(objId) {
      // console.log(this.diary.id)
      let eleToken = localStorage.getItem('eleToken')
      if (eleToken !== null) {
        axios.get('/hasAlreadLike?objId=' + objId + '&objType=放空Vlog').then(response => {
          if (response.data === 'like') {
            this.isLike = true;
          } else {
            this.isLike = false;
          }
        })
      }
    },
    hasAlreadCollect(objId) {
      // console.log(this.diary.id)
      let eleToken = localStorage.getItem('eleToken')
      if (eleToken !== null) {
        axios.get('/hasAlreadCollect?objId=' + objId + '&objType=放空Vlog').then(response => {
          if (response.data === 'collect') {
            this.isCollect = true;
          } else {
            this.isCollect = false;
          }
        })
      }
    },
    getVlogById(vlogId) {
      console.log(vlogId)
      axios.get("/getVlogById?vlogId=" + vlogId).then(response => {
        this.vlogData = response.data
        // this.options.src = response.data.video_url
      })
    }
  },
  mounted() {
    this.getVlogById(this.$route.query.vlogId)
    this.hasAlreadLike(this.$route.query.vlogId)
    this.hasAlreadCollect(this.$route.query.vlogId)
  },
}
</script>
<style scoped>
.common-layout .el-header,
.common-layout .el-footer {
  /*background-color: yellow;*/
  /*color: var(--el-text-color-primary);*/
  height: auto;
  background-color: #f4f0e6;
  /*text-align: center;*/
  line-height: 40px;
}

.common-layout .el-footer {
  /*line-height: 60px;*/
}

.common-layout .el-aside {
  background-color: #f4f0e6;
  /*background-color: #d3dce6;*/
  /*color: var(--el-text-color-primary);*/
  /*text-align: center;*/
  /*line-height: 200px;*/
}

.common-layout .el-main {
  /*background-color: #e9eef3;*/
  /*color: var(--el-text-color-primary);*/
  /*text-align: center;*/
  /*line-height: 160px;*/
  background-color: #f4f0e6;
}

.common-layout > .el-container {
  /*margin-bottom: 40px;*/
}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
  /*line-height: 260px;*/
}

.common-layout .el-container:nth-child(7) .el-aside {
  /*line-height: 320px;*/
}

.mainContent {
  display: flex;

}

.el-row {
  /*margin-bottom: 20px;*/
  margin-top: 10px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  /*background: #99a9bf;*/
}

.bg-purple {
  /*background: #d3dce6;*/
}

.bg-purple-light {
  /*background: #e5e9f2;*/
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  /*background-color: #f9fafc;*/
}

.logo {
  margin-top: 3px;
}

.searchSection {
  display: flex;
  margin-top: 7px;
}

.leftSection {
  width: 60%;
}

.videoContent {
  /*background-color: #ceefe4;*/
}

.rightSection {
  width: 25%;
  height: auto;
  /*float: left;*/
  /*background: red;*/
  margin-top: 30px;
  border-radius: 10px;
  margin-left: 50px;
  position: fixed;
  /*top: 30px;*/
  left: 60%;
  word-break:break-all;
  background-color: #d9d9f3;
}

::v-deep(.el-input__inner) {
  width: 360px;
}

.searchButton {
  margin-left: 10px;
}

.titleAndDescribe {
  display: flex;
  margin-top: 15px;
}

.titleAndDescribe div {
  margin-left: 30px;
}

.userOperation {
  width: 93%;
  height: auto;
  display: flex;
  /*justify-content:center;*/
  /*align-items:center;*/
  margin-top: 30px;
  margin-left: 2.5%;
  /*padding-left: 10px;*/
}

.operation {
  width: 50px;
  height: 50px;
  /*background: red;*/
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-right: 10px;
}

.sentenceFooter {
  width: 100%;
  height: auto;
  /*background: aqua;*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  background-color: #F8F4E3;
  margin-top: 20px;
}

.sentenceFooter ::v-deep(.demo-basic) {
  width: 8.5%;
}

.sentenceFooter ::v-deep(.userName) {
  width: 58%;
}

.sentenceFooter ::v-deep(.observeTag) {
  width: 14.5%;
}

.sentenceFooter ::v-deep(.observeTime) {
  width: 32%;
}

.commentSection {
  width: 98%;
  height: 100%;
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  /*display: flex;*/
  /*align-items:center;!*实现水平居中*!*/
  /*justify-content:right;*/
  /*text-align: center;*/
}

.el-input {
  width: 100%;
  border: 1px red;
}

.commentSection ::v-deep(.el-input__inner) {
  height: 40px;
  width: 100%;

}


.rightSection {
  margin-top: 50px;
}
</style>