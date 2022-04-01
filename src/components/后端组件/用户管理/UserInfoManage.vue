<template>
  <div>
    <div class="mainTop">
      <div>
        <div class="userInfoManageFont">用户管理</div>
        <div class="userSearch">
          <div class="userInfoSearchTimeSelect">
            <el-date-picker
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
            <el-dialog v-model="dialogAddUserVisible" title="添加用户" width="40%">
              <el-form :model="userAddForm">
                <el-form-item label="昵称" :label-width="formLabelWidth">
                  <el-input v-model="userAddForm.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="userAddForm.userEmail" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="userAddForm.userPassword" show-password type="password"
                            autocomplete="off"></el-input>
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
      </div>
    </div>
    <div class="mainTable">
      <div>
        <el-table
            ref="singleTableRef"
            :data="tableData"
            highlight-current-row
            style="width: 100%"
            @row-dblclick="adminGetUserById"
        >
          <el-table-column type="index" width="50"/>
          <el-table-column property="userName" label="昵称" width="120"/>
          <el-table-column property="password" label="密码" width="120"/>
          <el-table-column property="sex" label="性别" width="80"/>
          <el-table-column property="email" label="邮箱" width="210"/>
          <el-table-column property="birthday" label="生日" width="150"/>
          <el-table-column property="createTime" label="注册时间" width="200"/>
          <el-table-column property="updateTime" label="修改时间" width="200"/>
          <el-table-column fixed="right" label="Operations">
            <template #default="scope">
              <el-button size="default" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button size="default" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-dialog v-model="dialogTableSeeInfoVisible" title="用户信息">
            <el-descriptions title="User Info">
              <el-descriptions-item label="姓名">{{ userInfo.userName }}</el-descriptions-item>
              <el-descriptions-item label="性别">{{ userInfo.sex }}</el-descriptions-item>
              <el-descriptions-item label="Email">{{ userInfo.email }}</el-descriptions-item>
              <el-descriptions-item label="个性签名">{{ userInfo.synopsis }}</el-descriptions-item>
              <el-descriptions-item label="生日">{{ userInfo.birthday }}</el-descriptions-item>
              <el-descriptions-item label="位置">
                {{ userLocation }}
              </el-descriptions-item>
            </el-descriptions>
          </el-dialog>

          <el-dialog v-model="dialogFormModifyInfoVisible" title="修改用户信息">
            <el-form :rules="rules" :model="userInfo" label-width="100px" class="demo-ruleForm">


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
                <el-radio v-model="userInfo.sex" label="男">男</el-radio>
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
            <el-button size="default" @click="setManagerByUserId" v-if="adminPermission > 1">设为管理员</el-button>
            <el-button size="default" @click="setSuperManagerByUserId" v-if="adminPermission > 1">设为超级管理员</el-button>
            <el-button @click="dialogFormModifyInfoVisible = false">Cancel</el-button>
            <el-button type="primary" @click="updateUserInfo"
            >Confirm</el-button
            >
          </span>
            </template>
          </el-dialog>
        </div>
      </div>

      <div class="pagination">
        <el-pagination
            v-model:current-page="currentPage"
            :page-size="9"
            :page-count="pageCount"
            layout="prev, pager, next"
            @current-change="adminGetAllUserByPageAndCreateTime"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios";
import {ElMessage} from "element-plus";
import {CodeToText, regionData} from "element-china-area-data";
import {reactive} from "vue";

export default {
  name: 'UserInfoManage',
  components: {},
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
      adminPermission: 0,
      diaryDialogVisible: false,
      tableData: [],
      pageCount: 0,
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
      },
      currentPage: 1,
      dialogTableSeeInfoVisible: false,
      dialogFormModifyInfoVisible: false,
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
    setManagerByUserId() {
      axios.post('/setManagerByUserId', {
        userId: this.userInfo.id
      }).then(response => {
        this.dialogFormModifyInfoVisible = false;
        this.tableData = response.data.records;
        this.pageCount = response.data.pages
        // this.getUserPermissionByUserId()
        this.$router.go(0)
      })
    },
    setSuperManagerByUserId() {
      axios.post('/setSuperManagerByUserId', {
        userId: this.userInfo.id
      }).then(response => {
        this.dialogFormModifyInfoVisible = false;
        this.tableData = response.data.records;
        this.pageCount = response.data.pages
        // this.getUserPermissionByUserId()
        this.$router.go(0)
      })
    },
    getUserPermissionByUserId() {
      // let token = localStorage.getItem("eleToken");
      axios.post("/getUserPermissionByUserId").then(response => {
        this.adminPermission = response.data.userPermission;
        console.log(this.adminPermission)
      })
    },
    // 获取用户信息
    adminGetUserById(row) {
      axios.get('/adminGetUserById?userId=' + row.id).then(response => {
        this.userInfo = response.data
        this.dialogTableSeeInfoVisible = true
        this.userInfo.location = this.userInfo.location.split(',')
      })
    },
    handleUpdate(row) {
      axios.get('/adminGetUserById?userId=' + row.id).then(response => {
        this.userInfo = response.data
        this.dialogFormModifyInfoVisible = true
        if (this.userInfo.location !== null) {
          this.userInfo.location = this.userInfo.location.split(',')
        }
      })
    },
    updateUserInfo() {
      axios.put('/adminUpdateUserInfo', {
        id: this.userInfo.id,
        userName: this.userInfo.userName,
        password: this.userInfo.password,
        sex: this.userInfo.sex,
        synopsis: this.userInfo.synopsis,
        email: this.userInfo.email,
        birthday: this.userInfo.birthday,
        avatar: this.userInfo.avatar,
        location: this.userInfo.location === null? null: this.userInfo.location.toString()
      }).then(response => {
        // console.log(response)
        this.tableData = response.data.records
        this.pageCount = response.data.pages
        this.currentPage = 1
        ElMessage.success('更新成功')
        this.dialogFormModifyInfoVisible = false
      })
    },
    handleDelete(row) {
      // console.log(row)
      axios.delete('/adminDeleteUserById?userId=' + row.id).then(response => {
        this.tableData = response.data.records
        this.currentPage = 1
        this.pageCount = response.data.pages
        ElMessage.success("删除成功");
      })
    },
    adminGetAllUserByPageAndCreateTime(currentPage) {
      axios.get('/adminGetAllUserByPageAndCreateTime?currentPage=' + currentPage).then(response => {
        console.log(response.data)
        this.tableData = response.data.records;
        this.pageCount = response.data.pages
        // this.currentPage = 1
      })
    },
  },

  mounted() {
    this.adminGetAllUserByPageAndCreateTime(1)
    this.getUserPermissionByUserId();
  }
}
</script>
<style scoped>
.mainTop {
  /*display: flex;*/
  /*margin-top: 10px;*/
  /*margin-bottom: 10px;*/
}

.userInfoManageFont {
  /*margin-left: 30px;*/
}

.userSearch {
  display: flex;
  margin-top: 20px;
}

.userInfoSearchTimeSelect {
  display: flex;
  /*margin-left: 100px;*/
}

.userInfoSearchTimeSelectButton {
  margin-left: 10px;
}

.userInfoSearchInput {
  display: flex;
  margin-left: 180px;
}

.userInfoSearchInput > ::v-deep(.el-input__inner) {
  width: 270px;
}

.userInfoSearchInputButton {
  margin-left: 10px;
}

.addUser {
  margin-left: 270px;
}


.el-form {
  width: 500px;
}

.mainTable {
  margin-top: 20px;
}

.pagination {
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>