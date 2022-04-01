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
      <div class="cancellation" @click="logOut"><i class="iconfont icon-zhuxiao"></i></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: 'AdminPageHeadDisplay',
  data(){
    return {
      adminData: {}
    }
  },
  methods: {
    // getAdminOwnInfo() {
    //   axios.post('/getAdminOwnInfo').then(response => {
    //     this.adminData = response.data
    //   })
    // },

    getAvatorAndUserName() {
      let eleToken = localStorage.getItem('eleToken')
      if (eleToken !== null) {
        axios.post('/getAdminOwnInfo').then(response => {
          this.adminData = response.data
        }).catch(() => {

        })
      }
    },
    logOut() {
      ElMessageBox.confirm(
          '请问您确定要退出登录吗？',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        localStorage.removeItem('eleToken');
        ElMessage({
          type: 'success',
          message: '退出登录成功',
        })
        this.$router.push({name: 'AdminLogin'})
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '退出登录取消',
        })
      })
    },

  },
  mounted() {
    this.getAvatorAndUserName()
    // this.getUserPermissionByUserId()
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