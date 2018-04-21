<template>

    <div class="component-tab-content__item" v-show="show">
        <slot></slot>
    </div>

</template>

<script>

    export default {
        props:{
            name:{
                type: String,
                required: true
            },
            info:{
                type: String
            }
        },
        created(){
            this.$parent.navInfo.push({
                name: this.name,
                info: this.info
            })
        },
        mounted: function () {
            this.$nextTick(function () {
                _.each(this.$parent.$children,(item,index)=>{
                    if(this.$parent.$children[index].$el == this.$el){
                        this.index = index;
                        return false
                    }
                })
            })
        },
        data() {
            return {
                index:'',
                // show:false
            }
        },
        computed:{
            show(){
                return (this.$parent.activeData == this.index)
            }
        },
        methods:{

        }
    }
</script>

<style lang='scss'>
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

</style>


