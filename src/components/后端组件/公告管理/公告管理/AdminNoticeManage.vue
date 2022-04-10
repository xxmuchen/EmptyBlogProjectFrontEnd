<template>
  <div>
    <div class="mainTop">
      <div class="topInfo">
        <div class="noticeInfoManageFont">公告管理</div>
        <div class="addNotice">
          <div class="noticeInfoSearchInputButton">
            <el-button type="primary" @click="dialogAddNoticeVisible = true">添加公告</el-button>
          </div>
          <el-dialog v-model="dialogAddNoticeVisible"  title="添加公告" width="40%">
            <el-form :model="noticeAddForm">
              <el-form-item label="公告内容" :label-width="formLabelWidth">
                <el-input v-model="noticeAddForm.noticeContent" :rows="10" type="textarea" style="text-indent: 24px" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogAddNoticeVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addNotice"
        >Confirm</el-button
        >
      </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </div>
    <div class="mainTable">
      <div>
        <el-table
            ref="singleTableRef"
            :data="tableData"
            highlight-current-row
            style="width: 100%"
            @row-dblclick="handleWatch"
        >
          <el-table-column type="index" width="50"/>
          <el-table-column property="content" label="公告内容" width="640">
            <template #default="scope">
                <span style="width: 270px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column property="authorName" label="发布者" width="200"/>
          <el-table-column property="createTime" label="添加时间" width="200"/>
          <el-table-column fixed="right" label="Operations">
            <template #default="scope">
              <el-button size="default" @click="handleWatch(scope.row)">查看</el-button>
              <el-button size="default" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog  v-model="noticeDetailInfoDescribeVisible" title="公告信息"
                  width="500px">
          <p>公告内容: {{ noticeDetailInfo.content }}</p>
          <p>发布者: {{ noticeDetailInfo.authorName }}</p>
          <p>发布时间: {{ noticeDetailInfo.createTime }}</p>
      </el-dialog>


      <div class="pagination">
        <el-pagination
            v-model:current-page="currentPage"
            :page-size="9"
            :page-count="pageCount"
            layout="prev, pager, next"
            @current-change="adminGetAllNoticeByPageAndCreateTime"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>


import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: 'NoticeInfoManage',
  components: {},
  data() {
    return {
      currentPage: 1,
      pageCount: 0,
      tableData: [],
      formLabelWidth: '80px',
      dialogAddNoticeVisible: false,
      noticeAddForm: {
        noticeContent: ''
      },
      noticeDetailInfoDescribeVisible: false,
      noticeDetailInfo: {}
    }
  },
  methods: {
    handleDelete(row) {
      axios.delete('/deleteOneNoticeById?noticeId=' + row.id).then(response => {
        ElMessage.success(response.data)
        this.adminGetAllNoticeByPageAndCreateTime(1)
        this.currentPage = 1
      })
    },
    handleWatch(row) {
      axios.get('/getOneNoticeDetailInfoById?noticeId=' + row.id).then(response => {
        this.noticeDetailInfo = response.data
        this.noticeDetailInfoDescribeVisible = true
      })
    },
    addNotice() {
      axios.post("/addNotice" , {
        content: this.noticeAddForm.noticeContent
      }).then(response => {
        ElMessage.success(response.data)
        this.adminGetAllNoticeByPageAndCreateTime(1)
        this.currentPage = 1
        this.noticeAddForm.noticeContent = ''
        this.dialogAddNoticeVisible = false
      })
    },
    adminGetAllNoticeByPageAndCreateTime(currentPage) {
      axios.get("/getAllNoticeByCurrentPage?currentPage=" + currentPage).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
      })
    },
  },
  mounted() {
    this.adminGetAllNoticeByPageAndCreateTime(1)
  }
}
</script>
<style scoped>
.mainTop {
  /*display: flex;*/
  /*margin-top: 10px;*/
  /*margin-bottom: 10px;*/
}
.topInfo {
  display: flex;
}
.noticeInfoManageFont {
  /*margin-left: 30px;*/
}


.addNotice {
  margin-left: 1000px;
}


.el-form {
  width: 500px;
}

.mainTable {
  margin-top: 20px;
}

.pagination {
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>