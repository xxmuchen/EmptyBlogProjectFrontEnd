<template>
  <el-container>
    <el-container>
      <el-main>
        <el-carousel :interval="4000"  arrow="always" height="260px">
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
      <el-footer >
        <div class="homePageInfoExample" >
          <ul>
            <li style="font: 16px Medium" v-for="item in homePageInfoExample" :key="item.id">{{ item.content }}</li>
          </ul>
        </div>
      </el-footer>

    </el-container>
    <el-aside width="400px">
      <!--      <div class="setFloat">-->

      <div class="homePageInfoContent">
        <div style="font-size: 20px;font-family: 华文楷体" v-for="item in homePageInfoContent" :key="item.id">{{ item.content }}<br /></div>
      </div>
      <router-link :to="{name: 'GriphicPage'}"><div class="homePageInfoType">
        <div style="font-size: 30px;font-family: 华文行楷;">{{ homePageDisplayType }}<br /></div>
      </div></router-link>

      <!--      </div>-->
    </el-aside>
  </el-container>
</template>
<script>
import axios from "axios";

export default {
  name: 'HomePageGraphicDisplay',
  data() {
    return {
      homePageDisplay: {},
      homePageDisplayType:'',
      homePageInfoContent:{},
      homePageInfoMedia: [{}],
      homePageInfoExample: {},
    }
  },
  methods: {

  },
  mounted() {
    axios.get('/HomePageGraphicDisplay').then(response => {
      this.homePageDisplay = response.data
      this.homePageDisplayType = this.homePageDisplay.type
      this.homePageInfoContent = this.homePageDisplay.homePageInfoContent;
      this.homePageInfoMedia = this.homePageDisplay.homePageInfoMedia;
      this.homePageInfoExample = this.homePageDisplay.homePageInfoExample;
      this.$forceUpdate()
      // console.log(this.homePageInfoExample)
    })
  }
}
</script>
<style scoped>
.el-header, .el-footer {

  height: 230px;
  padding: 0;
  margin: 0;
}


.homePageInfoType {
  width: 20%;
  height: 100%;
  float: left;
  display:flex;
  align-items:center;

}
.homePageInfoType > div {
  /*margin-top: 170px;*/
  /*margin-left: 180px;*/
  margin-left: 20px;
  /*background: green;*/
  width: 10%;
  height: 120px;
  word-wrap: break-word;
  letter-spacing: 18px;
  /*padding-top: 10px;*/
  /*padding-left: 50px;*/
  /*background: green;*/
  /*padding: 5px;*/
  /*margin-right: 0;*/
  /*margin-left: 0;*/
}
.homePageInfoContent {
  /*background: yellow;*/
  width: 40%;
  height: 100%;
  float: left;

  display:flex;
  /*justify-content:center;*/
  align-items:center;
  /*background: green;*/
  /*padding-left: 160px;*/
  /*padding-top: 30px;*/
}
.homePageInfoContent > div {
  /*margin-top: 120px;*/
  margin-left: 42px;

  /*background: orange;*/
  width: 10%;
  height: auto;

  /*background: green;*/
  padding-top: 10px;
  float: left;
  word-wrap: break-word;
  letter-spacing: 18px;
  /*display: inline-block;*/
  /*text-align: justify;*/
  /*text-align-last: justify;*/
}

.el-main {
  /*background-color: #E9EEF3;*/
  /*color: #333;*/
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


/*.el-col {*/
/*  border-radius: 4px;*/
/*}*/
/*.bg-purple-dark {*/
/*  background: #99a9bf;*/
/*}*/
/*.bg-purple {*/
/*  background: #d3dce6;*/
/*}*/
/*.bg-purple-light {*/
/*  background: #e5e9f2;*/
/*}*/
/*.grid-content {*/
/*  border-radius: 4px;*/
/*  min-height: 36px;*/
/*}*/
/*.row-bg {*/
/*  padding: 10px 0;*/
/*  background-color: #f9fafc;*/
/*}*/

.homePageInfoExample {
  /*background: blue;*/
  width: 500px;
  height: auto;
  /*background: green;*/
  /*padding-left: 160px;*/
  /*padding-top: 70px;*/
  margin-left: 250px;
  /*margin-left: 350px;*/
  margin-top: 30px;
}
.homePageInfoExample > ul {
  /*background: purple;*/
  /*background: orange;*/
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
  text-indent:2em
}
li:before {
  /*content: "";*/
  width: 16px;
  height: 16px;
  display: inline-block;
  /*border-radius: 50%;*/
  background: #4F8EFF;
  vertical-align: middle;
  margin-right: 18px;
}
.el-carousel {
  padding-top: 10px;
  width: 600px;
  padding-left: 200px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  /*line-height: 200px;*/
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  /*background-color: #99a9bf;*/
}

.el-carousel__item:nth-child(2n+1) {
  /*background-color: #d3dce6;*/
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