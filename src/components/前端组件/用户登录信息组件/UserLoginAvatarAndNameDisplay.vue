<template>

    <div>
      <div v-show="!isShow">
        <router-link :to="{name: 'UserLoginPage'}">登录/注册</router-link>
      </div>
      <div v-show="isShow" class="userInfo">
        <el-dropdown>
          <div  class="demo-basic">
            <div class="demo-basic--circle">
              <div class="block">
                <el-avatar :size="50" :src="circleUrl"></el-avatar>
              </div>
            </div>
            <div class="userName">{{ userName }}</div><el-icon class="el-icon--right"><arrow-down /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link :to="{name: 'MySpace'}"><el-dropdown-item>我的空间</el-dropdown-item></router-link>
              <router-link :to="{name: 'WriteDiary'}"><el-dropdown-item divided>写日记</el-dropdown-item></router-link>
              <router-link :to="{name: 'WriteSentence'}"><el-dropdown-item divided>写句子</el-dropdown-item></router-link>
              <router-link :to="{name: 'WriteVlog'}"><el-dropdown-item divided>上传Vlog</el-dropdown-item></router-link>
              <router-link :to="{name: 'WriteGriphic'}"><el-dropdown-item divided>上传图文</el-dropdown-item></router-link>
              <el-dropdown-item divided @click="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>

        </el-dropdown>
      </div>

    </div>
</template>
<script>
  import axios from "axios";
  import {ElMessage, ElMessageBox} from "element-plus";

  export default {
    name: 'UserLoginAvatarAndNameDisplay',
    data() {
      return {
        isShow: false,
        circleUrl: 'http://localhost:8080/images/UserAvatar/5a80caaa-c618-4646-b971-821090486b35284196389.jpg',
        userName: ''
      }
    },
    methods: {
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
              this.$router.go(0)
            }).catch(() => {
              ElMessage({
                type: 'info',
                message: '退出登录取消',
              })
            })
      },
      /*获取token，判断是否有 然后请求数据*/
      getAvatorAndUserName() {
       let eleToken = localStorage.getItem('eleToken')
        if (eleToken !== null) {
          axios.post('/getAvatarAndUserName').then(response => {
            // console.log(response)
            if (response.data.avatar !== ''){
              this.circleUrl = response.data.avatar
            }
            this.userName = response.data.userName
            this.isShow = true
          }).catch(() => {
            // eslint-disable-next-line no-debugger
            // debugger
            //   console.log(error)
              this.isShow = false;
          })
        }
      }
    },
    mounted() {
      this.getAvatorAndUserName();
    }
  }
</script>
<style scoped>
.demo-basic {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.demo-basic .sub-title {
  /*margin-bottom: 10px;*/
  display: flex;
  /*font-size: 14px;*/
  color: var(--el-text-color-secondary);
}
.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  /*display: flex;*/
  /*justify-content: space-between;*/
  /*align-items: center;*/
  /*margin-left: 15px;*/
}
.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--el-border-color-base);
}
.demo-basic .block {
  width: 50px;
  height: 50px;
  /*flex: 1;*/
}
.demo-basic .el-col:not(:last-child) {
  border-right: 1px solid var(--el-border-color-base);
}
.userName {
  margin-left: 10px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
/*.userInfo {*/
/*  width: 100%;*/
/*}*/

</style>