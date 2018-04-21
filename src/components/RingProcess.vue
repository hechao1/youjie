<template>
    <transition name='fade'>
    <div class='component-ring-process'>
        <div class="component-ring-process__box">
                <div class="component-ring-process__circle"></div>
                <div class="component-ring-process__left-bar" :style="leftBarStyle"></div>
                <div class="component-ring-process__right-bar" :style="rightBarStyle"></div>
                <div class="component-ring-process__mask" :style="maskStyle">
                    <div class="component-ring-process__mask-inner"></div>
                </div>
        </div>
    </div>
    </transition>
</template>

<script>

    export default {
        props:{
            circleColor:{
                type: String,
                default:''
            },
            circleInnerColor:{
                type: String,
                default:''
            },
            title:{
                type: String,
                default:''
            },
            duration: {
                type: Number,
                default:250
            },
            persent:{
                type: Number,
                default: 0
            }
        },
        created(){
            this.$nextTick(()=>{
                this.leftBarStyle = {
                    transform:`rotate(${this.persent * 3.6}deg)`,
                    transition:`${this.duration}ms transform linear`
                }
                if(this.persent > 50){
                    this.rightBarStyle = {
                        opacity:1,
                        animation: `processToggle ${this.duration * 50 / this.persent}ms step-end`
                    }
                    this.maskStyle = {
                        opacity:0,
                        animation: `processToggle ${this.duration * 50 / this.persent}ms step-start`
                    }
                }
            })
            // this.simulateProcess()
        },
        data() {
            return {
                leftBarStyle:'',
                rightBarStyle:'',
                maskStyle:''
            }
        },
        methods:{

        },
        components:{  }
    }
</script>

<style lang='scss'>
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-ring-process__box{
        width: 300px;
        height:300px;
        position: relative;
        background-color: #FFF;
    }
    .component-ring-process__circle{
        width: 300px;
        height:300px;
        border: 50px solid rgb(240, 240, 240);
        border-radius: 50%;
        box-sizing: border-box;
        position: absolute;
        top:0;
        left:0;
    }
    .component-ring-process__left-bar{
        width: 300px;
        height: 300px;
        border: 50px solid red;
        border-radius: 50%;
        clip: rect(0 150px 300px 0);
        box-sizing: border-box;
        transform: rotate(0deg);
        position: absolute;
        top:0;
        left:0;
    }
    .component-ring-process__right-bar{
        width: 300px;
        height: 300px;
        border: 50px solid red;
        opacity:0;
        border-radius: 50%;
        clip: rect(0 150px 300px 0);
        box-sizing: border-box;
        transform: rotate(180deg);
        position: absolute;
        top:0;
        left:0;
    }
    .component-ring-process__mask{
        width: 150px;
        height: 300px;
        background-color: #fff;
        position: absolute;
        top:0;
        left:0;
    }
    .component-ring-process__mask-inner{
        width: 300px;
        height: 300px;
        border: 50px solid rgb(240, 240, 240);
        clip: rect(0 150px 300px 0);
        border-radius: 50%;
        box-sizing: border-box;
        transform: rotate(0deg);
        position: absolute;
        top:0;
        left:0;
    }
    @keyframes processToggle {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

</style>


