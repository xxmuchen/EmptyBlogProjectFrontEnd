<template>
  <!--  <el-container>-->
  <el-main>
    <div class="leftContent">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'SentencePageHomeDisplay' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.name">{{ $route.params.name }}</el-breadcrumb-item>
        <!--            <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
        <!--            <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      </el-breadcrumb>
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li  class="infinite-list-item">
          <div class="sentenceContentSingle">
            <div class="sentenceTop">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar size="default" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar>
                </div>
                <!--                  <div class="block" v-for="size in sizeList" :key="size">-->
                <!--                    <el-avatar :size="size" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar>-->
                <!--                  </div>-->
              </div>
              <div class="userName">wcx</div>
            </div>
            <div class="sentenceMain">
              <div class="sentenceContent">
                <div class="sentenceContentBox">
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
        </li>
        <li  class="infinite-list-item">
          <div class="sentenceContentSingle">
            <div class="sentenceTop">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar size="default" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar>
                </div>
                <!--                  <div class="block" v-for="size in sizeList" :key="size">-->
                <!--                    <el-avatar :size="size" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar>-->
                <!--                  </div>-->
              </div>
              <div class="userName">wcx</div>
            </div>
            <div class="sentenceMain">
              <div class="sentenceContent">
                <div class="sentenceContentBox">
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
        </li>
        <li  class="infinite-list-item">
          <div class="sentenceContentSingle">
            <div class="sentenceTop">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar size="default" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar>
                </div>
                <!--                  <div class="block" v-for="size in sizeList" :key="size">-->
                <!--                    <el-avatar :size="size" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar>-->
                <!--                  </div>-->
              </div>
              <div class="userName">wcx</div>
            </div>
            <div class="sentenceMain">
              <div class="sentenceContent">
                <div class="sentenceContentBox">
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
        </li>
      </ul>

<!--      <div class="sentenceContentSingle">-->
<!--        <div class="sentenceTop">-->
<!--          <div class="demo-basic&#45;&#45;circle">-->
<!--            <div class="block">-->
<!--              <el-avatar :size="large" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar>-->
<!--            </div>-->
<!--            &lt;!&ndash;                  <div class="block" v-for="size in sizeList" :key="size">&ndash;&gt;-->
<!--            &lt;!&ndash;                    <el-avatar :size="size" src="https://file.mingyantong.com/weibopic/jxzlmu5.jpg"></el-avatar>&ndash;&gt;-->
<!--            &lt;!&ndash;                  </div>&ndash;&gt;-->
<!--          </div>-->
<!--          <div class="userName">wcx</div>-->
<!--        </div>-->
<!--        <div class="sentenceMain">-->
<!--          <div class="sentenceContent">-->
<!--            <div class="sentenceContentBox">-->
<!--              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。-->
<!--              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。-->
<!--              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。-->
<!--              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。-->
<!--              所谓的神秘，其实是无知的别名。 随着人增长学识，克服无知，培育文明积蓄力量。过去曾经被认为神秘存在的大多数，如今终被名为睿智的名刃斩杀、解体后制成样本封存于历史书之中。-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="sentenceContentAuthor">dc</div>-->
<!--          <div class="sentenceContentUserOperation">-->
<!--            <div>喜欢</div>-->
<!--            <div>收藏</div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="sentenceFooter">-->
<!--          <div class="commentSection">-->
<!--            <el-input v-model="input" placeholder="请输入内容"></el-input>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>


    <!--        这部分要拆分成一个新的组件-->
    <div class="rightContent">
      <RightSideBar></RightSideBar>
      <!--            <div class="sentenceType">-->
      <!--                <div class="sentenceTypeHeader">-->
      <!--                  <i class="iconfont icon-fuzhushuxian"></i>句子分类-->
      <!--                  <el-tag>更多 >></el-tag>-->
      <!--                </div>-->
      <!--                <div class="guessLike">-->
      <!--                  猜你喜欢-->
      <!--                </div>-->
      <!--                <div class="sentenceTypeContent">-->
      <!--                  <el-row :gutter="20">-->
      <!--                    <el-col :span="6"><div class="grid-content bg-purple">伤感</div></el-col>-->
      <!--                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
      <!--                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
      <!--                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
      <!--                  </el-row>-->
      <!--                </div>-->
      <!--            </div>-->
    </div>
  </el-main>
  <!--  </el-container>-->
</template>
<script>
import RightSideBar from '@/components/前端组件/句子页组件/SentencePageRightSideBar/SentencePageHomePageRightSideBar'

export default {
  name: 'SentencePageHomeDisplay',
  components: {
    RightSideBar
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
  width: 60%;
  height: 100%;
  background: gray;
}



.el-breadcrumb {
  /*margin-top: 30px;*/
  margin-left: 12px;
}

.infinite-list {
  /*height: 300px;*/
  /*height: 1000px;*/
  height: 60%;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  /*height: 50px;*/
  background: var(--el-color-primary-light-9);
  margin: 10px;
  /*margin-top: 25px;*/
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.sentenceContentSingle {
  width: 100%;
  height: auto;
  background: #B3C0F1;
  /*margin-top: 30px;*/
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
  /*margin-left: 10px;*/
  /*padding-left: 10px;*/
}

.sentenceMain {
  width: 100%;
  min-height: 280px;
  height: auto;
  /*background: yellow;*/

  /*padding-left: 30px;*/
}

.sentenceContent {
  width: 100%;
  min-height: 140px;
  height: auto;
  display: flex;
  /*padding-left: 30px;*/
  /*align-items: end;!*实现水平居中*!*/
  /*justify-content:center;*/
  /*text-align: end;*/
  /*background: greenyellow;*/
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
  /*min-height: 70px;*/
  text-align: right;
  /*padding-right: 30px;*/
  /*margin-right: -30px;*/
  margin-left: -180px;
  /*float: right;*/
  /*display: flex;*/
  /*align-items:center;!*实现水平居中*!*/
  /*justify-content:right;*/
  /*text-align: center;*/
  /*padding-left: 30px;*/
  /*margin-right: 30px;*/
  /*border-bottom: 1px solid lightgray;*/
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
.commentSection ::v-deep(.el-input__inner) {
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
  word-break: break-all;
  /*padding-left: ;*/
}

</style>
