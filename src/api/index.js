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




//管理员接口
//获取用户信息
// export const getAdminInfo = (params) => request.post('/getInfo', params)
// //修改用户信息
// export const updateAdminInfo = (params) => request.post('/updateInfo', params)
// //上传头像
// export const uploadImg=(params)=>request.post('/uploadImg',params)
//
// //用户接口
// //获得所有用户信息
// export const getAllUserInfo=(params)=>request.post('/user/getAll',params)
// //修改用户信息
// export const updateUserInfo=(params)=>request.post('/user/update',params)
// //删除用户
// export const deleteUser=(id)=>request.get(`/user/delete/${id}`)
//
// //课程接口
// //获得所有课程信息
// export const getAllCourseInfo=(params)=>request.post('/course/getAll',params)
// //修改课程信息
// export const updateCourseInfo=(params)=>request.post('/course/update',params)
// //查询课程信息(cid)
// export const getCourseByCid=(params)=>request.post('/course/getCourseByCid',params)
// //查询课程信息(oid)
// export const getCourseByOid=(params)=>request.post('/course/getCourseByOid',params)
// //删除课程
// export const deleteCourse=(id)=>request.get(`/course/delete/${id}`)
//
// //订单接口
// //获得所有订单信息
// export const getAllOrderInfo=(params)=>request.post('/order/getAll',params)
// //删除课程
// export const deleteOrder=(id)=>request.get(`/order/delete/${id}`)
//
// //审核接口
// //获得所有审核信息
// export const getAllAuditInfo=(params)=>request.post('/audit/getAll',params)
// //修改审核状态
// export const updateAuditInfo=(params)=>request.post('/audit/update',params)
//
// //公告接口
// //获得所有审核信息
// export const getAllAdverInfo=(params)=>request.post('/adver/getAll',params)
// //修改课程信息
// export const updateAdverInfo=(params)=>request.post('/adver/update',params)
// //上传广告图
// export const uploadAdverimg=(params)=>request.post('/adver/uploadimg',params)
//
// //日志接口
// //获得所有日志信息
// export const getAllSyslogInfo=(params)=>request.post('/syslog/getAll',params)
//
// //首页数据
// //获得首页数据
// export const getHomeData=(params)=>request.post('/home/getData',params)


