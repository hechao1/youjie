import * as type from '../mutation-types'
import Storage from '../../utils/storage'

// initial state
// shape: [{ id, quantity }]

const state = {
    routerList:[],
    routerAnimation:'router',
    documentClick:true,
    needLogin:false,
    loanIndexRefresh:false,
    funcIds:[],
    cityInfo : {},
    carInfo:{},
    channel:Storage.get('channel'),
    admin:Storage.get('admin'),
    sessionId:Storage.get(`dz_${Storage.get('channel')}_sessionId`) || '',
    selectZIndex:1,
    searchHistoryCurrentPage:1,
    searchHistory:{},
    searchHistoryForm:{
        startTime: '',
        endTime: '',
        searchType:{
            value:'',
            text:'所有服务'
        },
        searchCondition:{
            value:'身份证',
            text:'身份证'
        },
        idNumber:'',
    },
    policyHistory:[],
    invoiceSupport:[],
    invoiceResult:{},
    blackListResult:{},
    operatorsResult:{},
    creditCardBillResult:[],
    studentStatusResult:{},
    providentFundResult:{},
    providentFundCity:[],
    authType:'auto',
    userId:0,
    carCurrent:'请选择车型',
    updateDashboard:true,
    dashboard:{},
    requestParams:{},
    baodanResult:JSON.parse(localStorage.getItem('daze-baodan-result') || '[]'),
    companyList:[]
}

// mutations
const mutations = {
    [type.SET_ROUTERLIST]( state , routerItem ) {
        if(routerItem == 'removeLastRouter'){
            state.routerList.splice(state.routerList.length-1,1)
            return
        }
        state.routerList.push(routerItem)
    },
    [type.SET_ROUTERANIMATION]( state , animationName ) {
        state.routerAnimation = animationName
    },
    [type.SET_DOCUMENTCLICK]( state , boolean ) {
        state.documentClick = boolean
    },
    [type.SET_SELECTZINDEX]( state , num ) {
        state.selectZIndex = num
    },
    [type.SET_LOANINDEXREFRESH]( state , boolean ) {
        state.loanIndexRefresh = boolean
    },
    [type.SET_NEEDLOGIN]( state , boolean ) {
        state.needLogin = boolean
    },
    [type.SET_FUNCIDS]( state , funcIds ) {
        state.funcIds = funcIds
    },
    [type.SET_CITY]( state , cityInfo ) {
        state.cityInfo = cityInfo
    },
    [type.SET_CARINFO]( state , info ) {
        state.carInfo = info
    },
    [type.SET_CARCURRENT]( state , info ) {
        state.carCurrent = info
    },
    [type.SET_COMPANYLIST]( state , list ) {
        state.companyList = list
    },
    [type.SET_SEARCHHISTORY]( state , list ) {
        state.searchHistory = list
    },
    [type.SET_SEARCHHISTORYFORM]( state , form ) {
        state.searchHistoryForm = form
    },
    [type.SET_SEARCHHISTORYCURRENTPAGE]( state , num ) {
        state.searchHistoryCurrentPage = num
    },
    [type.SET_POLICYHISTORY]( state , list ) {
        state.policyHistory = list
    },
    [type.SET_INVOICERESULT]( state , result ) {
        state.invoiceResult = result
    },
    [type.SET_INVOICESUPPORT]( state , list ) {
        state.invoiceSupport = list
    },
    [type.SET_PROVIDENTFUNDCITY]( state , city ) {
        state.providentFundCity = city
    },
    [type.SET_PROVIDENTFUNDRESULT]( state , result ) {
        state.providentFundResult = result
    },
    [type.SET_BLACKLISTRESULT]( state , result ) {
        state.blackListResult = result
    },
    [type.SET_OPERATORSRESULT]( state , result ) {
        state.operatorsResult = result
    },
    [type.SET_CREDITCARDBILLSRESULT]( state , result ) {
        state.creditCardBillResult = result
    },
    [type.SET_STUDENTSTATUSRESULT]( state , result ) {
        state.studentStatusResult = result
    },
    [type.SET_BAODANRESULT]( state , result ) {
        let isEdit = false

        _.each(state.baodanResult,(value,key) => {
            if(value.baodan == result.baodan){
                state.baodanResult.$set(key, result)
                isEdit = true
                return false
            }
        })
        if(!isEdit) state.baodanResult.unshift(result)
    },
    [type.REMOVE_BAODANRESULT]( state , result ) {
        state.baodanResult.$remove(result)
        console.log(state.baodanResult)
    },
    [type.SET_INDEXVIEWFORM]( state , form ) {
        state.indexViewForm = form
    },
    [type.SET_UPDATEDASHBOARD]( state , boolean ) {
        state.updateDashboard = boolean
    },
    [type.SET_DASHBOARD]( state , dashboard ) {
        state.dashboard = dashboard
    },
    [type.SET_REQUESTPARAMS]( state , requestParams ) {
        console.log(requestParams)
        state.requestParams = requestParams
    },
    [type.SET_CHANNEL]( state , channel ) {
        state.channel = channel
    },
    [type.SET_ADMIN]( state , admin ) {
        state.admin = admin
    },
    [type.SET_USERID]( state , userId ) {
        state.userId = userId
    },
    [type.SET_SESSIONID]( state , sessionId ) {
        state.sessionId = sessionId
    },
    [type.SET_AUTHTYPE]( state , type ) {
        state.authType = type
    }

}

export default{ state, mutations }