import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/readme'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
              {
                path: '/welcome',
                component: resolve => require(['../components/business/loan/Readme.vue'], resolve)
              },

              //<!-- 众安相关begin-->

              {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/assetCreater',
                    component: resolve => require(['../components/business/asset/assetCreater.vue'], resolve)
                },
                {
                    path: '/assetViewer',
                    component: resolve => require(['../components/business/asset/assetViewer.vue'], resolve)
                },
                ,
                {
                    path: '/assetDetail',
                    component: resolve => require(['../components/business/asset/assetDetail.vue'], resolve)
                },

                {
                    path: '/queryAssetPool',
                    component: resolve => require(['../components/business/asset/queryAssetPool.vue'], resolve)
                },
                {
                    path: '/importAsset',
                    component: resolve => require(['../components/business/asset/importAssetExcel.vue'], resolve)
                },
              {
                  path: '/zaCollectionRepayInfo',
                  component: resolve => require(['../components/business/za/businessManage/collectionRepayInfo.vue'], resolve)
              },
              {
                  path: '/zaConfirmInfo',
                  component: resolve => require(['../components/business/za/businessManage/confirmInfo.vue'], resolve)
              },
              {
                  path: '/zaCreditApplyInfo',
                  component: resolve => require(['../components/business/za/businessManage/creditApplyInfo.vue'], resolve)
              },
              {
                  path: '/zaDelayRepayInfo',
                  component: resolve => require(['../components/business/za/businessManage/delayRepayInfo.vue'], resolve)
              },
              {
                  path: '/zaProxyPayInfo',
                  component: resolve => require(['../components/business/za/businessManage/proxyPayInfo.vue'], resolve)
              },
              {
                  path: '/zaProxyPayMsgInfo',
                  component: resolve => require(['../components/business/za/businessManage/proxyPayMsgInfo.vue'], resolve)
              },
              {
                  path: '/zaTransMsg',
                  component: resolve => require(['../components/business/za/businessManage/transMsg.vue'], resolve)
              },
              //<!-- 众安相关end-->
                //loan后台
                ,{
                    path: '/loanList',
                    component: resolve => require(['../components/business/loan/loanList.vue'], resolve)
                }
                ,{
                    path: '/loanRepayList',
                    component: resolve => require(['../components/business/loan/repayList.vue'], resolve)
                }
                ,{
                    path: '/loanList_jx',
                    component: resolve => require(['../components/business/loan/loanList_jx.vue'], resolve)
                }
                ,{
                    path: '/channelAdmin',
                    component: resolve => require(['../components/business/loan/loanChannelAdmin/channelAdmin.vue'], resolve)
                }

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
