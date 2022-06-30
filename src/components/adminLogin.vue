<template>
  <div>
    <div class="login-box2">
      <h1>管理员登录</h1>
      <div class="form">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="age">
            <el-input v-model.number="ruleForm.mail"></el-input>
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
              <el-button type="primary" @click="submitForm(ruleForm)">登录</el-button>
            </div>
            <br>
            <br>
          </el-form-item>
        </el-form>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'adminLogin',
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

    //管理员登录表单
    return {
      ruleForm: {
        mail: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        mail: [
          {validator: checkAge, trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    show(index) {
      if (index === 'userRegister') {
        this.$router.push('/userRegister')
      }
      if (index === 'adminLogin') {
        this.$router.push('/adminLogin')
      }
    },
    async submitForm(ruleForm) {
      this.$cookies.set("id", 1);  //return this

      const phone = ruleForm.mail;
      const password = ruleForm.pass;

      const id = await fetch(`http://127.0.0.1:8000/admins_by_phone/${phone}`)
          .then(response => response.json())
          .then(data => {
            return data['id'];
          });
      console.log(id)
      if (typeof id === 'undefined') {
        throw new Error("User does not exist.");
      }
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'phone': phone,
          'password': password
        })
      }
      const ret = await fetch(`http://127.0.0.1:8000/sessions/`, init)
          .then(response => response.json())
          .then(data => {
            return data['ok'];
          });
      if (ret) {
        if (ret === "admin") {
          alert("登录成功")
          this.$router.push('/adminIndex');
        } else {
          throw new Error("Wrong password.");
        }
      } else {
        throw new Error("POST ERROR.");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
body {
  background-size: cover;
  background: url("../images/background01.png") no-repeat fixed center top;
}

.login-box2 {
  position: relative;
  left: 30%;
  width: 30%;
  height: auto;
  margin-top: 15%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px 50px;
}

.login-box2 h1 {
  color: white;
}


</style>