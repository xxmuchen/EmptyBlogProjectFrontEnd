<template>
  <el-row :gutter="20">
    <el-col :span="4" :offset="1"><div class="grid-content bg-purple" @click="switchingAuditStatus('所有图文')">所有图文</div></el-col>
    <el-col :span="4" :offset="2"><div class="grid-content bg-purple" @click="switchingAuditStatus('审批通过的图文')">审批通过的图文</div></el-col>
    <el-col :span="4" :offset="2"><div class="grid-content bg-purple" @click="switchingAuditStatus('待审批的图文')">待审批的图文</div></el-col>
    <el-col :span="4" :offset="2"><div class="grid-content bg-purple" @click="switchingAuditStatus('审批不通过的图文')">审批不通过的图文</div></el-col>
    <!--    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>-->
  </el-row>
  <div v-if="imageData.length" class="tableContent">
    <water-fall gap="10px" width="250px" class="container" :data="imageData" :delay="true">
      <template #default="item">

          <div class="card">
            <!--          <img class="img" :src="item.src" @click="preview(item.src, $event)" />-->
            <img class="img" :src="item.imageUrl" />
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
    <!--    <button class="halo-btn halo-btn-primary" @click.stop.prevent="loadMore">加载更多</button>-->
  </div>
</template>
<script>
import WaterFall from 'kuan-vue-waterfall';
// import photoSwipe from 'kuan-vue-photoswipe';
import axios from "axios";
export default {
  name: 'MySpaceOwnGriphic',
  components: {
    WaterFall,
  },
  data() {
    return {
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
  mounted() {
    // this.fetchData();
    // this.getAllGriphicBySee();
    this.getUserSpaceGriphicOrderCreateTime()
  },
  methods: {
    switchingAuditStatus(state){
      console.log(state)
      this.state = state;
      this.justToStatusByState()
    },
    justToStatusByState() {
      if (this.state === '所有图文') {
        this.getUserSpaceGriphicOrderCreateTime()
      }else if (this.state === '审批通过的图文') {
        this.getUserSpaceGriphicStateSuccessOrderCreateTime()
      }else if (this.state === '待审批的图文') {
        this.getUserSpaceGriphicStateWaitOrderCreateTime()
      }else if (this.state === '审批不通过的图文') {
        this.getUserSpaceGriphicStateFailOrderCreateTime()
      }else {
        this.getUserSpaceGriphicOrderCreateTime()
      }
    },
    getUserSpaceGriphicOrderCreateTime() {
      axios.get('/getUserSpaceGriphicOrderCreateTime').then(response => {
        this.imageData = response.data;
      })
    },
    getUserSpaceGriphicStateSuccessOrderCreateTime() {
      axios.get('/getUserSpaceGriphicStateSuccessOrderCreateTime').then(response => {
        this.imageData = response.data;
      })
    },
    getUserSpaceGriphicStateWaitOrderCreateTime() {
      axios.get('/getUserSpaceGriphicStateWaitOrderCreateTime').then(response => {
        this.imageData = response.data;
      })
    },
    getUserSpaceGriphicStateFailOrderCreateTime() {
      axios.get('/getUserSpaceGriphicStateFailOrderCreateTime').then(response => {
        this.imageData = response.data;
      })
    },
    handleView(griphicId) {
        this.$router.push({name:'GriphicPageDetailPageDisplay' , query:{'id': griphicId}})
    },
    handleDelete(griphicId) {
      axios.delete('/delUserSpaceGriphicBygriphicId?griphicId=' + griphicId).then(response => {
        this.imageData = response.data;
        this.$router.go(0)
      })
    }
  },
}
</script>
<style scoped>
.container {
  min-height: 90vh;
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
  background-color: #d9d9f3;
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
.card {
  padding: 10px;
  /*background-color: white;*/
  border-radius: 3px;
  color: #666;
  line-height: 1.5;
  word-break: break-all;
  background-color: #fffcf0;
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
</style>