import { defineStore } from 'pinia'
import { loginApi } from '@/api/auth'
import { LoginData } from '@/api/auth/types'

export const useUserStoreHook = defineStore('counter', () => {
  const token = ref('')

  /**
   * 登录调用
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then(response => {
          const { tokenType, accessToken } = response.data
          token.value = tokenType + ' ' + accessToken // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  return { token, login }
})
