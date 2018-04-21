<template>
    <div id='transaction-analysis'>
        <h1 class="card-title">
            <p><span>今日实时数据</span><i class='card-sub-title'>数据更新时间：{{ todayData.updateTime | dateFormat('YYYY-MM-DD HH:mm:ss')  }}</i></p>
        </h1>
        <div class="data-count loading-min-height">
            <loading v-if='loading_count' mode='full'></loading>
            <transition name='fade'>
                <div class='data-count-box' v-if='hasTodayData'>
                    <ul class="data-count__list">
                        <li class="data-count__item">
                            <span class='red'> {{ todayData.changeBit }} </span>
                            <p>订单转换率</p>
                        </li>
                        <li class="data-count__item">
                            <span class='red'> {{ todayData.orderChangeBit }} </span>
                            <p>成交订单转换率</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.newUserCount }} </span>
                            <p>新增用户</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.orderUserCount }} </span>
                            <p>交易用户</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.finishOrderUserCount }} </span>
                            <p>交易用户</p>
                            <p>已成交</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.orderCount }} </span>
                            <p>今日订单</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.finishOrderCount }} </span>
                            <p>成交订单</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.orderAmount | transform2fen }} </span>
                            <p>成交金额</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.userOrderEachAmount | transform2fen }} </span>
                            <p>客单价</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.orderEachAmount | transform2fen }} </span>
                            <p>笔单价</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.blackOrderCount }} </span>
                            <p>今日订单</p>
                            <p>黑名单</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.finishBlackOrderCount }} </span>
                            <p>成交订单</p>
                            <p>黑名单</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.blackOrderAmount | transform2fen }} </span>
                            <p>成交金额</p>
                            <p>黑名单</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.finishBlackOrderUserCount }} </span>
                            <p>交易用户</p>
                            <p>已成交*黑名单</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.contactsOrderCount }} </span>
                            <p>今日订单</p>
                            <p>通讯录</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.finishContactsOrderCount }} </span>
                            <p>成交订单</p>
                            <p>通讯录</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.contactsOrderAmount | transform2fen }} </span>
                            <p>成交金额</p>
                            <p>通讯录</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.finishContactsOrderUserCount }} </span>
                            <p>交易用户</p>
                            <p>已成交*通讯录</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.mobileOrderCount }} </span>
                            <p>今日订单</p>
                            <p>运营商</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.finishMobileOrderCount }} </span>
                            <p>成交订单</p>
                            <p>运营商</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.MobileOrderAmount | transform2fen }} </span>
                            <p>成交金额</p>
                            <p>运营商</p>
                        </li>
                        <li class="data-count__item">
                            <span> {{ todayData.finishMobileOrderUserCount }} </span>
                            <p>交易用户</p>
                            <p>已成交*运营商</p>
                        </li>
                    </ul>
                    <ul class='explain'>
                        <li>*客单价 = 成交金额／交易用户（已成交）</li>
                        <li>*笔单价 = 成交金额／成交金额</li>
                        <li>*订单转化率 = 今日交易用户（新增）／今日新增用户</li>
                        <li>*成交订单转化率 = 今日交易用户（新增&已成交）/ 今日新增用户</li>
                    </ul>
                </div>
            </transition>
        </div>

        <h1 class="card-title" id='data-list'>
            <p><span>每日数据记录</span><i class='card-sub-title'>（每晚一点定时更新）</i></p>
        </h1>
        <tab-box>
            <tab name='表格'>
                <div class="loading-min-height">
                    <transition name='fade'>
                        <p class="no-data" v-if='noData'> 无订单数据 </p>
                    </transition>
                    <loading v-if='loading' mode='full'></loading>
                    <transition name='fade'>
                        <div class="table-list" v-if='records.length'>
                            <table>
                                <thead class="table-list__head">
                                    <tr>
                                        <th>日期</th>
                                        <th>成交订单转化率</th>
                                        <th>新增用户</th>
                                        <th>交易用户<small>（成交）</small></th>
                                        <th>成交订单</th>
                                        <th>成交金额</th>
                                        <th>成交金额<small>（黑名单）</small></th>
                                        <th>成交金额<small>（通讯录）</small></th>
                                        <th>成交金额<small>（运营商）</small></th>
                                        <th>客单价</th>
                                        <th>笔单价</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody class='table-list__body have-border'>
                                    <tr v-for='item in records'>
                                        <td>{{ item.date  || placeholder }}</td>
                                        <td>{{ item.orderChangeBit || placeholder }}</td>
                                        <td>{{ item.newUserCount || placeholder }}</td>
                                        <td>{{ item.finishOrderUserCount || placeholder }}</td>
                                        <td>{{ item.finishOrderCount || placeholder }}</td>
                                        <td>{{ item.orderAmount | transform2fen }}</td>
                                        <td>{{ item.blackOrderAmount | transform2fen }}</td>
                                        <td>{{ item.contactsOrderAmount | transform2fen }}</td>
                                        <td>{{ item.mobileOrderAmount  | transform2fen }}</td>
                                        <td>{{ item.userOrderEachAmount  | transform2fen }}</td>
                                        <td>{{ item.orderEachAmount  | transform2fen }}</td>
                                        <td>
                                            <div class='option-box'>
                                                <span class='option-button' @click='goDetail(item)'>查看详情</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination
                                :current-page='currentPage'
                                :total-page='listInfo.totalPage'
                                @pageChange='getList'></pagination>
                        </div>
                    </transition>
                </div>
            </tab>
            <tab name='图表'>
                <div class="loading-min-height">
                    <loading v-if='loading_chart' mode='full'></loading>
                    <div ref='chart' class="data-chart" style='height:700px'></div>
                </div>
            </tab>
        </tab-box>
    </div>
</template>

<script>
    import { Promise } from 'es6-promise'
    import footerBar from '../components/FooterBar.vue'
    import selectGroup from '../components/SelectGroup.vue'
    import selectOption from '../components/SelectOption.vue'
    import radioGroup from '../components/RadioGroup.vue'
    import areaSelect from '../components/AreaSelect.vue'
    import radio from '../components/Radio.vue'
    import loading from '../components/Loading.vue'
    import tab from '../components/Tab.vue'
    import tabBox from '../components/TabBox.vue'
    import checkBox from '../components/CheckBox.vue'
    import toolTip from '../components/ToolTip.vue'
    import modal from '../components/Modal.vue'
    import confirm from '../components/Confirm.vue'
    import buttonLoading from '../components/ButtonLoading.vue'
    import pagination from '../components/Pagination.vue'
    import  { mapGetters, mapActions }  from 'vuex'
    import { addLenderValidation, resetAccountPasswordValidation, operatorEditValidation } from '../validation/validation'
    import { allApi, lenderApi } from '../api/api'
    import dateFormat from '../filters/filter-dateFormat'
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
            tab,
            tabBox,
            toolTip,
            modal,
            confirm,
            buttonLoading,
            pagination
        },
        filters:{
            dateFormat,
            transform2fen(money){
                if(money === 0) return 0
                else if(!money) return '--'
                else return (money/100).toFixed(2) + '元'
            }
        },
        data() {
            return {
                placeholder:'--',
                userCount:'',
                todayData:{},
                chartData:[],
                orderStatus:{
                    value:'',
                    text:'所有订单'
                },
                orderType:{
                    value:'',
                    text:'所有类型'
                },
                noData:false,
                listInfo:{},
                records:[],
                userPhone:'',
                orderCode:'',
                userName:'',
                loading:true,
                loading_count:true,
                loading_chart:true,
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
            hasTodayData(){
                return !_.isEmpty(this.todayData)
            },
            noInvoiceInfo(){
                return _.isEmpty(this.invoiceInfo)
            },
            allDate(){
                if(this.chartData.length) return _.map(this.chartData,'date') 
                return []
            },
            orderChangeBit(){
                if(this.chartData.length) {
                    let bit = _.map(this.chartData,'orderChangeBit') 
                    _.each(bit,(value,index)=>{
                        bit[index] = value.replace("%",'')
                    })
                    return bit
                } 
                return []
            },
            newUserCount(){
                if(this.chartData.length) return _.map(this.chartData,'newUserCount') 
                return []
            },
            finishOrderUserCount(){
                if(this.chartData.length) return _.map(this.chartData,'finishOrderUserCount') 
                return []
            },
            finishOrderCount(){
                if(this.chartData.length) return _.map(this.chartData,'finishOrderCount') 
                return []
            },
            blackOrderAmount(){
                if(this.chartData.length) {
                    let amount = _.map(this.chartData,'blackOrderAmount') 
                    _.each(amount,(value,index)=>{
                        amount[index] = value / 100
                    })
                    return amount
                } 
                return []
            },
            contactsOrderAmount(){
                if(this.chartData.length) {
                    let amount = _.map(this.chartData,'contactsOrderAmount') 
                    _.each(amount,(value,index)=>{
                        amount[index] = value / 100
                    })
                    return amount
                } 
                return []
            },
            mobileOrderAmount(){
                if(this.chartData.length) {
                    let amount = _.map(this.chartData,'mobileOrderAmount') 
                    _.each(amount,(value,index)=>{
                        amount[index] = value / 100
                    })
                    return amount
                } 
                return []
            },
        },
        methods:{
            // actions
            ...mapActions([
                'showLoading',
                'hideLoading',
                'setMsgTip'
            ]),

            // function

            goDetail(item){
                this.$router.push({
                    name:'transaction-detail',
                    params:{
                        id:item.id
                    }
                })
            },
            getList(num){
                this.noData = false
                this.loading = true

                allApi.transactionAnalysisHistory({
                    pageIndex:num,
                    pageSize:10,
                })
                .then(result=>{
                    this.loading = false
                    this.listInfo = result
                    this.records = result.records || []
                    // console.log(_.isEmpty(result.records))
                    if(!_.isEmpty(result.records)) this.noData = false
                    else this.noData = true
                    if(result.totalPage < result.pageNum){
                        this.getList(result.totalPage)
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            },
            getToday(){
                this.loading_count = true
                allApi.transactionAnalysisToday()
                .then(result=>{
                    this.loading_count = false
                    this.todayData = result
                })
                .catch(error => {
                    console.error(error)
                    this.loading_count = false
                })
            },
            getAllList(){
                this.loading_chart = true
                allApi.transactionAnalysisAll()
                .then(result=>{
                    // console.log(result)
                    this.loading_chart = false
                    let newArr = _.sortBy(result,'date')
                    this.chartData = newArr
                    this.setChart()
                    // console.log(this.chartData)
                })
                .catch(error => {
                    console.error(error)
                    this.loading_chart = false
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
                        containLabel: true
                    },
                    legend: {
                        data: ['成交订单转化率','新增用户','交易用户','成交订单','黑名单金额','通讯录金额','运营商金额']
                    },
                    xAxis: [{
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: this.allDate
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '成交订单转化率',
                        position: 'right',
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    }, {
                        type: 'value',
                        name: '',
                        position: 'left'
                    }],
                    dataZoom: [{
                        startValue: moment().subtract(15, 'days').format('YYYY-MM-DD')
                    }, {
                        type: 'inside'
                    }],
                    series: [{
                        name: '成交订单转化率',
                        type: 'line',
                        stack: '成交订单转化率',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 3,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        },
                        data: this.orderChangeBit
                    }, {
                        name: '新增用户',
                        type: 'bar',
                        yAxisIndex: 1,
                        stack: '新增用户',
                            label: {
                                normal: {
                                    // show: true,
                                    position: 'top'
                                }
                            },
                        data: this.newUserCount
                    }, {
                        name: '交易用户',
                        type: 'bar',
                        yAxisIndex: 1,
                        stack: '交易用户',
                            label: {
                                normal: {
                                    // show: true,
                                    position: 'top'
                                }
                            },
                        data: this.finishOrderUserCount
                    },{
                        name: '成交订单',
                        type: 'bar',
                        yAxisIndex: 1,
                        stack: '成交订单',
                            label: {
                                normal: {
                                    // show: true,
                                    position: 'top'
                                }
                            },
                        data: this.finishOrderCount
                    }, {
                        name: '黑名单金额',
                        type: 'bar',
                        yAxisIndex: 1,
                        stack: '成交金额',
                            label: {
                                normal: {
                                    // show: true
                                }
                            },
                        data: this.blackOrderAmount
                    }, {
                        name: '通讯录金额',
                        type: 'bar',
                        yAxisIndex: 1,
                        stack: '成交金额',
                            label: {
                                normal: {
                                    // show: true,
                                    position: 'top'
                                }
                            },
                        data: this.contactsOrderAmount
                    }, {
                        name: '运营商金额',
                        type: 'bar',
                        yAxisIndex: 1,
                        stack: '成交金额',
                            label: {
                                normal: {
                                    // show: true,
                                    position: 'top'
                                }
                            },
                        data: this.mobileOrderAmount
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
            this.getToday()
            this.getList(1)
            this.getAllList()
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #transaction-analysis{
        padding:0 40px 20px 40px;
        box-sizing:border-box;
        overflow:auto;
        .data-chart{
            // width: 100%;
        }
        .explain{
            li{
                padding:5px 0;
            }
        }
        .no-data{
            position: absolute;
            top:0;
            left:0;
            width: 100%;
        }
        .card-sub-title{
            padding-left:10px;
            font-size: 12px;
        }
    }
</style>
