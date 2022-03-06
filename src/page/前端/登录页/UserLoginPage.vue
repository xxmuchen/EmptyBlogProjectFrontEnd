<template>
  <el-container>
    <el-main>
      <div class="registBox">
        <div class="demo-image">
          <div class="block">
<!--            <span class="demonstration">{{ fit }}</span>-->
            <el-image
                style="width: 150px; height: 80px"
                :src="imageUrl"
                fit="fill"
            ></el-image>
          </div>
        </div>
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

          <el-form-item>
            <el-button type="primary" class="submit" @click="onSubmit" :disabled="isDisabled">Submit</el-button>
            <router-link :to="{
              name: 'UserRegistPage'
            }"><el-tag class="ml-2" type="success">免费注册</el-tag></router-link>
            <!--                <el-button>Cancel</el-button>-->
          </el-form-item>
<!--          <el-form-item>-->
<!--            <el-button type="primary" class="submit" @click="onSubmit" :disabled="isDisabled">Submit</el-button>-->
<!--            &lt;!&ndash;                <el-button>Cancel</el-button>&ndash;&gt;-->
<!--          </el-form-item>-->
        </el-form>
      </div>

    </el-main>
  </el-container>
</template>
<script>
import {reactive} from "vue";
import axios from "axios";
import jwt from 'jwt-decode';
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

      }),
      // selectedOptions: [],
      imageUrl: 'http://localhost:8080/images/logo/logo.png'
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },

    onSubmit() {

      // console.log(this.ruleForm.avatar)
      axios
          .post('/userLogin',{
            userName: this.ruleForm.userName,
            password: this.ruleForm.password
      })
          .then(response => {
            // if (response === '该用户不存在')
            //登陆成功  使用token
            const token = response.data;
            console.log(token);
            /*存储到ls*/
            localStorage.setItem('eleToken',token);
            /*解析token中的信息*/
            const decoded = jwt(token);
            /*存储至vuex*/
            // eslint-disable-next-line no-debugger
            // debugger
            this.$store.dispatch("setAuthenticated",!decoded === '')  //decoded空，函数返回真，取反假
            this.$store.dispatch("setUser",decoded)

            /*跳转*/
            this.$router.push('/');
      })
    }
  }
}
</script>
<style scoped>
.el-main {
  background-color: #E9EEF3;
  color: #333;
  margin: 0;
  padding: 0;

}
.registBox{
  height: 500px;
  width: 400px;
  position: absolute;
  top: 50px;
  left: 560px
}

body > .el-container {
  width: 100%;

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
  margin-left: 80px;
}
.demo-image {
  margin-left: 150px;
  margin-top: 160px;
  margin-bottom: 30px;
}
.el-tag {
  margin-left: 60px;
  font-size: 13px;
}
</style>