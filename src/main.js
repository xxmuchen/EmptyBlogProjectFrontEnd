import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import './assets/css/global.css'
// 引入路由对象实例
import routerIndex from './router/index'

import './assets/css/fontIcon.css'

import * as ElIconModules from '@element-plus/icons-vue'

// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// // require('vue-video-player/src/custom-theme.css')
// import 'vue-video-player/src/custom-theme.css'
// import 'video.js/dist/video-js.css'

import vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css




const app = createApp(App)



// 使用配置的路由
app.use(routerIndex)



app.use(vue3videoPlay)

app.use(ElementPlus)

for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
        const item = ElIconModules[iconName]
        app.component(iconName, item)
    }
}

app.mount('#app')