<template>
    <transition name='component-modal'>
        <div class="component-modal" v-show="show">
            <div class="component-modal__mask" @click="closeOnMask"></div>
            <div class="component-modal__container" :style='{width:width+"px"}'>
                <i class="component-modal__close iconfont icon-close-pure" @click="emitClose" v-if='closeButton'></i>
                <div class="component-modal__header">
                    <span>{{title}}</span>
                </div>
                <p class="component-modal__tip" v-if='tip'>{{tip}}</p>
                <div class="component-modal__main">
                    <slot></slot>
                </div>
                <footer class="component-modal__buttons">
                    <span v-if='cancleText' class="component-modal__button cancle" @click="emitClose">{{ cancleText }}</span>
                    <span v-if='confirmText' class="component-modal__button confirm" @click="emitConfirm">
                        <button-loading :button='false' :loading='loading' color='#00B1B3'>{{ confirmText }}</button-loading>
                    </span>

                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
    import buttonLoading from './ButtonLoading.vue'

    export default {
        props: {
            loading:{
                type: Boolean,
                default: false
            },
            confirmText:{
                type: String,
                default: '确定'
            },
            cancleText:{
                type: String,
                default: '取消'
            },
            closeButton:{
                type: Boolean,
                default:true
            },
            title:{
                type: String,
                default:''
            },
            tip:{
                type: String,
                default:''
            },
            width:{
                type: Number,
                default:580
            },
            mode: {
                type: String,
                default:'normal'
            },
            show: {
                type: Boolean,
                required: true,
                default:false
            },
            maskClose:{
                type: Boolean,
                default:true
            },
        },
        methods:{
            emitClose(){
                this.$emit('close')
            },
            emitConfirm(){
                this.$emit('confirm')
            },
            closeOnMask(){
                if(this.maskClose){
                    this.emitClose()
                }
            },
        },
        components:{ buttonLoading }
    }
</script>

<style lang="scss">
    @import "../sass/_variables";
    @import "../sass/_extends";
    @import "../sass/_mixins";
    .component-modal{
        position: fixed;
        z-index: $zIndex_modal;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow:auto;
        -webkit-overflow-scrolling: touch;
        transition: all 200ms ease;
        background-color: rgba(0, 0, 0, 0.5);
        .component-button-loading{
            margin-top:0;
            width: 2em;
        }
    }
    .component-modal__header{
        margin: 0px;
        color: rgba(0, 0, 0, 0.870588);
        font-size: 20px;
        line-height: 32px;
        font-weight: 400;
        border-bottom: none;
        padding:24px 24px 20px 24px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
    .component-modal__main{
        padding:0 24px 20px 24px;
    }

    .component-modal__buttons{
        display:flex;
        justify-content:flex-end;
        text-align:center;
        padding-top: 117px;
        padding:8px;
        .component-modal__button{
            border-radius:3px;
            cursor:pointer;
            transition:ease .3s all;
            font-size: 15px;
            display: block;
            color:$green;
            padding: 10px 20px;
            &:hover{
                background-color: $grayLight;
            }
        }
    }

    .component-modal__mask {
        width: 100%;
        height:100%;
    }

    .component-modal__container {
        border-radius:2px;
        position:absolute;
        width: 90%;
        max-height:90%;
        box-sizing:border-box;
        overflow:auto;
        -webkit-overflow-scrolling:touch;
        z-index:2;
        top:50%;
        left:50%;
        transform:translate3d(-50%,-50%,0);
        transition: transform 250ms ease;
        background-color: #fff;
    }
    .component-modal__tip{
        padding-top: 16px;
    }
    .component-modal__close{
        cursor:pointer;
        position: absolute;
        right: 8px;
        top: 8px;
        font-size: 30px;
        width: 30px;
        height: 30px;
        transition:color ease .3s;
        &:hover{
            color:#000;
        }
    }
    .component-modal__cancle{
        @extend %font-button;
        width:64px;
        padding:15px 0;
        display:block;
        text-align:center;
        &:active{
            color:darken(#fff,10%)
        }
    }
    .modal-title{
        @extend %font-headline;
        color:rgba(#fff,.5);
        text-align:center;
        flex:1;
    }
    .modal-confirm{
        @extend %font-button;
        padding:15px 0;
        width:64px;
        display:block;
        text-align:center;
        &:active{
            color:darken(#fff,10%)
        }
    }

    .modal-body {
        padding: 0 16px 40px 16px;
        h2{
            padding:16px 0;
            text-align:center;
            font-size:15px;
        }
        p{
            color:$gray;
            line-height:1.5;
        }
    }
    .component-modal-enter {
        opacity: 0;
    }

    .component-modal-leave-active {
        opacity: 0;
    }
    .component-modal-enter .component-modal__container,
    .component-modal-leave-active .component-modal__container {
      transform: translate3d(-50%,-50%,0) scale(.95);
    }


    .modal-warning{
        .modal-header{
            @extend %font-title;
            color:$importColor;
            background-color: transparent;
            padding:10px 0 16px 0;

        }
    }
    .modal-bottom{
        .modal-container{
            width: 100%;
            max-height:90%;
            top:auto;
            bottom:0;
            left:0;
            transform:translate3d(0,0,0);
        }
        .modal-enter .modal-container,
        .modal-leave .modal-container {
            transform:translate3d(0,0,0);
        }
    }

</style>
