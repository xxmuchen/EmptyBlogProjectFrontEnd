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
  components: {AdminPageAsideDisplay, AdminPageHeadDisplay},
}
</script>
<style scoped>
  .el-header {
    background: red;
  }
  .el-main {
    /*background: #4F8EFF;*/
  }
  .el-aside {
    background: yellow;
  }
</style>