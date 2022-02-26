<template>
  <router-link :to="{name:'HomePage'}"><div class="grid-content bg-purple">
    <div class="demo-image">
      <div class="block">
        <el-image style="width: 100%; height: 80%"
                  :src="url" fit="fill"></el-image>
      </div>
    </div>
  </div>
  </router-link>
</template>
<script>
  export default {
    name: 'TopLogo',
    data() {
      return {
        url: 'https://s4.ax1x.com/2022/02/11/HUfWjA.png'
      }
    }
  }
</script>
<style scoped>
.demo-image {
  width: 80%;
  /*margin-top: 20px;*/
  /*margin-left: 20px;*/
}
</style>