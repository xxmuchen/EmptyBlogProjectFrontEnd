<template>
  <div v-if="imageData.length">
    <water-fall gap="10px" width="250px" class="container" :data="imageData" :delay="true">
      <template #default="item">

        <div class="card">
          <!--          <img class="img" :src="item.src" @click="preview(item.src, $event)" />-->
          <img class="img" :src="item.imageUrl"/>
          <p>{{ item.description }}</p>
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
      >
        <el-image :src="griphicDialogInfo.imageUrl"></el-image>
        <div class="descriptionBox">{{ griphicDialogInfo.description }}</div>
        <template #footer>
              <span class="dialog-footer">
                <el-button @click="griphicDialogClose">关闭</el-button>
                <!--        <el-button type="primary" @click="griphicDialogVisible = false"-->
                <!--        >Confirm</el-button-->
                <!--        >-->
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