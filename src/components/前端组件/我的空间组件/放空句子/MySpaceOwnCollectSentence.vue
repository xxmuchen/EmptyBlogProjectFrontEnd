<template>
      <div>
        <el-table
            :data="tableData"
            :row-key="tableData.id"
            style="width: 100%"
            :show-header="true"
            :row-style="{height: '70px',background: '#f3e8d6'}"
            :lazy="true"
        >
          <el-table-column
              label="句子内容"
              width="700">
            <template #default="scope">
              <div v-html="scope.row.content"></div>
            </template>
          </el-table-column>
          <!--        <el-divider></el-divider>-->
          <el-table-column
              prop="authorName"
              label="作者"
              width="180">
          </el-table-column>
          <el-table-column
              prop="updateTime"
              label="发布时间">
          </el-table-column>
          <el-table-column label="Operations">
            <template #default="scope">
              <el-button size="default" @click="handleView(scope.$index, scope.row)"
              >查看</el-button>
              <el-button
                  size="default"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >取消收藏</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <div class="block">
          <!--          <span class="demonstration">大于 7 页时的效果</span>-->
          <el-pagination
              layout="prev, pager, next"
              :page-count="pageCount"
              v-model:current-page="currentPage"
              @current-change="currentChange"
          >
          </el-pagination>
        </div>
      </div>
</template>
<script>
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: 'MySpaceOwnCollectDiary',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageCount: 0
    }
  },
  methods: {
    handleView(index , row) {
      // console.log(index , row)
      this.$router.push({name: 'SentencePageDetailDisplay' , query:{sentenceId: row.id}});
    },
    currentChange(currentIndex){
      // console.log(currentIndex)
      this.getUserSpaceSentenceUserCollectionOrderByCreateTime(currentIndex)
    },
    // justToDiaryDetail(row) {
    //   // console.log(row.id);
    //   this.$router.push({name: 'DiaryPageDiaryDetailDisplay' , query:{diaryId: row.id}});
    // },
    getUserSpaceSentenceUserCollectionOrderByCreateTime(currentIndex) {
      axios.get('/getUserSpaceSentenceUserCollectionOrderByCreateTime?currentIndex=' + currentIndex).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        // console.log(this.tableData[0].authorId)
      })
    },
    handleDelete(index , row) {
      console.log(index , row)
      axios.post('/cancelObjCollection' , {
        objId: row.id,
        objType: '放空句子'
      }).then(response => {
        ElMessage({
          type: "success",
          message: response.data
        })
        this.getUserSpaceSentenceUserCollectionOrderByCreateTime(1);
        this.currentPage = 1;
      })
    }
  },
  mounted() {
    this.getUserSpaceSentenceUserCollectionOrderByCreateTime(this.currentPage);
  }
}
</script>
<style scoped>
.el-scrollbar{
  height: 500px;
}
.paging {
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: center;
  justify-content: center;
}
</style>