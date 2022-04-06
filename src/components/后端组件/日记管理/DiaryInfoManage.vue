<template>
  <div>
    <div class="mainTop">
      <div>
        <div class="userInfoManageFont">日记管理</div>
        <div class="userSearch">
          <div class="userInfoSearchTimeSelect">
            <el-date-picker
                v-model="searchDate"
                type="daterange"
                unlink-panels
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                :shortcuts="shortcuts"
                placeholder="请输入用户信息"
            >
            </el-date-picker>
            <div class="userInfoSearchTimeSelectButton">
              <el-button type="primary">搜索</el-button>
            </div>
          </div>
          <!--          <div class="diaryState">-->
          <!--            <router-link :to="{name: 'DiaryInfoManage' , query: {state: '待审批'}}"><el-button>待审批</el-button></router-link>-->
          <!--            <router-link :to="{name: 'DiaryInfoManage' , query: {state: '审批通过'}}"><el-button>审批通过</el-button></router-link>-->
          <!--              <router-link :to="{name: 'DiaryInfoManage' , query: {state: '审批不通过'}}"><el-button>审批不通过</el-button></router-link>-->
          <!--          </div>-->
          <div class="userInfoSearchInput">
            <el-input></el-input>
            <div class="userInfoSearchInputButton">
              <el-button type="primary">搜索</el-button>
            </div>
          </div>
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
          <el-table-column property="title" label="日记名称" width="180"/>
          <el-table-column property="authorName" label="作者" width="180"/>
          <el-table-column property="mood" label="心情" width="120"/>
          <el-table-column property="weather" label="天气" width="120"/>
          <el-table-column property="see" label="是否公开" width="150"/>
          <el-table-column property="state" label="审批状态" width="120"/>
          <el-table-column property="createTime" label="发布时间" width="200"/>
          <el-table-column fixed="right" label="Operations">
            <template #default="scope">
              <el-button size="default" @click="handleWatch(scope.row)">查看</el-button>
              <el-button
                  size="default"
                  type="danger"
                  @click="handleDelete(scope.row)"
              >删除
              </el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-dialog
              v-model="diaryDialogVisible"
              :title="diaryDialogInfo.title"
              :before-close="handleCloseDiaryDialog"
          >
            <div v-html="diaryDialogInfo.content"></div>

            <template #footer>
              <span class="dialog-footer">
                <el-button @click="adminDiaryApproveWait">待审批</el-button>
                <el-button @click="adminDiaryApproveSuccess">审批通过</el-button>
                <el-button @click="adminDiaryApproveFail">审批不通过</el-button>
                <el-button @click="diaryDialogClose">关闭</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
        <div>
          <el-dialog
              v-model="diaryDialogApproveFailReason"
              title="审批失败原因"
              :before-close="function (){ diaryDialogApproveFailReason = false }"
          >
            <el-input v-model="diaryApproveFailReason" placeholder="请输入审批失败原因"></el-input>

            <template #footer>
              <span class="dialog-footer">
                <el-button @click="adminDiaryApproveFailReasonSubmit">提交</el-button>
                <!--                <el-button @click="adminDiaryApproveFail">滚</el-button>-->
                <el-button @click="function(){ diaryDialogApproveFailReason = false }">关闭</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>

      <div class="pagination">
        <el-pagination
            v-model:current-page="currentPage"
            :page-size="9"
            :page-count="pageCount"
            layout="prev, pager, next"
            @current-change="adminGetAllDiaryByPageAndCreateTime"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// import {reactive} from "vue";

// import AdminPageMainTopDisplay from "@/components/后端组件/主页面顶部/AdminPageMainTopDisplay";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: 'DiaryInfoManage',
  components: {},
  data() {
    return {
      diaryApproveFailReason: '',
      diaryDialogApproveFailReason: false,
      diaryDialogVisible: false,
      tableData: [],
      pageCount: 0,
      formLabelWidth: '80px',
      searchDate: '',
      shortcuts: [
        {
          text: 'Last week',
          value: [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date()]
        },
        {
          text: 'Last month',
          value: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()]
        },
        {
          text: 'Last 3 months',
          value: [new Date().getTime() - 3600 * 1000 * 24 * 90, new Date()]
        }
      ],
      currentPage: 1,
      diaryDialogInfo: {}
    }
  },
  methods: {
    adminDiaryApproveWait() {
      axios.put('/adminDiaryApproveWait', {
        diaryId: this.diaryDialogInfo.id
      }).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        this.diaryDialogVisible = false
      })
    },
    /*打开日记审批失败弹出框*/
    // adminDiaryApproveFailReasonClose() {
    //
    // },
    /*提交日记审批失败原因*/
    adminDiaryApproveFailReasonSubmit() {
      axios.put('/adminDiaryApproveFail', {
        diaryId: this.diaryDialogInfo.id,
        errorReason: this.diaryApproveFailReason
      }).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        this.diaryDialogVisible = false
        this.diaryDialogApproveFailReason = false
      })
      this.diaryDialogApproveFailReason = ""
    },
    /*提交日记审批成功*/
    adminDiaryApproveSuccess() {
      axios.put('/adminDiaryApproveSuccess', {
        diaryId: this.diaryDialogInfo.id
      }).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        this.diaryDialogVisible = false
      })
      this.diaryDialogInfo = {}
    },
    adminDiaryApproveFail() {
      this.diaryDialogApproveFailReason = true
    },
    handleWatch(row) {
      // console.log(row)
      axios.get('/adminGetDiaryById?diaryId=' + row.id).then(response => {
        this.diaryDialogInfo = response.data
      })
      this.diaryDialogVisible = true
    },
    diaryDialogClose() {
      this.diaryDialogInfo = {}
      this.diaryDialogVisible = false
    },
    handleDelete(row) {
      // console.log(row)
      axios.delete('/adminDeleteDiaryById?diaryId=' + row.id).then(response => {
        this.tableData = response.data.records
        this.currentPage = 1
        ElMessage.success("删除成功");
      })
    },
    handleCloseDiaryDialog() {
      this.diaryDialogInfo = {}
      this.diaryDialogVisible = false
      // this.diaryDialogApproveFailReason = false
    },
    adminGetAllDiaryByPageAndCreateTime(currentPage) {
      axios.get('/adminGetAllDiaryByPageAndCreateTime?currentPage=' + currentPage).then(response => {
        console.log(response.data)
        this.tableData = response.data.records
        this.pageCount = response.data.pages
      })
    }
  },
  mounted() {
    this.adminGetAllDiaryByPageAndCreateTime(1)
  }
}
</script>
<style scoped>
.mainTop {
  /*display: flex;*/
  /*margin-top: 10px;*/
  /*margin-bottom: 10px;*/
}

.userInfoManageFont {
  /*margin-left: 30px;*/
}

.userSearch {
  display: flex;
  margin-top: 20px;
}

.diaryState .el-button {
  margin-left: 30px;
}

.userInfoSearchTimeSelect {
  display: flex;
  /*margin-left: 100px;*/
}

.userInfoSearchTimeSelectButton {
  margin-left: 10px;
}

.userInfoSearchInput {
  display: flex;
  margin-left: 560px;
}

::v-deep(.el-input__inner) {
  width: 270px;
}

.userInfoSearchInputButton {
  margin-left: 10px;
}

.addUser {
  margin-left: 270px;
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