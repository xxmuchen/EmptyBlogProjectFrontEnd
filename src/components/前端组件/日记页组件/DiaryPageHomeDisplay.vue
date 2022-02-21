<template>
  <el-container>
<!--    <el-header>-->

<!--    </el-header>-->
    <el-main>
<!--      轮播图-->
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
              <el-tag class="newDiaryMore">更多 >></el-tag>
            </div>
            <div class="newDiaryContent" v-for="item in newDiaryDisplayThreePieces" :key="item.id">
              <el-row :gutter="20">
                <el-col :span="6" :offset="1"><div class="grid-content bg-purple">{{ item.title }}</div></el-col>
                <el-col :span="3" :offset="13"><div class="grid-content bg-purple">{{ item.authorId }}</div></el-col>
              </el-row>
            </div>
        </div>
<!--      推荐日记-->
      <div class="newDiary">
        <div class="newDiaryTitle">
          推荐日记
        </div>
        <div>
          <el-tag class="newDiaryMore">更多 >></el-tag>
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
          <div class="recommendDiaryTitle">
            『黄土白骨』我守你百岁无忧。
          </div>
          <div class="recommendDiaryPickSentence">
            我要你知道,在这个世界上总有一个人是等着你的,
            不管在什么时候,不管在什么地方,
            反正你知道,总有这么个人。
          </div>
        </div>

      </div>
<!--      顶客排行-->
      <div class="newDiary">
        <div class="newDiaryTitle">
            顶客排行
        </div>
        <div>
          <el-tag class="newDiaryMore">更多 >></el-tag>
        </div>
        <div class="newDiaryContent">
          <el-row :gutter="20">
            <el-col :span="6" :offset="1"><div class="grid-content bg-purple">123</div></el-col>
            <el-col :span="3" :offset="13"><div class="grid-content bg-purple">作者</div></el-col>
          </el-row>
        </div>

<!--        顶客排行-->
        <div class="newDiaryContent">
          <el-row :gutter="20">
            <el-col :span="6" :offset="1"><div class="grid-content bg-purple">123</div></el-col>
            <el-col :span="3" :offset="13"><div class="grid-content bg-purple">作者</div></el-col>
          </el-row>
        </div>
        <!--          <div class="newDiaryContent">-->
        <el-row :gutter="20">
          <el-col :span="6" :offset="1"><div class="grid-content bg-purple">123</div></el-col>
          <el-col :span="3" :offset="13"><div class="grid-content bg-purple">作者</div></el-col>
        </el-row>
        <!--          </div>-->

      </div>
    </el-main>
  </el-container>
</template>
<script>
  import axios from "axios";

  export default {
    name: '',
    data() {
      return {
        url: 'https://img0.baidu.com/it/u=2639026559,1072757904&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=500',
        newDiaryDisplayThreePieces: []
      }
    },
    methods: {
      /*获取最新的三条日记*/
      diaryHomePageNewDiaryDisplayThreePieces() {
        axios.get('http://localhost:8081/api/diaryHomePageNewDiaryDisplayThreePieces').then(response => {
          this.newDiaryDisplayThreePieces = response.data
          console.log(response.data)
        })
      }
    },
    mounted() {
      this.diaryHomePageNewDiaryDisplayThreePieces()
    }
  }
</script>
<style scoped>
  .el-container {
    background: #99a9bf;
    padding-left: 100px;
    padding-right: 100px;
  }
  .el-header, .el-footer {
    background-color: #C4D1F1;
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
    background-color: #99a9bf;
    width: 100%;
    height: 100%;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    width: 100%;
    height: 100%;
  }


  .el-main {
    background-color: #EBEEF3;
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
    /*padding: 10px 0;*/
    background-color: #f9fafc;
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
    width: 50%;
    height: auto;
    background: red;
    margin-top: 30px;
    /*clear: both;*/
    /*float: right;*/
  }
  .recommendDiaryPickSentence{
    width: 50%;
    height: auto;
    background: red;
    text-indent: 2em;
    margin-top: 50px;
    /*clear: both;*/
    /*float: right;*/
  }
</style>