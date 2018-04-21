<template>
    <div id='qr-index'>
        <h1 class="card-title">
            <span>生成微信渠道</span>
        </h1>
        <div class="main">
            <ul class="form-content">
                <li class='form-item'>
                    <span class="form-item__key">渠道号</span>
                    <div class="form-item__value">
                        <input type="text" placeholder="请输入渠道号" v-model='channel'>
                    </div>
                </li>
                <li class='form-item'>
                    <span class="form-item__key">备注</span>
                    <div class="form-item__value">
                        <input type="text" placeholder="请输入备注" v-model='memo'>
                    </div>
                </li>
                <li class='form-item'>
                    <span class="form-item__key">是否永久</span>
                    <div class="form-item__value">
                        <radio-group v-model='forever'>
                            <radio :value='true'>是</radio>
                            <radio :value='false'>否</radio>
                        </radio-group>
                    </div>
                </li>
            </ul> 
            <div class="confirm-button" @click='create'><button-loading :loading='loading'>生成二维码</button-loading></div>

            <ul class="form-content qr-link" v-if='qrInfo'>
                <li class='form-item'>
                    <span class="form-item__key">链接地址</span>
                    <div class="form-item__value">{{qrInfo.url}}</div>
                </li>
                <li class='form-item'>
                    <span class="form-item__key">二维码</span>
                    <div class="form-item__value">
                        <img :src="qrInfo.qrCodeUrl" alt="">
                    </div>
                </li>
            </ul> 
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
    import tabBox from '../components/TabBox.vue'
    import tab from '../components/Tab.vue'
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
            tabBox,
            tab,
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
                recommend:0,
                curItem:{},
                memo:'',
                forever:false,
                showConfirm:false,
                showFreeze:false,
                sequence:{
                    value:'0',
                    text:'正序'
                },
                sort:{
                    value:'',
                    text:'默认'
                },
                title:'',
                tip:'',
                curRecommend:{
                    value:'',
                    text:'添加到最后'
                },
                curUserId:'',
                cancleRecommendType:{
                    value:'',
                    text:'请选择取消推荐类型'
                },
                recommendType:{
                    value:'',
                    text:'请选择推荐类型'
                },
                lendNumber:'',
                borrowNumber:'',
                show_modal_cancle_recommend:false,
                show_modal_recommend:false,
                show_modal_recommend1:false,
                show_modal_recommend2:false,
                show_modal_detail:false,
                loading_set_recommend:false,
                loading_freeze:false,
                loading_cancle_recommend:false,
                channel:'',
                channel1:'',
                channel2:'',
                qrInfo:'',
                name:'',
                name1:'',
                name2:'',
                userCount:'',
                curDetail:'',
                listInfo:{},
                listInfo1:{},
                listInfo2:{},
                records:[],
                records1:[],
                records2:[],
                dateFrom:'',
                dateFrom1:'',
                dateFrom2:'',
                dateTo:'',
                dateTo1:'',
                dateTo2:'',
                mobile:'',
                mobile1:'',
                mobile2:'',
                loading:false,
                loading1:true,
                loading2:true,
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
                this.show_modal_detail = true
                this.curDetail = item
            },
            showModalRecommend(item){

                this.curRecommend = {
                    value:'',
                    text:'添加到最后'
                },
                this.recommendType = {
                    value:'',
                    text:'请选择推荐类型'
                }
                this.curItem = item
                this.curUserId = item.userId

                this.show_modal_recommend = true
                
            },
            showModalFreeze(item){
                this.curItem = item
                this.curUserId = item.userId

                this.showFreeze = true
                
            },
            showModalCancleRecommend(item){
                this.show_modal_cancle_recommend = true
                this.curItem = item
                if(!item.borrowRecommendPosition && item.lendRecommendPosition){
                    this.cancleRecommendType = {
                        value:'lend',
                        text:'小b推荐'
                    }
                    return
                }
                if(item.borrowRecommendPosition && !item.lendRecommendPosition){
                    this.cancleRecommendType = {
                        value:'borrow',
                        text:'小c推荐'
                    }
                    return
                }
                this.cancleRecommendType = {
                    value:'',
                    text:'请选择取消推荐类型'
                }
            },
            getNumber(){
                allApi.borrowCount()
                .then(result=>{
                    this.borrowNumber = result
                })
                .catch(error => {
                    console.error(error)
                })
                allApi.lendCount()
                .then(result=>{
                    this.lendNumber = result
                })
                .catch(error => {
                    console.error(error)
                })
            },
            getList(num){
                this.loading = true
                let params = {
                    pageSize:10,
                    pageNo:num,
                    stringdateFrom:this.dateFrom,
                    stringdateTo:this.dateTo,
                    mobile:this.mobile,
                    name:this.name,
                    channelStr:this.channel,
                    sortString:this.sort.value,
                    sequence:this.sequence.value,
                }
                allApi.userList(params)
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
            getList1(num){
                this.loading1 = true
                let params = {
                    pageSize:10,
                    recommedStr:'b',
                    pageNo:num,
                    stringdateFrom:this.dateFrom1,
                    stringdateTo:this.dateTo1,
                    mobile:this.mobile1,
                    name:this.name1,
                    channelStr:this.channel1,
                }
                allApi.userList(params)
                .then(result=>{
                    this.loading1 = false
                    this.listInfo1 = result
                    this.records1 = result.records
                    if(result.totalPage < result.pageNum){
                        this.getList1(result.totalPage)
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.loading1 = false
                })
            },
            getList2(num){
                this.loading2 = true
                let params = {
                    pageSize:10,
                    recommedStr:'c',
                    pageNo:num,
                    stringdateFrom:this.dateFrom1,
                    stringdateTo:this.dateTo1,
                    mobile:this.mobile1,
                    name:this.name1,
                    channelStr:this.channel1,
                }
                allApi.userList(params)
                .then(result=>{
                    this.loading2 = false
                    this.listInfo2 = result
                    this.records2 = result.records
                    if(result.totalPage < result.pageNum){
                        this.getList2(result.totalPage)
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.loading2 = false
                })
            },
            setRecommendTip(type){
                if(this.recommendType.value == 'borrow' && this.curItem.countBorrowing == 0){
                    this.title = '确认推荐小c'
                    this.tip = '该用户未发布借款，确认推荐？'
                    this.showConfirm = true
                    return
                }
                if(this.recommendType.value == 'lend' && this.curItem.countLending == 0){
                    this.title = '确认推荐小b'
                    this.tip = '该用户未发布出借，确认推荐？'
                    this.showConfirm = true
                    return
                }

                this.setRecommend()

            },
            confirmTip(){
                this.showConfirm = false
                this.setRecommend()
            },
            setRecommend(){
                this.loading_set_recommend = true
                let params = {
                    userId:this.curUserId,
                    priorityNo:this.curRecommend.value
                }
                if(this.recommendType.value == 'borrow'){
                    allApi.setBorrowRecommend(params)
                    .then(result=>{
                        this.loading_set_recommend = false
                        this.show_modal_recommend = false
                        this.show_modal_recommend1 = false
                        this.show_modal_recommend2 = false
                        this.getList(this.listInfo.pageNum)
                        this.getList2(this.listInfo2.pageNum)
                        this.getNumber()
                    })
                    .catch(error => {
                        console.error(error)
                        this.loading_set_recommend = false
                    })
                    return
                }
                if(this.recommendType.value == 'lend'){
                    allApi.setLendRecommend(params)
                    .then(result=>{
                        this.loading_set_recommend = false
                        this.show_modal_recommend = false
                        this.show_modal_recommend1 = false
                        this.show_modal_recommend2 = false
                        this.getList(this.listInfo.pageNum)
                        this.getList1(this.listInfo1.pageNum)
                        this.getNumber()
                    })
                    .catch(error => {
                        console.error(error)
                        this.loading_set_recommend = false
                    })
                }
            },
            cancleRecommend(item){
                let params = {
                    userId:this.curItem.userId,
                }
                if(this.cancleRecommendType.value == 'borrow'){
                    this.loading_cancle_recommend = true
                    allApi.delBorrowRecommend(params)
                    .then(result=>{
                        this.loading_cancle_recommend = false
                        this.show_modal_cancle_recommend = false
                        this.getList(this.listInfo.pageNum)
                        this.getList2(this.listInfo2.pageNum)
                        this.getNumber()
                    })
                    .catch(error => {
                        console.error(error)
                        this.loading_cancle_recommend = false
                    })
                    return
                }
                if(this.cancleRecommendType.value == 'lend'){
                    this.loading_cancle_recommend = true
                    allApi.delLendRecommend(params)
                    .then(result=>{
                        this.loading_cancle_recommend = false
                        this.show_modal_cancle_recommend = false
                        this.getList(this.listInfo.pageNum)
                        this.getList1(this.listInfo1.pageNum)
                        this.getNumber()
                    })
                    .catch(error => {
                        console.error(error)
                        this.loading_cancle_recommend = false
                    })
                }
                else{
                    this.setMsgTip({
                        text:'请选择取消推荐类型',
                        type:'warn'
                    })
                }
            },
            goReportDetail(){
                window.open(`https://youjie.kongapi.com/#/user-credit-report-detail/${this.curDetail.creditReportNo}`,'','width=375,height=667')
            },
            getAccount(){
                this.loading_count = true
                allApi.userCount()
                .then(result=>{
                    this.loading_count = false
                    this.userCount = result
                })
                .catch(error => {
                    console.error(error)
                    this.loading_count = false
                })
            },
            create(){
                if(this.channel == ''){
                    this.setMsgTip({
                        text:'请输入渠道号',
                        type:'warn'
                    })
                    return
                }
                this.qrInfo = ''
                this.loading = true
                allApi.weixinQR({
                    channel:this.channel,
                    forever:this.forever,
                    memo:this.memo
                })
                .then(result=>{
                    this.loading = false
                    this.setMsgTip({
                        text:'生成二维码成功！',
                        type:'success'
                    })
                    this.qrInfo = result
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            }
        },
        created(){
            // this.getAccount()
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #qr-index{
        padding:0 40px 20px 40px;
        box-sizing:border-box;
        overflow:auto;
        .main{
            padding:10px;
            padding-top: 30px;
        }
        .form-item__key{
            width: 8em;
        }
        .form-item__value{
            flex:1;
        }
        .confirm-button{
            display: flex;
            justify-content: center;
            .button{
                width: 110px;
            }
        }
        .radio-box{
            padding:10px 0;
        }
        .qr-link{
            padding-top: 30px;
        }
    }
</style>
