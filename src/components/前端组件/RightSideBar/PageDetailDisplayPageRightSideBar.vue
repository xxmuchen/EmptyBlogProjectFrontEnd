<template>
  <div class="authorInformation">
    <div class="sentenceAuthorInformationHeader">
      <i class="iconfont icon-fuzhushuxian"></i>作者
    </div>
    <div class="authorInformationContent">
        <div class="avatarAndInfo">
          <div class="demo-basic--circle">
            <div class="block"><el-avatar size="large" :src="userBlogInfo.userAvatar"></el-avatar></div>
          </div>
          <div class="userName">
            {{ userBlogInfo.userName }}
            <div class="IndividualitySignature">
              {{ userBlogInfo.userSynopsis }}
            </div>
          </div>

        </div>
        <div class="workInfomation">
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">
              日记<br>{{ userBlogInfo.userDiaryCount }}
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">句子<br>{{ userBlogInfo.userSentenceCount }}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">Vlog<br>{{ userBlogInfo.userVlogCount }}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">图文<br>{{ userBlogInfo.userGriphicCount }}</div></el-col>
          </el-row>
        </div>
    </div>
  </div>
</template>
<script>
    import axios from "axios";

    export default {
      name: 'PageDetailDisplayPageRightSideBar',
      props:['user_id'],
      data() {
        return {
          // circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          userBlogInfo: {}
        }
      },
      methods: {
        getUserInfoByUserId() {
          axios.get('/getUserBlogInfoByUserId?userId=' + this.user_id).then(response => {
              this.userBlogInfo = response.data
          })
        }
      },
      mounted() {
        // console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww" + this.user_id)
        this.getUserInfoByUserId()
      }
    }
</script>
<style scoped>
.authorInformation {
  margin-left: 25px;
  margin-right: 25px;
  /*background-color: #d9d9f3;*/
}
.sentenceAuthorInformationHeader {
  width: 100%;
  min-height: 30px;
  /*background: greenyellow;*/
  display: flex;
  align-items: center;
  /*justify-content: center;*/
}
.authorInformationContent {
  width: 100%;
  height: auto;
  /*background: #B3C0F1;*/
  margin-top: 20px;
  margin-bottom: 20px;
}
.avatarAndInfo {
  display: flex;
  align-items: center;
  /*justify-content: center;*/
}
.userName {
  margin-left: 20px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.IndividualitySignature {
  margin-top: 10px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.workInfomation {
  width: 100%;
  height: auto;
  margin-top: 20px;
  text-align: center;
  line-height: 40px;
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
}
.el-row {
  margin-bottom: 20px;

}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  /*background: #99a9bf;*/
}
.bg-purple {
  /*background: #d3dce6;*/
}
.bg-purple-light {
  /*background: #e5e9f2;*/
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