<template>
  <div class="userRegister">
    <div class="login-box3">
      <h1>用户注册</h1>
      <div class="form">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="age">
            <el-input v-model.number="ruleForm.mail"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model.number="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="buttonLogin">
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button type="primary" @click="submitForm(ruleForm)">注册</el-button>
            </div>

          </el-form-item>
        </el-form>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: "userRegister",
  data() {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'));
        } else {
          callback();
        }
      }, 1000);
    };
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    //注册用户表单
    return {
      ruleForm: {
        mail: '',
        name: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        mail: [
          { validator: checkAge, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    show(index) {
      if(index === 'userRegister') {
        this.$router.push('/userRegister')
      }
      if(index === 'adminLogin') {
        this.$router.push('/adminLogin')
      }
    },
    async submitForm(ruleForm) {
      alert(this.$cookies.keys())
      const phone = ruleForm.mail;
      const name = ruleForm.name;
      const password = ruleForm.pass;
      const repeat_password = ruleForm.checkPass;


      if (repeat_password !== password)
        throw new Error("Password does not match.");

      const duplicate = await fetch(`http://127.0.0.1:8000/users_by_phone/${phone}`)
          .then(response => response.json())
          .then(data => {
            return data['id'];
          });
      if (duplicate)
        throw new Error('Phone has been registered.');

      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'phone': phone,
          'password': password,
          'name': name
        })
      }
      const id = await fetch(`http://127.0.0.1:8000/users/`, init)
          .then(response => response.json())
          .then(data => {
            return data['id'];
          });
      this.$cookies.set("id", id);  //return this
      alert("注册成功")
      await this.$router.push('/login');

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
body {
  background-size:cover;
  background: url("../images/background01.png") no-repeat fixed center top;
}

.login-box3 {
  position:relative;
  left: 30%;
  width: 30%;
  height: auto;
  margin-top: 15%;
  text-align: center;
  background-color: rgba(255,255,255,0.2);
  padding: 20px 50px;
}

.login-box3 h1 {
  color: white;
}


</style>
