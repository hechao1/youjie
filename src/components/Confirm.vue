<template>
    <modal
        class='component-confirm'
        :show='show'
        :title='title'
        :tip='tip'
        :closeButton='false'
        :loading='loading'
        @close='emitClose'
        @confirm='emitConfirm'>
        <slot></slot>
    </modal>
</template>

<script>
    import modal from './Modal.vue'
    import buttonLoading from './ButtonLoading.vue'

    export default {
        props:{
            loading:{
                type: Boolean,
                default: false
            },
            tip:{
                type: String,
                default:''
            },
            title:{
                type: String,
                default:''
            },
            show:{
                type: Boolean,
                required: true,
            }
        },
        data() {
            return {

            }
        },
        methods:{
            emitClose(){
                this.$emit('close')
            },
            emitConfirm(){
                this.$emit('confirm')
            }
        },
        components:{ modal, buttonLoading }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-confirm{
        .component-modal__header{
            border-bottom:none;
            padding:24px 24px 20px 24px;
        }
        .component-modal__tip{
            padding: 0px 24px 24px 24px;
        }
        .component-modal__container{
            padding:0;
        }
        .component-button-loading{
            margin-top:0;
            width: 2em;
        }
        .component-confirm__buttons{
            display:flex;
            justify-content:flex-end;
            text-align:center;
            padding-top: 117px;
            padding:8px;
            .component-confirm__button{
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
    }
</style>


