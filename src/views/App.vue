<template>
    <div id="app-box">
        <transition name='fade'>
            <router-view class="router" v-if='initLoaded'></router-view>
        </transition>
        <loading mode="fullscreen" v-show="loading.loadingShow" :title='loading.loadingTitle'></loading>
        <msg-tip :text='msgTip.text' :type='msgTip.type' v-show='msgTip.show' :style-info='msgTip.style'></msg-tip>
    </div>
</template>

<style lang="scss">
    @import "../sass/common";
    body{
        min-width:880px;
        .total-count{
            display: flex;
            flex-wrap:wrap;
            padding:30px 0;
        }
        .total-count__item{
            padding-right: 30px;
            padding-bottom: 30px;
            p{
                @extend %font-display2;
                font-size: 28px;
                color:$green;
                padding-bottom: 5px;
            }
            span{
                @extend %font-footnote;
            }
        }
        .menu{
            &.no-open > .sub-menu{
                height:0!important;
            }
            // padding:6px 0;
        }
        .menu__item{
            position: relative;
            padding:20px 10px;
            display:flex;
            align-items:center;
            cursor:pointer;
            transition:all ease .3s;
            p{
                font-size: 15px;
            }
            .icon-arrow{
                position: absolute;
                right:10px;
                top:50%;
                font-size: 12px;
                transform:translate(0,-50%);
                color:$defaultColor;
            }
            .icon{
                padding-left:5px;
                padding-right:14px;
                font-size: 16px;
                width: 16px;
                height:16px;

            }
            &.active{
                color:$green;
            }
            &:hover{
                color:$green;
                .icon-arrow{
                    color:$green;
                }
            }
            &.active{
                .icon-arrow{
                    color:$green;
                }
            }
            &.generate{
                display: block;
                padding-top: 20px;
                padding-bottom: 20px;
                height:auto;
                .icon-text{
                    font-size:40px;
                }
                p{
                    padding-left:0;
                    padding-right:0;
                    padding-top: 12.5px;
                }
            }
        }
        .sub-menu{
            text-align:left;
            padding-left: 46px;
            overflow:hidden;
            transition:all ease .3s;
        }
        .sub-menu__item{
            cursor:pointer;
            text-align:left;
            padding: 13px 0;
            &:active,&:hover{
                color:$green;
            }
        }
        .loading-min-height{
            min-height:140px;
            position: relative;
        }
        .no-data{
            padding:20px;
            text-align:center;
        }
        .data-count{
            padding-bottom: 20px;
        }
        .data-count__list{
            display:flex;
            flex-wrap: wrap;
            padding-top: 20px;
            min-height:140px;
        }
        .data-count__item{
            display:flex;
            flex-direction: column;
            justify-content:center;
            align-items:center;
            width: 200px;
            height:120px;
            margin-bottom: 15px;
            border:1px solid $sectionColor;
            border-radius:4px;
            box-shadow:rgba(0, 0, 0, 0.03) 0px 1px 6px, rgba(0, 0, 0, 0.04) 0px 1px 4px;
            margin-right:20px;
            span{
                display: block;
                font-size: 30px;
                color:$green;
                &.red{
                    color:$red;
                }
            }
            p{
                padding-top: 10px;
            }
            .paid{
                color:$green;
            }
        }
        .green{
            color:$green;
        }
        .table-show-all{
            cursor:pointer;
            display: block;
            text-align:center;
            padding:15px;
            color:$green;
            &:hover{
                color:$defaultColor;
            }
        }
        .main-view{
            padding:0 40px 60px 40px;
            box-sizing:border-box;
            overflow:auto;
        }
        .sub-router{
            padding:0 40px 60px 40px;
            box-sizing:border-box;
            overflow:auto;
        }
        .detail-content-box{
            position: relative;
        }
        .result-info{
            .card-title{
                font-size: 14px;
                color:$defaultColor;
            }
        }
        .result-info__item{
            display:flex;
            padding-top: 15px;
        }
        .result-info__key{
            line-height:1.3;
            width: 150px;
        }
        .result-info__value{
            flex:1;
            line-height:1.3;
            padding-left: 20px;
            color:$importColor;
        }
        .print-buttons{
            padding-top: 50px;
            padding-bottom:50px;
            .back{
                width: 80px;
                margin-right:20px;
            }
            text-align:center;
        }
        .print-button__item{
            text-align:center;
            cursor:pointer;
            display: inline-block;
            width: 260px;
            padding: 8px 0;
            border:1px solid $green;
            color:$green;
            font-size: 15px;
            transition:ease .3s all;
            &:hover{
                background-color: rgba($green,.1);
            }
        }
        .fast-button{
            .iconfont{
                cursor:pointer;
                font-size: 20px;
                width: 20px;
                height: 20px;
                color:$green;
                margin-left:15px;
                &:hover{
                    color:darken($green,10%);
                }
            }
        }
        .card-title{
            font-size: 18px;
            font-weight: normal;
            padding-bottom:15px;
            border-bottom:1px solid $sectionColor;
            color:$importColor;
            padding-top: 46px;
            position: relative;
            display:flex;
            align-items:center;
            justify-content:space-between;
            .component-button-loading{
                margin-top: 0;
            }
            .picker{
                display: flex;
                align-items: center;
                .form-item__value{
                    margin-left: 10px;
                }
                .form-button{
                    padding-left: 10px;
                }
                .split{
                    @extend %font-body1;
                    color:$defaultColor;
                    padding-left:10px;
                }
            }
        }
        .card-title__button-box{
            display: flex;
        }
        .card-title__button{
            cursor:pointer;
            line-height:32px;
            color:#fff;
            background-color: $green;
            padding:0 15px;
            margin-left:10px;
            border-radius:3px;
            text-align:center;
            font-size: 13px;
            font-weight: normal;
            font-weight: 300;
            transition:ease .3s all;
            &:hover{
                background-color: darken($green,10%);
            }
        }
        // form
        .form-box{
            width: 360px;
            margin:0 auto;
            &.auto{
                width: auto;
                margin: 0;
            }
            &.transparent{
                background-color: transparent;
                border:none;
            }
        }
        .form-table{
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding: 5px 0;
            border-bottom:1px solid $sectionColor;
            .form-content{
                display:flex;
                align-items:center;
                flex: 1;
                flex-wrap: wrap;
            }
            .form-button{

            }
            .form-item{
                width: auto;
                padding: 5px;
            }
        }
        .form-content{
            background-color: #fff;
        }
        .form-item{
            font-size:12px;
            display:flex;
            align-items:center;
            width:100%;
            box-sizing:border-box;
            padding-bottom: 30px;
        }
        .form-item__key{
            display:block;
            padding-right: 10px;
        }

        .form-item__value{
            position: relative;
            color:$importColor;
            display:flex;
            justify-content:space-between;
            align-items:center;
            width: 160px;
            box-sizing:border-box;
            input,select,textarea,.component-datepick__value{
                border:1px solid $sectionColor;
                border-radius:4px;
                @extend %font-input;
                flex:1;
                line-height: 30px;
                padding:0 8px;
                transition:ease all .3s;
            }
            textarea{
                transition:border ease .3s;
            }
            input:focus{
                border-color:$green;
            }
            textarea:focus{
                border-color:$green;
            }
        }
        .form-item__text{
            padding:19px 0;
            &.no-choose{
                color:$disabledColor;
            }
        }
        .table-box{
            position: relative;
            min-height: 140px;
        }
        .table-list{

        }
        .table-list table {
            border-collapse: separate;
            width: 100%;
            border-top: none;
            border-left: none;
            .option-box{
                margin-left:-4px;
            }
            .option-button{
                cursor: pointer;
                padding: 10px 4px;
                color: #00B1B3;
                &.disabled{
                    color:$disabledColor;
                }
            }
        }
        .table-list__info{
            p{
                padding:5px 0;
                &.title{
                    font-weight: normal;
                }
            }
        }
        .table-list__head{
            th,td{
                height:30px;
                line-height:1.4;
                font-size:14px;
                font-weight:normal;
                text-align:left;
                border-bottom:1px solid $sectionColor;
            }
            th{
                padding:10px 8px 10px 0;
            }
            td{
                padding:16px 8px 16px 0;
            }
        }
        .table-list__body {
            &.have-border{
                th,td{
                    border-bottom:1px solid $sectionColor;
                }
            }
            tr{
                th,td{
                    height:40px;
                    font-size: 13px;
                    padding:7px 8px 7px 0;
                    background-color: #FFF;
                    line-height:1.4;
                    text-align:left;
                }
            }
        }
    }


</style>
<script>
    import { Promise } from 'es6-promise'
    import client from '../utils/client'
    import loading from '../components/Loading.vue'
    import msgTip from '../components/MsgTip.vue'
    import { loginApi } from '../api/api'
    import  { mapGetters, mapActions }  from 'vuex'

    export default {
        components:{
            loading,
            msgTip
        },
        methods:{
            ...mapActions([
                'setUserId',
                'setDocumentClick',
                'showLoading',
                'hideLoading',
            ]),
            init(){
                this.initLoaded = true
            }
        },
        data(){
            return {
                initLoaded:false
            }
        },
        computed:{
            ...mapGetters([
                'loading',
                'msgTip',
                'localInfo'
            ]),
            routerAnimation(){
                console.log(this.localInfo.routerAnimation)
                return this.localInfo.routerAnimation
            },
            documentClick(){
                return this.localInfo.documentClick
            }
        },
        created(){
            console.log(process.env)
            client.initializeAll( () => this.init(), {} )

            this.$nextTick(()=>{
                $(document).on('click',()=>{
                    if(this.documentClick === true) return
                    this.setDocumentClick(true)
                })
            })
        },
    }
</script>
