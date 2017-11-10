<template>
<div class="table">
    <el-table v-loading="loading" :data="tableData" border stripe >
        <el-table-column fixed type="index" label="序号" min-width="90">
        </el-table-column>
        <el-table-column  prop="no" label="产品编号" min-width="130">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" min-width="150">
        </el-table-column>
        <el-table-column  prop="orderId" label="订单ID" min-width="180">
        </el-table-column>
        <el-table-column prop="loanRate" label="用户年化利率" min-width="120">
        </el-table-column>
        <el-table-column prop="loanAmount" label="借款金额" min-width="80">
        </el-table-column>
        <el-table-column prop="repayPeriods" label="还款周期" min-width="80">
        </el-table-column>
        <el-table-column prop="remainTermNumber" label="剩余期数" min-width="80">
        </el-table-column>
        <el-table-column prop="remainPrincipalAmount" label="剩余本金" min-width="80">
        </el-table-column>
        <el-table-column prop="remainTotalAmount" label="剩余本息" min-width="80">
        </el-table-column>
        <el-table-column prop="loanTime" label="下单日期"  min-width="150">
        </el-table-column>
        <el-table-column prop="repayTerm" label="分期期数" min-width="80">
        </el-table-column>
        <el-table-column prop="repayMonthAmount" label="月供" min-width="80">
        </el-table-column>
        <el-table-column prop="repayTotalAmount" label="总应还款" min-width="80">
        </el-table-column>
        <el-table-column prop="firstTermDate" label="第一期月供" min-width="150">
        </el-table-column>
        <el-table-column prop="lastTermDate" label="最后一期月供" min-width="150">
        </el-table-column>
        <el-table-column prop="userNo" label="用户ID" min-width="180">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" min-width="80">
        </el-table-column>
        <el-table-column prop="userIdNumber" label="身份证号" min-width="180">
        </el-table-column>
        <el-table-column prop="userBirthday" label="出生日期" min-width="150">
        </el-table-column>
        <el-table-column prop="userPhone" label="手机号码" min-width="120">
        </el-table-column>
        <el-table-column prop="loanNo" label="放款流水号" min-width="120">
        </el-table-column>
        <el-table-column prop="changeFlag" label="变动标志" min-width="80">
        </el-table-column>
        <el-table-column prop="remark" label="说明" min-width="280">
        </el-table-column>
    </el-table>
</div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                loading: true,
                productId:this.$route.query.productId
            }

        },
        created(){
          this.loading=true;
          this.getData();

        },
        methods: {
          getData(){

              let self = this;
              var queryParam = {pageSize:100000};
              //queryParam.datetimeBegin = this.param.dateTime.Format("yyyy-MM-dd");
              //queryParam.datetimeEnd = this.param.dateTime.Format("yyyy-MM-dd");
              self.$axios.post('/weishang-manager-webservice/wsAdmin/wjs/queryProductDetail', queryParam).then((res) => {
                  try{
                    self.tableData = res.data.dataBody.data;
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
