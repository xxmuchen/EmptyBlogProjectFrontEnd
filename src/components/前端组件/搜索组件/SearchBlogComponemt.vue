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
      <span class="dialog-footer">
        <el-button @click="searchBlogDialogVisiable = false">Cancel</el-button>
        <el-button type="primary" @click="searchBlogByBlogType"
        >Confirm</el-button
        >
      </span>
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

        </div>
        <div v-show="userSelectType === '放空句子'">

        </div>
        <div v-show="userSelectType === '放空Vlog'">

        </div>
        <div v-show="userSelectType === '放空图文'">

        </div>
      </el-dialog>
    </div>
  </div>


</template>
<script>
  export default {
    name: 'SearchBlogComponemt',
    data() {
      return {
        userSelectType: '',
        searchBlogDialogResultVisiable: false,
        searchKeyValue: '' ,
        searchBlogDialogVisiable: false,
        blogType: '放空日记',
        options: [
          {
            value: '放空日记',
            label: '放空日记',
          },
          {
            value: '放空句子',
            label: '放空句子',
          },
          {
            value: '放空Vlog',
            label: '放空Vlog',
          },
          {
            value: '放空图文',
            label: '放空图文',
          }
        ]
      }
    },
    methods: {
      searchBlogByBlogType() {
        this.searchBlogDialogResultVisiable = true
        // if (this.blogType === '放空日记') {
        //
        // } else if (this.blogType === '放空句子') {
        //
        // } else if (this.blogType === '放空Vlog') {
        //
        // } else if (this.blogType === '放空图文') {
        //
        // }
      },
      handleSelect (index) {
        this.userSelectType = index
        // console.log(this)
        // if (index === '放空日记') {
        //
        // } else if (index === '放空句子') {
        //
        // } else if (index === '放空Vlog') {
        //
        // } else if (index === '放空图文') {
        //
        // }
      }
    }
  }
</script>
<style scoped>
.searchDiv {
  display: block;
}
</style>