<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 供应商表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input  v-model="query.realName" placeholder="请输入供应商名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-lx-add"  @click="handleAdd">添加供应商</el-button>
      </div>

      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="supplyId" label="ID"  width="55" align="center"></el-table-column>
        <el-table-column prop="supplyName" label="供应商名"></el-table-column>
        <el-table-column prop="supplyAddress" label="供应商地址"></el-table-column>
        <el-table-column prop="supplyPhonenum" label="供应商电话"></el-table-column>
        <el-table-column prop="openTime" label="营业日期"></el-table-column>
        <el-table-column prop="supplierId" label="供货人ID"></el-table-column>
        <el-table-column prop="supplierName" label="负责人"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column prop="createTime" label="创建日期"></el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑弹出框 -->
      <el-dialog title="编辑供应商" v-model="editVisible" width="30%">
        <el-form label-width="110px">
          <el-form-item label="ID">
            <el-input v-model="form.supplyId" placeholder="供应商ID"/>
          </el-form-item>
          <el-form-item label="供应商名">
            <el-input v-model="form.supplyName" placeholder="供应商名" />
          </el-form-item>
          <el-form-item label="供应商地址">
            <el-input v-model="form.supplyAddress" placeholder="供应商地址"/>
          </el-form-item>
          <el-form-item label="供应商电话">
            <el-input v-model="form.supplyPhonenum" placeholder="供应商电话"/>
          </el-form-item>
          <el-form-item label="营业日期">
            <el-date-picker
                v-model="form.openTime"
                type="datetime"
                placeholder="选择营业日期和时间"
            />
          </el-form-item>
          <el-form-item label="供货人ID">
            <el-input v-model="form.supplierId" placeholder="供货人ID"/>
          </el-form-item>
          <el-form-item label="负责人/供货人">
            <el-input v-model="form.supplierName" placeholder="负责人/供货人姓名"/>
          </el-form-item>
          <el-form-item  label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option key="N" label="未审批" value="0"></el-option>
              <el-option key="Y" label="已审批" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建日期">
            <el-date-picker
                v-model="form.createTime"
                type="datetime"
                placeholder="选择日期和时间"
            />
          </el-form-item>
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
      <el-dialog title="添加供货商信息" v-model="addVisible" width="30%">
        <el-form label-width="120px" :model="state.form" :rules="state.rules" ref="ruleFormRef">
          <el-form-item label="ID" prop="supplyId">
            <el-input v-model="state.form.supplyId" placeholder="请输入供应商ID"/>
          </el-form-item>
          <el-form-item label="供应商名" prop="supplyName">
            <el-input v-model="state.form.supplyName" placeholder="请输入供应商名" />
          </el-form-item>
          <el-form-item label="供应商地址" prop="supplyAddress">
            <el-input v-model="state.form.supplyAddress" placeholder="请输入供应商地址"/>
          </el-form-item>
          <el-form-item label="供应商电话" prop="supplyPhonenum">
            <el-input v-model="state.form.supplyPhonenum" placeholder="请输入供应商电话"/>
          </el-form-item>
          <el-form-item label="供货商营业日期" prop="openTime">
            <el-date-picker
                v-model="state.form.openTime"
                type="datetime"
                placeholder="请选择日期和时间"
            />
          </el-form-item>
          <el-form-item label="供货人ID" prop="supplierId">
            <el-input v-model="state.form.supplierId" placeholder="请输入供货人ID"/>
          </el-form-item>
          <el-form-item label="负责人/供货人" prop="supplierName">
            <el-input v-model="state.form.supplierName" placeholder="负责人/供货人姓名"/>
          </el-form-item>
          <el-form-item  label="状态" prop="status">
            <el-select v-model="state.form.status" placeholder="请选择">
              <el-option key="N" label="未审批" value="0"></el-option>
              <el-option key="Y" label="已审批" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建日期" prop="createTime">
            <el-date-picker
                v-model="state.form.createTime"
                type="datetime"
                placeholder="请选择日期和时间"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="state.form.remarks"/>
          </el-form-item>
        </el-form>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
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
import {getAllSupply} from "../api/index";
import request from "../request";


export default {
  name: "supplyTable",
  setup() {
    //获取表格数据
    const tableData = ref([]);
    const getData = () => {
      getAllSupply().then((res) => {
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
      supplyId:"",
      supplyName:"",
      supplyAddress:"",
      supplyPhonenum:"",
      openTime:"",
      supplierId: "",
      supplierName:"",
      status:"",
      createTime:"",
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
      request.post("/supply/updateSupplyById",form).then((res)=>{
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
            request.post("/supply/deleteSupplyById",form).then(()=>{
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
        supplyId:[
          { required: true, message: "请输入供应商ID", trigger: "blur"}
        ],
        supplyName: [
          { required: true, message: "请输入供应商名", trigger: "blur"}
        ],
        supplyAddress:[
          { required: true, message: "请输入供应商地址", trigger: "blur"},
        ],
        supplyPhonenum:[
          { required: true, message: "请输入供应商电话", trigger: "blur"}
        ],
        openTime:[
          { required: true, message: "选择开业时间", trigger: "blur"}
        ],
        supplierId:[
          { required: true, message: "请输入供应商负责人/供货人ID", trigger: "blur"}
        ],
        supplierName:[
          { required: true, message: "请输入供应商负责人/供货人姓名", trigger: "blur"}
        ],
        status:[
          { required: true, message: "状态", trigger: "blur"}
        ],
        createTime:[
          { required: true, message: "创建日期", trigger: "blur"}
        ],
      }
    });
    const addVisible=ref(false);
    const handleAdd=()=>{
      addVisible.value=true;
    }
    //点击确定保存添加
    const addEdit=()=>{
      //表单校验
      proxy.$refs.ruleFormRef.validate((valid) => {
        if (valid){
          //请求后台添加用户信息接口
          console.log(valid,state.form)
          request.post("/supply/addSupply",state.form).then((res)=>{
            // debugger
            if (res.code == 200) {
              ElMessage.success("添加成功")
              //初始化数据
              state.form={}
              //关闭弹窗
              addVisible.value=false;
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
      addVisible,
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
