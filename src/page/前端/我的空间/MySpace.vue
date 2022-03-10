<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <h5 class="mb-2">我的空间</h5>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"

        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <i class="iconfont icon-rijiben"></i>
              </el-icon>
              <span>放空日记</span>
            </template>
            <el-menu-item-group title="">
              <router-link :to="{name: 'MySpaceOwnDiary'}"><el-menu-item index="1-1"> 我的日记</el-menu-item></router-link>
              <router-link :to="{name: 'MySpaceOwnStarDiary'}"><el-menu-item index="1-2">点赞的日记</el-menu-item></router-link>
              <router-link :to="{name: 'MySpaceOwnCollectDiary'}"><el-menu-item index="1-3">收藏的日记</el-menu-item></router-link>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <i class="iconfont icon-juzi"></i>
              </el-icon>
              <span>放空句子</span>
            </template>
            <el-menu-item-group title="">
              <router-link :to="{name: 'MySpaceOwnSentence'}"><el-menu-item index="2-1">我的句子</el-menu-item></router-link>
              <router-link :to="{name: 'MySpaceOwnStarSentence'}"><el-menu-item index="2-2">点赞的句子</el-menu-item></router-link>
              <router-link :to="{name: 'MySpaceOwnCollectSentence'}"><el-menu-item index="2-3">收藏的句子</el-menu-item></router-link>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <i class="iconfont icon-video"></i>
              </el-icon>
              <span>放空Vlog</span>
            </template>
            <el-menu-item-group title="">
              <router-link :to="{name : 'MySpaceOwnVlog'}"><el-menu-item index="3-1">我的Vlog</el-menu-item></router-link>
              <el-menu-item index="3-2">点赞的Vlog</el-menu-item>
              <el-menu-item index="3-3">收藏的Vlog</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <i class="iconfont icon-31tuwenxiangqing"></i>
              </el-icon>
              <span>放空图文</span>
            </template>
            <el-menu-item-group title="">
              <el-menu-item index="4-1">我的图文</el-menu-item>
              <el-menu-item index="4-2">点赞的图文</el-menu-item>
              <el-menu-item index="4-3">收藏的图文</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="5">
            <el-icon>
              <setting/>
            </el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {regionData, CodeToText} from 'element-china-area-data'
import {reactive} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";


export default {
  name: 'MySpace',
  data() {
    // 密码验证
    var validatepassword = (rule, value, callback) => {

      //必须包含大小写字母、数字、特殊字符长度再9-16位之间
      var regex = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,20}");

      if (value === "") {

        callback(new Error("请输入密码"));

      } else if (value.length < 6 || value.length > 20) {

        callback(new Error("请输入6~20位密码"));

      } else if (!regex.test(value)) {
        callback(new Error("密码必须同时包含字母、数字和特殊字符且至少6位"));
      } else {
        callback();
      }
    };
    var isEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    };
    return {
      dialogTableSeeInfoVisible: false,
      dialogFormModifyInfoVisible: false,
      formLabelWidth: '140px',
      userInfo: {},
      rules: reactive({
        userName: [
          {
            required: true,
            message: '昵称不可为空',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 7,
            message: '昵称长度应在2个字符到7个字符之间'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 20,
            message: '密码长度应在6个字符到20个字符之间'
          },
          {
            validator: validatepassword, trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择您的性别',
            trigger: 'change',
          }
        ],
        email: [
          {
            required: true,
            message: '邮箱不能为空'
          },
          {
            validator: isEmail, trigger: 'blur'
          }
        ]
      }),
      // imageUrl: '',
      options: regionData,
    }
  },
  computed: {
    userLocation() {
      console.log(this.userInfo.location)
      if (this.userInfo.location !== null) {
        return CodeToText[this.userInfo.location[0]] + CodeToText[this.userInfo.location[1]] + CodeToText[this.userInfo.location[2]]
      } else {
        return ''
      }
    }
  },
  methods: {

    handleAvatarSuccess(res) {
      this.userInfo.avatar = res;
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 获取用户信息
    getUserById() {
      let eleToken = localStorage.getItem('eleToken')
      if (eleToken !== null) {
        axios.post('/getUserByToken').then(response => {
          // console.log(response)
          this.userInfo = response.data
          if (this.userInfo.location !== null) {
            this.userInfo.location = this.userInfo.location.split(',')
          }
        })
      }
    },
    updateUserInfo() {
      let eleToken = localStorage.getItem('eleToken')
      if (eleToken !== null) {
        axios.post('/updateUserInfo', {
          userName: this.userInfo.userName,
          password: this.userInfo.password,
          sex: this.userInfo.sex,
          synopsis: this.userInfo.synopsis,
          email: this.userInfo.email,
          birthday: this.userInfo.birthday,
          avatar: this.userInfo.avatar,
          location: this.userInfo.location.toString()
        }).then(response => {
          // console.log(response)
          this.userInfo = response.data
          if (this.userInfo.location !== null) {
            this.userInfo.location = this.userInfo.location.split(',')
          }
          ElMessage.success('更新成功')
          this.dialogFormModifyInfoVisible = false
        })
      }
    }
  },
  mounted() {
    this.getUserById()
  }
}
</script>
<style scoped>
.common-layout .el-header,
.common-layout .el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  /*line-height: 60px;*/
}
.common-layout .el-footer {
  /*line-height: 60px;*/
}

.common-layout .el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  /*line-height: 200px;*/
}

.common-layout .el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  /*text-align: center;*/
  /*line-height: 160px;*/
}

.common-layout > .el-container {
  margin-bottom: 40px;
}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
  /*line-height: 260px;*/
}

.common-layout .el-container:nth-child(7) .el-aside {
  /*line-height: 320px;*/
}
.main {
  width: 100%;
}

.userInfo {
  width: auto;
  display: flex;
  margin-left: 30px;
  margin-top: 30px;
}

.userNameAndSynopsis {
  margin-left: 10px;
}

.userNameAndSynopsis div {
  margin-top: 20px;
}

.avatar-uploader ::v-deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.el-tag {
  margin-left: 10px;
}
</style>