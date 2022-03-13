<template>
  <div>
    <div class="mainTop">
      <div class="userInfoManageFont">用户管理</div>
      <div class="userInfoSearchTimeSelect">
        <el-date-picker
            @change="getTime"
            v-model="searchDate"
            type="daterange"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :shortcuts="shortcuts"
            placeholder="请输入用户信息"
        >
        </el-date-picker>
        <div class="userInfoSearchTimeSelectButton">
          <el-button type="primary">搜索</el-button>
        </div>
      </div>

      <div class="userInfoSearchInput">
        <el-input></el-input>
        <div class="userInfoSearchInputButton">
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
      <div class="addUser">
        <div class="userInfoSearchInputButton">
          <el-button type="primary" @click="dialogAddUserVisible = true">添加用户</el-button>
        </div>
        <el-dialog v-model="dialogAddUserVisible" title="添加用户">
          <el-form :model="userAddForm">
            <el-form-item label="昵称" :label-width="formLabelWidth">
              <el-input v-model="userAddForm.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="userAddForm.userEmail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="userAddForm.userPassword" show-password type="password" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogAddUserVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogAddUserVisible = false"
        >Confirm</el-button
        >
      </span>
          </template>
        </el-dialog>
      </div>
    </div>
    <div class="mainTable">

    </div>
  </div>
</template>
<script>
// import {reactive} from "vue";

export default {
  name: 'UserInfoManage',
  data() {
    return {
      formLabelWidth: '80px',
      searchDate: '',
      shortcuts: [
        {
          text: 'Last week',
          value: [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date()]
        },
        {
          text: 'Last month',
          value: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()]
        },
        {
          text: 'Last 3 months',
          value: [new Date().getTime() - 3600 * 1000 * 24 * 90, new Date()]
        }
      ],
      dialogAddUserVisible: false,
      userAddForm: {
        userName: '',
        userEmail: '',
        userPassword: ''
      }
    }
  },
  methods: {
    getTime() {
      console.log(this.searchDate)
    }
  }
}
</script>
<style>
.mainTop {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
}

.userInfoManageFont {
  margin-left: 30px;
}

.userInfoSearchTimeSelect {
  display: flex;
  margin-left: 100px;
}

.userInfoSearchTimeSelectButton {
  margin-left: 10px;
}

.userInfoSearchInput {
  display: flex;
  margin-left: 100px;
}

.userInfoSearchInputButton {
  margin-left: 10px;
}

.addUser {
  margin-left: 150px;
}

.el-dialog {
  width: 600px;
}

.el-form {
  width: 500px;
}
</style>