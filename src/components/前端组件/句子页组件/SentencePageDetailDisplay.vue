<template>
  <!--  <el-container>-->
  <el-main>
    <div class="leftContent">
      <div class="sentenceContentSingle">
<!--        <div class="sentenceTop">-->
<!--          <div class="demo-basic&#45;&#45;circle">-->
<!--            <div class="block"><el-avatar :size="large" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar></div>-->
<!--            &lt;!&ndash;                  <div class="block" v-for="size in sizeList" :key="size">&ndash;&gt;-->
<!--            &lt;!&ndash;                    <el-avatar :size="size" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar>&ndash;&gt;-->
<!--            &lt;!&ndash;                  </div>&ndash;&gt;-->
<!--          </div>-->
<!--          <div class="userName">wcx</div>-->
<!--        </div>-->
        <div class="sentenceMain">
          <div class="sentenceContent">
            <div class="sentenceContentBox">
              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。
              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。
              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。
              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。
              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。
              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。
              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。
            </div>
          </div>
          <div class="sentenceContentAuthor">dc</div>
          <div class="sentenceContentUserOperation">
            <div>喜欢</div>
            <div>收藏</div>
          </div>
        </div>
        <div class="sentenceFooter">
          <div class="commentSection">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
<!--      评论区-->
    </div>
    <!--        这部分要拆分成一个新的组件-->
    <div class="rightContent">
      <SentencePageDetailDisplayPageRighSideBar></SentencePageDetailDisplayPageRighSideBar>
    </div>
  </el-main>
  <!--  </el-container>-->
</template>
<script>
import SentencePageDetailDisplayPageRighSideBar from '@/components/前端组件/RightSideBar/SentencePageDetailDisplayPageRighSideBar'
export default {
  name: 'SentencePageDetailDisplay',
  components: {
      SentencePageDetailDisplayPageRighSideBar
  }
}
</script>
<style scoped>

.el-container {
  margin: 0;
  padding: 0;
  padding-left: 130px;
  padding-right: 130px;
  background: red;
}


.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 0;
  margin: 0;
  width: 100%;
  /*height: 100%;*/
  padding-left: 130px;
  padding-right: 130px;
  background: green;
  padding-bottom: 40px;

  display: flex;
  /*text-align: center;*/
  /*line-height: 160px;*/
}

body > .el-container {
  /*margin-bottom: 40px;*/
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  /*line-height: 260px;*/
}

.el-container:nth-child(7) .el-aside {
  /*line-height: 320px;*/
}
.leftContent {
  /*width: 60%;*/
  /*height: auto;*/
  background: gray;
}

.sentenceContentSingle {
  width: 100%;
  height: auto;
  background: #B3C0F1;
  margin-top: 30px;
  border-radius: 10px;
}
.sentenceTop {
  width: 100%;
  height: 50px;
  /*background: #4F8EFF;*/
  border-bottom: 1px solid lightgray;
}
.demo-basic--circle {
  width: 70px;
  height: 100%;
  /*background: gold;*/
  /*display: flex;*/
  float: left;

  /*display: flex;*/
  /*align-content: center;*/
  /*justify-content: center;*/
}
.block {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.userName {
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
}
.sentenceMain {
  width: 100%;
  min-height: 280px;
  height: auto;
}
.sentenceContent {
  width: 100%;
  min-height: 140px;
  height: auto;
  display: flex;
}
.sentenceContentBox {
  width: 500px;
  height: auto;
  margin-top: 80px;
  margin-bottom: 80px;
  margin-left: 100px;
  margin-right: 100px;
}
.sentenceContentAuthor {
  width: 100%;
  text-align: right;
  margin-left: -180px;

}
.sentenceContentUserOperation {
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  /*margin-left: 10px;*/
  /*padding-left: 10px;*/
  /*background: red;*/
  /*justify-content:center;*/
  border-bottom: 1px solid lightgray;
}
.sentenceContentUserOperation > div {
  width: 50px;
  height: auto;
  margin-left: 20px;
}
.sentenceFooter {
  width: 100%;
  height: 50px;
  background: aqua;
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}
.commentSection {
  width: 98%;
  height: 100%;
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  /*display: flex;*/
  /*align-items:center;!*实现水平居中*!*/
  /*justify-content:right;*/
  /*text-align: center;*/
}
/*.el-input {*/

/*    !*height: 300px;*!*/
/*!*  height: 100%;*!*/
/*!*  width: 100%;*!*/
/*}*/

/*.el-textarea .el-textarea__inner{ */
/*resize: none;*/
/*}*/

/*  height: 100px;*/
/*}*/
.commentSection ::v-deep(.el-input__inner)  {
  height: 40px;
  background: none;
  border: none;
}

.rightContent {
  width: 25%;
  height: auto;
  /*float: left;*/
  background: red;
  margin-top: 30px;
  border-radius: 10px;
  margin-left: 50px;
  position: fixed;
  /*top: 30px;*/
  left: 60%;
  word-break:break-all;
  /*padding-left: ;*/
}
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
