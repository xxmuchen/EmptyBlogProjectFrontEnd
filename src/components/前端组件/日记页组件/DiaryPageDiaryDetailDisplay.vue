<template>
  <el-container>
    <el-main>
      <div class="headInfo">
        <div class="diaryTitle">
          黄土枯骨，我守你百岁无忧
        </div>
        <div class="diaryProperties">
          <div class="diaryPropertie">
            <el-tag  size="medium">作者： 王程翔</el-tag>
          </div>
          <div class="diaryPropertie">
            <el-tag  size="small" >标签一</el-tag>
          </div>
        </div>
      </div>
      <div class="mainInfo">
          <div class="diaryContent">
            2017-03-01 05:35  夜，微风
            关山雪冷，今夜偏入故人梦。

            2017-03-05 22:47  夜，有月
            佛曰：一切恩爱会，无常难得久。生世多畏惧，命危于晨露，由爱故生忧，由爱故生怖，若离于爱者，无忧亦无怖。

            2017-03-07 23:17  夜，有云
            这个圈子里，还是只有我和她。
            00:21
            因为我知道你不会不要我啊

            2017-03-13 23:49  夜，多云
            那并不能成为我堕落的理由，说别人的同时，不要毁灭自己。

            我只是个疯子，骗得了别人，却永远骗不了自己。

            江湖路远，且行且珍惜。
            我也向往过另外一种生活，我知道，我真的知道。

            2017-03-15 21:56  夜，阴
            我又想你啦，远方的妳还好嘛~
            丫头，距离约定之期越来越近啦，初时之誓未敢或忘，妳可曾为我驻足？

            2017-03-19 23:12  夜，微风
            我小心翼翼的有走在那个世界的边缘，收集着每一个可以让我感到动心的瞬间。

            2017-03-20 20:37 夜，阴
            很喜欢宫崎骏说过一句话:“你住的城市 下雨了,很想问你有没有带伞.可是我忍住了,因为我怕你说没带,而我又无能为力,就像是我爱你,却给不到你想要的陪伴.”可有人却说过一句话:“我们在的城市下雨了,很想问你有没有带伞,可是我忍住了,因为我怕你说没带,我说我给你送伞吧,你说不用,我跑着回去就行了.就像是我爱你,你却不需要我的陪伴.

            2017-03-21 00:57 夜，细雨
            切，懂那么多道理还不是过不好这一生
            你以前老是让我做个好人，结果现在真的变成好人了，就是老是被人欺负没有人问候
            只能想你。
            你在那边还好嘛，你在的地方还会不会下雪？
            今天的天气很好，是你喜欢的天气呢~
            不知道你在的地方天气是否也如我这般是你喜欢的天气呢

            2017-03-22 01:04 夜，细雨
            又想起以前在一起看书的日子啦￼
            背靠着背坐着，
            你不言我不语，
            静静的淡淡的，
            很好…

            2017-03-23 20:51 夜，细雨
            呵，故事里再也不会有人会告诉我雨是没有颜色的哩~

            2017-03-24 00:14 夜，细雨
            好天气依然呢嘞，想你就出去走走，结果走到半路突然想起上一次陪你看雨已经快十年了哩，感觉就好像就在昨天并未过去多久，风吹过时仿佛依然有你的发丝飘过脸颊…

            不知道你在那边下雨时还会不会出去走走，有没有人给你撑伞，在妳调皮的走出伞下踩的水花四处飞溅时是否还有人摇着头很无奈的讲小心着凉，回来后宠溺的替你吹干长发~

            丫头，小心着凉呢~
            我知道，是的我知道，没有人啦，毕竟你在的地方不是人呆的地方
            哈哈哈，开个玩笑
            最后，讲真，好想妳

            2017-03-24 00:26 夜，细雨
            夜雨凉，萱花赏，赠君一曲诗诀别。 人还在，伞依然，唯妳不见。

            2017-03-26 13:58  午，晴好
            归根结底还是那句话，人生若只如初见，不再相见，那便会或怀念或美好或抵触或仇恨一直至死
          </div>
          <div class="userOperation">
              <div class="operation">
                  点赞(使用图标)
              </div>
              <div class="operation">
                收藏(使用图标)
              </div>
          </div>
      </div>
<!--      评论区-->
      <el-divider></el-divider>

    </el-main>
  </el-container>

</template>
<script>
  export default {
    name: 'DiaryPageDiaryDetailDisplay.vue'
  }
</script>
<style scoped>
  .el-container {
    background: #99a9bf;
    padding-left: 100px;
    padding-right: 100px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
    margin: 0;
    width: 100%;
    /*height: 100%;*/
    padding-left: 100px;
    padding-right: 100px;
    /*text-align: center;*/
    /*line-height: 160px;*/

    padding-bottom: 40px;
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

  .headInfo {
    width: 100%;
    height: 100px;
    background: red;
    padding: 0;
    margin: 0;
    /*padding-top: 30px;*/
    /*display: table-cell;*/
    /*vertical-align: middle;*/
    /*margin-top: 30px;*/
  }
  .diaryTitle {
    height: auto;
    width: 100%;
    background: green;
    display: flex;
    /*margin-top: 30px;*/
    justify-content:center;
    align-items:center;
    padding-top: 30px;
    /*margin-top: 10px;*/
  }
  .diaryProperties {
    width: 100%;
    height: auto;
    display: flex;
    /*margin-top: 30px;*/
    justify-content:center;
    align-items:center;
    /*padding-left: 30px;*/
    margin-top: 10px;
  }
  .diaryPropertie {
    width: auto;
    height: auto;
    /*float: left;*/
    margin-right: 30px;
  }
  .mainInfo {
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
    background: green;
    /*padding-left: 10px;*/
    /*margin-left: 10px;*/
  }
  .diaryContent {
    padding: 0;
    margin: 0;
    width: 93%;
    height: auto;
    background: yellow;
    /*padding-left: 40px;*/
    /*padding-right: 30px;*/
    word-wrap:break-word;
    margin-left: 3.3%;
  }

  .userOperation {
    width: 93%;
    height: auto;
    display:flex;
    /*justify-content:center;*/
    /*align-items:center;*/
    margin-top: 30px;
    margin-left: 3.3%;
    /*padding-left: 10px;*/
  }
  .operation {
    width: 50px;
    height: 50px;
    background: red;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius: 100px;
    margin-left: 10px;
    /*margin-right: -1.8;*/
    /*margin-right: 10px;*/
    /*margin-right: 100px;*/
  }

</style>