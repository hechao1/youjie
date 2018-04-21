<template>
  <div id='user-index'>
      <div>
        <div class='main-body'>
            <div class='left-body'>
                <p>
                    小C手机号
                </p>
            </div>
            <div class='inside-body'>
                <input type="text" class='input-body' placeholder="请输入小c手机号" v-model="passwordMima">
            </div>
            <div class='right-body' @click="logoutfindUser()">
                <span>搜索</span>
            </div>
        </div>
        <div class='main-body1' v-if='!resetw' style='text-align:center;'>
            <p>没有搜索到该用户</p>
        </div>
        <div class='main-body1' v-else>
            <pre>手机号：{{resetw.mobile}}          姓名：{{resetw.realName}}       <b style='color:#13ce66;cursor:pointer;' @click='zhuxiao'>注销用户</b>  <input v-if='isetrue' type="password"  placeholder="请输入密码,正确并进人" class='input-two' v-model="leaveI"> <span class='input-enter' v-if='isetrue' @click='entery'>enter</span></pre>
        </div>
      </div>
    <modal
     :mask-close="false"
      :show='safferiy'
      title='注销该用户'
      @close='safferiy = false'
      @confirm='logoutlogoutUser'
      >
        <div style='text-align:center;font-size:17px;margin-bottom:5px;'>确定注销该用户？</div>
        <div style='text-align:center;font-size:17px;margin-top:5px;'>每天最多注销10人</div>
      </modal>
  </div>
</template>

<script>
  import {Promise} from 'es6-promise'
  import footerBar from '../components/FooterBar.vue'
  import selectGroup from '../components/SelectGroup.vue'
  import selectOption from '../components/SelectOption.vue'
  import radioGroup from '../components/RadioGroup.vue'
  import datePicker from '../components/DatePicker.vue'
  import areaSelect from '../components/AreaSelect.vue'
  import radio from '../components/Radio.vue'
  import loading from '../components/Loading.vue'
  import tabBox from '../components/TabBox.vue'
  import tab from '../components/Tab.vue'
  import checkBox from '../components/CheckBox.vue'
  import checkBoxGroup from '../components/CheckBoxGroup.vue'
  import toolTip from '../components/ToolTip.vue'
  import modal from '../components/Modal.vue'
  import confirm from '../components/Confirm.vue'
  import buttonLoading from '../components/ButtonLoading.vue'
  import pagination from '../components/Pagination.vue'
  import dateFormat from '../filters/filter-dateFormat'
  import toYuan from '../filters/filter-toYuan'
  import  {mapGetters, mapActions}  from 'vuex'
  import {addLenderValidation, resetAccountPasswordValidation, operatorEditValidation} from '../validation/validation'
  import {allApi, lenderApi} from '../api/api'
  import moment from 'moment'


  export default {
    components: {
      footerBar,
      selectGroup,
      selectOption,
      radioGroup,
      tabBox,
      tab,
      radio,
      checkBox,
      checkBoxGroup,
      areaSelect,
      loading,
      toolTip,
      modal,
      confirm,
      buttonLoading,
      pagination,
      datePicker
    },
    filters: {
      dateFormat,
      toYuan,
      booleanToStr(boolean){
        if (boolean === true) {
          return '是'
        }
        else {
          return '否'
        }
      }
    },
    data() {
      return {
          safferiy:false,
          isTrue:false,
          passwordMima:'',
          resetw:'',
          isetrue:false,
          leaveI:''
      }
    },
    computed: {
      ...mapGetters([
        'msgTip',
        'localInfo'
      ]),
      local(){
          return this.msgTip.password
      }
    
    },
    methods: {
      // actions
      ...mapActions([
        'showLoading',
        'hideLoading',
        'setMsgTip'
      ]),
    
    //   logout/LoginPassword
    logoutlogoutUser(){
        allApi.logoutlogoutUser({
            mobile:this.local,
            userId:this.resetw.userId
        })
        .then(res=>{
            // alert(111)
            this.$nextTick(()=>{
                this.logoutfindUser()
            })
            this.safferiy=false
        })
        .catch(error=>{
            this.safferiy=false
            
        })
    },
    logoutfindUser(){
        let params={
            mobile:this.passwordMima
        }
        allApi.logoutfindUser(params)
        .then(res=>{
            console.log(res)
            this.resetw=res
        })
        .catch(error=>{
            console.log(error)
        })
    },
    zhuxiao(){
        // alert(111)
        this.isetrue=true
    },
    entery(){
          let params={
           pwd:this.leaveI,
           mobile:this.passwordMima
        }
        allApi.logoutLoginPassword(params)
        .then(res=>{
            console.log(res)
           this.safferiy=true
        })
        .catch(error=>{
            console.log(error)
        })
    },


    },
    created(){
 
    }
  }
</script>

<style lang="scss">
  @import "../sass/variables";
  @import "../sass/extends";
  @import "../sass/mixins";

  #user-index {
      margin: 50px 0;
      .main-body{
          padding-bottom: 10px;
          border: 1px solid #ddd;
          border-left-color: transparent;
          border-right-color: transparent;
          position: relative;
          .left-body{
              display: inline-block;
              width:80px;
              height: 30px;
              position: relative;
              p{
                  position: absolute;
                  top: 17px;
                  font-size: 15px;
                  color:black;
              }
            //   line-height: 30px;
          }
          .inside-body{
              display: inline-block;
              border:1px solid #ddd;
              .input-body{
                  width: 200px;
                  height: 30px;
                  border-radius: 5px;
                  padding-left: 5px;
                  font-size: 15px;
              }
          }
          .right-body{
              display: inline-block;
              position: absolute;
              width: 150px;
              height: 30px;
              top: 11px;
              right: 1px;
              background: darkcyan;
              line-height: 30px;
              text-align: center;
              color: #fff;
              border-radius: 3px;
              cursor: pointer;
          }
      }
      .main-body1{
          margin: 20px 0 0 0;
          border: 1px solid #ddd;
          padding: 20px 0;
          border: 1px solid #ddd;
          border-left-color: transparent;
          border-right-color: transparent;
      }
      .input-two{
          width: 200px;
          height: 30px;
          border-radius: 1px;
          padding-left: 5px;
          font-size: 15px;
          border:1px solid #ddd;
      }
      .input-enter{
          display: inline-block;
            //   position: absolute;
              width: 60px;
              height: 30px;
              top: 11px;
              right: 1px;
              background: darkcyan;
              line-height: 30px;
              margin: 0 10px 0 0;
              text-align: center;
              color: #fff;
              border-radius: 1px;
              cursor: pointer;
      }
  }
</style>
