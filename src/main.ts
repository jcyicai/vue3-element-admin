import { createApp } from 'vue'
import './style.css'
import 'uno.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router'
// 本地SVG图标
import 'virtual:svg-icons-register'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router).mount('#app')
