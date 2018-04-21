<template>
    <div id='ima1'>
        <!-- 测试下  you ok👌！IM记录抄送－p2p消息 -->
        <loading mode="full" v-if="loading"></loading>
        <h1 class="card-title">
             <span>展示P2P纪录</span>
        </h1>
        <div class="order-form form-table">
          <div class="form-content">

            <div class="form-item">
              <div class="form-item__key">聊天一方手机号</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入手机号码" v-model="one">
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key">聊天另一方手机号</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入手机号码" v-model="another">
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key">日期</div>
              <div class="form-item__value">
                <date-picker
                  color='#757575'
                  :placeholder='`选择日期`' v-model="date"></date-picker>
              </div>
            </div>

          </div>
          <div  class="form-button" @click="showImRoute(1)"><span class="form-button__item button">搜索</span></div>
        </div>
          <h3 class="card-title2">
             <span>消息</span>
             <span style="color:#ff6e40;" v-if='mes'>{{mes}}</span>
             <span style="color:#ff6e40;" v-else>0</span>
             <span>条</span>
          </h3>
            <ul v-for='(item,index) in list'>
              <li class="rect">
                  <div>
                    <img :src="item.from_user_avatar" height="50px" class="image" @click="image_url(index)" style="cursor:pointer;">
                    <span style="color:rgb(170, 102, 64)">{{item.from_user_realName}}</span>
                    <span>{{item.from_user_mobile}}</span>
                    <span class="timeOver">{{timestampToDate(item.receiveTime)}}</span>
                  </div>
                  <span v-if="item.im_msg_body" style="color:rgb(70, 102, 64);">
                        <span style="font-weight:bold">发言的文字内容：</span>
                        <span>{{item.im_msg_body}}</span>
                  </span>
                  <span v-if="item.im_msg_attach">
                      <span style="font-weight:bold">发言的图片内容：</span>

                        <!-- {{item.im_msg_attach.url}} -->
                        <img :src="item.im_msg_attach.url"  height="50px" style="cursor:pointer;" @click='image_url2(item)'>
                        <!-- {{item.im_msg_attach.name}} -->
                  </span>
             </li>
           </ul>  
              <pagination
                :current-page='showIm.pageNum'
                :total-page='showIm.totalPage'
                @pageChange='showImRoute'>
            </pagination>
            <!-- first -->
             <modal
            :show="resore"
            cancle-text=''
            confirm-text=''
            @close='resore=false'
            :width="1000"
            >
            <div style="text-align:center;cursor:move;">
                 <img :src="replay[curIndex]"> 
            </div>
            </modal>
            <!-- second -->
            <modal
                :show="resore1"
                cancle-text=''
                confirm-text=''
                @close='resore1=false'
                :width="1000"
                :height="1000"
            >
             <div style="text-align:center;cursor:move;">
                 <img :src="sudent" width=300 > 
            </div>
            </modal>
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
            datePicker
        },
            filters: {
                dateFormat,
                toYuan,
                booleanToStr(boolean){
                    if (boolean === true) {
                    return '是'
                    }
                    else {
                    return '否'
                    }
                 }
        },
        data() {
            return {
                one:'',
                another:'',
                date:'',
                mes:'',
                list:[],
                showIm:[],
                resore:false,
                curIndex:'',
                resore1:false,
                sudent:'',
                sudent1:'',
                loading:true
            }
        },
        computed:{
          ...mapGetters([
                'msgTip',
                'localInfo'
            ]),
         replay(){
                let records =  _.filter(this.list,(value,index)=>{
                      return value!==undefined&&value!==null
                     })
                    //  console.log(records)
                    let k=[];
                    _.each(records,(value,index)=>{
                        // console.log(value.to_user_avatar)
                        k.push(value.from_user_avatar)
                     })
                    //  console.log(this.kai2)
                   return k
            },
    //   replay1(){
    //             let records =  _.filter(this.list,(value,index)=>{
    //                   return value!==undefined&&value!==null
    //                  })
    //                 //  console.log(records)
    //                 let k=[];
    //                 _.each(records,(value,index)=>{
    //                     // console.log(value)
    //                     // console.log(k.push(value))
    //                     _.each(value,(v,i)=>{
    //                         console.log(v.im_msg_attach)
    //                         console.log(k.push(v.im_msg_attach))
    //                     })
    //                  })
    //                 //  console.log(this.kai2)
    //                return k
    //         },
        },
        methods:{
          ...mapActions([
                'showLoading',
                'hideLoading',
                'setMsgTip'
            ]),
            timestampToDate(timestamp){
                 if (!timestamp) return this.placeholder
                 return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
           },
           image_url(index){
                this.resore=true
                this.curIndex=index
           },
           image_url2(item){
            //    console.log("11")
                this.resore1=true
                this.sudent1=item
                this.sudent=item.im_msg_attach.url
            },
            //接口   im1
            showImRoute(num){
                      this.loading = true
                let params = {
                    pageSize:8,
                    pageNo:num,
                    dateStr:this.date,
                    // 等会改
                    // userMobile:15068729968,
                    userMobile:this.one,
                    otherUserMobile:this.another
                }
                allApi.showImRoute(params)
                .then(result => {
                    this.loading = false
                    this.showIm=result
                    this.mes=result.totalCount
                    this.list=result.records
                    console.log('111')
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            }
        },
        created(){
            this.showImRoute(1)
        },
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";
    #ima1{
        .form-item__value .component-datepick__value{
            color: #00B1B3;
            border: 1px solid #00B1B3;
            background-color: rgba(0, 177, 179, 0.1);
        }
       input[type="tel"]{
            color: #00B1B3;
            border: 1px solid #00B1B3;
            background-color: rgba(0, 177, 179, 0.1);
       }
       .card-title2{
            font-size: 13px;;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
            color: #212121;
            padding-top: 46px;
            position: relative;
       }
       .rect{
            width:100%;
            min-height: 100px;
            border: 1px solid #ddd;
            border-left-color: transparent;
            border-right-color: transparent;
       }
       .image{
           margin:8px 0;
       }
       .timeOver{
          float:right;
          margin:27px 0;
       }
    }

</style>
