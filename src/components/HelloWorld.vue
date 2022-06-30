<template>
  <div class="userLogin">
    <div class="login-box">
      <h1>用户登录</h1>
      <div class="form">

        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="手机" prop="age">
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
          </el-form-item>
        </el-form>
      </div>
      <br>
      <br>
      <el-button @click="show('userRegister')">新用户注册</el-button>
      <el-button @click="show('adminLogin')">管理员登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
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
    //用户登录表单
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

      const id = await fetch(`http://127.0.0.1:8000/users_by_phone/${phone}`)
          .then(response => response.json())
          .then(data => {
            return data['id'];
          });
      if (!id) {
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
            // console.log(data['ok']);
            return data['ok'];
          });
      if (ret === "user") {
        alert("登录成功")
        this.$router.push('/userIndex');
      } else {
        alert("手机号或密码错误")
        throw new Error("Wrong password.");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },

}
</script>

<style>
body {
  background-size: cover;
  background: url("../images/background01.png") no-repeat fixed center top;
}

.login-box {
  position: relative;
  left: 30%;
  width: 30%;
  height: auto;
  margin-top: 15%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px 50px;
}

.login-box h1 {
  color: white;
}

.buttonLogin {
  position: absolute;
  top: 30%;
  width: 75%;
}

</style>