<template>
  <div class="top">
    <div class="logo">
      <el-image src="http://localhost:8080/images/logo/logo.png" fit="fill"></el-image>
    </div>
    <div class="adminNameAndAvatar">
      <div class="adminAvatar">
        <el-avatar :src="adminData.avatar" :size="50"></el-avatar>
      </div>
      <div class="adminName">
        <div v-text="adminData.userName"></div>
      </div>
      <div class="cancellation"><i class="iconfont icon-zhuxiao"></i></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'AdminPageHeadDisplay',
  data(){
    return {
      adminData: {}
    }
  },
  methods: {
    getAdminOwnInfo() {
      axios.post('/getAdminOwnInfo').then(response => {
        this.adminData = response.data
      })
    }
  },
  mounted() {
    this.getAdminOwnInfo()
  }
}
</script>
<style scoped>
  .top {
    display: flex;
  }
  .logo {
    width: 150px;
    height: auto;
    margin-top: 8px;
  }
  .adminNameAndAvatar{
    display: flex;
    width: 200px;
    height: 100%;
    align-content: center;
    align-items: center;
    margin-top: 3px;
    /*background: blue;*/
    float: right;
    margin-left: 1150px;
  }
  .adminName {
    margin-left: 15px;
  }
  .cancellation {
    margin-left: 20px;
  }
</style>