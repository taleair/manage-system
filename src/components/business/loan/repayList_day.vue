<template>
	<div>
		<nav>
			<section>
				<span>时间:</span> &nbsp;&nbsp;
				<span>
							<el-date-picker
                                v-model="value4"
                                type="date"
                                format="yyyy-MM-dd"
                                placeholder="选择日期">
                             </el-date-picker>
                            </span>
				<el-button type="primary" @click="fetchData"> 查询 </el-button>
			</section>
		</nav>
		<section class='loan_tabs' :value="initData">
			<Tabs type="card">
				<TabPane label="全部">
					<p>今日应还资方金额：{{initData.oughtReplayAmount || 0}}</p>
					<p class="all_bank">
						<span>众安：        <em>{{totalLoan || 0}}</em></span>
					</p>
					<p class="all_details">
						<span>本日应收账款：   <em>{{initData.planReplayAmount || 0}}</em> </span>
						<span>实际到账金额：    <em>{{initData.actualReplayAmount || 0 }}</em></span>
						<span>未到账金额：       <em>{{initData.unReplayAmount || 0}}</em></span>
						<span>逾期案件数：      <em>{{initData.delayCaseNum || 0}}</em></span>
					</p>
					<p class="all_details">
						<span>本日提前还款案件：    <em>{{initData.advanceReplayNum || 0}}</em></span>
						<span>提前还款金额：        <em>{{initData.advanceReplayAmount || 0}}</em></span>
						<span>本日提前结清案件数：  <em>{{initData.advanceClearCaseNum || 0}}</em></span>
						<span>本日提前结清金额：    <em>{{initData.advanceReplayAmount || 0}}</em></span>
					</p>
				</TabPane>
				<TabPane label="众安">
					<p>应还资方金额：<em>{{initData.loanAmount }}</em></p>
					<p class="all_details">
						<span>本日应收账款：   <em>{{initData.planReplayAmount || 0}}</em> </span>
						<span>实际到账金额：    <em>{{initData.actualReplayAmount || 0}}</em></span>
						<span>未到账金额：       <em>{{initData.unReplayAmount || 0}}</em></span>
						<span>逾期案件数：      <em>{{initData.delayCaseNum || 0}}</em></span>
					</p>
					<p class="all_details">
						<span>本日提前还款案件：    <em>{{initData.advanceReplayNum || 0}}</em></span>
						<span>提前还款金额：        <em>{{initData.advanceReplayAmount|| 0 }}</em></span>
						<span>本日提前结清案件数：  <em>{{initData.advanceClearCaseNum || 0}}</em></span>
						<span>本日提前结清金额：    <em>{{initData.advanceReplayAmount|| 0 }}</em></span>
					</p>
				</TabPane>
			</Tabs>
		</section>
		<section class="loan_table">
			<p>
				<el-button class='import_file' type="primary" icon="document" @click="handleDownload">导出excel</el-button>
			</p>
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
		</section>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
//				url: '/weishang-manager-webservice/wsAdmin/loanReplayDetail',
				tableData: [],
				a: 0,
				b: 0,
				c: 0,
				idx: 0, //
				value: '',
				value1: '',
				value2: '',
				value3: '',
				value4: '',
				initData: [],
				dataAmount: [],
				datatable: null,
				detailshow: true,
				current: 1,
				currentPage1: 1,
				total: 0,
				per_page: 20,
				queryPage: 0,
				pageSize: 20
			}
		},
		created() {
			this.getData();
			this.getloanReplayAmount();
		},
		watch: {　　　　　　　
//			'value4': {　　　　　　　　　　
//				handler(curVal, oldVal) {
//					let d = new Date(curVal);
//					let days = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
//					this.value4 = days;　　　　　　　　　　
//				},
//				　　　　　　　　　　deep: true　　　　　　　　
//			}
		},
		computed: {
			totalLoan() {
				let total = parseInt(this.a) + parseInt(this.b) + parseInt(this.c);
				return total || 0;
			}
		},
		methods: {
			//导出excel
			handleDownload() {
				// this.downloadLoading = true;
				// require.ensure([], () => {
				// 	const {
				// 		export_json_to_excel
				// 	} = require('../../../static/vendor/Export2Excel');
				// 	const tHeader = ['还款编号', '申请编号', '放款编号', '期号', '用户号', '用户姓名', '证件号', '计划还款时间', '计划还款本金', '计划还款利息', '计划还款平台使用费', '实际还款时间', '实际还款本金', '实际还款利息', '实际还款平台使用费', '还款状态', '逾期天数', '逾期费', '扣款流水号'];
				//
				// 	const filterVal = ['replayId', 'applyId', 'loanNo', 'termNo', 'customerId', 'customerName', 'customerNameIdCard', 'planRepayTime', 'planPrincipalAmount', 'planInterestAmount', 'serviceAmount', 'actualRepayTime', 'actualPrincipalAmount', 'actualInterestAmount', 'actualServiceAmount', 'status', 'overdueDays', 'penaltyAmount', 'virementId'];
				//
				// 	const list = this.datatable; //导出page data
				// 	if(list == undefined){
        //                   this.$layer.msg("当前无数据，请选择数据导出！");
				// 	}else{
				// 		console.warn('@@@@@@@@@@@导出还款对账列表日--page data', this.datatable);
				// 		const data = this.formatJson(filterVal, list);
				// 		export_json_to_excel(tHeader, data, '按日导出还款列表');
				// 		this.downloadLoading = false;
				// 	}
				//
				// })
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
				this.getData();
				this.getloanReplayAmount();
			},
			getData() {
				if(this.value4 == "" ) {
					var day1 = new Date();
					day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
					var m = (day1.getMonth()+1).toString();
							   m = m.length > 1 ? m : "0"+m;
							  var d = day1.getDate().toString();
							   d = d.length > 1 ? d : "0"+d;
					var s1 = day1.getFullYear() + "-" + m + "-" + d;
                     this.value4 = s1;
				}
				let params = {
					"datetimeBegin": this.value4,
					"datetimeEnd": this.value4,
					'pageSize': this.pageSize,
					'index': this.queryPage
				};
				this.$axios.post(this.Api.loanReplayDetail, params).then((res) => {
//					console.log('loanReplayDetail-day=========', res.data.dataBody)
					this.datatable = res.data.dataBody.data;
					this.total = res.data.dataBody.totalcount;
					this.per_page = res.data.dataBody.pageSize;
					this.current = res.data.dataBody.pageSize;
				})
			},
			getloanReplayAmount() {
				if(this.value4 == "" ) {
					var day1 = new Date();
					day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
					var m = (day1.getMonth()+1).toString();
							   m = m.length > 1 ? m : "0"+m;
							  var d = day1.getDate().toString();
							   d = d.length > 1 ? d : "0"+d;
					var s1 = day1.getFullYear() + "-" + m + "-" + d;
                     this.value4 = s1;
				}
				let loanReplayAmount = {
					"datetimeBegin": this.value4,
					"datetimeEnd": this.value4
				};

				this.$axios.post(this.Api.loanReplayAmount, loanReplayAmount).then((res) => {

					this.initData = res.data.dataBody;
					//                 console.log('@@@@@@@@@@@loanReplayAmount_day=========',  this.initData)
					this.a = this.initData.planReplayAmount;
					this.b = this.initData.advanceReplayAmount;
					this.c = this.initData.advanceReplayAmount;
				})
			}
		}
	}
</script>
<style scoped>
	.date {
		width: 90px;
	}

	nav {
		width: 100%;
		height: 70px;
		margin-top: 10px;
		border-radius: 5px;
		background: #C8D2DC;
		line-height: 70px;
	}

	nav section span {
		font-size: 14px;
		display: block;
		float: left;
		margin-left: 10px;
	}

	nav section .select {
		float: right;
		display: block;
	}

	.loan_tabs {
		width: 100%;
		height: 150px;
		background: #C8D2DC;
		margin-top: 20px;
		border-radius: 5px;
	}

	.loan_tabs p.all_bank span {
		width: 15%;
		height: 24px;
		font-size: 14px;
		float: left;
		display: block;
	}

	.loan_tabs p.all_details span {
		width: 22%;
		height: 24px;
		float: left;
		font-size: 14px;
		display: block;
	}

	.loan_tabs p {
		display: block;
		height: 25px;
		font-size: 14px;
		line-height: 24px;
		margin-left: 20px;
	}

	.loan_table {
		width: 100%;
		height: auto;
		margin-top: 15px;
	}

	.loan_table p {
		width: 100%;
		margin-bottom: 10px;
	}

	.select_loan {
		width: 80px;
		height: 35px;
		margin-left: 15px;
	}

	.el-table {
		border-radius: 5px;
		font-size: 12px;
		font-weight: normal;
	}

	.block {
		float: right;
	}

	.import_file {
		display: block;
		float: right;
		margin: 0 70px 5px 0;
	}
</style>
