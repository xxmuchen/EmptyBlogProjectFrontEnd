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
          <span>用户信息</span>
        </template>
        <router-link :to="{name: 'UserLoginAndRegistInfoVisualizationDisplay'}"><el-menu-item index="6-1-1">注册登录可视化</el-menu-item></router-link>
        <router-link :to="{name: 'UserLocationInfoVisualizationDisplay'}"><el-menu-item index="6-1-1">用户位置可视化</el-menu-item></router-link>
      </el-sub-menu>

      <router-link :to="{name: ''}"><el-menu-item index="6-2">用户注册可视化</el-menu-item></router-link>
      <router-link :to="{name: ''}"><el-menu-item index="6-3">日记可视化</el-menu-item></router-link>
      <router-link :to="{name: ''}"><el-menu-item index="6-4">句子可视化</el-menu-item></router-link>
      <router-link :to="{name: ''}"><el-menu-item index="6-5">Vlog可视化</el-menu-item></router-link>
      <router-link :to="{name: ''}"><el-menu-item index="6-6">图文可视化</el-menu-item></router-link>
      <!--      <el-menu-item index="5-2">图文信息可视化展示</el-menu-item>-->
    </el-sub-menu>
  </el-menu>
</template>
<script>
export default {
  name: 'AdminPageAsideDisplay',
  components: {}
}
</script>
<style scoped>
  .el-menu {
    width: 100%;
    height: 100%;
  }
</style>