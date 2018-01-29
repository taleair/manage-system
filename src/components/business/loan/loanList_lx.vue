<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i></i>财务管理</el-breadcrumb-item>
				<el-breadcrumb-item>放款列表</el-breadcrumb-item>
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
				<el-form-item label="用户名：">
					<el-input v-model="userName" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item label="放款编号：">
					<el-input v-model="orderNo" placeholder="放款编号"></el-input>
				</el-form-item>
				<el-button class='select' type="primary" @click="getData">查询</el-button>
		</el-form>
	</header>
	<br />
		<section class="loan_table">
			<!-- <el-button class='import_file' type="primary" icon="document" @click="handleDownload">导出excel</el-button> -->
			<el-table :data="datatable" border>
				<el-table-column prop="order_no" label="放款流水号" min-width="140">

				</el-table-column>
				<el-table-column label="还款详细" min-width="140">
					<template scope="scope">
					<el-button size="small" type="primary"
						@click="handelShowDetail(scope.row.order_no)">还款详细</el-button>
					</template scope="scope">
				</el-table-column>
				<el-table-column prop="confirm_time" label="放款时间" min-width="150">
				</el-table-column>
				<el-table-column prop="product_code" label="产品名称">
				</el-table-column>
				<el-table-column prop="source_product_code" label="进件渠道">
				</el-table-column>
				<el-table-column prop="user_name" label="用户姓名">
				</el-table-column>
				<el-table-column prop="phone" label="手机号" min-width="120">
				</el-table-column>
				<el-table-column prop="indentity_no" label="证件号" min-width="160">
				</el-table-column>
				<el-table-column prop="confirm_amount" label="放款金额">
				</el-table-column>
				<el-table-column prop="apply_term" label="期数" min-width="130">
				</el-table-column>
				<el-table-column prop="apply_rate" label="年利率" min-width="130">
				</el-table-column>
				<el-table-column prop="interest_amount" label="利息费" min-width="130">
				</el-table-column>
				<el-table-column prop="service_amount" label="月服务费" min-width="130">
				</el-table-column>
				<el-table-column prop="pre_amount" label="前置服务费" min-width="130">
				</el-table-column>
				<el-table-column prop="interest_type" label="计息方式" min-width="130">
				</el-table-column>
				<el-table-column prop="confirm_status" label="放款状态" min-width="130">
				</el-table-column>
				<el-table-column prop="credit_card_id" label="放款账号" min-width="150">
				</el-table-column>
				<el-table-column prop="bank_deposit" label="银行" min-width="130">
				</el-table-column>
				<el-table-column prop="loan_channel" label="放款资方" min-width="130">
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
				channelId:null,
				tableData: [],
				idx: 0,
				datatable: null,
				current: 1,
				currentPage1: 1,
				total: 0,
				per_page: 15,
				queryPage: 0,
				pageSize: 20,
				downloadLoading: false,
				channelList:[{value:"众安"},{value:"龙信"},{value:"全部"}],
				datetimeBegin: null,
				datetimeEnd:new Date(),
				userName:null,
				orderNo:null,
				channelId:null
			}
		},
		created() {

			//var datetimeEnd = this.$moment(this.datetimeEnd).add(1,"d").format("YYYY-MM-DD");
			this.datetimeBegin =  this.$moment(new Date()).add(-1,"d").format("YYYY-MM-DD");
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

			handelShowDetail(orderNo){

				this.$router.push({path: '/repayDetail', query: {orderNo: orderNo}});
			},

			getData() {

				//按日查询 choseDate,dateFormat,queryType
				//
				//this.$moment(choseDate).add(1,"d").format("YYYY-MM-DD");
				var datetimeBegin = this.$moment(this.datetimeBegin).format("YYYY-MM-DD");
				var datetimeEnd = this.$moment(this.datetimeEnd).add(1,"d").format("YYYY-MM-DD");

				let params = {
					"datetimeBegin": datetimeBegin,
					"datetimeEnd": datetimeEnd,
					'pageSize': this.pageSize,
					'index': this.queryPage,
					'userName': this.userName,
					orderNo: this.orderNo,
					channelId:"龙信"
				};

				this.$axios.post("/weishang-manager-webservice/wsAdmin/loan/v2/queryReportLoanComfirm.security", params).then((res) => {
				this.datatable = res.data;
				this.total = res.totalcount;
				this.per_page = res.pageSize;
				this.current = res.pageSize;
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
