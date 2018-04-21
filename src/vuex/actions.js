import * as types from './mutation-types'
import { allApi } from '../api/api'
import Storage from '../utils/storage'

export const showLoading = ({ commit, state }, title) => commit(types.SHOW_LOADING, title)
export const hideLoading = ({ commit, state }) => {
  // setTimeout(() => {
    commit(types.HIDE_LOADING)
  // },0)
}

export const setMsgTip = ({ commit, state },msgObj) => {
	let timer = setTimeout(() => {
 		commit(types.HIDE_MSGTIP)
	},6000)
	msgObj.timer = timer
	commit(types.SET_MSGTIP, msgObj)
}
export const setMsgTipStyle = ({ commit, state },styleObj) => {
	commit(types.SET_MSGTIPSTYLE, styleObj)
}







// setSearchHistoryCurrentPage
export const setLoanIndexRefresh = ({ commit, state },boolean ) => {
	commit(types.SET_LOANINDEXREFRESH, boolean)
}

// setSessionId
export const setChannel = ({ commit, state }, channel ) => {
	commit(types.SET_CHANNEL, channel)
    Storage.set('channel',channel)
}

// setAdmin
export const setAdmin = ({ commit, state }, admin ) => {
	commit(types.SET_ADMIN, admin)
    Storage.set('admin',admin)
}

// setSessionId
export const setSessionId = ({ commit, state }, sessionId ) => {
	let channel = state.localInfo.channel
	commit(types.SET_SESSIONID, sessionId)
    Storage.set(`dz_${channel}_sessionId`,sessionId)
    $.extend($.ajaxSettings, {
        headers: {
            'channel': channel,
            'X-Requested-With':'XMLHttpRequest',
            'sessionId':sessionId || ''
        }
    })
}

export const setRouterList = ({ commit, state }, routerItem) => commit(types.SET_ROUTERLIST, routerItem)
export const setRouterAnimation = ({ commit, state }, animationName ) => commit(types.SET_ROUTERANIMATION, animationName)

export const setSelectZIndex = ({ commit, state }, num ) => commit(types.SET_SELECTZINDEX, num)

export const setDocumentClick = ({ commit, state }, boolean ) => commit(types.SET_DOCUMENTCLICK, boolean)

export const setNeedLogin = ({ commit, state }, boolean ) => commit(types.SET_NEEDLOGIN, boolean)

export const setCity = ({ commit, state }, cityInfo ) => commit(types.SET_CITY, cityInfo)
export const setCarInfo = ({ commit, state }, info ) => commit(types.SET_CARINFO, info)
export const setCarCurrent = ({ commit, state }, info ) => commit(types.SET_CARCURRENT, info)
export const setUserId = ({ commit, state }, id) => commit(types.SET_USERID, id)
export const setCardPrice = ({ commit, state }, priceArr) => commit(types.SET_CARDPRICE, priceArr)

export const addCard = ({ commit, state }, card) => commit(types.ADD_CARD, card)
export const editCard = ({ commit, state }, index, card) => commit(types.EDIT_CARD, index, card)
export const deleteCard = ({ commit, state }, card) => commit(types.DELETE_CARD, card)

export const setBaodanresult = ({ commit, state }, result) => commit(types.SET_BAODANRESULT, result)
export const removeBaodanresult = ({ commit, state }, result) => commit(types.REMOVE_BAODANRESULT, result)

export const setIndexViewForm = ({ commit, state }, form) => commit(types.SET_INDEXVIEWFORM, form)

export const setUpdateDashboard = ({ commit, state }, boolean ) => commit(types.SET_UPDATEDASHBOARD, boolean)
export const setDashboard = ({ commit, state }, dashboard ) => commit(types.SET_DASHBOARD, dashboard)

export const setRequestParams = ({ commit, state }, requestparams ) => commit(types.SET_REQUESTPARAMS, requestparams)
export const setAuthType = ({ commit, state }, type ) => commit(types.SET_AUTHTYPE, type)


