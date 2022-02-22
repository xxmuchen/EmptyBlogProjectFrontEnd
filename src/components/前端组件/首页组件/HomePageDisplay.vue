<template>
  <el-container>
    <el-aside width="700px">
      <div class="homePageInfoContent">
        <div style="font: 20px Extra large" v-for="item in homePageInfoContent" :key="item.id">{{ item.content }}<br /></div>
      </div>
      <div class="homePageInfoExample">
        <div style="font: 16px Medium" v-for="item in homePageInfoExample" :key="item.id">{{ item.content }}<br /></div>
      </div>
    </el-aside>

    <el-main>
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in homePageInfoMedia" :key="item.id">
          <div class="demo-image">
            <div class="block">
              <el-image
                  style="width: 100%; height: 100%"
                  :src="item.content"
                  fit="cover"></el-image>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>
</template>

<script>

  import axios from "axios";

  export default {
    name: 'HomePageDisplay',
    data() {
      return {
        homePageDisplay: {},
        homePageInfoContent:{},
        homePageInfoMedia: {},
        homePageInfoExample: {},
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    },
    mounted() {
      axios.get('/HomePageDisplay').then(response => {
        this.homePageDisplay = response.data
        // console.log(response.data)
        this.homePageInfoContent = this.homePageDisplay.homePageInfoContent;
        this.homePageInfoMedia = this.homePageDisplay.homePageInfoMedia;
        this.homePageInfoExample = this.homePageDisplay.homePageInfoExample;

        // console.log(this.homePageInfoExample)
      })
      // let str = this.$route.params.homePageDisplayData;
      // let obj = JSON.parse(str);
      // console.log(obj);
    }
  }
</script>

<style scoped>




  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /*text-align: center;*/
    /*line-height: 200px;*/

  }
  .homePageInfoContent{
    width: 300px;
    height: auto;
    background: red;
    padding-left: 160px;
    padding-top: 120px;
  }
  .homePageInfoContent > div {
    width: 100%;
    height: auto;
    /*background: green;*/
    padding: 5px;
    margin-right: 0;
    margin-left: 0;
  }
  .homePageInfoExample {
    width: 500px;
    height: auto;
    /*background: green;*/
    padding-left: 160px;
    padding-top: 30px;
  }

  .homePageInfoExample > div {
    width: 100%;
    height: auto;
    /*background: green;*/
    padding: 10px;
    margin-right: 0;
    margin-left: 0;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*line-height: 160px;*/
  }

  .el-main > .el-container {
    /*margin-bottom: 40px;*/
    height: 100%;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    /*line-height: 260px;*/
  }

  .el-container:nth-child(7) .el-aside {
    /*line-height: 320px;*/
    /*height: 100%;*/
  }
  .el-row {
    /*margin-bottom: 20px;*/
  &:last-child {
     margin-bottom: 0;
   }
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

 .el-carousel {
   padding-top: 55px;
 }
 .el-carousel__item h3 {
   color: #475669;
   font-size: 14px;
   opacity: 0.75;
   /*line-height: 200px;*/
   margin: 0;
 }

 .el-carousel__item:nth-child(2n) {
   background-color: #99a9bf;
 }

 .el-carousel__item:nth-child(2n+1) {
   background-color: #d3dce6;
 }
 .demo-image {
   width: 100%;
   height: 100%;
 }
 .block {
   width: 100%;
   height: 100%;
 }
</style>