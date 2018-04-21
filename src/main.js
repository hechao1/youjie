import Vue from 'vue'
import App from './views/App.vue'
import store from './vuex/store'
import router from './router'
import { sync } from 'vuex-router-sync'
import { native } from './native'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
sync(store, router)
Vue.use(ElementUI)
const init = ()=> {
    let app = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
}

native(init)
