import axios from "axios";
import router from "../router";
import {ElMessage} from "element-plus";
//axios实例
const instance = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    },
})
//请求拦截器
instance.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})
//响应拦截器
instance.interceptors.response.use(res => {
    // if(res.data.data=='登录已过期'){
    //     localStorage.removeItem('token');
    //     localStorage.setItem('sTime',localStorage.getItem('zTime'));
    //     localStorage.removeItem('zTime');
    //     router.replace({
    //         path: '/login'
    //     })
    //     ElMessage.error('登录已过期,请重新登录');
    // }
    return res
}, err => {
    console.log(err)
    if(err=='Error: Network Error'){
        console.log('into errerr')
        ElMessage.error('服务器已断开,请联系管理员');
        router.replace({
            path: '/login'
        })
    }
    if(err.response.data.code==400){
            router.replace({
                path: '/login'
            })
            ElMessage.error('登录已过期,请重新登录');
    }
    return Promise.reject(err)
})
//暴露封装的工具
export default instance
