<template>
  <el-container>
    <el-header height="auto">
      <el-row :gutter="20">
        <el-col :span="3" :offset="1">
          <TopLogo></TopLogo>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:'SentencePageHomeDisplay'}" active-class="active">
              句子首页
            </router-link>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:'SentencePageDetailDisplay' , query:{type: '偶遇佳句'}}" active-class="active">
              偶遇佳句
            </router-link>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:'SentencePageHomeDisplay' , query: {type: '名人名言'}}" active-class="active">
              名人名言
            </router-link>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:'SentencePageHomeDisplay' , query: {type: '精选句集'}}" active-class="active">
              精选句集
            </router-link>
          </div>
        </el-col>
        <!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        <!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
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
import TopLogo from "@/components/前端组件/logo组件/TopLogo";
import UserLoginAvatarAndNameDisplay from "@/components/前端组件/用户登录信息组件/UserLoginAvatarAndNameDisplay";
import SearchBlogComponemt from "@/components/前端组件/搜索组件/SearchBlogComponemt";
export default {
  name: 'SentencePageHomeDisplay',
  components: {UserLoginAvatarAndNameDisplay, TopLogo , SearchBlogComponemt},
  data() {
    return {
      url: 'https://s4.ax1x.com/2022/02/11/HUfWjA.png'
    }
  }
}
</script>
<style scoped>
.el-header, .el-footer {
  /*background-color: #B3C0D1;*/
  /*color: #333;*/
  text-align: center;
  line-height: 40px;
  height: auto;
  background-color: #f4f0e6;
  font-family: 华文行楷;
  font-size: 20px;
}
.el-footer {
  color: lightslategray;
}
.el-main {
  /*background-color: #E9EEF3;*/
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 160px;*/
  background-color: #f4f0e6;
  padding: 0;
  margin: 0;
  /*height: 100%;*/
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
.el-row {
  /*margin-bottom: 20px;*/
  padding-top: 20px;

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