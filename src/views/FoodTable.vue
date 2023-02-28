<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 食材表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input  v-model="query.realName" placeholder="请输入食材名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-lx-add"  @click="handleAdd">添加食材</el-button>
      </div>

      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">

        <el-table-column prop="foodId" label="ID"  width="50"></el-table-column>
        <el-table-column prop="foodName" label="食材名称"></el-table-column>
        <el-table-column prop="foodType" label="食材种类"></el-table-column>
        <el-table-column prop="foodAddress" label="产地"></el-table-column>
        <el-table-column prop="price" label="单价：元/斤"></el-table-column>
        <el-table-column prop="foodNum" label="数量：斤" width="70"></el-table-column>
        <el-table-column prop="qualityDate" label="保质期：天"></el-table-column>
        <el-table-column prop="supplyId" label="供货商ID"></el-table-column>
        <el-table-column prop="supplyName" label="食材供应商" width="100"></el-table-column>
        <el-table-column prop="supplyAddress"  label="供应商地址" width="200"></el-table-column>
        <el-table-column prop="supplyPhonenum" label="供应商电话" width="100"></el-table-column>
        <el-table-column prop="supplyDate" label="食材供应日期" width="150"></el-table-column>
        <el-table-column prop="supplierId" label="供货人ID"></el-table-column>
        <el-table-column prop="supplierName" label="负责人"></el-table-column>
        <el-table-column prop="supplierPhonenum" label="供货人电话" width="100"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>

        <el-table-column label="操作" width="140" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑弹出框 -->
      <el-dialog title="编辑食材信息" v-model="editVisible" width="50%">
        <el-form label-width="120px">
          <el-row>

            <el-col :span="11">
              <el-form-item label="ID">
                <el-input v-model="form.foodId" placeholder="编辑食材ID"/>
              </el-form-item>
              <el-form-item label="供应商名">
                <el-input v-model="form.foodName" placeholder="编辑食材名" />
              </el-form-item>
              <el-form-item label="食材种类">
                <el-input v-model="form.foodType" placeholder="编辑食材种类"/>
              </el-form-item>
              <el-form-item label="食材产地">
                <el-input v-model="form.foodAddress" placeholder="产地"/>
              </el-form-item>
              <el-form-item label="单价：元/斤">
                <el-input v-model="form.price" placeholder="元/斤"/>
              </el-form-item>
              <el-form-item label="食材数量：斤">
                <el-input v-model="form.foodNum" placeholder="单位：斤"/>
              </el-form-item>
              <el-form-item label="编辑保质期：天">
                <el-input v-model="form.qualityDate" placeholder="单位：天"/>
              </el-form-item>
              <el-form-item label="供货商ID">
                <el-input v-model="form.supplyId" placeholder="编辑供应商ID"/>
              </el-form-item>
              <el-form-item label="供货商名">
                <el-input v-model="form.supplyName" placeholder="编辑供货商名"/>
              </el-form-item>
            </el-col>

            <el-col :span="13">
              <el-form-item label="供应商地址">
                <el-input v-model="form.supplyAddress" placeholder="编辑供应商地址"/>
              </el-form-item>
              <el-form-item label="供应商电话">
                <el-input v-model="form.supplyPhonenum" placeholder="编辑供应商电话"/>
              </el-form-item>
              <el-form-item label="供货日期">
                <el-date-picker
                    v-model="form.supplyDate"
                    type="datetime"
                    placeholder="选择日期和时间"
                />
              </el-form-item>
              <el-form-item label="供货人ID">
                <el-input v-model="form.supplierId" placeholder="编辑供货人ID"/>
              </el-form-item>
              <el-form-item label="编辑负责人">
                <el-input v-model="form.supplierName" placeholder="编辑负责人/供货人姓名"/>
              </el-form-item>
              <el-form-item label="编辑负责人电话">
                <el-input v-model="form.supplierPhonenum" placeholder="编辑负责人/供货人电话"/>
              </el-form-item>
              <el-form-item  label="状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择">
                  <el-option key="N" label="未审批" value="0"></el-option>
                  <el-option key="Y" label="已审批" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.remarks"/>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>

        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
        </template>
      </el-dialog>

      <!--弹出新添加框-->
      <el-dialog title="新添加食材信息" v-model="addVisible" width="50%">
        <el-form label-width="120px" :model="state.form" :rules="state.rules" ref="ruleFormRef">
          <el-row>

            <el-col :span="11">
              <el-form-item label="ID" prop="foodId">
                <el-input v-model="state.form.foodId" placeholder="食材ID"/>
              </el-form-item>
              <el-form-item label="供应商名" prop="foodName">
                <el-input v-model="state.form.foodName" placeholder="添加食材名" />
              </el-form-item>
              <el-form-item label="食材种类" prop="foodType">
                <el-input v-model="state.form.foodType" placeholder="编辑食材种类"/>
              </el-form-item>
              <el-form-item label="产地" prop="foodAddress">
                <el-input v-model="state.form.foodAddress" placeholder="食材产地"/>
              </el-form-item>
              <el-form-item label="单价" prop="price">
                <el-input v-model="state.form.price" placeholder="单位：元/斤"/>
              </el-form-item>
              <el-form-item label="食材数量" prop="foodNum">
                <el-input v-model="state.form.foodNum" placeholder="单位：斤"/>
              </el-form-item>
              <el-form-item label="添加食材保质期" prop="qualityDate">
                <el-input v-model="state.form.qualityDate" placeholder="单位：天"/>
              </el-form-item>
              <el-form-item label="供货商ID" prop="supplyId">
                <el-input v-model="state.form.supplyId" placeholder="添加供应商ID"/>
              </el-form-item>
              <el-form-item label="供货商名" prop="supplyName">
                <el-input v-model="state.form.supplyName" placeholder="添加供货商名"/>
              </el-form-item>
            </el-col>

            <el-col :span="13">
              <el-form-item label="供应商地址" prop="supplyAddress">
                <el-input v-model="state.form.supplyAddress" placeholder="请添加供应商地址"/>
              </el-form-item>
              <el-form-item label="供应商电话" prop="supplyPhonenum">
                <el-input v-model="state.form.supplyPhonenum" placeholder="请添加供应商电话"/>
              </el-form-item>
              <el-form-item label="供货日期" prop="supplyDate">
                <el-date-picker
                    v-model="state.form.supplyDate"
                    type="datetime"
                    placeholder="选择日期和时间"
                />
              </el-form-item>
              <el-form-item label="供货人ID" prop="supplierId">
                <el-input v-model="state.form.supplierId" placeholder="供货人ID"/>
              </el-form-item>
              <el-form-item label="供货负责人" prop="supplierName">
                <el-input v-model="state.form.supplierName" placeholder="请添加负责人/供货人姓名"/>
              </el-form-item>
              <el-form-item label="负责人电话" prop="supplierPhonenum">
                <el-input v-model="state.form.supplierPhonenum" placeholder="请添加负责人/供货人电话"/>
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
            </el-col>

          </el-row>
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
import {getAllFood} from "../api/index";
import request from "../request";


export default {
  name: "foodTable",
  setup() {
    //获取表格数据
    const tableData = ref([]);
    const getData = () => {
      getAllFood().then((res) => {
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
      foodId:"", foodName:"", foodType:"", foodAddress:"", price:"", foodNum: "", qualityDate:"", supplyId:"",
      supplyName:"", supplyAddress:"", supplyPhonenum:"", supplyDate:"", supplierId:"", supplierName:"",
      supplierPhonenum:"", status:"", remarks:""
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
      request.post("/food/updateFoodById",form).then((res)=>{
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
            request.post("/food/deleteFoodById",form).then((res)=>{
              if (res.code==400){
                ElMessage.error("删除失败！")
                getData();
              }else if (res.code==200) {
                ElMessage.success("已删除")
                //刷新表格
                getData();
              }
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
        foodId:[
          { required: true, message: "", trigger: "blur"}
        ],
        foodName:[
          { required: true, message: "请输入食材名称", trigger: "blur"}
        ],
        foodType:[
          { required: true, message: "请输入食材种类", trigger: "blur"}
        ],
        foodAddress:[
          { required: true, message: "请输入食材产地", trigger: "blur"}
        ],
        price:[
          { required: true, message: "请写入单价", trigger: "blur"}
        ],
        foodNum:[
          { required: true, message: "请写入具体数量", trigger: "blur"}
        ],
        qualityDate:[
          { required: true, message: "请输入保质期", trigger: "blur"}
        ],
        supplyId:[
          { required: true, message: "", trigger: "blur"}
        ],
        supplyName:[
          { required: true, message: "请输入供应商/店名", trigger: "blur"}
        ],
        supplyAddress:[
          { required: true, message: "请输入供应商地址", trigger: "blur"}
        ],
        supplyPhonenum:[
          { required: true, message: "请输入供应商电话", trigger: "blur"}
        ],
        supplyDate:[
          { required: true, message: "请输入当天供应日期", trigger: "blur"}
        ],
        supplierId:[
          { required: true, message: "", trigger: "blur"}
        ],
        supplierName:[
          { required: true, message: "请输入负责人/供货人姓名", trigger: "blur"}
        ],
        supplierPhonenum:[
          { required: true, message: "请输入正确的电话", trigger: "blur"}
        ],
        status:[
          { required: true, message: "", trigger: "blur"}
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
          request.post("/food/addFood",state.form).then((res)=>{
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
