<template>
    <div class="component-radio-box">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        props:{
            value:[String,Number],
        },
        data() {
            return {

            }
        },
        computed:{

        },
        methods:{
            changeValue(value){
                this.$emit('input', value);
            }
        },
        created() {
            this.$on('radioChange', this.changeValue)
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-radio-box{
        display:flex;
    }
</style>


