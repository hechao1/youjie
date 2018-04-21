<template>
    <div id='transaction-analysis'>
        <h1 class="card-title">
            <p><span>{{ date || placeholder  }}数据</span><i class='card-sub-title'>数据更新时间：{{ todayData.updateTime | dateFormat('YYYY-MM-DD HH:mm:ss')  }}</i></p>
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
                id:this.$route.params.id,
                date:'',
                todayData:{},
                userCount:'',
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

            // function

            goDetail(item){
                this.$router.push({
                    name:'order-detail',
                    params:{
                        id:item.orderId,
                    }
                })
            },
            getList(num){
                this.noData = false
                this.loading = true

                allApi.orderList({
                    pageIndex:num,
                    pageSize:10,
                    userPhone:this.userPhone,
                    proId:this.orderType.value,
                    orderCode:this.orderCode,
                    orderStatus:this.orderStatus.value,
                    userName:this.userName,
                })
                .then(result=>{
                    this.loading = false
                    this.listInfo = result
                    this.records = result.records
                    if(result.records.length) this.noData = false
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
            getDetail(){
                this.loading_count = true
                allApi.transactionAnalysisDetail(this.id)
                .then(result=>{
                    this.loading_count = false
                    this.todayData = result.resultJson
                    this.date = result.date
                })
                .catch(error => {
                    console.error(error)
                    this.loading_count = false
                })
            },
        },
        created(){
            this.getDetail()
        },
        watch: {
            '$route'(){
                let routerName = this.$route.name
                if(routerName == 'transaction-detail'){
                    this.id = this.$route.params.id
                    this.getDetail()
                }
            }
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
