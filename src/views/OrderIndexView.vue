<template>
    <div id='order-index'>
        <h1 class="card-title">
            <span>成交订单</span>
        </h1>
        <div class="order-form form-table">
            <div class="form-content">
                <div class="form-item">
                    <span class="form-item__key">出借人姓名</span>
                    <span class="form-item__value">
                        <input type="text" placeholder="请输入姓名" v-model='lendUserName'>
                    </span>
                </div>
                <div class="form-item">
                    <span class="form-item__key">借款人姓名</span>
                    <span class="form-item__value">
                        <input type="text" placeholder="请输入姓名" v-model='borrowUserName'>
                    </span>
                </div>
                <div class="form-item">
                    <span class="form-item__key">订单号</span>
                    <span class="form-item__value">
                        <input type="text" placeholder="请输入订单号" v-model='borrowNo'>
                    </span>
                </div>
                <div class="form-item">
                    <span class="form-item__key">状态</span>
                    <span class="form-item__value">
                        <select-group v-model='status'>
                            <select-option value='' text='所有'></select-option>
                            <select-option value='逾期' text='逾期'></select-option>
                            <select-option value='已还' text='已还'></select-option>
                            <select-option value='还款中' text='还款中'></select-option>
                        </select-group>
                    </span>
                </div>
                <div class="form-item">
                    <span class="form-item__key">年化利率</span>
                    <span class="form-item__value">
                        <select-group v-model='yearRate'>
                            <select-option value='' text='所有利率'></select-option>
                            <select-option value='0-1000' text='10%以下'></select-option>
                            <select-option value='1100-1500' text='11%-15%'></select-option>
                            <select-option value='1600-2400' text='16%-24%'></select-option>
                        </select-group>
                    </span>
                </div>
                <div class="form-item">
                    <span class="form-item__key">借款金额</span>
                    <span class="form-item__value">
                        <select-group v-model='amount'>
                            <select-option value='' text='所有金额'></select-option>
                            <select-option value='0-100000' text='0-1000'></select-option>
                            <select-option value='100100-500000' text='1001-5000'></select-option>
                            <select-option value='500100-1000000' text='5001-10000'></select-option>
                            <select-option value='1000100-5000000' text='10001-50000'></select-option>
                            <select-option value='5000100-2000000' text='50001-20000'></select-option>
                        </select-group>
                    </span>
                </div>
            </div>
            <div class="form-button">
                <span class="form-button__item button" @click='getList(1)'>搜索</span>
            </div>
        </div>

        <div class="loading-min-height">
            <!-- <div class="total-count">
                <div class="total-count__item">
                    <p>{{daily.RegisterNow || placeholder}} / {{daily.RegisterYesterday || placeholder}}</p>
                    <span>历史成交订单总额/次数</span>
                </div>
                <div class="total-count__item">
                    <p>{{daily.borrowTimesNow || placeholder}} / {{daily.borrowTimesYesterday || placeholder}}</p>
                    <span>平台手续费1%</span>
                </div>
                <div class="total-count__item">
                    <p>{{daily.lendTimesNow || placeholder}} / {{daily.lendTimesYesterday || placeholder}}</p>
                    <span>服务费（打赏）分成</span>
                </div>
                <div class="total-count__item">
                    <p>{{daily.dealNumNow || placeholder}} / {{daily.dealNumYesterday || placeholder}}</p>
                    <span>逾期管理费分成</span>
                </div>
            </div> -->

            <transition name='fade'>
                <p class="no-data" v-if='noData'> 无订单数据 </p>
            </transition>
            <loading v-if='loading' mode='full'></loading>
            <transition name='fade'>
                <div class="table-list" v-if='records.length'>
                    <table>
                        <thead class="table-list__head">
                            <tr>
                                <th>付款编号</th>
                                <th>订单编号</th>
                                <th>借款人</th>
                                <th>出借人</th>
                                <th>借款金额（本金）</th>
                                <th>利率</th>
                                <th>服务费</th>
                                <th>借款时长</th>
                                <th>借款时间</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody class='table-list__body have-border'>
                            <tr v-for='(item,index) in records'>
                                <td>{{ item.payNo || placeholder }}</td>
                                <td>{{ item.borrow.borrowNo || placeholder }}</td>
                                <td>{{ item.borrow.borrowUserName || placeholder }}</td>
                                <td>{{ item.borrow.lendUserName || placeholder }}</td>
                                <td>{{ item.borrow.borrowAmount | toYuan }}元</td>
                                <td>{{ item.borrow.yearRate / 100 }}%</td>
                                <td>{{ item.borrow.serviceFee | toYuan }}元</td>
                                <td>{{ item.borrow.borrowDays || placeholder }}{{ item.borrow.daysType || placeholder }}</td>
                                <td>{{ item.borrow.borrowAt | dateFormat }}</td>
                                <td>{{ item.borrow.borrowState || placeholder }}</td>
                                <td>
                                    <div class='option-box'>
                                        <span class='option-button' @click='showModalDetail(item.borrow)'>详细</span>
                                        <span class='option-button' @click='kfc(index)'>关闭订单</span>
                                        <span class='option-button' @click='freezeDealOrder(index)'>冻结</span>
                                        <span class='option-button' @click='relieveFreezeDealOrder(index)'>解冻</span>
                                        <span class='option-button' v-on:click='orderDebit(index)'>系统退款</span>
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
        <modal
            :show='show_modal_detail'
            title='详细'
            cancle-text=''
            confirm-text=''
            @close='show_modal_detail=false'>
            <ul v-if='curDetail'>
                <li class="result-info__item">
                    <div class="result-info__key">当前状态</div>
                    <div class="result-info__value">{{curDetail.repayStateStr || placeholder}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">出借人</div>
                    <div class="result-info__value">{{curDetail.lendUserName || placeholder}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">借款人</div>
                    <div class="result-info__value">{{curDetail.borrowUserName || placeholder}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">借款时间</div>
                    <div class="result-info__value">{{curDetail.borrowAt | dateFormat}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">最后还款时间</div>
                    <div class="result-info__value">{{curDetail.lastShouldRepayTime | dateFormat}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">还款方式</div>
                    <div class="result-info__value">{{curDetail.repayWay || placeholder }}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">借款时长</div>
                    <div class="result-info__value">{{curDetail.borrowDays}}{{curDetail.daysType}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">年利率</div>
                    <div class="result-info__value">{{curDetail.yearRate / 100}}%</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">借款金额（本金）</div>
                    <div class="result-info__value">{{curDetail.borrowAmount | toYuan}}元</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">服务费</div>
                    <div class="result-info__value">{{curDetail.serviceFee | toYuan}}元</div>
                </li>
                <!-- <li class="result-info__item">
                    <div class="result-info__key">支出方式</div>
                    <div class="result-info__value">{{curDetail.creditReportStatusStr || placeholder}}</div>
                </li> -->
                <li class="result-info__item">
                    <div class="result-info__key">利息</div>
                    <div class="result-info__value">{{curDetail.interestAmount | toYuan}}元</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">平台手续费（交易费1%）</div>
                    <div class="result-info__value">{{curDetail.commissionFee | toYuan}}元</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">交易手续费（支付）</div>
                    <div class="result-info__value">{{curDetail.createdAt | dateFormat}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">逾期</div>
                    <div class="result-info__value">{{curDetail.overdueDays}}天</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">罚息</div>
                    <div class="result-info__value">{{curDetail.overdueAmount | toYuan}}元</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">逾期管理费总额</div>
                    <div class="result-info__value">{{curDetail.OverdueMgrAmount | toYuan}}元</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">逾期管理费(出借人收)</div>
                    <div class="result-info__value">{{curDetail.lendOverdueMgrAmount | toYuan}}元</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">逾期管理费(平台收)</div>
                    <div class="result-info__value">{{curDetail.platformOverdueMgrAmount | toYuan}}元</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">借款用途</div>
                    <div class="result-info__value">{{curDetail.borrowUsage || placeholder}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">补充说明</div>
                    <div class="result-info__value">{{curDetail.addSay || placeholder}}</div>
                </li>
                <!-- <li class="result-info__item">
                    <div class="result-info__key">图片</div>
                    <div class="result-info__value">{{curDetail.balance | toYuan}}元</div>
                </li> -->
            </ul>
        </modal>
        <!-- <div >{{replayDay}}</div> -->
        <modal
        :show="elder"
        :width=1000
        :height=180
        title='禁用关闭成交订单'
        @close="elder=false"
        @confirm="systemCloseDealOrder()"
        :loading="loading_freeze"
        >
          <div class="card-title__button-box">
                <div class="form-content">
                    <div class="form-item">
                        <div class="form-item__key">日期</div>
                        <div class="form-item__value">
                            <date-picker
                                v-model="date"
                                color='#757575'
                                :placeholder='`选择日期`'
                                >
                            </date-picker>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
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
    import toYuan from '../filters/filter-toYuan'
    import dateFormat from '../filters/filter-dateFormat'
    import  { mapGetters, mapActions }  from 'vuex'
    import { addLenderValidation, resetAccountPasswordValidation, operatorEditValidation } from '../validation/validation'
    import { allApi, lenderApi } from '../api/api'
    import moment from 'moment'
    import datePicker from '../components/DatePicker.vue'


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
            toYuan,
            dateFormat,
            transform2fen(money){
                if(money === 0) return 0
                else if(!money) return '--'
                else return (money/100).toFixed(2) + '元'
            },
        },
        data() {
            return {
                loading_freeze: false,
                curindex:"",
                date:"",
                elder:false,
                kai2:[],
                kai22:[],
                placeholder:'--',
                userCount:'',
                lendUserName:'',
                borrowUserName:'',
                show_modal_detail:false,
                curDetail:'',
                borrowNo:'',
                status:{
                    value:'',
                    text:'所有'
                },
                yearRate:{
                    value:'',
                    text:'所有利率'
                },
                amount:{
                    value:'',
                    text:'所有金额'
                },
                dateFrom:'',
                dateTo:'',
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
            hasUserCount(){
                return !_.isEmpty(this.userCount)
            },
            noInvoiceInfo(){
                return _.isEmpty(this.invoiceInfo)
            },
            replay(){
                let records =  _.filter(this.records,(value,index)=>{
                      return value!==undefined&&value!==null
                     })
                    //  console.log(records)
                    let k=[];
                    _.each(records,(value,index)=>{
                        console.log(value.borrow.borrowNo)
                        console.log(k.push(value.borrow.borrowNo))
                     })
                    //  console.log(this.kai2)
                   return k
            },
            // replay2(){
            //     let records =  _.filter(this.records,(value,index)=>{
            //           return value!==undefined&&value!==null
            //          })
            //         //  console.log(records)
            //          _.each(records,(value,index)=>{
            //             console.log(value.borrow.lendNo)
            //             console.log(this.kai22.push(value.borrow.lendNo))
            //          })
            //         //  console.log(this.kai2)
            //        return this.kai22
            // }
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
          kfc(index){
              this.elder=true;
              this.curindex=index
                },
            showModalDetail(item){
                this.show_modal_detail = true
                this.curDetail = item
            },

            goDetail(item){
                this.$router.push({
                    name:'order-detail',
                    params:{
                        id:item.orderId,
                    }
                })
            },
            openDetail(item){
                // window.open(`https://youjie.kongapi.com/#/loan-in-detail-other/${item.borrowNo}`, '',"height=736,width=414");
            },
            getList(num){
                this.noData = false
                this.loading = true

                allApi.dealOrder({
                    pageNo:num,
                    pageSize:10,
                    borrowUserName:this.borrowUserName,
                    lendUserName:this.lendUserName,
                    borrowNo:this.borrowNo,
                    orderAmount:this.amount.value,
                    yearRate:this.yearRate.value,
                    stringdateFrom:this.dateFrom,
                    stringdateTo:this.dateTo,
                })
                .then(result=>{
                    this.loading = false
                    this.listInfo = result
                    this.records = result.records
                    // console.log(this.records)


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
            getAccount(){
                this.loading_count = true
                allApi.orderCount()
                .then(result=>{
                    this.loading_count = false
                    this.userCount = result
                })
                .catch(error => {
                    console.error(error)
                    this.loading_count = false
                })
            },
          systemCloseDealOrder(index){
            this.loading_count = true
            allApi.systemCloseDealOrder({
                borrowNo:this.replay[this.curindex],
                repayDay:moment(this.date).format('YYYY-MM-DD')
            })
              .then(result=>{
                this.loading_count = false
                this.setMsgTip({
                  text: '禁用关闭成交订单！',
                  type: 'success'
                })
              })
              .catch(error => {
                console.error(error)
                this.loading_count = false
              })
          },
        //   冻结用户借款
          freezeDealOrder(index){
            this.loading_count = true
            this.curindex=index
            allApi.freezeDealOrder({
                borrowNo:this.replay[this.curindex]
            })
              .then(result=>{
                this.loading_count = false
                this.setMsgTip({
                  text: '冻结用户借款成功',
                  type: 'success'
                })
              })
              .catch(error => {
                console.error(error)
                this.loading_count = false
              })
          },
//          systemCloseDealOrder
          relieveFreezeDealOrder(index){
            this.loading_count = true
            this.curindex=index
            allApi.relieveFreezeDealOrder({
                borrowNo:this.replay[this.curindex]
            })
              .then(result=>{
                this.loading_count = false
                this.setMsgTip({
                  text: '解除冻结用户借款成功',
                  type: 'success'
                })
              })
              .catch(error => {
                console.error(error)
                this.loading_count = false
              })
          },
          orderDebit(index){
            this.loading_count = true
            this.curindex=index
            allApi.orderDebit({
                borrowNo:this.replay[this.curindex]
            })
              .then(result=>{
                this.loading_count = false
                this.setMsgTip({
                  text: '抽取订单金额成功',
                  type: 'success'
                })
              })
              .catch(error => {
                console.error(error)
                this.loading_count = false
              })
          },
        },
        created(){
            // this.getAccount()
            this.getList(1)
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #order-index{
        padding:0 40px 20px 40px;
        box-sizing:border-box;
        overflow:auto;
        .order-form{
            position: relative;
            z-index:997;
        }
        .no-data{
            position: absolute;
            top:0;
            left:0;
            width: 100%;
        }
        .component-modal__container{
            overflow: visible!important;
        }
    }
</style>
