<template>
  <el-container>
    <el-aside width="800px">
      <router-link :to="{
          name: 'DiaryPage'
        }"><div class="homePageInfoType">
        <div style="font: 20px Extra large">{{ homePageDisplayType }}<br /></div>
      </div></router-link>
      <div class="homePageInfoContent">
        <div style="font: 16px Medium" v-for="item in homePageInfoContent" :key="item.id">{{ item.content }}<br /></div>
      </div>
      <div class="homePageInfoExample">
        <ul>
          <li style="font: 16px Medium" v-for="item in homePageInfoExample" :key="item.id">{{ item.content }}</li>
        </ul>
      </div>
    </el-aside>
    <el-main>
      <el-carousel :interval="4000"  arrow="always" height="400px">
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
  // import DiaryPage from "@/page/前端/日记页/DiaryPage";

  export default {
    name: 'HomePageDiaryDisplay',
    data() {
      return {
        // DiaryPage: DiaryPage,
        homePageDisplay: {},
        homePageDisplayType:'',
        homePageInfoContent:{},
        homePageInfoMedia: {},
        homePageInfoExample: {},
      }
    },
    methods: {
      justToDiaryPage() {
        // let routeUrl = this.$router.resolve({
        //   path: "/DiaryPage",
        //   query: {id:96}
        // });
        // window.open(routeUrl.href, '_blank');
        // this.$router.push('/DiaryPage')
      }
    },
    mounted() {
      axios.get('http://localhost:8081/api/HomePageDiaryDisplay').then(response => {
        this.homePageDisplay = response.data
        this.homePageDisplayType = this.homePageDisplay.type
        this.homePageInfoContent = this.homePageDisplay.homePageInfoContent;
        this.homePageInfoMedia = this.homePageDisplay.homePageInfoMedia;
        this.homePageInfoExample = this.homePageDisplay.homePageInfoExample;

        // console.log(this.homePageInfoExample)
      })
    }
  }
</script>
<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /*text-align: center;*/
  /*  line-height: 200px;*/
  }

  .homePageInfoType {
    width: 150px;
    height: auto;
    background: red;
    margin-left: 160px;
    margin-top: 100px;
  }
  .homePageInfoType > div {
    background: green;
    width: 100%;
    height: auto;
    /*background: green;*/
    /*padding: 5px;*/
    /*margin-right: 0;*/
    /*margin-left: 0;*/
  }
  .homePageInfoContent {
    background: yellow;
    width: 500px;
    height: auto;
    /*background: green;*/
    margin-left: 160px;
    margin-top: 30px;
  }
  .homePageInfoContent > div {
    background: orange;
    width: 100%;
    height: auto;
    /*background: green;*/
    padding-top: 10px;
  }
  .homePageInfoExample {
    background: blue;
    width: 500px;
    height: auto;
    /*background: green;*/
    margin-left: 160px;
    margin-top: 70px;
  }
  .homePageInfoExample > ul {
    background: purple;
    background: orange;
    width: 100%;
    height: auto;
    padding-left: 0;
    /*padding-right: 3px;*/
    /*background: green;*/

  }
  .homePageInfoExample > ul > li {
    margin-top: 20px;
    /*list-style: square;*/
    list-style: none;
  }
  li:before {
    content: "";
    width: 16px;
    height: 16px;
    display: inline-block;
    /*border-radius: 50%;*/
    background: #4F8EFF;
    vertical-align: middle;
    margin-right: 18px;
  }


  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*padding: 0;*/
    /*margin: 0;*/
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