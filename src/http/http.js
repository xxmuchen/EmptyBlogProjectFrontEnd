import axios from 'axios'
import {ElLoading, ElMessageBox} from 'element-plus';   /*elementUI的loading*/
import {ElMessage} from 'element-plus';   /*elementUI消息提醒*/
/*import { Message,Loading } from 'element-ui';  也可以这样解构赋值*/
import router from '../router/index'
import JSON_BIG from "json-bigint";


axios.defaults.transformResponse = (data => {

    // 对data（后台的原始数据）进行转换
    try {
        return JSON_BIG.parse(data)
    } catch (e) {
        return data
    }

})


let loading;

function startLoading() {
    loading = ElLoading.service({    /*在需要调用时：*/
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0,7)'
    });
}

function endLoading() {
    loading.close();
}

//请求拦截
axios.interceptors.request.use(config => {
    //加载动画
    startLoading();

    /*判断token存在   登录拦截*/
    if (localStorage.eleToken) {
        /*设置统一的header*/
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

//响应拦截
axios.interceptors.response.use(Response => {
    //结束加载动画
    endLoading();
    // eslint-disable-next-line no-debugger
    // debugger
    return Response;
}, error => {
    //错误提醒
    // eslint-disable-next-line no-debugger
    // debugger
    // eslint-disable-next-line no-debugger
    // debugger
    endLoading();
    console.log(error.response.data)
    ElMessage.error(error.response.data);
    // console.log(error + "王程翔")
    /*获取错误状态码*/
    const status = error.response.data.message;
    console.log(status)
    if (status === '401') {
        ElMessage.error("token失效，重新登录");
        /*清楚token*/
        localStorage.removeItem('eleToken');
        ElMessageBox.confirm(
            '尊敬的用户，您的登录信息已失效，请问是否重新登陆?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        ).then(() => {
                /*跳转登录*/
                router.push({name: 'UserLoginPage'})
                ElMessage({
                    type: 'success',
                    message: '即将为您跳转到登陆页面'
                })
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '登陆取消'
                })
            })
    }
    return Promise.reject(error);
})

axios.defaults.baseURL = 'http://localhost:8081/api/'
// axios.defaults.transformResponse = [data => {
//     try{
//         return JSON_BIG.parse(data)
//     }catch (err) {
//         return {
//             data
//         }
//     }
// }]


export default axios;