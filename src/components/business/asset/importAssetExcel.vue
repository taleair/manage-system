<!-- xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com -->
<template>
<div @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
	<div class="row">
		<div class="col-xs-12">
			<el-form class="form-inline">
				<div class="form-group">
					<el-form-item>
					<input type="file"
						class="el-button el-button--primary" id="file" :accept="SheetJSFT"
						@change="_change" />
						<el-button type="primary" @click="onSubmit">提交</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</div>

	<div class="row">
		<div class="table">
				<el-table :data="tableData" border stripe >
						<el-table-column fixed type="index" label="序号" min-width="90">
						</el-table-column>
						<el-table-column fixed prop="no" label="产品编号" min-width="130">
							<template scope="scope">
									<el-input v-model="scope.row.no"/>
							</template>
						</el-table-column>
						<el-table-column fixed prop="name" label="产品名称" min-width="300">
							<template scope="scope">
									<el-input v-model="scope.row.name"/>
							</template>
						</el-table-column>
						<el-table-column prop="issueAmount" label="产品发行金额" min-width="120">
							<template scope="scope">
									<el-input v-model="scope.row.issueAmount"/>
							</template>
						</el-table-column>
						<el-table-column prop="sellDate" label="上架日期" min-width="150">
							<template scope="scope">
									<el-input v-model="scope.row.sellDate"/>
							</template>
						</el-table-column>
						<el-table-column prop="shutDate" label="下架日期" min-width="150">
							<template scope="scope">
									<el-input v-model="scope.row.shutDate"/>
							</template>
						</el-table-column>
						<el-table-column prop="interestDate" label="起息日期" min-width="150">
							<template scope="scope">
									<el-input v-model="scope.row.interestDate"/>
							</template>
						</el-table-column>
						<el-table-column prop="endDate" label="到期日起"  min-width="150">
							<template scope="scope">
									<el-input v-model="scope.row.endDate"/>
							</template>
						</el-table-column>

						<el-table-column prop="issueRate" label="发行利率" min-width="80">
							<template scope="scope">
									<el-input v-model="scope.row.issueRate"/>
							</template>
						</el-table-column>
						<el-table-column prop="pkgCount" label="基础资产情况" min-width="110">
							<template scope="scope">
									<el-input v-model="scope.row.pkgCount"/>
							</template>
						</el-table-column>

						<el-table-column fixed="right"  label="操作" min-width="80">
              <template scope="scope">
                          <el-button size="small" type="danger"
                                  @click="handleDetail(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
				</el-table>
	</div>
</div>

</div>
</template>

<script>
const _XLSX = require('xlsx');
const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX;
const make_cols = refstr => Array(X.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:X.utils.encode_col(i), key:i}));

/* see Browser download file example in docs */
function s2ab(s) {
	const buf = new ArrayBuffer(s.length);
	const view = new Uint8Array(buf);
	for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

const _SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");
export default {
	data() {
		return {
			tableData:[],
			SheetJSFT: _SheetJSFT
		}; },
		methods: {
			onSubmit(){
				console.info(this.tableData[0]);
				/**
				提交
				*/
				this.$axios.post('/weishang-manager-webservice/wsAdmin/wjs/batchInsertProduct', this.tableData).then((res) => {
						try{
							this.$message("上传成功");
							this.tableData = [];
						} catch (e){
								logger.error(e);
						}
				});
			},

			handleDetail(rowIndex){
				//delete this.tableData[rowIndex];
				//console.info(this.tableData);
				//this.tableData.remove(rowIndex);
				//console.info(this.tableData);
				this.tableData.splice(rowIndex,1);
			},
			_suppress(evt) { evt.stopPropagation(); evt.preventDefault(); },
			_drop(evt) {
				evt.stopPropagation(); evt.preventDefault();
				const files = evt.dataTransfer.files;
				if(files && files[0]) this._file(files[0]);
			},
			_change(evt) {
				const files = evt.target.files;
				if(files && files[0]) this._file(files[0]);
			},
			_file(file) {
				/* Boilerplate to set up FileReader */
				const reader = new FileReader();
				reader.onload = (e) => {
					/* Parse data */
					const bstr = e.target.result;
					const wb = X.read(bstr, {type:'binary'});
					/* Get first worksheet */
					const wsname = wb.SheetNames[0];
					const ws = wb.Sheets[wsname];
					/* Convert array of arrays */
					const data = X.utils.sheet_to_json(ws, {header:1});
					/* Update state */
					// this.data = data;

					this.tableData = [];

					if(!data.length || data.length < 2) return;
					for(var i = 1 ; i < data.length;i++){
						var obj = {};
						if(data[i] != null && data[i][0] && data[i][0] != ""){
							if(data[i][0])obj.no = data[i][0];//产品编号
							if(data[i][1])obj.name = data[i][1];//产品名称

							if(data[i][2])obj.issueAmount = data[i][2];//产品发行金额

							if(data[i][3])obj.sellDate = data[i][3];//上架日期
							if(data[i][4])obj.shutDate = data[i][4];//下架日期

							if(data[i][5])obj.interestDate = data[i][5];//起息日期
							if(data[i][6])obj.endDate = data[i][6];//到期日起


							if(data[i][7])obj.issueRate = data[i][7];//发行利率
							if(data[i][8])obj.pkgCount = data[i][8];//基础资产情况


							this.tableData.push(obj);
						}

					}


					//this.cols = make_cols(ws['!ref']);
				};
				reader.readAsBinaryString(file);
			}
		}
	};
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
