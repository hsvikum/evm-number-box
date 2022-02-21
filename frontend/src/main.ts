import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueToast from 'vue-toast-notification';

import App from './App.vue'
import './index.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueToast).provide('toast', app.config.globalProperties.$toast)
app.mount('#app')
