<template>
    <div id='login'>
        <div class='router-inner login-view'>

            <!-- wrapper begin -->
            <div class="wrapper">

                <header class="header">
                    <h1 class="header__title">信用自查应用管理平台</h1>
                    <!-- <h5 class="header__company">杭州联合银行</h5> -->
                </header>

                <div class="main">
                    <div class="login-form">
                        <ul class="login-form__input">
                            <li class="login-form__item">
                                <i class='iconfont icon-user'></i>
                                <input v-model='username' type="text" placeholder="用户名">
                            </li>
                            <li class="login-form__item">
                                <i class='iconfont icon-password'></i>
                                <input v-model='password' type="password" placeholder="密码" @keyup.enter="login">
                            </li>
                        </ul>
                        <div class="login-form__button" @click='login' :class='{"event-disabled":loggingIn}'>
                            <button-loading :loading='loggingIn'> 立即登录 </button-loading>
                        </div>
                    </div>
                </div>
            </div>
            <!-- wrapper end -->


            <footer-bar class='login-footer'></footer-bar>
        </div>
    </div>
</template>

<script> 
    import { Promise } from 'es6-promise'
    import  { mapGetters, mapActions }  from 'vuex'
    import md5 from '../utils/md5'
    import { loginApi } from '../api/api'
    import { loginValidation } from '../validation/validation'
    import footerBar from '../components/FooterBar.vue'
    import buttonLoading from '../components/ButtonLoading.vue'


    export default {
        components:{
            footerBar,
            buttonLoading
        },
        data() {
            return {
                username:'',
                password:'',
                loggingIn:false
            }
        },
        computed:{
            ...mapGetters([
                'loading',
                'msgTip',
                'localInfo'
            ])
        },
        methods:{
            // actions
            ...mapActions([
                'showLoading',
                'hideLoading',
                'setMsgTip',
                'setMsgTipStyle',
                'setUserId',
                'setSessionId',
                'setNeedLogin',
                'setAdmin'
            ]),
            getSession(){
                this.loading = true
                let password = this.password
                localStorage.setItem("site", this.username);
                loginApi.userLogin({
                    mobile:this.username,
                    loginPassword:password,
                })
                .then(result=>{
                    this.setSessionId(result.sessionId)
                    if(result.role == 'ADMIN'){
                        this.setAdmin(true)
                    }
                    else{
                        this.setAdmin(false)
                    }
                    this.loading = false
                    this.$router.push({
                        name:'daily-index'
                    })
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            },
            login(){
                if(!loginValidation({ username:this.username, password:this.password })) return
                this.getSession()
            }
        },
        created(){
            // this.setMsgTipStyle({ top:'50px' })
            this.setNeedLogin(false)
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .login-view{
        background-size: cover;
        color:#fff;
        &:before{
            content:'';
            position: absolute;
            width: 100%;
            height:100%;
            top:0;
            left:0;
            background:url('../images/headbg_grey.jpg') no-repeat center center;
            background-size: cover;
            z-index:-2;
        }
        &:after{
            content:'';
            position: absolute;
            width: 100%;
            height:100%;
            top:0;
            left:0;
            background-color:rgba(#ff6e40,0.6);
            background-size: cover;
            z-index:-1;
        }
        .wrapper{
            width: 100%;
            height:100%;
            padding-bottom:10px;
            box-sizing:border-box;
        }
        .header{
            padding-top:139px;
            text-align:center;
        }
        .header__title{
            @extend %weight-light;
            font-size: 26px;
        }
        .header__company{
            @extend %weight-light;
            font-size: 14px;
            color:$dark;
            padding-top:10px;
        }
        .main{
            padding-top:67px;
        }
        .login-form{
            width: 260px;
            margin:0 auto;
        }
        .login-form__input{
            width: 100%;
            overflow:hidden;
            .iconfont{
                font-size:17px;
                color:$defaultColor;
                padding:0 12px;
            }
            input{
                flex:1;
                padding:16px 16px 16px 0;
                font-size: 15px;
            }
        }
        .login-form__item{
            display:flex;
            align-items:center;
            background-color: #FFF;
            margin-bottom:10px;
        }
        .login-form__button{
            .button{
                padding: 13px 20px;
                font-size: 15px;
            }
        }
        .login-footer{
            position: absolute;
            bottom:10px;
        }
    }
</style>
