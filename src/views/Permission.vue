<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-warn"></i> 权限测试
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h1>管理员权限页面</h1>
            <p>只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
            <p>
                想尝试一下，请
                <router-link to="/login" class="logout">退出登录</router-link>，随便输入个账号名，再进来试试看。
            </p>
        </div>
    </div>
    <div class="container">
        <div class="mgb20">
            <span class="label">角色：</span>
            <el-select v-model="role" @change="handleChange">
                <el-option label="超级管理员" value="admin"></el-option>
                <el-option label="食材管理员" value="user"></el-option>
                <el-option label="供货人员" value="user"></el-option>
            </el-select>
        </div>
        <div class="mgb20 tree-wrapper">
            <el-tree
                    ref="tree"
                    :data="data"
                    node-key="id"
                    default-expand-all
                    show-checkbox
                    :default-checked-keys="checkedKeys"
            />
        </div>
        <el-button type="primary" @click="onSubmit">保存权限</el-button>
    </div>
</template>

<script>

    import {ref} from "@vue/reactivity";
    import { ElTree } from "element-plus";
    const role = ref ('admin');


export default {
    name: "permission"

};

</script>

<style scoped>
h1 {
    text-align: center;
    margin: 30px 0;
}
p {
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.logout {
    color: #409eff;
}
</style>
