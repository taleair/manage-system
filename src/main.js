import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import XLSX from 'xlsx';
import ElementUI from 'element-ui';
import moment from 'moment';
import jquery from 'jquery';
//import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import { Loading, Message } from 'element-ui'


Vue.use(ElementUI);
Vue.prototype.$axios = axios;//ajax服务
Vue.prototype.$moment = moment;//时间计算框架
Vue.prototype.$ = jquery;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

/**
* 拦截器
*/
// http响应拦截器

function _getUrlParam(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
};
//垃圾方法，丑陋的一比以后改
Array.prototype.getItemByEntityValue = function(key,value){
  var _thisLength = this.length ;
  if(_thisLength == 0){
    return {};
  }
  for(var i = 0 ; i < _thisLength ; i++){
    var _val = this[i][key];
    if(_val === value){
      return this[i];
    }
  }
  return {};
};

Array.prototype.joinObjectByKey = function(srcArr,srckey,dictKey){
  if(!dictKey){
    dictKey = srckey;
  }
  if(! srcArr || srcArr.length == 0) return;
  for(var i = 0 ; i < srcArr.length; i++){
    var srcItem = srcArr[i];
    var value = srcItem[srckey];
    var dictItem = this.getItemByEntityValue(dictKey,value);
    Object.assign(dictItem,srcItem);
  }
};

Vue.prototype.$getUrlParam = _getUrlParam;


/**
*更丑的代码 凑合先用 顺序执行器
*
*/
Vue.prototype.$syncExecutor = function(){
  var methods = arguments;
  if(! methods || methods.length == 0){
    return;
  }
  for(var i = 0 ; i < methods.length ; i++){
    
  }
};

axios.interceptors.request.use(config => {
  var _url = config.url;
  if(_url.indexOf(".") <= 0){
    config.url += ".security";
    var access_token = _getUrlParam("access_token");
    if(access_token)config.url += ("?access_token=" + access_token);
  }
  return config;
}, error => {
});






axios.interceptors.response.use(resp => {// 响应成功关闭loading
  //var header = resp.data.
  var resHead = resp.data.dataHead;
  var statusCode = resHead.status;
  if(502 == statusCode){
    alert(resHead.errorMessage);
    return {};
  } else if(400 == statusCode){
    alert("登录信息错误，请重新登录！");
    //location.href='http://test-cms.weishangtech.com/login?sys=6&callback=http://test-api.weishangtech.com/weishang-manager-webservice/index.html#/readme';
    //location.href='http://test-cms.weishangtech.com/login?sys=6&callback=http://localhost:38080/#/readme';
   //location.href='https://cms.weishangtech.com/login?sys=3&callback=https://manager.weishangtech.com/weishang-manager-webservice/index.html#/readme';
  }
  //后台框架提供，后台框架提供者Joshua Ding o(^_^)0~~~~
  // console.info(resp.data.dataBody);
  return resp.data.dataBody;
}, error => {
  alert("服务器繁忙，请稍后再试1");
  return {};
});
