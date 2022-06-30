<template>
  <div class="userIndex-top">
    <el-button type="info" plain class="backButton" @click="show('userLogin')">注销退出</el-button>
  </div>

  <div class="userIndex-center">

    <div class="userIndex-left">
      <!-- Form -->
      <el-button type="primary" plain class="tranButton" @click="dialogFormVisibleTran = true">转账他人</el-button>

      <el-dialog v-model="dialogFormVisibleTran" title="进行转账">
        <el-form :model="formTran">
          <el-form-item label="转账账号" :label-width="formLabelWidth">
            <el-input v-model="formTran.tranMail" autocomplete="off"/>
          </el-form-item>

          <el-form-item label="转账金额" :label-width="formLabelWidth">
            <el-input v-model="formTran.tranMoney" autocomplete="off"/>
          </el-form-item>

        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisibleTran = false">取消</el-button>
        <el-button type="primary" @click="onSubmitTran(formTran);dialogFormVisibleTran = false">确认</el-button>

      </span>
        </template>
      </el-dialog>

      <!-- Form -->
      <el-button type="primary" plain class="pwdButton" @click="dialogFormVisiblePwd = true">修改密码</el-button>

      <el-dialog v-model="dialogFormVisiblePwd" title="修改密码">
        <el-form :model="formPwd">
          <el-form-item label="请输入原密码" :label-width="formLabelWidth">
            <el-input v-model="formPwd.oldPwd" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="请输入新密码" :label-width="formLabelWidth">
            <el-input v-model="formPwd.newPwd" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="请再次输入新密码" :label-width="formLabelWidth">
            <el-input v-model="formPwd.newPwdAgain" autocomplete="off"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisiblePwd = false">取消</el-button>
        <el-button type="primary" @click="onSubmitPwd(formPwd);dialogFormVisiblePwd = false">确认</el-button>
      </span>
        </template>
      </el-dialog>

      <el-button class="checkButton" type="primary" style="margin-left: 16px" @click="drawer = true">
        检测js中数据
      </el-button>
      <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <span>{{ msg }}</span>
      </el-drawer>

    </div>

    <div class="userIndex-right">
      <div class="infoShowDiv">
        <el-descriptions
            class="margin-top"
            title="用户信息"
            :column="3"
            :size="size"
            border
        >
          <template #extra>
            <el-button type="primary" @click="upLoadUserInfo">更新</el-button>
          </template>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <user/>
                </el-icon>
                用户ID
              </div>
            </template>
            <span id="userIdInfo">{{ msgId }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone/>
                </el-icon>
                用户姓名
              </div>
            </template>
            <span id="userNameInfo">{{ msgName }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <location/>
                </el-icon>
                用户金额
              </div>
            </template>
            <span id="userIdInfo">{{ msgBalance }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <tickets/>
                </el-icon>
                用户状态
              </div>
            </template>
            <el-tag size="small">online</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <office-building/>
                </el-icon>
                用户邮箱
              </div>
            </template>
            1255163756@qq.com
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="moneyInDiv">
        <div class="outTitle">用户取款</div>
        <div class="outForm">
          <el-form :inline="true" :model="formInlineOut" class="demo-form-inline">
            <el-form-item label="自定义金额">
              <el-input v-model="formInlineOut.outMoney" placeholder="请输入金额"/>
            </el-form-item>
            <el-form-item label="固定金额">
              <el-select v-model="formInlineOut.outMoneyFixed" placeholder="500">
                <el-option label="500" value="500"/>
                <el-option label="1000" value="1000"/>
                <el-option label="1500" value="1500"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitOut(formInlineOut)">确认取出</el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>

      <div class="moneyOutDiv">
        <div class="inTitle">用户存款</div>
        <div class="inForm">
          <el-form :inline="true" :model="formInlineIn" class="demo-form-inline">
            <el-form-item label="自定义金额">
              <el-input v-model="formInlineIn.inMoney" placeholder="请输入金额"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitIn(formInlineIn)">确认存入</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>


    </div>
  </div>

  <div class="userIndex-bottom">

  </div>
</template>


<script scope>
export default {
  name: 'userIndex',
  created() {
    fetch(`http://127.0.0.1:8000/users/${this.msgId}`)
        .then(response => response.json())
        .then(data => {
          this.msgName = data['name'];
          this.msgPhone = data['phone'];
          this.msgBalance = data['balance'];
        });
  },
  data() {
    return {
      msgId: this.$cookies.get("id"),
      msgName: "",
      msgPhone: "",
      msgBalance: 0,
    };
  },
  methods: {
    updatePage() {
      fetch(`http://127.0.0.1:8000/users/${this.msgId}`)
          .then(response => response.json())
          .then(data => {
            this.msgName = data['name'];
            this.msgPhone = data['phone'];
            this.msgBalance = data['balance'];
          });
    },

    show(index) {
      if (index === 'userLogin') {
        this.$cookies.remove("id");
        this.$router.push('/login')
      }
    },

    upLoadUserInfo() {

    },

    async onSubmitTran(formTran) {
      const id = this.$cookies.get("id");
      const value = Number(formTran.tranMoney);
      const dst_phone = formTran.tranMail;
      const balance = await fetch(`http://127.0.0.1:8000/users/${id}`)
          .then(response => response.json())
          .then(data => {
            return data['balance'];
          });

      if (value < 0) {
        alert("余额小于0，无法转账")
        return;
      }
      if (value > balance) {
        alert("余额不足，无法转账")
        return;
      }

      let init = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'balance': balance - value
        })
      }
      fetch(`http://127.0.0.1:8000/users/${id}`, init)
          .then(response => response.json())
          .then(data => {
            if (data['ok'] !== true) {
              throw new Error("PATCH ERROR!")
            }
          });

      const [dst_balance, dst_id] = await fetch(`http://127.0.0.1:8000/users_by_phone/${dst_phone}`)
          .then(response => response.json())
          .then(data => {
            return [data['balance'], data['id']];
          });
      init.body = JSON.stringify({
        'balance': dst_balance + value
      })
      fetch(`http://127.0.0.1:8000/users/${dst_id}`, init)
          .then(response => response.json())
          .then(data => {
            if (data['ok'] !== true) {
              throw new Error("PATCH ERROR!")
            }
          });
      alert("转账成功")

      this.updatePage()
    },

    async onSubmitPwd(formPwd) {
      const id = this.$cookies.get("id");
      const old_password = formPwd.oldPwd;
      const new_password = formPwd.newPwd;
      const repeat_password = formPwd.newPwdAgain;

      if (repeat_password !== new_password)
        alert("两次密码输入不一致")
      const phone = await fetch(`http://127.0.0.1:8000/users/${id}`)
          .then(response => response.json())
          .then(data => {
            return data['phone'];
          });

      let init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'phone': phone,
          'password': old_password
        })
      }
      const password_correct = await fetch(`http://127.0.0.1:8000/sessions/`, init)
          .then(response => response.json())
          .then(data => {
            return data['ok'];
          });
      if (password_correct) {
        if (password_correct === false) {
          alert("密码错误")
          throw new Error("Wrong password.")
        }
      } else {
        throw new Error("GET ERROR!")
      }

      init.method = 'PATCH';
      init.body = JSON.stringify({
        'password': new_password
      });
      fetch(`http://127.0.0.1:8000/users/${id}`, init)
          .then(response => response.json())
          .then(data => {
            if (data['ok'] !== true) {
              throw new Error("PATCH ERROR!")
            }
          });
      alert("密码修改成功")

    },

    async onSubmitIn(formInlineIn) {
      alert("提交的存款金额为" + "\n" + "自定义金额" + formInlineIn.inMoney)
      const id = this.$cookies.get("id");
      const valueDeposit = Number(formInlineIn.inMoney);
      const balanceDeposit = await fetch(`http://127.0.0.1:8000/users/${id}`)
          .then(response => response.json())
          .then(data => {
            return data['balance'];
          });
      if (valueDeposit < 0) {
        alert("金额小于0，请重新输入");
        return;
      }

      const init = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'balance': balanceDeposit + valueDeposit
        })
      }
      fetch(`http://127.0.0.1:8000/users/${id}`, init)
          .then(response => response.json())
          .then(data => {
            if (data['ok'] !== true) {
              throw new Error("PATCH ERROR!")
            }
          });
      alert("存款成功")
      this.updatePage()
    },

    async onSubmitOut(formInlineOut) {
      alert("提交的取款金额为" + "\n" + "自定义金额" + formInlineOut.outMoney + "\n" + "固定金额" + formInlineOut.outMoneyFixed);
      const id = this.$cookies.get("id");
      let valueWithdraw;
      if (formInlineOut.outMoney === '') {
        valueWithdraw = formInlineOut.outMoneyFixed;
      } else {
        valueWithdraw = formInlineOut.outMoney;
      }
      valueWithdraw = Number(valueWithdraw);
      if (valueWithdraw < 0) {
        alert("金额小于0，请重新输入");
        return;
      }
      const balanceWithdraw = await fetch(`http://127.0.0.1:8000/users/${id}`)
          .then(response => response.json())
          .then(data => {
            return data['balance'];
          });

      if (valueWithdraw > balanceWithdraw) {
        alert("余额不足，无法取款")
      } else {
        const init = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'balance': balanceWithdraw - valueWithdraw
          })
        }
        fetch(`http://127.0.0.1:8000/users/${id}`, init)
            .then(response => response.json())
            .then(data => {
              if (data['ok'] !== true) {
                throw new Error("PATCH ERROR!")
              }
            });
        alert("取款成功")
      }
      this.updatePage()
    },
  },
  computed: {},
  watch: {},

}
</script>

<script setup scope>
import {reactive, ref} from 'vue'

const dialogFormVisibleTran = ref(false)
const dialogFormVisiblePwd = ref(false)
const formLabelWidth = '140px'
const drawer = ref(false)

//转账提交的表单
const formTran = reactive({
  tranMail: '',
  tranMoney: '',
})
//修改密码提交的表单
const formPwd = reactive({
  oldPwd: '',
  newPwd: '',
  newPwdAgain: '',
})
//取款金额表单
const formInlineOut = reactive({
  outMoney: '',
  outMoneyFixed: '',
})
//存入金额表单
const formInlineIn = reactive({
  inMoney: '',
})


//可以在这里修改后台传过来需要检测的内容
const msg = ref("需要检测的内容");
</script>

<style scoped>
body {
  background-size: cover;
  background: url("../images/background01.png") no-repeat fixed center top;
}

.userIndex-top {
  position: absolute;
  top: 2%;
  left: 2%;
  background-color: rgba(255, 255, 255, 0.2);
  width: 95%;
  height: 13%;
  float: left;
  margin: 5px;
  border-radius: 10px;
}

.backButton {
  position: absolute;
  top: 10%;
  right: 4%;
}


.userIndex-center {
  position: absolute;
  top: 18%;
  left: 2%;
  background-color: rgba(255, 255, 255, 0.2);
  width: 95%;
  height: 72%;
  float: left;
  margin: 5px;
  border-radius: 10px;

}

.userIndex-left {
  position: absolute;
  top: 2%;
  left: 1%;
  background-color: rgba(255, 255, 255, 0.5);
  width: 12%;
  height: 93%;
  float: left;
  margin: 5px;
}

.tranButton {
  position: absolute;
  left: 15%;
  top: 5%;
  width: 70%;
  height: 8%;
}

.pwdButton {
  position: absolute;
  left: 15%;
  top: 15%;
  width: 70%;
  height: 8%;
}

.checkButton {
  position: absolute;
  left: 7%;
  top: 25%;
  width: 70%;
  height: 8%;
}


.userIndex-right {
  position: absolute;
  top: 2%;
  left: 15%;
  background-color: rgba(255, 255, 255, 0.5);
  width: 82%;
  height: 93%;
  float: left;
  margin: 5px;

}

.infoShowDiv {
  position: absolute;
  top: 2%;
  left: 1%;
  width: 98%;
  height: 30%;
  background-color: rgba(255, 255, 255, 0.1);
}

.moneyInDiv {
  position: absolute;
  top: 34%;
  left: 1%;
  width: 98%;
  height: 30%;
  background-color: rgba(255, 255, 255, 0.1);
}

.moneyOutDiv {
  position: absolute;
  top: 66%;
  left: 1%;
  width: 98%;
  height: 30%;
  background-color: rgba(255, 255, 255, 0.1);
}

.outTitle {
  position: absolute;
  top: 1%;
  left: 0;
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: 700;
}

.outForm {
  position: absolute;
  top: 20%;
  left: 0;
}

.inTitle {
  position: absolute;
  top: 1%;
  left: 0;
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: 700;

}

.inForm {
  position: absolute;
  top: 20%;
  left: 0;
}

</style>