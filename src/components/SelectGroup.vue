<template>
    <div class="component-select-group" :style='zIndexStyle'>
        <div class="component-select-group__value" @click.stop='toggleOptions' :class='{ down : show_options }'>
            
            <div v-if='multiple && !value.length' class="component-select-group__value-placeholder"> {{ placeholder }} </div>
            <div class="component-select-group__value-box" :style='styleBoxWidth' ref='box'>
                <div 
                    v-if='multiple && value.length' 
                    class="component-select-group__value-multiple" 
                    v-for='(item,index) in value'> {{ item.text }} <i @click.stop='removeValue(index)' class='iconfont icon-close-hollow'></i> </div>
                <div v-if='!multiple' class="component-select-group__value-single">{{ value.text }} </div>
            </div>
         </div>
        <transition name='down'>
            <div class="component-select-group__options" v-show='show_options' :style='styleOptions'><slot></slot></div>
        </transition>
        <i class="component-select-group__arrow iconfont icon-arrow"></i>
    </div>
</template>

<script>

    import  { mapGetters, mapActions }  from 'vuex'

    export default {
        props:{
            value:[Array,Object],
            text:[String,Number],
            placeholder:String,
            multiple:{
                type: Boolean,
                default:false
            },
            maxHeight:{
                type: Number,
                default:0
            },
        },
        data() {
            return {
                show_options:false,
                values:this.value,
                selectText:'',
                topPos:'',
                zIndex:1
            }
        },
        computed:{
            ...mapGetters([
                'localInfo'
            ]),
            styleBoxWidth(){
                if(!this.values.length){
                    return {
                        width: `auto`
                    }
                }
                return {
                   // width: `${this.values.length * 100}px`
                }
            },
            styleOptions(){
                let object = {}
                if(this.maxHeight){
                    object.maxHeight = `${this.maxHeight}px`
                }
                if(this.topPos){
                    object.top = `${this.topPos}px`
                }
                return object
            },
            documentClickBoolean(){
                return this.localInfo.documentClick
            },
            selectZIndex(){
                return this.localInfo.selectZIndex
            },
            zIndexStyle(){
                return {zIndex:this.zIndex}
            }
        },
        methods:{
            ...mapActions([
                'setDocumentClick',
                'setSelectZIndex'
            ]),
            changeValue(value,text){
                this.show_options = false
                this.$emit('input', {
                    value,
                    text
                });
            },
            selectValue(value,text){
                let isSelect = false
                console.log(value)
                _.each(this.values,(item,index)=>{
                    if(value == item.value){
                        this.values.splice(index,1)
                        isSelect = true
                        return false
                    }
                })
                if(!isSelect){
                    this.values.push({
                        value,
                        text
                    })
                }
                this.$emit('input', this.values);
                this.setTopPos()
            },
            removeValue(index){
                this.values.splice(index,1)
                this.setTopPos()
            },
            setTopPos(){
                this.$nextTick(()=>{
                    let height = $(this.$refs.box).height()
                    if(height == 0){
                        this.topPos = 31
                        return
                    }
                    this.topPos = height + 1
                })
            },
            toggleOptions(){
                this.show_options = !this.show_options
                if(this.show_options){
                    if(this.selectZIndex == 100){
                        this.zIndex = 1
                        this.setSelectZIndex(1)
                        this.setDocumentClick(false)
                        return
                    }
                    this.zIndex = this.selectZIndex+1
                    this.setSelectZIndex(this.selectZIndex+1)
                    this.setDocumentClick(false)
                }
                if(this.multiple && this.show_options){
                    this.setTopPos()
                }
            }
        },
        created() {
            this.$on('optionChange', this.changeValue)
            this.$on('optionSelect', this.selectValue)
        },
        watch: {
            'documentClickBoolean'(newVal,oldVal){
                if(newVal == true) {
                    this.show_options = false
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-select-group{
        position: relative;
        width: 100%;
        z-index:1;
    }
    .component-select-group__value{

    }
    .component-select-group__value-box{
        overflow:auto;
        padding-right: 10px;
    }
    .component-select-group__value-multiple{
        float:left;
        border:1px solid #000;
        margin:3px 6px 3px 0px;
        padding:5px 20px 5px 5px;
        line-height:1;
        border-radius:3px;
        border-color:$green;
        position: relative;
        .icon-close-hollow{
            cursor:pointer;
            position: absolute;
            font-size:14px;
            right:5px;
            top:50%;
            margin-top:-7px;
        }
    }
    .component-select-group__value{
        width: 100%;
        box-sizing:border-box;
        transition:all ease 200ms;
        line-height:30px;
        overflow:auto;
        padding:0 8px;
        color:$green;
        border:1px solid $green;
        background-color: rgba($green,.1);
        z-index:2;
        border-radius: 4px;
        &:hover{
            background-color: rgba($green,0);
        }
        &.down{
            background-color: rgba($green,0);
            border-bottom:1px solid $sectionColor;
            border-radius: 4px 4px 0 0;
        }
    }
    .component-select-group__options{
        width: 100%;
        overflow:auto;
        box-sizing:border-box;
        border:1px solid $green;
        border-radius:0 0 4px 4px;
        border-top:none;
        position: absolute;
        top:32px;
        left:0;
        background-color: #FFF;
    }
    .component-select-group__arrow{
        position: absolute;
        z-index:-1;
        right:10px;
        top:50%;
        width: 13px;
        height:13px;
        font-size: 13px;
        color:$green;
        transform:translate(0,-50%) rotate(90deg);
    }
</style>


