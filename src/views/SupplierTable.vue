<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 食材供货员表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input  v-model="query.realName" placeholder="请输入供货人姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-lx-add"  @click="handleAdd">添加供货员</el-button>
      </div>

      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="supplierId" label="ID"  width="55" align="center"></el-table-column>
        <el-table-column prop="supplierName" label="供货人姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="supplierPhonenum" label="供货人电话"></el-table-column>
        <el-table-column prop="supplyName" label="所属供应商"></el-table-column>
        <el-table-column prop="supplyId" label="供应商ID"></el-table-column>
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑弹出框 -->
      <el-dialog title="编辑供货员" v-model="editVisible" width="30%">
        <el-form label-width="110px">
          <el-form-item label="ID">
            <el-input v-model="form.supplierId" placeholder="供货员ID"/>
          </el-form-item>
          <el-form-item label="供货人姓名">
            <el-input v-model="form.supplierName" placeholder="供货员姓名" />
          </el-form-item>
          <el-form-item  label="性别">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option key="man" label="男" value="男"></el-option>
              <el-option key="women" label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供货员电话">
            <el-input v-model="form.supplierPhonenum" placeholder="供货员电话"/>
          </el-form-item>
          <el-form-item label="所属供应商">
            <el-input v-model="form.supplyName"/>
          </el-form-item>
          <el-form-item label="供应商ID">
            <el-input v-model="form.supplyId"/>
          </el-form-item>
          <el-form-item label="用户ID">
            <el-input v-model="form.userId"/>
          </el-form-item>
          <el-form-item  label="状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option key="N" label="未审批" value="0"></el-option>
              <el-option key="Y" label="已审批" value="1"></el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="创建日期">-->
<!--            <el-date-picker-->
<!--                v-model="form.createTime"-->
<!--                type="datetime"-->
<!--                placeholder="请选择日期和时间"-->
<!--            />-->
<!--          </el-form-item>-->
          <el-form-item label="备注">
            <el-input v-model="form.remarks"/>
          </el-form-item>
        </el-form>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
        </template>
      </el-dialog>

      <!--弹出添加新用户框-->
      <el-dialog title="添加供货人信息" v-model="addUserVisible" width="30%">
        <el-form label-width="120px" :model="state.form" :rules="state.rules" ref="ruleFormRef">
          <el-form-item label="ID" prop="supplierId">
            <el-input v-model="state.form.supplierId" placeholder="供货人ID"/>
          </el-form-item>
          <el-form-item label="供货人姓名" prop="supplierName">
            <el-input v-model="state.form.supplierName" placeholder="供货人姓名" />
          </el-form-item>
          <el-form-item  label="性别" prop="sex">
            <el-select v-model="state.form.sex" placeholder="请选择">
              <el-option key="man" label="男" value="男"></el-option>
              <el-option key="women" label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供货人电话" prop="supplierPhonenum">
            <el-input v-model="state.form.supplierPhonenum" placeholder="供货人电话"/>
          </el-form-item>
          <el-form-item label="供应商ID">
            <el-input v-model="state.form.supplyId" placeholder="供应商ID"/>
          </el-form-item>
          <el-form-item label="所属供应商" prop="supplyName">
            <el-input v-model="state.form.supplyName" placeholder="请输入所属供应商名称"/>
          </el-form-item>
          <el-form-item label="用户ID">
            <el-input v-model="state.form.userId" placeholder="用户ID"/>
          </el-form-item>
          <el-form-item  label="状态" prop="status">
            <el-select v-model="state.form.status" placeholder="请选择">
              <el-option key="N" label="未审批" value="0"></el-option>
              <el-option key="Y" label="已审批" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="state.form.remarks"/>
          </el-form-item>
        </el-form>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addUserVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addEdit">确 定</el-button>
                </span>
        </template>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import {ref, reactive, getCurrentInstance} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {getAllSupplier} from "../api/index";
import request from "../request";



export default {
  name: "supplierTable",
  setup() {
    //获取表格数据
    const tableData = ref([]);
    const getData = () => {
      getAllSupplier().then((res) => {
        tableData.value = res.data.data;
        console.log(res)
        //pageTotal.value = res.pageTotal || 50;
      });
    };
    getData();

    //查询操作(未做)
    const query =reactive({
      realName:"",
    })
    const handleSearch=()=>{
      query.pageIndex = 1;
      //getData();
    }

    //编辑用户信息弹窗
    const form = reactive({
      supplierId:"",
      supplierName:"",
      sex:"",
      supplierPhonenum:"",
      supplyName:"",
      supplyId: "",
      userId:"",
      status:"",
      remarks:""
    });

    //点击编辑获取当前行的信息
    const editVisible = ref(false);
    let idx =-1;
    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible.value = true;
    };
    //点击确定保存编辑弹窗
    const saveEdit = () => {
      request.post("/supplier/updateSupplier",form).then((res)=>{
        // debugger
        if (res.code == 200) {
          ElMessage.success("修改信息成功")
          //关闭弹窗
          editVisible.value=false;
          //刷新表格
          getData();
        }
      })
    };

    //删除操作
    const handleDelete = (index, row) => {
      // debugger
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            idx = index;
            Object.keys(form).forEach((item) => {
              form[item] = row[item];
            });
            request.post("/supplier/deleteSupplier",form).then(()=>{
              ElMessage.success("已删除")
              //刷新表格
              getData();
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            })
          })
    };

    //添加用户信息弹窗
    const {proxy}=getCurrentInstance()
    const state=reactive({
      form:{},
      rules:{
        supplierId:[
          { required: true, message: "请输入供货人ID", trigger: "blur"}
        ],
        supplierName: [
          { required: true, message: "请输入供货人姓名", trigger: "blur"}
        ],
        sex:[
          { required: true, message: "选择性别", trigger: "blur"}
        ],
        supplierPhonenum:[
          { required: true, message: "请输入供货人电话", trigger: "blur"}
        ],
        supplyName:[
          { required: true, message: "所属供应商", trigger: "blur"},
        ],
        status:[
          { required: true, message: "请选择", trigger: "blur"}
        ],
        remarks:[
          { required: true, message: "", trigger: "blur"}
        ],
      }
    });
    const addUserVisible=ref(false);
    const handleAdd=()=>{
      addUserVisible.value=true;
    }
    //点击确定保存添加用户
    const addEdit=()=>{
      //表单校验
      proxy.$refs.ruleFormRef.validate((valid) => {
        if (valid){
          //请求后台添加用户信息接口
          console.log(valid,state.form)
          request.post("/supplier/addSupplier",state.form).then((res)=>{
            // debugger
            if (res.code == 200) {
              ElMessage.success("添加成功")
              //初始化数据
              state.form={}
              //关闭弹窗
              addUserVisible.value=false;
              //刷新表格
              getData();
            }
          })
        }
      })
    }

    return{
      tableData,
      editVisible,
      addUserVisible,
      query,
      proxy,
      state,
      form,
      getData,
      handleSearch,
      handleAdd,
      handleEdit,
      saveEdit,
      addEdit,
      handleDelete
    };

  },
};
</script>


<style scoped>

.handle-box {
  margin-bottom: 20px;
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
</style>
