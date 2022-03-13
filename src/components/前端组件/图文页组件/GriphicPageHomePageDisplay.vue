<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ name: 'GriphicPage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-if="$route.query.type">{{ $route.query.type }}</el-breadcrumb-item>
  </el-breadcrumb>
  <div v-if="imageData.length">
    <water-fall gap="10px" width="250px" class="container" :data="imageData" :delay="true">
      <template #default="item">
        <router-link :to="{name:'GriphicPageDetailPageDisplay' , query:{'id': item.id}}">
          <div class="card">
<!--          <img class="img" :src="item.src" @click="preview(item.src, $event)" />-->
          <img class="img" :src="item.imageUrl" />
          <p>{{ item.description }}</p>
        </div></router-link>
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
    // this.fetchData();
    // this.getAllGriphicBySee();
    this.getDataBytype(this.$route.query.type)
  },
  methods: {
    // preview(url, e) {
    //   const { width, height } = e.target;
    //   photoSwipe.preview(width ? [{ src: url, w: width, h: height }] : url);
    //   console.log('url' , url)
    // },
    // async fetchData() {
    //   const { page, size } = this.payload;
    //   console.log('payload',this.payload);
    //   const prev = (page - 1) * size;
    //   const images = [...Array(this.payload.size).keys()].map((key) => ({
    //     key: key + 1 + prev,
    //     src: require(`@/assets/images/${key}.jpg`),
    //   }));
    //
    //   console.log('imageData' , this.imageData);
    //   console.log('images',images);
    //   this.total = 500;
    //   this.imageData = [...this.imageData, ...images];
    //   console.log('imageData' , this.imageData);
    // },

    getAllGriphicBySee() {
      axios.get('/getAllGriphicBySee').then(response => {
        this.imageData = response.data;
        console.log(this.imageData)
      })
    },

    getBuiltifulImageAndSentence() {
      axios.get('/getBuiltifulImageAndSentence').then(response => {
        this.imageData = response.data;
        console.log(this.imageData)
      })
    },
    getHandWriteBeautifulSentence() {
      axios.get('/getHandWriteBeautifulSentence').then(response => {
        this.imageData = response.data;
        console.log(this.imageData)
      })
    },
    getClassicDialogue() {
      axios.get('/getClassicDialogue').then(response => {
        this.imageData = response.data;
        console.log(this.imageData)
      })
    },
    getDataBytype(type) {
      console.log(type)
      if (type === '美图美句') {
        this.getBuiltifulImageAndSentence();
      }else if (type === '手写美句') {
        this.getHandWriteBeautifulSentence();
      }else if (type === '经典对白') {
        this.getClassicDialogue();
      }else {
         this.getAllGriphicBySee();
       }
    }
    // loadMore() {
    //   if (this.hasMore) {
    //     this.payload.page += 1;
    //     this.fetchData();
    //   }
    // },

  },
  watch: {
    '$route.query.type'(val){
        console.log(123)
        this.getDataBytype(val)
        this.$router.go(0)
      }
    }
}
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
