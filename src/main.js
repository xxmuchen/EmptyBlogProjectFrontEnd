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



import axios from "@/http/http";

import store from '@/store/index'
import mitt from "mitt";
import * as echarts from 'echarts'
// import wangEditor from "wangeditor/src/wangEditor";



const app = createApp(App)

app.config.globalProperties.$echarts = echarts

app.config.globalProperties.$axios = axios;
// app.config.globalProperties.$axios = axios;
// app.use(axios)

// 使用配置的路由
app.use(routerIndex)

app.use(store)

app.use(vue3videoPlay)

app.use(ElementPlus)

app.config.globalProperties.$bus = new mitt()
//在组件A中使用事务总线触发某个动作
// this.$bus.emit("EVENTTYPE");
//
//在组件B中监听动作的发生
// this.$bus.on("EVENTTYPE",()=>{
//     console.log("EVENTTYPE发生了")})
// app.use(wangEditor)

for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
        const item = ElIconModules[iconName]
        app.component(iconName, item)
    }
}

// console.log(app)
app.mount('#app')