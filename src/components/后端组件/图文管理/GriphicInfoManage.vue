<template>
  <div v-if="imageData.length">
    <water-fall gap="10px" width="250px" class="container" :data="imageData" :delay="true">
      <template #default="item">

        <div class="card">
          <!--          <img class="img" :src="item.src" @click="preview(item.src, $event)" />-->
          <img class="img" :src="item.imageUrl"/>
          <p>{{ item.description }}</p>
          <p>审批状态：{{ item.state }}</p>
          <p v-if="item.errorReason !== null">审批不通过原因：{{ item.errorReason }}</p>
          <div class="userOperation">
            <el-button size="default" @click="handleView(item.id)"
            >查看</el-button>
            <el-button
                size="default"
                type="danger"
                @click="handleDelete(item.id)"
            >删除</el-button
            >
          </div>
        </div>
      </template>
    </water-fall>
    <div>
      <el-dialog
          v-model="griphicDialogVisible"
          :title="griphicDialogInfo.title"
          :before-close="handleCloseGriphicDialog"
          width="500px"
      >
        <center><el-image :src="griphicDialogInfo.imageUrl"></el-image>
        <div class="descriptionBox">{{ griphicDialogInfo.description }}</div></center>
        <template #footer>
              <span class="dialog-footer">
                <el-button @click="adminGriphicApproveWait">待审批</el-button>
                <el-button @click="adminGriphicApproveSuccess">审批通过</el-button>
                <el-button @click="adminGriphicApproveFail">审批不通过</el-button>
                <el-button @click="griphicDialogClose">关闭</el-button>
              </span>
        </template>
      </el-dialog>
    </div>
    <div>
      <el-dialog
          v-model="griphicDialogApproveFailReason"
          title="审批失败原因"
          :before-close="function (){ griphicDialogApproveFailReason = false }"
      >
        <el-input v-model="griphicApproveFailReason" placeholder="请输入审批失败原因"></el-input>

        <template #footer>
              <span class="dialog-footer">
                <el-button @click="adminDiaryApproveFailReasonSubmit">提交</el-button>
                <!--                <el-button @click="adminDiaryApproveFail">滚</el-button>-->
                <el-button @click="function(){ griphicDialogApproveFailReason = false }">关闭</el-button>
              </span>
        </template>
      </el-dialog>
    </div>
    <!--    <button class="halo-btn halo-btn-primary" @click.stop.prevent="loadMore">加载更多</button>-->
  </div>
</template>
<script>

import WaterFall from 'kuan-vue-waterfall';
import axios from "axios";
export default{
  name: 'GriphicInfoManage',
  components: {
    WaterFall,
  },
  data() {
    return {
      griphicApproveFailReason: '',
      griphicDialogApproveFailReason: false,
      griphicDialogVisible: false,
      griphicDialogInfo: {},
      payload: {
        page: 1,
        size: 18,
      },
      total: 0,
      imageData: [],
    };
  },
  computed: {
    hasMore() {
      const { page, size } = this.payload;
      return page * size < this.total;
    },
  },
  methods: {
    adminGriphicApproveWait() {
      axios.put('/adminGriphicApproveWait', {
        griphicId: this.griphicDialogInfo.id
      }).then(response => {

        this.imageData = response.data;
        this.griphicDialogVisible = false
      })
      this.$router.go(0)
    },
    adminGriphicApproveSuccess() {
      axios.put('/adminGriphicApproveSuccess', {
        griphicId: this.griphicDialogInfo.id
      }).then(response => {
        this.imageData = response.data;
        this.griphicDialogVisible = false
      })
      this.$router.go(0)
    },
    adminGriphicApproveFail() {
      this.griphicDialogApproveFailReason = true
    },
    adminDiaryApproveFailReasonSubmit() {
      axios.put('/adminGriphicApproveFail', {
        griphicId: this.griphicDialogInfo.id,
        errorReason: this.griphicApproveFailReason
      }).then(response => {
        this.imageData = response.data;
        // this.tableData = response.data.records
        // this.pageCount = response.data.pages

        this.griphicDialogApproveFailReason = false
        this.griphicDialogVisible = false
      })
      this.griphicApproveFailReason = ""
      this.$router.go(0)
    },

    adminGetAllGriphicByPageAndCreateTime() {
      axios.get('/adminGetAllGriphicByPageAndCreateTime').then(response => {
        this.imageData = response.data;
      })
    },
    handleView(griphicId) {
      axios.get('/adminGetGriphicById?griphicId=' +  griphicId).then(response => {
        this.griphicDialogInfo = response.data
        this.griphicDialogVisible = true
      })
      // this.$router.push({name:'GriphicPageDetailPageDisplay' , query:{'id': griphicId}})
    },
    handleDelete(griphicId) {
      axios.delete('/adminDeleteGriphicById?griphicId=' + griphicId).then(response => {
        this.imageData = response.data;
        this.$router.go(0)
      })
    },
    griphicDialogClose() {
      this.griphicDialogInfo = {}
      this.griphicDialogVisible = false
    },
    handleCloseGriphicDialog() {
      this.griphicDialogInfo = {}
      this.griphicDialogVisible = false
    }
  },
  mounted() {
    // this.fetchData();
    // this.getAllGriphicBySee();
    this.adminGetAllGriphicByPageAndCreateTime()
  },

}
</script>
<style scoped>
.container {
  min-height: 90vh;
}
.card {
  padding: 10px;
  background-color: white;
  border-radius: 3px;
  color: #666;
  line-height: 1.5;
  word-break: break-all;
}
.card .img {
  width: 100%;
  margin-bottom: 5px;
  cursor: pointer;
}
.halo-btn {
  margin: 100px auto;
  display: block;
}
.userOperation {
  display: flex;
}
  .descriptionBox{
    margin-top: 20px;
  }
</style>