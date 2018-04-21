<template>
    <div class="component-area-select">
        <div class="component-area-select__value"
            @click.stop='toggleAreaContent'
            :class='{ down : show_areaContent }'>
                {{ value[name] || '请选择' }}
                <i class="component-area-select__arrow iconfont icon-arrow"></i>
        </div>
        <transition name='down'>
            <div class="component-area-select__area-content" v-show='show_areaContent' @click.stop='loop'>
                <span class="component-area-select__all"
                    :class='{active:!letterCitys.letter}'
                    @click='setLetterCitys({})'>所有城市</span>
                <loading v-if='!area.length' :size='20'></loading>
                <template v-if='area.length'>
                    <div class="component-area-select__letters">
                        <span class="component-area-select__letter-item"
                            v-for='item in area'
                            @click='setLetterCitys(item)'
                            :class='{active:letterCitys.letter == item.letter}'> {{ item.letter }} </span>
                    </div>
                    <div class="component-area-select__letter-groups-box"
                        v-if='!letterCitys.letter'>
                        <div class='component-area-select__letter-groups' v-for='item in area'>
                            <p class='component-area-select__group-letter'>{{item.letter}}</p>
                            <ul class='component-area-select__group-list'>
                                <li
                                    class='component-area-select__group-item'
                                    :class='{"disabled":transformStatus(city.status)}'
                                    v-for='city in item.info'
                                    @click.stop='changeValue(city)'>
                                    <span>{{ city[name] }}</span>
                                    <span v-if='transformStatus(city.status)'> ({{city.statusDesc}}) </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="component-area__letter-citys"
                        v-if='letterCitys.letter'>
                        <p class='component-area-select__group-letter'>{{letterCitys.letter}}</p>
                        <ul class='component-area-select__group-list'>
                            <li
                                class='component-area-select__group-item'
                                :class='{"disabled":transformStatus(city.status)}'
                                v-for='city in letterCitys.info'
                                @click.stop='changeValue(city)'>
                                <span>{{ city[name] }}</span>
                                <span v-if='transformStatus(city.status)'> ({{city.statusDesc}}) </span>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>

    import  { mapGetters, mapActions }  from 'vuex'
    import loading from '../components/Loading.vue'

    export default {
        components:{
            loading
        },
        props:{
            value:[String,Number,Object],
            area:[Array],
            name:{
                type:String,
                default:'name'
            }
        },
        data() {
            return {
                show_areaContent:false,
                letterCitys:{}
            }
        },
        computed:{
            ...mapGetters([
                'localInfo'
            ]),
            documentClickBoolean(){
                return this.localInfo.documentClick
            },
        },
        methods:{
            ...mapActions([
                'setDocumentClick',
            ]),
            loop(){},
            transformStatus(status){
                return status && status!="OK"
            },
            changeValue(area){
                let status = area.status
                if(this.transformStatus(status)) return

                this.show_areaContent = false
                this.$emit('input', area);
                this.$emit('selected', area);
            },
            toggleAreaContent(){
                this.show_areaContent = !this.show_areaContent
                this.show_areaContent && this.setDocumentClick(false)
            },
            setLetterCitys(item){
                this.letterCitys = item
            }
        },
        watch: {
            'documentClickBoolean'(newVal,oldVal){
                if(newVal == true) {
                    this.show_areaContent = false
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-area-select{
        position: relative;
        width: 100%;
        z-index:9;
    }
    .component-area-select__value{
        width: 100%;
        box-sizing:border-box;
        transition:all ease 200ms;
        line-height:30px;
        padding:0 8px;
        color:$green;
        border:1px solid $green;
        position: relative;
        background-color: rgba($green,.1);
        &:hover{
            background-color: rgba($green,0);
        }
        &.down{
            background-color: rgba($green,0);
            border-bottom:1px solid $sectionColor;
        }
    }
    .component-area-select__area-content{
        width: 100%;
        max-height:360px;
        overflow:auto;
        box-sizing:border-box;
        border:1px solid $green;
        border-top:none;
        position: absolute;
        top:32px;
        left:0;
        cursor:pointer;
        background-color: #fff;
        font-size: 13px;
    }
    .component-area-select__arrow{
        position: absolute;
        right:0;
        top:50%;
        width: 13px;
        height:13px;
        font-size: 13px;
        color:$green;
        transform:translate(0,-50%) rotate(90deg);
    }
    .component-area-select__letter-groups{
        padding-bottom: 10px;
        &:last-child{
            padding-bottom:0;
        }
    }
    .component-area-select__group-letter{
        width: 44px;
        padding:5px 10px;
        text-align: left;
        font-size: 15px;
        font-weight: normal;
        color:$green;
    }
    .component-area-select__group-list{
        flex:1;
    }
    .component-area-select__letters{
        font-size: 13px;
        padding:5px 5px;
        border-bottom:1px solid $sectionColor;
        display:flex;
        flex-wrap: wrap;
    }
    .component-area-select__letter-item{
        cursor:pointer;
        display: block;
        width: 20px;
        text-align:center;
        padding:3px 0px;
        &.active{
            color:$green;
            font-weight: normal;
        }
        &:hover{
            color:$green;
        }
    }
    .component-area-select__all{
        display: block;
        padding:10px 10px 5px 10px;
        font-size: 13px;
        &:hover{
            color:$green;
        }
        &.active{
            color:$green;
            font-weight: bold;
        }
    }
    .component-area-select__group-item{
        padding:7px 10px;
        line-height:1.4;
        cursor:pointer;
        color:$importColor;
        &.disabled{
            color:$grayLight;
            &:hover{
                color:$grayLight;
            }
        }
        &:hover{
            color:#fff;
            background-color: darken($green,.1)
        }
    }
</style>