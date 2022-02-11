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
            <router-link :to="{name:'SentencePageHomeDisplay'}" active-class="active">
              句子首页
            </router-link>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:'SentencePageEncounterLoversDisplay'}" active-class="active">
              偶遇佳句
            </router-link>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:'SentencePageHomeDisplay' , params: {name: '名人名言'}}" active-class="active">
              名人名言
            </router-link>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"><!--{{ item.type }}-->
            <router-link :to="{name:'SentencePageHomeDisplay' , params: {name: '精选句集'}}" active-class="active">
              精选句集
            </router-link>
          </div>
        </el-col>
        <!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        <!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="1"><div class="grid-content bg-purple"><i class="iconfont icon-Magnifier"></i></div></el-col>
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
  name: 'SentencePageHomeDisplay',
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