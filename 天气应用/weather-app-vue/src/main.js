import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(ElMessage).mount('#app')
