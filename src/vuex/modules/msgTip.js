import * as types from '../mutation-types'
import Storage from '../../utils/storage'
// initial state
const state = {
    text:'tips',
    show:false,
    timer:0,
    type:'error',
    style:null,
    password:Storage.get('site') 
}

// mutations
const mutations = {
    [types.SET_MSGTIP]( state, msgObj ) { 
        clearTimeout(state.timer)
        state.text = msgObj.text || 'tips'
        state.type = msgObj.type || 'error'
        state.timer = msgObj.timer
        state.show = true
    },
    [types.SET_MSGTIPSTYLE]( state, styleObj ) {
        state.style = styleObj
    },
    [types.HIDE_MSGTIP]( state ) {
        state.show = false
    },
}

export default{ state, mutations }