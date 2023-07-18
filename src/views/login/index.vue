<template>
  <div class="login-container">
    <div class="login-wrapper">
      <h1 class="login-title">Vue3 Element Admin</h1>
      <el-form class="login-form" ref="loginFormRef" :model="loginData" label-position="top" :rules="loginRules">
        <el-form-item prop="username" label="用户名">
          <el-input ref="username" v-model="loginData.username" placeholder="请输入" name="username" />
        </el-form-item>

        <el-tooltip :disabled="isCapslock === false" content="大写锁定已开启" placement="right">
          <el-form-item prop="password" label="密码">
            <el-input
              v-model="loginData.password"
              class="flex-1"
              placeholder="请输入"
              :type="passwordVisible === false ? 'password' : 'input'"
              name="password"
              @keyup="checkCapslock"
              @keyup.enter="handleLogin"
            />
            <span class="show-pwd" @click="passwordVisible = !passwordVisible">
              <svg-icon
                :icon-class="passwordVisible === false ? 'eye' : 'eye-open'"
                class="text-white cursor-pointer"
              />
            </span>
          </el-form-item>
        </el-tooltip>

        <!-- 验证码 -->
        <el-form-item prop="verifyCode" label="验证码">
          <el-input
            v-model="loginData.verifyCode"
            auto-complete="off"
            placeholder="请输入"
            class="w-60"
            @keyup.enter="handleLogin"
          />
          <div class="captcha">
            <img :src="captchaBase64" @click="getCaptcha" />
          </div>
        </el-form-item>

        <el-button :loading="loading" type="primary" class="btn-login" @click.prevent="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import SvgIcon from '@/components/SvgIcon/index.vue'

// 状态管理依赖
import { useUserStore } from '@/store/modules/user'

// API依赖
import { LocationQuery, LocationQueryValue, useRoute } from 'vue-router'
import { getCaptchaApi } from '@/api/auth'
import { LoginData } from '@/api/auth/types'

const userStore = useUserStore()
const route = useRoute()

// 按钮 loading
const loading = ref(false)
// 是否大写锁定
const isCapslock = ref(false)
// 密码是否可见
const passwordVisible = ref(false)
// 验证码图片Base64字符串
const captchaBase64 = ref()
// 登录表单引用
const loginFormRef = ref(ElForm)
// 登录form
const loginData = ref<LoginData>({
  username: 'admin',
  password: '123456'
})
// 登录验证
const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { required: true, trigger: 'blur', validator: passwordValidator }
  ],
  verifyCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
}
// 密码校验器
function passwordValidator(rule: any, value: any, callback: any) {
  if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else {
    callback()
  }
}
// 检查输入大小写状态
function checkCapslock(e: any) {
  const { key } = e
  isCapslock.value = key && key.length === 1 && key >= 'A' && key <= 'Z'
}

// 获取验证码
function getCaptcha() {
  getCaptchaApi().then(({ data }) => {
    const { verifyCodeBase64, verifyCodeKey } = data
    loginData.value.verifyCodeKey = verifyCodeKey
    captchaBase64.value = verifyCodeBase64
  })
}

// 登录
function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      userStore
        .login(loginData.value)
        .then(() => {
          const query: LocationQuery = route.query

          const redirect = (query.redirect as LocationQueryValue) ?? '/'

          const otherQueryParams = Object.keys(query).reduce((acc: any, cur: string) => {
            if (cur !== 'redirect') {
              acc[cur] = query[cur]
            }
            return acc
          }, {})

          router.push({ path: redirect, query: otherQueryParams })
        })
        .catch(() => {
          // 验证失败，重新生成验证码
          getCaptcha()
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}

onMounted(() => {
  getCaptcha()
})
</script>

<style lang="scss" scoped>
.w-60 {
  width: 60%;
}
.login-container {
  overflow: hidden;
  height: 100%;
  padding: 0 16px;
  background-color: #f4f7fa;
  background-image: url('@/assets/images/bg-login.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 100%;
  .login-wrapper {
    margin: 15vh auto 0;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
    width: 380px;
    background-color: #fff;
    padding: 46px;
    .login-title {
      color: var(--el-color-primary);
      font-size: 20px;
      letter-spacing: 2px;
      margin-bottom: 20px;
      text-align: center;
    }
    .login-form {
      position: relative;
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 0px;
        font-size: 14px;
        color: #b3b3b7;
        cursor: pointer;
        user-select: none;
      }
      .captcha {
        position: absolute;
        right: -7px;
        top: -2px;
        height: 36px;
      }
      .btn-login {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}

:deep(.el-form-item__label:before) {
  content: '' !important;
}
</style>
