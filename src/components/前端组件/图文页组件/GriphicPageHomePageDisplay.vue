<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ name: 'GriphicPage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-if="$route.params.name">{{ $route.params.name }}</el-breadcrumb-item>
  </el-breadcrumb>
  <div v-if="imageData.length">
    <water-fall gap="10px" width="250px" class="container" :data="imageData" :delay="true">
      <template #default="item">
        <router-link :to="{name:'GriphicPageDetailPageDisplay' , params:{'id': item.key}}">
          <div class="card">
<!--          <img class="img" :src="item.src" @click="preview(item.src, $event)" />-->
          <img class="img" :src="item.src" />
          <p>{{ item.src }}</p>
        </div></router-link>
      </template>
    </water-fall>
    <button class="halo-btn halo-btn-primary" @click.stop.prevent="loadMore">加载更多</button>
  </div>
</template>

<script>
import WaterFall from 'kuan-vue-waterfall';
import photoSwipe from 'kuan-vue-photoswipe';
export default {
  name: 'GriphicPageHomePageDisplay',
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
    this.fetchData();
  },
  methods: {
    preview(url, e) {
      const { width, height } = e.target;
      photoSwipe.preview(width ? [{ src: url, w: width, h: height }] : url);
      console.log(url)
    },
    async fetchData() {
      const { page, size } = this.payload;
      console.log(this.payload);
      const prev = (page - 1) * size;
      const images = [...Array(this.payload.size).keys()].map((key) => ({
        key: key + 1 + prev,
        src: require(`@/assets/images/${key}.jpg`),
      }));

      console.log(this.imageData);
      console.log(images);
      this.total = 500;
      this.imageData = [...this.imageData, ...images];
      console.log(this.imageData);
    },
    loadMore() {
      if (this.hasMore) {
        this.payload.page += 1;
        this.fetchData();
      }
    },
  },
};
</script>

<style lang="less">
body {
  background-color: #f2f3f8;
}
.el-breadcrumb {
   margin-top: 30px;
   margin-bottom: 30px;
  margin-left: 120px;
}
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
  .img {
    width: 100%;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
.halo-btn {
  margin: 100px auto;
  display: block;
}
</style>
<!--<template>-->
<!--  <el-container>-->
<!--      <el-main>-->
<!--        <el-breadcrumb separator="/">-->
<!--          <el-breadcrumb-item :to="{ name: 'GriphicPage' }">首页</el-breadcrumb-item>-->
<!--          <el-breadcrumb-item v-if="$route.params.name">{{ $route.params.name }}</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->

<!--        <div class="GriphicPagePart">-->
<!--      -->
<!--        </div>-->

<!--      </el-main>-->
<!--  </el-container>-->
<!--</template>-->
<!--<script>-->

<!--  export default {-->
<!--    name: 'GriphicPageHomePageDisplay'-->
<!--  }-->
<!--</script>-->
<!--<style>-->
<!--.el-container {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  background: red;-->
<!--}-->
<!--.el-header, .el-footer {-->
<!--  background-color: #B3C0D1;-->
<!--  color: #333;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--  /*text-align: center;*/-->
<!--  /*line-height: 60px;*/-->
<!--}-->


<!--.el-main {-->
<!--  background-color: #E9EEF3;-->
<!--  color: #333;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  padding-left: 150px;-->
<!--  padding-right: 150px;-->
<!--  /*background: ;*/-->
<!--  /*//text-align: center;*/-->
<!--  /*//line-height: 160px;*/-->
<!--}-->

<!--body > .el-container {-->
<!--  /*margin-bottom: 40px;*/-->
<!--}-->

<!--.el-container:nth-child(5) .el-aside,-->
<!--.el-container:nth-child(6) .el-aside {-->
<!--  /*//line-height: 260px;*/-->
<!--}-->

<!--.el-container:nth-child(7) .el-aside {-->
<!--  /*////line-height: 320px;*/-->
<!--}-->

<!--.el-breadcrumb {-->
<!--  margin-top: 30px;-->
<!--}-->
<!--.GriphicPagePart {-->
<!--    width: 100%;-->
<!--    height: auto;-->
<!--  background: gold;-->
<!--  margin-top: 30px;-->
<!--  /*display: flex;*/-->
<!--  /*padding-left: 20px;*/-->
<!--}-->
<!--.singleImage {-->
<!--  /*float: left;*/-->
<!--}-->

<!--ul {-->
<!--  /*display: inline-block;*/-->
<!--  width: 300px;-->
<!--  height: auto;-->
<!--}-->
<!--ul > li {-->
<!--  width: 300px;-->
<!--  height: auto;-->

<!--  /*float: left;*/-->
<!--}-->
<!--</style>-->