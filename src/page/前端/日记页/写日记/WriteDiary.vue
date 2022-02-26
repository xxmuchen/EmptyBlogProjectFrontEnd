<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="topSection">
          <TopLogo></TopLogo>
          <div class="type">
            <div>
              放空日记
            </div>
          </div>
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
              <el-color-picker v-model="ruleForm.bgColor"  show-alpha :active-change="colorChange()"/>
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
  import TopLogo from "@/components/前端组件/logo组件/TopLogo";
  import UserLoginAvatarAndNameDisplay from "@/components/前端组件/用户登录信息组件/UserLoginAvatarAndNameDisplay";
  export default {
    name: 'WriteDiary',
    components: {
      UserLoginAvatarAndNameDisplay,
      TopLogo
    },
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

        this.editor.config.zIndex = 1

        this.editor.create()

        // this.editor.$textElem.elems[0].style.background = this.ruleForm.bgColor
      },
      colorChange(){
        // console.log(this.$store.state.user)

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
        })
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

}
.common-layout .el-footer {
  /*line-height: 60px;*/
}

.common-layout .el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);

}

.common-layout .el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);

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
  /*display: flex;*/
  /*align-items: center;*/
  /*height: 60px;*/
  /*height: 100%;*/
}
.topSection {
  height: 60px;
  display: flex;
  align-items: center;
  /*height: 20%;*/
}
.el-footer {
  height: auto;
}

.type {
  width: 77%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}
.user {
  /*width: 8%;*/
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