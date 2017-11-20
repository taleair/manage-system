<template>

<div>
<div class="crumbs">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 网金社</el-breadcrumb-item>
        <el-breadcrumb-item>产品计划管理</el-breadcrumb-item>
    </el-breadcrumb>
</div>
  <div class="form-box">
  <div class="el-form-item">
    <span class="demonstration">导入时间</span>
    <el-date-picker
      v-model="param.dateTime"
      align="right"
      type="date"
      @change="getData()"
      placeholder="选择日期"
      :picker-options="pickerOptions1">
    </el-date-picker>
    </div>
  </div>
    <div class="table">
        <el-table :data="tableData" border stripe >
            <el-table-column fixed type="index" label="序号" min-width="90">
            </el-table-column>
            <el-table-column fixed prop="no" label="产品编号" min-width="130">
            </el-table-column>
            <el-table-column fixed prop="name" label="产品名称" min-width="300">
            </el-table-column>
            <el-table-column prop="sellDate" label="上架日期" min-width="150">
            </el-table-column>
            <el-table-column prop="shutDate" label="下架日期" min-width="150">
            </el-table-column>
            <el-table-column prop="issueAmount" label="产品发行金额" min-width="120">
            </el-table-column>
            <el-table-column prop="issueRate" label="发行利率" min-width="80">
            </el-table-column>
            <el-table-column prop="pkgCount" label="基础资产情况" min-width="110">
            </el-table-column>
            <el-table-column prop="interestDate" label="起息日期" min-width="150">
            </el-table-column>
            <el-table-column prop="endDate" label="到期日起"  min-width="150">
            </el-table-column>
            <el-table-column prop="pkgAmount" label="打包金额" min-width="80">
            </el-table-column>
            <el-table-column prop="status" label="产品状态" min-width="80">
            </el-table-column>
            <el-table-column fixed="right"  label="操作" min-width="200">
              <!-- <template scope="scope">
                  <span v-if="scope.row.status == 4">
                  <el-button size="small" type="primary"
                          @click="handleEdit(scope.$index, scope.row)">打包</el-button>
                  <el-button size="small" type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                          <el-button size="small"
                                  @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                  </span>

                  <span v-else>
                  <el-button size="small" type="primary"
                          @click="handleEdit(scope.$index, scope.row)">发送</el-button>
                          <el-button size="small"
                                  @click="handleDelete(scope.$index, scope.row)">详情</el-button>
                  </span>
              </template> -->
              <template>
                <el-button size="small" type="primary"
                        @click="handlePackage(scope.$index, scope.row)">打包</el-button>
                <el-button size="small"
                        @click="handleDelete(scope.$index, scope.row)">详情</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!--<div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div> -->
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

                tableData: [],
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
                  dateTime:new Date()
                }
            }
        },
        created(){
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                var queryParam = {pageSize:100000};
                var _moment = this.$moment;

                queryParam.datetimeBegin = _moment(this.param.dateTime).format("YYYY-MM-DD");
                queryParam.datetimeEnd = _moment(this.param.dateTime).add(1,"d").format("YYYY-MM-DD");
                this.$axios.post('/weishang-manager-webservice/wsAdmin/wjs/queryProduct', queryParam).then((res) => {
                    try{
                      this.tableData = res.data.dataBody.data;
                    } catch (e){

                    }
                });
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handlePackage(index, row) {
                //this.$message('编辑第'+(index+1)+'行');
                self.$axios.post('/weishang-manager-webservice/wsAdmin/wjs/packageProduct', {no:row.no}).then((res) => {
                    try{
                      this.$message('打包成功');
                    } catch (e){

                    }

                });

            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            handleDetail(index,row){
              this.$router.push("assetDetail?productId="+row.productId);
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
