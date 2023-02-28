//导入请求封装函数
import request from '../utils/request';

//系统接口
export const loginout = (params) => request.post('/loginout',params)

//用户数量接口
export const getUserNum=(params)=>request.post('/user/getUserCount',params)
//食材数量接口
export const getFoodNum=(params)=>request.post('/food/getFoodCount',params)
//商家数量接口
export const getSupplyCount=(params)=>request.post('/supply/getSupplyCount',params)

//获得所有用户接口
export const getAllUser = (params) => request.post('/user/getAllUser', params)
//查询所有食材管理员信息接口
export const getAllManager=(params)=>request.post('/foodManager/getAllManager',params)
//查询所有供货人信息接口
export const getAllSupplier=(params)=>request.post('/supplier/getAllSupplier',params)
//查询所有供应商接口
export const getAllSupply=(params)=>request.post('/supply/getAllSupply',params)
//查询所有食材接口
export const getAllFood=(params)=>request.post('/food/getAllFood',params)
//查询所有下次供应的食材接口
export const nextSupply=(params)=>request.post('/nextSupply/getAllNextSupply',params)


