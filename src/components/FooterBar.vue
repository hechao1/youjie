<template>
    <footer class="component-footer-bar">
        <p>由浙江安牛科技有限公司提供平台技术支持
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a>使用帮助</a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a>联系客服</a></p>
        <p>&copy;2016 KongAPI.com 浙ICP备11037377号-1</p>
    </footer>
</template>

<script>
    export default {
        props: {

        },
        data(){
            return {

            }
        },
        computed:{

        },
        methods:{

        }
    }
</script>

<style lang="scss">
    @import "../sass/_variables";
    @import "../sass/_extends";
    @import "../sass/_mixins";

    .component-footer-bar{
        font-size: 12px;
        line-height:20px;
        width: 100%;
        color:$dark;
        text-align:center;
        box-sizing:border-box;
        a{
            color:#fff;
        }
    }

</style>
