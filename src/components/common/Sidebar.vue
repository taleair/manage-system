<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'welcome',
                        title: '自述'
                    }

                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created() {
          //console.info(this.$moment);
          //蔚商 财务相关菜单
          var ws_cw_menu ={icon:'el-icon-date',title:"财务管理",index:'2',subs:[{index:'loanList',title:'放款列表'},{index:'loanRepayList',title:'还款对账'}]};
          //金鑫小贷 相关菜单
          var jxxd_menu = {icon: 'el-icon-date',title:"金鑫小贷",index:'3',subs : [{index : 'loanList_jx',title: '放款列表'}]};
          //网金社 相关菜单
          var wjs_menu = {icon: 'el-icon-date',title:"网金社",index:'-1',subs : [{index : 'assetCreater',title: '产品计划导入'},{index : 'importAsset',title: '批量导入产品计划'},{index : 'assetViewer',title: '产品计划管理'},{index : 'queryAssetPool',title: '资产池'}]};
          //众安后台管理
          var za_menu = {icon:'el-icon-date',title:"众安后台管理",index:'1',subs:[{index:'zaConfirmInfo',title:'授信申请'},{index:'zacreditApplyInfo',title:'借款申请'},{index:'zaDelayRepayInfo',title:'逾期还款任务'},{index:'zaCollectionRepayInfo',title:'归集还款任务'},{index:'zaProxyPayInfo',title:'代偿处理任务'}]};
          //获取权限
          var access_token = this.$getUrlParam("access_token");
          this.$axios.post("/weishang-manager-webservice/wsAdmin/getMeum.security?access_token="+access_token, {}).then((res) => {
              var userKind = res;
              //管理员
              if("admin" == userKind){
                this.items.push(ws_cw_menu);
                this.items.push(jxxd_menu);
                this.items.push(wjs_menu);
                this.items.push(za_menu);
              }
              //金鑫小贷
              else if("customer_jx" == userKind){
                this.items.push(jxxd_menu);
                //蔚商财务人员
              } else if("customer_cw" == userKind){
                this.items.push(ws_cw_menu);
                this.items.push(jxxd_menu);
              }
          });

        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
