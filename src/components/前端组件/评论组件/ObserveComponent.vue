<template>
  <!--  <div class="observeWhole">-->
  <el-container>
    <el-main>
      <el-form>
<!--        <el-form-item>-->
      <div class="parentCommentSection">
        <div class="avatarAndInputBox">
          <div class="demo-avatar demo-basic">
            <div class="demo-basic circle">
              <div class="block">
                <el-avatar size="default" :src="circleUrl"></el-avatar>
              </div>
            </div>
          </div>
          <div class="rootObserveContent">
            <el-form-item>
            <el-input
                v-model="rootObserveContent"
                :rows="2"
                type="textarea"
                placeholder="Please input"
                :disabled="isDisabled"
            />
            </el-form-item>
          </div>

        </div>
        <el-form-item>
        <div class="rootObserveSubmit">

          <el-button type="primary" @click="addRootObserve" :disabled="isDisabled">提交</el-button>
          <el-button @click="removeRootObserveTextContent" :disabled="isDisabled">取消</el-button>
        </div>
        </el-form-item>
      </div>
<!--        </el-form-item>-->
        <el-divider></el-divider>
      <div class="commentsShow">
        <el-tree
            :data="dataSource"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :props="defaultProps"

        >
          <template class="custom-tree-node" #default="{ node , data }">

              <div class="observeDisplayWhole">
                <div class="observeHead">
                  <div class="demo-avatar demo-basic">
                    <div class="demo-basic--circle">
                      <div class="block">
                        <el-avatar size="default" :src="data.user.avatar"></el-avatar>
                      </div>
                    </div>
                  </div>
                  <div class="userName">
                    <span v-text="data.user.userName"></span>
                    <span class="DistinguishFatherAndSon" v-if="data.lastId === null">回复了博主</span>
                    <span class="DistinguishFatherAndSon" v-else>回复了博主——<span
                        v-text="node.parent.data.user.userName"></span> </span>
                  </div>
                  <div class="observeTime">
                    <div v-text="data.createTime"></div>
                  </div>
                  <div class="observeTag">
                    <el-tag @click="expandTheReplyCommentTextarea(data.id)">评论</el-tag>
                  </div>
                </div>
                <div class="observeContent">
                  <div class="ObserveContentTextArea">
                    <span v-text="data.observeContent"></span>
                  </div>
                </div>
                <div class="observeContentReplySubmit" v-show="this.isShow === data.id">

                  <div class="ObserveContentReplyTextArea">
                    <el-input
                        v-model="replyObserveContent"
                        :rows="2"
                        type="replyObserveContent"
                        placeholder="Please input"
                        :disabled="isDisabled"
                    />
                  </div>
                  <el-form-item><div class="ObserveContentReplySubmitButton">
                    <el-button type="primary" @click="addReplyObserve(data.id)" :disabled="isDisabled">提交</el-button>
                    <el-button @click="closeObserveContentReplySubmit" :disabled="isDisabled">取消</el-button>
                  </div></el-form-item>
                </div>
              </div>


          </template>
        </el-tree>

      </div>
      </el-form>
    </el-main>
  </el-container>

  <!--  </div>-->
</template>
<script>
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
// import JSON_BIG from "json-bigint";

export default {
  name: 'ObserveComponent',
  props: ['obj_id', 'objType'],
  data() {
    return {
      isShow: '',
      isDisabled: false,
      rootObserveContent: '',
      replyObserveContent: '',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      dataSource: [],
      defaultProps: {
        children: 'nextNodes',
        label: 'observeContent'
      }
    }
  },
  methods: {
    // 用户未登陆时禁用按钮和输入框
    isDisable() {
      let eleToken = localStorage.getItem('eleToken')
      let flag = eleToken === null
      if (flag) {
        this.isDisabled = true
      } else {
        ElMessageBox.confirm(
            '尊敬的用户，您需要登陆后才可以评论，请问您是否登陆?',
            'Warning',
            {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning',
            }
        ).then(() => {
          /*跳转登录*/
          router.push({name: 'UserLoginPage'})
          ElMessage({
            type: 'success',
            message: '即将为您跳转到登陆页面'
          })
        }).catch(() => {
          ElMessage({
            type: 'info',
            message: '登陆取消'
          })
        })
        this.isDisabled = false
      }
    },
    // 查看user是否已登录，并获取user头像信息
    getAvatorAndUserName() {
      let eleToken = localStorage.getItem('eleToken')
      if (eleToken !== null) {
        axios.post('/getAvatarAndUserName').then(response => {
          // console.log(response)
          if (response.data.avatar !== '') {
            this.circleUrl = response.data.avatar
          }
          // this.userName = response.data.userName
          // this.isShow = true
        }).catch(error => {
          // eslint-disable-next-line no-debugger
          // debugger
          console.log(error)
          // this.isShow = false;
        })
      }
    },
    /*查询所有评论*/
    queryObserveByObjId(objType, obj_id) {
      axios.get('/queryObserveByObjId?objType=' + objType + '&objId=' + obj_id).then(response => {
        // console.log(response)
        this.dataSource = response.data
        console.log(this.dataSource)
      })
    },

    /*上传rootObserve*/
    addRootObserve() {
      console.log(this.objType)
      axios.post('/addObjObserve', {
        type: this.objType,
        objId: this.obj_id,
        observeContent: this.rootObserveContent
      }).then(response => {
        // console.log(response)
        this.rootObserveContent = ''
        this.dataSource = response.data
      })
    },
    addReplyObserve(last_id) {
      axios.post('/addObjObserve', {
        type: this.objType,
        objId: this.obj_id,
        lastId: last_id,
        observeContent: this.replyObserveContent
      }).then(response => {
        // console.log(response)
        this.replyObserveContent = ''
        this.dataSource = response.data
      })
    },
    removeRootObserveTextContent() {
      this.rootObserveContent = '';
    },
    // 先通过评论tag获取该条评论的id，然后创建一个变量isShow来接收，最后根据该变量和所有评论的id进行比较，v-show为true时显示
    expandTheReplyCommentTextarea(id) {
      this.isShow = id;
    },
    // 将isShow清空，所有的比较就都是false了
    closeObserveContentReplySubmit() {
      this.isShow = '';
      this.replyObserveContent = ''
    },
  },



  mounted() {
    // console.log(1234654)
    this.getAvatorAndUserName();
    this.queryObserveByObjId(this.objType, this.obj_id);
    // console.log('obj_id' , this.obj_id)
  }
}
</script>
<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  padding-left: 0px;
  padding-right: 0px;
}

.common-layout .el-header,
.common-layout .el-footer {
  /*background-color: #b3c0d1;*/
  /*color: var(--el-text-color-primary);*/
  /*text-align: center;*/
  /*line-height: 60px;*/
}

.common-layout .el-footer {
  /*line-height: 60px;*/
}

.common-layout .el-aside {
  /*background-color: #d3dce6;*/
  /*color: var(--el-text-color-primary);*/
  /*text-align: center;*/
  /*line-height: 200px;*/
}

.common-layout .el-main {
  /*background-color: #e9eef3;*/
  /*color: var(--el-text-color-primary);*/
  /*text-align: center;*/
  /*line-height: 160px;*/
}

.common-layout > .el-container {
  margin-bottom: 40px;
}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.common-layout .el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.demo-basic {
  width: 3.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*text-align: center;*/
}

.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  /*display: flex;*/
  /*justify-content: space-between;*/
  /*align-items: center;*/
}

.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--el-border-color-base);
}

.demo-basic .block {
  flex: 1;
}

.demo-basic .el-col:not(:last-child) {
  border-right: 1px solid var(--el-border-color-base);
}

.observeWhole {
  width: 100%;
  height: 100%;
  /*padding-left: 20px;*/
  /*padding-right: 20px;*/
}

.parentCommentSection {

  margin-top: 20px;
}

.avatarAndInputBox {
  display: flex;
}

.rootObserveContent {
  width: 96.5%;
}

.rootObserveSubmit {
  display: flex;
  justify-content: right;
  margin-top: 15px;
}

.commentsShow {
  width: 100%;
  height: auto;
}

.el-tree {
  height: 100%;
}

.custom-tree-node {
  width: 100%;
  /*height: 50px;*/
}

::v-deep(.el-tree-node__content) {
  height: auto;
  min-height: 50px;
  width: 100%;
}

.observeDisplayWhole {
  width: 100%;
}

.observeHead {
  display: flex;
  align-items: center;
  width: 100%;
}

.userName {
  width: 75%;
}

.DistinguishFatherAndSon {
  margin-left: 30px;
}

.observeTime {
  width: 15%;
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-items: right;*/
}

.observeTag {
  width: 6.5%;
  /*margin-left: 20px;*/
}

.observeContent {
  min-height: 70px;
  height: auto;
  width: 100%;
}


.observeContentReplySubmit {
  width: 95%;
}

.ObserveContentReplySubmitButton {
  width: 100%;
  display: flex;
  /*justify-items: right;*/
  justify-content: right;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
