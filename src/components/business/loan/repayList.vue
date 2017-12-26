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
					<el-date-picker :style="displayDatePicker" v-model="queryByDayDate" type="date" placeholder="请选择">
					</el-date-picker>
					<el-date-picker :style="displayMonthPicker" v-model="queryByDayDate" type="month" placeholder="请选择">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button class='select' type="primary" @click="fetchData">查询</el-button>
				</el-form-item>
		</el-form>


		<el-tabs v-model="activeChannelTab" type="card">
	  <el-tab-pane
	 	 v-for="(item, index) in channelList"
	 	 :key="item.name"
	 	 :label="item.title"
	 	 :name="item.name">
		 <p class="all_details">
			 <span>本{{monOrDayDesc}}应收账款：  {{item.oughtReplayAmount || 0}} <em></em> </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			 <span>实际到账金额：  {{item.actualReplayAmount || 0}}  <em></em></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			 <span>未到账金额：     {{item.unReplayAmount || 0}}  <em></em></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			 <span>逾期案件数：    {{item.status2Num || 0}}  <em></em></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		 </p>
		 <p class="all_details">
			 <span>本{{monOrDayDesc}}提前还款案件：  {{item.status5Num || 0}}  <em></em></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			 <span>提前还款金额：     {{item.advanceReplayAmount || 0}}   <em></em></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			 <span>本日提前结清案件数： {{item.status6Num || 0}} <em></em></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			 <span>本日提前结清金额：  {{item.advanceReplayAmount || 0}}  <em></em></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
				channelList:[{title:"test",name:"测试"}],
				activeChannelTab:"total",
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
				this.$axios.post("/weishang-manager-webservice/wsAdmin/queryChannelList.security", {}).then((res) => {
					res.unshift({channelDesc:"全部",loanChannel:"total"});
					console.info(res);
					if(res != null && res.length > 0){
						this.genChannelTabs(res);
					}
				});
        },
        computed: {

        },
        methods: {
					genChannelTabs(srcChannelList){

						var dictChannelList = [];
						if (srcChannelList != null && srcChannelList.length > 0){
							for(var i = 0 ; i < srcChannelList.length;i++){
								dictChannelList.push({title:srcChannelList[i].channelDesc,name:srcChannelList[i].loanChannel});
							}
						}
						this.channelList = dictChannelList;
					},


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
					fetchData(){
						var dataRange = this.getDateRange(this.queryByDayDate,this.dateRangeType);
						this.getRepayAmount(dataRange);
						//this.getData(dataRange);
					},

					fillLoanAmountTab(srcLoanAmount){
						//总计
						var total_item = this.channelList.getItemByEntityValue("name","total");

						// private Long planReplayAmount;
						// private Long actualReplayAmount;
						// private Long unReplayAmount;
						// private Long advanceReplayNum;
						// private Long advanceReplayAmount;
						// private Long advanceClearCaseNum;
						// private Long status2Num;
						// private Long status5Num;
						// private Long status6Num;

						total_item.planReplayAmount = srcLoanAmount.srcLoanAmount;
						total_item.actualReplayAmount = srcLoanAmount.actualReplayAmount;
						total_item.unReplayAmount = srcLoanAmount.unReplayAmount;
						total_item.advanceReplayNum = srcLoanAmount.advanceReplayNum;
						total_item.advanceReplayAmount = srcLoanAmount.advanceReplayAmount;
						total_item.advanceClearCaseNum = srcLoanAmount.advanceClearCaseNum;
						total_item.status2Num = srcLoanAmount.status2Num;
						total_item.status5Num = srcLoanAmount.status5Num;
						total_item.status6Num = srcLoanAmount.status6Num;

						//各个分开统计
						var details = srcLoanAmount.details;
						if(details != null && details.length > 0){
							for(var i = 0 ; i < details.length ; i++){
								var src_item = details[i];
								var src_item_channelCode = src_item.channelId;
								//获取tab item
								var entity_item = this.channelList.getItemByEntityValue("name",src_item_channelCode);
								//赋值
								entity_item.planReplayAmount = src_item.srcLoanAmount;
								entity_item.actualReplayAmount = src_item.actualReplayAmount;
								entity_item.unReplayAmount = src_item.unReplayAmount;
								entity_item.advanceReplayNum = src_item.advanceReplayNum;
								entity_item.advanceReplayAmount = src_item.advanceReplayAmount;
								entity_item.advanceClearCaseNum = src_item.advanceClearCaseNum;
								entity_item.status2Num = src_item.status2Num;
								entity_item.status5Num = src_item.status5Num;
								entity_item.status6Num = src_item.status6Num;
							}
						}
					},

					getRepayAmount(dateRange) {
						let loanAmountParam = {
							"datetimeBegin": dateRange.queryByDayDateBegin,
							"datetimeEnd": dateRange.queryByDayDateEnd
						};

						this.$axios.post("/weishang-manager-webservice/wsAdmin/loanReplayAmount", loanAmountParam).then((res) => {
							this.fillLoanAmountTab(res);
							//这里有bug必须重新刷新tab要不值不更新
							this.activeChannelTab = "";
							this.activeChannelTab = "total";

						});
					}
        },
        components: {

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
