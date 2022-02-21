<template>
  <el-container>
<!--    <el-header></el-header>-->
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">放空日记</el-breadcrumb-item>
        <el-breadcrumb-item v-if="typeof $route.params.name !== 'undefined'">{{ $route.params.name }}</el-breadcrumb-item>
        <el-breadcrumb-item v-else>{{ this.name }}</el-breadcrumb-item>
<!--        <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-table
          :data="tableData"
          :row-key="tableData.id"
          style="width: 100%"
          :show-header="false"
          :row-style="{height: '70px',background: '#88a9bf'}"
          :lazy="true"
          v-on:row-click="justToDiaryDetail"
      >
        <el-table-column
            prop="date"
            label="日记名称"
            width="800">
        </el-table-column>
<!--        <el-divider></el-divider>-->
        <el-table-column
            prop="name"
            label="作者"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="发布时间">
        </el-table-column>
      </el-table>

      <div class="paging">
        <div class="block">
          <span class="demonstration">大于 7 页时的效果</span>
          <el-pagination
              layout="prev, pager, next"
              :total="1000">
          </el-pagination>
        </div>
      </div>


    </el-main>
  </el-container>
</template>
<script>
  export default {
    name: 'DiaryPageDiaryDisplay',
    props: ['name'],
    data() {
      return {
        tableData: [{
          id:1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id:3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id:4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      justToDiaryDetail(row) {
        console.log(row.id);
        this.$router.push({name: 'DiaryPageDiaryDetail'});
      },
      getNewDiaryListDisplay() {

      }
    },
    mounted() {
      console.log(this.name)
      console.log(this.$route.params.name)
    }
  }
</script>
<style scoped>
.el-container {
  background: #99a9bf;
  padding-left: 100px;
  padding-right: 100px;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  /*text-align: center;*/
  /*line-height: 60px;*/
}



.el-main {
  background-color: #E9EEF3;
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
  /*margin-top: 30px;*/
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