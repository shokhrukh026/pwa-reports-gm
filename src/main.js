import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import i18n from '@/libs/i18n/index'
import axios from '@/libs/axios'

Vue.config.productionTip = false


import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)



import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin);



import '@/assets/scss/main.scss'

new Vue({
  router,
  store,
  i18n,
  axios,
  render: h => h(App)
}).$mount('#app')