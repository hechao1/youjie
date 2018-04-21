import { rules } from '../utils/utils'
import store from '../vuex/store'
import { setMsgTip } from '../vuex/actions'

const indexValidation = function(params) {
    if(params.code === ''){
        setMsgTip(store,{
            text:'请选择保险公司',
            type:'warn'
        })
        return false
    }
    if(params.sfid === ''){
        setMsgTip(store,{
            text:'请输入身份证号',
            type:'warn'
        })
        return false
    }
    if(params.cardno === ''){
        setMsgTip(store,{
            text:'请输入车牌号',
            type:'warn'
        } )
        return false
    }
    if(params.baodan === ''){
        setMsgTip(store,{
            text:'请输入保单号',
            type:'warn'
        } )
        return false
    }
    if(params.cardno && !rules.licence(params.cardno)){
        setMsgTip(store,{
            text:'请输入正确的车牌号',
            type:'warn'
        } )
        return false
    }
    if(params.sfid && !rules.IDCard(params.sfid)){
        setMsgTip(store,{
            text:'请输入正确的身份证号格式',
            type:'warn'
        } )
        return false
    }
    return true
}
const loginValidation = function(params) {
    if(params.username == ''){
        setMsgTip(store,{
            text:'请输入用户名',
            type:'warn'
        })
        return false
    }
    if(params.password == ''){
        setMsgTip(store,{
            text:'请输入密码',
            type:'warn'
        })
        return false
    }
    return true
}
const invoiceValidation = function(params) {
    if(params.code === ''){
        setMsgTip(store,{
            text:'请输入发票代码',
            type:'warn'
        })
        return false
    }
    if(params.number === ''){
        setMsgTip(store,{
            text:'请输入发票号码',
            type:'warn'
        })
        return false
    }
    if(params.kjfsbh === ''){
        setMsgTip(store,{
            text:'请输入开票方识别号',
            type:'warn'
        })
        return false
    }
    if(params.rq === ''){
        setMsgTip(store,{
            text:'请输入开票日期',
            type:'warn'
        })
        return false
    }
    if(params.je === ''){
        setMsgTip(store,{
            text:'请输入开票金额',
            type:'warn'
        })
        return false
    }
    return true
}
const addAccountValidation = function(params) {
    if(params.name === ''){
        setMsgTip(store,{
            text:'请输入真实姓名',
            type:'warn'
        })
        return false
    }
    if(params.username === ''){
        setMsgTip(store,{
            text:'请输入登录名',
            type:'warn'
        })
        return false
    }
    if(params.password === ''){
        setMsgTip(store,{
            text:'请输入密码',
            type:'warn'
        })
        return false
    }
    if(params.phone === ''){
        setMsgTip(store,{
            text:'请输入手机号码',
            type:'warn'
        })
        return false
    }
    if(params.info === ''){
        setMsgTip(store,{
            text:'请输入职位',
            type:'warn'
        } )
        return false
    }
    if(params.phone && !rules.tel(params.phone)){
        setMsgTip(store,{
            text:'请输入正确的手机号码',
            type:'warn'
        } )
        return false
    }
    return true
}
const resetAccountPasswordValidation = function(params) {
    if(params.password === ''){
        setMsgTip(store,{
            text:'请输入重置密码',
            type:'warn'
        })
        return false
    }
    return true
}

const blackListValidation = function(params) {
    if(params.name === ''){
        setMsgTip(store,{
            text:'请输入姓名',
            type:'warn'
        })
        return false
    }
    if(params.idNumber === ''){
        setMsgTip(store,{
            text:'请输入身份证号',
            type:'warn'
        })
        return false
    }
    if(params.mobile === ''){
        setMsgTip(store,{
            text:'请输入手机号码',
            type:'warn'
        })
        return false
    }
    if(params.queryType === ''){
        setMsgTip(store,{
            text:'请选择一个黑名单数据平台',
            type:'warn'
        })
        return false
    }
    if(params.idNumber && !rules.IDCard(params.idNumber)){
        setMsgTip(store,{
            text:'请输入正确的身份证号码',
            type:'warn'
        })
        return false
    }
    if(params.mobile && !rules.tel(params.mobile)){
        setMsgTip(store,{
            text:'请输入正确的手机号码',
            type:'warn'
        })
        return false
    }
    return true
}

const operatorsValidation = function(params) {
    if(params.userName === ''){
        setMsgTip(store,{
            text:'请输入手机号码',
            type:'warn'
        })
        return false
    }
    if(params.password === ''){
        setMsgTip(store,{
            text:'请输入手机服务密码',
            type:'warn'
        })
        return false
    }
    if(params.userName && !rules.tel(params.userName)){
        setMsgTip(store,{
            text:'请输入正确的手机号码',
            type:'warn'
        })
        return false
    }
    return true
}
const creditCardBillValidation = function(params) {
    if(params.userName === ''){
        setMsgTip(store,{
            text:'请输入邮箱账号',
            type:'warn'
        })
        return false
    }
    if(params.password === ''){
        setMsgTip(store,{
            text:'请输入邮箱密码',
            type:'warn'
        })
        return false
    }
    if(params.startTime === ''){
        setMsgTip(store,{
            text:'请选择账单开始时间',
            type:'warn'
        })
        return false
    }
    if(params.endTime === ''){
        setMsgTip(store,{
            text:'请选择账单结束时间',
            type:'warn'
        })
        return false
    }
    if(params.userName && !rules.email(params.userName)){
        setMsgTip(store,{
            text:'请输入正确的邮箱账号',
            type:'warn'
        })
        return false
    }
    return true
}
const groupAddValidation = function(params) {
    if(params.groupName === ''){
        setMsgTip(store,{
            text:'请输入权限组名称',
            type:'warn'
        })
        return false
    }
    if(params.groupInfo === ''){
        setMsgTip(store,{
            text:'请输入权限组描述',
            type:'warn'
        })
        return false
    }
    if(params.funcIds === ''){
        setMsgTip(store,{
            text:'请选择至少一个权限',
            type:'warn'
        })
        return false
    }
    return true
}
const organizationAddValidation = function(params) {
    if(params.departName === ''){
        setMsgTip(store,{
            text:'请输入机构名称',
            type:'warn'
        })
        return false
    }
    if(params.departInfo === ''){
        setMsgTip(store,{
            text:'请输入机构描述',
            type:'warn'
        })
        return false
    }
    if(params.groupId === ''){
        setMsgTip(store,{
            text:'请选择一个权限组',
            type:'warn'
        })
        return false
    }
    if(params.adminName === ''){
        setMsgTip(store,{
            text:'请输入管理员姓名',
            type:'warn'
        })
        return false
    }
    if(params.adminPhone === ''){
        setMsgTip(store,{
            text:'请输入联系方式',
            type:'warn'
        })
        return false
    }
    if(params.adminUsername === ''){
        setMsgTip(store,{
            text:'请输入账户名',
            type:'warn'
        })
        return false
    }
    if(params.adminPwd === ''){
        setMsgTip(store,{
            text:'请输入初始密码',
            type:'warn'
        })
        return false
    }
    if(params.adminInfo === ''){
        setMsgTip(store,{
            text:'请输入描述',
            type:'warn'
        })
        return false
    }
    return true
}

const organizationEditValidation = function(params) {
    if(params.departName === ''){
        setMsgTip(store,{
            text:'请输入机构名称',
            type:'warn'
        })
        return false
    }
    if(params.departInfo === ''){
        setMsgTip(store,{
            text:'请输入机构描述',
            type:'warn'
        })
        return false
    }
    if(params.groupId === ''){
        setMsgTip(store,{
            text:'请选择一个权限组',
            type:'warn'
        })
        return false
    }
    return true
}

const operatorEditValidation = function(params) {
    if(params.name === ''){
        setMsgTip(store,{
            text:'请输入真实姓名',
            type:'warn'
        })
        return false
    }
    if(params.phone === ''){
        setMsgTip(store,{
            text:'请输入联系方式',
            type:'warn'
        })
        return false
    }
    if(params.info === ''){
        setMsgTip(store,{
            text:'请输入职务',
            type:'warn'
        })
        return false
    }
    return true
}

const addLenderValidation = function(params) {
    if(params.name === ''){
        setMsgTip(store,{
            text:'请输入姓名',
            type:'warn'
        })
        return false
    }
    if(params.idNumber === ''){
        setMsgTip(store,{
            text:'身份证号码',
            type:'warn'
        })
        return false
    }
    return true
}

const addProductValidation = function(params) {
    if(params.name === ''){
        setMsgTip(store,{
            text:'请输入产品名称',
            type:'warn'
        })
        return false
    }
    if(params.sourceName === ''){
        setMsgTip(store,{
            text:'请输入产品来源',
            type:'warn'
        })
        return false
    }
    if(params.motionValue === ''){
        setMsgTip(store,{
            text:'请输入产品链接',
            type:'warn'
        })
        return false
    }
    if(params.info === ''){
        setMsgTip(store,{
            text:'请输入广告语',
            type:'warn'
        })
        return false
    }
    if(params.imgSrc === ''){
        setMsgTip(store,{
            text:'请输入图标Url地址',
            type:'warn'
        })
        return false
    }
    if(params.applyNum === ''){
        setMsgTip(store,{
            text:'请输入申请人数',
            type:'warn'
        })
        return false
    }
    if(params.passBit === ''){
    // if(params.passBit === '%'){
        console.log(params.passBit)
        setMsgTip(store,{
            text:'请输入通过率',
            type:'warn'
        })
        return false
    }
    if(params.num === ''){
        setMsgTip(store,{
            text:'请输入自动累加系数',
            type:'warn'
        })
        return false
    }
    if(params.minLine === ''){
        setMsgTip(store,{
            text:'请输入最低额度',
            type:'warn'
        })
        return false
    }
    if(params.maxLine === ''){
        setMsgTip(store,{
            text:'请输入最高额度',
            type:'warn'
        })
        return false
    }
    if(params.averageLine === ''){
        setMsgTip(store,{
            text:'请输入平均额度',
            type:'warn'
        })
        return false
    }
    if(params.minLoanTime === ''){
        setMsgTip(store,{
            text:'请输入最短借款期限',
            type:'warn'
        })
        return false
    }
    if(params.maxLoanTime === ''){
        setMsgTip(store,{
            text:'请输入最长借款期限',
            type:'warn'
        })
        return false
    }
    if(params.minRate === '%'){
        setMsgTip(store,{
            text:'请输入最低利率',
            type:'warn'
        })
        return false
    }
    if(params.maxRate === '%'){
        setMsgTip(store,{
            text:'请输入最高利率',
            type:'warn'
        })
        return false
    }
    if(params.repayWay === ''){
        setMsgTip(store,{
            text:'请输入还款方式',
            type:'warn'
        })
        return false
    }
    if(params.lendValidTime === ''){
        setMsgTip(store,{
            text:'请输入放款时效',
            type:'warn'
        })
        return false
    }
    if(params.flowPath === ''){
        setMsgTip(store,{
            text:'请输入申请流程',
            type:'warn'
        })
        return false
    }
    if(params.condition === ''){
        setMsgTip(store,{
            text:'请输入申请条件',
            type:'warn'
        })
        return false
    }
    if(params.description === ''){
        setMsgTip(store,{
            text:'请输入产品介绍',
            type:'warn'
        })
        return false
    }
    if(params.explan === ''){
        setMsgTip(store,{
            text:'请输入审核说明',
            type:'warn'
        })
        return false
    }
    return true
}
export {
    indexValidation,
    loginValidation,
    invoiceValidation,
    addAccountValidation,
    resetAccountPasswordValidation,
    blackListValidation,
    operatorsValidation,
    creditCardBillValidation,
    groupAddValidation,
    organizationAddValidation,
    organizationEditValidation,
    operatorEditValidation,
    addLenderValidation,
    addProductValidation
}
