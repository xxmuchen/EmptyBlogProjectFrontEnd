<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="mangerLogin">
          <div class="loginBox">
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                class="demo-ruleForm"
                :size="formSize"
            >
              <el-form-item>
                <div class="administratorLoginFont">管理员登录</div>
              </el-form-item>
              <el-form-item label="邮箱" prop="name">
                <el-input v-model="ruleForm.adminEmail"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.adminPassword" type="password"></el-input>
              </el-form-item>

              <el-form-item>
                <div class="loginButton" >
                  <el-button type="primary" @click="submitForm"
                  >登录</el-button
                  >
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
    import {reactive} from "vue";
    import axios from "axios";

    export default {
      name: 'AdminLogin',
      data() {
        return {
          ruleForm: {
            adminEmail: '' ,
            adminPassword: ''
          },
          rules: reactive({

          }),
          formSize: 'default'
        }
      },
      methods: {
        submitForm() {
          axios.post('/adminLogin' , {
            adminEmail: this.ruleForm.adminEmail,
            adminPassword: this.ruleForm.adminPassword
          }).then(response => {
            console.log(response.data);
            localStorage.setItem("eleToken" , response.data)
            this.$router.push({name: 'AdminPage'})
          })
        }
      }
    }
</script>
<style scoped>
  .el-main {
    display: flex;
    /*align-items: center;*/
    /*align-content: center;*/
    justify-content: center;
    justify-items: center;
    margin-top: 150px;
  }
  .mangerLogin {
    width: 500px;
    height: 300px;
    background: red;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
  }
  .loginBox {
    width: 70%;
    height: auto;
    /*padding-top: 10px;*/
  }
  .el-form-item {
    margin-top: 20px;
    width: 100%;
  }
  .administratorLoginFont {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
  }
  .loginButton {
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    height: auto;
    margin-top: 10px;
  }
</style>