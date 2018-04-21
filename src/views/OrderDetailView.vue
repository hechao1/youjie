<template>
    <div id='order-detail'>
        <div class="loading-min-height">
            <loading v-if='loading' mode='full'></loading>
            <transition name='fade'>
                <div class="order-detail-content" v-if='!hasOrderDetail'>
                    <div class="order-detail__order-info">
                        <div class="card-title">订单信息</div>
                        <ul>
                            <li class="result-info__item">
                                <div class="result-info__key">订单类型</div>
                                <div class="result-info__value">{{ orderDetail.product.proName || placeholder }}</div>
                            </li>
                            <li class="result-info__item">
                                <div class="result-info__key">订单Id</div>
                                <div class="result-info__value">{{ orderDetail.orderId || placeholder }}</div>
                            </li>
                            <li class="result-info__item">
                                <div class="result-info__key">订单号</div>
                                <div class="result-info__value">{{ orderDetail.orderCode || placeholder }}</div>
                            </li>
                            <li class="result-info__item">
                                <div class="result-info__key">提交时间</div>
                                <div class="result-info__value">{{ timestampToDate(orderDetail.createTime) }}</div>
                            </li>
                            <li class="result-info__item">
                                <div class="result-info__key">金额</div>
                                <div class="result-info__value">{{ orderDetail.orderAmount | transform2fen }}</div>
                            </li>
                            <li class="result-info__item">
                                <div class="result-info__key">支付金额</div>
                                <div class="result-info__value">{{ orderDetail.orderRealAmount | transform2fen }}</div>
                            </li>
                            <li class="result-info__item">
                                <div class="result-info__key">支付时间</div>
                                <div class="result-info__value">{{ timestampToDate(orderDetail.payTime) }}</div>
                            </li>
                            <li class="result-info__item">
                                <div class="result-info__key">支付渠道</div>
                                <div class="result-info__value">{{ orderDetail.payWay || placeholder  }}</div>
                            </li>
                            <li class="result-info__item">
                                <div class="result-info__key">手机号</div>
                                <div class="result-info__value">{{ orderDetail.phone || placeholder  }}</div>
                            </li>
                        </ul>
                    </div>

                    <div class="card-title">查询结果</div>
                    <div class="result-blacklist" v-if='orderDetail.product.proCode == "blacklist"'>
                        <div class="result-detail" v-if='orderResult'>
                            <ul>
                                <li class="result-info__item">
                                    <div class="result-info__key">申贷通过率</div>
                                    <div class="result-info__value">{{ orderResult.bit || placeholder }}</div>
                                </li>
                                <li class="result-info__item">
                                    <div class="result-info__key">风险等级</div>
                                    <div class="result-info__value">{{ orderResult.levelStr || placeholder }}</div>
                                </li>
                                <li class="result-info__item">
                                    <div class="result-info__key">命中数量</div>
                                    <div class="result-info__value">{{ orderResult.hitCount || placeholder }}</div>
                                </li>
                                <li class="result-info__item">
                                    <div class="result-info__key">黑名单记录</div>
                                    <div class="result-info__value">{{ orderResult.blackCount || placeholder }}</div>
                                </li>
                                <li class="result-info__item">
                                    <div class="result-info__key">拒贷记录</div>
                                    <div class="result-info__value">{{ orderResult.rejectCount || placeholder }}</div>
                                </li>
                                <li class="result-info__item">
                                    <div class="result-info__key">逾期记录</div>
                                    <div class="result-info__value">{{ orderResult.overDueCount || placeholder }}</div>
                                </li>
                                <li class="result-info__item">
                                    <div class="result-info__key">欺骗记录</div>
                                    <div class="result-info__value">{{ orderResult.cheatCount || placeholder }}</div>
                                </li>
                                <li class="result-info__item">
                                    <div class="result-info__key">平台数量</div>
                                    <div class="result-info__value">{{ orderResult.sourceCount || placeholder }}</div>
                                </li>
                            </ul>
                            <div class="table-list">
                                <table>
                                    <thead class="table-list__head">
                                        <tr>
                                            <th>平台</th>
                                            <th>详细信息</th>
                                        </tr>
                                    </thead>
                                    <tbody class='table-list__body have-border'>
                                        <tr v-for='item in orderResult.hitSource'>
                                            <td> <div class="table-list__info"> <p class='title'>{{ item.source.sourceName }}</p> </div> </td>
                                            <td> 
                                                <div class='table-list__info'>
                                                    <div class='results-list' v-if='item.msgList.length && item.msgList'>
                                                        <p class='title'>命中项列表</p>
                                                        <div class='results__item' v-for='subItem in item.msgList'>
                                                            <p>风险级别：{{ subItem.level }}</p>
                                                            <p>描述：{{ subItem.msg || placeholder  }}</p>
                                                            <p>日期：{{ subItem.date || placeholder }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p class='no-data' v-else>
                            暂无查询结果
                        </p>
                    </div>

                    <div class="result-blacklist" v-if='orderDetail.product.proCode == "contacts"'>
                        <div class="result-detail" v-if='orderResult'>
                            <ul>
                                <li class="result-info__item">
                                    <div class="result-info__key">联系人数量</div>
                                    <div class="result-info__value">{{ orderResult.personCount || placeholder }}</div>
                                </li>
                                <li class="result-info__item">
                                    <div class="result-info__key">检测号码</div>
                                    <div class="result-info__value">{{ orderResult.checkNumberCount || placeholder }}</div>
                                </li>
                                <li class="result-info__item">
                                    <div class="result-info__key">检测联系人</div>
                                    <div class="result-info__value">{{ orderResult.checkPersonCount || placeholder }}</div>
                                </li>
                                <li class="result-info__item">
                                    <div class="result-info__key">高风险</div>
                                    <div class="result-info__value">{{ orderResult.personCount || placeholder }}</div>
                                </li>
                                <li class="result-info__item">
                                    <div class="result-info__key">中风险</div>
                                    <div class="result-info__value">{{ orderResult.middleCount || placeholder }}</div>
                                </li>
                            </ul>
                            <div class="table-list">
                                <table>
                                    <thead class="table-list__head">
                                        <tr>
                                            <th>因子命中次数表</th>
                                        </tr>
                                    </thead>
                                    <tbody class='table-list__body have-border'>
                                        <tr v-for='item in orderResult.list'>
                                            <td> <div class="table-list__info"> 
                                                <p class='title'>因子名称：{{ item.name }}</p> </div> 
                                                <div class='results__item'>
                                                    <p>命中次数：{{ item.count }}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p class='no-data' v-else>
                            暂无查询结果
                        </p>
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
    import { allApi } from '../api/api'
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
            levelFilter(str){
                if(str == 'NO') return '无风险'
                if(str == 'LOW') return '低风险'
                if(str == 'MIDDLE') return '中风险'
                if(str == 'HIGH') return '高风险'
            },
            transform2fen(money){
                if(money === 0) return 0
                else if(!money) return '--'
                else return (money/100).toFixed(2) + '元'
            }
        },
        data() {
            return {
                placeholder:'--',
                orderId:this.$route.params.id,
                orderDetail:{},
                list:[],
                subAccount:{},
                currentAccount:{},
                records:[],
                loading:true,
                requesting:false,
                name:'',
                idNumber:'',
                loanType:'CHE',
                memo:'',
                password:'123456',
                rePassword:'',
                editObject:{},
                phone:'13588888888',
                show_addAccountModal:false,
                show_resetAccountPasswordModal:false,
                show_disabledAccountConfirm:false,
                show_solutionDisabledAccountConfirm:false,
                show_deleteAccountConfirm:false,
                show_editOrgModal:false
            }
        },
        computed:{
            ...mapGetters([
                'msgTip',
                'localInfo'
            ]),
            currentPage(){
                if(_.isEmpty(this.subAccount)) return 1
                return this.subAccount.pageNum
            },
            hasOrderDetail(){
                return _.isEmpty(this.orderDetail)
            },
            orderResult(){
                if(this.orderDetail.result){
                    try { return JSON.parse(this.orderDetail.result) }
                    catch(e) { return this.orderDetail.result || undefined }
                }
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
            statusToText(type){
                if(type == '1') return '正常'
                if(type == '2') return '已冻结'
                else if(type == '') return this.placeholder
            },
            timestampToDate(timestamp){
                if(!timestamp) return this.placeholder
                return moment(timestamp).format('YYYY-MM-DD HH:mm')
            },

            // function
            goDetail(item){
                this.$router.push({
                    name:'lender-detail',
                    params:{
                        departId:item.departId,
                        lenderId:item.lenderId
                    }
                })
            },
            editInfo(org){
                this.$set(this.editObject,'lenderId',org.lenderId)
                this.$set(this.editObject,'name',org.name)
                this.$set(this.editObject,'idNumber',org.idNumber)
                this.$set(this.editObject,'memo',org.memo)
                this.show_editOrgModal = true
            },
            toggleAllPlatform($event){
                if($event){
                    _.each(this.platform,(value,index)=> {
                        this.platform[index] = true
                    })
                }
                else{
                    _.each(this.platform,(value,index)=> {
                        this.platform[index] = false
                    })
                }
            },
            deleteAccount(account){
                this.currentAccount = account
                this.show_deleteAccountConfirm = true
            },
            getDetail(num){
                this.loading = true
                allApi.orderDetail(num)
                .then(result=>{
                    this.loading = false
                    this.orderDetail = result
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            }
        },
        created(){
            this.getDetail(this.orderId)
        },
        watch: {
            '$route'(){
                let routerName = this.$route.name
                if(routerName == 'order-detail'){
                    this.orderId = this.$route.params.id
                    this.getDetail(this.orderId)
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #order-detail{
        padding:0 40px 20px 40px;
        box-sizing:border-box;
        overflow:auto;
        .results-list{
            padding-top: 15px;
            .results__item{
                padding-bottom: 15px;
            }
        }
        .result-source{
            text-align:center;
            span{
                display: block;
                width:80px;
                height:80px;
                background-position: center center;
                background-size: cover;
                margin-bottom:10px;
            }
            p{
                width: 80px;
            }
        }
        .user-data__list{
            display:flex;
            padding-top: 20px;
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
        .sub-account-add{
            cursor:pointer;
            line-height:32px;
            color:#fff;
            background-color: $green;
            width: 120px;
            text-align:center;
            font-size: 15px;
            font-weight: normal;
            font-weight: 300;
            transition:ease .3s all;
            &:hover{
                background-color: darken($green,10%);
            }
        }
        .sub-account-tabel__options-item{
            cursor:pointer;
            padding:10px;
            color:$green;
        }
        .sub-account-table{
            position: relative;
            min-height:140px;
            .loading--fullscreen{
                background-color: transparent;
            }
        }
    }
    .modal-add-account__list-wrap{
        display:flex;
        justify-content:center;
    }
    .modal-add-account__list{
        .form-item{
            padding-top: 30px;
        }
    }
</style>
