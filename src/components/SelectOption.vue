<template>
    <div class="component-select-option" @click.stop="selectOption" :class="{'active':isSelect}">
        {{ text }}
    </div>
</template>

<script>

    export default {
        props:{
            value:[String,Number],
            text:[String,Number]
        },
        data() {
            return {

            }
        },
        computed:{
            isSelect(){
                let returnValue
                _.each(this.$parent.values,(value,index)=>{
                    if(this.value == value.value){
                        returnValue = true
                        return false
                    }
                })
                return returnValue
            }
        },
        methods:{
            selectOption(){
                let isMultiple = this.$parent.multiple
                if(isMultiple){
                    this.$parent.$emit('optionSelect', this.value , this.text);
                    return
                }
                this.$parent.$emit('optionChange', this.value , this.text);
            }
        },
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-select-option{
        background: #fff;
        cursor:pointer;
        padding:9px 8px;
        position: relative;
        &:hover{
            background-color: $green;
            color:#fff;
        }
        &.active:after{
            position: absolute;
            right:10px;
            top:50%;
            margin-top:-7px;
            font-family:"iconfont" !important;
            font-size:14px;
            font-style:normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            content:'\e72e'
        }
    }
</style>
