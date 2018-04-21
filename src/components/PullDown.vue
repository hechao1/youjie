<template>

    <div class="component-pull-down" id='pull-down-el'>
        <div class="component-pull-down__main"
            :style='transformObj'
            @touchstart='onTouchStart'
            @touchmove='onTouchMove'
            @touchend='onTouchEnd'>
            <div class="component-pull-down__loading">
                <svg :class='iconClass' width="64" height="64" viewBox="0 0 64 64">
                    <g class="transform-group">
                        <g transform="scale(0.0625, 0.0625)">
                        <path d="M813.459081 521.791187c-12.162965-12.162965-31.866968-12.162965-44.029932 0L542.346597 748.873738 542.346597 201.297066c0-17.14978-13.987409-31.13719-31.13719-31.13719-17.14978 0-31.13719 13.987409-31.13719 31.13719l0 547.576672L252.989666 521.791187c-12.162965-12.162965-31.866968-12.162965-44.029932 0-12.162965 12.162965-12.162965 31.866968 0 44.029932l280.234707 280.234707c2.919112 2.919112 6.324742 5.230075 10.095261 6.81126 3.770519 1.581185 7.784297 2.432593 11.919705 2.432593 4.013778 0 8.149186-0.851408 11.919705-2.432593 3.770519-1.581185 7.297779-3.892149 10.095261-6.81126l280.234707-280.234707C825.622045 553.658154 825.622045 533.954151 813.459081 521.791187L813.459081 521.791187zM813.459081 521.791187" fill="#272636"></path>
                        </g>
                    </g>
                </svg>
                <loading :size='18' color='#272636' v-if='status == "loading"'></loading>
            </div>
            <div class="component-pull-down__content">

            </div>
        </div>
    </div>

</template>

<script>
    import '../libs/swiper/swiper'
    import  { setMsgTip }  from '../vuex/actions'
    import { getQueryString, convertParams, convertRequestURL, localInfo, lazyLoad } from '../utils/utils'
    import client from '../utils/client'
    import loading from '../components/Loading.vue'

    export default {
        props:{

        },
        data() {
            return {
                loaded:false,
                touchEvent:null,
                pulling:false,
                triggerHeight:150,
                loading:false,
                startY:'',
                moveY:'',
                reset:true,
                status:'down',
            }
        },
        vuex: {
            getters: {
                cityId: ({ localInfo }) => localInfo.cityId,
                msgTip: state => state.msgTip
            },
            actions:{
                setMsgTip
            }
        },
        computed:{
            iconClass(){
                if(this.status == 'up'){
                    return 'rotate'
                }
                if(this.status == 'loading'){
                    return 'fade'
                }
                return ''
            },
            transformObj(){
                let translate = "translateY(" + 80 * Math.atan(this.moveY / 200) + "px)"
                let transition = this.pulling ? '0ms' : '300ms'
                return {
                    'transform': translate,
                    'transitionDuration':transition,
                }
            }
        },
        methods:{
            onTouchStart(e){
                console.log($('#pull-down-el').scrollTop())
                if(!this.cancle()){
                    let touchEvent = e.changedTouches ? e.changedTouches[0] : e
                    this.startY = touchEvent.pageY
                    console.log('onTouchStart')
                    this.pulling = true
                }
            },
            onTouchMove(e){
                if(!this.cancle()){
                    let touchEvent = e.changedTouches ? e.changedTouches[0] : e
                    if(touchEvent.pageY - this.startY > 0){
                        e.preventDefault()
                        this.moveY = touchEvent.pageY - this.startY

                        if(this.loading){
                            this.moveY = this.moveY + this.triggerHeight
                            return
                        }

                        this.moveY > this.triggerHeight ? this.status = 'up' : this.status = 'down'
                    }
                }
            },
            onTouchEnd(e){
                if(!this.cancle()){
                    if(this.loading){
                        this.pulling = false
                        this.moveY = this.triggerHeight
                        return
                    }
                    this.pulling = false
                    this.loading = true
                    if(this.moveY > this.triggerHeight){
                        this.status = 'loading'
                        this.moveY = this.triggerHeight
                        setTimeout(()=>{
                            // alert('onTouchEndif')
                            this.moveY = 0
                            this.loading = false
                            this.status = 'down'
                        },2000)
                    }
                    else{
                        console.log('onTouchEndelse')
                        this.moveY = 0
                        this.loading = false
                        this.status = 'down'
                    }
                }
            },
            cancle(){
                return $('#pull-down-el').scrollTop() > 0

            }
        },
        ready(){
            $('#pull-down-el').on('scroll',function(){
                console.log($('#pull-down-el').scrollTop())
            })
        },
        components:{ loading }
    }
</script>

<style lang='scss'>
    @import "../sass/_variables";
    @import "../sass/_extends";
    @import "../sass/_mixins";

    .component-pull-down{
        /*height: 200px;
        overflow: auto;*/
    }
    .component-pull-down__main{
        /*overflow:hidden;*/
    }
    .component-pull-down__loading{
        height:50px;
        text-align:center;
        margin-top:-50px;
        position: relative;
        svg{
            position: absolute;
            top:50%;
            left:50%;
            margin:-14px 0 0 -14px;
            width:28px;
            height:28px;
            transition:transform ease .2s;
            &.rotate{
                transform:rotate(180deg);
            }
            &.fade{
                opacity:0;
            }
        }
    }
    .component-pull-down__content{
        background-color: red;
        height:500px;
    }

</style>


