<template>
    <div id='ima2'>
        <!-- IM记录抄送－登入登出消息！👌 -->
        <loading mode="full" v-if="loading"></loading>
        <h1 class="card-title">
             <span>登入登出消息</span>
        </h1>
        <div class="order-form form-table">
          <div class="form-content">

            <div class="form-item">
              <div class="form-item__key">手机号</div>
              <div class="form-item__value">
                <input type="tel" placeholder="请输入手机号码" v-model='phone'>
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
            <div class="form-item">
                <div class="form-item__key">排序顺序</div>
                <div class="form-item__value">
                    <select v-model="sort1" class="sort">
                        <option value="">不选</option>
                    <option value="2">登入事件</option>
                    <option value="3">登出事件</option>
                    </select>
                </div>
            </div>
          </div>
          <div  class="form-button" @click='showImLoginOrLogout(1)'><span class="form-button__item button">搜索</span></div>
        </div>
            <table  width="100%">
                <thead class="table-list__head">
                <tr>
                  <th>名字</th>
                  <th>手机号</th>
                  <th>类型</th>
                  <th>IP地址</th>
                  <th>具体省份和城市</th>
                  <th>客户端类型</th>
                  <th>版本信息</th>
                </tr>
                </thead>
                <tbody class='table-list__body have-border'>
                    <tr v-for='item in records'>
                        <td>
                            <span v-if='item.user_realName'>{{item.user_realName}}</span>
                            <span v-else>--</span>
                        </td>
                         <td>
                            <span v-if='item.user_mobile'>{{item.user_mobile}}</span>
                            <span v-else>--</span>
                        </td>
                         <td>
                            <span v-if='item.im_msg_eventType'>{{trans(item.im_msg_eventType)}}</span>
                            <span v-else>--</span>
                        </td>
                         <td>
                            <span v-if='item.im_msg_clientIp'>{{item.im_msg_clientIp}}</span>
                            <span v-else>--</span>
                        </td>
                        <td>
                            <span v-if='item.ipObject'>
                                <span >{{item.ipObject.country}}</span>
                                <span style='color:rgba(0, 177, 179, 0.3)'>/</span>
                                <span>{{item.ipObject.province}}</span>
                                <span style='color:rgba(0, 177, 179, 0.3)'>/</span>
                                <span>{{item.ipObject.city}}</span>
                            </span>
                            <span v-else>--</span>
                        </td>
                        <td>
                            <span v-if='item.im_msg_clientType'>{{item.im_msg_clientType}}</span>
                            <span v-else>--</span>
                        </td>
                        <td>
                           ---
                        </td>
                    </tr>
                </tbody>
              </table>
                <pagination
                :current-page='res.pageNum'
                :total-page='res.totalPage'
                @pageChange='showImLoginOrLogout'></pagination> 
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
                phone:'',
                date:'',
                sort1:{
                    value:''
                },
                records:[],
                res:[],
                loading:true
            }
        },
        computed:{
          ...mapGetters([
                'msgTip',
                'localInfo'
            ]),
        },
        methods:{
          ...mapActions([
                'showLoading',
                'hideLoading',
                'setMsgTip'
            ]),    
            trans(a){
                if(a==2) return '登入事件'
                return '登出事件'
            },      
             //接口   im1
            showImLoginOrLogout(num){
                      this.loading = true
                let params = {
                    pageSize:15,
                    pageNo:num,
                    dateStr:this.date,
                    userMobile:this.phone,
                    type:this.sort1
                }
                allApi.showImLoginOrLogout(params)
                .then(result => {
                    this.loading= false
                    this.res=result
                    this.records=result.records
                    console.log('111')
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            }
        },
        created(){
            this.showImLoginOrLogout(1)
        },
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";
    #ima2{
        input[type="tel"]{
            color: #00B1B3;
            border: 1px solid #00B1B3;
            background-color: rgba(0, 177, 179, 0.1);
        }
        .component-datepick__value{
            color: #00B1B3;
            border: 1px solid #00B1B3;
            background-color: rgba(0, 177, 179, 0.1);
        }
        select .sort{
            color: #00B1B3;
            border: 1px solid #00B1B3;
            background-color: rgba(0, 177, 179, 0.1);  
        }
        .form-item__value input, .form-item__value select,  .form-item__value textarea,  .form-item__value .component-datepick__value{
            color: #00B1B3;
            border: 1px solid #00B1B3;
            background-color: rgba(0, 177, 179, 0.1);  
        }
            
    }
</style>
