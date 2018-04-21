<template>
    <div class='component-hide-part'>
        <div class="component-hide-part__content" :style='{ "max-height":`${maxHeight}px` }' :class='{"show-all":showAll}'>
            <slot></slot>
        </div>
        <div class="component-hide-part__show-all" @click='showAll = !showAll' :class='{"show-all":showAll}'>
            <div class="component-hide-part__show-text" v-show='!showAll'>
                <p>展开全部</p>
                <i class='iconfont icon-arrow'></i>
            </div>
            <div class="component-hide-part__show-text" v-show='showAll'>
                <p>收起全部</p>
                <i class='iconfont icon-arrow'></i>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props:{
            maxHeight:{
                type: String,
                default: '400'
            },
        },
        data() {
            return {
                showAll:false
            }
        },
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-hide-part{
        position: relative;
    }
    .component-hide-part__content{
        padding-bottom:50px;
        overflow:hidden;
        &.show-all{
            max-height:none!important;
        }
    }
    .component-hide-part__show-all{
        position: absolute;
        bottom:0;
        left:0;
        right:0;
        height:160px;
        text-align:center;
        color:$green;
        font-weight:normal;
        background-image:linear-gradient(180deg,rgba(255,255,255,0), #fff);
        transition:color ease 200ms;
        cursor:pointer;
        &:hover{
            color:$defaultColor;
        }
        &.show-all{
            background-image:none;
            height:40px;
            .component-hide-part__show-text{
                bottom:0;
            }
            .iconfont{
                transform:rotate(-90deg);
            }
        }
    }
    .component-hide-part__show-text{
        position: absolute;
        left:50%;
        transform:translate(-50%,0);
        text-align:center;
        bottom:20px;
        font-size: 12px;
        padding-bottom:20px;
        .iconfont{
            transform:rotate(90deg);
            position: absolute;
            bottom:0;
            left:50%;
            margin-left:-8px;
        }
    }
</style>


