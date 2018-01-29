<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i></i>财务管理</el-breadcrumb-item>
				<el-breadcrumb-item>财务日报表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

	<header>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item label="日期：">
				<el-date-picker  v-model="datetimeBegin" type="date"  placeholder="请选择">
				</el-date-picker>
				</el-form-item>
				<el-form-item label="至">
				<el-date-picker  v-model="datetimeEnd" type="date" placeholder="请选择">
				</el-date-picker>
				</el-form-item>
				<el-button class='select' type="primary" @click="getData">查询</el-button>
		</el-form>
	</header>
	<br />
		<section class="loan_table">
			<el-table :data="datatable" border>
				<el-table-column prop="report_time" label="时间" min-width="140">
				</el-table-column>
				<el-table-column prop="loan_count" label="借款总笔数" min-width="120">
				</el-table-column>
				<el-table-column prop="loan_amount" label="借款总金额" min-width="120">
				</el-table-column>
				<el-table-column prop="loan_principal_amount" label="借款总本金" min-width="120">
				</el-table-column>
				<el-table-column prop="loan_interest_amount" label="借款总利息" min-width="120">
				</el-table-column>
				<el-table-column prop="loan_service_amount" label="借款总服务费" min-width="120">
				</el-table-column>
				<el-table-column prop="loan_others_amount" label="借款总其他费用" min-width="160">
				</el-table-column>
				<el-table-column prop="repay_count" label="还款总笔数" min-width="120">
				</el-table-column>
				<el-table-column prop="repay_amount" label="还款总金额" min-width="130">
				</el-table-column>
				<el-table-column prop="repay_principal_amount" label="还款总本金" min-width="130">
				</el-table-column>
				<el-table-column prop="repay_interest_amount" label="还款总利息" min-width="130">
				</el-table-column>
				<el-table-column prop="repay_service_amount" label="还款总服务费" min-width="130">
				</el-table-column>
				<el-table-column prop="repay_other_amount" label="还款总其他费用" min-width="130">
				</el-table-column>
				<el-table-column prop="delay_count" label="逾期总笔数" min-width="130">
				</el-table-column>
				<el-table-column prop="delay_amount" label="逾期总金额" min-width="130">
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
			this.datetimeBegin =  this.$moment(new Date()).startOf("month").format("YYYY-MM-DD");
			this.datetimeEnd =  this.$moment(new Date()).endOf("month").format("YYYY-MM-DD");
		},
		watch: {　　　　　　　

		},
		computed: {

		},
		methods: {
			/**
			*分页
			*/
			handleSizeChange(val) {},
			handleCurrentChange(val) {
				this.queryPage = (val - 1) * this.pageSize;
				this.getData();
			},
			getData() {

				//按日查询 choseDate,dateFormat,queryType
				//
				//this.$moment(choseDate).add(1,"d").format("YYYY-MM-DD");
				var datetimeBegin = this.$moment(this.datetimeBegin).format("YYYY-MM-DD");
				var datetimeEnd = this.$moment(this.datetimeEnd).add(1,"d").format("YYYY-MM-DD");
				var channelId = this.channelId;

				let params = {
					"datetimeBegin": this.datetimeBegin,
					"datetimeEnd": this.datetimeEnd

				};

				this.$axios.post("/weishang-manager-webservice/wsAdmin/loan/v2/queryReportDailyLocal.security", params).then((res) => {
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
