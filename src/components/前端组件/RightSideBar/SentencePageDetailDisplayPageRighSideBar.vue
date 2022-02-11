<template>
  <div class="authorInformation">
    <div class="sentenceAuthorInformationHeader">
      <i class="iconfont icon-fuzhushuxian"></i>作者
    </div>
    <div class="authorInformationContent">
        <div class="avatarAndInfo">
          <div class="demo-basic--circle">
            <div class="block"><el-avatar size="large" :src="circleUrl"></el-avatar></div>
          </div>
          <div class="userName">
            wcx
            <div class="IndividualitySignature">
              你是我独一无二的玫瑰cccccccccccccccc
            </div>
          </div>

        </div>
        <div class="workInfomation">
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">
              日记<br>3
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">句子<br>3</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">Vlog<br>3</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">图文<br>3</div></el-col>
          </el-row>
        </div>
    </div>
  </div>
</template>
<script>
    export default {
      name: 'SentencePageDetailDisplayPageRighSideBar'
    }
</script>
<style scoped>
.authorInformation {
  margin-left: 25px;
  margin-right: 25px;
}
.sentenceAuthorInformationHeader {
  width: 100%;
  min-height: 30px;
  background: greenyellow;
  display: flex;
  align-items: center;
  /*justify-content: center;*/
}
.authorInformationContent {
  width: 100%;
  height: auto;
  background: #B3C0F1;
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
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>