<template>
	<div>


		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i></i>金鑫小贷</el-breadcrumb-item>
				<el-breadcrumb-item>放款列表</el-breadcrumb-item>
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
		<el-tabs v-model="activeName" type="card">
	 <el-tab-pane label="金鑫小贷" name="jxxdTab"><p>
		 <span>本日放款金额数 </span><em>{{initData.loanAmount || 0}}</em>
		 <span>本日放款案件数 </span><em>{{initData.loanOrderNum || 0}}</em>
	 </p></el-tab-pane>
 </el-tabs>
	<br />
	<br />
		<section class="loan_table">
			<!-- <el-button class='import_file' type="primary" icon="document" @click="handleDownload">导出excel</el-button> -->
			<el-table :data="datatable" border>
				<el-table-column prop="applyId" label="申请编号" min-width="130">
				</el-table-column>
				<el-table-column prop="applyId" label="下单日期">
				</el-table-column>
				<el-table-column prop="applyId" label="产品名称">
				</el-table-column>
				<el-table-column prop="termNum" label="分期期数">
				</el-table-column>
				<el-table-column prop="principalAmount" label="本金">
				</el-table-column>
				<el-table-column prop="customerId" label="用户号" min-width="130">
				</el-table-column>
				<el-table-column prop="customerName" label="用户姓名">
				</el-table-column>
				<el-table-column prop="customerNameIdCard" label="证件号" min-width="130">
				</el-table-column>
				<el-table-column prop="customerBirthday" label="出生日期" min-width="130">
				</el-table-column>
				<el-table-column prop="customerMobile" label="手机号码" min-width="130">
				</el-table-column>
				<el-table-column prop="loanNo" label="放款流水号" min-width="130">
				</el-table-column>
				<el-table-column prop="applyBankCardNo" label="放款账户号" min-width="130">
				</el-table-column>
				<el-table-column prop="paybackBankCardNo" label="还款账户号" min-width="130">
				</el-table-column>
			</el-table>
			<!--分页-->
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
				</el-pagination>
			</div>
		</section>
		</Tabs>
		</header>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				activeName : "jxxdTab",
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
		created() {
		},
		watch: {　　　　　　　

		},
		computed: {

		},
		methods: {
			//changeQueryType
			changeQueryType(tab, event){
				var tabIndex = tab.index;
				//按日查询
				if(0 == tabIndex){
					this.displayDatePicker = "display:block";
					this.displayMonthPicker = "display:none";
					this.dateRangeType = "day";
				}
				//按月查询
				else if(1 == tabIndex){
					this.displayDatePicker = "display: none";
					this.displayMonthPicker = "display:block";
					this.dateRangeType = "month";
				}
			},

			//导出excel
			handleDownload() {
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => {
					if(j === 'timestamp') {
						return parseTime(v[j])
					} else {
						return v[j]
					}
				}))
			},

			handleSizeChange(val) {},
			handleCurrentChange(val) {
				this.queryPage = (val - 1) * this.pageSize;
				this.getData();
			},
			handleEdit(index, row) {
				this.idx = index;
			},
			fetchData() {
				var dataRange = this.getDateRange(this.queryByDayDate,this.dateRangeType);
				console.info(dataRange);
				this.getloanAmount(dataRange);
			},
			getData(dateRange) {

				//按日查询 choseDate,dateFormat,queryType
				//
				let params = {
					"datetimeBegin": dateRange.queryByDayDateBegin,
					"datetimeEnd": dateRange.queryByDayDateEnd,
					'pageSize': this.pageSize,
					'index': this.queryPage,
					'channelId':'LCC201709190004'
				};

				this.$axios.post(this.Api.loanDetail, params).then((res) => {
				this.datatable = res.data;
				this.total = res.totalcount;
				this.per_page = res.pageSize;
				this.current = res.pageSize;
				console.info(res);
				});
			},
			getloanAmount(dateRange) {
				let loanAmountParam = {
					"datetimeBegin": dateRange.queryByDayDateBegin,
					"datetimeEnd": dateRange.queryByDayDateEnd,
					'channelId':'LCC201709190004'
				};

				this.$axios.post("/weishang-manager-webservice/wsAdmin/loanAmount.security", loanAmountParam).then((res) => {
					this.initData = res;
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
