<template>

    <div class="component-tab-box">
        <div class="component-tab-navs" v-if='showNav'>
            <ul>
                <li class="component-tab-navs__item"
                    v-for="item,index in navInfo"
                    :style='{"min-width":minWidth}'
                    :class="{ 'active': index === activeData }"
                    @click.prevent="tabSwitch(index)">
                    <span class="component-tab-navs__name">{{item.name}}</span>
                    <span class="component-tab-navs__info" v-if='item.info'>{{item.info}}</span>
                </li>
            </ul>
        </div>
        <div class="component-tab-content">
            <slot></slot>
        </div>
    </div>

</template>

<script>

    export default {
        props:{
            active: {
                type: Number,
                default: 0
            },
            showNavAlways:{
                type: Boolean,
                default: true
            },
            minWidth:{
                type: String,
                default: ''
            }
        },
        data() {
            return {
                activeData:this.active,
                navInfo:[]
            }
        },
        computed:{
            showNav(){
                if(this.showNavAlways) return true
                return this.navInfo.length > 1
            }
        },
        methods:{
            tabSwitch(index){
                this.activeData = index
                this.$emit('tab-click', index);
            }
        }
    }
</script>

<style lang='scss'>
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";
    .component-tab-navs{
        display: flex;
        justify-content: center;
        padding: 15px 0;
        ul{
            display: flex;
            border:1px solid $green;
            border-radius:3px;
            overflow:hidden;
        }
    }

    .component-tab-navs__item{
        cursor:pointer;
        text-align: center;
        color:$green;
        border-right:1px solid $green;
        transition:all ease .2s;
        &:last-child{
            border-right:none;
        }
        &.active{
            background-color: $green;
            color:#fff;
        }
    }
    .component-tab-navs__name{
        display: block;
        padding:8px 15px;
    }
    .component-tab-navs__info{
        display: block;
        padding-top:5px;
    }

</style>


