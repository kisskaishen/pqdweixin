// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'



import router from './router'
// import store from './vuex/store.js'
import 'lib-flexible/flexible'
import { get,post,baseUrl2 } from './config/api'
import { setCookie,getCookie } from './config/util'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'         // 2.6.0+版本需要手动添加
Vue.use(VueAwesomeSwiper)

import Util from './config/util'
Vue.use(Util)

import Progress from 'vue-multiple-progress'
Vue.use(Progress)

Vue.prototype.$setCookie = setCookie
Vue.prototype.$getCookie = getCookie

Vue.prototype.$post = post
Vue.prototype.$get = get


Vue.prototype.$token = App.token

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    // store,
    components: { App },
    template: '<App/>'
})
