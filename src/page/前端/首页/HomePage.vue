<template>
  <el-container>
    <el-header height="auto">
      <el-row :gutter="20" style="font-size: 21px;font-family: 华文行楷">
        <el-col :span="3">
         <TopLogo></TopLogo>
        </el-col>
        <el-col :span="3" v-for="item in homePageData" :key="item.id">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:item.url.slice(1)}" active-class="active">{{ item.type }}</router-link>
          </div>
        </el-col>
        <!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        <!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="1"><div class="grid-content bg-purple"><SearchBlogComponemt></SearchBlogComponemt></div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple"><UserLoginAvatarAndNameDisplay></UserLoginAvatarAndNameDisplay></div></el-col>
      </el-row>


    </el-header>
    <el-main>

        <router-view></router-view>

    </el-main>
    <el-footer>Copyright 2020-2025 © 放空blog all rights reserved</el-footer>
  </el-container>
</template>

<script>
import axios from 'axios'
import UserLoginAvatarAndNameDisplay from "@/components/前端组件/用户登录信息组件/UserLoginAvatarAndNameDisplay";
import TopLogo from "@/components/前端组件/logo组件/TopLogo"
import SearchBlogComponemt from "@/components/前端组件/搜索组件/SearchBlogComponemt";
export default {
  name: 'HomePage',
  components: {
    TopLogo,
    UserLoginAvatarAndNameDisplay,
    SearchBlogComponemt
  },
  data() {
    return {
      homePageData: {}
    }
  },
  mounted() {
    axios.get('/index').then(response => {
      // if(strtoupper($_SERVER['REQUEST_METHOD'])== 'OPTIONS'){ // 遇到options直接返回
      //   exit;
      // }
      this.homePageData = response.data
      // console.log(response.data)
    })
  }
}
</script>

<style scoped>
.el-header, .el-footer {

  height: auto;
  background-color: #f4f0e6;
  text-align: center;
}
.el-footer {
  color: lightslategray;
}
.el-main {
  /*background-color: #E9EEF3;*/
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 160px;*/
  padding: 0;
  background-color: #f4f0e6;
  /*height: 100%;*/
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-row {
  padding: 0;
  margin: 0;
  /*margin-bottom: 20px;*/
  padding-top: 15px;
  /*margin-left: 0px;*/
}
.el-col {
  /*height: 30px;*/
  /*width: auto;*/
  height: auto;
  width: auto;
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
</style>