import axios from "axios";
import {ElNotification} from "element-plus";

const request = axios.create({
    baseURL: 'http://localhost:8888',  //  注意!!  这里是全局统一加上了  '/api'  前缀,也就是说所有的接口都会加上'/api'前缀名
    timeout: 5000
})

// request( 请求拦截器 )
// 可以在( 请求发送前 )  对请求做一些处理( 比如加上token，对一些参数统一加密 )   箭头函数：config =>{},error =>{}
request.interceptors.request.use( config => {
        return config;
    }, error => {
        return Promise.reject(error);
    }
);

// response( 响应拦截器 )
// 可以在( 响应后 )  统一处理结果    箭头函数：response =>{},error =>{}
request.interceptors.response.use( response => {
        let res = response.data
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }

        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res
    }, error => {
        console.log('err' + error)  // for debug
        if (error.response.status!==200){
            ElNotification({
                type:'error',
                message:'接口异常！'
            })
        }
        return Promise.reject(error);
    }
)
export default request;

