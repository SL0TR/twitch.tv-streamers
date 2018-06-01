import Vue from 'vue'
import Vuex from 'vuex'
import {users, streams} from '../api'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users: [],
    online: [],
    offline: []
  },
  getters: {
    getUsers: state => state.users,
    getStreams: state => state.streams
  },
  mutations: {
    getUsersData: (state, payload) => {
      state.users.push(payload)
    },
    getStreamData: (state, payload) => {
      if (payload != null) {
        state.online.push(payload)
      }
    }
  },
  actions: {
    getUsersData: ({ commit }, payload) => {
      axios.get(users + payload.user)
        .then(res => {
          let data = res.data
          commit('getUsersData', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getStreamData: ({ commit }, payload) => {
      axios.get(streams + payload.user)
        .then(res => {
          let data = res.data.stream
          // console.log(data)
          commit('getStreamData', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

export default store