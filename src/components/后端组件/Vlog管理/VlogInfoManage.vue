<template>
  <div>
    <div class="mainTop">
      <div>
        <div class="userInfoManageFont">Vlog管理</div>
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
          <el-table-column property="title" label="Vlog标题" width="200"/>
          <el-table-column property="description" label="描述" width="200"/>
          <el-table-column property="authorName" label="作者" width="120"/>
          <el-table-column property="see" label="是否公开" width="120"/>
          <el-table-column property="state" label="审批状态" width="120"/>
          <el-table-column property="createTime" label="发布时间" width="200"/>
          <el-table-column fixed="right" label="Operations">
            <template #default="scope">
              <el-button size="default" @click="handleWatch(scope.row)"
              >查看
              </el-button
              >
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
              v-model="vlogDialogVisible"
              :title="vlogDialogInfo.title"
              :before-close="handleCloseVlogDialog"
          >
            <vue3-video-play v-bind="options" :src="vlogDialogInfo.videoUrl"></vue3-video-play>
            <div class="vlogDescription">{{ vlogDialogInfo.description }}</div>
            <!--            <div v-html="vlogDialogInfo.content"></div>-->
            <!--            <div class="originalAuthorBox">原作者: {{ vlogDialogInfo.originalAuthor }}</div>-->
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="adminVlogApproveWait">待审批</el-button>
                <el-button @click="adminVlogApproveSuccess">审批通过</el-button>
                <el-button @click="adminVlogApproveFail">审批不通过</el-button>
                <el-button @click="vlogDialogClose">关闭</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
        <div>
          <el-dialog
              v-model="vlogDialogApproveFailReason"
              title="审批失败原因"
              :before-close="function (){ vlogDialogApproveFailReason = false }"
          >
            <el-form>
              <el-input v-model="vlogApproveFailReason" placeholder="请输入审批失败原因"></el-input>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="adminVlogApproveFailReasonSubmit">提交</el-button>
                <!--                <el-button @click="adminDiaryApproveFail">滚</el-button>-->
                <el-button @click="function(){ vlogDialogApproveFailReason = false }">关闭</el-button>
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
            @current-change="adminGetAllVlogByPageAndCreateTime"
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
import {reactive} from "vue";

export default {
  name: 'VlogInfoManage',
  components: {},
  data() {
    return {
      vlogDialogApproveFailReason:false,
      vlogApproveFailReason:'',
      vlogDialogVisible: false,
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
      vlogDialogInfo: {
        // video_url: 'http://localhost:8080/images/vlog/vlogVideo/a5d7d372-2581-40e9-bed4-897cba3e311e109670000.mp4'
      },

      options: reactive({
        width: '700px', //播放器高度
        height: '350px', //播放器高度
        color: "#409eff", //主题色
        title: '', //视频名称
        // src: "", //视频源
        muted: false, //静音
        webFullScreen: false,
        speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
        autoPlay: false, //自动播放
        loop: false, //循环播放
        mirror: false, //镜像画面
        ligthOff: false,  //关灯模式
        volume: 0.3, //默认音量大小
        control: true, //是否显示控制
        controlBtns: ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'] //显示所有按钮,
      })
    }
  },
  methods: {
    adminVlogApproveWait() {
      axios.put('/adminVlogApproveWait', {
        vlogId: this.vlogDialogInfo.id
      }).then(response => {
        this.tableData = response.data.records;
        this.pageCount = response.data.pages

      })
      this.vlogDialogVisible = false
      this.vlogDialogInfo = {}
    },
    adminVlogApproveSuccess() {
      axios.put('/adminVlogApproveSuccess', {
        vlogId: this.vlogDialogInfo.id
      }).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages

      })
      this.vlogDialogVisible = false
      this.vlogDialogInfo = {}
    },
    adminVlogApproveFail() {
      this.vlogDialogApproveFailReason = true
    },
    adminVlogApproveFailReasonSubmit() {
      axios.put('/adminVlogApproveFail', {
        vlogId: this.vlogDialogInfo.id,
        errorReason: this.vlogApproveFailReason
      }).then(response => {
        this.tableData = response.data.records
        this.pageCount = response.data.pages
      })
      this.vlogDialogVisible = false
      this.vlogDialogApproveFailReason = false
      this.vlogApproveFailReason = ""
      this.vlogDialogInfo = {}
    },
    handleWatch(row) {
      axios.get('/adminGetVlogById?vlogId=' + row.id).then(response => {
        this.vlogDialogInfo = response.data
      })
      this.vlogDialogVisible = true

    },
    vlogDialogClose() {
      this.vlogDialogInfo = {}
      this.vlogDialogVisible = false
    },
    handleDelete(row) {
      // console.log(row)
      axios.delete('/adminDeleteVlogById?vlogId=' + row.id).then(response => {
        this.tableData = response.data.records
        this.currentPage = 1
        ElMessage.success("删除成功");
      })
    },
    handleCloseVlogDialog() {
      this.vlogDialogInfo = {}
      this.vlogDialogVisible = false
    },
    adminGetAllVlogByPageAndCreateTime(currentPage) {
      axios.get('/adminGetAllVlogByPageAndCreateTime?currentPage=' + currentPage).then(response => {
        console.log(response.data)
        this.tableData = response.data.records;
        this.pageCount = response.data.pages

      })
    }
  },
  mounted() {
    this.adminGetAllVlogByPageAndCreateTime(1)
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

.vlogDescription {
  margin-top: 20px;
  margin-left: 20px;
}
</style>