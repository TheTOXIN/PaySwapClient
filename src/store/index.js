import Vue from 'vue'
import Vuex from 'vuex'
import costs from './costs'
import auth from './auth'
import error from './error'
Vue.use(Vuex) 

export default new Vuex.Store({
  modules:{

    costs,
    auth,
    error

  }


})