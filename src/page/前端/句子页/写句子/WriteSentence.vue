<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="topSection">
          <TopLogo></TopLogo>
          <div class="type">
            <div>
              放空句子
            </div>
          </div>
          <UserLoginAvatarAndNameDisplay></UserLoginAvatarAndNameDisplay>
        </div>

      </el-header>
      <el-main>
        <el-form label-position="left">
          <div class="diaryConfiguration">
            <el-form-item label="原创">
              <el-switch
                  v-model="ruleForm.original"
                  size="small"
              />
            </el-form-item>
            <el-form-item label="原作者" v-show="!ruleForm.original">
              <el-input v-model="ruleForm.originalAuthor" placeholder="Please input" clearable />
            </el-form-item>
            <el-form-item label="标签">
              <el-select
                  v-model="ruleForm.tag"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  :reserve-keyword="false"
                  placeholder="Choose tags for your article"
                  multiple-limit="3"
              >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
<!--            <el-form-item label="背景色">-->
<!--              <el-color-picker v-model="ruleForm.bgColor" show-alpha />-->
<!--            </el-form-item>-->
            <el-form-item label="公开">
              <el-switch
                  v-model="ruleForm.public"
                  size="small"
              />
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
      <el-footer>Copyright 2020-2025 © 放空blog all rights reserved</el-footer>
    </el-container>
  </div>
</template>
<script>
import E from 'wangeditor'
import {ElMessage} from "element-plus";
import axios from "axios";
import UserLoginAvatarAndNameDisplay from "@/components/前端组件/用户登录信息组件/UserLoginAvatarAndNameDisplay";
import TopLogo from "@/components/前端组件/logo组件/TopLogo";
// import axios from "axios";
// import { ElMessage } from "@element-plus/icons-vue";
// import axios from "axios";
// 或者 const editor = new E( document.getElementById('div1') )
// editor.create()
export default {
  name: 'WriteSentence',
  components: {TopLogo, UserLoginAvatarAndNameDisplay},
  data() {
    return {
      url: 'https://s4.ax1x.com/2022/02/11/HUfWjA.png',
      ruleForm: {
        content: '',
        public: true,
        original: true,
        originalAuthor: '',
        tag: '',
        bgColor: ''
      },
      options: [
        {
          value: '哲理',
          label: '哲理',
        },
        {
          value: '感悟',
          label: '感悟',
        },
        {
          value: '爱情',
          label: '爱情',
        },
        {
          value: '伤感',
          label: '伤感',
        },
        {
          value: '励志',
          label: '励志',
        },
        {
          value: '唯美',
          label: '唯美',
        },
        {
          value: '生活',
          label: '生活',
        },
        {
          value: '动漫',
          label: '动漫',
        },
        {
          value: '朋友',
          label: '朋友',
        }
      ],
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
      this.editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'list',
        'justify',
        'emoticon',
        'splitLine',
        'undo',
        'redo',
      ]
      this.editor.create()
      // this.editor.$textElem.elems[0].style.background = this.ruleForm.bgColor
    },
    onSubmit() {
      //
      this.ruleForm.content = this.editor.txt.html()
      console.log(this.ruleForm.bgColor)
      axios.post('/addSentence', {
        content: this.ruleForm.content,
        see: this.ruleForm.public,
        originalAuthor: this.ruleForm.originalAuthor,
        sentenceTagList: this.ruleForm.tag,
        bgColor: this.ruleForm.bgColor
      }).then(response => {
        ElMessage({
          message: response.data,
          type: 'success'
        })
        this.$router.push({name: 'MySpaceOwnSentence'})
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
  /*background-color: #b3c0d1;*/
  /*color: var(--el-text-color-primary);*/
  /*text-align: center;*/
  /*line-height: 60px;*/
  /*padding: 0;*/
  /*margin: 0;*/
  /*height: auto;*/
  background-color: #f4f0e6;
}
.el-footer {
  color: lightslategray;
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
  padding-left: 240px;
  padding-right: 240px;
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
  width: 73%;
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
  /*width: auto;*/
  /*padding: 0;*/
  margin-left: 30px;
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
  margin-left: 30px;
}
.el-select {
  min-width: 300px;
}

</style>