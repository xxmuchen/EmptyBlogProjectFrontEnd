<template>
  <el-container>
    <el-header height="auto">
      <el-row :gutter="20">
        <el-col :span="3" :offset="1">
          <router-link :to="{name:'HomePage'}"><div class="grid-content bg-purple">
            <div class="demo-image">
              <div class="block">
                <el-image
                    :src="url" fit="fill"></el-image>
              </div>
            </div>
          </div>
          </router-link>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:'GriphicPageHomePageDisplay'}" active-class="active">
              图文首页
            </router-link>
          </div>
        </el-col>
        <!-- 通过请求不同的后端网址和路径上的不同参数,返回相同的前端页面  -->
        <el-col :span="3">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:'GriphicPageHomePageDisplay' , params:{name: '美图美句'}}" active-class="active">
              美图美句
            </router-link>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:'GriphicPageHomePageDisplay' , params:{name: '手写美句'}}" active-class="active">
              手写美句
            </router-link>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:'GriphicPageHomePageDisplay' , params:{name: '经典对白'}}" active-class="active">
              经典对白
            </router-link>
          </div>
        </el-col>
        <!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        <!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="1"><div class="grid-content bg-purple"><i class="el-icon-edit"></i></div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">登录/注册</div></el-col>
      </el-row>


    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
export default {
  name: 'GriphicPage',
  data() {
    return {
      url: 'https://s4.ax1x.com/2022/02/11/HUfWjA.png'
    }
  }
}
</script>
<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 40px;
  height: auto;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  /*text-align: center;*/
  /*line-height: 160px;*/
  padding: 0;
  margin: 0;
  /*height: 100%;*/
}

body > .el-container {
  /*margin-bottom: 40px;*/
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  /*line-height: 260px;*/
}

.el-container:nth-child(7) .el-aside {
  /*line-height: 320px;*/
}
.el-row {
  margin-bottom: 20px;
  padding-top: 20px;
&:last-child {
   margin-bottom: 0;
 }
}

.el-col {
  /*height: 30px;*/
  /*width: auto;*/
  height: auto;
  width: auto;
  border-radius: 4px;

}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>