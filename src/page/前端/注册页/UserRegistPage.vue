<template>
  <el-container>
    <el-main>

        <div class="registBox">
          <el-upload
              class="avatar-uploader"
              name="userAvatarFile"
              action="http://localhost:8081/api/avatarUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
          </el-upload>
            <el-form :rules="rules"  ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">


              <el-form-item label="用户昵称" prop="userName">
                <el-input
                    placeholder="请输入昵称"
                    v-model.trim="ruleForm.userName"
                    clearable>
                </el-input>
              </el-form-item>

              <el-form-item label="用户密码" prop="password">
                <el-input
                    type="password"
                    placeholder="请输入密码"
                    v-model.trim="ruleForm.password"
                    show-password
                    clearable>
                </el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                    type="password"
                    placeholder="请再次输入密码"
                    v-model.trim="ruleForm.confirmPassword"
                    show-password
                    clearable>
                </el-input>
              </el-form-item>

              <el-form-item label="用户性别" prop="sex">
                <el-radio v-model="ruleForm.sex"  label="男">男</el-radio>
                <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
              </el-form-item>

              <el-form-item label="用户Email" prop="email">
                <el-input
                    type="email"
                    :rows="2"
                    placeholder="请输入您的Email"
                    autosize
                    v-model.trim="ruleForm.email">
                </el-input>
              </el-form-item>

              <el-form-item label="个性签名" prop="synopsis">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入个性签名"
                    autosize
                    v-model.trim="ruleForm.synopsis">
                </el-input>
              </el-form-item>

              <el-form-item label="用户生日" prop="birthday">
                <div class="block">
                  <!--                <span class="demonstration">默认</span>-->
                  <el-date-picker
                      v-model="ruleForm.birthday"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="用户地址" prop="location">
                <el-cascader
                    size="large"
                    :options="options"
                    v-model="ruleForm.location"
                    @change="handleChange">
                </el-cascader>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="submit" @click="onSubmit" :disabled="isDisabled">Submit</el-button>
<!--                <el-button>Cancel</el-button>-->
              </el-form-item>
            </el-form>
          </div>

    </el-main>
  </el-container>
</template>
<script>
  import { regionData  } from 'element-china-area-data'
  import {reactive} from "vue";
  import axios from "axios";

  export default {
    name: 'UserRegistPage',
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
      // 确认密码验证
      var validateConfirmPassword= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      // 邮箱验证
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
        isDisabled: false,
        ruleForm: {
          userName: '',
          password: '',
          confirmPassword: '',
          sex: '男',
          birthday: '',
          synopsis: '',
          avatar: '',
          location: [],
          email: ''
        },
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
              validator: validatepassword , trigger: 'blur'
            }
          ],
          confirmPassword: [
            {
              required: true,
              message: '请确认您的密码',
              trigger: 'blur',
            },
            {
              min: 6,
              max: 20,
              message: '密码长度应在6个字符到20个字符之间'
            },
            {validator: validateConfirmPassword , trigger: 'blur' }
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
              validator: isEmail , trigger: 'blur'
            }
          ]
        }),
        options: regionData ,
        // selectedOptions: [],
        imageUrl: ''
      }
    },
    methods: {
      handleChange (value) {
        console.log(value)
      },

      handleAvatarSuccess(res, file) {
        // console.log(res);
        this.ruleForm.avatar = res;
        this.imageUrl = URL.createObjectURL(file.raw);
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

      onSubmit() {
        // console.log(this.ruleForm.avatar)
          axios
              .post('http://localhost:8081/api/registUser' , {
                userName: this.ruleForm.userName,
                password: this.ruleForm.password,
                sex: this.ruleForm.sex,
                synopsis: this.ruleForm.synopsis,
                email: this.ruleForm.email,
                birthday: this.ruleForm.birthday,
                avatar: this.ruleForm.avatar,
                location: this.ruleForm.location.toString()
              }).then(response => (console.log(response)))
      }
    }
  }
</script>
<style>
.el-main {
  background-color: #E9EEF3;
  color: #333;
  margin: 0;
  padding: 0;
  /*height: 100%;*/
  width: 100%;
  /*display:flex;*/
  /*justify-content:center;*/
  /*align-items:center;*/
  /*text-align: center;*/
  /*line-height: 160px;*/
}
.registBox{
  height: 500px;
  width: 400px;
  position: absolute;
  top: 50px;
  left: 560px
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
.avatar-uploader {
  margin-left: 130px;
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
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
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.submit {
  margin-left: 50px;
}
</style>