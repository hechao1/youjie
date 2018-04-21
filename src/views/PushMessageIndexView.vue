<template>
    <div id='message-index'>
        <h1 class="card-title">
            <span>消息推送</span>
        </h1>
        <!-- <div class="user-data loading-min-height">
            <loading v-if='loading_count' mode='full'></loading>
            <transition name='fade'>
                <ul class="user-data__list" v-if='hasUserCount'>
                    <li class="user-data__item">
                        <span> {{ userCount.newCount }} </span>
                        <p>今日新增用户</p>
                    </li>
                    <li class="user-data__item">
                        <span> {{ userCount.totalCount }} </span>
                        <p>总用户数</p>
                    </li>
                </ul>
            </transition>
        </div> -->

        <tab-box>
            <tab name='站内'>
                <textarea class='message-textarea' rows="10" placeholder="输入站内信内容" v-model='message'></textarea>
                <div class='message-button' @click='showConfirmMessage = true'><button-loading :loading='loading'>发送消息</button-loading></div>
            </tab>
            <tab name='短信'>
                <textarea class='message-textarea' rows="10" placeholder="输入短信内容" v-model='sms'></textarea>
                <div class='message-file' v-show='fileName'><span>文件名称：</span><p>{{fileName}}</p></div>
                <div class='message-file' v-show='file'><span>文件内容(确认是否有换行)：</span><p class='message-file__content'>{{file}}</p></div>
                <upload @done='setFile' type='txt'><div class='message-button'><span class="button">上传文件</span></div></upload>
                <div class='message-button' @click='showConfirmSms = true'><button-loading :loading='loading'>发送消息</button-loading></div>
            </tab>
            <tab name='公告小B'>
                <input class='message-input' type="text" placeholder="输入公告标题" v-model='noticeTitleB'>
                <textarea class='message-textarea' rows="10" placeholder="输入公告内容" v-model='noticeContentB'></textarea>
                <div class='message-button' @click='showConfirmNoticeB = true'><button-loading :loading='loading'>发送消息</button-loading></div>
            </tab>
            <tab name='公告小C'>
                <input class='message-input' type="text" placeholder="输入公告标题" v-model='noticeTitleC'>
                <textarea class='message-textarea' rows="10" placeholder="输入公告内容" v-model='noticeContentC'></textarea>
                <div class='message-button' @click='showConfirmNoticeC = true'><button-loading :loading='loading'>发送消息</button-loading></div>
            </tab>
        </tab-box>

        <confirm
            :show='showConfirm'
            :title='title'
            :tip='tip'
            @confirm='confirmTip'
            @close='showConfirm = false'>
        </confirm>
        <confirm
            :show='showConfirmMessage'
            :loading='loading'
            title='确定发送站内信'
            @confirm='sendMessage'
            @close='showConfirmMessage = false'>
        </confirm>
        <confirm
            :show='showConfirmSms'
            :loading='loading'
            title='确定发送短信'
            @confirm='sendSms'
            @close='showConfirmSms = false'>
        </confirm>
        <confirm
            :show='showConfirmNoticeB'
            title='确定发送公告'
            :loading='loading'
            @confirm='sendNotice("B")'
            @close='showConfirmNoticeB = false'>
        </confirm>
        <confirm
            :show='showConfirmNoticeC'
            title='确定发送公告'
            :loading='loading'
            @confirm='sendNotice("C")'
            @close='showConfirmNoticeC = false'>
        </confirm>
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
    import upload from '../components/Upload.vue'
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
            upload,
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
                showConfirmMessage:false,
                showConfirmSms:false,
                showConfirmNoticeB:false,
                showConfirmNoticeC:false,
                showConfirm:false,
                noticeTitleB:'',
                noticeContentB:'',
                noticeSecondB:5,
                noticeTitleC:'',
                noticeContentC:'',
                noticeSecondC:5,
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
                loading_cancle_recommend:false,
                channel:'',
                channel1:'',
                channel2:'',
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
                fileName:'',
                file:'',
                message:'',
                sms:'',
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
            setFile(object){
                this.fileName = object.name,
                this.file = object.result
            },
            sendMessage(){
                this.loading = true
                allApi.publishMessage({
                    message:this.message
                })
                .then(result=>{
                    this.setMsgTip({
                        text:'发送站内信成功',
                        type:'warn'
                    })
                    this.loading = false
                    this.showConfirmMessage = false
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            },
            sendSms(){
                if(!this.sms){
                    this.setMsgTip({
                        text:'请输入消息内容',
                        type:'warn'
                    })
                    return
                }
                this.loading = true
                allApi.publishSms({
                    content:this.sms,
                    mobileLines:this.file
                })
                .then(result=>{
                    this.setMsgTip({
                        text:'发送短信成功',
                        type:'warn'
                    })
                    this.showConfirmSms = false
                    this.loading = false
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            },
            sendNotice(bizRole){
                this.loading = true
                let params = {}
                if(bizRole == 'B'){
                    params = {
                        message:this.noticeContentB,
                        title:this.noticeTitleB,
                        second:this.noticeSecondB,
                        bizRole:bizRole
                    }
                }
                else{
                    params = {
                        message:this.noticeContentC,
                        title:this.noticeTitleC,
                        second:this.noticeSecondC,
                        bizRole:bizRole
                    }
                }
                allApi.publishNotice(params)
                .then(result=>{
                    this.setMsgTip({
                        text:'发送公告成功',
                        type:'warn'
                    })
                    this.showConfirmNoticeB = false
                    this.showConfirmNoticeC = false
                    this.loading = false
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            },
        },
        created(){
            allApi.showNotice({
                bizRole:'B'
            })
            .then(result=>{
                this.noticeTitleB = result.title
                this.noticeContentB = result.notice
                this.noticeSecondB = result.second
            })
            allApi.showNotice({
                bizRole:'C'
            })
            .then(result=>{
                this.noticeTitleC = result.title
                this.noticeContentC = result.notice
                this.noticeSecondC = result.second
            })
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #message-index{
        padding:0 40px 20px 40px;
        box-sizing:border-box;
        overflow:auto;
        .message-input{
            display: block;
            width: 500px;
            margin:0 auto;
            border:1px solid $sectionColor;
            padding:10px;
            margin-bottom: 10px;
        }
        .message-textarea{
            display: block;
            width: 500px;
            margin:0 auto;
            border:1px solid $sectionColor;
            padding:10px;
            margin-bottom: 10px;
        }

        .message-data{
            padding-bottom: 20px;
        }
        .message-button{
            width: 100px;
            margin:0 auto;
            padding:10px;
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
        .report-detail-button{
            color:$green;
            cursor:pointer;
        }
        .modal-recommend{
            .form-item__value{
                flex:1;
            }
            min-height:330px;
        }
        .message-file{
            padding:10px;
            display: flex;
            margin-bottom: 20px;
            line-height:20px;
            @extend %font-caption;
            span{
                display: block;
                width: 14em;
            }
            p{
                font-weight: normal;
            }
        }
        .message-file__content{
            font-weight: normal;
            flex:1;
            white-space:pre;
            height:300px;
            overflow:auto;
        }
        .component-button-loading{
            margin-top: 0;
        }
    }
</style>
