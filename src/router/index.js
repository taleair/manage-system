import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[


              //<!-- 众安相关begin-->
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

              //<!-- 众安相关end-->
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/assetCreater',
                    component: resolve => require(['../components/business/assetCreater.vue'], resolve)
                },
                {
                    path: '/assetViewer',
                    component: resolve => require(['../components/business/assetViewer.vue'], resolve)
                },
                ,
                {
                    path: '/assetDetail',
                    component: resolve => require(['../components/business/assetDetail.vue'], resolve)
                },

                {
                    path: '/queryAssetPool',
                    component: resolve => require(['../components/business/queryAssetPool.vue'], resolve)
                },
                {
                    path: '/importAsset',
                    component: resolve => require(['../components/business/importAssetExcel.vue'], resolve)
                },
                {
                    path: '/excelDemo',
                    component: resolve => require(['../components/page/excelDemo.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable2.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
