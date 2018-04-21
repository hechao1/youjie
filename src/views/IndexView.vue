<template>
    <div id='index'>
        <div class='router-inner index-view'>

            <!-- wrapper begin -->
            <div class="wrapper">

                <header class="index-header">
                    <div class="index-header__company">
                        <div class='text'>
                            <p>有借应用管理平台</p>
                        </div>
                    </div>
                    <div class="index-header__user">
                        <p class='logout' @click='goLogin'>退出</p>
                    </div>
                </header>

                <div class="index-main">
                    <div class='side-bar'>
                        <ul class='side-bar__list'>
                            <!-- <li class='side-bar__box'>
                                <div class="side-bar__item generate active">
                                    <i class='iconfont icon-xinxi-copy'></i>
                                    <p>生成风险评估报告</p>
                                    <i class='iconfont icon-arrow'></i>
                                </div>
                            </li> -->
                            <li class='side-bar__box' v-for='item in sideBarList'>
                                <div
                                    class='menu'
                                    v-for='subItem in item'
                                    :class='{ "no-open" : !subItem.opened }'
                                    @click='goRouter(subItem)'>
                                    <div 
                                        class="menu__item"
                                        :class='{ active : currentRouter(subItem)}'>
                                        <i class='iconfont icon' :class='subItem.iconClass'></i>
                                        <p>{{subItem.text}}</p>
                                        <i v-if='subItem.subRouters.length > 1' class='iconfont icon-arrow'></i>
                                    </div>
                                    <ul 
                                        class='sub-menu' 
                                        v-if='subItem.subRouters.length > 1' 
                                        :style='{ height:subItem.subRouters.length * 40 + "px" }'>
                                        <li 
                                            class='sub-menu__item' 
                                            v-for='subItem in subItem.subRouters'
                                            @click.stop="goRouter(subItem.name,'sub')" > {{ subItem.text }} </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="content">
                        <transition name='router' mode="out-in">
                            <router-view class='router index-sub-router'></router-view>
                        </transition>
                    </div>
                </div>
            </div>
            <!-- wrapper end -->


        </div>
    </div>
</template>

<script>
    import { Promise } from 'es6-promise'
    import footerBar from '../components/FooterBar.vue'
    import selectGroup from '../components/SelectGroup.vue'
    import selectOption from '../components/SelectOption.vue'
    import radioGroup from '../components/RadioGroup.vue'
    import radio from '../components/Radio.vue'
    import checkBox from '../components/CheckBox.vue'
    import  { mapGetters, mapActions }  from 'vuex'


    export default {
        components:{
            footerBar,
            selectGroup,
            selectOption,
            radioGroup,
            radio,
            checkBox
        },
        methods:{
            // actions
            ...mapActions([
                'showLoading',
                'hideLoading',
                'setMsgTip',
                'setMsgTipStyle',
                'setSessionId',
            ]),
            currentRouter(item){
                let routerArr = this.$route.matched
                let matchRouter = _.some(routerArr,['name',item.router])
                return matchRouter
            },
            goRouter(item,isSub){
                console.log(item)
                let thisRouter
                let routers = item.subRouters

                if(isSub === 'sub'){
                    if(this.$route.name == item) return
                    this.$router.push(item)
                    return
                }

                if(routers.length > 1){
                    item.opened = !item.opened
                    return
                }

                thisRouter = routers[0]
                if(this.$route.name == thisRouter.name) return
                this.$router.push(thisRouter)
            },
            goLogin(){
                this.setSessionId('')
                this.$router.push({
                    name:'login'
                })
            }
        },
        data() {
            return {
                isWeb:process.env.NODE_ENV == 'web',
                placeholder:'--',
                showModal:false,
                selectBox:'大雨',
                radioBox:'123',
                checkBox:true,
                sideBarList:[[{
                    text:'每日数据',
                    router:'daily',
                    opened:false,
                    subRouters:[{
                        name:'daily-index'
                    }],
                    iconClass:'icon-statistics'
                },{
                    text:'用户',
                    router:'user',
                    opened:false,
                    subRouters:[{
                        name:'user-index'
                    }],
                    iconClass:'icon-user'
                },{
                    text:'提现／充值',
                    router:'money',
                    opened:false,
                    subRouters:[{
                        name:'money-index'
                    }],
                    iconClass:'icon-finance'
                },{
                    text:'成交订单',
                    router:'order',
                    opened:false,
                    subRouters:[{
                        name:'order-index'
                    }],
                    iconClass:'icon-evaluate'
                },{
                    text:'信用认证',
                    router:'report',
                    opened:false,
                    subRouters:[{
                        name:'report-index'
                    }],
                    iconClass:'icon-finance'
                },{
                    text:'消息推送',
                    router:'push-message',
                    opened:false,
                    subRouters:[{
                        name:'push-message-index'
                    }],
                    iconClass:'icon-message-hollow'
                },{
                    text:'生成微信渠道',
                    router:'qr',
                    opened:false,
                    subRouters:[{
                        name:'qr-index'
                    }],
                    iconClass:'icon-see'
                },{
                    text:'补借条',
                    router:'IOU',
                    opened:false,
                    subRouters:[{
                        name:'IOU-index'
                    }],
                    iconClass:'icon-invoice'
                },
                {
                    text:'小乙入驻管理',
                    router:'settled',
                    opened:false,
                    subRouters:[{
                        name:'settled-index'
                    }],
                    iconClass:'icon-see'
                },
                // {
                //     text:'补22借条',
                //     router:'ima',
                //     opened:false,
                //     subRouters:[{
                //         name:'ima-index'
                //     }],
                //     iconClass:'icon-invoice'
                // },

                // ,{
                //     text:'贷款导流',
                //     router:'loan',
                //     opened:true,
                //     subRouters:[{
                //         name:'loan-index',
                //     }],
                //     iconClass:'icon-finance'
                // }
                ],
                 [{
                    text:'IM记录',
                    router:'ima',
                    iconClass:'icon-finance',
                    opened:true,
                    subRouters:[{
                      name:'ima-index',
                      text:'IM记录抄送－P2P消息',
                    },
                    {
                      name:'ima-detail',
                      text:'IM记录抄送－登入登出消息'
                    }]
                  },
                  {
                    text:'用户高级操作',
                    router:'userhigher',
                    opened:false,
                    subRouters:[{
                        name:'userhigher-index'
                    }],
                    iconClass:'icon-see'
                },
                  
                  ],
                  
                
                ]
            }
        },
        computed:{
            ...mapGetters([
                'loading',
                'msgTip',
                'localInfo',
            ]),
            admin(){
                return this.localInfo.admin
            },
            sessionId(){
                return this.localInfo.sessionId
            },
            needLogin(){
                return this.localInfo.needLogin
            }
        },
        created(){
            // this.setMsgTipStyle({ top:'100px' })
        },
        watch: {
            'needLogin'(newVal,oldVal){
                if(newVal == oldVal) return
                if(newVal === true)
                this.$router.replace({
                    name:'login'
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .index-view{
         .side-bar__box{
            border-bottom-color:transparent!important;
        }
         .side-bar__box:last-child{
             margin: -45px 0;
         }
         .sub-menu {
            padding-left: 20px!important;
         }
        .wrapper{
            width: 100%;
            height:100%;
            padding-bottom:10px;
            box-sizing:border-box;
        }
        .index-header{
            display:flex;
            justify-content:space-between;
            align-items:center;
            background-color: $orange;
            color:#fff;
        }
        .index-header__company{
            display:flex;
            align-items:center;
            .logo{
                margin:16px 18px 16px 40px;
                width: 48px;
                height:48px;
            }
            .text{
                p{
                    margin:16px 18px 16px 40px;
                    font-size: 20px;
                    line-height:48px;
                }
                span{
                    font-size: 13px;
                    color:$dark;
                }
            }
        }
        .index-header__user{
            display:flex;
            align-items:center;
            padding-right: 36px;
            .iconfont{
                display: block;
                font-size: 15px;
                width: 15px;
                height:15px;
                padding:2px;
                border:1px solid #fff;
                border-radius:50%;
            }
            .name{
                padding-left:10px;
                padding-right: 20px;
                i{
                    color:#fff;
                }
            }
            .logout{
                padding-left: 20px;
                position: relative;
                color:#fff;
                cursor:pointer;
                &:before{
                    content:'';
                    position: absolute;
                    left:0;
                    top:50%;
                    height:100%;
                    transform:translate(0,-50%);
                }
            }
        }
        .index-main{
            display:flex;
            position: absolute;
            top:80px;
            bottom:0;
            left:0;
            right:0;
        }
        .content{
            flex:1;
            position: relative;
        }
        .side-bar{
            width: 200px;
            height:100%;
            overflow:auto;
            background-color: #FAFAFA;
            text-align:center;
            border-right:1px solid $sectionColor;
            padding:0;
            box-sizing:border-box;
        }
        .side-bar__box{
            padding:20px 0;
            border-bottom:1px solid $sectionColor;
            &:last-child{
                border-bottom:none;
            }
        }
        .index-footer{
            position: absolute;
            bottom:0;
            background-color: #FFF;
            padding: 10px;
            a{
                color:$importColor;
            }
        }
    }
</style>
