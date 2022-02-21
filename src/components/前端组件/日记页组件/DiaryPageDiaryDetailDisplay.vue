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
              <el-tag  size="small" >心情：{{ diary.weather }}</el-tag>
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
              <i class="iconfont icon-shoucang2" v-show="!isCollect"></i>
              <i class="iconfont icon-shoucang1" v-show="isCollect"></i>
            </div>
          </div>
        </div>
      </div>

<!--      评论区-->
      <el-divider></el-divider>

    </el-main>
  </el-container>

</template>
<script>
  import axios from "axios";

  export default {
    name: 'DiaryPageDiaryDetailDisplay.vue',
    data() {
      return {
        diary: {},
        BgColor: {},
        isLike: false,
        isCollect: false
      }
    },
    methods: {
      getDiaryByDiaryId(diaryId) {

        if (typeof this.diaryId !== undefined) {
          axios.get('http://localhost:8081/api/getDiaryByDiaryId' , {
            params: {
              diaryId
            }
          }).then(response => {
            console.log(response.data)
            this.diary = response.data
            // this.BgColor = { background: this.diary.bgColor}
            // console.log(this.BgColor)
          })
        }
      },
      saveDiaryStar() {
        this.isLike = true;
      },
      cancelDiaryStar() {
        this.isLike = false;
      }
    },
    // 获取日记数据
    mounted() {
      // console.log(this.$route.query.diaryId)
      // console.log(typeof this.$route.query.diaryId)
      this.getDiaryByDiaryId(this.$route.query.diaryId)
    }
  }
</script>
<style scoped>
  .el-container {
    background: #99a9bf;
    padding-left: 100px;
    padding-right: 100px;
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