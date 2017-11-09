<template>

    <div class="table">
    <div v-model="boxstyle" v-if='boxstyle==true' :class="box2">
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="表单名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button>确定</el-button>
        </el-form>
    </div>



<el-button @click="myMethod1()">填写信息</el-button>

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>


        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <input type="text" v-model="dataBox">
        <div>{{dataBox}}</div>
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
                cur_page: 1,

                form: {
                name:""
                },
                boxstyle:false,
                dataBox:"11111"
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

                self.$axios.post('/weishang-manager-webservice/wsAdmin/loanDetail', {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
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
            },
            myMethod1(p1){
            this.boxstyle=true;
            this.dataBox=this.form.name;

            console.log(this.dataBox,this.form.name)
              //this.$alert("11111")
              //this.$router.push("/baseform");

            }
        }
    }
</script>
<style>
.box { display:none }
.box2 { display:block; }
</style>
