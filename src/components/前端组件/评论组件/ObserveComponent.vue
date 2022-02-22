<template>
  <div>
    <el-input
        v-model="textarea"
        :rows="2"
        type="textarea"
        placeholder="Please input"
    />
    <el-button @click="Submit">提交</el-button>
  </div>
</template>
<script>
  import axios from "axios";

  export default {
    name: 'ObserveComponent',
    data() {
      return {
        textarea: ''
      }
    },
    methods: {
      Submit() {
        axios.post('/addDiaryObserve' , {
          type: '放空日记',
          objId: 48354654968,
          observeContent: this.textarea,
        }).then(response => {
          console.log(response)
        })
      }
    }
  }
</script>
<style>

</style>