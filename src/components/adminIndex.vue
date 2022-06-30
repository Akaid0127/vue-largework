<template>
  <div class="admin-top">
    <el-button type="info" plain class="backButton"  @click="show('adminLogin')">返回登录</el-button>
    <el-button type="info" plain class="backUserButton"  @click="show('userLogin')">用户登录</el-button>
  </div>

  <div class="admin-center">
    <div class="admin-left">

      <el-button type="primary" plain class="searchButton" @click="dialogTableVisible = true">搜索用户</el-button>
      <el-dialog v-model="dialogTableVisible" title="搜索用户">
        <el-table :data="gridData">
          <el-table-column property="id" label="ID" width="150" />
          <el-table-column property="name" label="姓名" width="150" />
          <el-table-column property="mail" label="邮箱" width="200" />
          <el-table-column property="pwd" label="密码" width="150" />
          <el-table-column property="bal" label="余额" width="200" />
        </el-table>
      </el-dialog>

      <!-- Form -->
      <el-button type="primary" plain class="addButton" @click="dialogFormVisible = true">添加用户</el-button>

      <el-dialog v-model="dialogFormVisible" title="添加用户" width="35%">
        <el-form :model="form">
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="form.id" autocomplete="off" />
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.mail" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.pwd" autocomplete="off" />
          </el-form-item>
          <el-form-item label="余额" :label-width="formLabelWidth">
            <el-input v-model="form.bal" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确认</el-button>
      </span>
        </template>
      </el-dialog>
      <br>



      <el-button class="checkButton" type="primary" style="margin-left: 16px" @click="drawer = true">
        检测js中数据
      </el-button>
      <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <span>{{msg}}</span>
      </el-drawer>

    </div>

    <div class="admin-right" >
      <el-input class="searchInput" v-model="input1" placeholder="Please input">
        <template #prepend>关键字搜索</template>
      </el-input>

      <br>
      <br>
      <br>
      <el-table :data="tableData" style="width: 100%" height="91%">
        <el-table-column fixed prop="id" label="用户ID" width="200" />
        <el-table-column prop="name" label="姓名" width="200" />
        <el-table-column prop="mail" label="邮箱" width="300" />
        <el-table-column prop="pwd" label="密码" width="300" />
        <el-table-column prop="bal" label="余额" width="200" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="changeClick">修改</el-button>
            <el-button link type="primary" size="small" @click="deleteClick">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <div class="admin-bottom">
  </div>
</template>


<script scope>
export default {
  name: 'adminIndex',
  methods: {
    show(index) {
      if(index === 'adminLogin') {
        this.$router.push('/adminLogin')
      }
      if(index === 'userLogin') {
        this.$router.push('/login')
      }
    }
  },
}
</script>
<script setup scope>
import { reactive, ref } from 'vue'

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const drawer = ref(false)

//这里是搜索输入框的内容
const input1 = ref('')

//添加用户提交的表单的内容
const form = reactive({
  id: '',
  name: '',
  mail: '',
  pwd: '',
  bal: '',
})

//根据搜索输入框内容进行模糊搜索得到的结果
const gridData = [
  {
    id: '100001',
    name: 'Tom',
    mail: '1255163756@qq.com',
    pwd: '123456778',
    bal: '10000000000',
    tag: 'Home',
  },
  {
    id: '100001',
    name: 'Tom',
    mail: '1255163756@qq.com',
    pwd: '123456778',
    bal: '10000000000',
    tag: 'Home',
  },
  {
    id: '100001',
    name: 'Tom',
    mail: '1255163756@qq.com',
    pwd: '123456778',
    bal: '10000000000',
    tag: 'Home',
  },
]

//修改功能
const changeClick = () => {
  console.log('click')
}
//删除功能
const deleteClick = () => {
  console.log('click')
}

//所有用户信息展示
const tableData = [
  {
    id: '100001',
    name: 'Tom',
    mail: '1255163756@qq.com',
    pwd: '123456778',
    bal: '10000000000',
    tag: 'Home',
  },
]

//可以在这里修改后台传过来需要检测的内容
const msg = ref("需要检测的内容");
</script>

<style scoped>
body {
  background-size:cover;
  background: url("../images/background01.png") no-repeat fixed center top;
}

.admin-top{
  position: absolute;
  top: 2%;
  left: 2%;
  background-color: rgba(255,255,255,0.2);
  width: 95%;
  height: 13%;
  float: left;
  margin: 5px;
  border-radius: 10px;
}
.backButton{
  position: absolute;
  top: 10%;
  right: 4%;
}
.backUserButton{
  position: absolute;
  top:50%;
  right: 4%;
}

.admin-center{
  position: absolute;
  top: 18%;
  left: 2%;
  background-color: rgba(255,255,255,0.2);
  width: 95%;
  height: 72%;
  float: left;
  margin: 5px;
  border-radius: 10px;

}

.admin-left{
  position: absolute;
  top: 2%;
  left: 1%;
  background-color: rgba(255,255,255,0.5);
  width: 12%;
  height: 93%;
  float: left;
  margin: 5px;
}
.addButton{
  position:absolute;
  left: 15%;
  top:5%;
  width: 70%;
  height: 8%;
}
.searchButton{
  position:absolute;
  left: 15%;
  top:15%;
  width: 70%;
  height: 8%;
}
.checkButton{
  position:absolute;
  left: 7%;
  top:25%;
  width: 70%;
  height: 8%;
}



.dialog-footer button:first-child {
  margin-right: 10px;
}

.admin-right{
  position: absolute;
  top: 2%;
  left: 15%;
  background-color: rgba(255,255,255,0.5);
  width: 82%;
  height: 93%;
  float: left;
  margin: 5px;
}

.searchInput{
  position: absolute;
  top: 2%;
  left: 0;
}


</style>