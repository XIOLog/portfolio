import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import fb from 'firebase/app'
import 'firebase/auth'
import BuyModalComponent from '@/components/Shared/BuyModal'

Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModalComponent)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyBlWgk5kHrWpGvMvaWlw2bMHr5XTV0PeOY',
      authDomain: 'ad-proj-app.firebaseapp.com',
      databaseURL: 'https://ad-proj-app.firebaseio.com',
      projectId: 'ad-proj-app',
      storageBucket: 'gs://ad-proj-app.appspot.com/',
      messagingSenderId: '495481800312',
      appId: '1:495481800312:web:bac2d11f2fcce7f1'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
