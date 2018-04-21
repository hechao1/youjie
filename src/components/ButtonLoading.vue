<template>
    <div class='component-button-loading'>
        <div class="component-button-loading__button" :class='{disabled:loading, "short":short, button:button}' @click='emitClick'>
            <transition name='fade'>
                <span class='component-button-loading__text' :class='{ "hide":loading }'>
                    <slot></slot>
                </span>
            </transition>
        </div>
        <loading v-show='loading' class='component-button-loading__loading' mode='absolute' :color='color' :size='14'></loading>
    </div>

</template>

<script>
    import loading from '../components/Loading.vue'

    export default {
        props:{
            button:{
                type: Boolean,
                default: true
            },
            color:{
                type: String,
                default: '#fff'
            },
            loading:{
                type: Boolean,
                default: false
            },
            short:{
                type: Boolean,
                default: false
            }
        },
        created(){

        },
        data() {
            return {

            }
        },
        computed:{

        },
        methods:{
            emitClick(){
                this.$emit('click')
            }
        },
        components:{ loading }
    }
</script>

<style lang='scss'>
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-button-loading{
        position: relative;
        margin-top: 50px;
    }
    .component-button-loading__button{
        margin-top: 0px;
    }
    .component-button-loading__loading{
        top:50%;
        left:50%;
        transform:translate3d(-50%, -50%, 0);
    }
    .component-button-loading__text{
        &.hide{
            opacity: 0;
        }
    }

</style>


