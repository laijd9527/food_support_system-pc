//导入请求封装函数
import request from '../utils/request';
//获取表格数据
// export const fetchData=(params)=>request.get('./table.json', params)

export const getUserRole=(params)=>request.post('/user/getUserRole',params)
//系统接口
//登录
// export const login = (params) => request.post('/user/login', params)
export const loginout = (params) => request.post('/loginout',params)

//用户数量接口
export const getUserNum=(params)=>request.post('/user/getUserCount',params)
//获得所有用户接口
export const getAllUser = (params) => request.post('user/getAllUser', params)
//食材数量接口
export const getFoodNum=(params)=>request.post('/food/getFoodCount',params)


export const fetchData = query => {
    return request({
        url: '../table.json',
        method: 'get',
        params: query,
        headers: {
            'Content-Type': 'application/json'
        },
        baseURL:''
    });
};


