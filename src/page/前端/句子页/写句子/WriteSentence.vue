<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <TopLogo></TopLogo>
        <div class="type">
          <div>
            放空日记
          </div>
        </div>
        <div class="user">
          <UserLoginAvatarAndNameDisplay></UserLoginAvatarAndNameDisplay>
        </div>
      </el-header>
      <el-main>
        <el-form label-position="left">
          <div class="diaryConfiguration">
            <el-form-item label="心情" label-po>
              <div>
                <el-radio-group v-model="ruleForm.mood">
                  <el-radio-button label="开心"><i class="iconfont icon-a-weixiaokaixingaoxing-12"></i></el-radio-button>
                  <el-radio-button label="愤怒"><i class="iconfont icon-a-shengqifennushangxindaku-15"></i></el-radio-button>
                  <el-radio-button label="伤心"><i class="iconfont icon-shangxin"></i></el-radio-button>
                  <el-radio-button label="害怕"><i class="iconfont icon-haipabiaoqing"></i></el-radio-button>
                  <el-radio-button label="无奈"><i class="iconfont icon-wunai"></i></el-radio-button>
                  <el-radio-button label="恋爱"><i class="iconfont icon-_lianaiqinggan"></i></el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="天气">
              <div>
                <el-radio-group v-model="ruleForm.weather">
                  <el-radio-button label="晴朗"><i class="iconfont icon-qinglang"></i></el-radio-button>
                  <el-radio-button label="多云"><i class="iconfont icon-duoyun"></i></el-radio-button>
                  <el-radio-button label="打雷"><i class="iconfont icon-iconset0468"></i></el-radio-button>
                  <el-radio-button label="下雨"><i class="iconfont icon-xiayu"></i></el-radio-button>

                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="背景色">
              <el-color-picker v-model="ruleForm.bgColor"  show-alpha />
            </el-form-item>
            <el-form-item label="公开">
              <el-switch
                  v-model="ruleForm.public"
                  size="small"
              />
            </el-form-item>
          </div>
          <div class="titleBox">
            <el-form-item label="标题">
              <el-input v-model="ruleForm.title" placeholder="请输入标题"  clearable />
            </el-form-item>
          </div>
          <el-form-item>
            <div class="editor">
              <div ref="WangEditor" class="wangeditor"></div>
            </div>
          </el-form-item>
        </el-form>

        <div class="submit">
          <el-button type="primary" @click="onSubmit">写好了</el-button>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
import E from 'wangeditor'
import { ElMessage } from "element-plus";
import axios from "axios";
import UserLoginAvatarAndNameDisplay from "@/components/前端组件/用户登录信息组件/UserLoginAvatarAndNameDisplay";
import TopLogo from "@/components/前端组件/logo组件/TopLogo";
// import axios from "axios";
// import { ElMessage } from "@element-plus/icons-vue";
// import axios from "axios";
// 或者 const editor = new E( document.getElementById('div1') )
// editor.create()
export default {
  name: 'WriteDiary',
  components: {TopLogo, UserLoginAvatarAndNameDisplay},
  data() {
    return {
      url: 'https://s4.ax1x.com/2022/02/11/HUfWjA.png',
      ruleForm: {
        mood: '',
        weather: '',
        bgColor: '',
        public: true,
        title: '',
        content: ''
      },
      editor: {}
    }
  },
  methods: {
    setEditor() {
      this.editor = new E(this.$refs.WangEditor)
      this.editor.config.height = 400
      this.editor.config.placeholder = ''
      this.editor.config.focus = false
      this.editor.config.customAlert = function (s, t) {
        switch (t) {
          case 'success':
            ElMessage.success(s)
            break
          case 'info':
            ElMessage.info(s)
            break
          case 'warning':
            ElMessage.warning(s)
            break
          case 'error':
            ElMessage.error(s)
            break
          default:
            ElMessage.info(s)
            break
        }
      }
      this.editor.config.uploadImgShowBase64 = true
      this.editor.config.uploadImgServer = 'http://localhost:8081/api/diaryImageFileUpLoadAndReturnUrl'
      this.editor.config.uploadFileName = 'myImageFileName'
      this.editor.config.uploadVideoServer = 'http://localhost:8081/api/diaryVideoFileUpLoadAndReturnUrl'
      this.editor.config.uploadVideoName = 'myVideoFileName'
      this.editor.config.uploadVideoMaxSize = 30 * 1024 * 1024
      this.editor.config.zIndex = 1

      this.editor.create()

      this.editor.$textElem.elems[0].style.background = this.ruleForm.bgColor
    },
    onSubmit() {
      //
      this.ruleForm.content = this.editor.txt.html()
      console.log(this.ruleForm.bgColor)
      axios.post('/diaryInfoUpload' , {
        title: this.ruleForm.title,
        content: this.ruleForm.content,
        mood: this.ruleForm.mood,
        weather: this.ruleForm.weather,
        bgColor: this.ruleForm.bgColor,
        see: this.ruleForm.public,
        // author_id: this.$store.getters.user
      }).then(response => {
        ElMessage({
          message: response.data,
          type: 'success'
        })
        // setTimeout(()=>{
        //   // ElMessage.success(response);
        //
        // } , 3000)
      })
      // console.log(this.ruleForm)
      // console.log(this.editor.txt.html());
    }
  },
  mounted() {
    this.setEditor();
  },
  beforeUnmount() {
    this.editor.destroy();
    this.editor = null
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
  padding-left: 240px;
  padding-right: 240px;
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
.demo-image {
  width: 8%;
  /*margin-top: 20px;*/
  /*margin-left: 20px;*/
}
.type {
  width: 84%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}
.user {
  width: 8%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}
.el-form {
  /*width: 97%;*/
  /*padding: 0;*/
  /*padding-left: 240px;*/
  /*padding-right: 240px;*/
}
.el-form-item {
  /*padding: 0;*/
}
.diaryConfiguration {
  display: flex;
}
.editor {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  /*margin-top: 30px;*/
  /*padding: 0;*/
  /*margin: 0;*/
}
.wangeditor {
  width: 100%;
}
.submit {
  /*margin-left: 240px;*/
  margin-top: 5px;
}

</style>