import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import * as firebase from 'firebase'
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    var config = {
      apiKey: 'AIzaSyDADAyNyEEb7CAsKE-omjc35j0KGXBKxJs',
      authDomain: 'bookkeeping-666.firebaseapp.com',
      databaseURL: 'https://bookkeeping-666.firebaseio.com',
      projectId: 'bookkeeping-666',
      storageBucket: 'bookkeeping-666.appspot.com',
      messagingSenderId: '666997306434'
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      //console.log(user)
      if( user !== null){
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    //this.$store.dispatch('fetchCosts')
  }
})
