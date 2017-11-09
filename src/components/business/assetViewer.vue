<template>

<div>
<div class="crumbs">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 网金社</el-breadcrumb-item>
        <el-breadcrumb-item>产品计划查询</el-breadcrumb-item>
    </el-breadcrumb>
</div>
  <div class="form-box">
  <div class="el-form-item">
    <span class="demonstration">导入时间</span>
    <el-date-picker
      v-model="value2"
      align="right"
      type="date"
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
            <el-table-column prop="issueAmount" label="产品发行金额" min-width="80">
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
            <el-table-column fixed="right"  label="操作" min-width="100">
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
                url: '../../../static/vuetable.json',
                tableData: [],
                cur_page: 1,
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
                value1: '',
                value2: ''
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
                let self = this;

                self.$axios.post('/weishang-manager-webservice/wsAdmin/wjs/queryProductPool', {pageSize:20}).then((res) => {
                    try{
                      self.tableData = res.data.dataBody.data;
                    } catch (e){

                    }

                })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
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
