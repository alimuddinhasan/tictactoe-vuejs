import Vue from 'vue'
import Vuex from 'vuex'

import players from './players'
Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      players
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.NODE_ENV !== 'production'
  })

  return Store
}
