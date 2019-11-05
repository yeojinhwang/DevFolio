import Vue from 'vue'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTinySlider from 'vue-tiny-slider'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.prototype.$EventBus = new Vue();

Vue.use(Vuetify, {
  iconfont : 'fa'
})
Vue.use(VueTinySlider)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
