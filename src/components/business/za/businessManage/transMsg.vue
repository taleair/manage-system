<!-- 授信申请 -->
<template>
<div>
  <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-menu"></i> 众安后台管理</el-breadcrumb-item>
          <el-breadcrumb-item>日志查询</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
<div class="table">
    <el-table :v-loading="loading" :data="tableData" border stripe >
        <el-table-column fixed type="index" label="序号" min-width="20">
        </el-table-column>
        <el-table-column  prop="operation" label="operation" min-width="40">
        </el-table-column>
        <el-table-column prop="orderId" label="orderId" min-width="40">
        </el-table-column>
        <el-table-column prop="orderType" label="orderType" min-width="40">
        </el-table-column>
        <el-table-column prop="sendMsg" label="sendMsg" min-width="80">
        </el-table-column>
        <el-table-column prop="sendTime" label="sendTime" min-width="60">
        </el-table-column>
        <el-table-column prop="returnMsg" label="returnMsg" min-width="80">
        </el-table-column>
        <el-table-column prop="returnTime" label="returnTime" min-width="60">
        </el-table-column>
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
          this.getData();
        },
        methods: {
          getData(){
              let self = this;
              var queryParam = {pageSize:100000};
              var orderId = this.$getUrlParam("orderId");
              queryParam.orderId = orderId;
              self.$axios.post('/weishang-manager-webservice/mgt/order/queryApiLogList', queryParam).then((res) => {
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
