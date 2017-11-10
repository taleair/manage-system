<template>

<div>

<div class="table">
    <el-table :data="tableData" border stripe >
        <el-table-column fixed type="index" label="序号" min-width="90">
        </el-table-column>
        <el-table-column fixed prop="no" label="产品编号" min-width="130">
        </el-table-column>
        <el-table-column fixed prop="name" label="订单ID" min-width="300">
        </el-table-column>
        <el-table-column prop="sellDate" label="用户年化利率" min-width="150">
        </el-table-column>
        <el-table-column prop="shutDate" label="借款金额" min-width="150">
        </el-table-column>
        <el-table-column prop="issueAmount" label="还款周期" min-width="80">
        </el-table-column>
        <el-table-column prop="issueRate" label="剩余期数" min-width="80">
        </el-table-column>
        <el-table-column prop="pkgCount" label="剩余本金" min-width="110">
        </el-table-column>
        <el-table-column prop="interestDate" label="剩余本息" min-width="150">
        </el-table-column>
        <el-table-column prop="endDate" label="下单日期"  min-width="150">
        </el-table-column>
        <el-table-column prop="pkgAmount" label="产品名称" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="分期期数" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="月供" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="总应还款" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="第一期月供" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="最后一期月供" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="用户ID" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="姓名" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="身份证号" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="出生日期" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="手机号码" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="放款流水号" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="变动标志" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="说明" min-width="80">
        </el-table-column>
    </el-table>
</div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                productId:""
            }
        },
        created(){
          this.initParam();
        },
        methods: {
          initParam(){
            this.productId = this.$route.query.productId;
            alert(this.productId);
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
