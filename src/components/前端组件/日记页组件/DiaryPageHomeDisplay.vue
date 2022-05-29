<template>
<!--  <el-container>-->
<!--    <el-header>-->

<!--    </el-header>-->
<!--    <el-main>-->
<!--      轮播图-->
  <div class="mainContent">
      <el-carousel :interval="5000" arrow="always" height="240px">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="demo-image">
            <div class="block">
              <el-image
                  style="width: 100%; height: 100%"
                  :src="url"
                  fit="cover"></el-image>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
<!--      最新日记-->
        <div class="newDiary">
            <div class="newDiaryTitle">
              最新日记
            </div>
            <div>
              <router-link :to="{name:'DiaryPageDiaryDisplay' , query:{diaryType: '最新日记'}}"><el-tag class="newDiaryMore">更多 >></el-tag></router-link>
            </div>
            <div class="newDiaryContent" v-for="item in newDiaryDisplayThreePieces" :key="item.id">

                <el-row :gutter="20">

                    <el-col :span="6" :offset="1"><div class="grid-content bg-purple diaryTitle"><router-link :to="{name: 'DiaryPageDiaryDetailDisplay' , query:{diaryId: item.id}}">{{ item.title }}</router-link></div></el-col>
                    <el-col :span="3" :offset="14"><div class="grid-content bg-purple"><router-link :to="{name: 'DiaryPageDiaryDetailDisplay' , query:{diaryId: item.id}}">{{ item.authorName }}</router-link></div></el-col>
                </el-row>
            </div>
        </div>
<!--      推荐日记-->
      <div class="newDiary">
        <div class="newDiaryTitle">
          推荐日记
        </div>
        <div>
          <router-link :to="{name:'DiaryPageDiaryDisplay' , query:{diaryType: '推荐日记'}}"><el-tag class="newDiaryMore">更多 >></el-tag></router-link>
        </div>

        <div class="recommendDiaryImage">
          <div class="block">
            <el-image
                style="width: 230px; height: 230px"
                :src="url"
                fit="cover"></el-image>
          </div>
        </div>
        <div class="recommendDiaryContent">
          <router-link :to="{name: 'DiaryPageDiaryDetailDisplay'  , query:{diaryId: recommendedDiaryDisplay.id}}">
            <div class="recommendDiaryTitle">
              {{ recommendedDiaryDisplay.title }}
            </div>
          </router-link>
          <div class="recommendDiaryPickSentence">
            <span v-html="recommendedDiaryDisplay.content"></span>
          </div>
        </div>

      </div>
<!--      顶客排行-->
      <div class="newDiary">
        <div class="newDiaryTitle">
            顶客排行
        </div>
        <div>
          <router-link :to="{name:'DiaryPageDiaryDisplay' , query:{diaryType: '顶客排行'}}"><el-tag class="newDiaryMore">更多 >></el-tag></router-link>
        </div>
        <div class="newDiaryContent" v-for="item in topGuestDiaryDisplay" :key="item.id">
          <router-link :to="{name: 'DiaryPageDiaryDetailDisplay' , query:{diaryId: item.id}}">
            <el-row :gutter="20">
              <el-col :span="6" :offset="1"><div class="grid-content bg-purple diaryTitle">{{ item.title }}</div></el-col>
              <el-col :span="3" :offset="14"><div class="grid-content bg-purple">{{ item.authorName }}</div></el-col>
            </el-row>
          </router-link>
        </div>

        <!--          </div>-->

      </div>
  </div>
<!--    </el-main>-->
<!--  </el-container>-->
</template>
<script>
  import axios from "axios";

  export default {
    name: '',
    data() {
      return {
        url: 'https://img0.baidu.com/it/u=2639026559,1072757904&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=500',
        newDiaryDisplayThreePieces: [],
        recommendedDiaryDisplay: {},
        topGuestDiaryDisplay:[]
      }
    },
    methods: {
      /*获取最新的三条日记*/
      getDiaryHomePageNewDiaryDisplayThreePieces() {
        axios.get('/diaryHomePageNewDiaryDisplayFourPieces').then(response => {
          this.newDiaryDisplayThreePieces = response.data
          console.log(response.data)
        })
      },
      getDiaryHomePageRecommendDiaryDisplayOnePieces() {
        axios.get('/diaryHomePageRecommendDiaryDisplayOnePieces').then(response => {
          this.recommendedDiaryDisplay = response.data
          console.log(response.data)
        })
      },
      getDiaryHomePageTopGuestDiaryDisplayFourPieces() {
        axios.get('/diaryHomePageTopGuestDiaryDisplayFourPieces').then(response => {
          this.topGuestDiaryDisplay = response.data
          console.log(response.data)
        })
      }
    },
    mounted() {
      this.getDiaryHomePageNewDiaryDisplayThreePieces()
      this.getDiaryHomePageRecommendDiaryDisplayOnePieces()
      this.getDiaryHomePageTopGuestDiaryDisplayFourPieces()
    }
  }
</script>
<style scoped>
.mainContent {
  padding-left: 200px;
  padding-right: 200px;
  margin-top: 20px;
  font-family: 华文楷体;
  font-size: 18px;
}
  .el-container {
    /*background: #99a9bf;*/
    padding-left: 100px;
    padding-right: 100px;
  }
  .el-header, .el-footer {
    /*background-color: #C4D1F1;*/
    color: #333;
    padding: 0;
    margin: 0;
    height: 240px;

    padding-left: 70px;
    padding-right: 70px;

    /*text-align: center;*/
    /*line-height: 60px;*/
  }



  .el-carousel__item:nth-child(2n) {
    /*background-color: #99a9bf;*/
    width: 100%;
    height: 100%;
  }

  .el-carousel__item:nth-child(2n+1) {
    /*background-color: #d3dce6;*/
    width: 100%;
    height: 100%;
  }


  .el-main {
    /*background-color: #EBEEF3;*/
    color: #333;
    padding: 0;
    margin: 0;
    padding-bottom: 40px;
    /*text-align: center;*/
    /*line-height: 160px;*/
  }

  .el-main > .el-container {
    /*margin-bottom: 40px;*/
    /*padding-top: 10px;*/
    /*padding-bottom: 40px;*/
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    /*line-height: 260px;*/
  }

  .el-container:nth-child(7) .el-aside {
    /*line-height: 320px;*/
  }
  .newDiary {
    width: 100%;
    height: 320px;
    /*background: green;*/
  }
  .newDiaryTitle {
    width: 80px;
    height: 50px;
    /*background: red;*/
    float: left;
    display:flex;/*实现垂直居中*/
    align-items:center;/*实现水平居中*/
    justify-content:center;
    text-align:justify;
    border-bottom: 2px solid purple;
    margin-top: 10px;
    margin-left: 50px;
  }
  .newDiaryMore {
    float: right;
    margin-right: 50px;
    margin-top: 35px;
    margin-bottom: 20px;
  }
  .el-tag {
    background: none;
    border: none;
  }

  .newDiaryContent{
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
  }
  .el-row {
    width: 100%;
    height: auto;
    /*padding: 0;*/
    margin: 0;
    /*margin-right: 0px;*/
    clear:both;
    padding-top: 20px;
    /*padding-left: 10px;*/
  }
  .el-col {
    border-radius: 4px;
    line-height: 35px;
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
    /*padding: 10px 0;*/
    /*background-color: #f9fafc;*/
  }

  .demo-image {
    clear: both;
    float: left;
    /*width: 180px;*/
    /*height: 180px;*/
    /*margin-left: 300px;*/
  }
  .recommendDiaryImage {
    clear: both;
    float: left;
    margin-left: 80px;
  }
  .recommendDiaryContent {
      /*clear: both;*/
    width: 50%;
    height: auto;
    float: right;
    margin-right: 80px;
  }
  .recommendDiaryTitle {
    width: 70%;
    height: auto;
    /*background: red;*/
    margin-top: 30px;
    margin-left: 120px;
    /*clear: both;*/
    /*float: right;*/
  }
  .recommendDiaryPickSentence{
    width: 80%;
    height: 145px;
    /*background: red;*/
    text-indent: 2em;
    /*margin-top: 50px;*/


    display: -webkit-box;
    -webkit-box-orient: vertical; /* 表示盒子对象的子元素的排列方式 */
    -webkit-line-clamp: 5; /* 限制文本的行数，表示文本第多少行省略 */
    text-overflow: ellipsis;/*  打点展示 */
    overflow: hidden;/*超出部分进行隐藏*/
    /*clear: both;*/
    /*float: right;*/
  }
  .diaryTitle {
    width: 350px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }
</style>