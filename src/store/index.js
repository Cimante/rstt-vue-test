import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    table: [],
    usersCounter: 0
  },
  mutations: {
    addUserData(state, payload) {
      state.table = [...state.table, payload]
    },
    increaseUsersCounter(state) {
      state.usersCounter = state.usersCounter + 1
    },
    addSubordinate(state, payload) {
      state.table = state.table.map((x) => {
        if (payload.chief === x.id) {
          if (!x.subordinates) x.subordinates = new Array();
          x.subordinates.push(payload)
        }
        return x
      })
    },
    reassignUserData(state, payload) {
      state.table = payload
    }
  },
  actions: {
    sendUserData({ state, commit }, payload) {
      commit('increaseUsersCounter')
      payload.id = state.usersCounter
      if (payload.chief) {
        commit('addSubordinate', payload)
      } else {
        commit('addUserData', payload)
      }
    },
    sortTable({ state, commit }, payload) {
      const tempTable = state.table
      tempTable.sort((a, b) => (a[payload] > b[payload] ? 1 : -1));
      commit('reassignUserData', tempTable)
    }
  },
  getters: {
    getTable: (state) => {
      return state.table
    }
  },
  plugins: [createPersistedState()],
});
