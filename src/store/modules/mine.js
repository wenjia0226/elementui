import api from'../../fetch/api'
import * as types from './../types.js';
const state = {
    schoolList:[{
        id: '',
        name: '',
        address: ''
    }]
}

const actions = {
    getMineBaseApi({commit}) {
        api.mineBaseMsgApi()
        .then(res => { 
            commit( types.GET_BASE_API,res)
        })
    }
}
const getters = {
    schoolList: state => state.schoolList
  }
const mutations = {
    [types.GET_BASE_API] (state, res) {
        state.schoolList = res.data
        console.log(state.schoolList)
    }
}
export default {
  state,
  actions,
  getters,
  mutations
}