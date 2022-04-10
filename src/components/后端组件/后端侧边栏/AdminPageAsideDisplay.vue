<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><i class="iconfont icon-yonghu"></i></el-icon>
        <span>用户管理</span>
      </template>
      <router-link :to="{name: 'UserInfoManage'}"><el-menu-item index="1-1">用户信息管理</el-menu-item></router-link>
<!--      <el-menu-item index="1-2">信息可视化展示</el-menu-item>-->
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><i class="iconfont icon-rijiben"></i></el-icon>
        <span>日记管理</span>
      </template>
      <router-link :to="{name: 'DiaryInfoManage'}"><el-menu-item index="2-1">日记信息管理</el-menu-item></router-link>
<!--      <el-menu-item index="2-2">日记信息可视化展示</el-menu-item>-->
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><i class="iconfont icon-juzi"></i></el-icon>
        <span>句子管理</span>
      </template>
      <router-link :to="{name: 'SentenceInfoManage'}"><el-menu-item index="3-1">句子信息管理</el-menu-item></router-link>
<!--      <el-menu-item index="3-2">句子信息可视化展示</el-menu-item>-->
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><i class="iconfont icon-video"></i></el-icon>
        <span>Vlog管理</span>
      </template>
      <router-link :to="{name: 'VlogInfoManage'}"><el-menu-item index="4-1">Vlog信息管理</el-menu-item></router-link>
<!--      <el-menu-item index="4-2">Vlog信息可视化展示</el-menu-item>-->
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon><i class="iconfont icon-31tuwenxiangqing"></i></el-icon>
        <span>图文管理</span>
      </template>
      <router-link :to="{name: 'GriphicInfoManage'}"><el-menu-item index="5-1">图文信息管理</el-menu-item></router-link>
<!--      <el-menu-item index="5-2">图文信息可视化展示</el-menu-item>-->
    </el-sub-menu>
    <el-sub-menu index="6">
      <template #title>
        <el-icon><i class="iconfont icon-31tuwenxiangqing"></i></el-icon>
        <span>可视化管理</span>
      </template>
      <el-sub-menu index="6-1">
        <template #title>
<!--          <el-icon><i class="iconfont icon-31tuwenxiangqing"></i></el-icon>-->
          <span>用户数据可视化</span>
        </template>
        <router-link :to="{name: 'UserLoginAndRegistInfoVisualizationDisplay'}"><el-menu-item index="6-1-1">注册登录可视化</el-menu-item></router-link>
        <router-link :to="{name: 'UserLocationInfoVisualizationDisplay'}"><el-menu-item index="6-1-1">用户位置可视化</el-menu-item></router-link>
      </el-sub-menu>

      <el-sub-menu index="6-2">
        <template #title>
          <!--          <el-icon><i class="iconfont icon-31tuwenxiangqing"></i></el-icon>-->
          <span>博客数据可视化</span>
        </template>
        <router-link :to="{name: 'BlogWriteInfoVisualizationDisplay'}"><el-menu-item index="6-2-1">博客撰写</el-menu-item></router-link>
        <router-link :to="{name: 'BlogObserveInfoVisualizationDisplay'}"><el-menu-item index="6-2-2">博客评论</el-menu-item></router-link>
        <router-link :to="{name: 'BlogStarInfoVisualizationDisplay'}"><el-menu-item index="6-2-3">博客点赞</el-menu-item></router-link>
        <router-link :to="{name: 'BlogCollectInfoVisualizationDisplay'}"><el-menu-item index="6-2-4">博客收藏</el-menu-item></router-link>
      </el-sub-menu>
<!--      <el-sub-menu index="6-3">-->
<!--        <template #title>-->
<!--          &lt;!&ndash;          <el-icon><i class="iconfont icon-31tuwenxiangqing"></i></el-icon>&ndash;&gt;-->
<!--          <span>放空句子</span>-->
<!--        </template>-->
<!--        <router-link :to="{name: 'SentenceWriteInfoVisualizationDisplay'}"><el-menu-item index="6-3-1">句子撰写</el-menu-item></router-link>-->
<!--        <router-link :to="{name: 'SentenceObserveInfoVisualizationDisplay'}"><el-menu-item index="6-3-1">用户评论</el-menu-item></router-link>-->
<!--        <router-link :to="{name: 'SentenceStarAndCollectInfoVisualizationDisplay'}"><el-menu-item index="6-3-1">用户点赞、收藏</el-menu-item></router-link>-->
<!--      </el-sub-menu>-->
<!--      <el-sub-menu index="6-4">-->
<!--        <template #title>-->
<!--          &lt;!&ndash;          <el-icon><i class="iconfont icon-31tuwenxiangqing"></i></el-icon>&ndash;&gt;-->
<!--          <span>放空Vlog</span>-->
<!--        </template>-->
<!--        <router-link :to="{name: 'VlogWriteInfoVisualizationDisplay'}"><el-menu-item index="6-4-1">Vlog上传</el-menu-item></router-link>-->
<!--        <router-link :to="{name: 'VlogObserveInfoVisualizationDisplay'}"><el-menu-item index="6-4-1">用户评论</el-menu-item></router-link>-->
<!--        <router-link :to="{name: 'VlogStarAndCollectInfoVisualizationDisplay'}"><el-menu-item index="6-4-1">用户点赞、收藏</el-menu-item></router-link>-->
<!--      </el-sub-menu>-->
<!--      <el-sub-menu index="6-5">-->
<!--        <template #title>-->
<!--          <span>放空图文</span>-->
<!--        </template>-->
<!--        <router-link :to="{name: 'GriphicWriteInfoVisualizationDisplay'}"><el-menu-item index="6-5-1">图文撰写</el-menu-item></router-link>-->
<!--        <router-link :to="{name: 'GriphicObserveInfoVisualizationDisplay'}"><el-menu-item index="6-5-1">用户评论</el-menu-item></router-link>-->
<!--        <router-link :to="{name: 'GriphicStarAndCollectInfoVisualizationDisplay'}"><el-menu-item index="6-5-1">用户点赞、收藏</el-menu-item></router-link>-->
<!--      </el-sub-menu>-->
<!--      <router-link :to="{name: ''}"><el-menu-item index="6-2">用户注册可视化</el-menu-item></router-link>-->
<!--      <router-link :to="{name: ''}"><el-menu-item index="6-2">日记可视化</el-menu-item></router-link>-->
<!--      <router-link :to="{name: ''}"><el-menu-item index="6-3">句子可视化</el-menu-item></router-link>-->
<!--      <router-link :to="{name: ''}"><el-menu-item index="6-4">Vlog可视化</el-menu-item></router-link>-->
<!--      <router-link :to="{name: ''}"><el-menu-item index="6-5">图文可视化</el-menu-item></router-link>-->
      <!--      <el-menu-item index="5-2">图文信息可视化展示</el-menu-item>-->
    </el-sub-menu>
    <el-sub-menu index="7" v-if="adminPermission > 0">
      <template #title>
        <el-icon><i class="iconfont icon-31tuwenxiangqing"></i></el-icon>
        <span>管理员管理</span>
      </template>
        <router-link :to="{name: 'ManagerInfoManage'}"><el-menu-item index="7-1-1">管理员信息</el-menu-item></router-link>
        <router-link :to="{name: 'SuperManagerInfoManage'}" v-if="adminPermission > 1"><el-menu-item index="7-1-2">超级管理员信息</el-menu-item></router-link>
    </el-sub-menu>
    <el-sub-menu index="8" v-if="adminPermission > 0">
      <template #title>
        <el-icon><i class="iconfont icon-31tuwenxiangqing"></i></el-icon>
        <span>公告管理</span>
      </template>
      <router-link :to="{name: 'AdminNoticeManage'}"><el-menu-item index="8-1-1">公告管理</el-menu-item></router-link>
    </el-sub-menu>
  </el-menu>
</template>
<script>
import axios from "axios";

export default {
  name: 'AdminPageAsideDisplay',
  components: {},
  data() {
    return {
      adminPermission: ''
    }
  },
  methods: {
    getUserPermissionByUserId() {
      // let token = localStorage.getItem("eleToken");
      axios.post("/getUserPermissionByUserId").then(response => {
        this.adminPermission = response.data.userPermission;
        console.log(this.adminPermission)
      })
    }
  },
  mounted() {
    this.getUserPermissionByUserId()
  }
}
</script>
<style scoped>
  .el-menu {
    width: 100%;
    height: 100%;
  }
</style>