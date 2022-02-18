// import { createApp } from 'vue'
import { createStore } from 'vuex'


const types ={
    SET_AUTHENTICATED: 'SET_AUTHENTICATE',
    SET_USER: 'SET_USER',
};

// 创建一个新的 store 实例
export default createStore({
    state () {
        return {
            isAuthenticated: false,
            user: {}
        }
    },
    mutations: {
        [types.SET_AUTHENTICATED](state,isAuthenticated){      /*设置是否授权*/
            if(isAuthenticated) state.isAuthenticated = isAuthenticated;
            else state.isAuthenticated = false;
        },
        /*类型，参数*/
        [types.SET_USER](state,user){
            if (user) state.user = user;
            else state.user = {};
        }
    },
    getters: {
        isAuthenticated: state =>state.isAuthenticated,
        user: state => state.user
    },
    actions: {
        setAuthenticated:( {commit},isAuthenticated) =>{
            commit(types.SET_AUTHENTICATED,isAuthenticated);
        },
        setUser:({commit},user) =>{
            commit(types.SET_USER,user);
        }
    }
})

// export default createApp({
//     state,
//     getters,
//     mutations,
//     actions
// })

// 将 store 实例作为插件安装
// app.use(store)