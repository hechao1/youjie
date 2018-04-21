<template>
    <div id='loan-index'>
        <h1 class="card-title">
            <p><span>贷款导流</span></p>
            <div class="card-title__button-box">
                <router-link to="loan-app" class="card-title__button">应用管理</router-link>
                <router-link to='loan-add-product' class="card-title__button">新增产品</router-link>
            </div>
            
        </h1>
        <tab-box>
            <tab name='已上架'>
                <div class="loading-min-height">
                    <transition name='fade'>
                        <p class="no-data" v-if='onlineListInfo.totalCount === 0'> 无订单数据 </p>
                    </transition>
                    <loading v-if='loading_up' mode='full'></loading>
                    <transition name='fade'>
                        <div class="table-list" v-if='onlineList.length'>
                            <table>
                                <thead class="table-list__head">
                                    <tr>
                                        <th>产品名</th>
                                        <th>图标</th>
                                        <th>来源</th>
                                        <th>上架时间</th>
                                        <th>是否推荐</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody class='table-list__body have-border'>
                                    <tr v-for='(item,index) in onlineList'>
                                        <td>{{ (index+1)+(onlineCurrentPage-1)*10  || placeholder }}. {{ item.name  || placeholder }}</td>
                                        <td> <img width='60' :src="item.imgSrc" alt=""></td>
                                        <td>{{ item.sourceName || placeholder }}</td>
                                        <td>{{ item.upTime | dateFormat }}</td>
                                        <td>{{ item.recommend | transform2recommend }}</td>
                                        <td>
                                            <div class='option-box'>
                                                <span class='option-button' @click='downProduct(item.id)'>下架</span>
                                                <span class='option-button' @click='editProduct(item.id)'>编辑</span>
                                                <span class='option-button' @click='sortProduct(item.id)'>排序</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination
                                :current-page='onlineCurrentPage'
                                :total-page='onlineListInfo.totalPage'
                                @pageChange='getOnlineList'></pagination>
                        </div>
                    </transition>
                </div>
            </tab>
            <tab name='已下架'>
                <div class="loading-min-height">
                    <transition name='fade'>
                        <p class="no-data" v-if='offlineListInfo.totalCount === 0'> 无订单数据 </p>
                    </transition>
                    <loading v-if='loading_down' mode='full'></loading>
                    <transition name='fade'>
                        <div class="table-list" v-if='offlineList.length'>
                            <table>
                                <thead class="table-list__head">
                                    <tr>
                                        <th>产品名</th>
                                        <th>图标</th>
                                        <th>来源</th>
                                        <th>上架时间</th>
                                        <th>是否推荐</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody class='table-list__body have-border'>
                                    <tr v-for='(item,index) in offlineList'>
                                        <td>{{ (index+1)+(offlineCurrentPage-1)*10  || placeholder }}. {{ item.name  || placeholder }}</td>
                                        <td> <img width='60' :src="item.imgSrc" alt=""></td>
                                        <td>{{ item.sourceName || placeholder }}</td>
                                        <td>{{ item.upTime | dateFormat }}</td>
                                        <td>{{ item.recommend | transform2recommend }}</td>
                                        <td>
                                            <div class='option-box'>
                                                <span class='option-button' @click='upProduct(item.id)'>上架</span>
                                                <span class='option-button' @click='editProduct(item.id)'>编辑</span>
                                                <span class='option-button' @click='sortProduct(item.id)'>排序</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination
                                :current-page='offlineCurrentPage'
                                :total-page='offlineListInfo.totalPage'
                                @pageChange='getOfflineList'></pagination>
                        </div>
                    </transition>
                </div>
            </tab>
        </tab-box>

        <modal  
            :show='show_sortProduct' 
            title='排序' 
            confirm-text='确认'
            :loading='loading_sort' 
            :close-button='false'
            @close='show_sortProduct=false'
            @confirm='setSortProduct'>
            <ul class='modal-sort-product__list'>
                <li class='form-item'>
                    <span class="form-item__key">排序位置</span>
                    <div class="form-item__value">
                        <input type="number" placeholder="请输入产品排序位置" v-model='sortPos'>
                    </div>
                </li>
                <li class='form-item'>
                    <span class="form-item__key">推荐排序位置</span>
                    <div class="form-item__value">
                        <input type="number" placeholder="请输入产品推荐排序位置" v-model='sortPosr'>
                    </div>
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
            },
            transform2recommend(recommend){
                if(recommend === 0) return '否'
                if(recommend === 1) return '是'
            },
        },
        data() {
            return {
                placeholder:'--',
                userCount:'',
                onlineListInfo :{},
                offlineListInfo :{},
                onlineList:[],
                offlineList:[],
                noData:false,
                records:[],
                userPhone:'',
                orderCode:'',
                userName:'',
                sortPos:'',
                sortPosr:'',
                productId:'',
                loading:true,
                loading_up:true,
                loading_down:true,
                loading_count:true,
                loading_chart:true,
                loading_sort:false,
                show_sortProduct:false
            }
        },
        computed:{
            ...mapGetters([
                'msgTip',
                'localInfo'
            ]),
            onlineCurrentPage(){
                if(_.isEmpty(this.onlineListInfo)) return 1
                return this.onlineListInfo.pageNum
            },
            offlineCurrentPage(){
                if(_.isEmpty(this.offlineListInfo)) return 1
                return this.offlineListInfo.pageNum
            },
            allDate(){
                if(this.chartData.length) return _.map(this.chartData,'date') 
                return []
            },
            needRefresh(){
                return this.localInfo.loanIndexRefresh
            }
        },
        methods:{
            // actions
            ...mapActions([
                'showLoading',
                'hideLoading',
                'setMsgTip',
                'setLoanIndexRefresh',
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
            downProduct(id){
                this.loading_up = true
                allApi.downLengding(id)
                .then(result=>{
                    this.getOnlineList(this.onlineCurrentPage)
                    this.getOfflineList(this.offlineCurrentPage)
                })
                .catch(error => {
                    console.error(error)
                    this.loading_up = false
                })
            },
            sortProduct(id){
                this.productId = id
                this.show_sortProduct = true
            },
            setSortProduct(){
                this.loading_sort = true
                allApi.sortProduct({
                    id:this.productId,
                    index:this.sortPos,
                    rindex:this.sortPosr
                })
                .then(result=>{
                    this.getOnlineList(this.onlineCurrentPage)
                    this.getOfflineList(this.offlineCurrentPage)
                    this.show_sortProduct = false
                    this.loading_sort = false
                })
                .catch(error => {
                    console.error(error)
                    this.loading_sort = false
                })
            },
            upProduct(id){
                this.loading_down = true
                allApi.upLengding(id)
                .then(result=>{
                    this.getOnlineList(this.onlineCurrentPage)
                    this.getOfflineList(this.offlineCurrentPage)
                })
                .catch(error => {
                    console.error(error)
                    this.loading_down = false
                })
            },
            editProduct(id){
                this.$router.push({
                    name:'loan-edit-product',
                    params:{
                        id:id
                    }
                })
            },
            getOnlineList(num){
                this.loading_up = true
                allApi.lengdingList({
                    status:1,
                    pageIndex:num,
                    pageSize:10,
                })
                .then(result=>{
                    this.loading_up = false
                    this.onlineListInfo = result
                    this.onlineList = result.records || []
                    if(result.totalPage < result.pageNum){
                        this.getOnlineList(result.totalPage)
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.loading_up = false
                })
            },
            getOfflineList(num){
                this.loading_down = true

                allApi.lengdingList({
                    status:0,
                    pageIndex:num,
                    pageSize:10,
                })
                .then(result=>{
                    this.loading_down = false
                    this.offlineListInfo = result
                    this.offlineList = result.records || []
                    if(result.totalPage < result.pageNum){
                        this.getOfflineList(result.totalPage)
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.loading_down = false
                })
            },
        },
        created(){
            this.getOnlineList(1)
            this.getOfflineList(1)
            // this.getAllList()
        },
        watch: {
            'needRefresh'(newVal,oldVal){
                if(newVal == oldVal) return
                if(newVal === true){
                    this.getOnlineList(this.onlineCurrentPage)
                    this.getOfflineList(this.offlineCurrentPage)
                    this.setLoanIndexRefresh(false)
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #loan-index{
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
        .modal-sort-product__list{
            .form-item__value{
                flex:1
            }
        }
    }
</style>
