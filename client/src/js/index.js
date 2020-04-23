import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss'
import 'remixicon/fonts/remixicon.css'
import '../scss/timeline.scss'
import '../scss/formTogglers.scss'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VModal from 'vue-js-modal'
import FrameControls from './components/FrameControls.vue'
import NavbarControls from './components/NavbarControls.vue'
import Notifier from './components/Notifier.vue'
import Accounts from './components/Accounts.vue'
import AccountAdd from './components/AccountAdd.vue'
import ChequeAdd from './components/ChequeAdd.vue'
import ChequeIncoming from './components/ChequeIncoming.vue'
import ChequeOutgoing from './components/ChequeOutgoing.vue'
import Dashboard from './components/Dashboard.vue'
import NotificationStore from './store/notification'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VModal, { dynamic: true })

const router = new VueRouter({
    routes: [
      { path: '/Dashboard', component: Dashboard },
      { path: '/ChequeAdd', component: ChequeAdd },
      { path: '/ChequeIncoming', component: ChequeIncoming },
      { path: '/ChequeOutgoing', component: ChequeOutgoing },
      { path: '/Accounts', component: Accounts },
      { path: '/AccountAdd', component: AccountAdd }
    ]
});

const store = new Vuex.Store({
  modules: {
    NotificationStore
  }
})
  
new Vue({
  el: '#app',
  components: {
    FrameControls,
    NavbarControls,
    Notifier
  },
  router,
  store,
  mounted() {
    this.$router.push('/Dashboard')
  }
});