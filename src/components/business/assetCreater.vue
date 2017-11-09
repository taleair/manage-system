<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 网金社</el-breadcrumb-item>
                <el-breadcrumb-item>产品计划导入</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="产品编号">
                    <el-input v-model="form.no"></el-input>
                </el-form-item>
                <el-form-item label="产品名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="产品发行金额">
                    <el-input v-model="form.issueAmount"></el-input>
                </el-form-item>
                <el-form-item label="上架日期">
                    <el-input v-model="form.sellDate"></el-input>
                </el-form-item>
                <el-form-item label="下架日期">
                    <el-input v-model="form.shutDate"></el-input>
                </el-form-item>
                <el-form-item label="起息日期">
                    <el-input v-model="form.interestDate"></el-input>
                </el-form-item>
                <el-form-item label="到期日期">
                    <el-input v-model="form.endDate"></el-input>
                </el-form-item>
                <el-form-item label="发行利率">
                    <el-input v-model="form.issueRate"></el-input>
                </el-form-item>
                <el-form-item label="基础资产情况">
                    <el-input v-model="form.pkgCount"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="onCanel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form: {
                    name: '',
                    no:'',
                    sellDate:'',
                    shutDate:'',
                    issueAmount:'',
                    issueRate:'',
                    pkgCount:'',
                    interestDate:'',
                    endDate:'',
                    pkgCount:''
                }
            }
        },
        methods: {
            onSubmit() {
            //  console.info(this.form);

            let self = this;
            try{
            self.$axios.post('/weishang-manager-webservice/wsAdmin/wjs/createProduct', {pageSize:20}).then((res) => {
                  self.tableData = res.data.dataBody.data;
                  this.$message.success('提交成功！');
                  onCanel();


            })

            } catch (e){
              this.$message.success('提交失败！');
            }
            },
            onCanel(){
              this.form = {
                  name: '',
                  no:'',
                  sellDate:'',
                  shutDate:'',
                  issueAmount:'',
                  issueRate:'',
                  pkgCount:'',
                  interestDate:'',
                  endDate:'',
                  pkgCount:''
              };
            }
        }
    }
</script>
