<template>
    <div id='transaction'>
        <transition name='router' mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" class='sub-router'></router-view>
            </keep-alive>
        </transition>
        <transition name='router' mode="out-in">
            <router-view v-if="!$route.meta.keepAlive" class='sub-router'></router-view>
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
