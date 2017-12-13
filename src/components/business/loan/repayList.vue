<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i></i>财务管理</el-breadcrumb-item>
				<el-breadcrumb-item>还款对账</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<header>
			<el-tabs  type="card" @tab-click="changeQueryType">
				<el-tab-pane label="日">
				</el-tab-pane>
				<el-tab-pane label="月">
				</el-tab-pane>
			</el-tabs>
		</header>

		<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="时间">
					<el-date-picker :style="displayDatePicker" v-model="queryByDayDate" type="date" format="yyyy-MM-DD" placeholder="请选择">
					</el-date-picker>
					<el-date-picker :style="displayMonthPicker" v-model="queryByDayDate" type="month" format="yyyy-MM" placeholder="请选择">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button class='select' type="primary" @click="fetchData">查询</el-button>
				</el-form-item>
		</el-form>

		<el-tabs v-model="activeName" type="card">
		 <el-tab-pane label="总计" name="totalTab">
			 <p>本{{monOrDayDesc}}应还资方金额：{{initData.oughtReplayAmount || 0}}</p>
			 <p class="all_bank">
				 <span>众安：        <em>{{totalLoan || 0}}</em></span>
			 </p>
			 <p class="all_details">
				 <span>本{{monOrDayDesc}}应收账款：   <em>{{initData.planReplayAmount || 0}}</em> </span>
				 <span>实际到账金额：    <em>{{initData.actualReplayAmount || 0 }}</em></span>
				 <span>未到账金额：       <em>{{initData.unReplayAmount || 0}}</em></span>
				 <span>逾期案件数：      <em>{{initData.delayCaseNum || 0}}</em></span>
			 </p>
			 <p class="all_details">
				 <span>本{{monOrDayDesc}}提前还款案件：    <em>{{initData.advanceReplayNum || 0}}</em></span>
				 <span>提前还款金额：        <em>{{initData.advanceReplayAmount || 0}}</em></span>
				 <span>本日提前结清案件数：  <em>{{initData.advanceClearCaseNum || 0}}</em></span>
				 <span>本日提前结清金额：    <em>{{initData.advanceReplayAmount || 0}}</em></span>
			 </p>
		 </el-tab-pane>
		 <el-tab-pane label="众安" name="zaTab">
			 <p>应还资方金额：<em>{{initData.loanAmount }}</em></p>
			 <p class="all_details">
				 <span>本{{monOrDayDesc}}应收账款：   <em>{{initData.planReplayAmount || 0}}</em> </span>
				 <span>实际到账金额：    <em>{{initData.actualReplayAmount || 0}}</em></span>
				 <span>未到账金额：       <em>{{initData.unReplayAmount || 0}}</em></span>
				 <span>逾期案件数：      <em>{{initData.delayCaseNum || 0}}</em></span>
			 </p>
			 <p class="all_details">
				 <span>本{{monOrDayDesc}}提前还款案件：    <em>{{initData.advanceReplayNum || 0}}</em></span>
				 <span>提前还款金额：        <em>{{initData.advanceReplayAmount|| 0 }}</em></span>
				 <span>本日提前结清案件数：  <em>{{initData.advanceClearCaseNum || 0}}</em></span>
				 <span>本日提前结清金额：    <em>{{initData.advanceReplayAmount|| 0 }}</em></span>
			 </p>
		 </el-tab-pane>
		 <el-tab-pane label="金鑫小贷" name="jxxdTab">
			 <p>应还资方金额：<em>{{initData.loanAmount }}</em></p>
			 <p class="all_details">
				 <span>本{{monOrDayDesc}}应收账款：   <em>{{initData.planReplayAmount || 0}}</em> </span>
				 <span>实际到账金额：    <em>{{initData.actualReplayAmount || 0}}</em></span>
				 <span>未到账金额：       <em>{{initData.unReplayAmount || 0}}</em></span>
				 <span>逾期案件数：      <em>{{initData.delayCaseNum || 0}}</em></span>
			 </p>
			 <p class="all_details">
				 <span>本{{monOrDayDesc}}提前还款案件：    <em>{{initData.advanceReplayNum || 0}}</em></span>
				 <span>提前还款金额：        <em>{{initData.advanceReplayAmount|| 0 }}</em></span>
				 <span>本{{monOrDayDesc}}提前结清案件数：  <em>{{initData.advanceClearCaseNum || 0}}</em></span>
				 <span>本{{monOrDayDesc}}提前结清金额：    <em>{{initData.advanceReplayAmount|| 0 }}</em></span>
			 </p>
		 </el-tab-pane>
	 </el-tabs>
	 <br />
	 <br />
	 <el-table :data="datatable" border>
		 <el-table-column prop="replayId" label="还款编号">
		 </el-table-column>
		 <el-table-column prop="applyId" label="申请编号">
		 </el-table-column>
		 <el-table-column prop="loanNo" label="放款编号" min-width="130">
		 </el-table-column>
		 <el-table-column prop="termNo" label="期号">
		 </el-table-column>
		 <el-table-column prop="customerId" label="用户号" min-width="130">
		 </el-table-column>
		 <el-table-column prop="customerName" label="用户姓名">
		 </el-table-column>
		 <el-table-column prop="customerIdCard" label="证件号" min-width="130">
		 </el-table-column>
		 <el-table-column prop="planRepayTime" label="计划还款时间" min-width="130">
		 </el-table-column>
		 <el-table-column prop="planPrincipalAmount" label="计划还款本金">
		 </el-table-column>
		 <el-table-column prop="planInterestAmount" label="计划还款利息">
		 </el-table-column>
		 <el-table-column prop="serviceAmount" label="计划还款平台使用费" min-width="100">
		 </el-table-column>
		 <el-table-column prop="actualRepayTime" label="实际还款时间" min-width="130">
		 </el-table-column>
		 <el-table-column prop="actualPrincipalAmount" label="实际还款本金">
		 </el-table-column>
		 <el-table-column prop="actualInterestAmount" label="实际还款利息">
		 </el-table-column>
		 <el-table-column prop="actualServiceAmount" label="实际还款平台使用费" min-width="100">
		 </el-table-column>
		 <el-table-column prop="status" label="还款状态">
		 </el-table-column>
		 <el-table-column prop="overdueDays" label="逾期天数">
		 </el-table-column>
		 <el-table-column prop="penaltyAmount" label="逾期费">
		 </el-table-column>
		 <el-table-column prop="virementId" label="扣款流水号" min-width="130">
		 </el-table-column>
		 <!--<el-table-column prop="loanChannel" label="放款资方">
		 </el-table-column>-->
	 </el-table>
	</div>
</template>

<script>
  //   import repaylistday from './repayList_day.vue';
	// import repaylistmonth from './repayList_month.vue';
	export default {
		data() {
			return {
				activeName : "totalTab",
				tableData: [],
				idx: 0,
				queryByDayDate: new Date(),
				initData: [],
				dataAmount: [],
				datatable: null,
				detailshow: true,
				current: 1,
				currentPage1: 1,
				total: 0,
				per_page: 15,
				queryPage: 0,
				pageSize: 20,
				downloadLoading: false,
				displayDatePicker:"display:block",
				displayMonthPicker:"display:none",
				dateRangeType : "day",
				monOrDayDesc : "日",
				getDateRange : function(choseDate,queryType){
						var result = {};
						if("day" == queryType) {
							result.queryByDayDateBegin = this.$moment(choseDate).format("YYYY-MM-DD");
							result.queryByDayDateEnd = this.$moment(choseDate).add(1,"d").format("YYYY-MM-DD");
						} else if("month" == queryType){
							result.queryByDayDateBegin = this.$moment(choseDate).startOf("month").format("YYYY-MM");
							result.queryByDayDateEnd = this.$moment(choseDate).endOf("month").add(1,"d").format("YYYY-MM");
						}
						return result;
				}

			}

		},
		  created(){

        },
        computed: {

        },
        methods: {
					changeQueryType(tab, event){
						var tabIndex = tab.index;
						//按日查询
						if(0 == tabIndex){
							this.displayDatePicker = "display:block";
							this.displayMonthPicker = "display:none";
							this.dateRangeType = "day";
							this.monOrDayDesc ="日";
						}
						//按月查询
						else if(1 == tabIndex){
							this.displayDatePicker = "display: none";
							this.displayMonthPicker = "display:block";
							this.dateRangeType = "month";
							this.monOrDayDesc ="月";
						}
					},

        },
        components: {
			// repaylistday,
			// repaylistmonth
				} //注册组件

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
