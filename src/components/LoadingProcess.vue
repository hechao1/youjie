<template>

    <div :class="{
            'component-loading-process--fullscreen':mode == 'fullscreen',
            'component-loading-process--absolute':mode == 'absolute',
            'component-loading-process':mode == 'normal',
        }"
        transition="fade">
        <div class="component-loading-process__box">
            <h1 class="component-loading-process__title">{{ title }}</h1>
            <div class="component-loading-process__content">
                <span class="component-loading-process__percent">{{ persent }}%</span>
                <svg class="component-loading-process__circle" :width="size" :height="size">
                    <circle
                        :cx="size/2"
                        :cy="size/2"
                        :r="size/2 - 2*strokeWidth"
                        :stroke-width="strokeWidth"
                        :stroke="strokeColorDefault"
                        fill="none">
                    </circle>

                    <circle
                        :cx="size/2"
                        :cy="size/2"
                        :r="size/2 - 2*strokeWidth"
                        :stroke-width="strokeWidth"
                        :stroke="strokeColorProcess"
                        :stroke-dasharray='dasharray'
                        fill="none">
                    </circle>
                </svg>
        </div>
        </div>
    </div>

</template>

<script>
    import { getQueryString, convertParams, convertRequestURL, localInfo } from '../utils/utils'
    import client from '../utils/client'
    import loading from '../components/Loading.vue'

    export default {
        props:{
            title:{
                type: String,
                default:''
            },
            mode: {
                type: String,
                default:'normal'
            },
            strokeWidth:{
                type: Number,
                default: 3
            },
            strokeColorDefault:{
                type: String,
                default: '#D1D3D7'
            },
            strokeColorProcess:{
                type: String,
                default: '#7d4a31'
            },
            size:{
                type: Number,
                default: 60
            },
            loaded:{
                type: Boolean,
                required: true,
                default: false,
                twoWay: true,
            }
        },
        created(){
            this.simulateProcess()
        },
        data() {
            return {
                persent:0,
                circumference:(this.size/2 - 2*this.strokeWidth)*2*Math.PI
            }
        },
        computed:{
            dashPersent(){
                return this.persent/100 * this.circumference
            },
            dasharray(){
                return `${this.dashPersent} ${this.circumference}`
            }
        },
        methods:{
            simulateProcess(){
                if(this.persent < 25){
                    let randomTime = 200*Math.random()
                    this.setPersent(randomTime)
                    return
                }
                else if(this.persent < 65){
                    let randomTime = 600*Math.random()
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
                    if(this.loaded){
                        this.persent = 100
                        return
                    }
                    this.persent++
                    this.simulateProcess()
                },time)
            }
        },
        components:{ loading }
    }
</script>

<style lang='scss'>
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-loading-process--fullscreen{
        @extend %font-display1;
        background:rgba(187, 187, 187, 0.37);
        position:absolute;
        z-index:$zIndex_loading;
        top:0;
        left:0;
        bottom:0;
        width:100%;
        height:auto;
        transform:translate3d(0,0,0);
        color:$importColor;
        text-align:center;
        .component-loading-process__box{
            position: absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            background-color: rgba(255, 255, 255, 0.8);
            border-radius:5px;
            padding:10px;
        }
    }
    .component-loading-process{
        @extend %font-display1;
        color:$importColor;
        position: relative;
        text-align:center;
    }
    .component-loading-process__title{
        font-size:13px;
        padding:10px 10px 5px 10px
    }
    .component-loading-process__content{
        position: relative;
    }
    .component-loading-process__percent{
        font-size:15px;
        position: absolute;
        top:50%;
        left:50%;
        transform:translate3d(-50%,-50%,0);
    }
    .component-loading-process__circle{
        transform:rotate(-90deg);
        transform-origin: center;
        circle{
            transition: stroke-dasharray .25s;
        }
    }

</style>


