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
      <el-row :gutter="20" v-for="(items , index) in tagList" :key="index">
        <el-col :span="6" v-for="item in items" :key="item.id" ><div class="hiddenOverflow grid-content bg-purple" v-text="item.tagName"></div></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import axios from "axios";

  export default {
    name: 'SentencePageHomePageRightSideBar',
    data() {
      return {
        tagList: []
      }
    },
    methods: {
      getNineTags() {
        axios.get("/getNineTags").then(response => {
          const tags = [];
          let sentenceTags = response.data
          sentenceTags.forEach((item , index) => {
            const tag = Math.floor(index / 4);
            if (!tags[tag]) {
              tags[tag] = []
            }
            tags[tag].push(item)
          })
          this.tagList = tags
          // console.log(this.tagList)
        })
      }
    },
    mounted() {
      this.getNineTags()
    }
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
.el-row {
  /*width: 100%;*/
  padding: 0;
}
.el-col {
  width: 100%;
}
.grid-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hiddenOverflow {
  width: 100%;
  overflow: hidden;
  /*text-overflow:ellipsis;*/
  white-space: nowrap;
}
</style>