<template>
  <div class="sentenceType">
    <div class="sentenceTypeHeader">
      <i class="iconfont icon-fuzhushuxian"></i>句子分类
      <el-tag>更多 >></el-tag>
    </div>
    <div class="guessLike">
      猜你喜欢
    </div>
    <div class="sentenceTypeContent">
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple">伤感</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SentencePageHomePageRightSideBar'
  }
</script>
<style scoped>
.sentenceType {
  margin-left: 25px;
  margin-right: 25px;
}
.sentenceTypeHeader {
  width: 100%;
  min-height: 30px;
  background: greenyellow;
  display: flex;
  align-items: center;
  /*justify-content: center;*/
}
.el-tag {
  background: none;
  /*float: right;*/
  margin-left: 180px;
}
.guessLike{
  width: 100%;
  height: auto;
  margin-top: 20px;
  margin-bottom: 10px;
}
.sentenceTypeContent {
  width: 100%;
  height: auto;
  margin-top: 10px;
  margin-bottom: 20px;
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
.grid-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>