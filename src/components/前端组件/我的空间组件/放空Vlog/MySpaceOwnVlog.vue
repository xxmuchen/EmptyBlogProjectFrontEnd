<template>
  <el-row :gutter="20">
    <el-col :span="4" :offset="1"><div class="grid-content bg-purple" @click="switchingAuditStatus('所有Vlog')">所有Vlog</div></el-col>
    <el-col :span="4" :offset="2"><div class="grid-content bg-purple" @click="switchingAuditStatus('审批通过的Vlog')">审批通过的Vlog</div></el-col>
    <el-col :span="4" :offset="2"><div class="grid-content bg-purple" @click="switchingAuditStatus('待审批的Vlog')">待审批的Vlog</div></el-col>
    <el-col :span="4" :offset="2"><div class="grid-content bg-purple" @click="switchingAuditStatus('审批不通过的Vlog')">审批不通过的Vlog</div></el-col>
    <!--    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>-->
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
          label="Vlog标题"
          width="500">
        <template #default="scope">
          <div v-html="scope.row.title"></div>
        </template>
      </el-table-column>
      <!--        <el-divider></el-divider>-->
      <el-table-column
          prop="state"
          label="状态"
          width="200">
      </el-table-column>
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
  name: 'MySpaceOwnVlog',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageCount: 0
    }
  },
  methods: {
    switchingAuditStatus(state){
      console.log(state)
      this.state = state;
      this.justToStatusByState(1)
    },
    /*通过选择的状态跳转*/
    justToStatusByState(currentIndex) {
      // console.log("debugger")
      if (this.state === '所有Vlog') {
        this.getUserSpaceVlogOrderCreateTime(currentIndex)
      }else if (this.state === '审批通过的Vlog') {
        this.getUserSpaceVlogStateSuccessOrderCreateTime(currentIndex)
      }else if (this.state === '待审批的Vlog') {
        this.getUserSpaceVlogStateWaitOrderCreateTime(currentIndex)
      }else if (this.state === '审批不通过的Vlog') {
        this.getUserSpaceVlogStateFailOrderCreateTime(currentIndex)
      }else {
        // console.log("debugger")
        this.getUserSpaceVlogOrderCreateTime(currentIndex)
      }
    },
    handleView(index , row) {
      // console.log(index , row)
      this.$router.push({name: 'VlogPageDetailDisplay' , query:{vlogId: row.id}});
    },
    currentChange(currentIndex){
      this.justToStatusByState(currentIndex)
      // this.getUserSpaceVlogOrderCreateTime(currentIndex)
    },
    // justToDiaryDetail(row) {
    //   // console.log(row.id);
    //   this.$router.push({name: 'DiaryPageDiaryDetailDisplay' , query:{diaryId: row.id}});
    // },
    getUserSpaceVlogOrderCreateTime(currentIndex) {

      axios.get('/getUserSpaceVlogOrderCreateTime?currentIndex=' + currentIndex).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        // console.log(this.tableData[0].authorId)
      })
    },
    getUserSpaceVlogStateSuccessOrderCreateTime(currentIndex) {
      axios.get('/getUserSpaceVlogStateSuccessOrderCreateTime?currentIndex=' + currentIndex).then(response => {
        this.tableData = []
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        // console.log(response.data.records)
      })
      // this.tableData = []
    },
    getUserSpaceVlogStateWaitOrderCreateTime(currentIndex) {
      axios.get('/getUserSpaceVlogStateWaitOrderCreateTime?currentIndex=' + currentIndex).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages

        // console.log(this.tableData[0].authorId)
      })
    },
    getUserSpaceVlogStateFailOrderCreateTime(currentIndex) {
      axios.get('/getUserSpaceVlogStateFailOrderCreateTime?currentIndex=' + currentIndex).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        // eslint-disable-next-line no-debugger
        // debugger
        // console.log(this.tableData[0].authorId)
      })
    },
    handleDelete(index , row) {
      console.log(index , row)
      axios.delete('delUserSpaceVlogByVlogId?vlogId=' + row.id).then(response => {
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
    // console.log("debugger")
    this.getUserSpaceVlogOrderCreateTime(this.currentPage);
  }
}
</script>
<style scoped>
.el-scrollbar{
  height: 500px;
}
.el-row {
  margin-bottom: 20px;

  /*display: flex;*/

}
.el-row:last-child {
  margin-bottom: 0;
}
.grid-content {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
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
}
.tableContent {
  margin-top: 10px;
}
.paging {
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: center;
  justify-content: center;
}
/*::v-deep(.el-scrollbar) {*/
/*  height: 450px;*/
/*}*/
</style>