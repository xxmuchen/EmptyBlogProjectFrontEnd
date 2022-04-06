<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <TopLogo></TopLogo>
        <div class="type">
          <div>
            放空Vlog
          </div>
        </div>
        <div class="user">
          <UserLoginAvatarAndNameDisplay></UserLoginAvatarAndNameDisplay>
        </div>
      </el-header>
      <el-main>
        <div class="vlogUploadSection">
          <div class="leftContent">

          </div>
          <vue3VideoPlay v-show="options.src" v-bind="options"/>
          <el-upload
              ref="upload"
              name="vlogVideoFile"
              class="vlog-uploader"
              action="http://localhost:8081/api/uploadVlogVideo"
              :show-file-list="false"
              :on-success="handleVlogSuccess"
          >
            <el-icon v-show="!options.src" class="vlog-uploader-icon">
              <plus/>
            </el-icon>
            <!--            <template>-->

            <!--            </template>-->
          </el-upload>
          <div class="rightContent" v-show="options.src">
            <el-form>
              <el-form-item label="标题">
                <el-input

                    v-model="ruleForm.title"
                    :rows="8"
                    placeholder="Please input"
                />
              </el-form-item>
              <el-form-item label="描述">
                <el-input

                    v-model="ruleForm.description"
                    :rows="8"
                    type="textarea"
                    placeholder="Please input"
                />
              </el-form-item>

              <div class="buttons">
                <el-button type="primary" @click="toSelectFile">重新选择视频</el-button>
                <div>
                  <span style="margin-right: 5px">公开</span>
                  <el-switch
                      v-model="ruleForm.see"
                      class="ml-2"
                      inline-prompt
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                  ></el-switch>
                </div>
                <el-button type="success" @click="vlogSubmit">提交</el-button>
              </div>
            </el-form>
          </div>


        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>

import TopLogo from "@/components/前端组件/logo组件/TopLogo";
import UserLoginAvatarAndNameDisplay from "@/components/前端组件/用户登录信息组件/UserLoginAvatarAndNameDisplay";
import {reactive} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
// import {ElMessage} from "element-plus";

export default {
  name: 'WriteVlog',
  components: {UserLoginAvatarAndNameDisplay, TopLogo},

  data() {
    return {
      options: reactive({
        width: '60%', //播放器高度
        height: '450px', //播放器高度
        color: "#409eff", //主题色
        title: '', //视频名称
        src: "", //视频源
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
      }),
      ruleForm: {
        title: '',
        videoUrl: '',
        description: '',
        see: true
      }
    }
  },
  methods: {
    handleVlogSuccess(res) {
      console.log(123)
      // this.options.src = ''
      this.options.src = res
      this.ruleForm.videoUrl = res
    },
    toSelectFile() {
      // this.$refs.upload.
      // this.$refs['upload']
      this.options.src = ''
    },
    // beforeAvatarUpload() {
    //   console.log(456)
    //   this.options.src = "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4"
    // }
    vlogSubmit() {
      axios.post('/addVlog', {
        title: this.ruleForm.title,
        videoUrl: this.ruleForm.videoUrl,
        description: this.ruleForm.description,
        see: this.ruleForm.see
      }).then(response => {
        ElMessage.success("上传成功", response)
      })
    }
  }
}


</script>
<style scoped>
.common-layout .el-header,
.common-layout .el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  /*text-align: center;*/
  /*line-height: 60px;*/
  /*padding: 0;*/
  /*margin: 0;*/
  /*height: auto;*/
}

.common-layout .el-footer {
  /*line-height: 60px;*/
}

.common-layout .el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  /*text-align: center;*/
  /*line-height: 200px;*/
}

.common-layout .el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  /*text-align: center;*/
  /*line-height: 160px;*/
  /*padding: 0;*/
  /*padding-left: 240px;*/
  /*padding-right: 240px;*/
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

.el-header {
  /*height: 70px;*/
  display: flex;
  align-items: center;
}

.el-footer {
  height: auto;
}

.topSection {
  height: 60px;
  display: flex;
  align-items: center;
  /*height: 20%;*/
}

.type {
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}

.user {
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}

.vlog-uploader {
  position: absolute;
  left: 700px;
  top: 240px;
}

.vlog-uploader ::v-deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.vlog-uploader .el-upload:hover {
  border-color: #409eff;
}

.el-icon.vlog-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.vlog {
  width: 178px;
  height: 178px;
  display: block;
}

.vlogUploadSection {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  /*justify-content: center;*/
  /*align-content: center;*/
  /*justify-items: center;*/
}

.rightContent {
  width: 40%;
  padding-left: 20px;
}

.el-button {
  /*margin-left: 20px;*/
}

.buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  /*padding: 30px;*/
  margin-top: 20px;
}

.el-button {
  margin-left: 20px;
  margin-right: 20px;
}
</style>