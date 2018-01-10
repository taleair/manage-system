<template>
	<div>
    <!-- 头信息 -->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i></i>贷后系统</el-breadcrumb-item>
        <el-breadcrumb-item>资方分流</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="channelInfo" border>
 		 <el-table-column prop="channelDesc" label="资方" min-width="40">
 		 </el-table-column>
     <el-table-column prop="totalAmount" label="总资金" min-width="40">
 		 </el-table-column>
     <el-table-column prop="availableAmount" label="账户金额" min-width="40">
 		 </el-table-column>
     <el-table-column prop="frozenAmount" label="冻结金额" min-width="40">
 		 </el-table-column>
     <el-table-column prop="replayId" label="审批通过金额" min-width="60">
 		 </el-table-column>
     <el-table-column prop="loanAmount" label="日放款金额" min-width="40">
 		 </el-table-column>
     <el-table-column prop="loanOrderNum" label="日放款笔数" min-width="40">
 		 </el-table-column>
     <el-table-column prop="updateTime" label="启用/关闭时间" min-width="80">
 		 </el-table-column>
     <el-table-column label="状态" min-width="40">
			 <template scope="scope">
					 <span v-if="scope.row.channelStatus == '1'">已启用</span>
					 <span v-else>已禁用</span>
			 </template>
 		 </el-table-column>
     <el-table-column label="操作">
       <!-- <template scope="scope">
         <el-button size="mini" type="primary"
           @click="handelShowDetail(scope.row.replayId)">充值</el-button>
         <el-button size="mini" type="primary"
           @click="handelShowDetail(scope.row.replayId)">禁用</el-button>
       </template> -->
			 <template scope="scope">
			 <template v-if="scope.row.channelStatus == '1'">
				 <el-button size="mini" type="primary"
					 @click="rechargeChannel(scope.row)">充值</el-button>
				 <el-button size="mini" type="danger"
					 @click="disableChannelById(scope.row)">禁用</el-button>
			 </template>
			 <template scope="scope" v-else>
				 <el-button size="mini" type="primary"
					 @click="rechargeChannel(scope.row)">充值</el-button>
				 <el-button size="mini" type="primary"
					 @click="enableChannelById(scope.row)">启用</el-button>
			 </template>
			 </template>
 		 </el-table-column>
   </el-table>
   <br />
   <br />
   <div style="margin-bottom: 20px;">

     <el-button
       @click="addTab()" type="primary"
     >
       新&nbsp;&nbsp;建
     </el-button>
		 <el-button
			 @click="delTab()" type="danger"
		 >
			 删&nbsp;&nbsp;除
		 </el-button>
   </div>

   <el-tabs v-model="activeTab" type="card" @tab-click="templateTabChange">

  <el-tab-pane
    v-for="(item, index) in modTabs"
    :key="item.templateId"
    :label='item.templateName'
    :name="item.templateId"
  >
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>限额策略</span>
        <el-button style="float: right; padding: 3px 4px;margin:0px 4px;" type="primary" @click="enableLimit()">编　辑</el-button>
				<el-button style="float: right; padding: 3px 4px;margin:0px 4px;" type="primary" :disabled="limitEditable" @click="saveLimit()">保　存</el-button>
      </div>
			<el-radio-group v-model="radioLimit" :disabled="limitEditable">
			<div v-for="(channel,index) in channelListLimit" style="font-size:14px;margin-bottom:4px;">
				<el-radio  :label="channel.loanChannel">{{channel.channelDesc}}</el-radio>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				每日最低限额：
				<el-input size="medium" v-model="channel.minLimit" :disabled="limitEditable"></el-input>
			</div>
			</el-radio-group>
    </el-card>
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>权重策略</span>
        <el-button style="float: right; padding: 3px 4px;margin:0px 4px;" type="primary" @click="enableWeight()">编　辑</el-button>
				<el-button style="float: right; padding: 3px 4px;margin:0px 4px;" type="primary" :disabled="weightEditable" @click="saveWeight()">保　存</el-button>
      </div>
			<div v-for="channel in channelListWeight" style="font-size:14px;">
				<span>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{channel.channelDesc}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;权重：
			</span>
				<span style="position:relative;top:10px;"><el-input-number :disabled="weightEditable" size="small" v-model="channel.channelWeight" :min="0" :max="100"></el-input-number>
			</span>
			</div>
    </el-card>
		<el-button style="padding: 3px 4px;margin:10px 4px;" size="large" type="primary" @click="activeChannel(''+item.templateId,item.templateId)">启　用</el-button>
  </el-tab-pane>

</el-tabs>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				currentChannelInfo : null,//当前渠道信息 没用到
				currentTemplate:null,//当前模板信息
        channelInfo:[],//渠道列表
        activeTab:"1",//激活的渠道 id
				activeTemplateId:"",
        modTabs:[],//模板--显示用
				totalTemplate:{},//模板 -- 分好组纯数据使用
				channelListLimit:[
					{channelName:"测试",channelId:"test",miniSize:130,weight:10}
				],
				channelListWeight:[
					{channelName:"测试",channelId:"test",miniSize:130,weight:20}
				],
				radioLimit:"",
				limitEditable:true,
				weightEditable:true
      }
		},
		created() {
			this.initAll();
			// this.testMethod();

		},
		watch: {　　　　　　　

		},
		computed: {

		},


		methods: {

			testMethod(){

			},


			rechargeChannel(row){
				this.$prompt('充值金额', '充值', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[0-9]*$/,
          inputErrorMessage: '金额不正确'
        }).then(({ value }) => {
					this.$axios.post("/weishang-manager-webservice/wsAdmin/addAvailableAmount.security",
					{loanChannel:row.loanChannel,addAmount:value}).then((res) => {
						row.availableAmount += parseInt(value);
					});
        }).catch(() => {

        });
			},
			enableChannelById(row){
				this.$axios.post("/weishang-manager-webservice/wsAdmin/enableChannel.security", {loanChannel:row.loanChannel}).then((res) => {
						row.channelStatus = "1";
				});
			},
			disableChannelById(row){
				this.$axios.post("/weishang-manager-webservice/wsAdmin/disableChannel.security", {loanChannel:row.loanChannel}).then((res) => {
						row.channelStatus = "0";
				});
			},
			enableLimit(){
				


				this.limitEditable = false;
			},
			enableWeight(){
				this.weightEditable = false;
			},
			clearData(){
				this.currentChannelInfo = null;
				this.currentTemplate = {};
				this.channelInfo = [];
				this.activeTab = "1";
				this.modTabs = [];
				this.totalTemplate = {};
				this.channelListLimit = [{channelName:"测试",channelId:"test",miniSize:130,weight:10}];
				this.channelListWeight = [{channelName:"测试",channelId:"test",miniSize:130,weight:10}];
				this.radioLimit = "";
			},
			initAll(){
				// //真麻痹丑。。。 写这种代码 我骄傲了么???
        this.fillChannerInfo();
			},

			afterSaveStrategy(){

			},

			saveLimit(){
				var param = this.$.extend(true,[],this.channelListLimit);
				var currentTemplateId = this.currentTemplate.templateId;
				for(var i = 0 ; i < param.length ; i++){
					param[i]["templateId"] = this.currentTemplate.templateId;
					if(param[i].loanChannel == this.radioLimit){
						param[i].strategyStatus = "1";
					} else {
						param[i].strategyStatus = "0";
					}
				};

				this.$axios.post("/weishang-manager-webservice/wsAdmin/saveStrategyLimit.security", param).then((res) => {

				});
				this.limitEditable = true;
				this.initAll();


			},

			saveWeight(){
				var param = this.$.extend(true,[],this.channelListWeight);
				var currentTemplateId = this.currentTemplate.templateId;
				for(var i = 0 ; i < param.length ; i++){
					param[i]["templateId"] = this.currentTemplate.templateId;
				};

				this.$axios.post("/weishang-manager-webservice/wsAdmin/saveStrategyWeight.security", param).then((res) => {

				});
				this.weightEditable = true;
				this.initAll();

			},


			templateTabChange(tab, event){
				// console.info(this.activeTab);
				var _template = this.modTabs.getItemByEntityValue("templateId",this.activeTab);
				this.currentTemplate = _template;
				this.fillStrategy();


			},


			initJQMethods(){
					//this.activeChannel("#tab-"+ this.currentTemplate.templateId);
					this.activeChannel(""+this.currentTemplate.templateId);
			},
			groupStrategy(){
					this.$axios.post("/weishang-manager-webservice/wsAdmin/queryStrategy.security", {}).then((res) => {
						 	var totalTemplate = this.totalTemplate;
							if(res == null || res.length == 0) return;
							for(var i = 0 ; i < res.length ; i++){
									var loanChannel = res[i].loanChannel;
									var templateId = res[i].templateId;
									var channelWeight = res[i].channelWeight;
									var minLimit = res[i].minLimit;
									var strategyStatus = res[i].strategyStatus;
									if(!totalTemplate[templateId]){
										totalTemplate[templateId] = {limitStrategy:[],weightStrategy:[]};
									};
									var templateTemp = totalTemplate[templateId];
									templateTemp.limitStrategy.push({"loanChannel":loanChannel,"minLimit":minLimit,"strategyStatus":strategyStatus});
									templateTemp.weightStrategy.push({"loanChannel":loanChannel,"channelWeight":channelWeight});
							}
							this.fillStrategy();
							this.initJQMethods();
					});
			},

			checkRadio(limitStrategyList){
				if(!limitStrategyList || limitStrategyList.length == 0) {
					this.radioLimit = "";
					return;
				};
				for( var i = 0 ; i < limitStrategyList.length;i++){
					var limitStrategy = limitStrategyList[i];
						if(limitStrategy.strategyStatus == "1"){
							this.radioLimit = limitStrategy.loanChannel;
						}
				}
			},

			fillStrategy(){

					var tempStrategy = {limitStrategy:[],weightStrategy:[]};
					var limitStrategyTemp = this.$.extend(true,[],this.channelInfo);
					var weightStrategyTemp = this.$.extend(true,[],this.channelInfo);
					var currenttemplateId = this.currentTemplate.templateId;
					var currentTemplate = this.totalTemplate[currenttemplateId];
					if(!currentTemplate){
						currentTemplate = {limitStrategy:[],weightStrategy:[]};
					}

					limitStrategyTemp.joinObjectByKey(currentTemplate.limitStrategy,"loanChannel");
					weightStrategyTemp.joinObjectByKey(currentTemplate.weightStrategy,"loanChannel");
					this.channelListLimit = limitStrategyTemp;
					this.channelListWeight = weightStrategyTemp;
					this.checkRadio(currentTemplate.limitStrategy);


			},

			fillChannerInfo(){
				var thisPromise = this.$axios.post("/weishang-manager-webservice/wsAdmin/queryChannelList.security", {}).then((res) => {
					var loanAmountDateBegin = this.$moment().format("YYYY-MM-DD");
					var loanAmountDateEnd = this.$moment().add(1,"d").format("YYYY-MM-DD");
					this.$axios.post("/weishang-manager-webservice/wsAdmin/loanAmount.security", {datetimeBegin:loanAmountDateBegin,datetimeEnd:loanAmountDateEnd}).then((res2) => {
						res.joinObjectByKey(res2.details,"loanChannel","channelCode");
						this.channelInfo = res;

						this.initTemplate();
					});

				});
				return thisPromise;
			},
			activeTemplate(templateList){
				if(!templateList || templateList.length == 0) return;
				for(var i = 0 ; i < templateList.length ; i++){
					var _template = templateList[i];
					 if(_template.templateStatus == "1"){
						 this.activeTab = "";
						 this.activeTab = _template.templateId;
						 this.currentTemplate = _template;
					 }
				}
			},
			initTemplate(){
				this.$axios.post("/weishang-manager-webservice/wsAdmin/queryStrategyTemplate.security", {}).then((res) => {
						this.modTabs = res;
						this.activeTemplate(res);
						this.groupStrategy();
				});
			},

      clearActiveTip(){
        this.$(".tplugin-active-tip-border").remove();
        this.$(".tplugin-active-tip-font").remove();
      },
      activeChannel(tabIdSrc,channelId){

				var tabId = "#tab-" + tabIdSrc;
				this.clearActiveTip();
        var $_activeTip = this.$('<div class="tplugin-active-tip-border"></div><div class="tplugin-active-tip-font">已启用</div>');
				this.$(tabId).append($_activeTip);
				if(channelId){
					this.updateTemplateStatus(channelId);
				}
				this.activeTemplateId = tabIdSrc;
      },
      addTab(){

				this.$prompt('模板名称', '模板名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
					inputPattern: /^\S+$/,
          inputErrorMessage: '模板名称不能为空'
        }).then(({ value }) => {
					var modTabsLength = this.modTabs.length;
	        var nextTabIndex = modTabsLength + 1;
	        var nextTab = {};
	        nextTab.templateName = (value + "　");
	        nextTab.templateId = (Math.round(new Date().getTime()/100) -15000000000) + "";
	        nextTab.templateStatus = "0";

	        this.modTabs.push(nextTab);
	        this.activeTab = nextTab.templateId;
					// console.info(this.currentTemplate);
					this.currentTemplate = nextTab;
					this.fillStrategy();
					this.saveNewTemplate(nextTab.templateId,value);
        }).catch(() => {

        });
      },

			delTab(){
				var currentTemplateId = this.currentTemplate.templateId;
				console.info(this.activeTemplateId);
				if(currentTemplateId == this.activeTemplateId){
					alert("不能删除启用模板！");
				} else {
					this.$axios.post("/weishang-manager-webservice/wsAdmin/deleteTemplate.security", {"templateId":currentTemplateId}).then((res) => {
							this.initTemplate();
					});
				}
			},

			saveNewTemplate(templateId,templateName){
				this.$axios.post("/weishang-manager-webservice/wsAdmin/insertStategyTemplate.security", {"templateId":templateId,"templateName":templateName}).then((res) => {


				});
			},
			updateTemplateStatus(templateId){
				this.$axios.post("/weishang-manager-webservice/wsAdmin/activeTemplate.security", {"templateId":templateId}).then((res) => {


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

.tplugin-active-tip-border{
  height:16px;
  position:absolute;
  top :-6px;
  right:-20px;
  border-bottom: 16px solid red;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  width: 28px;
  -webkit-transform:rotate(45deg);
}

.tplugin-active-tip-font{
    font-size:8px;
    width: 28px;
    -webkit-transform:rotate(45deg);
    position:absolute;
    right:5px;
    top :-6px;
    color:#fff;
}
.el-input--medium{
	width:200px;
}
.el-tabs__item.is-active{
	background-color: #00d1b2;
	color:#fff;
	border-bottom-color:#00d1b2;
}
.disable-edit{

}
</style>
