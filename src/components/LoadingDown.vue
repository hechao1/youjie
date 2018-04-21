<template>
    <transition name='fade'>
        <div class='component-loading-down' v-show='showLoading'>
            <div class='component-loading-down__animation' :style='wrapStyle'>
                <div class="component-loading-down__inner" :style='innerStyle'></div>
                <div class="component-loading-down__outer" :style='[outerStyle, outerHeight]'></div>
            </div>
            <p class="component-loading-down__persent" :class='{finish:loaded}'> {{persent}}% </p>
            <p class="component-loading-down__title"> {{title}} </p>
        </div>
    </transition>
</template>

<script>
    import { getQueryString, convertParams, convertRequestURL, localInfo } from '../utils/utils'
    import client from '../utils/client'
    import loading from '../components/Loading.vue'
    import moment from 'moment'

    export default {
        components:{ loading },
        props:{
            title:{
                type: String,
                default:'正在查询...'
            },
            height:{
                type: String,
                default:'80',
            },
            width:{
                type: String,
                default:'80',
            },
            innerImage: {
                type: String,
                default:require('../images/group-light.png'),
            },
            outerImage:{
                type: String,
                default: require('../images/group.png'),
            },
            show:{
                type: Boolean,
                required: true,
                default: false
            },
            loaded:{
                type: Boolean,
                required: true,
                default: false
            }
        },
        data() {
            return {
                showLoading:false,
                wrapStyle:{
                    'width':`${this.width}px`,
                    'height':`${this.height}px`,
                },
                innerStyle:{
                    'background':`url(${this.innerImage}) no-repeat top center`,
                    'background-size':`${this.width}px,${this.height}px`,
                    'width':`${this.width}px`,
                    'height':`${this.height}px`,
                },
                outerStyle:{
                    'background':`url(${this.outerImage}) no-repeat top center`,
                    'background-size':`${this.width}px,${this.height}px`,
                    'width':`${this.width}px`
                },
                persent:0
            }
        },
        computed:{
            outerHeight(){
                return {
                    height:`${this.height * this.persent / 100}px`
                }
            }
        },
        methods:{
            simulateProcess(){
                if(this.persent < 25){
                    let randomTime = 500*Math.random()
                    this.setPersent(randomTime)
                    return
                }
                else if(this.persent < 65){
                    let randomTime = 1000*Math.random()
                    this.setPersent(randomTime)
                    return
                }
                else if(this.persent < 85){
                    let randomTime = 2000*Math.random()
                    this.setPersent(randomTime)
                    return
                }
                else if(this.persent < 99){
                    let randomTime = 5000
                    this.setPersent(randomTime)
                    return
                }
            },
            setPersent(time){
                setTimeout(()=>{
                    if(!this.showLoading) return
                    if(this.loaded){
                        this.persent = 100
                        return
                    }
                    this.persent++
                    this.simulateProcess()
                },time)
            }
        },
        watch: {
            'show'(newVal,oldVal){
                if(newVal != oldVal){
                    if(newVal == true) {
                        this.simulateProcess()
                        this.showLoading = true
                    }
                    else{
                        setTimeout(()=>{
                            this.showLoading = false
                        },400)
                        setTimeout(()=>{
                            this.persent = 0
                        },700)
                    }
                }
            }
        }
    }
</script>

<style lang='scss'>
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";


    .component-loading-down{
        text-align:center;
        margin-top:30px;
    }
    .component-loading-down__animation{
        position: relative;
        margin:0 auto;
    }
    .component-loading-down__inner, .component-loading-down__outer{
        transition:height ease 200ms;
        position: absolute;
        top:0;
        left:0;
    }
    .component-loading-down__persent{
        padding: 8px 0;
        font-size: 30px;
        color:$blue;
        position: relative;
    }
    .component-loading-down__title{
        font-size: 13px;
    }

</style>


