import Vue from 'vue'
import Vuex from 'vuex'
import shared from './shared'
import ads from './ads'
import user from './user'
import orders from './orders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shared, ads, user, orders
  }
})
