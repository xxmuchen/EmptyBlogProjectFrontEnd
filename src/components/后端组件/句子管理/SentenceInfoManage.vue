<template>
  <div>
    <div class="mainTop">
      <div>
        <div class="userInfoManageFont">句子管理</div>
<!--        <div class="userSearch">
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

          <div class="userInfoSearchInput">
            <el-input></el-input>
            <div class="userInfoSearchInputButton">
              <el-button type="primary">搜索</el-button>
            </div>
          </div>
          &lt;!&ndash;          <div class="addUser">&ndash;&gt;
          &lt;!&ndash;            <div class="userInfoSearchInputButton">&ndash;&gt;
          &lt;!&ndash;              <el-button type="primary" @click="dialogAddUserVisible = true">添加用户</el-button>&ndash;&gt;
          &lt;!&ndash;            </div>&ndash;&gt;
          &lt;!&ndash;            <el-dialog v-model="dialogAddUserVisible" title="添加用户" width="30%">&ndash;&gt;
          &lt;!&ndash;              <el-form :model="userAddForm">&ndash;&gt;
          &lt;!&ndash;                <el-form-item label="昵称" :label-width="formLabelWidth">&ndash;&gt;
          &lt;!&ndash;                  <el-input v-model="userAddForm.userName" autocomplete="off"></el-input>&ndash;&gt;
          &lt;!&ndash;                </el-form-item>&ndash;&gt;
          &lt;!&ndash;                <el-form-item label="邮箱" :label-width="formLabelWidth">&ndash;&gt;
          &lt;!&ndash;                  <el-input v-model="userAddForm.userEmail" autocomplete="off"></el-input>&ndash;&gt;
          &lt;!&ndash;                </el-form-item>&ndash;&gt;
          &lt;!&ndash;                <el-form-item label="密码" :label-width="formLabelWidth">&ndash;&gt;
          &lt;!&ndash;                  <el-input v-model="userAddForm.userPassword" show-password type="password" autocomplete="off"></el-input>&ndash;&gt;
          &lt;!&ndash;                </el-form-item>&ndash;&gt;
          &lt;!&ndash;              </el-form>&ndash;&gt;
          &lt;!&ndash;              <template #footer>&ndash;&gt;
          &lt;!&ndash;      <span class="dialog-footer">&ndash;&gt;
          &lt;!&ndash;        <el-button @click="dialogAddUserVisible = false">Cancel</el-button>&ndash;&gt;
          &lt;!&ndash;        <el-button type="primary" @click="dialogAddUserVisible = false"&ndash;&gt;
          &lt;!&ndash;        >Confirm</el-button&ndash;&gt;
          &lt;!&ndash;        >&ndash;&gt;
          &lt;!&ndash;      </span>&ndash;&gt;
          &lt;!&ndash;              </template>&ndash;&gt;
          &lt;!&ndash;            </el-dialog>&ndash;&gt;
          &lt;!&ndash;          </div>&ndash;&gt;
        </div>-->
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
          <el-table-column type="index" width="50" />
          <el-table-column label="句子内容" width="300">
            <template #default="scope">
              <div v-html="scope.row.content" style="width: 270px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"></div>
            </template>
          </el-table-column>
          <el-table-column property="authorName" label="作者" width="120" />
          <el-table-column property="originalAuthor" label="原作者" width="120" />
          <el-table-column property="see" label="是否公开" width="120" />
          <el-table-column property="state" label="审批状态" width="120" />
          <el-table-column property="createTime" label="发布时间" width="200" />
          <el-table-column fixed="right" label="Operations">
            <template #default="scope">
              <el-button size="default" @click="handleWatch(scope.row)"
              >查看</el-button
              >
              <el-button
                  size="default"
                  type="danger"
                  @click="handleDelete(scope.row)"
              >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-dialog
              v-model="sentenceDialogVisible"
              title="句子内容"
              :before-close="handleCloseDiaryDialog"
          >
            <div v-html="sentenceDialogInfo.content"></div>
            <div class="originalAuthorBox" v-show="sentenceDialogInfo.originalAuthor !== ''">原作者: {{ sentenceDialogInfo.originalAuthor }}</div>
            <template #footer>
               <span class="dialog-footer">
                 <el-button @click="adminSentenceApproveWait">待审批</el-button>
                <el-button @click="adminSentenceApproveSuccess">审批通过</el-button>
                <el-button @click="adminSentenceApproveFail">审批不通过</el-button>
                 <el-button @click="diaryDialogClose">关闭</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
        <div>
          <el-dialog
              v-model="sentenceStateFailReasonDialogVisible"
              title="审批不通过"
              :before-close="function () { sentenceStateFailReasonDialogVisible = false }"
          >
            <el-input v-model="sentenceApproveFailReason" placeholder="请输入审批失败原因"></el-input>

            <template #footer>
               <span class="dialog-footer">
                <el-button @click="adminSentenceApproveFailReasonSubmit">提交</el-button>
                 <el-button @click="function(){ sentenceStateFailReasonDialogVisible = false }">关闭</el-button>
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
            @current-change="adminGetAllSentenceByPageAndCreateTime"
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
  name: 'SentenceInfoManage',
  components: {},
  data() {
    return {
      sentenceApproveFailReason: '',
      sentenceStateFailReasonDialogVisible: false,
      sentenceDialogVisible: false,
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
      // dialogAddUserVisible: false,
      // userAddForm: {
      //   userName: '',
      //   userEmail: '',
      //   userPassword: ''
      // },
      currentPage: 1,
      sentenceDialogInfo: {}
    }
  },
  methods: {
    adminSentenceApproveWait() {
        axios.put('/adminSentenceApproveWait' , {
          sentenceId: this.sentenceDialogInfo.id
        }).then(response => {
          this.sentenceDialogVisible = false;
          this.tableData = response.data.records;
          this.pageCount = response.data.pages
          this.sentenceDialogInfo = {}
        })
    },
    adminSentenceApproveSuccess() {
      axios.put('/adminSentenceApproveSuccess' , {
        sentenceId: this.sentenceDialogInfo.id
      }).then(response => {
        this.sentenceDialogVisible = false;
        this.tableData = response.data.records;
        this.pageCount = response.data.pages
        this.sentenceDialogInfo = {}
      })
    },
    adminSentenceApproveFail() {
        this.sentenceStateFailReasonDialogVisible = true;
    },
    adminSentenceApproveFailReasonSubmit() {
      axios.put('/adminSentenceApproveFail', {
        sentenceId: this.sentenceDialogInfo.id,
        errorReason: this.sentenceApproveFailReason
      }).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        this.sentenceStateFailReasonDialogVisible = false
        this.sentenceDialogVisible = false
      })
      this.sentenceApproveFailReason = ""
    },
    handleWatch(row) {
      axios.get('/adminGetSentenceById?sentenceId=' + row.id).then( response=> {
        this.sentenceDialogInfo = response.data
      })
      this.sentenceDialogVisible = true
    },
    diaryDialogClose() {
      this.sentenceDialogInfo = {}
      this.sentenceDialogVisible = false
    },
    handleDelete(row) {
      // console.log(row)
      axios.delete('/adminDeleteSentenceById?sentenceId=' + row.id).then(response => {
        this.tableData = response.data.records
        this.currentPage = 1
        ElMessage.success("删除成功");
      })
    },
    handleCloseDiaryDialog() {
      this.sentenceDialogInfo = {}
      this.sentenceDialogVisible = false
      this.sentenceStateFailReasonDialogVisible = false
    },
    adminGetAllSentenceByPageAndCreateTime(currentPage) {
      axios.get('/adminGetAllSentenceByPageAndCreateTime?currentPage=' + currentPage).then(response => {
        // console.log(response.data)
        this.tableData = response.data.records;
        this.pageCount = response.data.pages

      })
    }
  },
  mounted() {
    this.adminGetAllSentenceByPageAndCreateTime(1)
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

.userInfoSearchTimeSelect {
  display: flex;
  /*margin-left: 100px;*/
}

.userInfoSearchTimeSelectButton {
  margin-left: 10px;
}

.userInfoSearchInput {
  display: flex;
  margin-left: 180px;
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
.originalAuthorBox {
  margin-top: 30px;
  margin-left: 500px;
}
</style>