<template>
  <!--  <el-container>-->
  <el-main>
    <div class="leftContent">
      <div class="sentenceContentSingle">
        <!--        <div class="sentenceTop">-->
        <!--          <div class="demo-basic&#45;&#45;circle">-->
        <!--            <div class="block"><el-avatar :size="large" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar></div>-->
        <!--            &lt;!&ndash;                  <div class="block" v-for="size in sizeList" :key="size">&ndash;&gt;-->
        <!--            &lt;!&ndash;                    <el-avatar :size="size" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar>&ndash;&gt;-->
        <!--            &lt;!&ndash;                  </div>&ndash;&gt;-->
        <!--          </div>-->
        <!--          <div class="userName">wcx</div>-->
        <!--        </div>-->
        <div class="sentenceMain">
          <div class="sentenceContent">
            <div class="sentenceContentBox">
              <div class="demo-image">
                <div class="block">
<!--                  <span class="demonstration">{{ fit }}</span>-->
                  <el-image
                      style="width: 400px; height: auto"
                      :src="griphicData.imageUrl"
                      fit="fill"></el-image>
                </div>
              </div>
              <div>
                <div class="fontSection">
                  dsadfafsdfg
                </div>
              </div>
            </div>
          </div>
<!--          <div class="sentenceContentAuthor">dc</div>-->
          <div class="sentenceContentUserOperation">
            <div class="operation">
              <i class="iconfont icon-xihuan" v-show="!isLike" @click="saveDiaryStar"></i>
              <i class="iconfont icon-xiai" v-show="isLike" @click="cancelDiaryStar"></i>
            </div>
            <div class="operation">
              <i class="iconfont icon-shoucang2" v-show="!isCollect" @click="saveGriphicCollection"></i>
              <i class="iconfont icon-shoucang1" v-show="isCollect" @click="cancelGriphicCollection"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="sentenceFooter">
        <div class="commentSection">
          <ObserveComponent :obj_id="griphicData.id" objType='放空图文' v-if="griphicData.id != null" ></ObserveComponent>
        </div>
      </div>
    </div>
    <!--        这部分要拆分成一个新的组件-->
    <div class="rightContent">
      <SentencePageDetailDisplayPageRighSideBar :user_id="griphicData.authorId" v-if="griphicData.id != null"></SentencePageDetailDisplayPageRighSideBar>
    </div>
  </el-main>
  <!--  </el-container>-->
</template>
<script>
import SentencePageDetailDisplayPageRighSideBar from '@/components/前端组件/RightSideBar/PageDetailDisplayPageRightSideBar'
import axios from "axios";
import ObserveComponent from "@/components/前端组件/评论组件/ObserveComponent";
import {ElMessage} from "element-plus";
export default {
  name: 'GriphicPageDetailPageDisplay.vue',
  components: {
    SentencePageDetailDisplayPageRighSideBar,
    ObserveComponent
  },
  data() {
    return {
      griphicData: {},
      isLike: false,
      isCollect: false
    }
  },
  methods: {
    getGriphicData() {
      axios.get('getGriphicById?grophicId=' + this.$route.query.id).then(response => {
        this.griphicData = response.data;
        this.hasAlreadLike();
        this.hasAlreadCollect();
        // console.log(response.data);
      })
    },
    saveDiaryStar() {
      // console.log(this.diary.id)
      axios.post('/saveObjStar' , {
        objId: this.griphicData.id,
        objType: '放空图文'
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
        objId: this.griphicData.id,
        objType: '放空图文'
      }).then(response => {
        this.isLike = false;
        ElMessage({
          type: "success",
          message: response.data
        })
      })
    },
    saveGriphicCollection() {
      // console.log(this.diary.id)
      axios.post('/saveObjCollection' , {
        objId: this.griphicData.id,
        objType: '放空图文'
      }).then(response => {
        this.isCollect = true;
        // console.log(response)
        ElMessage({
          type: "success",
          message: response.data
        })
      })
    },
    cancelGriphicCollection() {
      axios.post('/cancelObjCollection', {
        objId: this.griphicData.id,
        objType: '放空图文'
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
        axios.get('/hasAlreadLike?objId=' + this.griphicData.id + '&objType=放空图文').then(response => {
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
        axios.get('/hasAlreadCollect?objId=' + this.griphicData.id + '&objType=放空图文').then(response => {
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
    this.getGriphicData();
  }
}
</script>
<style scoped>

.el-container {
  margin: 0;
  padding: 0;
  padding-left: 130px;
  padding-right: 130px;
  /*padding-bottom: 130px;*/
  /*background: red;*/
}


.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  padding: 0;
  margin: 0;
  width: 100%;
  /*height: 100%;*/
  padding-left: 130px;
  padding-right: 130px;
  /*background: green;*/
  padding-bottom: 40px;
  /*margin-bottom: 40px;*/
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
/*  width: 60%;*/
  /*height: 100%;*/
  /*min-height: 300px;*/
  /*background: red;*/

  /*margin-bottom: 100px;*/
  /*padding-bottom: 40px;*/
  /*margin-bottom: 40px;*/
}

.sentenceContentSingle {
  width: 100%;
  height: auto;
  /*background: #B3C0F1;*/
  margin-top: 30px;
  border-radius: 10px;
  /*margin-bottom: 40px;*/
  /*padding-bottom: 40px;*/
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
  background-color: #ceefe4;
  /*background: yellow;*/

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
  width: 600px;
  height: auto;
  margin-top: 40px;
  margin-bottom: 40px;
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
  word-break:break-all;
  background-color: #d9d9f3;
  /*padding-left: ;*/
}
.sentenceType {
  margin-left: 25px;
  margin-right: 25px;
}
.sentenceTypeHeader {
  width: 100%;
  min-height: 30px;
  /*background: greenyellow;*/
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
.grid-content {
  display: flex;
  align-items: center;
  justify-content: center;
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
  /*background: aqua;*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  padding: 0;
  background-color: #F8F4E3;
  margin-top: 10px;
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
  width: 100%;
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
.commentSection ::v-deep(.el-container) {
  padding: 0;
}
.commentSection ::v-deep(.el-input__inner)  {
  height: 40px;
  background: none;
  border: none;
}
.fontSection {
  margin-top: 30px;
}

</style>
