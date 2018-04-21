<template>
    <div id='rechange'>
        <transition name='router' mode="out-in">
            <router-view class='sub-router'></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        components:{

        },
        data() {
            return {

            }
        },
        computed:{

        },
        methods:{

        },
        created(){

        },
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";
</style>
