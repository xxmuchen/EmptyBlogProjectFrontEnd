<template>
  <div>
    <div v-show="!isShow">
      <router-link :to="{name: 'UserLoginPage'}">登录/注册</router-link>
    </div>
    <div v-show="isShow" class="demo-basic">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
        </div>
      </div>
      <div class="userName">{{ userName }}</div>
    </div>
  </div>

</template>
<script>
  import axios from "axios";

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
</style>