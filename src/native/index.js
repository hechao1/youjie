import Vue from 'vue'
import { getQueryString } from '../utils/utils'


const native = (init)=> {
    if(getQueryString().mode == 'dev'){
        require.ensure(['vconsole'], (require) => {
            var vConsole = require('vconsole')
            init()
        },'vconsole')
    }
    else{
        init()
    }

    if(process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'web-dev'){
        let readyEvent = document.createEvent("Events")
        readyEvent.initEvent("DazeJSObjReady", false, false)
        document.dispatchEvent(readyEvent)
        console.log('%c开发模式～￣▽￣～','font-size:25px;color:red')
    }
}

export {
    native
}