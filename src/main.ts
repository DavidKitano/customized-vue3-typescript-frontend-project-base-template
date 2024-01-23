import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import _ from 'lodash'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'

// 解决ResizeObserver loop limit exceeded
const oldResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends oldResizeObserver {
  constructor(callback: any) {
    callback = _.debounce(callback, 16)
    super(callback)
  }
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(_)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
