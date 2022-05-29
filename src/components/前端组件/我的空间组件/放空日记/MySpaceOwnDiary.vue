<template>
  <el-row :gutter="20">
    <el-col :span="4" :offset="1"><div class="grid-content bg-purple" @click="switchingAuditStatus('所有日记')">所有日记</div></el-col>
    <el-col :span="4" :offset="2"><div class="grid-content bg-purple" @click="switchingAuditStatus('审批通过的日记')">审批通过的日记</div></el-col>
    <el-col :span="4" :offset="2"><div class="grid-content bg-purple" @click="switchingAuditStatus('待审批的日记')">待审批的日记</div></el-col>
    <el-col :span="4" :offset="2"><div class="grid-content bg-purple" @click="switchingAuditStatus('审批不通过的日记')">审批不通过的日记</div></el-col>
  </el-row>
      <div class="tableContent">
        <el-table
            :data="tableData"
            :row-key="tableData.id"
            style="width: 100%"
            :show-header="true"
            :row-style="{height: '70px',background: '#f3e8d6'}"

            :lazy="true"
        >
          <el-table-column
              prop="title"
              label="日记名称"
              width="500">
          </el-table-column>
          <el-table-column
              prop="state"
              label="审批状态"
              width="200">
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
              >删除</el-button
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
  name: 'MySpaceOwnDiary',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageCount: 0,
      state: '所有日记'
    }
  },
  methods: {
    /*选择对应的状态赋值*/
    switchingAuditStatus(state){
      console.log(state)
      this.state = state;
      this.justToStatusByState(1)
    },
    /*通过选择的状态跳转*/
    justToStatusByState(currentIndex) {
      if (this.state === '所有日记') {
        this.getUserSpaceDiaryOrderCreateTime(currentIndex)
      }else if (this.state === '审批通过的日记') {
        this.getUserSpaceDiaryStateSuccessOrderCreateTime(currentIndex)
      }else if (this.state === '待审批的日记') {
        this.getUserSpaceDiaryStateWaitOrderCreateTime(currentIndex)
      }else if (this.state === '审批不通过的日记') {
        this.getUserSpaceDiaryStateFailOrderCreateTime(currentIndex)
      }else {
        this.getUserSpaceDiaryOrderCreateTime(currentIndex)
      }
    },

    handleView(index , row) {
      this.$router.push({name: 'DiaryPageDiaryDetailDisplay' , query:{diaryId: row.id}});
    },
    currentChange(currentIndex){
      this.justToStatusByState(currentIndex)
    },
    // justToDiaryDetail(row) {
    //   // console.log(row.id);
    //   this.$router.push({name: 'DiaryPageDiaryDetailDisplay' , query:{diaryId: row.id}});
    // },
    getUserSpaceDiaryOrderCreateTime(currentIndex) {
      axios.get('/getUserSpaceDiaryOrderCreateTime?currentIndex=' + currentIndex)
          .then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
      })
    },
    getUserSpaceDiaryStateSuccessOrderCreateTime(currentIndex) {
      axios.get('/getUserSpaceDiaryStateSuccessOrderCreateTime?currentIndex=' + currentIndex).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        // console.log(this.tableData[0].authorId)
      })
    },
    getUserSpaceDiaryStateWaitOrderCreateTime(currentIndex) {
      axios.get('/getUserSpaceDiaryStateWaitOrderCreateTime?currentIndex=' + currentIndex).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        // console.log(this.tableData[0].authorId)
      })
    },
    getUserSpaceDiaryStateFailOrderCreateTime(currentIndex) {
      axios.get('/getUserSpaceDiaryStateFailOrderCreateTime?currentIndex=' + currentIndex).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        // console.log(this.tableData[0].authorId)
      })
    },
    handleDelete(index , row) {
      console.log(index , row)
      axios.delete('delUserSpaceDiaryByDiaryId?diaryId=' + row.id).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        this.currentPage = 1
        ElMessage.success('删除成功')
        this.justToStatusByState(1)
      })
      // axios.put()
    }
  },
  mounted() {

    this.getUserSpaceDiaryOrderCreateTime(this.currentPage);

  }
}
</script>
<style scoped>
.el-row {
  /*margin-bottom: 20px;*/
  /*padding-top: 20px;*/
  margin-top: 20px;
  margin-bottom: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;

}
.bg-purple-dark {
  /*background: #99a9bf;*/
  background-color: #d9d9f3;
}
.bg-purple {
  /*background: #d3dce6;*/
  background-color: #d9d9f3;
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
  background-color: #d9d9f3;
}
.grid-content {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.tableContent {
  margin-top: 10px;
}
.paging {
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: center;
  justify-content: center;
}
</style>