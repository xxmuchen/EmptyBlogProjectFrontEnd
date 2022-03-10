<template>
  <div v-if="imageData.length">
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
              >取消喜欢</el-button
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
import {ElMessage} from "element-plus";
export default {
  name: 'MySpaceOwnStarGriphic',
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
    this.getUserSpaceGriphicUserStarOrderByCreateTime()
  },
  methods: {
    getUserSpaceGriphicUserStarOrderByCreateTime() {
      axios.get('/getUserSpaceGriphicUserStarOrderByCreateTime').then(response => {
        this.imageData = response.data;
      })
    },
    handleView(griphicId) {
        this.$router.push({name:'GriphicPageDetailPageDisplay' , query:{'id': griphicId}})
    },
    handleDelete(griphicId) {
      axios.post('/cancelObjStar', {
        objId: griphicId,
        objType: '放空图文'
      }).then(response => {
        ElMessage.success("取消喜欢成功!")
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
</style>