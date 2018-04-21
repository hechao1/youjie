<template>
    <div id='daily-index'>
        <h1 class="card-title">
            <span>&nbsp;&nbsp;每日数据<button-loading @click='getLink' :loading='loading_download'>下载报告</button-loading></span>
            <span>信用报告转化<button-loading @click='getLinktwo' :loading='loading_downloadtwo'>下载</button-loading></span>
        </h1>
        <!-- <div class="user-data loading-min-height">
            <loading v-if='loading_count' mode='full'></loading>
            <transition name='fade'>
                <ul class="user-data__list" v-if='hasUserCount'>
                    <li class="user-data__item">
                        <span> {{ userCount.newCount }} </span>
                        <p>今日新增用户</p>
                    </li>
                    <li class="user-data__item">
                        <span> {{ userCount.totalCount }} </span>
                        <p>总用户数</p>
                    </li>
                </ul>
            </transition>
        </div> -->
        <div class="user-data loading-min-height">
            <loading v-if='loading' mode='full'></loading>
            <transition name='fade'>
                <div class="total-count" v-if='hasDaily'>
                    <div class="user-data__item">
                        <span>{{daily.RegisterNow || placeholder}} / {{daily.RegisterAll || placeholder}}</span>
                        <p>当前注册人数 / 全部注册人数</p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.borrowTimesNow || placeholder}} / {{daily.borrowTimesAll || placeholder}}</span>
                        <p>当前发布借款次数 / 全部发布借款次数</p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.countApplyLendNow || placeholder}} / {{daily.countApplyLend || placeholder}}</span>
                        <p>今日申请量 / 总申请量</p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.lendTimesNow || placeholder}} / {{daily.lendTimesAll || placeholder}}</span>
                        <p>当前发布出借次数 / 全部发布出借次数</p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.bondEveryDayMoney || placeholder}} / {{daily.bondAllMoney || placeholder}}</span>
                        <p>当前保证金数 / 保证金总数 </p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.creditReportPayAmountNow | toYuan}} / {{daily.creditReportPayAmountAll | toYuan}}元</span>
                        <p>信用报告当前付费金额 / 全部付费金额</p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.userBalanceNow | toYuan}}元</span>
                        <p>当前账户余额</p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.receiptingTimesNow || placeholder}} / {{daily.receiptingTimesAll || placeholder}}</span>
                        <p>当前补借条次数 / 全部补借条次数</p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.chooseBUserCountNow || placeholder}} / {{daily.chooseBUserCountAll || placeholder}}</span>
                        <p>选择小b人数<br>当前 / 全部</p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.registChooseBUserCountNow || placeholder}} / {{daily.registChooseBUserCountAll || placeholder}}</span>
                        <p>注册小b人数<br>当前 / 全部</p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.scoreChargeAmountNow  | toYuan}} / {{daily.scoreChargeAmountAll | toYuan}}元</span>
                        <p>点券充值金额<br>当前 / 全部</p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.scoreChargeUserCountNow || placeholder}} / {{daily.scoreChargeUserCountAll || placeholder}}</span>
                        <p>点券充值人数<br>当前 / 全部</p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.platformScoreChargeAmountNow  | toYuan}} / {{daily.platformScoreChargeAmountAll  | toYuan}}点</span>
                        <p>平台已发放点券<br>当前 / 全部</p>
                    </div>
                    <div class="user-data__item" style='cursor:pointer; position: relative;' @click='couponsNumber()'>
                        <span>{{daily.useScoreAmountNow  | toYuan}} / {{daily.useScoreAmountAll  | toYuan}}点</span>
                        <p>点券使用点数<br>当前 / 全部</p>
                        <i class='el-icon-caret-right icon-bar'></i>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.useScoreUserCountNow || placeholder}} / {{daily.useScoreUserCountAll || placeholder}}</span>
                        <p>点券使用人数<br>当前 / 全部 </p>
                    </div>
                    <div class="user-data__item">
                        <span>{{daily.lendUserBrowseRecordCount || placeholder}}</span>
                        <p>累计浏览量</p>
                    </div>
                </div>
            </transition>
        </div>

        <h1 class="card-title">
            <span>数据记录</span>
        </h1>
        <div class="loading-min-height">
            <loading v-if='loading' mode='full'></loading>
            <div ref='chart' class="data-chart" style='height:700px'></div>
        </div>
    </div>
</template>

<script>
    import { Promise } from 'es6-promise'
    import footerBar from '../components/FooterBar.vue'
    import selectGroup from '../components/SelectGroup.vue'
    import selectOption from '../components/SelectOption.vue'
    import radioGroup from '../components/RadioGroup.vue'
    import datePicker from '../components/DatePicker.vue'
    import areaSelect from '../components/AreaSelect.vue'
    import radio from '../components/Radio.vue'
    import loading from '../components/Loading.vue'
    import checkBox from '../components/CheckBox.vue'
    import toolTip from '../components/ToolTip.vue'
    import modal from '../components/Modal.vue'
    import confirm from '../components/Confirm.vue'
    import buttonLoading from '../components/ButtonLoading.vue'
    import pagination from '../components/Pagination.vue'
    import dateFormat from '../filters/filter-dateFormat'
    import toYuan from '../filters/filter-toYuan'
    import  { mapGetters, mapActions }  from 'vuex'
    import { addLenderValidation, resetAccountPasswordValidation, operatorEditValidation } from '../validation/validation'
    import { allApi, lenderApi } from '../api/api'
    import moment from 'moment'
    import echarts from 'echarts'


    export default {
        components:{
            footerBar,
            selectGroup,
            selectOption,
            radioGroup,
            radio,
            checkBox,
            areaSelect,
            loading,
            toolTip,
            modal,
            confirm,
            buttonLoading,
            pagination,
            datePicker
        },
        filters:{
            dateFormat,
            toYuan,
            booleanToStr(boolean){
                if(boolean === true){
                    return '是'
                }
                else{
                    return '否'
                }
            }
        },
        data() {
            return {
                placeholder:'--',
                recommend:0,
                show_modal_detail:false,
                channel:'',
                name:'',
                userCount:'',
                curDetail:'',
                listInfo:{},
                daily:{},
                records:[],
                dateFrom:'',
                dateTo:'',
                mobile:'',
                loading_download:false,
                loading_downloadtwo:false,
                loading:true,
                loading_count:true,
            }
        },
        computed:{
            ...mapGetters([
                'msgTip',
                'localInfo'
            ]),
            currentPage(){
                if(_.isEmpty(this.listInfo)) return 1
                return this.listInfo.pageNum
            },
            dailyList(){
                if(this.daily.dailyData.length) return _.orderBy(this.daily.dailyData,'dailyTime')
                return []
            },
            allDate(){
                let arr = []
                if(this.dailyList.length) {
                    arr = _.map(this.dailyList,(value,index)=>{
                        return dateFormat(value.dailyTime,'YYYY-MM-DD')
                    })
                }
                return arr
            },
            applyLend(){
                if(this.dailyList.length) return _.map(this.dailyList,'applyLendCount')
                return []
            },
            scoreBalance(){
                if(this.dailyList.length) return _.map(this.dailyList,'scoreBalance') 
                return []
            },
            balance(){
                if(this.dailyList.length) return _.map(this.dailyList,'balance') 
                return []
            },
            borrowTimes(){
                if(this.dailyList.length) return _.map(this.dailyList,'borrowTimes') 
                return []
            },
            chooseBUserCount(){
                if(this.dailyList.length) return _.map(this.dailyList,'chooseBUserCount') 
                return []
            },
            creditReportPayAmount(){
                if(this.dailyList.length) {
                    let amount = _.map(this.dailyList,'creditReportPayAmount') 
                    _.each(amount,(value,index)=>{
                        amount[index] = value / 100
                    })
                    return amount
                } 
                return []
            },
            lendTimes(){
                if(this.dailyList.length) return _.map(this.dailyList,'lendTimes') 
                return []
            },
            platformScoreChargeAmount(){
                if(this.dailyList.length) {
                    let amount = _.map(this.dailyList,'platformScoreChargeAmount') 
                    _.each(amount,(value,index)=>{
                        amount[index] = value / 100
                    })
                    return amount
                } 
                return []
            },
            receiptingTimes(){
                if(this.dailyList.length) return _.map(this.dailyList,'receiptingTimes') 
                return []
            },
            registChooseBUserCount(){
                if(this.dailyList.length) return _.map(this.dailyList,'registChooseBUserCount') 
                return []
            },
            registerCount(){
                if(this.dailyList.length) return _.map(this.dailyList,'registerCount') 
                return []
            },
            scoreBalance(){
                if(this.dailyList.length) return _.map(this.dailyList,'scoreBalance') 
                return []
            },
            scoreChargeAmount(){
                if(this.dailyList.length) {
                    let amount = _.map(this.dailyList,'scoreChargeAmount') 
                    _.each(amount,(value,index)=>{
                        amount[index] = value / 100
                    })
                    return amount
                } 
                return []
            },
            scoreChargeUserCount(){
                if(this.dailyList.length) return _.map(this.dailyList,'scoreChargeUserCount') 
                return []
            },
            useScoreAmount(){
                if(this.dailyList.length) {
                    let amount = _.map(this.dailyList,'useScoreAmount') 
                    _.each(amount,(value,index)=>{
                        amount[index] = value / 100
                    })
                    return amount
                }  
                return []
            },
            useScoreUserCount(){
                if(this.dailyList.length) return _.map(this.dailyList,'useScoreUserCount') 
                return []
            },
            hasDaily(){
                return !_.isEmpty(this.daily)
            },
            noEditObject(){
                return _.isEmpty(this.editObject)
            },
            noInvoiceInfo(){
                return _.isEmpty(this.invoiceInfo)
            }
        },
        methods:{
            // actions
            ...mapActions([
                'showLoading',
                'hideLoading',
                'setMsgTip'
            ]),

            // filters
            timestampToDate(timestamp){
                if(!timestamp) return this.placeholder
                return moment(timestamp).format('YYYY-MM-DD')
            },
            //新增的点券数按钮
            couponsNumber(){
                // console.log('123123')
                this.$router.push({
                    name:'daily-coupons',
                    params:{
                        id:'item.orderId',
                    }
                })
                
            },
            // function

            getLink(){
                this.loading_download = true
                allApi.infoToExcel()
                .then(result=>{
                    this.loading_download = false
                    location.href = result.downloadUrl
                })
                .catch(error => {
                    this.loading_download = false
                    console.error(error)
                })

            },
             getLinktwo(){
                this.loading_downloadtwo = true
                allApi.creditReportToExcel()
                .then(result=>{
                    this.loading_downloadtwo = false
                    location.href = result.downloadUrl
                })
                .catch(error => {
                    this.loading_downloadtwo = false
                    console.error(error)
                })

            },
            showModalDetail(item){
                this.show_modal_detail = true
                this.curDetail = item
            },
            goDetail(item){
                this.$router.push({
                    name:'user-detail',
                    params:{
                        id:item.userId,
                    }
                })
            },
            getList(num){
                this.loading = true
                let params = {
                    pageSize:20,
                    pageNo:num,
                    stringdateFrom:this.dateFrom,
                    stringdateTo:this.dateTo,
                    mobile:this.mobile,
                    name:this.name,
                    channelStr:this.channel,
                }
                allApi.userList(params)
                .then(result=>{
                    this.loading = false
                    this.listInfo = result
                    this.records = result.records
                    if(result.totalPage < result.pageNum){
                        this.getList(result.totalPage)
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            },
            setRecommend(item){
                this.loading = true
                let params = {
                    userId:item.userId,
                }
                allApi.userRecommend(params)
                .then(result=>{
                    this.loading = false
                    this.getList(this.listInfo.pageNum)
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            },
            delRecommend(item){
                this.loading = true
                let params = {
                    userId:item.userId,
                }
                allApi.delRecommend(params)
                .then(result=>{
                    this.loading = false
                    this.getList(this.listInfo.pageNum)
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            },
            getDaily(){
                this.loading = true
                allApi.dataList()
                .then(result=>{
                    this.loading = false
                    this.daily = result
                    this.setChart()
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            },
            setChart(){
                let option = {
                    title: {
                        //text: '2000-2016年中国汽车销量及增长率'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    grid: {
                        containLabel: true,
                        top:100
                    },
                    legend: {
                        data: ['注册人数','发布借款次数','发布出借次数','申请量','信用报告付费金额','账户余额','点券余额','补借条次数','选择小b人数','注册小b人数','点券充值金额','点券充值人数','平台已发放点券','点券使用人数','点券使用点数'],
                        right:80,
                        selected: {
                            '注册人数': true, '发布借款次数': false, '发布出借次数': false,'申请量': false, '信用报告付费金额': true,'账户余额': false,'点券余额': false, '补借条次数': false, '选择小b人数': true,'注册小b人数': true, '点券充值金额': true, '点券充值人数': false,'平台已发放点券': false,'点券使用人数': false,'点券使用点数': true,
                        }
                    },
                    xAxis: [{
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: this.allDate
                    }],
                    yAxis: [ {
                        type: 'value',
                        name: '',
                        position: 'left'
                    }],
                    dataZoom: [{
                        startValue: moment().subtract(15, 'days').format('YYYY-MM-DD')
                    }, {
                        type: 'inside'
                    }],
                    series: [ {
                        name: '注册人数',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '注册人数',
                            label: {
                                normal: {
                                    // show: true,
                                    position: 'top'
                                }
                            },
                        data: this.registerCount
                    },{
                        name: '发布借款次数',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '发布借款次数',
                            label: {
                                normal: {
                                    // show: true,
                                    position: 'top'
                                }
                            },
                        data: this.borrowTimes
                    }, {
                        name: '发布出借次数',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '发布出借次数',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.lendTimes
                    }, {
                        name: '申请量',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '申请量',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.applyLendCount
                    }, {
                        name: '信用报告付费金额',
                        type: 'line',
                        yAxisIndex: 0,
                        stack: '信用报告付费金额',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.creditReportPayAmount
                    }, {
                        name: '账户余额',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '账户余额',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.balance
                    },{
                        name: '点券余额',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '点券余额',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.scoreBalance
                    }, {
                        name: '补借条次数',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '补借条次数',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.receiptingTimes
                    }, {
                        name: '选择小b人数',
                        type: 'line',
                        yAxisIndex: 0,
                        stack: '选择小b人数',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.chooseBUserCount
                    }, {
                        name: '注册小b人数',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '注册小b人数',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.registChooseBUserCount
                    }, {
                        name: '点券充值金额',
                        type: 'line',
                        yAxisIndex: 0,
                        stack: '点券充值金额',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.scoreChargeAmount
                    }, {
                        name: '点券充值人数',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '点券充值人数',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.scoreChargeUserCount
                    }, {
                        name: '平台已发放点券',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '平台已发放点券',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.platformScoreChargeAmount
                    }, {
                        name: '点券使用人数',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '点券使用人数',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.useScoreUserCount
                    }, {
                        name: '点券使用点数',
                        type: 'bar',
                        yAxisIndex: 0,
                        stack: '点券使用点数',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.useScoreAmount
                    }]
                };

                
                this.$nextTick(()=>{
                    let width = $('#data-list').width()
                    $(this.$refs.chart).css('width',width+'px')
                    
                    let myChart = echarts.init(this.$refs.chart);
                    myChart.setOption(option);
                })
            }
        },
        created(){
            // this.getAccount()
            // allApi.addDataList()
            this.getDaily()
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #daily-index{
        padding:0 40px 20px 40px;
        box-sizing:border-box;
        overflow:auto;
        .icon-bar{
            color:#00B1B3;
            position: absolute;
            bottom:42%;
            left:90%;
        }
        .data-chart{
            padding-top: 20px;
        }
        .user-data{
            padding-bottom: 20px;
        }
        .user-data__list{
            display:flex;
            padding-top: 20px;
            min-height:140px;
        }
        .user-data__item{
            display:flex;
            flex-direction: column;
            justify-content:center;
            align-items:center;
            width: 460px;
            padding:10px 0;
            box-sizing: border-box;
            margin-bottom: 15px;
            border:1px solid $sectionColor;
            border-radius:4px;
            box-shadow:rgba(0, 0, 0, 0.03) 0px 1px 6px, rgba(0, 0, 0, 0.04) 0px 1px 4px;
            margin-right:20px;
            span{
                display: block;
                font-size: 30px;
                color:$green;
                padding-left: 10px;
                padding-right: 10px;
            }
            p{
                padding: 10px;
                padding-bottom: 0;
                line-height:1.3;
            }
        }
    }
</style>
