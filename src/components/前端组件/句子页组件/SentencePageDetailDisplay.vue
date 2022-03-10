<template>
  <!--  <el-container>-->
  <el-main>
    <div class="leftContent">
      <el-breadcrumb separator="/" v-if="$route.query.type">
        <el-breadcrumb-item :to="{ name: 'SentencePageHomeDisplay' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.query.type }}</el-breadcrumb-item>
        <!--            <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
        <!--            <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      </el-breadcrumb>
      <div class="sentenceContentSingle">

        <div class="sentenceMain">
          <div class="sentenceContent">
            <div class="sentenceContentBox" v-html="sentence.content"></div>
          </div>
          <div class="sentenceContentAuthor" v-text="sentence.originalAuthor"></div>
          <div class="sentenceContentUserOperation">
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
            <ObserveComponent :obj_id="sentence.id" objType='放空句子' v-if="sentence.id != null"></ObserveComponent>
          </div>
        </div>
      </div>
<!--      评论区-->
    </div>

    <!--        这部分要拆分成一个新的组件-->
    <div class="rightContent">
      <PageDetailDisplayPageRightSideBar></PageDetailDisplayPageRightSideBar>
    </div>
  </el-main>
  <!--  </el-container>-->
</template>
<script>

import axios from "axios";
import {ElMessage} from "element-plus";
import ObserveComponent from "@/components/前端组件/评论组件/ObserveComponent";
import PageDetailDisplayPageRightSideBar from "@/components/前端组件/RightSideBar/PageDetailDisplayPageRightSideBar";
export default {
  name: 'SentencePageDetailDisplay',
  components: {
    ObserveComponent,
    PageDetailDisplayPageRightSideBar
  },
  data() {
    return {
      sentence: {},
      isLike: false,
      isCollect: false
    }
  },
  methods: {
    getencounterLoverSentence() {

      if (this.$route.query.type === '偶遇佳句') {
        axios.get('/encounterLoverSentence').then(response => {
          this.sentence = response.data
          this.hasAlreadLike()
          this.hasAlreadCollect()
        })
      }else {
        if (this.$route.query.sentenceId !== null) {
          // console.log(this.$route.query.sentenceId)
          axios.get('/getOneSentenceById?sentenceId=' + this.$route.query.sentenceId).then(response => {
            this.sentence = response.data
            this.hasAlreadLike()
            this.hasAlreadCollect()
          })
        }
      }
    },
    saveDiaryStar() {
      // console.log(this.diary.id)
      axios.post('/saveObjStar' , {
        objId: this.sentence.id,
        objType: '放空句子'
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
        objId: this.sentence.id,
        objType: '放空句子'
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
      axios.post('/saveObjCollection' , {
        objId: this.sentence.id,
        objType: '放空句子'
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
        objId: this.sentence.id,
        objType: '放空句子'
      }).then(response => {
        this.isCollect = false;
        ElMessage({
          type: "success",
          message: response.data
        })
      })

    },
    hasAlreadLike(){
      // console.log(this.diary.id)
      let eleToken = localStorage.getItem('eleToken')
      if (eleToken !== null) {
        axios.get('/hasAlreadLike?objId=' + this.sentence.id + '&objType=放空句子').then(response => {
          if (response.data === 'like') {
            this.isLike = true;
          }else {
            this.isLike = false;
          }
        })
      }
    },
    hasAlreadCollect(){
      // console.log(this.diary.id)
      let eleToken = localStorage.getItem('eleToken')
      if (eleToken !== null) {
        axios.get('/hasAlreadCollect?objId=' + this.sentence.id + '&objType=放空句子').then(response => {
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
    this.getencounterLoverSentence()
  }
}
</script>
<style scoped>

.el-container {
  margin: 0;
  padding: 0;
  /*padding-left: 130px;*/
  /*padding-right: 130px;*/
  /*background: red;*/
}


.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  padding-left: 130px;
  padding-right: 130px;
  background: green;
  padding-bottom: 40px;

  display: flex;
  /*text-align: center;*/
  /*line-height: 160px;*/
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
.leftContent {
  /*width: 60%;*/
  /*height: auto;*/
  background: gray;
}

.sentenceContentSingle {
  width: 100%;
  height: auto;
  background: #B3C0F1;
  margin-top: 30px;
  border-radius: 10px;
}
.sentenceTop {
  width: 100%;
  height: 50px;
  /*background: #4F8EFF;*/
  border-bottom: 1px solid lightgray;
}
.demo-basic--circle {
  width: 70px;
  height: 100%;
  /*background: gold;*/
  /*display: flex;*/
  float: left;

  /*display: flex;*/
  /*align-content: center;*/
  /*justify-content: center;*/
}
.block {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sentenceMain {
  width: 100%;
  min-height: 280px;
  height: auto;
}
.sentenceContent {
  width: 100%;
  min-height: 140px;
  height: auto;
  display: flex;
}
.sentenceContentBox {
  width: 500px;
  height: auto;
  margin-top: 80px;
  margin-bottom: 80px;
  margin-left: 100px;
  margin-right: 100px;
}
.sentenceContentAuthor {
  width: 100%;
  text-align: right;
  margin-left: -180px;

}
.sentenceContentUserOperation {
  width: 93%;
  height: auto;
  display:flex;
  /*justify-content:center;*/
  /*align-items:center;*/
  margin-top: 30px;
  margin-left: 2.5%;
  /*margin-left: 10px;*/
  /*padding-left: 10px;*/
  /*background: red;*/
  /*justify-content:center;*/
  border-bottom: 1px solid lightgray;
}
.operation {
  width: 50px;
  height: 50px;
  /*background: red;*/
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius: 100px;
  margin-right: 10px;
  /*margin-left: ;*/
  /*margin-right: -1.8;*/
  /*margin-right: 10px;*/
  /*margin-right: 100px;*/
}
.sentenceFooter {
  width: 100%;
  height: auto;
  background: aqua;
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}
::v-deep(.demo-basic) {
  width: 8.5%;
}
::v-deep(.userName) {
  width: 58%;
}
::v-deep(.observeTag) {
  width: 14.5%;
}
::v-deep(.observeTime) {
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

.commentSection ::v-deep(.el-input__inner)  {
  height: 40px;
  background: none;
  border: none;
}

.rightContent {
  width: 25%;
  height: auto;
  /*float: left;*/
  background: red;
  margin-top: 30px;
  border-radius: 10px;
  margin-left: 50px;
  position: fixed;
  /*top: 30px;*/
  left: 60%;
  word-break:break-all;
  /*padding-left: ;*/
}
.sentenceType {
  margin-left: 25px;
  margin-right: 25px;
}
.sentenceTypeHeader {
  width: 100%;
  min-height: 30px;
  background: greenyellow;
  display: flex;
  align-items: center;
  /*justify-content: center;*/
}
.el-tag {
  background: none;
  /*float: right;*/
  margin-left: 180px;
}
.guessLike{
  width: 100%;
  height: auto;
  margin-top: 20px;
  margin-bottom: 10px;
}
.sentenceTypeContent {
  width: 100%;
  height: auto;
  margin-top: 10px;
  margin-bottom: 20px;
}

.el-row {
  margin-bottom: 20px;

}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.grid-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-breadcrumb {
  /*margin-top: 30px;*/
  margin-left: 12px;
}

</style>
