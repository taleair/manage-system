<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="tableData" border stripe >
            <el-table-column fixed prop="date" label="序号" min-width="90">
            </el-table-column>
            <el-table-column fixed prop="name" label="产品编号" min-width="130">
            </el-table-column>
            <el-table-column fixed prop="name" label="产品名称" min-width="130">
            </el-table-column>
            <el-table-column prop="name" label="上架日期" min-width="130">
            </el-table-column>
            <el-table-column prop="name" label="下架日期" min-width="130">
            </el-table-column>
            <el-table-column prop="name" label="产品发行金额" min-width="130">
            </el-table-column>
            <el-table-column prop="name" label="发行利率" min-width="130">
            </el-table-column>
            <el-table-column prop="name" label="基础资产情况" min-width="130">
            </el-table-column>
            <el-table-column prop="name" label="起息日期" min-width="130">
            </el-table-column>
            <el-table-column prop="name" label="到期日起">
            </el-table-column>
            <el-table-column prop="name" label="打包金额">
            </el-table-column>
            <el-table-column prop="name" label="产品状态">
            </el-table-column>
            <el-table-column prop="name" label="操作">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: '../../../static/vuetable.json',
                tableData: [],
                cur_page: 1
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
                    //self.tableData = res.data.list;？？
                    self.tableData = res.data.dataBody.data;
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
