<template>
    <div id='loan-add-product'>
        <h1 class="card-title">
            <p><span>{{ title }}</span></p>
            
        </h1>
        <div class="loading-min-height">
            <loading v-show='loading_detail' mode='full'></loading>
            <transition name='fade'>
                <div class="loan-add-product-form" v-if='!loading_detail'>
                    <ul class="form-content">
                        <li class='form-item'>
                            <span class="form-item__key">产品名称</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入产品名称" v-model='name'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">产品来源</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入产品来源" v-model='sourceName'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">产品链接类型</span>
                            <div class="form-item__value">
                                <select-group v-model='motionType'>
                                    <select-option value='url' text='网页链接'></select-option>
                                    <select-option value='native' text='客户端链接'></select-option>
                                </select-group>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">产品链接</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入产品链接" v-model='motionValue'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">链接跳入类型</span>
                            <div class="form-item__value">
                                <select-group v-model='motionStatus'>
                                    <select-option value='0' text='产品详情'></select-option>
                                    <select-option value='1' text='产品页面'></select-option>
                                </select-group>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">广告语</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入广告语" v-model='info'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">图标Url地址</span>
                            <div class="form-item__value img-url">
                                <input type="text" placeholder="请输入图标Url地址" v-model='imgSrc'>
                                <p class="img-preview" :style="imgPreview"></p>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">申请人数</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="请输入申请人数" v-model='applyNum'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">通过率</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="请输入通过率 (%前数字)" v-model='passBit'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">自动累加系数</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="1-100" v-model='num'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">最低额度</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="请输入最低额度" v-model='minLine'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">最高额度</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="请输入最高额度" v-model='maxLine'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">平均额度</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="请输入平均额度" v-model='averageLine'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">最短借款期限</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="请输入最短借款期限 (天)" v-model='minLoanTime'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">最长借款期限</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="请输入最长借款期限 (天)" v-model='maxLoanTime'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">最低利率</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="请输入最低利率 (%前数字)" v-model='minRate'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">最高利率</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="请输入最高利率 (%前数字)" v-model='maxRate'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">利率周期</span>
                            <div class="form-item__value">
                                <select-group v-model='rateType'>
                                    <select-option value='day' text='天'></select-option>
                                    <select-option value='month' text='月'></select-option>
                                    <select-option value='year' text='年'></select-option>
                                </select-group>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">还款方式</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入还款方式" v-model='repayWay'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">放款时效</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入放款时效" v-model='lendValidTime'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">申请流程 (多选)</span>
                            <div class="form-item__value">
                                <select-group v-model='flowPath' :max-height='180' multiple placeholder='请选择申请流程'>
                                    <select-option value='银行卡认证' text='银行卡认证'></select-option>
                                    <select-option value='银行卡绑定' text='银行卡绑定'></select-option>
                                    <select-option value='联系人信息' text='联系人信息'></select-option>
                                    <select-option value='通讯录授权' text='通讯录授权'></select-option>
                                    <select-option value='人行征信查询' text='人行征信查询'></select-option>
                                    <select-option value='电商授权' text='电商授权'></select-option>
                                    <select-option value='人脸识别' text='人脸识别'></select-option>
                                    <select-option value='公积金授权' text='公积金授权'></select-option>
                                    <select-option value='身份认证' text='身份认证'></select-option>
                                    <select-option value='手机认证' text='手机认证'></select-option>
                                    <select-option value='运营商认证' text='运营商认证'></select-option>
                                    <select-option value='个人信息' text='个人信息'></select-option>
                                    <select-option value='视频认证' text='视频认证'></select-option>
                                    <select-option value='工作信息' text='工作信息'></select-option>
                                    <select-option value='芝麻信用授权' text='芝麻信用授权'></select-option>
                                </select-group>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">标签 (多选)</span>
                            <div class="form-item__value">
                                <select-group v-model='tags' :max-height='180' multiple placeholder='请选择标签'>
                                    <select-option v-for='item in tagList' :key="item.id" :value='item.id' :text='item.tagName'></select-option>
                                </select-group>
                            </div>
                        </li>
                       <!--  <li class='form-item'>
                            <span class="form-item__key">普通排序</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="请输入普通排序位置" v-model='index'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">推荐排序</span>
                            <div class="form-item__value">
                                <input type="number" placeholder="请输入推荐排序位置" v-model='rindex'>
                            </div>
                        </li> -->
                    </ul>
                    <div class="form-textarea">
                        <div class='form-item'>
                            <span class="form-item__key">申请条件</span>
                            <div class="form-item__value">
                                <textarea v-model='condition' rows='3'></textarea>
                            </div>
                        </div>
                        <div class='form-item'>
                            <span class="form-item__key">审核说明</span>
                            <div class="form-item__value">
                                <textarea v-model='explan' rows='3'></textarea>
                            </div>
                        </div>
                        <div class='form-item'>
                            <span class="form-item__key">产品介绍</span>
                            <div class="form-item__value">
                                <textarea v-model='description' rows='3'></textarea>
                            </div>
                        </div>
                    </div>
                    <div class='form-item'>
                        <span class="form-item__key">立即上架</span>
                        <div class="form-item__value">
                            <radio-group v-model='status'>
                                <radio :value='1'>是</radio>
                                <radio :value='0'>否</radio>
                            </radio-group>
                        </div>
                    </div>
                    <div class='form-item'>
                        <span class="form-item__key">是否推荐</span>
                        <div class="form-item__value">
                            <radio-group v-model='recommend'>
                                <radio :value='1'>是</radio>
                                <radio :value='0'>否</radio>
                            </radio-group>
                        </div>
                    </div>
                    <button-loading :short='true' :loading='loading' @click='addProduct'>{{ buttonText }}</button-loading>
                </div>
            </transition>
        </div>
    </div>
    </div>
</template>

<script>
    import { Promise } from 'es6-promise'
    import selectGroup from '../components/SelectGroup.vue'
    import selectOption from '../components/SelectOption.vue'
    import radioGroup from '../components/RadioGroup.vue'
    import radio from '../components/Radio.vue'
    import loading from '../components/Loading.vue'
    import checkBox from '../components/CheckBox.vue'
    import toolTip from '../components/ToolTip.vue'
    import modal from '../components/Modal.vue'
    import confirm from '../components/Confirm.vue'
    import buttonLoading from '../components/ButtonLoading.vue'
    import pagination from '../components/Pagination.vue'
    import  { mapGetters, mapActions }  from 'vuex'
    import { addProductValidation } from '../validation/validation'
    import { allApi } from '../api/api'
    import dateFormat from '../filters/filter-dateFormat'
    import moment from 'moment'
    import echarts from 'echarts'


    


    export default {
        components:{
            selectGroup,
            selectOption,
            radioGroup,
            radio,
            checkBox,
            loading,
            toolTip,
            modal,
            confirm,
            buttonLoading,
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
                noData:false,
                loading:false,
                loading_save:false,
                loading_detail:true,
                productInfo:{},
                tagList:[],
                tags:[],
                title:'新增产品',
                buttonText:'提交',
                appInfo:{},

                // form
                rateType:{
                    value:'month',
                    text:'月'
                },
                id:'',
                name:'',
                imgSrc:'',
                index:'',
                rindex:'',
                sourceName:'',
                info:'',
                motionType:{
                    value:'url',
                    text:'网页链接'
                },
                motionStatus:{
                    value:0,
                    text:'产品详情'
                },
                motionValue:'',
                recommend:0,
                status:0,
                applyNum:'',
                passBit:'',
                num:'',
                minLine:'',
                maxLine:'',
                averageLine:'',
                minLoanTime:'',
                maxLoanTime:'',
                minRate:'',
                maxRate:'',
                repayWay:'',
                lendValidTime:'',
                condition:'',
                explan:'',
                description:'',
                flowPath:[],
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
            imgPreview(){
                return {
                    backgroundImage:`url(${this.imgSrc})`,
                }
            },
            flowPathText(){
                let text = ''
                if(this.flowPath.length){
                    _.each(this.flowPath,(value,index)=>{
                        if(text == ''){
                            text = `${value.value}`
                            console.log(`${value.value}`)
                            return
                        } 
                        text = `${text}-${value.value}`
                        console.log(`${text}-${value.value}`)
                    })
                }
                return text
            },
            tagsText(){
                let text = ''
                if(this.tags.length){
                    _.each(this.tags,(value,index)=>{
                        if(text == ''){
                            text = `${value.value}`
                            console.log(`${value.value}`)
                            return
                        } 
                        text = `${text}-${value.value}`
                        console.log(`${text}-${value.value}`)
                    })
                }
                return text
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

            editMode(){
                this.title = '编辑产品'
                this.buttonText = '保存'
                allApi.getProductInfo(this.id)
                .then(result=>{
                    this.loading_detail = false
                    this.setProductInfo(result)
                })
                .catch(error => {
                    console.error(error)
                    this.loading_detail = false
                })
            },
            setProductInfo(result){
                let flowPath = result.applyExtra.flowPath
                let flowPathArr = []
                let tags = result.tagList
                let tagsArr = []
                _.each(flowPath,(value,index)=>{
                    flowPathArr.push({
                        value:value.name,
                        text:value.name
                    })
                })
                this.flowPath = flowPathArr

                _.each(tags,(value,index)=>{
                    tagsArr.push({
                        value:value.id,
                        text:value.tagName
                    })
                })
                this.tags = tagsArr
                // 链接类型
                if(result.motionType == 'native'){
                    this.motionType = {
                        value:'native',
                        text:'客户端链接'
                    }
                }
                else{
                    this.motionType = {
                        value:'url',
                        text:'网页链接'
                    }
                }

                // 链接跳入类型
                if(result.motionStatus === 0){
                    this.motionStatus = {
                        value:0,
                        text:'产品详情'
                    }
                }
                else{
                    this.motionStatus = {
                        value:1,
                        text:'产品页面'
                    }
                }

                // 还款方式
                if(result.limit.rateType == 'day'){
                    this.rateType = {
                        value:'day',
                        text:'日'
                    }
                }
                else if(result.limit.rateType == 'month'){
                    this.rateType = {
                        value:'month',
                        text:'月'
                    }
                }
                else{
                    this.rateType = {
                        value:'year',
                        text:'年'
                    }
                }
                this.name = result.name
                this.index = result.level
                this.rindex = result.rlevel
                this.imgSrc = result.imgSrc
                this.sourceName = result.sourceName
                this.info = result.info
                this.motionValue = result.motionValue
                this.recommend = result.recommend
                this.status = result.status
                this.applyNum = result.applyNum
                this.passBit = result.passBit
                this.num = result.desc.num
                this.minLine = result.limit.minLine
                this.maxLine = result.limit.maxLine
                this.averageLine = result.limit.averageLine
                this.minLoanTime = result.limit.minLoanTime.replace('天','')
                this.maxLoanTime = result.limit.maxLoanTime.replace('天','')
                this.minRate = result.limit.minRate.replace('%','')
                this.maxRate = result.limit.maxRate.replace('%','')
                this.lendValidTime = result.lendValidTime
                this.repayWay = result.repayWay
                this.condition = result.applyExtra.condition
                this.description = result.applyExtra.description
                this.explan = result.applyExtra.explan
            },
            addProduct(){
                let params={
                    id:this.id,
                    name:this.name,
                    imgSrc:this.imgSrc,
                    sourceName:this.sourceName,
                    info:this.info,
                    index:this.index,
                    rindex:this.rindex,
                    motionType:this.motionType.value,
                    motionStatus:this.motionStatus.value,
                    motionValue:this.motionValue,
                    recommend:this.recommend,
                    status:this.status,
                    applyNum:this.applyNum,
                    passBit:this.passBit,
                    num:this.num,
                    minLine:this.minLine,
                    maxLine:this.maxLine,
                    averageLine:this.averageLine,
                    minLoanTime:this.minLoanTime,
                    maxLoanTime:this.maxLoanTime,
                    minRate:`${this.minRate}%`,
                    maxRate:`${this.maxRate}%`,
                    rateType:this.rateType.value,
                    repayWay:this.repayWay,
                    lendValidTime:this.lendValidTime,
                    condition:this.condition,
                    explan:this.explan,
                    description:this.description,
                    flowPath:this.flowPathText,
                    tags:this.tagsText,
                }
                if(!addProductValidation(params)){
                    return
                }
                this.loading = true
                allApi.saveProductInfo(params)
                .then(result=>{
                    this.loading = false
                    if(result.msg == 'OK'){
                        this.setMsgTip({
                            text:'保存产品成功！',
                            type:'success'
                        })
                        this.setLoanIndexRefresh(true)
                    }
                    history.back()
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            }
        },
        created(){
            this.id = this.$route.params.id
            if(this.id == undefined){
                this.loading_detail = false
                return
            }

            allApi.tagList()
            .then(result=>{
                this.tagList = result
            })
            .catch(error => {
                console.error(error)
                this.tagList = result
            })
            this.editMode()
        },
        // watch: {
        //     '$route'(){
        //         let routerName = this.$route.name
        //         this.id = this.$route.params.id
        //         if(routerName == 'loan-add-product'){
        //             this.resetData()
        //         }
        //         if(routerName == 'loan-edit-product'){
        //             this.editMode()
        //         }
        //     }
        // }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #loan-add-product{
        .loan-add-product-form{
            padding-top: 20px;
            .form-textarea{
                padding: 20px 0;
            }
            .form-content{
                display:flex;
                flex-wrap: wrap;
                justify-content:space-between;
                .form-item{
                    width: 47%;
                }
            }
            .form-item__key{
                width: 8em;
            }
            .form-item__value{
                flex:1;
            }
        }
        .img-url{
            position: relative;
            input{
                padding-right: 32px;
            }
        }
        .img-preview{
            width: 30px;
            height:30px;
            background-repeat: no-repeat;
            background-position: center center;
            background-size:30px 30px;
            position: absolute;
            right:1px;
            top:1px;
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
