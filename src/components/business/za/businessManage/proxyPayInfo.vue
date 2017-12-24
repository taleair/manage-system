<!-- 代偿处理任务 -->
<template>
<div>
  <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-menu"></i> 众安后台管理</el-breadcrumb-item>
          <el-breadcrumb-item>代偿处理任务</el-breadcrumb-item>
      </el-breadcrumb>
  </div>


  <div class="form-box">
    <el-form>
        <el-input type="text" v-model="bizTransCode" placeholder="bizTransCode"></el-input>
        <el-button type="primary" @click="getData">查询</el-button>


    </el-form>
  </div>
<div class="table">
  <el-table :v-loading="loading" :data="tableData" border stripe >
      <el-table-column fixed type="index" label="序号" min-width="90">
      </el-table-column>
      <el-table-column  prop="bizNo" label="业务编号" min-width="130">
      </el-table-column>
      <el-table-column prop="bizType" label="业务类型" min-width="150">
      </el-table-column>
      <el-table-column prop="bizStatus" label="业务状态" min-width="120">
      </el-table-column>
      <el-table-column prop="bizMemo" label="业务备注" min-width="80">
      </el-table-column>
      <el-table-column prop="operaCode" label="处理代码" min-width="80">
      </el-table-column>
      <el-table-column prop="operaMsg" label="" min-width="80">
      </el-table-column>
      <el-table-column prop="operaStatus" label="处理状态" min-width="80">
      </el-table-column>
      <!-- <el-table-column prop="repeatStatus" label="0" min-width="80">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"  min-width="150">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="80">
      </el-table-column> -->
  </el-table>
</div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                loading: false,
                bizTransCode:""
            }

        },
        created(){
          // this.loading=true;
          // this.getData();

        },
        methods: {
          getData(){

              let self = this;
              var queryParam = {pageSize:100000};
              queryParam.bizTransCode = this.bizTransCode;

              self.$axios.post('/weishang-manager-webservice/mgt/task/queryCompensationTaskList', queryParam).then((res) => {
                  try{
                    self.tableData = res.data;
                  } catch (e){
                  }
                  this.loading=false;
              });

            }

        }
    }
</script>


<style>
.el-table td, .el-table th {
    padding: 0px 4px;
    text-align:center;
}

.el-table .cell, .el-table th>div {
    padding-left: 4px;
    padding-right: 4px;
    box-sizing: border-box;
    text-overflow: ellipsis;
}
.el-date-picker .el-picker-panel__content {
    min-width: 224px;
    width: 224px;
}
</style>
