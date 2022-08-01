import Vue from 'vue'
import App from './App'
import './styles/index.scss'
import uView from 'uview-ui'
import api from '@/utils/api'
// import TabBar from 'components/tabBar/TabBar.vue'

// Vue.component('tab-bar', TabBar)
Vue.use(uView)
// uni.$u.config.unit = 'rpx'

Vue.config.productionTip = false
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
