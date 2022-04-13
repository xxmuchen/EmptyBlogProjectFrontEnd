<template>
  <div class="searchDiv">
    <div @click="function() {
    searchBlogDialogVisiable = true
  }">
      <i class="iconfont icon-sousuo-xianxing"></i>
    </div>

    <div>
      <el-dialog
          v-model="searchBlogDialogVisiable"
          width="500px"
          :before-close="function () {searchBlogDialogVisiable = false}"
      >
        <el-form>
          <el-form-item label="关键字" label-width="80px">
            <el-input v-model="searchKeyValue" placeholder="请输入需要查询的关键字" clearable />
          </el-form-item>
<!--          <el-form-item label="博客类型" label-width="80px">-->
<!--            <el-select v-model="blogType" class="m-2" placeholder="Select" size="middle">-->
<!--              <el-option-->
<!--                  v-for="item in options"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value"-->
<!--              />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
        </el-form>
        <template #footer>
          <el-form-item>
            <span class="dialog-footer">
              <el-button @click="searchBlogDialogVisiable = false">Cancel</el-button>
              <el-button type="primary" @click="searchBlogByBlogType"
              >Confirm</el-button
              >
            </span>
          </el-form-item>
        </template>
      </el-dialog>
    </div>


    <div>
      <el-dialog
          v-model="searchBlogDialogResultVisiable"
          width="1000px"
          :before-close="function () {searchBlogDialogResultVisiable = false}"
      >
        <el-menu
            :default-active="放空日记"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
          <el-menu-item index="放空日记">放空日记</el-menu-item>
          <el-menu-item index="放空句子">放空句子</el-menu-item>
          <el-menu-item index="放空Vlog">放空Vlog</el-menu-item>
          <el-menu-item index="放空图文">放空图文</el-menu-item>
        </el-menu>
        <div v-show="userSelectType === '放空日记'">
          <el-table :data="tableData" stripe style="width: 100%"  @row-dblclick="diaryDialogClickJustToDiaryDetail">
            <el-table-column prop="title" label="标题" width="270" />
            <el-table-column prop="authorName" label="作者" width="180" />
            <el-table-column prop="createTime" label="创建时间" />
          </el-table>
        </div>
        <div v-show="userSelectType === '放空句子'">
          <el-table :data="tableData" stripe style="width: 100%" @row-dblclick="sentenceDialogClickJustToSentenceyDetail">
            <el-table-column label="内容" width="270" >
              <template #default="scope">
                  <span style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap" v-html="scope.row.content"></span>
              </template>
            </el-table-column>
            <el-table-column prop="authorName" label="作者" width="180" />
            <el-table-column prop="createTime" label="创建时间" />
          </el-table>
        </div>
        <div v-show="userSelectType === '放空Vlog'" >
          <el-table :data="tableData" stripe style="width: 100%" @row-dblclick="vlogDialogClickJustToVlogDetail">
            <el-table-column prop="title" label="标题" width="270" />
            <el-table-column prop="authorName" label="作者" width="180" />
            <el-table-column prop="createTime" label="创建时间" />
          </el-table>
        </div>
        <div v-show="userSelectType === '放空图文'">
          <div v-if="imageData.length">
            <water-fall gap="10px" width="100px" class="container" :data="imageData">
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
        </div>
      </el-dialog>
    </div>
  </div>


</template>
<script>
  import axios from "axios";
  import WaterFall from 'kuan-vue-waterfall';
  export default {
    name: 'SearchBlogComponemt',
    components: {
      WaterFall
    },
    data() {
      return {
        imageData: [],
        tableData: [],
        userSelectType: '放空日记',
        searchBlogDialogResultVisiable: false,
        searchKeyValue: '' ,
        searchBlogDialogVisiable: false,
      }
    },
    methods: {
      diaryDialogClickJustToDiaryDetail(row) {
        this.$router.push({name: 'DiaryPageDiaryDetailDisplay' , query:{diaryId: row.id}});
      },

      sentenceDialogClickJustToSentenceyDetail(row) {
        this.$router.push({name: 'SentencePageDetailDisplay' , query: {sentenceId: row.id}});
      },

      vlogDialogClickJustToVlogDetail(row) {
        this.$router.push({name: 'VlogPageDetailDisplay' , query: {vlogId: row.id}})
      },
      searchBlogByBlogType() {
        this.searchBlogDialogResultVisiable = true
        this.getSearchResult(this.userSelectType)
      },
      handleSelect (index) {
        this.userSelectType = index
        this.searchBlogByBlogType()
        // console.log(this)
        this.getSearchResult(index)
      },
      getSearchResult(index) {
        if (index === '放空日记') {
          axios.get('/getDiaryByKeyValue?diaryKeyValue=' + this.searchKeyValue).then(response => {
            console.log(123)
            console.log(response)
            this.tableData = response.data
          })
        } else if (index === '放空句子') {
          axios.get('/getSentenceByKeyValue?sentenceKeyValue=' + this.searchKeyValue).then(response => {
            console.log(response.data)
            this.tableData = response.data
          })
        } else if (index === '放空Vlog') {
          axios.get('/getVlogByKeyValue?vlogKeyValue=' + this.searchKeyValue).then(response => {
            console.log(response.data)
            this.tableData = response.data
          })
        } else if (index === '放空图文') {
          axios.get('/getGriphicByKeyValue?griphicKeyValue=' + this.searchKeyValue).then(response => {
            this.imageData = response.data
            // console.log(this.imageData)
          })
        }
      }
    }
  }
</script>
<style scoped>
.searchDiv {
  display: block;
}
</style>