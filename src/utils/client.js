import  store  from '../vuex/store'
import  {  setChannel, setSessionId }  from '../vuex/actions'
import  {  getQueryString }  from '../utils/utils'

const channel = getQueryString().channel || 'youjie_admin'
const sessionId = getQueryString().sessionId
channel && setChannel(store, channel)
sessionId && setSessionId(store, sessionId)

const client = {
    initializeAll(callback) {
        this.setInfo(callback)
    },
    setInfo(callback){
        $.extend($.ajaxSettings, {
            headers: {
                'channel': store.state.localInfo.channel,
                'X-Requested-With':'XMLHttpRequest',
                'sessionId':store.state.localInfo.sessionId || ''
            }
        })
        callback()
    }
}

export default client