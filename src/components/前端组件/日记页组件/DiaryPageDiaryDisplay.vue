<template>
<!--  <el-container>-->
<!--    <el-header></el-header>-->
<!--    <el-main>-->
  <div class="mainContent">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">放空日记</el-breadcrumb-item>
        <el-breadcrumb-item v-if="typeof $route.query.diaryType !== 'undefined'">{{ $route.query.diaryType }}</el-breadcrumb-item>
<!--        <el-breadcrumb-item v-if="typeof $route.params.name !== 'undefined'">{{ $route.params.name }}</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item v-else>{{ this.name }}</el-breadcrumb-item>-->

      </el-breadcrumb>
      <el-divider></el-divider>
      <el-table
          :data="tableData"
          :row-key="tableData.id"
          style="width: 100%"

          :show-header="false"
          :row-style="{height: '70px',background: '#f3e8d6'}"
          :lazy="true"
          v-on:row-click="justToDiaryDetail"
      >
        <el-table-column
            prop="title"
            label="日记名称"
            width="800">
        </el-table-column>
<!--        <el-divider></el-divider>-->
        <el-table-column
            prop="authorName"
            label="作者"
            width="180">
        </el-table-column>
        <el-table-column
            prop="updateTime"
            label="发布时间">
        </el-table-column>
      </el-table>

      <div class="paging">
        <div class="block">
<!--          <span class="demonstration">大于 7 页时的效果</span>-->
          <el-pagination
              layout="prev, pager, next"
              :page-count="pageCount"
              :current-page="currentPage"
              @current-change="currentChange"
          >
          </el-pagination>
        </div>
      </div>
</div>

<!--    </el-main>-->
<!--  </el-container>-->
</template>
<script>
  // import axios from "axios";

  import axios from "axios";

  export default {
    name: 'DiaryPageDiaryDisplay',
    data() {
      return {
        // diaryType: '最新日记',
        tableData: [],
        currentPage: 1,
        pageCount: 0
      }
    },
    methods: {
      justToDiaryDetail(row) {
        // console.log(row.id);
        this.$router.push({name: 'DiaryPageDiaryDetailDisplay' , query:{diaryId: row.id}});
      },
      currentChange(currentIndex){
        // console.log(currentIndex)
        this.getNewDiaryListFirstPageDisplay(currentIndex)
      },
      getNewDiaryListFirstPageDisplay(currentIndex) {
        axios.get('/newDiaryListDisplay' , {
          params: {
            currentIndex
          }
        }).then(response => {
          this.tableData = response.data.records
          this.pageCount = response.data.pages
          // console.log(this.tableData[0].authorId)
        })
      },
      getRecommendDiaryListDisplay(currentIndex) {
        axios.get('/recommendDiaryListDisplay' , {
          params: {
            currentIndex
          }
        }).then(response => {
          this.tableData = response.data.records
          this.pageCount = response.data.pages
          console.log(this.tableData)
        })
      },
      getTopGuestDiaryListDisplay(currentIndex) {
        axios.get('/topGuestDiaryListDisplay' , {
          params: {
            currentIndex
          }
        }).then(response => {
          this.tableData = response.data.records
          this.pageCount = response.data.pages
          console.log(this.tableData)
        })
      },
      // 根据日记类型请求对应数据
      getDiaryListDataByDiaryType(val) {
        if (val === '最新日记') {
          this.getNewDiaryListFirstPageDisplay(1)
        }else if (val === '推荐日记') {

          this.getRecommendDiaryListDisplay(1)

        }else if (val === '顶客排行'){
            this.getTopGuestDiaryListDisplay(1)
        }else {
          this.getNewDiaryListFirstPageDisplay(1)
        }
      }
    },
    mounted() {
      this.getDiaryListDataByDiaryType(this.$route.query.diaryType)
    },
    watch: {
      '$route.query.diaryType'(val) {
        // this.diaryType = this.$route.query.diaryType
        this.getDiaryListDataByDiaryType(val);
        // console.log(val)
      }
    }
  }
</script>
<style scoped>
.mainContent {
  padding-left: 100px;
  padding-right: 100px;
}
.el-container {
  /*background: #99a9bf;*/
  padding-left: 100px;
  padding-right: 100px;
}
.el-header, .el-footer {
  /*background-color: #B3C0D1;*/
  color: #333;
  /*text-align: center;*/
  /*line-height: 60px;*/
}



.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  padding: 0;
  margin: 0;
  padding-left: 40px;
  padding-right: 40px;

  padding-bottom: 40px;
  /*text-align: center;*/
  /*line-height: 160px;*/
}

.el-main > .el-container {
  /*margin-bottom: 40px;*/
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  /*line-height: 260px;*/
}

.el-container:nth-child(7) .el-aside {
  /*line-height: 320px;*/
}

.el-breadcrumb {
  margin-left: 0px;
  margin-top: 20px;
  /*margin-left: 40px;*/
}

/*.el-table el-table-column {*/
/*  background: red;*/
/*}*/
.paging {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.block {

}
</style>