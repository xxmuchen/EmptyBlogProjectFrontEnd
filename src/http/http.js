import axios from 'axios'
import { ElLoading } from 'element-plus';   /*elementUI的loading*/
import { ElMessage } from 'element-plus';   /*elementUI消息提醒*/
/*import { Message,Loading } from 'element-ui';  也可以这样解构赋值*/
import router from '../router/index'


let loading;
function startLoading () {
    loading = ElLoading.service({    /*在需要调用时：*/
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0,7)'
    });
}

function endLoading () {
    loading.close();
}

//请求拦截
axios.interceptors.request.use(config => {
    //加载动画
    startLoading();
    /*判断token存在   登录拦截*/
    if(localStorage.eleToken){
        /*设置统一的header*/
        config.headers.Authorization  = localStorage.eleToken;
    }
    return config;
},error => {
    return Promise.reject(error);
});

//响应拦截
axios.interceptors.response.use(Response => {
    //结束加载动画
    endLoading();
    return Response;
},error => {
    //错误提醒
    endLoading();
    ElMessage.error(error.response.data);

    /*获取错误状态码*/
    const  { status } =error.response;
    if(status == 401){
        ElMessage.error("token失效，重新登录");
        /*清楚token*/
        localStorage.removeItem('eleToken');
        /*跳转登录*/
        router.push('/')
    }

    return Promise.reject(error);
})




export default axios;