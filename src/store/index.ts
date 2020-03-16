import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getter'
import user, { State as userState } from '@/store/modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  getters,
  actions,
})

export interface State {
  user: userState
}
