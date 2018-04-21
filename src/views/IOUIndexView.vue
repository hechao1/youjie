<template>
    <div id='report-index'>
        <h1 class="card-title">
            <span>补借条</span>
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
                    <div class="form-item__key">借条状态</div>
                    <div class="form-item__value">
                        <select-group v-model='status'>
                            <select-option value='' text='所有状态'></select-option>
                            <select-option value='待确认' text='待确认'></select-option>
                            <select-option value='进行中' text='进行中'></select-option>
                            <select-option value='已完结' text='已完结'></select-option>
                            <select-option value='有争议' text='有争议'></select-option>
                        </select-group>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__key">筛选条件</div>
                    <div class="form-item__value">
                        <select-group v-model='status1'>
                            <select-option value='' text='所有状态'></select-option>
                            <select-option value='1' text='按照借款天数'></select-option>
                            <select-option value='2' text='按照借款金额筛选'></select-option>
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
                            <p>{{listInfo.totalCount || placeholder}}</p>
                            <span>当前状态总数</span>
                        </div>
                    </div>
                    <p class='no-data' v-if='!loading && !records.length'>暂无数据</p>
                    <div class="table-list" v-if='records.length'>
                        <table>
                            <thead class="table-list__head">
                                <tr>
                                    <th>编号</th>
                                    <th>借款人</th>
                                    <th>出借人</th>
                                    <th>创建时间</th>
                                    <th>借款时间</th>
                                    <th>还款时间</th>
                                    <th>借款金额</th>
                                    <th>借款天数</th>
                                    <th>借款用途</th>
                                    <th>借条状态</th>
                                    <th>操作</th>
                                    <!-- <th>操作</th> -->
                                </tr>
                            </thead>
                            <tbody class='table-list__body have-border'>
                                <tr v-for='(item,index) in records'>
                                    <td>{{ item.receiptNo || placeholder }}</td>
                                    <td>{{ item.borrowUserName || placeholder }}</td>
                                    <td>{{ item.lendUserName || placeholder }}</td>
                                    <td>{{ item.createdAt | dateFormat }}</td>
                                    <td>{{ item.borrowTime | dateFormat('YYYY-MM-DD') }}</td>
                                    <td>{{ item.repayTime | dateFormat('YYYY-MM-DD') }}</td>
                                    <td>{{ item.borrowAmount | toYuan }}元</td>
                                    <td>{{ item.borrowDays }}天</td>
                                    <td>{{ item.borrowUsage || placeholder }}</td>
                                    <td>{{ item.receiptStateStr || placeholder }}</td>
                                    <td>
                                        <span class="option-button" v-on:click='freezeDealReceipt(index)'>冻结成交补借条</span>
                                        <span class="option-button" @click='relieveFreezeDealReceipt(index)'>解除冻结成交补借条</span>
                                    </td>
                                    <!-- <td>
                                        <div class='option-box'>
                                            <span class='option-button'  @click='showModalDetail(item)'>报告详细</span>
                                        </div>
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                        <pagination
                            :current-page='listInfo.pageNum'
                            :total-page='listInfo.totalPage'
                            @pageChange='getList'></pagination>
                    </div>
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
                curindex:"",
                placeholder:'--',
                show_reportDetail:false,
                recommend:0,
                name:'',
                status:{
                    value:'',
                    text:'所有类型'
                },
                status1:{
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
            },
            replay(){
                let records =  _.filter(this.records,(value,index)=>{
                      return value!==undefined&&value!==null
                     })
                    //  console.log(records)
                    let k=[];
                    _.each(records,(value,index)=>{
                        console.log(value.receiptNo)
                        console.log(k.push(value.receiptNo))
                     })
                    //  console.log(this.kai2)
                   return k
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
                    receiptState:this.status.value,
                    sortStr:this.status1.value
                }
                allApi.receipt(params)
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
            // 冻结成交补借条
            freezeDealReceipt(index){
            this.loading_count = true
            this.curindex=index
            allApi.freezeDealReceipt({
                receiptNo:this.replay[this.curindex]
            })
              .then(result=>{
                this.loading_count = false
                this.setMsgTip({
                  text: '冻结成交成功',
                  type: 'success'
                })
              })
              .catch(error => {
                console.error(error)
                this.loading_count = false
              })
          },
        //   解除冻结补借条
        relieveFreezeDealReceipt(index){
            this.loading_count = true
            this.curindex=index
            allApi.relieveFreezeDealReceipt({
                receiptNo:this.replay[this.curindex]
            })
              .then(result=>{
                this.loading_count = false
                this.setMsgTip({
                  text: '解除冻结成交成功',
                  type: 'success'
                })
              })
              .catch(error => {
                console.error(error)
                this.loading_count = false
              })
          }
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
