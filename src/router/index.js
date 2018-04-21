import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import config from './config'

Vue.use(Router)

import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import UserIndexView from '../views/UserIndexView.vue'
import UserDetailView from '../views/UserDetailView.vue'
import DailyView from '../views/DailyView.vue'
import DailyIndexView from '../views/DailyIndexView.vue'
import DailyCouponsView from '../views/DailyCouponsView.vue'
import ReportView from '../views/ReportView.vue'
import ReportIndexView from '../views/ReportIndexView.vue'
import MoneyView from '../views/MoneyView.vue'
import MoneyIndexView from '../views/MoneyIndexView.vue'
import OrderView from '../views/OrderView.vue'
import OrderIndexView from '../views/OrderIndexView.vue'
import OrderDetailView from '../views/OrderDetailView.vue'
import TransactionView from '../views/TransactionView.vue'
import TransactionAnalysisView from '../views/TransactionAnalysisView.vue'
import TransactionDetailView from '../views/TransactionDetailView.vue'
import LoanView from '../views/LoanView.vue'
import LoanIndexView from '../views/LoanIndexView.vue'
import LoanAppView from '../views/LoanAppView.vue'
import LoanAddProductView from '../views/LoanAddProductView.vue'
import PushMessageView from '../views/PushMessageView.vue'
import PushMessageIndexView from '../views/PushMessageIndexView.vue'
import QRView from '../views/QRView.vue'
import QRIndexView from '../views/QRIndexView.vue'
import IOUView from '../views/IOUView.vue'
import IOUIndexView from '../views/IOUIndexView.vue'
import ImaView from '../views/ImaView.vue'
import ImaIndexView from '../views/ImaIndexView.vue'
import ImaDetailView from '../views/ImaDetailView.vue'
// Settled query
import settledView from '../views/settledView.vue'
import settledIndexView  from '../views/settledIndexView.vue'
// RechangeView
import RechangeView from '../views/RechangeView.vue'
import RechangeIndexView  from '../views/RechangeIndexView.vue'
// UserhigherView
import UserhigherView from '../views/UserhigherView.vue'
import UserhigherIndexView  from '../views/UserhigherIndexView.vue'
let router = new Router({
    routes: [{
    	path: '/',
    	name: 'default',
    	component: IndexView
	},{
    	path: '/index',
    	name: 'index',
    	component: IndexView,
		children: [{
            path: '/user',
            name: 'user',
            component: UserView,
            children:[{
                path: '/user-index',
                name: 'user-index',
                component: UserIndexView
            },{
                path: '/user-detail/:id',
                name: 'user-detail',
                component: UserDetailView
            }]
        },{
            path: '/daily',
            name: 'daily',
            component: DailyView,
            children:[{
                path: '/daily-index',
                name: 'daily-index',
                component: DailyIndexView
            },
            {
                path: '/daily-coupons/:id',
                name: 'daily-coupons',
                component: DailyCouponsView
            }
        ]
        },{
            path: '/push-message',
            name: 'push-message',
            component: PushMessageView,
            children:[{
                path: '/push-message-index',
                name: 'push-message-index',
                component: PushMessageIndexView
            }]
        },
        {
            path: '/change',
            name: 'change',
            component: RechangeView,
            children:[{
                path: '/change-index/:it',
                name: 'change-index',
                component: RechangeIndexView
            },{
                path: '/blacklist-upload/',
                name: 'blacklist-upload',
                component: RechangeIndexView
            }]
        }
        ,{
            path: '/report',
            name: 'report',
            component: ReportView,
            children:[{
                path: '/report-index',
                name: 'report-index',
                component: ReportIndexView
            }]
        },{
            path: '/money',
            name: 'money',
            component: MoneyView,
            children:[{
                path: '/money-index',
                name: 'money-index',
                component: MoneyIndexView
            },]
        },{
            path: '/order',
            name: 'order',
            component: OrderView,
            children:[{
                path: '/order-index',
                name: 'order-index',
                component: OrderIndexView
            },{
                path: '/order-detail/:id',
                name: 'order-detail',
                component: OrderDetailView
            }]
        },{
            path: '/transaction',
            name: 'transaction',
            component: TransactionView,
            children:[{
                path: '/transaction-analysis',
                name: 'transaction-analysis',
                component: TransactionAnalysisView
            },{
                path: '/transaction-detail/:id',
                name: 'transaction-detail',
                component: TransactionDetailView
            }]
        },{
            path: '/qr',
            name: 'qr',
            component: QRView,
            children:[{
                path: '/qr-index',
                name: 'qr-index',
                component: QRIndexView
            }]
        },{
            path: '/ima',
            name: 'ima',
            component: ImaView,
            children:[{
                path: '/ima-index',
                name: 'ima-index',
                component: ImaIndexView
            },{
                path: '/ima-detail',
                name: 'ima-detail',
                component: ImaDetailView
            }
        ]
        },
        {
            path: '/userhigher',
            name: 'userhigher',
            component: UserhigherView,
            children:[{
                path: '/userhigher-index',
                name: 'userhigher-index',
                component: UserhigherIndexView
            }]
        },
        {
            path: '/',
            name: 'IOU',
            component: IOUView,
            children:[{
                path: '/IOU-index',
                name: 'IOU-index',
                component: IOUIndexView
            }]
        },
        {
            path: '/settled',
            name: 'settled',
            component: settledView,
            children:[{
                path: '/settled-index',
                name: 'settled-index',
                component: settledIndexView
            }]
        }
        ,{
            path: '/loan',
            name: 'loan',
            component: LoanView,
            children:[{
                path: '/loan-index',
                name: 'loan-index',
                component: LoanIndexView,
                meta: {
                    keepAlive: true
                }
            },{
                path: '/loan-app',
                name: 'loan-app',
                component: LoanAppView,
                meta: {
                    keepAlive: false
                }
            },{
                path: '/loan-add-product',
                name: 'loan-add-product',
                component: LoanAddProductView,
                meta: {
                    keepAlive: false
                }
            },{
                path: '/loan-edit-product/:id',
                name: 'loan-edit-product',
                component: LoanAddProductView,
                meta: {
                    keepAlive: false
                }
            }]
        }]
    },{
        path: '/login', name: 'login', component: LoginView
    },{
        path: '*', redirect: '/'
    }]
})

new config(router).render()

export default router
