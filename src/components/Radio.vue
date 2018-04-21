<template>
    <div class="component-radio" @click='selectRadio'>
        <span class="component-radio__check" :class='{ checked:checked }'>
            <i class='iconfont icon-duigou'></i>
        </span>
        <div class="component-radio__text">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        props:{
            value:[String,Number,Boolean],
        },
        data() {
            return {
                show_options:false
            }
        },
        computed:{
            checked(){
                return this.$parent.value == this.value
            }
        },
        methods:{
            selectRadio(){
                this.$parent.$emit('radioChange', this.value);
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-radio{
        display:flex;
        margin-right:15px;
        align-items:center;
        padding-left:6px;
        &:first-child{
            padding-left: 0;
        }
    }
    .component-radio__check{
        display: block;
        color:#fff;
        width: 18px;
        height:18px;
        box-sizing:border-box;
        border:1px solid $defaultColor;
        border-radius:50%;
        position: relative;
        transition:background-color ease 200ms;
        &.checked{
            border:1px solid $green;
            background-color:$green;
            .iconfont{
                transform:scale(1);
            }
        }
        .iconfont{
            position: absolute;
            font-size:16px;
            width: 16px;
            height:16px;
            top:50%;
            left:50%;
            margin:-8px 0 0 -8px;
            transform:scale(0);
            transition:ease 150ms transform;
            &:before{
                position: absolute;
                width: 100%;
                height:100%;
                top:1px;
                left:0;
            }
        }
    }
    .component-radio__text{
        padding-left: 8px;
    }
</style>


