<template>
    <div id='report-index'>
        <h1 class="card-title">
            <span>信用认证</span>
        </h1>
        <div class="order-form form-table">
            <div class="form-content">
                <div class="form-item">
                    <div class="form-item__key">手机号</div>
                    <div class="form-item__value">
                        <input type="tel" placeholder="请输入手机号码" v-model='mobile'>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__key">姓名</div>
                    <div class="form-item__value">
                        <input type="tel" placeholder="请输入姓名" v-model='name'>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__key">报告状态</div>
                    <div class="form-item__value">
                        <select-group v-model='status'>
                            <select-option value='' text='所有状态'></select-option>
                            <select-option value='未完成' text='未完成'></select-option>
                            <select-option value='已完成' text='已完成'></select-option>
                            <select-option value='已失效' text='已失效'></select-option>
                        </select-group>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__key">开始日期</div>
                    <div class="form-item__value">
                        <date-picker
                            v-model="dateFrom"
                            color='#757575'
                            :placeholder='`选择日期`'></date-picker>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__key">结束日期</div>
                    <div class="form-item__value">
                        <date-picker
                            v-model="dateTo"
                            color='#757575'
                            :placeholder='`选择日期`'></date-picker>
                    </div>
                </div>
            </div>
            <div @click='getList(1)' class="form-button"><span class="form-button__item button">搜索</span></div>
        </div>
        <div class="loading-min-height">
            <loading v-if='loading' mode='full'></loading>
            <transition name='fade'>
                <div>
                    <div class="total-count">
                        <div class="total-count__item">
                            <p>{{listInfo.creditReportQuantity || placeholder}} / {{listInfo.creditReportAmount | toYuan}}元</p>
                            <span>信用报告订单数 / 金额</span>
                        </div>
                        <!-- <div class="total-count__item">
                            <p>{{listInfo.firstTimeQuantity || placeholder}} / {{listInfo.firstTimeQuantity | toYuan}}元</p>
                            <span>首次付费认证订单数 / 金额</span>
                        </div>
                        <div class="total-count__item">
                            <p>{{listInfo.eightToThirtyQuantity || placeholder}} / {{listInfo.eightToThirtyAmount | toYuan}}元</p>
                            <span>8-30天付费认证订单数 / 金额</span>
                        </div>
                        <div class="total-count__item">
                            <p>{{listInfo.thirtyQuantity || placeholder}} / {{listInfo.thirtyAmount | toYuan}}元</p>
                            <span>30天付费认证订单数 / 金额</span>
                        </div> -->
                        <div class="total-count__item">
                            <p>{{listInfo.totalPaid | toYuan}}元 / {{listInfo.totalUnPaid | toYuan}}元</p>
                            <span>支付 / 未支付</span>
                        </div>
                    </div>
                    <p class='no-data' v-if='!loading && !records.length'>暂无数据</p>
                    <div class="table-list" v-if='records.length'>
                        <table>
                            <thead class="table-list__head">
                                <tr>
                                    <th>付款编号</th>
                                    <th>订单编号</th>
                                    <th>姓名</th>
                                    <th>手机号</th>
                                    <th>支付状态</th>
                                    <th>支付时间</th>
                                    <th>金额</th>
                                    <th>实际金额</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody class='table-list__body have-border'>
                                <tr v-for='item in records'>
                                    <td>{{ item.payNo || placeholder }}</td>
                                    <td>{{ item.creditReportNo || placeholder }}</td>
                                    <td>{{ item.name || placeholder }}</td>
                                    <td>{{ item.mobile || placeholder }}</td>
                                    <td>{{ item.payStateStr || placeholder }}</td>
                                    <td>{{ item.payTime | dateFormat }}</td>
                                    <td>{{ item.payAmount | toYuan }}元</td>
                                    <td>{{ item.actualPayAmount | toYuan }}元</td>
                                    <td>
                                        <div class='option-box'>
                                            <span class='option-button'  @click='showModalDetail(item)'>报告详细</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination
                            :current-page='listInfo.pageInfo.pageNum'
                            :total-page='listInfo.pageInfo.totalPage'
                            @pageChange='getList'></pagination>
                    </div>
                </div>
            </transition>
        </div>


        <modal  
            :show='show_reportDetail' 
            title='信用认证详情' 
            cancle-text=''
            confirm-text=''
            @close='show_reportDetail=false'>
            <ul v-if='curDetail.creditReport'>
                <li class="result-info__item">
                    <div class="result-info__key">订单编号</div>
                    <div class="result-info__value">{{curDetail.creditReportNo}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">姓名</div>
                    <div class="result-info__value">{{curDetail.name}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">手机号码</div>
                    <div class="result-info__value">{{curDetail.mobile}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">创建时间</div>
                    <div class="result-info__value">{{curDetail.creditReport.createdAt | dateFormat}}</div>
                </li>
                <!-- <li class="result-info__item">
                    <div class="result-info__key">有效时间</div>
                    <div class="result-info__value">{{curDetail.effectiveTime | dateFormat}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">上次付款时间</div>
                    <div class="result-info__value">{{curDetail.lastPayTime | dateFormat}}</div>
                </li> -->
                <li class="result-info__item">
                    <div class="result-info__key">付款时间</div>
                    <div class="result-info__value">{{curDetail.creditReport.payTime | dateFormat}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">修改时间</div>
                    <div class="result-info__value">{{curDetail.creditReport.modifyTime | dateFormat}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">金额</div>
                    <div class="result-info__value">{{curDetail.payAmount | toYuan}}元</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">真实金额</div>
                    <div class="result-info__value">{{curDetail.actualPayAmount | toYuan}}元</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">订单状态</div>
                    <div class="result-info__value">{{curDetail.creditReport.status}}</div>
                </li>
                <li class="result-info__item">
                    <div class="result-info__key">支付状态</div>
                    <div class="result-info__value">{{curDetail.creditReport.payState}}</div>
                </li>
            </ul>
        </modal>
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
                show_reportDetail:false,
                recommend:0,
                name:'',
                status:{
                    value:'',
                    text:'所有类型'
                },
                userCount:'',
                curDetail:{},
                listInfo:{},
                records:[],
                dateFrom:'',
                dateTo:'',
                mobile:'',
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

            showModalDetail(item){
                this.show_reportDetail = true
                console.log(item)
                this.curDetail = item
            },
            getList(num){
                this.loading = true
                let params = {
                    pageSize:10,
                    pageNo:num,
                    stringdateFrom:this.dateFrom,
                    stringdateTo:this.dateTo,
                    name:this.name,
                    mobile:this.mobile,
                    status:this.status.value,
                }
                allApi.creditReport(params)
                .then(result=>{
                    this.loading = false
                    this.listInfo = result
                    this.records = result.pageInfo.records
                    if(result.pageInfo.totalPage < result.pageInfo.pageNum){
                        this.getList(result.pageInfo.totalPage)
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
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

    #report-index{
        padding:0 40px 20px 40px;
        box-sizing:border-box;
        overflow:auto;
        .loading-min-height{
            min-height:300px;
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
