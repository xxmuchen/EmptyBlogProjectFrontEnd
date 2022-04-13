<template>
  <div class="common-layout">
    <el-container>
      <el-header><AdminPageHeadDisplay></AdminPageHeadDisplay></el-header>
      <el-container>
        <el-aside width="200px"><AdminPageAsideDisplay></AdminPageAsideDisplay></el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AdminPageHeadDisplay from "@/components/后端组件/后端头部/AdminPageHeadDisplay";
import AdminPageAsideDisplay from "@/components/后端组件/后端侧边栏/AdminPageAsideDisplay";

export default {
  name: 'AdminPage',
  components: {AdminPageAsideDisplay, AdminPageHeadDisplay}
}
</script>
<style scoped>
  .el-header {
    /*background: red;*/
    background-color: #9dd3a8;
  }
  .el-main {
    /*background: #4F8EFF;*/
    background-color: #ceefe4;
  }
  .el-aside {
    /*background: yellow;*/
    background-color: #d9d9f3;
  }
</style>