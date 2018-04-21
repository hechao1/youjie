<template>
    <div id='loan-app'>
        <h1 class="card-title">
            <p><span>应用管理</span></p>
            <div class="card-title__button-box">
                <span @click='addApp' to='loan-app' class="card-title__button">新增应用</span>
            </div>
            
        </h1>
        <div class="loading-min-height">
            <transition name='fade'>
                <p class="no-data" v-if='appListInfo.totalCount === 0'> 无订单数据 </p>
            </transition>
            <loading v-show='loading' mode='full'></loading>
            <transition name='fade'>
                <div class="table-list" v-if='appList.length'>
                    <table>
                        <thead class="table-list__head">
                            <tr>
                                <th>应用名</th>
                                <th>图标</th>
                                <th>应用标语</th>
                                <th>贷款开启状态</th>
                                <th>受控版本</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody class='table-list__body have-border'>
                            <tr v-for='item in appList'>
                                <td>{{ item.appName  || placeholder }}</td>
                                <td> <img :src="item.appImg" alt=""></td>
                                <td>{{ item.packageName || placeholder }}</td>
                                <td>{{ item.status | transform2status }}</td>
                                <td>{{ item.appVersion || placeholder }}</td>
                                <td>
                                    <div class='option-box'>
                                        <span class='option-button' @click='editApp(item)'>编辑应用</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <pagination
                        :current-page='currentPage'
                        :total-page='appListInfo.totalPage'
                        @pageChange='getList'></pagination>
                </div>
            </transition>
        </div>

        <!-- Modal添加子账号 begin -->
        <modal  
            :show='show_addAppModal' 
            :title='add_app_modal_title' 
            :confirm-text='add_app_modal_confirm_text'
            :loading='loading_save' 
            :close-button='false'
            @close='show_addAppModal=false'
            @confirm='saveApp'>
            <div class="modal-add-app__main">
                <ul class='modal-add-app__list'>
                    <li class='form-item'>
                        <span class="form-item__key">应用名</span>
                        <div class="form-item__value">
                            <input type="text" placeholder="请输入应用名" v-model='appInfo.appName'>
                        </div>
                    </li>
                    <li class='form-item'>
                        <span class="form-item__key">图标地址</span>
                        <div class="form-item__value">
                            <input type="text" placeholder="请输入图标地址" v-model='appInfo.appImg'>
                        </div>
                    </li>
                    <li class='form-item'>
                        <span class="form-item__key">应用标语</span>
                        <div class="form-item__value">
                            <input type="text" placeholder="请输入应用标语" v-model='appInfo.packageName'>
                        </div>
                    </li>
                    <li class='form-item'>
                        <span class="form-item__key">受控版本</span>
                        <div class="form-item__value">
                            <input type="text" placeholder="请输入受控版本" v-model='appInfo.appVersion'>
                        </div>
                    </li>
                    <li class='form-item'>
                        <span class="form-item__key">贷款开启状态</span>
                        <div class="form-item__value">
                            <radio-group v-model='appInfo.status'>
                                <radio :value='1'>开</radio>
                                <radio :value='0'>关</radio>
                            </radio-group>
                        </div>
                    </li>
                </ul>
            </div>
        </modal>
        <!-- Modal添加子账号 end -->
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
            transform2status(num){
                if(num === 0) return '关闭'
                else return '开启'
            }
        },
        data() {
            return {
                show_addAppModal:false,
                add_app_modal_title:'',
                add_app_modal_confirm_text:'',
                placeholder:'--',
                appListInfo :{},
                appList:[],
                appInfo:{
                    appImg:'',
                    appName:"",
                    appVersion:"",
                    createTime:'',
                    deviceType:"",
                    id:'',
                    packageName:"",
                    status:''
                },
                noData:false,
                loading:true,
                loading_save:false,
            }
        },
        computed:{
            ...mapGetters([
                'msgTip',
                'localInfo'
            ]),
            currentPage(){
                if(_.isEmpty(this.appListInfo)) return 1
                return this.appListInfo.pageNum
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
            addApp(){
                this.show_addAppModal = true
                this.add_app_modal_title = '新增应用'
                this.add_app_modal_confirm_text = '提交'
                this.appInfo = {
                    appImg:'',
                    appName:"",
                    appVersion:"",
                    createTime:'',
                    deviceType:"",
                    id:'',
                    packageName:"",
                    status:1
                }
            },
            editApp(item){
                this.show_addAppModal = true
                this.add_app_modal_title = '编辑应用'
                this.add_app_modal_confirm_text = '保存'
                this.appInfo = _.clone(item)
            },
            saveApp(){
                this.loading_save = true
                allApi.saveAppInfo(this.appInfo)
                .then(result=>{
                    this.loading_save = false
                    this.show_addAppModal = false
                    this.getList(this.currentPage)
                })
                .catch(error => {
                    console.error(error)
                    this.loading_save = false
                })
            },
            getList(num){
                this.loading = true

                allApi.appList({
                    pageIndex:num,
                    pageSize:10,
                })
                .then(result=>{
                    this.loading = false
                    this.appListInfo = result
                    this.appList = result.records || []
                    
                    if(result.totalPage < result.pageNum){
                        this.getList(result.totalPage,status)
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
            // this.getAllList()
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #loan-app{
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
        .modal-add-app__main{
            .form-item{
                display: flex;
            }
            .form-item__key{
                width: 8em;
            }
            .form-item__value{
                flex:1;
            }
        }
    }
</style>
