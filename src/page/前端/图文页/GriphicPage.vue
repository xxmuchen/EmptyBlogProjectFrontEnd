<template>
  <el-container>
    <el-header height="auto">
      <el-row :gutter="20">
        <el-col :span="3" :offset="1">
          <TopLogo></TopLogo>
        </el-col>
        <el-col :span="3">
          <div class="grid-content"><!--{{ item.type }}-->
            <router-link :to="{name:'GriphicPageHomePageDisplay'}" active-class="active">
              图文首页
            </router-link>
          </div>
        </el-col>
        <!-- 通过请求不同的后端网址和路径上的不同参数,返回相同的前端页面  -->
        <el-col :span="3">
          <div class="grid-content"><!--{{ item.type }}-->
            <router-link :to="{name:'GriphicPageHomePageDisplay' , query:{type: '美图美句'}}" active-class="active">
              美图美句
            </router-link>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content"><!--{{ item.type }}-->
            <router-link :to="{name:'GriphicPageHomePageDisplay' , query:{type: '手写美句'}}" active-class="active">
              手写美句
            </router-link>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content"><!--{{ item.type }}-->
            <router-link :to="{name:'GriphicPageHomePageDisplay' , query:{type: '经典对白'}}" active-class="active">
              经典对白
            </router-link>
          </div>
        </el-col>
        <!--        <el-col :span="6"><div class="grid-content"></div></el-col>-->
        <!--        <el-col :span="6"><div class="grid-content"></div></el-col>-->
        <el-col :span="3"><div class="grid-content"></div></el-col>
        <el-col :span="1"><div class="grid-content"><SearchBlogComponemt></SearchBlogComponemt></div></el-col>
        <el-col :span="3"><div class="grid-content"><UserLoginAvatarAndNameDisplay></UserLoginAvatarAndNameDisplay></div></el-col>
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
import UserLoginAvatarAndNameDisplay from "@/components/前端组件/用户登录信息组件/UserLoginAvatarAndNameDisplay"
import SearchBlogComponemt from "@/components/前端组件/搜索组件/SearchBlogComponemt";
export default {
  name: 'GriphicPage',
  components: {TopLogo , UserLoginAvatarAndNameDisplay , SearchBlogComponemt},
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
  margin: 0;
  background-color: #f4f0e6;
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
&:last-child {
   margin-bottom: 0;
 }
}

.el-col {
  /*height: 30px;*/
  /*width: auto;*/
  height: auto;
  width: auto;
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
  /*background-color: #f9fafc;*/
}
</style>