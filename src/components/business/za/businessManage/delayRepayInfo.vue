<template>
<div>
  <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-menu"></i> 众安后台管理</el-breadcrumb-item>
          <el-breadcrumb-item>授信申请</el-breadcrumb-item>
      </el-breadcrumb>
  </div>


  <div class="form-box">
  <div class="el-form-item">
    <el-form-item label="表单名称">
        <el-input v-model="bizTransCode"></el-input>
    </el-form-item>
    </div>
  </div>


<div class="table">
    <el-table v-loading="loading" :data="tableData" border stripe >
        <el-table-column fixed type="index" label="序号" min-width="90">
        </el-table-column>
        <el-table-column  prop="bizNo" label="业务编号" min-width="130">
        </el-table-column>
        <el-table-column prop="bizType" label="业务类型" min-width="150">
        </el-table-column>
        <el-table-column prop="bizStatus" label="业务状态" min-width="120">
        </el-table-column>
        <el-table-column prop="bizMemo" label="业务备注" min-width="80">
        </el-table-column>
        <el-table-column prop="operaCode" label="处理代码" min-width="80">
        </el-table-column>
        <el-table-column prop="operaMsg" label="" min-width="80">
        </el-table-column>
        <el-table-column prop="operaStatus" label="处理状态" min-width="80">
        </el-table-column>
        <el-table-column prop="repeatStatus" label="0" min-width="80">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"  min-width="150">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" min-width="80">
        </el-table-column>
    </el-table>
</div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                loading: true,
                productNo:this.$route.query.productNo
            }

        },
        created(){
          this.loading=true;
          this.getData();

        },
        methods: {
          getData(){

              let self = this;
              var queryParam = {pageSize:100000};
              queryParam.productNo = this.productNo;
              //queryParam.datetimeBegin = this.param.dateTime.Format("yyyy-MM-dd");
              //queryParam.datetimeEnd = this.param.dateTime.Format("yyyy-MM-dd");
              self.$axios.post('/weishang-manager-webservice/wsAdmin/za/queryProductDetail', queryParam).then((res) => {
                  try{
                    //self.tableData = res.data.dataBody.data;
                    self.tableData = res.data;
                  } catch (e){

                  }
                  this.loading=false;
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
