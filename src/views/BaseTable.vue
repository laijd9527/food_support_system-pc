<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--第一个表-->
        <div class="container">
            <div class="user">用户列表</div>
            <div class="handle-box">
                <el-input v-model="query.realName" placeholder="姓名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-add"  @click="form">添加用户</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="userId" label="ID"  width="55" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户名"></el-table-column>
                <el-table-column prop="realName" label="姓名"></el-table-column>
                <el-table-column prop="phoneNumber" label="电话"></el-table-column>
                <el-table-column prop="userType" label="用户角色"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>
        <!--弹出添加用户框-->

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.realName"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="用户角色">
                    <el-input v-model="form.userType"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../api/index";
import {getAllUser} from "../api/index";

export default {
    name: "basetable",
    setup() {
        //查询
        const query = reactive({
            realName: "",
            pageIndex: 1,
            pageSize: 10,

        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const getData = () => {
            getAllUser().then((res) => {
                tableData.value = res.data.data;
                console.log(res)
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();
        // 查询操作
        const handleSearch = () => {
            query.pageIndex = 1;
            //getData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData();
        };
        // 删除操作
        const handleDelete = (index) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    ElMessage.success("删除成功");
                    tableData.value.splice(index, 1);
                })
                .catch(() => {});
        };
        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            userName: "",
            realName: "",
            phoneNumber:"",
            userType: "",

        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
            ElMessage.success(`修改第 ${idx + 1} 行成功`);
            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
            });
        };

        return {
            query,
            tableData,
            pageTotal,
            editVisible,
            form,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
        };
    },
};
</script>



<style scoped>
.user{
    margin-bottom: 10px;
    color: #151515;
}
.foodManager{
    margin-bottom: 10px;
    color: #151515;
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
