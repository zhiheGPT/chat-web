<template>
  <div class="loginBox">
    <img src="@/assets/logo.png" class="logo" />
    <div class="login_content">
      <div class="hello">知盒慧答 - 打造企业专属知识大脑</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="50"
        label-position="top"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            class="h-45"
            type="name"
            v-model.number="ruleForm.username"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            class="h-45"
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            @keyup.enter="submit(ruleFormRef)"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            v-loading="loading"
            type="primary"
            @click.enter="submit(ruleFormRef)"
            class="w-full login-btn"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册 -->
    <p class="agreement ml10">
      我已阅读并接受
      <span class="content cursor-p" @click="showAgreement(1)">
        《知盒用户协议》
      </span>
      <span class="content cursor-p" @click="showAgreement(2)">
        《隐私协议》
      </span>
    </p>
    <Agreement ref="agreementRef"></Agreement>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import Agreement from './agreement.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const router = useRouter()
const agreementRef = ref()

// 表单信息
const ruleForm = reactive({
  username: '',
  password: ''
})

const ruleFormRef = ref()

onMounted(() => {})

const rules = reactive({
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'change'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'change'
  }
})

// 登录按钮
const submit = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      await userStore.login({
        ...ruleForm,
        code: '7',
        uuid: '4682a019706c47e28b77f0e680415d83'
      })
      router.push('/chat')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const showAgreement = (type) => {
  agreementRef.value.show(type)
}
</script>

<style lang="scss" scoped>
.loginBox {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/bg.png');
  background-size: cover;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  .logo {
    margin-bottom: 45px;
    width: 140px;
    height: 30px;
  }
  .login_content {
    background: #fff;
    box-sizing: border-box;
    padding: 40px 80px;
    font-weight: 800;
    color: #333333;
    line-height: 18px;
    border-radius: 4px;
    width: 480px;
    height: 398px;
    .hello {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    .el-form {
      width: 100%;
      .el-form-item {
        margin-bottom: 18px;
        align-items: center;
      }
      p {
        text-align: center;
        color: $light-color-primary;
      }
    }
    .login-btn {
      height: 45px;
      background: linear-gradient(90deg, #1275f3, #246de5);
      border-radius: 4px;
    }
  }
  .agreement {
    text-align: center;
    position: absolute;
    bottom: 50px;
    .content {
      color: $light-color-primary;
    }
  }
}
:deep(.el-form-item) {
  &.is-required {
    .el-form-item__label:before {
      content: '' !important;
    }
  }
}
</style>
