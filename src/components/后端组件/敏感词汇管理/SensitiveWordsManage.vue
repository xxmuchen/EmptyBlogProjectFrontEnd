<template>
  <div>
    <div class="mainTop">

        <div class="userInfoManageFont">敏感词管理</div>
      <div class="addSensitiveWords">
        <el-button type="primary" @click="dialogFormVisible = true">新增敏感词</el-button>
      </div>

    </div>
    <div class="mainTable">
      <div>
        <el-table
            ref="singleTableRef"
            :data="tableData"
            highlight-current-row
            style="width: 100%"
            @row-dblclick="handleWatch"
        >
          <el-table-column type="index" width="50"/>
          <el-table-column property="sensitiveWord" label="敏感词" width="360"/>
          <el-table-column property="authorName" label="上传者" width="300"/>
          <el-table-column property="createTime" label="上传时间" width="300"/>
          <el-table-column fixed="right" label="Operations">
            <template #default="scope">
<!--              <el-button size="default" @click="handleWatch(scope.row)">查看</el-button>-->
              <el-button
                  size="default"
                  type="danger"
                  @click="deleteSensitiveWords(scope.row)"
              >删除
              </el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog title="新增敏感词" v-model="dialogFormVisible">
          <el-form v-model="ruleForm">
            <el-form-item label="敏感词名称" :label-width="formLabelWidth">
              <el-input v-model="ruleForm.sensitiveWord" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false;ruleForm.sensitiveWord=''">取 消</el-button>
            <el-button type="primary" @click="confirmAddSensitiveWord()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import {ElMessage} from "element-plus";

  export default {
    name: 'SensitiveWordsManage',
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        ruleForm: {
          sensitiveWord: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      confirmAddSensitiveWord() {
        axios.post("/addSensitiveWord" , {
          sensitiveWord: this.ruleForm.sensitiveWord
        }).then(response => {
          if (response.data) {
            ElMessage.success("敏感词保存成功")
            this.getAllSensitiveWords()
          }else {
            ElMessage.error("很报错，敏感词保存失败");
          }
        })
      },
      getAllSensitiveWords() {
          axios.get("/getAllSensitiveWords").then(response => {
            this.tableData = response.data
          })
      },
      deleteSensitiveWords(row) {
        // console.log(row)
        axios.delete('/deleteSensitiveWords?sensitiveWordId=' + row.id).then(response => {
          if (response.data) {
            ElMessage.success("敏感词删除成功")
            this.getAllSensitiveWords()
          }else {
            ElMessage.success("敏感词删除失败")
          }
        })
      }
    },
    mounted() {
      this.getAllSensitiveWords()
    }
  }
</script>
<style scoped>
.mainTop {
  display: flex;
  /*margin-top: 10px;*/
  /*margin-bottom: 10px;*/
}
.addSensitiveWords {
  margin-left: 1000px;
}
.userInfoManageFont {
  /*margin-left: 30px;*/
}

.userSearch {
  display: flex;
  margin-top: 20px;
}

.diaryState .el-button {
  margin-left: 30px;
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
  margin-left: 560px;
}

::v-deep(.el-input__inner) {
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