<template>
  <div class="main">
    <div class="userInfo">
      <div class="userAvatar">
        <el-upload
            name="userAvatarFile"
            class="avatar-uploader"
            action="http://localhost:8081/api/avatarUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
        >
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        </el-upload>
      </div>
      <div class="userNameAndSynopsis" >
        <div>
          <span v-text="userInfo.userName"></span>
          <el-tag @click="dialogTableSeeInfoVisible = true">查看</el-tag>
          <el-tag @click="dialogFormModifyInfoVisible = true">修改</el-tag>
        </div>
        <div>
          <span v-text="userInfo.synopsis"></span>
        </div>
      </div>
      <el-dialog v-model="dialogTableSeeInfoVisible" title="Shipping address">
        <el-descriptions title="User Info">
          <el-descriptions-item label="姓名">{{ userInfo.userName }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{ userInfo.sex }}</el-descriptions-item>
          <el-descriptions-item label="Email">{{ userInfo.email }}</el-descriptions-item>
          <el-descriptions-item label="个性签名">{{ userInfo.synopsis }}</el-descriptions-item>
          <el-descriptions-item label="生日">{{ userInfo.birthday }}</el-descriptions-item>
          <el-descriptions-item label="位置">
            <!--            <el-cascader-->
            <!--              size="large"-->
            <!--              :options="options"-->
            <!--              v-model="userInfo.location"-->
            <!--              @change="handleChange"-->
            <!--              disabled-->
            <!--              >-->
            <!--          </el-cascader>-->
            {{ userLocation }}

          </el-descriptions-item>
        </el-descriptions>
      </el-dialog>

      <el-dialog v-model="dialogFormModifyInfoVisible" title="Shipping address">
        <el-form :rules="rules"   :model="userInfo" label-width="100px" class="demo-ruleForm">


          <el-form-item label="用户昵称" prop="userName">
            <el-input
                placeholder="请输入昵称"
                v-model.trim="userInfo.userName"
                clearable>
            </el-input>
          </el-form-item>

          <el-form-item label="用户密码" prop="password">
            <el-input
                type="password"
                placeholder="请输入密码"
                v-model.trim="userInfo.password"
                show-password
                clearable>
            </el-input>
          </el-form-item>

          <el-form-item label="用户性别" prop="sex">
            <el-radio v-model="userInfo.sex"  label="男">男</el-radio>
            <el-radio v-model="userInfo.sex" label="女">女</el-radio>
          </el-form-item>

          <el-form-item label="用户Email" prop="email">
            <el-input
                type="email"
                :rows="2"
                placeholder="请输入您的Email"
                autosize
                v-model.trim="userInfo.email">
            </el-input>
          </el-form-item>

          <el-form-item label="个性签名" prop="synopsis">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入个性签名"
                autosize
                v-model.trim="userInfo.synopsis">
            </el-input>
          </el-form-item>

          <el-form-item label="用户生日" prop="birthday">
            <div class="block">
              <!--                <span class="demonstration">默认</span>-->
              <el-date-picker
                  v-model="userInfo.birthday"
                  type="date"
                  placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="用户地址" prop="location">
            <div class="address">
              <el-cascader
                  size="large"
                  :options="options"
                  v-model="userInfo.location"
              >
              </el-cascader>
            </div>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormModifyInfoVisible = false">Cancel</el-button>
            <el-button type="primary" @click="updateUserInfo"
            >Confirm</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
    <el-divider></el-divider>

  </div>
</template>

<script>
import axios from "axios";
import {regionData, CodeToText} from 'element-china-area-data'
import {reactive} from "vue";
// import axios from "axios";
import {ElMessage} from "element-plus";
export default {
  name: "MySpaceOwnSetting",
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
      if (this.userInfo.location.length === 3) {
        return CodeToText[this.userInfo.location[0]] + CodeToText[this.userInfo.location[1]] + CodeToText[this.userInfo.location[2]]
      } else {
        return ''
      }
    }
  },
  methods: {

    handleAvatarSuccess(res) {
      this.userInfo.avatar = res;
      axios.post('/updateUserAvatar', {
        avatar: res
      }).then(response => {
        ElMessage.success(response.data)
      })
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