<template>
  <div class="common-layout">
    <el-container>
      <el-header>
       <TopLogo></TopLogo>
        <div class="type">
          <div>
            放空图文
          </div>
        </div>
        <div class="user">
          <UserLoginAvatarAndNameDisplay></UserLoginAvatarAndNameDisplay>
        </div>
      </el-header>
      <el-main>
        <div class="griphicUploadSection">
<!--          <div class="leftContent">-->

<!--          </div>-->
<!--          <vue3VideoPlay v-show="options.src" v-bind="options"/>-->

          <div class="demo-image" v-show="ruleForm.imageUrl">
            <div class="block" >
<!--              <span class="demonstration">{{ fit }}</span>-->
              <el-image
                  style="width: 60%; height: 450px"
                  :src="ruleForm.imageUrl"
                  fit="fill"></el-image>
            </div>
          </div>

          <el-upload
              ref="upload"
              name="griphicImageFile"
              class="griphic-uploader"
              action="http://localhost:8081/api/uploadGriphicImage"
              :show-file-list="false"
              :on-success="handleGriphicSuccess"
              v-show="!ruleForm.imageUrl"
          >
            <el-icon  class="griphic-uploader-icon"><plus /></el-icon>
<!--            <template>-->

<!--            </template>-->
          </el-upload>
          <div class="rightContent" v-show="ruleForm.imageUrl" >
            <el-input
                v-model="ruleForm.description"
                :rows="8"
                type="textarea"
                placeholder="Please input"
                :disabled="ruleForm.type !== '美图美句'"
            />
            <div class="buttons" >
              <el-button type="primary" @click="toSelectFile">重新选择图片</el-button>
              <el-select  v-model="ruleForm.type" size="medium" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
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
              <el-button  type="success" @click="griphicSubmit">提交</el-button>
            </div>
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
// import {reactive} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
// import {ElMessage} from "element-plus";

export default {
  name: 'WriteGriphicPage',
  components: {UserLoginAvatarAndNameDisplay, TopLogo},

  data() {
    return {
      options: [
        {
          value: '美图美句',
          label: '美图美句'
        },
        {
          value: '手写美句',
          label: '手写美句'
        },
        {
          value: '经典对白',
          label: '经典对白'
        }
      ],
      ruleForm: {
        type: '美图美句',
        imageUrl: '',
        description: '',
        see: true
      }
    }
  },
  methods: {
    handleGriphicSuccess(res) {
      // console.log(123)
      // this.options.src = ''
      this.ruleForm.imageUrl = res
      // this.ruleForm.videoUrl = res
    },
    toSelectFile() {
      // this.$refs.upload.
      // this.$refs['upload']
      // this.options.src = ''
      this.ruleForm.imageUrl = ''
    },
    // beforeAvatarUpload() {
    //   console.log(456)
    //   this.options.src = "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4"
    // }
   griphicSubmit() {
      if (this.ruleForm.type !== '美图美句') {
        this.ruleForm.description = null
      }
      axios.post('/addGriphic', {
        imageUrl: this.ruleForm.imageUrl,
        description: this.ruleForm.description,
        see:this.ruleForm.see,
        type: this.ruleForm.type
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
  /*background-color: #b3c0d1;*/
  /*color: var(--el-text-color-primary);*/
  /*text-align: center;*/
  /*line-height: 60px;*/
  /*padding: 0;*/
  /*margin: 0;*/
  /*height: auto;*/
  background-color: #f4f0e6;
}
.common-layout .el-footer {
  /*line-height: 60px;*/
}

.common-layout .el-aside {
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
  /*padding: 0;*/
  /*padding-left: 240px;*/
  /*padding-right: 240px;*/
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
  width: 73%;
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

.griphic-uploader {
  position: absolute;
  left: 700px;
  top: 240px;
}
.griphic-uploader ::v-deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.griphic-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.griphic-uploader-icon {
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

.griphicUploadSection {
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
.demo-image {
  width: 70%;
}
.block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
}
.el-image {
  width: 100%;

}
.el-select {
  width: 150px;
}
</style>