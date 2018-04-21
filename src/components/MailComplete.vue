<template>
    <div class="component-mail-complete">
        <input
            :value='value.name'
            placeholder="请输入邮箱账号"
            class="component-mail-complete__value"
            @input='inputMail($event)'
            @blur='hideMails'
            @keyup.down='mailIndexDown'
            @keyup.up='mailIndexUp'
            @keyup.enter='mailSelect'>
        <transition name='down'>
            <ul class="component-mail-complete__list" v-show='show_mails'>
                <li
                    class='component-mail-complete__item'
                    v-for='(item ,index) in matchMail'
                    :class='{ active : mailIndex == index}'
                    @click='changeValue(item)'>
                    <span class='value'> {{ value.name }}{{key}} </span>
                    <span class='suffix'> @{{ item.name }} </span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>

    import  { mapGetters, mapActions }  from 'vuex'

    export default {
        props:{
            value:[Object],
            area:[Array]
        },
        data() {
            return {
                mailIndex:-1,
                curMail:{},
                show_mails:false,
                mails:[{
                    name:'qq.com',
                    value:'QQ'
                },{
                    name:'vip.qq.com',
                    value:'QQ'
                },{
                    name:'foxmail.com',
                    value:'FOXMAIL'
                },{
                    name:'126.com',
                    value:'MAIL126'
                },{
                    name:'VIP.126.com',
                    value:'MAIL126'
                },{
                    name:'163.com',
                    value:'MAIL163'
                },{
                    name:'VIP.163.com',
                    value:'MAIL163'
                },{
                    name:'aliyun.com',
                    value:'ALIYUN'
                },{
                    name:'gmail.com',
                    value:'GMAIL'
                },{
                    name:'sina.cn',
                    value:'SINA'
                },{
                    name:'sina.com',
                    value:'SINA'
                },{
                    name:'sina.com.cn',
                    value:'SINA'
                },{
                    name:'2008.sina.com',
                    value:'SINA'
                },{
                    name:'VIP.sina.com',
                    value:'SINA'
                },{
                    name:'tom.com',
                    value:'TOM'
                },{
                    name:'hotmail.com',
                    value:'HOTMAIL'
                },{
                    name:'hotmail.com.hk',
                    value:'HOTMAIL'
                },{
                    name:'outlook.com',
                    value:'OUTLOOK'
                },{
                    name:'live.com',
                    value:'LIVE'
                },{
                    name:'live.cn',
                    value:'LIVE'
                },{
                    name:'139.com',
                    value:'MAIL139'
                },{
                    name:'yeah.net',
                    value:'YEAH'
                },{
                    name:'21cn.com',
                    value:'MAIL21CN'
                },{
                    name:'wo.com.cn',
                    value:'WO'
                },{
                    name:'sohu.com',
                    value:'SOHU'
                },{
                    name:'vip.sohu.com',
                    value:'SOHU'
                },{
                    name:'189.cn',
                    value:'MAIL189'
                }]
            }
        },
        computed:{
            ...mapGetters([
                'localInfo'
            ]),
            matchMail(){
                let name = this.value.name

                let prefix = name.replace(/@.*/, "")
                let suffix = name.replace(/.*@/, "")
                let matchArr = []
                _.each(this.mails,(value, index)=>{
                    if(value.name.indexOf(suffix) > -1) {
                        matchArr.push(value);
                    }
                });
                if(matchArr.length) return matchArr
                else return this.mails
            }
        },
        methods:{
            ...mapActions([
                'setDocumentClick',
            ]),
            loop(){},
            hideMails(){
                this.show_mails = false
            },
            inputMail($event){
                let name = $event.target.value
                let value
                if(!name){ this.show_mails = false }
                else{ this.show_mails = true }

                if(this.matchMail.length){
                    value = this.matchMail[0].value
                }
                this.$emit('input', {
                    name:name,
                    value:value
                });

            },
            mailIndexDown(){
                if(this.show_mails){
                    if(this.mailIndex >= this.matchMail.length - 1) return
                    this.mailIndex ++
                }
            },
            mailIndexUp(){
                if(this.show_mails){
                    if(this.mailIndex == 0) return
                    this.mailIndex --
                }
            },
            mailSelect(){
                this.changeValue()
            },
            changeValue(item){
                if(!item){
                    if(this.matchMail.length){
                        item = this.matchMail[this.mailIndex]
                    }
                }
                this.show_mails = false
                this.mailIndex = -1
                let prefix = this.value.name.replace(/@.*/, "")
                let suffix = item.name.replace(/.*@/, "")
                this.$emit('input', {
                    name:`${prefix}@${suffix}`,
                    value:item.value
                });
            },
            toggleAreaContent(){
                this.show_areaContent = !this.show_areaContent
                this.show_areaContent && this.setDocumentClick(false)
            }
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .component-mail-complete{
        position: relative;
        width: 255px;
        z-index:9;
    }
    .component-mail-complete__value{
        width: 100%;
        box-sizing:border-box;
    }
    .component-mail-complete__list{
        width: 100%;
        overflow:auto;
        box-sizing:border-box;
        background-color: #FFF;
        border:1px solid $green;
        border-top:none;
        position: absolute;
        top:45px;
        max-height:360px;
        left:0;
    }
    .component-mail-complete__item{
        cursor:pointer;
        line-height:1.4;
        padding: 7px 10px;
        &:hover,&.active{
            color:#fff;
            background-color: darken($green,.1);
            .suffix{
                color:#fff;
            }
        }
        .value{
            font-weight:bold;
        }
        .suffix{
            color:$green;
        }
    }
</style>