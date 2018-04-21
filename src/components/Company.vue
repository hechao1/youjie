<template>
    <div class="component-company">
        <div class="component-company__value"
            @click.stop='toggleCompanyContent'
            :class='{ down : show_companyContent }'>
                <img class='component-company__value-logo' :src="value.logo" v-show='value.logo'>
                <span class='component-company__info'>{{ value.info || '请选择' }}</span>
                <i class="component-company__arrow iconfont icon-arrow"></i>
        </div>
        <transition name='down'>
            <div class="component-company__company-content" v-show='show_companyContent'>

                <loading :size='20' v-if='!company.length'></loading>
                <template v-show='company.length'>
                    <ul class="component-company__list" v-for='item in companyListChunk'>
                        <li class="component-company__item" v-for='subItem in item' @click='changeValue(subItem)'>
                            <span class="component-company__logo"><img :src="subItem.logo" alt=""></span>
                            <span class="component-company__text"> {{subItem.info}} </span>
                        </li>
                    </ul>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>

    import  { mapGetters, mapActions }  from 'vuex'
    import loading from '../components/Loading.vue'

    export default {
        components:{ loading },
        props:{
            value:[Object],
            company:[Array]
        },
        data() {
            return {
                show_companyContent:false
            }
        },
        computed:{
            ...mapGetters([
                'localInfo'
            ]),
            companyListChunk(){
                return _.chunk(this.company,6)
            },
            documentClickBoolean(){
                return this.localInfo.documentClick
            }
        },
        methods:{
            ...mapActions([
                'setDocumentClick',
            ]),
            changeValue(currentCompany){
                this.$emit('input', currentCompany);
            },
            toggleCompanyContent(){
                this.show_companyContent = !this.show_companyContent
                this.show_companyContent && this.setDocumentClick(false)
            }
        },
        watch: {
            'documentClickBoolean'(newVal,oldVal){
                if(newVal == true) {
                    this.show_companyContent = false
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-company{
        position: relative;
        width: 100%;
        z-index:9;
    }
    .component-company__value{
        display:flex;
        align-items:center;
        width: 100%;
        box-sizing:border-box;
        transition:all ease 200ms;
        line-height:30px;
        padding:0 8px;
        color:$green;
        border:1px solid $green;
        position: relative;
        background-color: rgba($green,.1);
        z-index:2;
        &:hover{
            background-color: rgba($green,0);
        }
        &.down{
            background-color: rgba($green,0);
            border-bottom:1px solid $sectionColor;
        }
        .component-company__value-logo{
            width: 24px;
            height:24px;
            margin-right:4px;
        }
    }
    .component-company__arrow{
        position: absolute;
        right:0;
        top:50%;
        width: 13px;
        height:13px;
        font-size: 13px;
        color:$green;
        transform:translate(0,-50%) rotate(90deg);
    }
    .component-company__company-content{
        min-width: 100%;
        box-sizing:border-box;
        border:1px solid $green;
        position: absolute;
        top:31px;
        left:50%;
        transform:translate(-50%,0);
        background-color: #FFF;
        padding:10px;
        &:hover{
            .component-company__item{
                filter: grayscale(100%);
                opacity:0.3;
            }
        }
        .component-company__list{
            display:flex;
        }
        .component-company__item{
            width: 100px;
            padding: 10px;
            box-sizing:border-box;
            text-align:center;
            border:1px solid transparent;
            cursor:pointer;
            &:hover{
                filter: grayscale(0%);
                border:1px solid $green;
                background-color: rgba($green,.1);
                opacity:1;
            }
        }
        .component-company__text{
            display: block;
            text-align:center;
            font-size: 14px;
            padding:4px 0;
        }
        .component-company__logo{
            display: block;
            text-align:center;
            img{
                width: 40px;
                height:40px;
            }
        }
    }
</style>