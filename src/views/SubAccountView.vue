<template>
    <div id='sub-account'>
        <!-- fapiao-view begin -->
        <div class='router-inner sub-account-view'>

            <div class="sub-account-info">
                <h1 class="card-title">
                    <span>员工账号管理</span>
                    <p class='sub-account-add' @click='show_addAccountModal=true'>添加员工账号</p>
                </h1>
                <div class="sub-account-table">
                    <loading v-if='loading' mode='fullscreen'></loading>
                    <transition name='fade'>
                        <div class="table-list" v-if='records.length'>
                            <table>
                                <thead class="table-list__head">
                                    <tr>
                                        <th>真实姓名</th>
                                        <th>用户名</th>
                                        <th>职位</th>
                                        <th>联系电话</th>
                                        <th>状态</th>
                                        <th>创建时间</th>
                                        <th>最后登录时间</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody class='table-list__body have-border'>
                                    <tr v-for='item in records'>
                                        <td>{{ item.name || placeholder }}</td>
                                        <td>{{ item.username || placeholder }}</td>
                                        <td>{{ item.info || placeholder }}</td>
                                        <td>{{ item.phone || placeholder }}</td>
                                        <td>{{ statusToText(item.status) }}</td>
                                        <td>{{ timestampToDate(item.createdAt) }}</td>
                                        <td>{{ timestampToDate(item.lastLoginAt) }}</td>
                                        <td>
                                            <div class='option-box'>
                                                <span
                                                    class='option-button'
                                                    v-if='item.status == 1'
                                                    @click='disabledAccount(item)'>冻结</span>
                                                <span
                                                    class='option-button'
                                                    v-if='item.status == 2'
                                                    @click='solutionDisabledAccount(item)'>解冻</span>
                                                <span class='option-button' @click='editInfo(item)'>编辑</span>
                                                <span class='option-button' @click='resetPassword(item)'>重置密码</span>
                                                <span class='option-button' @click='deleteAccount(item)'>删除</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination
                                :current-page='currentPage'
                                :total-page='subAccount.totalPage'
                                @pageChange='getOperators'></pagination>
                        </div>
                    </transition>
                </div>
            </div>

        </div>
        <!-- fapiao-view end -->

        <!-- Modal添加子账号 begin -->
        <modal :show='show_addAccountModal' @close='show_addAccountModal=false' title='添加子账号'>
            <div class="modal-add-account__main">
                <div class="modal-add-account__list-wrap">
                    <ul class='modal-add-account__list'>
                        <li class='form-item'>
                            <span class="form-item__key">真实姓名</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入真实姓名，支持中文" v-model='name'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">登录名</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入登录名" v-model='username'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">初始密码</span>
                            <div class="form-item__value">
                                <input type="password" placeholder="请输入初始密码" v-model='password'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">职位</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入职位" v-model='info'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">手机号</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入手机号" v-model='phone'>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="modal-add-account__save" @click='saveHandle'>
                    <button-loading :loading='requesting'>保存</button-loading>
                </div>
            </div>
        </modal>
        <!-- Modal添加子账号 end -->

        <!-- Modal编辑员工账号 begin -->
        <modal :show='show_editOrgModal' @close='show_editOrgModal=false' title='编辑机构'>
            <div class="modal-add-account__main">
                <div class="modal-add-account__list-wrap" v-if='!noEditObject'>
                    <ul class='modal-add-account__list'>
                        <li class='form-item'>
                            <span class="form-item__key">真实姓名</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入真实姓名" v-model='editObject.name'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">联系方式</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入联系方式" v-model='editObject.phone'>
                            </div>
                        </li>
                        <li class='form-item'>
                            <span class="form-item__key">职务</span>
                            <div class="form-item__value">
                                <input type="text" placeholder="请输入职务" v-model='editObject.info'>
                            </div>
                        </li>
                    </ul>
                </div>
                <button-loading :loading='requesting' @click='editHandle'>保存</button-loading>
            </div>
        </modal>
        <!-- Modal编辑员工账号 end -->

        <!-- Modal重置密码 begin -->
        <modal :show='show_resetAccountPasswordModal'
            @close='show_resetAccountPasswordModal=false'
            title='重置密码'>
            <div class="modal-add-account__main">
                <div class="modal-add-account__list-wrap">
                    <ul class='modal-add-account__list'>
                        <li class='form-item'>
                            <span class="form-item__key">新密码</span>
                            <div class="form-item__value">
                                <input type="password" :placeholder="`重置登录名为 ${currentAccount.username} 的密码`" v-model='rePassword'>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="modal-add-account__save" @click='resetHandle'>
                    <button-loading :loading='requesting' :large='true'>重置</button-loading>
                </div>
            </div>
        </modal>
        <!-- Modal重置密码 end -->

        <!-- Confirm冻结账号 begin -->
        <confirm
            :show='show_disabledAccountConfirm'
            :title='`是否冻结 ${currentAccount.username} `'
            :loading='requesting'
            tip='冻结之后，账号将不能用来登录平台，需解冻之后才能重新使用。'
            @close='show_disabledAccountConfirm=false'
            @confirm='disabledHandle'>

        </confirm>
        <!-- Confirm冻结账号 end -->

        <!-- Confirm解除冻结账号 begin -->
        <confirm
            :show='show_solutionDisabledAccountConfirm'
            :title='`是否解冻 ${currentAccount.username} `'
            :loading='requesting'
            tip='解冻可以重新使用该账号。'
            @close='show_solutionDisabledAccountConfirm=false'
            @confirm='solutionDisabledHandle'>

        </confirm>
        <!-- Confirm解除冻结账号 end -->

        <!-- Confirm删除账号 begin -->
        <confirm
            :show='show_deleteAccountConfirm'
            :title='`是否删除登录名为 ${currentAccount.username} 的子账号`'
            :loading='requesting'
            tip='删除该账号。'
            @close='show_deleteAccountConfirm=false'
            @confirm='deleteHandle'>

        </confirm>
        <!-- Confirm解除冻结账号 end -->
    </div>
</template>

<script>
    import { Promise } from 'es6-promise'
    import footerBar from '../components/FooterBar.vue'
    import selectGroup from '../components/SelectGroup.vue'
    import selectOption from '../components/SelectOption.vue'
    import radioGroup from '../components/RadioGroup.vue'
    import areaSelect from '../components/AreaSelect.vue'
    import radio from '../components/Radio.vue'
    import loading from '../components/Loading.vue'
    import checkBox from '../components/CheckBox.vue'
    import toolTip from '../components/ToolTip.vue'
    import modal from '../components/Modal.vue'
    import confirm from '../components/Confirm.vue'
    import buttonLoading from '../components/ButtonLoading.vue'
    import pagination from '../components/Pagination.vue'
    import  { mapGetters, mapActions }  from 'vuex'
    import { addAccountValidation, resetAccountPasswordValidation, operatorEditValidation } from '../validation/validation'
    import { allApi } from '../api/api'
    import moment from 'moment'


    export default {
        components:{
            footerBar,
            selectGroup,
            selectOption,
            radioGroup,
            radio,
            checkBox,
            areaSelect,
            loading,
            toolTip,
            modal,
            confirm,
            buttonLoading,
            pagination
        },
        data() {
            return {
                placeholder:'--',
                list:[],
                subAccount:{},
                currentAccount:{},
                records:[],
                loading:true,
                requesting:false,
                name:'',
                username:'',
                info:'',
                password:'123456',
                rePassword:'',
                editObject:{},
                phone:'13588888888',
                show_addAccountModal:false,
                show_resetAccountPasswordModal:false,
                show_disabledAccountConfirm:false,
                show_solutionDisabledAccountConfirm:false,
                show_deleteAccountConfirm:false,
                show_editOrgModal:false


            }
        },
        computed:{
            ...mapGetters([
                'msgTip',
                'localInfo'
            ]),
            currentPage(){
                if(_.isEmpty(this.subAccount)) return 1
                return this.subAccount.pageNum
            },
            noEditObject(){
                return _.isEmpty(this.editObject)
            },
            noInvoiceInfo(){
                return _.isEmpty(this.invoiceInfo)
            }
        },
        methods:{
            // actions
            ...mapActions([
                'showLoading',
                'hideLoading',
                'setMsgTip'
            ]),

            // filters
            statusToText(type){
                if(type == '1') return '正常'
                if(type == '2') return '已冻结'
                else if(type == '') return this.placeholder
            },
            timestampToDate(timestamp){
                if(!timestamp) return this.placeholder
                return moment(timestamp).format('YYYY-MM-DD')
            },

            // function
            editInfo(org){
                this.$set(this.editObject,'childId',org.userId)
                this.$set(this.editObject,'name',org.name)
                this.$set(this.editObject,'phone',org.phone)
                this.$set(this.editObject,'info',org.info)
                this.show_editOrgModal = true
            },
            toggleAllPlatform($event){
                if($event){
                    _.each(this.platform,(value,index)=> {
                        this.platform[index] = true
                    })
                }
                else{
                    _.each(this.platform,(value,index)=> {
                        this.platform[index] = false
                    })
                }
            },
            resetPassword(account){
                this.currentAccount = account
                this.show_resetAccountPasswordModal = true
            },
            disabledAccount(account){
                this.currentAccount = account
                this.show_disabledAccountConfirm = true
            },
            solutionDisabledAccount(account){
                this.currentAccount = account
                this.show_solutionDisabledAccountConfirm = true
            },
            deleteAccount(account){
                this.currentAccount = account
                this.show_deleteAccountConfirm = true
            },
            // saveHandle
            saveHandle(){
                let params={
                    name:this.name,
                    username:this.username,
                    password:this.password,
                    phone:this.phone,
                    info:this.info
                }
                if(!addAccountValidation(params)){
                    return
                }
                this.requesting = true
                allApi.addOperator(params)
                .then(result => {
                    this.requesting = false
                    this.show_addAccountModal = false
                    this.setMsgTip({
                        text:'添加员工账号成功！',
                        type:'success'
                    })
                    this.getOperators(this.currentPage)
                })
                .catch(error => {
                    this.requesting = false
                })
            },
            // editHandle
            editHandle(){
                let params={
                    childId:this.editObject.childId,
                    name:this.editObject.name,
                    phone:this.editObject.phone,
                    info:this.editObject.info
                }
                console.log(params)
                if(!operatorEditValidation(params)){
                    return
                }
                this.requesting = true
                allApi.editOperator(params)
                .then(result => {
                    this.requesting = false
                    this.show_editOrgModal = false
                    this.departName = ''
                    this.departInfo = ''
                    this.setMsgTip({
                        text:'编辑机构成功！',
                        type:'success'
                    })
                    this.getOperators(this.currentPage)
                })
                .catch(error => {
                    this.requesting = false
                })
            },
            // resetHandle
            resetHandle(){
                let params={
                    password:this.rePassword,
                }
                if(!resetAccountPasswordValidation(params)){
                    return
                }
                this.requesting = true
                allApi.resetOperatorPwd({
                    childId:this.currentAccount.userId,
                    password:this.rePassword
                })
                .then(result => {
                    this.rePassword = ''
                    this.requesting = false
                    this.show_resetAccountPasswordModal = false
                    this.setMsgTip({
                        text:'重置密码成功！',
                        type:'success'
                    })
                })
                .catch(error => {
                    this.requesting = false
                })
            },
            // disabledHandle
            disabledHandle(){
                this.requesting = true
                allApi.forbidOperator({
                    childId:this.currentAccount.userId,
                })
                .then(result => {
                    this.requesting = false
                    this.show_disabledAccountConfirm = false
                    this.setMsgTip({
                        text:'冻结成功！',
                        type:'success'
                    })
                    this.getOperators(this.currentPage)
                })
                .catch(error => {
                    this.requesting = false
                })
            },
            // solutionDisabledHandle
            solutionDisabledHandle(){
                this.requesting = true
                allApi.removeForbidOperator({
                    childId:this.currentAccount.userId,
                })
                .then(result => {
                    this.requesting = false
                    this.show_solutionDisabledAccountConfirm = false
                    this.setMsgTip({
                        text:'解除冻结成功！',
                        type:'success'
                    })
                    this.getOperators(this.currentPage)
                })
                .catch(error => {
                    this.requesting = false
                })
            },
            // deleteHandle
            deleteHandle(){
                this.requesting = true
                allApi.delOperator({
                    childId:this.currentAccount.userId,
                })
                .then(result => {
                    this.requesting = false
                    this.show_deleteAccountConfirm = false
                    this.setMsgTip({
                        text:'删除成功！',
                        type:'success'
                    })
                    this.getOperators(this.currentPage)
                })
                .catch(error => {
                    this.requesting = false
                })
            },
            getOperators(num){
                this.loading = true
                allApi.getOperators(num)
                .then(result=>{
                    this.loading = false
                    this.subAccount = result
                    this.records = result.records
                    if(result.totalPage < result.pageNum){
                        this.getOperators(result.totalPage)
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.loading = false
                })
            },
        },
        created(){
            this.getOperators(1)
        }
    }
</script>

<style lang="scss">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .sub-account-view{
        padding:0 40px 60px 40px;
        box-sizing:border-box;
        overflow:auto;
        .sub-account-add{
            cursor:pointer;
            line-height:32px;
            color:#fff;
            background-color: $green;
            width: 120px;
            text-align:center;
            font-size: 15px;
            font-weight: normal;
            font-weight: 300;
            transition:ease .3s all;
            &:hover{
                background-color: darken($green,10%);
            }
        }
        .sub-account-tabel__options-item{
            cursor:pointer;
            padding:10px;
            color:$green;
        }
        .sub-account-table{
            position: relative;
            min-height:140px;
            .loading--fullscreen{
                background-color: transparent;
            }
        }
    }
    .modal-add-account__list-wrap{
        display:flex;
        justify-content:center;
    }
    .modal-add-account__list{
        .form-item{
            padding-top: 30px;
        }
    }
</style>
