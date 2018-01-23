<template>
	<div>
    <!-- 头信息 -->
    <div class="crumbs">
			<el-row>
				<el-col :span="20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i></i>贷后系统</el-breadcrumb-item>
        <el-breadcrumb-item>资方分流</el-breadcrumb-item>
      </el-breadcrumb>
		</el-col>
		<el-col :span="4">
			<div class="clock clock-shadow">
				<div class="secondPoint" style="">
					<div class="secondPointShow"></div>
					<div class="secondPointHidden"></div>
				</div>
				<div class="minutesPoint" style="">
					<div class="minutesPointShow"></div>
					<div class="minutesPointHidden"></div>
				</div>
				<div class="hourPoint" style="">
					<div class="hourPointShow"></div>
					<div class="hourPointHidden"></div>
				</div>
				<div class="innerCircular"></div>
			</div>
		</el-col>
		</el-row>
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
     <el-table-column prop="dayLoanAmount" label="日放款金额" min-width="40">
 		 </el-table-column>
     <el-table-column prop="dayLoanTimes" label="日放款笔数" min-width="40">
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
			<el-row :gutter="20" v-for="(channel,index) in channelListLimit" style="font-size:13px;margin-bottom:4px;">
				<el-col :span="4">
				<el-radio :label="channel.loanChannel">{{channel.channelDesc}}</el-radio>
			</el-col>
			<el-col :span="7" style="position:relative;top:4px;">
				每日最低限额：
			</el-col>
			<el-col :span="7" style="position:relative;top:-5px;">
				<el-input size="medium" v-model="channel.minLimit" :disabled="limitEditable"></el-input>
				</el-col>
			</el-row>
			</el-radio-group>
    </el-card>
    <br />
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>日期禁用策略</span>
				<el-button style="float: right; padding: 3px 4px;margin:0px 4px;" type="primary" @click="enableWeek()">编　辑</el-button>
				<el-button style="float: right; padding: 3px 4px;margin:0px 4px;" type="primary" :disabled="weekEditable" @click="saveWeek()">保　存</el-button>
			</div>
			<el-row :gutter="2" v-for="channel in channelWeek" style="font-size:14px;">
				<el-col :span="2" style="position:relative;top:4px;">
						{{channel.channelDesc}}：
						</el-col>
						<el-col :span="70" style="position:relative;top:4px;">
						<el-checkbox label="星期一" v-model="channel.channelWeek[0]" :disabled="weekEditable"></el-checkbox>
						<el-checkbox label="星期二" v-model="channel.channelWeek[1]" :disabled="weekEditable"></el-checkbox>
						<el-checkbox label="星期三" v-model="channel.channelWeek[2]" :disabled="weekEditable"></el-checkbox>
						<el-checkbox label="星期四" v-model="channel.channelWeek[3]" :disabled="weekEditable"></el-checkbox>
						<el-checkbox label="星期五" v-model="channel.channelWeek[4]" :disabled="weekEditable" ></el-checkbox>
						<el-checkbox label="星期六" v-model="channel.channelWeek[5]" :disabled="weekEditable"></el-checkbox>
						<el-checkbox label="星期日" v-model="channel.channelWeek[6]" :disabled="weekEditable"></el-checkbox>
						</el-col>
			</el-row>
		</el-card>
		<br />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>权重策略</span>
        <el-button style="float: right; padding: 3px 4px;margin:0px 4px;" type="primary" @click="enableWeight()">编　辑</el-button>
				<el-button style="float: right; padding: 3px 4px;margin:0px 4px;" type="primary" :disabled="weightEditable" @click="saveWeight()">保　存</el-button>
      </div>
			<el-row :gutter="2" v-for="channel in channelListWeight" style="font-size:13px;">
				<el-col :span="1">
				{{channel.channelDesc}}
				</el-col>
			<el-col :span="1">
			权重：
			</el-col>
				<el-col :span="20" style="position:relative;top:-8px;"><el-input-number :disabled="weightEditable" size="small" v-model="channel.channelWeight" :min="0" :max="100"></el-input-number>
			</el-col>
			</el-row>
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
				sourceClockTime:null,
				clockClickFlag:false,
				clockMouseDownFlag:false,
				clockHandler:null,
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
				channelWeek:[
					{channelName:"测试1",channelId:"test",channelWeek:[true,true,false,false,true,false,true]},
					{channelName:"测试2",channelId:"test2",channelWeek:[false,true,false,false,false,false,true]}
				],
				radioLimit:"",
				limitEditable:true,
				weightEditable:true,
				weekEditable:true
      }
		},

		created() {
			this.initAll();
			//启动秒针试试
			var self = this;
			setTimeout(function(){
				self.fillClock(self);
				var $ = self.$;
				$(".clock").mousedown(function(){
					if(self.clockClickFlag) return;
					self.clockClickFlag = true;
					$(".clock").removeClass("clock-shadow");
					$(".clock").addClass("clock-click");

				});
				$(document).mouseup(function(){
					if(self.clockClickFlag){
						if(self.clockMouseDownFlag) return;
						self.clockMouseDownFlag = true;
						$(".clock").addClass("clock-shadow");
						$(".clock").removeClass("clock-click");

						self.fillClock(self);
						self.initAll();
					};
				});
			},200);

		},
		watch: {　　　　　　　

		},
		computed: {

		},
		methods: {
			fillClock(self){
					var frames = 50;
					var $ = self.$;
					var $_second = $(".secondPoint");
					var $_minutes = $(".minutesPoint");
					var $_hours = $(".hourPoint");
					var nowTime = new Date();
					var nowHour = nowTime.getHours() % 12;
					var nowMinutes = nowTime.getMinutes();
					var nowSeconds = nowTime.getSeconds();
					var secondsRotate =  nowSeconds * 6;
					var minutesRotate = nowMinutes * 6 + Math.floor(nowSeconds/10);
					var hoursRotate = nowHour * 30 + Math.floor(nowMinutes/2);
					var framesSecondRotate = secondsRotate / frames;
					var framesminutesRotate = minutesRotate / frames;
					var framesHoursRotate = hoursRotate / frames;
					var framesSecondRotateStep = framesSecondRotate;
					var framesminutesRotateStep = framesminutesRotate;
					var framesHoursRotateStep = framesHoursRotate;

					var i = 0 ;

					var clockInterval = setInterval(function(){

						$_second.css("-webkit-transform","rotate("+ framesSecondRotate  +"deg)");
						$_minutes.css("-webkit-transform","rotate("+ framesminutesRotate +"deg)");
						$_hours.css("-webkit-transform","rotate("+ framesHoursRotate +"deg)");

						framesSecondRotate += framesSecondRotateStep;
						framesminutesRotate += framesminutesRotateStep;
						framesHoursRotate += framesHoursRotateStep;
						i++;
						if(i > frames){
							clearInterval(self.clockHandler);
							$_second.css("-webkit-transform","rotate("+ secondsRotate  +"deg)");
							$_minutes.css("-webkit-transform","rotate("+ minutesRotate +"deg)");
							$_hours.css("-webkit-transform","rotate("+ hoursRotate +"deg)");
							self.clockClickFlag = false;
							self.clockMouseDownFlag = false;
						}
					},1000/frames);
					self.clockHandler = clockInterval;

			},
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
			enableWeek(){
				this.weekEditable = false;
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

					if(!param[i]["minLimit"] || param[i]["minLimit"]==""){
						param[i]["minLimit"] = 0;
					};
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
					param[i]["strategyStatus"] = 1;
					if(!param[i]["channelWeight"] || param[i]["channelWeight"]== ""){
						param[i]["channelWeight"] = 0;
					};

				};

				this.$axios.post("/weishang-manager-webservice/wsAdmin/saveStrategyWeight.security", param).then((res) => {

				});
				this.weightEditable = true;
				this.initAll();
			},

			saveWeek(){
				var param = this.$.extend(true,[],this.channelWeek);
				var currentTemplateId = this.currentTemplate.templateId;
				for(var i = 0 ; i < param.length ; i++){
					param[i]["templateId"] = this.currentTemplate.templateId;
					// 麻痹太丑了，恶心死了。。。

					var channelWeekStr = "";
					for(var j = 0 ; j < param[i]["channelWeek"].length ; j++){
						if(param[i]["channelWeek"][j]){
							channelWeekStr += "1";
						} else {
							channelWeekStr += "0";
						}

					}
					param[i]["defaultValue"] = channelWeekStr;
					// console.info(param[i]);
				};

				this.$axios.post("/weishang-manager-webservice/wsAdmin/saveStrategyWeek.security", param).then((res) => {

				});
				this.weekEditable = true;
				// this.initAll();
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
									var channelWeekStr = res[i].channelWeek;
									var channelWeek = [];
									// console.info(res[i].channelWeek);
									if(res[i].channelWeek && res[i].channelWeek.length > 6){
										var channelWeekArr = res[i].channelWeek.split("");
										for(var j = 0 ; j < channelWeekArr.length ;j++){
											if(channelWeekArr[j] == "0"){
												channelWeek.push(false);
											} else {
												channelWeek.push(true);
											}
										}
									} else {
										channelWeek = [false,false,false,false,false,false,false];
									}
									if(!totalTemplate[templateId]){
										totalTemplate[templateId] = {limitStrategy:[],weightStrategy:[],weekStrategy:[]};
									};
									var templateTemp = totalTemplate[templateId];
									templateTemp.limitStrategy.push({"loanChannel":loanChannel,"minLimit":minLimit,"strategyStatus":strategyStatus});
									templateTemp.weightStrategy.push({"loanChannel":loanChannel,"channelWeight":channelWeight});
									templateTemp.weekStrategy.push({"loanChannel":loanChannel,"channelWeek":channelWeek});
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
					var weekStrategyTemp = this.$.extend(true,[],this.channelInfo);
					var currenttemplateId = this.currentTemplate.templateId;
					var currentTemplate = this.totalTemplate[currenttemplateId];
					if(!currentTemplate){
						currentTemplate = {limitStrategy:[],weightStrategy:[],weekStrategy:[]};
					}
					limitStrategyTemp.joinObjectByKey(currentTemplate.limitStrategy,"loanChannel");
					weightStrategyTemp.joinObjectByKey(currentTemplate.weightStrategy,"loanChannel");
					weekStrategyTemp.joinObjectByKey(currentTemplate.weekStrategy,"loanChannel");
					this.channelListLimit = limitStrategyTemp;
					this.channelListWeight = weightStrategyTemp;
					this.checkRadio(currentTemplate.limitStrategy);
					//时间策略
					this.channelWeek = weekStrategyTemp;

			},

			fillChannerInfo(){
				var thisPromise = this.$axios.post("/weishang-manager-webservice/wsAdmin/queryChannelList.security", {}).then((res) => {
					this.channelInfo = res;
					this.initTemplate();
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
.secondPoint{
	width:2px;
	height:116px;
	position:absolute;
	top : 2px;
	left:59px;

}

.secondPointShow{
	background-color:#eae3ac;
	width:2px;
	height:58px;
}
.secondPointHidden{
	width:2px;
	height:58px;
}
.minutesPoint{
	width:4px;
	height:88px;
	position:absolute;
	top : 16px;
	left:58px;

}
.minutesPointShow{
	background-color:#5287e8;
	width:4px;
	height:44px;
}
.minutesPointHidden{
	width:4px;
	height:44px;
}
.hourPoint{
	width:6px;
	height:60px;
	position:absolute;
	top : 30px;
	left:57px;
}
.hourPointShow{
	background-color:#f76544;
	width:6px;
	height:30px;
	left:57px;
}
.hourPointHidden{
	width:6px;
	height:30px;
}
.clock{
	background-color:#b2f9df;
	width:120px;
	height:120px;
	-webkit-border-radius: 50%;
	position:relative;

}
.clock-shadow{
	box-shadow: 5px 5px 2px #b3c1b8;
}

.clock-click{
	top : 5px;
	left : 5px;
}
.innerCircular{
	background-color: #028c77;
	-webkit-border-radius: 50%;
	width:14px;
	height:14px;
	z-index: 1000;
	position:absolute;
	top:53px;
	left:53px;
}
</style>
