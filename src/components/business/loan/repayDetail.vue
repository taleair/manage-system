<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i></i>财务管理</el-breadcrumb-item>
				<el-breadcrumb-item>还款详细</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	<br />
		<section class="loan_table">
			<el-table :data="datatable" border>
				<el-table-column prop="term_no" label="期号" min-width="140">
				</el-table-column>
				<el-table-column prop="plan_repay_time" label="计划还款时间" min-width="120">
				</el-table-column>
				<el-table-column prop="plan_principal_amount" label="应还本金" min-width="120">
				</el-table-column>
				<el-table-column prop="plan_interest_amount" label="应还利息" min-width="120">
				</el-table-column>
				<el-table-column prop="service_amount" label="手续费" min-width="120">
				</el-table-column>
				<el-table-column prop="actual_principal_amount" label="实还本金" min-width="120">
				</el-table-column>
				<el-table-column prop="actual_interest_amount" label="实际还款利息" min-width="160">
				</el-table-column>
				<el-table-column prop="actual_service_amount" label="实际手续费" min-width="120">
				</el-table-column>
				<el-table-column prop="overdue_days" label="逾期天数" min-width="130">
				</el-table-column>
				<el-table-column prop="penalty_amount" label="逾期罚息" min-width="130">
				</el-table-column>
				<el-table-column  label="案件状态" min-width="130">
					<template scope="scope">
						<!-- 未到期:0;待还款:1;逾期:2;已追偿:3;已还款:4;提取还款5；提前结清6 -->
							<span v-if="scope.row.status == '0'">未到期</span>
							<span v-if="scope.row.status == '1'">待还款</span>
							<span v-if="scope.row.status == '2'">逾期</span>
							<span v-if="scope.row.status == '3'">已追偿</span>
							<span v-if="scope.row.status == '4'">已还款</span>
							<span v-if="scope.row.status == '5'">提取还款</span>
							<span v-if="scope.row.status == '6'">提前结清</span>
					</template>
				</el-table-column>
			</el-table>
		</section>
		</Tabs>
		</header>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				downloadLoading: false,
				datetimeBegin: null,
				datetimeEnd:null,
				datatable: null
			}
		},
		created() {

			//var datetimeEnd = this.$moment(this.datetimeEnd).add(1,"d").format("YYYY-MM-DD");
			this.getData();
		},
		watch: {　　　　　　　

		},
		computed: {

		},
		methods: {
			getData() {

				//按日查询 choseDate,dateFormat,queryType
				//
				//this.$moment(choseDate).add(1,"d").format("YYYY-MM-DD");
				var orderNo = this.$route.query.orderNo;

				let params = {
					orderNo:orderNo
				};

				this.$axios.post("/weishang-manager-webservice/wsAdmin/loan/v2/queryRepayByLoanNo.security", params).then((res) => {
					this.datatable = res;
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
