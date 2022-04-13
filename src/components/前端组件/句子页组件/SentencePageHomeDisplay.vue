<template>
  <!--  <el-container>-->
  <el-main>
    <div class="leftContent">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'SentencePageHomeDisplay' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.query.type">{{ $route.query.type }}</el-breadcrumb-item>
        <!--            <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
        <!--            <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      </el-breadcrumb>
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li  class="infinite-list-item" v-for="item in sentenceData" :key="item.id">
          <div class="sentenceContentSingle">
            <div class="sentenceTop">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar size="default" :src="item.authorAvatar"></el-avatar>
                </div>
                <!--                  <div class="block" v-for="size in sizeList" :key="size">-->
                <!--                    <el-avatar :size="size" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar>-->
                <!--                  </div>-->
              </div>
              <div class="userName" v-text="item.authorName"></div>
            </div>
            <router-link :to="{name: 'SentencePageDetailDisplay' , query: {sentenceId: item.id}}">
              <div class="sentenceMain">
                <div class="sentenceContent">
                  <div class="sentenceContentBox" v-html="item.content">
                  </div>
                </div>
                <div class="sentenceContentAuthor" v-text="item.originalAuthor"></div>
              </div>
            </router-link>
            <el-form>
              <el-form-item>
                <div class="sentenceFooter">
                  <div class="commentSection">
                    <el-input v-model="rootObserveContent" :disabled="isDisable" placeholder="请输入内容" @keyup.enter="addRootObserve(item.id)"></el-input>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </li>
      </ul>
    </div>
    <div class="rightContent">
      <RightSideBar></RightSideBar>
    </div>
  </el-main>
</template>
<script>
import RightSideBar from '@/components/前端组件/句子页组件/SentencePageRightSideBar/SentencePageHomePageRightSideBar'
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: 'SentencePageHomeDisplay',
  components: {
    RightSideBar
  },
  data() {
    return {
      count: 0,
      sentenceData: {},
      rootObserveContent: '',
      isDisable: false
    }
  },
  methods: {
    load() {
      this.count += 1;
    },
    isDisabledObserve() {
      let eleToken = localStorage.getItem('eleToken')
      // eslint-disable-next-line no-debugger
      // debugger
      if (eleToken !== null) {
        this.isDisable = false
      }else {
        this.isDisable = true
      }
    },
    /*上传rootObserve*/
    addRootObserve(obj_id) {
      axios.post('/addObjObserve', {
        type: '放空句子',
        objId: obj_id,
        observeContent: this.rootObserveContent
      }).then(() => {
        // console.log(response)
        this.rootObserveContent = ''
        // this.dataSource = response.data
        ElMessage({
          type: "success",
          message: "评论成功"
        })
      })
    },
    getAllSentence() {
      axios.get("/getAllSentence").then(response => {
        this.sentenceData = response.data
        // console.log(response.data)
      })
    },
    getQuotesByFamousPeople() {
      axios.get("/quotesByFamousPeople").then(response => {
        this.sentenceData = response.data
        console.log(this.sentenceData)
        // console.log(response.data)
      })
    },
    getRecommendSentenceList() {
      axios.get("/recommendSentenceList").then(response => {
        this.sentenceData = response.data
        // console.log(response.data)
      })
    },
    distinguishSentenceType(val) {
      if (val === '名人名言') {
        this.getQuotesByFamousPeople();

      }else if (val === '精选句集') {
        this.getRecommendSentenceList();
      }else {
        this.getAllSentence();
      }
    },
    /*通过标签获取句子*/
    getSentenceByTag(sentenceTag) {
      axios.get('/getSentenceByTag?sentenceTag=' + sentenceTag).then(response => {
        this.sentenceData = response.data
      })
    }
  },
  mounted() {
    this.distinguishSentenceType(this.$route.query.type)
  },
  watch: {
    '$route.query.type'(val) {
      this.distinguishSentenceType(val)
    },
    '$route.query.tag'(val) {
      this.getSentenceByTag(val)
    }
  }
}
</script>
<style scoped>

.el-container {
  margin: 0;
  padding: 0;
  padding-left: 130px;
  padding-right: 130px;
  /*background: red;*/
}


.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  padding: 0;
  margin: 0;

  padding-left: 130px;
  padding-right: 130px;
  /*background: green;*/
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
  width: 60%;
  height: 100%;
  /*background: gray;*/
}



.el-breadcrumb {
  /*margin-top: 30px;*/
  margin-left: 12px;
}

.infinite-list {
  /*height: 300px;*/
  /*height: 1000px;*/
  /*height: ;*/
  padding: 0;
  margin: 0;
  list-style: none;
  /*background-color: #ceefe4;*/
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  /*height: 50px;*/
  /*background: var(--el-color-primary-light-9);*/
  margin: 10px;
  /*margin-top: 25px;*/
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.sentenceContentSingle {
  width: 100%;
  height: auto;
  /*background: #B3C0F1;*/
  /*margin-top: 30px;*/
  border-radius: 10px;
}

.sentenceTop {
  width: 100%;
  height: 50px;
  /*background: #4F8EFF;*/
  background-color: #ceefe4;
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

.userName {
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  /*margin-left: 10px;*/
  /*padding-left: 10px;*/
}

.sentenceMain {
  width: 100%;
  min-height: 280px;
  height: auto;
  /*background: yellow;*/
  background-color: #ceefe4;
  border-bottom: 2px solid lightgray;
  /*background-color: #9dd3a8;*/
  /*padding-left: 30px;*/
}

.sentenceContent {
  width: 100%;
  min-height: 140px;
  height: auto;
  display: flex;
  /*padding-left: 30px;*/
  /*align-items: end;!*实现水平居中*!*/
  /*justify-content:center;*/
  /*text-align: end;*/
  /*background: greenyellow;*/
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
  /*min-height: 70px;*/
  text-align: right;
  /*padding-right: 30px;*/
  /*margin-right: -30px;*/
  margin-left: -180px;
  /*float: right;*/
  /*display: flex;*/
  /*align-items:center;!*实现水平居中*!*/
  /*justify-content:right;*/
  /*text-align: center;*/
  /*padding-left: 30px;*/
  /*margin-right: 30px;*/
  /*border-bottom: 1px solid lightgray;*/
}

.sentenceContentUserOperation {
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  /*margin-left: 10px;*/
  /*padding-left: 10px;*/
  /*background: red;*/
  /*justify-content:center;*/
  border-bottom: 1px solid lightgray;
}

.sentenceContentUserOperation > div {
  width: 50px;
  height: auto;
  margin-left: 20px;
}

.sentenceFooter {
  width: 100%;
  height: 50px;
  /*background: aqua;*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  background-color: #ceefe4;
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


.sentenceContentUserOperation {
  width: 93%;
  height: auto;
  display:flex;
  /*justify-content:center;*/
  /*align-items:center;*/
  /*margin-top: 30px;*/
  /*margin-left: 2.5%;*/
  /*margin-bottom: 10px;*/
  /*padding-left: 10px;*/
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

.commentSection ::v-deep(.el-input__inner) {
  height: 40px;
  background: none;
  border: none;
}

.rightContent {
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
  word-break: break-all;
  background-color: #d9d9f3;
  /*padding-left: ;*/
}

</style>
