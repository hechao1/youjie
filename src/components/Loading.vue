<template>
    <transition name='fade'>
        <div
        :class="{
            'loading--fullscreen':mode == 'fullscreen',
            'loading--full':mode == 'full',
            'loading--absolute':mode == 'absolute',
            'loading':mode == 'normal',
        }"
        :style="wrapStyleObject">
            <span class="loading__box">
                <em class="loading__title" v-if='title'>{{ title }}</em>
                <i class="loading__icon"
                    :style="{
                        'width':size + 'px',
                        'height':size + 'px',
                        'border-color':color,
                        'border-right-color':'transparent'
                    }"></i>
            </span>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            mode: {
                type: String,
                default:'normal'
            },
            color:{
                type: String,
                default:'#00B1B3'
            },
            size:{
                type: Number,
                default:24
            },
            autoSize:{
                type: Boolean,
                default:false
            },
            title:{
                type: String,
                default:''
            }
        },
        computed:{
            wrapStyleObject(){
                if(this.autoSize){
                    return {
                        width:this.size + 'px',
                        height:this.size + 'px'
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/_variables";
    @import "../sass/_extends";
    @import "../sass/_mixins";

    .loading{
        @extend %loading;
    }
    .loading__box{
        @extend %loading__box;
    }
    .loading__title{
        font-size: 12px;
        font-weight:500;
        padding: 0 0 8px 0;
        display: block;
        color:$importColor;
    }
    .loading__icon{
        @extend %loading__icon;
    }
    .loading--fullscreen{
        @extend %loading;
        background:rgba(187, 187, 187, 0.37);
        position:absolute;
        z-index:$zIndex_loading_full;
        top:0;
        left:0;
        bottom:0;
        width:100%;
        height:auto;
        transition:ease .3s all;
        transform:translate3d(0,0,0);
        .loading__box{
            background-color: rgba(255, 255, 255, 0.33);
        }
    }
    .loading--full{
        @extend %loading;
        position:absolute;
        z-index:$zIndex_loading;
        top:0;
        left:0;
        bottom:0;
        width:100%;
        height:auto;
        transition:ease .3s all;
        transform:translate3d(0,0,0);
    }
    .loading--absolute{
        @extend %loading;
        position:absolute;
        width:100%;
        top:10px;
        z-index:2;
    }

</style>
