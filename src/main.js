import Vue from 'vue'
import App from './App'
import './styles/index.scss'
import uView from 'uview-ui'
import api from '@/utils/api'
import store from '@/store'
// import TabBar from 'components/tabBar/TabBar.vue'

// Vue.component('tab-bar', TabBar)
Vue.use(uView)

Vue.config.productionTip = false
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
