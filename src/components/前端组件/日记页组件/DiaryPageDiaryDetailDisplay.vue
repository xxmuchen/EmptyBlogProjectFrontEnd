<template>
  <el-container>
    <el-main>
      <div  :style="BgColor">
        <div class="headInfo">
          <div class="diaryTitle">
            {{ diary.title }}
          </div>
          <div class="diaryProperties">
            <div class="diaryPropertie">
              <el-tag  size="default">作者：{{ diary.authorName }}</el-tag>
            </div>
            <div class="diaryPropertie">
              <el-tag  size="small" >天气：{{ diary.weather }}</el-tag>
            </div>
            <div class="diaryPropertie">
              <el-tag  size="small" >心情：{{ diary.mood }}</el-tag>
            </div>
          </div>
        </div>
        <div class="mainInfo">
          <div class="diaryContent" v-html="diary.content">

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
      </div>
<!--      评论区-->
      <el-divider></el-divider>
      <div>
        <ObserveComponent :obj_id="diary.id" v-if="diary.id != null"></ObserveComponent>
      </div>
    </el-main>
  </el-container>

</template>
<script>
  import axios from "axios";
  import {ElMessage} from "element-plus";
  import ObserveComponent from "@/components/前端组件/评论组件/ObserveComponent"

  export default {
    name: 'DiaryPageDiaryDetailDisplay.vue',
    components: {
      ObserveComponent
    },
    data() {
      return {
        diary: {},
        BgColor: {},
        isLike: false,
        isCollect: false
      }
    },
    methods: {
      getDiaryByDiaryId(diary_id) {
        if (typeof this.diaryId !== undefined) {
          axios.get('/getDiaryByDiaryId?diaryId='+diary_id).then(response => {
            this.diary = response.data
            this.hasAlreadLike(diary_id)
            this.hasAlreadCollect(diary_id)
            console.log(this.diary)
            this.BgColor = { background: this.diary.bgColor}
            // console.log(this.BgColor)
          })
        }
      },
      saveDiaryStar() {
        // console.log(this.diary.id)
        axios.post('/saveDiaryStar' , {
          diaryId: this.diary.id
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
        axios.post('/cancelDiaryStar', {
          diaryId: this.diary.id
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
        axios.post('/saveDiaryCollection' , {
          diaryId: this.diary.id
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
        axios.post('/cancelDiaryCollection', {
          diaryId: this.diary.id
        }).then(response => {
          this.isCollect = false;
          ElMessage({
            type: "success",
            message: response.data
          })
        })

      },
      hasAlreadLike(diary_id){
        // console.log(this.diary.id)
        let eleToken = localStorage.getItem('eleToken')
        if (eleToken !== null) {
          axios.get('/hasAlreadLike?diaryId=' + diary_id).then(response => {
            if (response.data === 'like') {
              this.isLike = true;
            }else {
              this.isLike = false;
            }
          })
        }
      },
      hasAlreadCollect(diary_id){
        // console.log(this.diary.id)
        let eleToken = localStorage.getItem('eleToken')
        if (eleToken !== null) {
          axios.get('/hasAlreadCollect?diaryId=' + diary_id).then(response => {
            if (response.data === 'collect') {
              this.isCollect = true;
            }else {
              this.isCollect = false;
            }
          })
        }
      }

    },
    // 获取日记数据
    mounted() {
      this.getDiaryByDiaryId(this.$route.query.diaryId)
    }
  }
</script>
<style scoped>
  .el-container {
    background: #99a9bf;
    /*padding-left: 100px;*/
    /*padding-right: 100px;*/
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
    margin: 0;
    width: 100%;
    /*height: 100%;*/
    padding-left: 100px;
    padding-right: 100px;
    /*text-align: center;*/
    /*line-height: 160px;*/

    padding-bottom: 40px;
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

  .headInfo {
    width: 100%;
    height: 100px;
    background: gray;
    padding: 0;
    margin: 0;
    /*padding-top: 30px;*/
    /*display: table-cell;*/
    /*vertical-align: middle;*/
    /*margin-top: 30px;*/
  }
  .diaryTitle {
    height: auto;
    width: 100%;
    /*background: green;*/
    display: flex;
    /*margin-top: 30px;*/
    justify-content:center;
    align-items:center;
    padding-top: 30px;
    /*margin-top: 10px;*/
  }
  .diaryProperties {
    width: 100%;
    height: auto;
    display: flex;
    /*margin-top: 30px;*/
    justify-content:center;
    align-items:center;
    /*padding-left: 30px;*/
    margin-top: 10px;
  }
  .diaryPropertie {
    width: auto;
    height: auto;
    /*float: left;*/
    margin-right: 30px;
  }
  .mainInfo {
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
    /*background: green;*/
    /*padding-left: 10px;*/
    /*margin-left: 10px;*/
  }
  .diaryContent {
    padding: 0;
    margin: 0;
    width: 93%;
    height: auto;
    /*background: yellow;*/
    /*padding-left: 40px;*/
    /*padding-right: 30px;*/
    word-wrap:break-word;
    margin-left: 3.3%;
  }

  .userOperation {
    width: 93%;
    height: auto;
    display:flex;
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

</style>