<template>
    <div id='rechange'>
        <h1 class="card-title">
            <span>
                <template v-if='!blackList'>新建黑名单用户</template>
                <template v-else>修改黑名单用户</template>
            </span>
        </h1>
         <tab-box>
        <tab name='举报内容填写'>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <el-form-item
                    prop="pot"
                >  
                   <span>被举报者(必填项)</span>
                   <el-input v-model="inNick" placeholder='被举报者(必填项)' width='50%'></el-input>
                </el-form-item>  
                <el-form-item
                    prop="pot"
                > 
                   <span>其他名称</span>
                    <!-- <div style='height:3px;'></div> -->
                    <el-input v-model="newPro1" placeholder='其他名称'></el-input>
                </el-form-item>  
                <el-form-item
                    prop="pot"
                >   
                    <span>手机号(必填项)</span>      
                    <!-- <div style='height:3px;'></div> -->
                   <el-input v-model="newPro" placeholder='手机号(必填项)'></el-input>
                </el-form-item> 
                 <el-form-item
                    prop="pot"
                >   
                   <span>微信号</span>  
                    <!-- <div style='height:3px;'></div>     -->
                    <el-input v-model="newPhone" placeholder='微信号'></el-input> 
                </el-form-item> 
                <!-- addDomainOne -->
                 <el-button class='el-button--primary' @click="addDomainOne" style='margin-left:100px'>新增</el-button>
                
                <el-form-item
                    v-for="(domain, index) in dynamicValidateFormOne.domains"            
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                >
                <div style='height:3px;'></div>
                    <el-input v-model="domain.value" v-if='kara' placeholder='微信号'></el-input>
                    <!-- <div style='height:3px;'></div> -->
                     <el-button v-if='kara' @click.prevent="removeDomainOne(domain,index)" style='background-color: #00b1b3;color:#fff;border-color:#00b1b3;margin:10px 0;'>删除</el-button>
                </el-form-item>



                <el-form-item
                    
                >   
                    <span>微信名</span>  
                    <!-- <div style='height:3px;'></div>     -->
                    <el-input v-model="newPhone2" placeholder='微信名'></el-input> 
                </el-form-item> 
                  <el-button class='el-button--primary' @click="addDomain" style='margin-left:100px'>新增</el-button>
                <el-form-item
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                >
                <div style='height:3px;'></div>
                    <el-input v-model="domain.value" v-if='kara' placeholder='微信名'></el-input>
                    <!-- <div style='height:3px;'></div> -->
                     <el-button @click.prevent="removeDomain(domain,index)" v-if='kara' style='background-color: #00b1b3;color:#fff;border-color:#00b1b3;margin:10px 0;'>删除</el-button>
                </el-form-item>

                <el-form-item
                    prop="pot"
                >   
                    <span>支付宝号</span>  
                    <!-- <div style='height:3px;'></div>     -->
                    <el-input v-model="zhifubaoStr" placeholder='支付宝号'></el-input> 
                 </el-form-item> 

                 <el-button class='el-button--primary' @click="addDomainTwo" style='margin-left:100px'>新增</el-button>
                 <el-form-item
                    v-for="(domain, index) in dynamicValidateFormTwo.domains"
                    
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                >
                <div style='height:3px;'></div>
                    <el-input v-model="domain.value" v-if='kara' placeholder='支付宝号'></el-input>
                    <!-- <div style='height:3px;'></div> -->
                     <el-button   @click.prevent="removeDomainTwo(domain,index)"  v-if='kara' style='background-color: #00b1b3;color:#fff;border-color:#00b1b3;margin:10px 0;'>删除</el-button>
                </el-form-item>

                 <el-form-item
                    prop="pot"
                >   
                     <span>举报者(必填项)</span>  
                    <!-- <div style='height:3px;'></div>     -->
                    <el-input v-model="newPhone3" placeholder='举报者(必填项)'></el-input> 
                </el-form-item> 
                <el-form-item
                    prop="pot"
                >   
                     <span>举报者手机号(必填项)</span>  
                    <!-- <div style='height:3px;'></div>     -->
                    <el-input v-model="newPhone5" placeholder='举报者手机号(必填项)'></el-input> 
                </el-form-item> 
                <el-form-item
                    prop="pot"
                > 
                    <span>发生时间</span>  
                    <!-- <div style='height:3px;'></div>     -->
                    <el-date-picker
                    v-model='newTime'
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker> 
                   <!-- <el-button class='el-button--primary' @click="addDomain">新增</el-button> -->
                   
                </el-form-item>
                
                  <!-- <el-form-item
                    prop="kai"
                >
                <el-input v-model="dynamicValidateForm.kai" placeholder='0.00'></el-input>
                </el-form-item> -->
                    <span style='margin:5px 100px;'>事情描述</span>
                    <div style='height:3px;'></div>   
                   <textarea class='message-textarea' rows="10" placeholder="事情描述" v-model="newstr" style='border-color: #00b1b3;'></textarea>
                   <span style='margin:5px 100px;'>上传图片证据</span>
                   <div style='height:3px;'></div>
                   <el-button  class="card-title__button" ><input style='background:#00B1B3;' type="file" @change='file'></el-button>  
                   <div style='height:5px;'></div> 
                   <el-button  class="card-title__buttontwo" @click='intoExcel1()'>录入生成图片</el-button>
                   <div style='height:5px;'></div> 
                    <!-- <img src=''>  -->
                    <div class='img-url' v-for='(item,index) in this.Newarray' >
                      <img :src="item" width='100px' height="100px">
                    </div>
                    <div style='height:5px;'></div> 
                <el-form-item>
                    <div>
                        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                    </div>
                </el-form-item>
              </el-form>
              
        </tab>
        </tab-box>
    </div>
</template>

<script>
    import {Promise} from 'es6-promise'
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
    import checkBoxGroup from '../components/CheckBoxGroup.vue'
    import toolTip from '../components/ToolTip.vue'
    import modal from '../components/Modal.vue'
    import confirm from '../components/Confirm.vue'
    import buttonLoading from '../components/ButtonLoading.vue'
    import pagination from '../components/Pagination.vue'
    import dateFormat from '../filters/filter-dateFormat'
    import toYuan from '../filters/filter-toYuan'
    import  {mapGetters, mapActions}  from 'vuex'
    import {addLenderValidation, resetAccountPasswordValidation, operatorEditValidation} from '../validation/validation'
    import {allApi, lenderApi} from '../api/api'
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
            checkBoxGroup,
            areaSelect,
            loading,
            toolTip,
            modal,
            confirm,
            buttonLoading,
            pagination,
            datePicker,
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
                Newarray:[],
                touchIdTwo:'',
                blackList:this.$route.params.it && this.$route.params.it.blacklistId,
                inNick:this.$route.params.it && String(this.$route.params.it.beReportedUserName),
                newPro:this.$route.params.it && String(this.$route.params.it.beReportedUsermobile),
                newPro1:this.$route.params.it && String(this.$route.params.it.otherName),
                newPhone:this.$route.params.it && String(this.$route.params.it.weixin),
                newPhone2:this.$route.params.it && String(this.$route.params.it.nick),
                newPhone3:this.$route.params.it && String(this.$route.params.it.reportedUserName),
                newPhone5:this.$route.params.it && String(this.$route.params.it.reportedUsermobile),
                newTime:this.$route.params.it && this.$route.params.it.happenTime,
                newstr:this.$route.params.it && this.$route.params.it.describeStr,
                zhifubaoStr:this.$route.params.it && String(this.$route.params.it.zhifubao),
                price:'',
                kara:false,
                curIndex:'',
                text:'',
                dynamicValidateForm: {
                    domains: [],
                    pot: '',
                    // kai:'',
                    },
                dynamicValidateFormOne: {
                    domains: [],
                    pot: '',
                    // kai:'',
                    },
                dynamicValidateFormTwo: {
                    domains: [],
                    pot: '',
                    // kai:'',
                    },
                }
        },
        computed:{
        ...mapGetters([
                'msgTip',
                'localInfo'
            ]),
        transLateOne(){
            // return '1'
            let records =  _.filter(this.dynamicValidateForm.domains,(value,index)=>{
                      return value!==undefined&&value!==null
                     })
                let k=[]
                _.each(records,(value,index)=>{
                    _.each(value,(va,ind)=>{
                        if(va!==undefined){
                            k.push(va)
                        }
                    })
                })
                if(this.newPhone2!==undefined){
                    return this.newPhone2+','+k.join()
                }
        },
        transLateTwo(){
            // return '1'
            let records =  _.filter(this.dynamicValidateFormOne.domains,(value,index)=>{
                      return value!==undefined&&value!==null
                     })
                let k=[]
                _.each(records,(value,index)=>{
                    _.each(value,(va,ind)=>{
                        if(va!==undefined){
                            k.push(va)
                        }
                    })
                })
                if(this.newPhone!==undefined){
                     return this.newPhone+','+k.join()
                }
        },
        transLateThree(){
            // return '1'
            let records =  _.filter(this.dynamicValidateFormTwo.domains,(value,index)=>{
                      return value!==undefined&&value!==null
                     })
                let k=[]
                _.each(records,(value,index)=>{
                    _.each(value,(va,ind)=>{
                        if(va!==undefined){
                            k.push(va)
                        }
                    })
                })
                if(this.zhifubaoStr!==undefined){
                    return this.zhifubaoStr+','+k.join()
                }
            
        }
        },
        methods: {
        ...mapActions([
                    'showLoading',
                    'hideLoading',
                    'setMsgTip'
                ]),
       timestampToDate(timestamp){
                if(!timestamp) return this.placeholder
                return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
            },
        blacklistUpload(num){
                let params = {
                    beReportedUserName:this.inNick,
                    beReportedUsermobile:this.newPro,
                    otherName:this.newPro1,
                    weixinStr:this.transLateTwo,
                    nickStr:this.transLateOne,
                    zhifubaoStr:this.transLateThree,
                    reportedUserNameStr:this.newPhone3,
                    reportedUsermobileStr:this.newPhone5,
                    happenTimeStr:this.timestampToDate(this.newTime),
                    describe:this.newstr,
                    blacklistId:this.blackList,
                    imageFormStr:this.Newarray.join()
                }
                allApi.blacklistUpload(params)
                .then(result => {
                    if(this.blackList){
                        this.setMsgTip({
                            text: '修改成功',
                            type: 'success'
                        })
                    }
                    else{
                        this.setMsgTip({
                            text: '上传成功',
                            type: 'success'
                        })
                    }
                   
                })
                .catch(error => {
                    console.error(error)
                    
                
                })
          },
         submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    // console.log(this.curIndex)
                    this.blacklistUpload()

                    // console.log(111)
                } else {
                    // console.log('error submit!!');
                    // return false;
                }
                });
            },

            removeDomain(item,ind) {
                console.log(item)
                
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
                }
                this.curIndex=ind
                // console.log(this.curIndex)
                // console.log(this.dynamicValidateForm.domains[this.curIndex-1].value)
            },
            removeDomainOne(item,ind){
                // console.log(111)
                 var index = this.dynamicValidateFormOne.domains.indexOf(item)
                if (index !== -1) {
                this.dynamicValidateFormOne.domains.splice(index, 1)
                }
                this.curIndex=ind
            },
            removeDomainTwo(item,ind){
                // console.log(111122211122)
                 var index = this.dynamicValidateFormTwo.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateFormTwo.domains.splice(index, 1)
                }
                this.curIndex=ind
            },
            addDomain() {
                this.kara=true
                this.dynamicValidateForm.domains.push({
                value: '',
                });
            },
            addDomainOne() {
                // console.log(111222)
                this.$nextTick(()=>{
                    this.kara=true
                    this.dynamicValidateFormOne.domains.push({
                    value: '',
                    });
                })

            },
            addDomainTwo(){
                console.log(111222)
                 this.$nextTick(()=>{
                    this.kara=true
                    this.dynamicValidateFormTwo.domains.push({
                    value: '',
                    });
                })
            },
            file(e){
                 let files = e.target.files;
                 this.filefile = files[0];
            },
            imgintoExcel(){
                allApi.imgintoExcel('BLACKLIST',this.filefile)
                .then(result=>{
                    console.log(111)
                    // alert('222')
                    this.touchIdTwo=result
                    
                    let records =  _.filter(this.touchIdTwo,(value,index)=>{
                      return value!==undefined&&value!==null
                     })
                    console.log(this.touchIdTwo)
                    //  console.log(records)
                    // let k=[];
                    _.each(records,(value,index)=>{
                        // console.log(index)
                        this.Newarray.push(value)
                     })
                     console.log(this.Newarray)
                                    
                })
                .catch(error => {
                    console.error(error)
                  
                })
            },
            intoExcel1(){
                this.imgintoExcel()
            }
        },
        created(){

        },
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";
    #rechange{
          .message-textarea{
            display: block;
            width: 500px;
            border:1px solid $sectionColor;
            padding:10px;
            margin-bottom: 10px;
            margin-left: 100px;
        }
        .el-button--primary{
               
            background-color: #00b1b3;
            border-color: #00b1b3;
        }
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
        .el-form-item__error{
            color:#13ce66;
        }
        .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-textarea__inner{
                border-color: #13ce66;
        }
        .card-title__button{
            margin-left: 100px!important;
        }
        .card-title__buttontwo{
                // margin:10px 500px;
                margin-left: 100px!important;
                // margin-top:-100px!important;
                cursor: pointer;
                line-height: 32px;
                color: #fff;
                background-color: #00B1B3;
                padding: 0 15px;
                margin-left: 10px;
                border-radius: 3px;
                text-align: center;
                font-size: 13px;
                font-weight: normal;
                font-weight: 300;
                transition: ease .3s all
        }
        .img-url{
            width:100px;
            height:100px;
            border: 1px solid #ddd;
            margin-left: 100px!important;
            margin-top:2px;
            display: inline-block;
        }
    }
</style>
