<template>
    <div id='money-index'>
        <h1 class="card-title">
            <span>提现</span>
        </h1>
        <div class="order-form form-table">
            <div class="form-content">
                <div class="form-item">
                    <div class="form-item__key">手机号</div>
                    <div class="form-item__value">
                        <input type="tel" placeholder="请输入手机号码" v-model='mobile1'>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__key">姓名</div>
                    <div class="form-item__value">
                        <input type="text" placeholder="请输入姓名" v-model='name1'>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__key">开始日期</div>
                    <div class="form-item__value">
                        <date-picker
                            v-model="cashOutTimeFrom"
                            color='#757575'
                            :placeholder='`选择日期`'></date-picker>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__key">结束日期</div>
                    <div class="form-item__value">
                        <date-picker
                            v-model="cashOutTimeTo"
                            color='#757575'
                            :placeholder='`选择日期`'></date-picker>
                    </div>
                </div>
            </div>
            <div @click='getCashOut(1)' class="form-button"><span class="form-button__item button">搜索</span></div>
        </div>
        <div class="loading-min-height">
            <loading v-if='loadingCashOut' mode='full'></loading>
            <transition name='fade'>
                <div>
                    <div class="total-count">
                        <div class="total-count__item">
                            <p>{{cashOutInfo.numberOfCashOut}}</p>
                            <span>提现成功人数</span>
                        </div>
                        <div class="total-count__item">
                            <p>{{cashOutInfo.cashOutAmount | toYuan}}元</p>
                            <span>提现成功金额</span>
                        </div>
                    </div>
                    <p class='no-data' v-if='!loadingCashOut && !cashOutRecords.length'>暂无数据</p>
                    <div class="table-list" v-if='cashOutRecords.length'>
                        <table>
                            <thead class="table-list__head">
                                <tr>
                                    <th>手机号</th>
                                    <th>姓名</th>
                                    <th>金额</th>
                                    <th>银行和卡号</th>
                                    <th>发起时间</th>
                                    <th>交易手续费</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody class='table-list__body have-border'>
                                <tr v-for='item in cashOutRecords'>
                                    <td>{{ item.mobile || placeholder }}</td>
                                    <td>{{ item.cashOutEntity.userName || placeholder }}</td>
                                    <td>{{ item.cashOutEntity.cashOutAmount | toYuan }}元</td>
                                    <td>{{ item.bankName || placeholder }} - {{ item.cashOutEntity.cardNo || placeholder }}</td>
                                    <td>{{ item.cashOutEntity.createdAt | dateFormat }}</td>
                                    <td>{{ item.cashOutEntity.commissionFee | toYuan }}元</td>
                                    <td>{{ item.cashOutEntity.cashOutStateStr || placeholder }}</td>
                                    <td>
                                       <span style='color:#00B1B3;cursor:pointer;' @click='cashOuting(item)' v-if="item.cashOutEntity.cashOutState=='APPLYING'">确认打款</span>
                                       <span style='color:#ccc;cursor:pointer;'  v-else>确认打款</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination
                            :current-page='cashOutInfo.pageInfoForCashOut.pageNum'
                            :total-page='cashOutInfo.pageInfoForCashOut.totalPage'
                            @pageChange='getCashOut'></pagination>
                    </div>
                </div>
            </transition>
        </div>
        <h1 class="card-title">
            <span>充值</span>
        </h1>
        <div class="order-form form-table">
            <div class="form-content">
                <div class="form-item">
                    <div class="form-item__key">手机号</div>
                    <div class="form-item__value">
                        <input type="tel" placeholder="请输入手机号码" v-model='mobile2'>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__key">姓名</div>
                    <div class="form-item__value">
                        <input type="text" placeholder="请输入姓名" v-model='name2'>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__key">开始日期</div>
                    <div class="form-item__value">
                        <date-picker
                            v-model="charegeTimeFrom"
                            color='#757575'
                            :placeholder='`选择日期`'></date-picker>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__key">结束日期</div>
                    <div class="form-item__value">
                        <date-picker
                            v-model="charegeTimeTo"
                            color='#757575'
                            :placeholder='`选择日期`'></date-picker>
                    </div>
                </div>
            </div>
            <div @click='getCharge(1)' class="form-button"><span class="form-button__item button">搜索</span></div>
        </div>
        <div class="loading-min-height">
            <loading v-if='loadingCharge' mode='full'></loading>
            <transition name='fade'>
                <div>
                    <div class="total-count">
                        <div class="total-count__item">
                            <p>{{chargeInfo.numberOfCharge}}</p>
                            <span>充值成功人数</span>
                        </div>
                        <div class="total-count__item">
                            <p>{{chargeInfo.chargeAmount | toYuan}}元</p>
                            <span>充值成功金额</span>
                        </div>
                    </div>
                    <p class='no-data' v-if='!loadingCharge && !chargeRecords.length'>暂无数据</p>
                    <div class="table-list" v-if='chargeRecords.length'>
                        <table>
                            <thead class="table-list__head">
                                <tr>
                                    <th>手机号</th>
                                    <th>付款编号</th>
                                    <th>姓名</th>
                                    <th>金额</th>
                                    <th>银行和卡号</th>
                                    <th>发起时间</th>
                                    <th>交易手续费</th>
                                    <th>状态</th>
                                </tr>
                            </thead>
                            <tbody class='table-list__body have-border'>
                                <tr v-for='item in chargeRecords'>
                                    <td>{{ item.mobile || placeholder }}</td>
                                     <td>{{ item.payNo || placeholder }}</td>
                                    <td>{{ item.chargeEntity.userName || placeholder }}</td>
                                    <td>{{ item.chargeEntity.chargeAmount | toYuan }}元</td>
                                    <td>{{ item.bankName || placeholder }} {{ item.chargeEntity.cardNo || placeholder }}</td>
                                    <td>{{ item.chargeEntity.createdAt | dateFormat }}</td>
                                    <td>{{ item.chargeEntity.commissionFee | toYuan }}元</td>
                                    <td>{{ item.chargeEntity.cashOutStateStr || placeholder }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination
                            :current-page='chargeInfo.pageInfoForCharge.pageNum'
                            :total-page='chargeInfo.pageInfoForCharge.totalPage'
                            @pageChange='getCharge'></pagination>
                    </div>
                      <modal
                        :show='detug'
                        title='是否确认'
                        cancle-text=''
                        confirm-text=''
                        @close='detug=false'
                    >
                        <h1 style='text-align:center;border:1px solid #ddd;background-color:#ddd;'>
                             <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;">确认提现打款</span>
                        </h1>
                         <ul v-if='cashCreatable'>
                            <li class="result-info__item">
                                <div class="result-info__key">申请人</div>
                                <div class="result-info__value">
                                    <span>{{cashCreatable.cashOutEntity.userName ||placeholder}}</span>
                                    <span>&nbsp; : &nbsp;</span>
                                    <span>{{cashCreatable.mobile ||placeholder}}</span>
                                </div>
                            </li>
                             <li class="result-info__item">
                                <div class="result-info__key">收款账户</div>
                                <div class="result-info__value">
                                    <span>{{cashCreatable.bankName ||placeholder}}</span>
                                    <span>&nbsp; : &nbsp;</span>
                                    <span>{{cashCreatable.cashOutEntity.cardNo ||placeholder}}</span>
                                </div>
                            </li>
                               <li class="result-info__item">
                                <div class="result-info__key">已打款金额</div>
                                <div class="result-info__value">
                                    <span>{{cashCreatable.cashOutEntity.cashOutAmount |toYuan}}</span>
                                </div>
                            </li>
                         </ul>
                        <h1 style='height:100px;'></h1>
                        <h1 style='text-align:center;border:1px solid #ddd;background-color:#d1d1d1;width:30%;margin:0 auto;cursor:pointer'>
                             <span style="font-size:15px;font-weight:normal;line-height:32px;color:black;" @click='cashOutConfirm()'>确认已打款</span>
                        </h1>
                    </modal>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import { Promise } from 'es6-promise'
    import footerBar from '../components/FooterBar.vue'
    import datePicker from '../components/DatePicker.vue'
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


    export default {
        components:{
            datePicker,
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
            toYuan,
            dateFormat
        },
        data() {
            return {
                placeholder:'--',
                count:'',
                mobile1:'',
                name1:'',
                mobile2:'',
                name2:'',
                cashOutTimeFrom:'',
                cashOutTimeTo:'',
                charegeTimeFrom:'',
                charegeTimeTo:'',
                cashOutInfo:{},
                chargeInfo:{},
                chargeRecords:[],
                cashOutRecords:[],
                loading:true,
                loadingCashOut:true,
                loadingCharge:true,
                loading_count:true,
                cashCreatable:'',
                detug:false
            }
        },
        computed:{
            ...mapGetters([
                'msgTip',
                'localInfo'
            ]),
            hasCount(){
                return !_.isEmpty(this.count)
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

            // function
             cashOuting(item){
                console.log(item)
                this.cashCreatable=item
                // this.cashOutConfirm()
                this.detug=true
            },
            goDetail(item){
                this.$router.push({
                    name:'user-detail',
                    params:{
                        id:item.userId,
                    }
                })
            },
            getCharge(num){
                this.loadingCharge = true
                allApi.chargeDetail({
                    name:this.name2,
                    mobile:this.mobile2,
                    pageNo:num,
                    pageSize:10,
                    stringdateFrom:this.charegeTimeFrom,
                    stringdateTo:this.charegeTimeTo
                })
                .then(result=>{
                    this.loadingCharge = false
                    this.chargeInfo = result
                    this.chargeRecords = result.pageInfoForCharge.records
                    if(result.pageInfoForCharge.totalPage < result.pageNum){
                        this.getCharge(result.pageInfoForCharge.totalPage)
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.loadingCharge = false
                })
            },
            getCashOut(num){
                this.loadingCashOut = true
                allApi.cashOutDetail({
                    name:this.name1,
                    mobile:this.mobile1,
                    pageNo:num,
                    pageSize:10,
                    stringdateFrom:this.cashOutTimeFrom,
                    stringdateTo:this.cashOutTimeTo,
                })
                .then(result=>{
                    this.loadingCashOut = false
                    this.cashOutInfo = result
                    this.cashOutRecords = result.pageInfoForCashOut.records
                    if(result.pageInfoForCashOut.totalPage < result.pageNum){
                        this.getCashOut(result.pageInfoForCashOut.totalPage)
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.loadingCashOut = false
                })
            },
               cashOutConfirm(num){
                this.loadingCashOut = true
                allApi.cashOutConfirm({
                 cashOutNo:this.cashCreatable.cashOutEntity.cashOutNo
                })
                .then(result=>{
                    this.loadingCashOut = false
                    console.log(111)
                    this.setMsgTip({
                        text: '提现成功',
                        type: 'success'
                   })
                   this.getCashOut(this.cashOutInfo.pageInfoForCashOut.pageNum)
                   this.debug=false
                })
                .catch(error => {
                     this.debug=false
                    console.error(error)
                    this.loadingCashOut = false
                //      this.setMsgTip({
                //         text: '提现失败',
                //         type: 'warning'
                //    })
               
                })
            },
        },
        created(){
            this.getCharge(1)
            this.getCashOut(1)
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #money-index{
        padding:0 40px 20px 40px;
        box-sizing:border-box;
        overflow:auto;
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
            width: 200px;
            height:120px;
            border:1px solid $sectionColor;
            border-radius:4px;
            box-shadow:rgba(0, 0, 0, 0.03) 0px 1px 6px, rgba(0, 0, 0, 0.04) 0px 1px 4px;
            margin-right:20px;
            span{
                display: block;
                font-size: 30px;
                color:$green;
            }
            p{
                padding-top: 10px;
            }
        }
    }
</style>
