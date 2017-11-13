<template>
<div>
  <div class="crumbs">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 网金社</el-breadcrumb-item>
        <el-breadcrumb-item>产品计划管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>


  <div class="form-box">
  <el-form ref="form" :model="param" label-width="100px">
  <div class="el-form-item">

    <el-date-picker
      label="放款开始时间"
      v-model="param.dateTimeBegin"
      align="right"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions1">
    </el-date-picker>


    <el-date-picker
    label="放款结束时间"
      v-model="param.dateTimeEnd"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions1">
    </el-date-picker>


    <el-select v-model="param.status" label="状态" placeholder="请选择">
        <el-option key="bbk" label="步步高" value="bbk"></el-option>
        <el-option key="xtc" label="小天才" value="xtc"></el-option>
        <el-option key="imoo" label="imoo" value="imoo"></el-option>
    </el-select>
    </div>
    </el-form>
  </div>


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
</div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                loading: false,
                productId:'1',
                pickerOptions0: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  }
                },
                pickerOptions1: {
                  shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                      picker.$emit('pick', new Date());
                    }
                  }, {
                    text: '昨天',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24);
                      picker.$emit('pick', date);
                    }
                  }, {
                    text: '一周前',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', date);
                    }
                  }]
                },
                param:{
                  dateTimeBegin:new Date(),
                  dateTimeEnd:new Date(),
                  status:"bbk"
                }
            }

        },
        created(){
          //this.loading=true;
          //this.getData();
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
