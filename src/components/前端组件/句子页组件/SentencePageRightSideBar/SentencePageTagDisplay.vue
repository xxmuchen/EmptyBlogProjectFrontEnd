<template>
  <div class="sentencePageTagContain">
    <div class="sentencePageTag">
      <el-row :gutter="20" v-for="(items , index) in sentenceTagList" :key="index">
        <el-col :span="6" v-for="item in items" :key="item.id" ><div class="grid-content bg-purple" v-text="item.tagName"></div></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import axios from "axios";

  export default {
    name: 'SentencePageTagDisplay',
    data() {
      return {
        sentenceTagList: []
      }
    },
    methods: {
      getAllTagsStateSuccess() {
        axios.get('/getAllTagsStateSuccess').then(response => {
          // this.sentenceTagList = response.data;
          // console.log(this.sentenceTagList)
          const tags = [];
          let sentenceTags = response.data
          sentenceTags.forEach((item , index) => {
            const tag = Math.floor(index / 4);
            if (!tags[tag]) {
              tags[tag] = []
            }
            tags[tag].push(item)
          })
          this.sentenceTagList = tags
        })
      }
    },
    mounted() {
      this.getAllTagsStateSuccess()
    }
  }
</script>
<style scoped>
  .sentencePageTagContain {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-items: center;
    justify-content: center;
  }
  .sentencePageTag {
    width: 60%;
    height: 100%;
    background: red;
  }
  /*.firstRow {*/
  /*  margin-top: 30px;*/
  /*}*/
  .el-row {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
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
  .el-col div {
    display: flex;
    align-items: center;
    align-content: center;
    justify-items: center;
    justify-content: center;
  }
</style>