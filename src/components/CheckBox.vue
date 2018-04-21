<template>
    <div class="component-checkbox" @click='toggleCheckBox'>
        <span class="component-checkbox__check" :class='{ checked:value }'>
            <i class='iconfont icon-duigou'></i>
        </span>
        <div class="component-checkbox__text">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        props:{
            value:Boolean,
        },
        data() {
            return{

            }
        },
        computed:{

        },
        methods:{
            toggleCheckBox(){
                this.$emit('input', !this.value);
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-checkbox{
        display:flex;
        align-items:center;
        padding-left:6px;
        cursor:poiner;
        &:first-child{
            padding-left: 0;
        }
    }
    .component-checkbox__check{
        display: block;
        color:$green;
        width: 18px;
        height:18px;
        box-sizing:border-box;
        border:1px solid $green;
        border-radius:2px;
        position: relative;
        &.checked{
            .iconfont{
                transform:scale(1);
            }
        }
        .iconfont{
            line-height:1;
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
                top:0px;
                left:0;
            }
        }
    }
    .component-checkbox__text{
        padding-left: 16px;
    }
</style>


