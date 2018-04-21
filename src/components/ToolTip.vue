<template>
    <div class='component-tooltip'>
        <div class="component-tooltip__box" @mouseover='showTip' @mouseleave='hideTip'>
            <div class="component-tooltip__base">
                <slot name='base'></slot>
            </div>
            <transition name='component-tooltip'>
                <div class="component-tooltip__tip" v-show='show_tip' :style='styleTipWidth' :class='direction'>
                    <slot name='tip'></slot>
                </div>
            </transition>
        </div>
    </div>

</template>

<script>

    export default {
        props:{
            width:{
                type: String,
                default: '200'
            },
            direction:{
                type: String,
                default: 'top'
            },

        },
        created(){
        },
        data() {
            return {
                show_tip:false
            }
        },
        computed:{
            styleTipWidth(){
                return {
                    width:`${this.width}px`
                }
            }
        },
        methods:{
            showTip(){
                this.show_tip = true
            },
            hideTip(){
                this.show_tip=false
            }
        }
    }
</script>

<style lang='scss'>
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-tooltip__box{
        position: relative;
    }
    .component-tooltip__base{
        cursor: pointer;
    }
    .component-tooltip__tip{
        position: absolute;
        z-index:2;
        font-size: 12px;
        line-height:1.5;
        background-color: #fff;
        padding:10px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
        &:before,&:after{
            content:'';
            position: absolute;
        }
        &.top{
            left:50%;
            bottom:100%;
            margin-bottom:10px;
            transform:translate(-50%,0);
            &:before{
                bottom:-6px;
                left:50%;
                transform:translate(-50%,0);
                @include triangle(10px,hsla(0,0%,85%,.7),bottom)
            }
            &:after{
                bottom:-5px;
                left:50%;
                transform:translate(-50%,0);
                @include triangle(12px,#fff,bottom)
            }
        }
        &.right{
            left:100%;
            top:50%;
            margin-left:10px;
            transform:translate(0,-50%);
            &:before{
                left:-6px;
                top:50%;
                transform:translate(0,-50%);
                @include triangle(12px,hsla(0,0%,85%,.7),left)
            }
            &:after{
                left:-5px;
                top:50%;
                transform:translate(0,-50%);
                @include triangle(12px,#fff,left)
            }
        }
        &.bottom{
            left:50%;
            top:100%;
            margin-top:10px;
            transform:translate(-50%,0);
            &:before{
                top:-6px;
                left:50%;
                transform:translate(-50%,0);
                @include triangle(12px,hsla(0,0%,85%,.7),top)
            }
            &:after{
                top:-5px;
                left:50%;
                transform:translate(-50%,0);
                @include triangle(12px,#fff,top)
            }
        }
        &.left{
            right:100%;
            top:50%;
            margin-right:10px;
            transform:translate(0,-50%);
            &:before{
                right:-6px;
                top:50%;
                transform:translate(0,-50%);
                @include triangle(12px,hsla(0,0%,85%,.7),right)
            }
            &:after{
                right:-5px;
                top:50%;
                transform:translate(0,-50%);
                @include triangle(12px,#fff,right)
            }
        }

    }

    .component-tooltip-enter-active, .component-tooltip-leave-active{
        transition: opacity ease 300ms 200ms;
    }
    .component-tooltip-enter, .component-tooltip-leave-active {
        opacity:0;
    }

</style>


