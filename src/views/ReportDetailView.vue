<template>
    <div id='user-detail'>
        <h1 class="card-title">
            <span>查询结果</span>
        </h1>
        <div class="loading-min-height">
            <p class="no-data"v-if='noData'> 无订单数据 </p>
            <loading v-if='loading' mode='full'></loading>
            <transition name='fade'>
                <div class="table-list" v-if='records.length'>
                    <table>
                        <thead class="table-list__head">
                            <tr>
                                <th>订单号</th>
                                <th>信用主体信息</th>
                                <th>提交时间</th>
                                <th>金额</th>
                                <th>真实金额</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody class='table-list__body have-border'>
                            <tr v-for='item in records'>
                                <td>{{ item.orderCode || placeholder }}</td>
                                <td>
                                    <div class="table-list__info">
                                        <p>姓名：{{ item.userName || placeholder }}</p>
                                        <p>身份证：{{ item.userIdNumber || placeholder }}</p>
                                        <p>手机：{{ item.userPhone || placeholder }}</p>
                                    </div>
                                </td>
                                <td>{{ timestampToDate(item.createTime) }}</td>
                                <td>{{ item.orderAmount | transform2fen }}</td>
                                <td>{{ item.orderRealAmount | transform2fen }}</td>
                                <td>{{ item.orderStatusStr || placeholder }}</td>
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
            transform2fen(money){
                if(money === 0) return 0
                else if(!money) return '--'
                else return (money/100).toFixed(2) + '元'
            }
        },
        data() {
            return {
                placeholder:'--',
                userId:this.$route.params.id,
                userCount:'',
                noData:false,
                listInfo:{},
                currentAccount:{},
                records:[],
                loading:true,
                loading_count:true,
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
                if(_.isEmpty(this.listInfo)) return 1
                return this.listInfo.pageNum
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
                    name:'order-detail',
                    params:{
                        id:item.orderId,
                    }
                })
            },
            getList(num){
                this.loading = true
                allApi.orderListByUser({
                    pageIndex:num,
                    pageSize:10,
                    userId:this.userId
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
            }
        },
        created(){
            this.getList(1)
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #user-detail{
    }
</style>
