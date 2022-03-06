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
        url: 'http://localhost:8080/images/logo/logo.png',

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