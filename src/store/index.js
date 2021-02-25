import Vue from 'vue'
import Vuex from 'vuex'

import game_turn from './game_turn'
Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      game_turn
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.NODE_ENV !== 'production'
  })

  return Store
}
