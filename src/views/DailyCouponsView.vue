<template>
    <div id='couponsNumber'>
       <!-- test -->
       <loading mode="full" v-if="loading"></loading>
       <h1 class="card-title">
            <span>点券分布 详细分布</span>
       </h1>
       <div class="user-data loading-min-height">
            <transition name='fade'>
                <div>
                    <div class='couponsDetail'>
                            <!-- <span>{{daily.RegisterNow || placeholder}} / {{daily.RegisterAll || placeholder}}</span> -->
                           <span>2点券(芝麻分580以下)</span>
                    </div> 
                    <div class="total-count" v-if='scoreUser'>
                        <div class="user-data__item">
                            <span v-if='scoreUser.scoreAmountByZmScore0To580Now'>{{scoreUser.scoreAmountByZmScore0To580Now |toYuan}}</span>
                            <span v-else>--</span>
                            <p>今日付费点数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.scoreAmountByZmScore0To580All'>{{scoreUser.scoreAmountByZmScore0To580All |toYuan}}</span>
                            <span v-else>--</span>
                            <p>全部付费点数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.bePayUserCountByZmScore0To580Now'>{{scoreUser.bePayUserCountByZmScore0To580Now}}</span>
                            <span v-else>--</span>
                            <p>今日被付费人数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.bePayUserCountByZmScore0To580All'>{{scoreUser.bePayUserCountByZmScore0To580All}}</span>
                            <span v-else>--</span>
                            <p>全部被付费人数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.CUserCountByZmScore0To580Now'>{{scoreUser.CUserCountByZmScore0To580Now}}</span>
                            <span v-else>--</span>
                            <p>今日新增该区间小C人数</p>
                        </div>    
                        <div class="user-data__item">
                            <span v-if='scoreUser.CUserCountByZmScore0To580All'>{{scoreUser.CUserCountByZmScore0To580All}}</span>
                            <span v-else>--</span>
                            <p>全部该区间小C人数</p>
                        </div>                
                    </div>
                    <div class='couponsDetail'>
                            <!-- <span>{{daily.RegisterNow || placeholder}} / {{daily.RegisterAll || placeholder}}</span> -->
                           <span>2点券(芝麻分581-600)</span> 
                    </div> 
                    <div class="total-count" v-if='scoreUser'>
                        <div class="user-data__item">
                            <span v-if='scoreUser.scoreAmountByZmScore581To600Now'>{{scoreUser.scoreAmountByZmScore581To600Now |toYuan}}</span>
                            <span v-else>--</span>
                            <p>今日付费点数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.scoreAmountByZmScore581To600All'>{{scoreUser.scoreAmountByZmScore581To600All |toYuan}}</span>
                            <span v-else>--</span>
                            <p>全部付费点数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.bePayUserCountByZmScore581To600Now'>{{scoreUser.bePayUserCountByZmScore581To600Now}}</span>
                            <span v-else>--</span>
                            <p>今日被付费人数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.bePayUserCountByZmScore581To600All'>{{scoreUser.bePayUserCountByZmScore581To600All}}</span>
                            <span v-else>--</span>
                            <p>全部被付费人数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.CUserCountByZmScore581To600Now'>{{scoreUser.CUserCountByZmScore581To600Now}}</span>
                            <span v-else>--</span>
                            <p>今日新增该区间小C人数</p>
                        </div>    
                        <div class="user-data__item">
                            <span v-if='scoreUser.CUserCountByZmScore581To600All'>{{scoreUser.CUserCountByZmScore581To600All}}</span>
                            <span v-else>--</span>
                            <p>全部该区间小C人数</p>
                        </div>            
                    </div>
                    <div class='couponsDetail'>
                            <!-- <span>{{daily.RegisterNow || placeholder}} / {{daily.RegisterAll || placeholder}}</span> -->
                           <span>6点券(芝麻分601-650)</span> 
                    </div> 
                    <div class="total-count" v-if='scoreUser'>
                        <div class="user-data__item">
                            <span v-if='scoreUser.scoreAmountByZmScore601To650Now'>{{scoreUser.scoreAmountByZmScore601To650Now |toYuan}}</span>
                            <span v-else>--</span>
                            <p>今日付费点数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.scoreAmountByZmScore601To650All'>{{scoreUser.scoreAmountByZmScore601To650All |toYuan}}</span>
                            <span v-else>--</span>
                            <p>全部付费点数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.bePayUserCountByZmScore601To650Now'  >{{scoreUser.bePayUserCountByZmScore601To650Now}}</span>
                            <span v-else>--</span>
                            <p>今日被付费人数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.bePayUserCountByZmScore601To650All'>{{scoreUser.bePayUserCountByZmScore601To650All}}</span>
                            <span v-else>--</span>
                            <p>全部被付费人数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.CUserCountByZmScore601To650Now'>{{scoreUser.CUserCountByZmScore601To650Now}}</span>
                            <span v-else>--</span>
                            <p>今日新增该区间小C人数</p>
                        </div>    
                        <div class="user-data__item">
                            <span v-if='scoreUser.CUserCountByZmScore601To650All'>{{scoreUser.CUserCountByZmScore601To650All}}</span>
                            <span v-else>--</span>
                            <p>全部该区间小C人数</p>
                        </div>            
                    </div>
                    <div class='couponsDetail'>
                            <!-- <span>{{daily.RegisterNow || placeholder}} / {{daily.RegisterAll || placeholder}}</span> -->
                           <span>8点券(芝麻分650以上)</span> 
                    </div>
                    <div class="total-count" v-if='scoreUser'>
                        <div class="user-data__item">
                            <span v-if='scoreUser.scoreAmountByZmScore651UpNow'>{{scoreUser.scoreAmountByZmScore651UpNow |toYuan}}</span>
                            <span v-else>--</span>
                            <p>今日付费点数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.scoreAmountByZmScore651UpAll'>{{scoreUser.scoreAmountByZmScore651UpAll |toYuan}}</span>
                            <span v-else>--</span>
                            <p>全部付费点数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.bePayUserCountByZmScore651UpNow'>{{scoreUser.bePayUserCountByZmScore651UpNow}}</span>
                            <span v-else>--</span>
                            <p>今日被付费人数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.bePayUserCountByZmScore651UpAll'>{{scoreUser.bePayUserCountByZmScore651UpAll}}</span>
                            <span v-else>--</span>
                            <p>全部被付费人数</p>
                        </div> 
                        <div class="user-data__item">
                            <span v-if='scoreUser.CUserCountByZmScore651UpNow'>{{scoreUser.CUserCountByZmScore651UpNow}}</span>
                            <span v-else>--</span>
                            <p>今日新增该区间小C人数</p>
                        </div>    
                        <div class="user-data__item">
                            <span v-if='scoreUser.CUserCountByZmScore651UpAll'>{{scoreUser.CUserCountByZmScore651UpAll}}</span>
                            <span v-else>--</span>
                            <p>全部该区间小C人数</p>
                        </div>            
                    </div>
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
    import datePicker from '../components/DatePicker.vue'
    import areaSelect from '../components/AreaSelect.vue'
    import radio from '../components/Radio.vue'
    import loading from '../components/Loading.vue'
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
            toolTip,
            modal,
            confirm,
            buttonLoading,
            pagination,
            datePicker
        },
        data() {
            return {
                scoreUser:{},
                loading:true
            }
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
            // filters
            timestampToDate(timestamp){
                if(!timestamp) return this.placeholder
                return moment(timestamp).format('YYYY-MM-DD')
            },
            scoreUseDetail(){
                this.loading = true
                allApi.scoreUseDetail()
                .then(result=>{
                    this.loading = false
                    this.scoreUser=result
                
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            },

        },
        created(){
                this.scoreUseDetail()
        },
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";
    #couponsNumber{
        .couponsDetail{
            margin: 10px 0;
            // display: inline-block;
            color:#00B1B3;
            width: 260px;
            height: 50px;
            line-height: 50px;
            box-sizing: border-box;
            border: 1px solid $sectionColor;
            box-shadow:rgba(0, 0, 0, 0.03) 0px 1px 6px, rgba(0, 0, 0, 0.04) 0px 1px 4px;
            // span{
                // margin:0 80px;
            // }
            // overflow: auto;
            text-align: center;
        }
        padding:0 40px 20px 40px;
        box-sizing:border-box;
        overflow:auto;
        .data-chart{
            padding-top: 20px;
        }
        .user-data{
            padding-bottom: 20px;
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
            width: 260px;
            padding:10px 0;
            box-sizing: border-box;
            margin-bottom: 15px;
            border:1px solid $sectionColor;
            border-radius:4px;
            box-shadow:rgba(0, 0, 0, 0.03) 0px 1px 6px, rgba(0, 0, 0, 0.04) 0px 1px 4px;
            margin-right:20px;
            span{
                display: block;
                font-size: 30px;
                color:$green;
                padding-left: 10px;
                padding-right: 10px;
            }
            p{
                padding: 10px;
                padding-bottom: 0;
                line-height:1.3;
            }
        }
    }
</style>
