import * as types from '../mutation-types'

// initial state
const state = {
    routerList:[],
    routerAnimation:'router',
}

// mutations
const mutations = {
    [types.SET_ROUTERLIST]( state , routerItem ) {
        if(routerItem == 'removeLastRouter'){
            state.routerList.splice(state.routerList.length-1,1)
            return
        }
        state.routerList.push(routerItem)
    },
    [types.SET_ROUTERANIMATION]( state , animationName ) {
        state.routerAnimation = animationName
    },
}

export default{ state, mutations }
