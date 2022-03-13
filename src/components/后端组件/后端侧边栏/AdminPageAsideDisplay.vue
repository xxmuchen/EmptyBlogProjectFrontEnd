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
      <el-menu-item index="1-2">信息可视化展示</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><i class="iconfont icon-rijiben"></i></el-icon>
        <span>日记管理</span>
      </template>
      <el-menu-item index="2-1">日记信息管理</el-menu-item>
      <el-menu-item index="2-2">日记信息可视化展示</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><i class="iconfont icon-juzi"></i></el-icon>
        <span>句子管理</span>
      </template>
      <el-menu-item index="3-1">句子信息管理</el-menu-item>
      <el-menu-item index="3-2">句子信息可视化展示</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><i class="iconfont icon-video"></i></el-icon>
        <span>Vlog管理</span>
      </template>
      <el-menu-item index="4-1">Vlog信息管理</el-menu-item>
      <el-menu-item index="4-2">Vlog信息可视化展示</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon><i class="iconfont icon-31tuwenxiangqing"></i></el-icon>
        <span>图文管理</span>
      </template>
      <el-menu-item index="4-1">图文信息管理</el-menu-item>
      <el-menu-item index="4-2">图文信息可视化展示</el-menu-item>
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