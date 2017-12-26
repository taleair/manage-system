<template>
<div>
  <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-menu"></i> 众安后台管理</el-breadcrumb-item>
          <el-breadcrumb-item>授信申请</el-breadcrumb-item>
      </el-breadcrumb>
  </div>


  <div class="form-box">
    <el-form>
        <el-input type="text" v-model="bizTransCode" placeholder="bizTransCode"></el-input>
        <el-button @click="getData">查询</el-button>
    </el-form>
  </div>
<div class="table">
  <el-table :v-loading="loading" :data="tableData" border stripe >
      <el-table-column fixed type="index" label="序号" min-width="90">
      </el-table-column>
      <el-table-column  prop="bizChannel" label="业务渠道" min-width="130">
      </el-table-column>
      <el-table-column prop="bizTransCode" label="业务交易编号" min-width="150">
      </el-table-column>
      <el-table-column prop="bizTransNo" label="业务交易流水号" min-width="120">
      </el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" min-width="80">
      </el-table-column>
      <el-table-column prop="bizStatus" label="业务状态" min-width="80">
      </el-table-column>
      <el-table-column prop="thirdUserNo" label="三方用户" min-width="80">
      </el-table-column>
      <el-table-column prop="sendCount" label="发送次数" min-width="80">
      </el-table-column>
      <el-table-column prop="queryCount" label="查询次数" min-width="80">
      </el-table-column>
      <el-table-column prop="lastSendTime" label="最后发送时间"  min-width="150">
      </el-table-column>
      <el-table-column prop="lastQueryTime" label="最后查询时间" min-width="80">
      </el-table-column>
      <el-table-column prop="createBy" label="创建者" min-width="80">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="80">
      </el-table-column>
      <!-- <el-table-column prop="updateBy" label="订单更新者" min-width="150">
      </el-table-column>
      <el-table-column prop="updateTime" label="订单更新时间" min-width="150">
      </el-table-column> -->
      <el-table-column prop="closeTime" label="关闭时间" min-width="180">
      </el-table-column>
      <el-table-column prop="failReason" label="失败原因" min-width="80">
      </el-table-column>
      <el-table-column prop="transResultNo" label="交易返回号" min-width="180">
      </el-table-column>
      <el-table-column  label="操作" min-width="150">
          <template scope="scope">
            <!-- <el-button size="small" type="primary"
                    @click="handlePackage(scope.$index, scope.row)">打包</el-button>
            <el-button size="small"
                    @click="handleDelete(scope.$index, scope.row)">详情</el-button> -->
            <el-button size="small" type="primary"
              @click="handelShowDetail(scope.row.orderData)">数据详情</el-button>
              <el-button size="small" type="primary"
                @click="handelShowLog(scope.row.id)">日志信息</el-button>
          </template>

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
                bizTransCode:null
            }

        },
        created(){
          // this.loading=true;
          // this.getData();

        },
        methods: {
          handelShowDetail(msg){
            alert(msg);
          },
          handelShowLog(orderId){
            //location.href = "/zaTransMsg?orderId=" + orderId;
            //?orderId=40454#/zaTransMsg
              this.$router.push({path: '/zaTransMsg', query: {orderId: orderId}});
          },
          getData(){

              let self = this;
              var queryParam = {pageSize:100000};
              queryParam.bizTransCode = this.bizTransCode;

              //queryParam.datetimeBegin = this.param.dateTime.Format("yyyy-MM-dd");
              // queryParam.datetimeEnd = this.param.dateTime.Format("yyyy-MM-dd");
              self.$axios.post('/weishang-manager-webservice/mgt/order/queryLoanOrderList', queryParam).then((res) => {
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
