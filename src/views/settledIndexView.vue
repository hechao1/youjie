<template>
    <div id='settled'>
        <loading mode="full" v-if="loading"></loading>
       <h1 class="card-title">
            <span>小乙入驻管理</span>
            <div class="card-title__button" ></div>
      <!-- <div class="card-title__button">添加拓展经理</div> -->
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
              <div class="form-item__key">渠道</div>
              <div class="form-item__value">
                <input type="text" placeholder="请输入渠道" v-model='channel'>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key"> 开始日期</div>
              <div class="form-item__value">
                <date-picker
                  color='#757575'
                  :placeholder='`选择日期`' v-model="date"></date-picker>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key"> 结束日期</div>
              <div class="form-item__value">
                <date-picker
                  color='#757575'
                  :placeholder='`选择日期`' v-model="dateEnd"></date-picker>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item__key">拓展经理</div>
              <div class="form-item__value">
                <select v-model="sort3">
                  <option value="">全部</option>
                  <option value="未分配">未分配</option>
                  <option value="陈晓启">陈晓启</option>
                  <option value="韩亮">韩亮</option>
                  <option value="解红权">解红权</option>
                  <option value="王安">王安</option>
                  <option value="雷宏">雷宏</option>
                </select>
              </div>
            </div>  
             <div class="form-item">
              <div class="form-item__key">注册状态</div>
              <div class="form-item__value">
                <select v-model="sort5">
                  <option value="false">未注册(默认)</option>
                  <option value="true">已注册</option>
                  
                </select>
              </div>
            </div>           
          </div>
          <div  class="form-button"><span class="form-button__item button" @click='expandUserList(1)'>搜索</span></div>
        </div>
         <table  width="100%">
                <thead class="table-list__head">
                <tr>
                  <th>手机</th>
                  <th>渠道号</th>
                  <th>获客时间</th>
                  <th>拓展标签</th>
                  <th>注册状态</th>
                  <th>操作</th>

                </tr>
                </thead>
                <tbody class='table-list__body have-border'>
                    <tr v-for='item in records'>
                        <td>
                            <span v-if='item.mobile'>{{item.mobile}}</span>
                            <span v-else>--</span>
                        </td>
                        <td>
                            <span v-if='item.channel'>{{item.channel}}</span>
                            <span v-else>--</span>
                        </td>
                        <td>
                            <span v-if='item.createdAt'>{{timestampToDate(item.createdAt)}}</span>
                            <span v-else>--</span>
                        </td>
                        <td>
                            <span v-if='item.expandManager'>{{item.expandManager}}</span>
                            <span v-else>--</span>
                        </td>
                        <td>
                            <span >{{item.isRegister |booleanToStr}}</span>
                       </td>
                        <td>
                            <div class='option-box'>
                                <span class='option-button' style='color:#00989a;cursor:pointer;' @click='fengpei(item)'>分配</span>
                            </div>    
                        </td>
                    </tr>
                </tbody>
        </table>
        <pagination
                :current-page='pay.pageNum'
                :total-page='pay.totalPage'
                @pageChange='expandUserList'></pagination>

          <modal  
            :show='dapao' 
            title='修改拓展经理' 
            :width="1000"
            @close='dapao=false'
            @confirm='expandUserExpand'
            >
                      <ul>
                            <li class="result-info__item">
                                <div class="result-info__key">拓展经理选项</div>
                                    <div class="result-info__value check-list">
                                        <radio-group v-model="qiehuan">
                                            <radio value='陈晓启'>陈晓启</radio>
                                            <radio value='韩亮'>韩亮</radio>
                                            <radio value='解红权'>解红权</radio>
                                            <radio value='王安'>王安</radio>
                                            <radio value='雷宏'>雷宏</radio>
                                        </radio-group>
                                    </div>
                            </li>
                        </ul> 
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
        datePicker,
        },
        filters: {
            dateFormat,
            toYuan,
            booleanToStr(boolean){
                if (boolean === true) {
                return '已注册'
                }
                else {
                return '未注册'
                }
            },
            // isTrue(abbay){
            //     if(!abbay){
            //         return '--'
            //     }else{
            //         return 
            //     }
            // },
            },
        data() {
            return {
                phone:'',
                channel:'',
                date:'',
                dateEnd:'',
                sort3:'',
                records:[],
                pay:[],
                mobilePhone:'',
                expandOrder:'',
                dapao:false,
                loading:true,
                sort5:false,
                qiehuan:''

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
            timestampToDate(timestamp){
                if(!timestamp) return this.placeholder
                return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
            },
            transForm(a){
                if(a==true){
                    return '已注册'
                }else if(a==false){
                    return '未注册'
                }else{
                    console.log(111)
                }
            },
           expandUserList(num){
                      this.loading = true
                let params = {
                   mobile:this.phone,
                   channel:this.channel,
                   stringdateFrom:this.date,
                   stringdateTo:this.dateEnd,
                   expandManager:this.sort3,
                   pageSize:10,
                   pageNo:num,
                   isRegister:this.sort5

                }
                allApi.expandUserList(params)
                .then(result => {
                    this.loading= false
                    this.records=result.records
                    this.pay=result
                    console.log('111')
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
          },
           expandUserExpand(num){
                      this.loading = true
                let params = {
                   mobile: this.mobilePhone,
                   expandManager:this.qiehuan
                }
                allApi.expandUserExpand(params)
                .then(result => {
                    this.loading= false
                    console.log('111')
                      this.setMsgTip({
                        text: '分配成功',
                        type: 'success'
                        })
                        this.expandUserList(this.pay.pageNum)
                        this.dapao=false
                })
                .catch(error => {
                    console.error(error)
                    // this.loading = false/
                      this.setMsgTip({
                        text: '分配失败',
                        type: 'warn'
                        })
                })
          },
          fengpei(item){
              console.log(item)
              this.mobilePhone=item.mobile
              this.expandOrder=item.expandManager
              this.dapao=true
          }
        },
        created(){
            this.expandUserList(1)
        },
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";
    ＃settled{

    }
</style>