import * as types from '../mutation-types'

// initial state
const state = {
    loadingShow: false,
    loadingTitle:''
}

// mutations
const mutations = {
    [types.SHOW_LOADING]( state, title ) {
        state.loadingShow = true
        if(title) state.loadingTitle = title
        else state.loadingTitle = ''
    },

    [types.HIDE_LOADING]( state ) {
        state.loadingShow = false
    }
}

export default{ state, mutations }
